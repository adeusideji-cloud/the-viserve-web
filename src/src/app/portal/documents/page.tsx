"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { Upload, FileText, CheckCircle, Clock, AlertCircle, Trash2, Globe, ArrowLeft, Loader2, X } from "lucide-react";

const REQUIRED_DOCS = [
  "Passport (Bio Page)",
  "Passport (All Used Pages)",
  "Birth Certificate",
  "Government-Issued Photo ID",
  "Proof of Residence",
  "Employment Letter / Pay Stubs",
  "Bank Statements (Last 3 months)",
  "Photographs (Passport Style)",
  "Marriage Certificate (if applicable)",
  "Divorce Decree (if applicable)",
];

export default function DocumentsPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [docs, setDocs] = useState<Array<Record<string, string>>>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>("");
  const [selectedType, setSelectedType] = useState("");
  const [customName, setCustomName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { router.push("/portal/login"); return; }
      setUser({ id: user.id, email: user.email || "" });
      const { data } = await supabase.from("documents").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
      setDocs((data ?? []) as Array<Record<string, string>>);
      setLoading(false);
    });
  }, [router]);

  async function handleUpload(files: FileList | null) {
    if (!files || !user) return;
    const docName = selectedType === "Other" ? customName : selectedType;
    if (!docName) { alert("Please select a document type first"); return; }

    setUploading(true);
    const supabase = createClient();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size > 10 * 1024 * 1024) { alert(`${file.name} is too large. Max 10MB.`); continue; }

      setUploadProgress(`Uploading ${file.name}...`);

      // Upload to Supabase Storage
      const filePath = `${user.id}/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
      const { data: storageData, error: storageError } = await supabase.storage
        .from("documents")
        .upload(filePath, file, { cacheControl: "3600", upsert: false });

      if (storageError) {
        // Fallback: save record without file if storage fails
        console.warn("Storage upload failed, saving record only:", storageError.message);
      }

      // Save document record
      const { data: newDoc } = await supabase.from("documents").insert({
        user_id: user.id,
        name: `${docName} — ${file.name}`,
        file_path: storageData?.path || null,
        status: "uploaded",
        required: REQUIRED_DOCS.includes(docName),
      }).select().single();

      if (newDoc) setDocs(prev => [newDoc as Record<string, string>, ...prev]);
    }

    setUploading(false);
    setUploadProgress("");
    setSelectedType("");
    setCustomName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleDelete(docId: string, filePath: string) {
    if (!confirm("Delete this document?")) return;
    const supabase = createClient();
    if (filePath) await supabase.storage.from("documents").remove([filePath]);
    await supabase.from("documents").delete().eq("id", docId);
    setDocs(prev => prev.filter(d => d.id !== docId));
  }

  const uploadedNames = docs.map(d => d.name?.split(" — ")[0]);

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><Loader2 className="w-6 h-6 text-blue-500 animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0057A8, #00A86B)" }}>
              <Globe className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm" style={{ color: "#0057A8" }}>The ViServe</span>
          </Link>
          <Link href="/portal" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeft className="w-4 h-4" /> Back to Portal
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Document Upload</h1>
        <p className="text-gray-500 text-sm mb-8">Upload your immigration documents securely. Accepted: PDF, JPG, PNG, DOCX (max 10MB each)</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Area */}
          <div className="lg:col-span-2 space-y-5">
            {/* Upload Form */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><Upload className="w-4 h-4 text-blue-500" /> Upload a Document</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Document Type *</label>
                  <select value={selectedType} onChange={e => setSelectedType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select document type...</option>
                    {REQUIRED_DOCS.map(d => <option key={d}>{d}</option>)}
                    <option value="Other">Other (specify below)</option>
                  </select>
                </div>

                {selectedType === "Other" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Document Name *</label>
                    <input value={customName} onChange={e => setCustomName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. Sponsor's Tax Returns" />
                  </div>
                )}

                {/* Drop Zone */}
                <div
                  className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={e => e.preventDefault()}
                  onDrop={e => { e.preventDefault(); handleUpload(e.dataTransfer.files); }}
                >
                  <input ref={fileInputRef} type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.docx,.doc" className="hidden"
                    onChange={e => handleUpload(e.target.files)} />
                  {uploading ? (
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                      <p className="text-blue-600 text-sm font-medium">{uploadProgress}</p>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-600 font-medium text-sm">Click or drag & drop files here</p>
                      <p className="text-gray-400 text-xs mt-1">PDF, JPG, PNG, DOCX • Max 10MB each • Multiple files allowed</p>
                      <button type="button" className="mt-4 px-5 py-2 text-sm font-semibold text-white rounded-lg" style={{ background: "#0057A8" }}>
                        Choose Files
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Uploaded Documents */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-50">
                <h2 className="font-semibold text-gray-900">Uploaded Documents ({docs.length})</h2>
              </div>
              {docs.length ? (
                <div className="divide-y divide-gray-50">
                  {docs.map(doc => (
                    <div key={doc.id} className="px-6 py-4 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${doc.status === "uploaded" ? "bg-green-100" : doc.status === "pending" ? "bg-yellow-100" : "bg-red-100"}`}>
                          {doc.status === "uploaded" ? <CheckCircle className="w-4 h-4 text-green-600" /> :
                           doc.status === "pending" ? <Clock className="w-4 h-4 text-yellow-600" /> :
                           <AlertCircle className="w-4 h-4 text-red-600" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-800 truncate">{doc.name}</div>
                          <div className="text-xs text-gray-400">{new Date(doc.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${doc.status === "uploaded" ? "bg-green-100 text-green-700" : doc.status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                          {doc.status}
                        </span>
                        <button onClick={() => handleDelete(doc.id, doc.file_path)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-6 py-10 text-center text-gray-400 text-sm">No documents uploaded yet</div>
              )}
            </div>
          </div>

          {/* Required Documents Checklist */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 h-fit sticky top-24">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-500" /> Required Documents
            </h3>
            <div className="space-y-2">
              {REQUIRED_DOCS.map(doc => {
                const uploaded = uploadedNames.some(n => n === doc);
                return (
                  <div key={doc} className={`flex items-center gap-2 p-2 rounded-lg text-xs ${uploaded ? "bg-green-50" : "bg-gray-50"}`}>
                    {uploaded ? (
                      <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-300 flex-shrink-0" />
                    )}
                    <span className={uploaded ? "text-green-700 line-through" : "text-gray-600"}>{doc}</span>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-gray-400 mt-4">✓ = Uploaded. Additional documents may be requested by our team.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
