/*
  # User Profile Management

  1. Changes
    - Creates handle_new_user function if not exists
    - Enables RLS on profiles table
    - Creates trigger for new user creation if not exists
    - Creates policies for profile access

  2. Security
    - Enables RLS
    - Adds policies for authenticated users
*/

-- Drop existing trigger if it exists
drop trigger if exists on_auth_user_created on auth.users;

-- Create or replace function
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    (new.raw_user_meta_data->>'role')::user_role
  );
  return new;
end;
$$;

-- Enable RLS
alter table public.profiles enable row level security;

-- Create trigger
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Drop existing policies if they exist
drop policy if exists "Users can read own profile" on profiles;
drop policy if exists "Users can update own profile" on profiles;

-- Create policies
create policy "Users can read own profile"
  on profiles for select
  to authenticated
  using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);