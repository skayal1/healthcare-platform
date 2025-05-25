/*
  # Create profiles trigger function and trigger

  1. New Function
    - `handle_new_user` function to create profile record when a new user signs up
  
  2. Changes
    - Add trigger on auth.users table to call handle_new_user function
    
  3. Security
    - Function executes with security definer permissions
*/

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