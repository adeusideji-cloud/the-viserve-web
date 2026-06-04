-- ViServe Inc. Supabase Database Schema

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table (extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  email text,
  phone text,
  country text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email, country)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.email,
    new.raw_user_meta_data->>'country'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Cases table
create table public.cases (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users on delete cascade not null,
  case_number text unique not null,
  case_type text not null, -- 'green-card', 'citizenship', 'work-visa', etc.
  form_number text,
  status text not null default 'in_progress', -- 'in_progress', 'submitted', 'approved', 'denied'
  current_step text,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.cases enable row level security;

create policy "Users can view own cases"
  on cases for select using (auth.uid() = user_id);

create policy "Users can insert own cases"
  on cases for insert with check (auth.uid() = user_id);

create policy "Users can update own cases"
  on cases for update using (auth.uid() = user_id);

-- Documents table
create table public.documents (
  id uuid primary key default uuid_generate_v4(),
  case_id uuid references public.cases on delete cascade,
  user_id uuid references auth.users on delete cascade not null,
  name text not null,
  file_path text,
  status text not null default 'pending', -- 'pending', 'uploaded', 'verified', 'rejected'
  required boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.documents enable row level security;

create policy "Users can manage own documents"
  on documents for all using (auth.uid() = user_id);

-- Contact submissions table
create table public.contact_submissions (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  country text,
  status text default 'new', -- 'new', 'read', 'responded'
  created_at timestamptz default now()
);

-- Only admins can read contact submissions (no RLS for simplicity, add admin role check)
alter table public.contact_submissions enable row level security;

create policy "Anyone can insert contact submissions"
  on contact_submissions for insert with check (true);

-- Newsletter subscribers
create table public.newsletter_subscribers (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  subscribed_at timestamptz default now(),
  active boolean default true
);

alter table public.newsletter_subscribers enable row level security;

create policy "Anyone can subscribe"
  on newsletter_subscribers for insert with check (true);

-- Deadlines table
create table public.deadlines (
  id uuid primary key default uuid_generate_v4(),
  case_id uuid references public.cases on delete cascade,
  user_id uuid references auth.users on delete cascade not null,
  title text not null,
  due_date date not null,
  description text,
  completed boolean default false,
  created_at timestamptz default now()
);

alter table public.deadlines enable row level security;

create policy "Users can manage own deadlines"
  on deadlines for all using (auth.uid() = user_id);
