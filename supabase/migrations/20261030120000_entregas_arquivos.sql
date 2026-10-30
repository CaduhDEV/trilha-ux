-- =====================================================================
-- Entregas com arquivos anexados (Supabase Storage) no lugar de links
-- =====================================================================

-- Lista de anexos: [{ "path", "name", "size", "type" }]
alter table public.submissions add column if not exists files jsonb not null default '[]';

-- Bucket privado; cada pessoa grava só na própria pasta: <user_id>/<practice_id>/<arquivo>
insert into storage.buckets (id, name, public, file_size_limit)
values ('entregas', 'entregas', false, 26214400) -- 25 MB por arquivo
on conflict (id) do update set public = false, file_size_limit = excluded.file_size_limit;

create policy "entregas: dona envia" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'entregas' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "entregas: dona lê, mentor lê" on storage.objects
  for select to authenticated
  using (bucket_id = 'entregas' and ((storage.foldername(name))[1] = auth.uid()::text or public.is_mentor()));

create policy "entregas: dona apaga" on storage.objects
  for delete to authenticated
  using (bucket_id = 'entregas' and (storage.foldername(name))[1] = auth.uid()::text);
