-- Rode no SQL Editor do Supabase para dar acesso ao painel de mentoria.
update public.profiles set role = 'mentor'
where id = (select id from auth.users where email = 'SEU-EMAIL-AQUI');
