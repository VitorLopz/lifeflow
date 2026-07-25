# LifeFlow API

Backend em NestJS + Prisma + PostgreSQL para o app LifeFlow, com autenticação
JWT multiusuário e um endpoint por entidade (tarefas, hábitos, metas,
finanças, diário, notas, treinos, sono, nutrição, arquivos etc.).

## 1. Pré-requisitos

- Node.js 18+
- Uma instância PostgreSQL (local, ou gratuita no [Neon](https://neon.tech),
  [Railway](https://railway.app) ou [Supabase](https://supabase.com))

## 2. Instalação

```bash
npm install
cp .env.example .env
# edite o .env com sua DATABASE_URL e um JWT_SECRET aleatório
```

## 3. Banco de dados

```bash
npx prisma generate
npx prisma migrate dev --name init
npm run seed   # opcional: cria um usuário demo@lifeflow.app / demo12345 com dados de exemplo
```

## 4. Rodar localmente

```bash
npm run start:dev
# API disponível em http://localhost:3333
```

## 5. Endpoints principais

Autenticação (públicos):
- `POST /auth/register` — `{ email, password, name? }` → `{ accessToken, user }`
- `POST /auth/login` — `{ email, password }` → `{ accessToken, user }`

Todos os demais endpoints exigem o header `Authorization: Bearer <token>`.

- `GET /me` — perfil do usuário logado
- `GET /me/all` — **todo o estado do app em uma única chamada** (usado no boot do frontend)
- `GET/PATCH /settings` — preferências (tema, notificações)
- CRUD padrão (`GET`, `POST`, `PATCH /:id`, `DELETE /:id`) em:
  `/tasks`, `/projects`, `/goals`, `/transactions`, `/journal`, `/notes`,
  `/books`, `/courses`, `/workouts`, `/runs`, `/meals`, `/files`
- `/habits` — CRUD + `POST /habits/:id/toggle?date=YYYY-MM-DD` + `GET /habits/:id/streak`
- `/sleep-logs`, `/weight-logs`, `/water` — `GET` + `POST` (upsert por data, um registro por dia)

## 6. Deploy em produção

1. Suba este repositório no GitHub.
2. Crie o banco gerenciado (Neon é o mais rápido) e copie a `DATABASE_URL`.
3. No Railway ou Render: conecte o repositório, configure as variáveis de
   ambiente (`DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `CORS_ORIGIN`
   com a URL do seu frontend) e defina o comando de build/start:
   - Build: `npm install && npx prisma generate && npm run build`
   - Start: `npx prisma migrate deploy && npm run start:prod`
4. Aponte o `API_BASE` do frontend (`lifeflow-connected.html`) para a URL
   pública gerada.

## 7. Segurança já incluída

- Senhas com hash `bcrypt` (nunca texto puro).
- Todas as rotas de dados exigem JWT válido.
- Toda consulta/alteração é filtrada por `userId` — um usuário nunca
  enxerga ou edita dados de outro (`BaseCrudService` garante isso).
- `ValidationPipe` global rejeita payloads com campos não esperados.
- Rate limiting básico (100 req/min por IP) via `@nestjs/throttler`.
- CORS restrito ao(s) domínio(s) definido(s) em `CORS_ORIGIN`.

## 8. Próximos passos sugeridos

- Adicionar refresh tokens (hoje o JWT expira em 7 dias e exige novo login).
- Adicionar upload real de arquivos (ex. S3/Cloudflare R2) — hoje `/files`
  guarda apenas metadados.
- Testes automatizados (Jest já vem com o Nest).

## 9. Atualização — novos recursos

Esta versão adiciona:
- **Correção crítica de validação**: números/booleanos vindos de formulários HTML
  (sempre chegam como string) agora são convertidos automaticamente
  (`enableImplicitConversion: true` no `main.ts`). Isso resolvia falhas ao
  criar transações, metas, refeições, peso, sono etc.
- **`CalendarEvent`**: novo model + módulo `/calendar-events` (CRUD) para
  eventos manuais no calendário.
- **Upload real de arquivos**: `POST /files/upload` (multipart, campo `file`)
  salva o binário em `./uploads` e cria o metadado; `GET /files/:id/download`
  baixa o arquivo autenticado. Troque `diskStorage` por um adapter de S3/R2
  quando for para produção (discos de containers não são persistentes).
- **Assistente IA**: `POST /assistant` — `{ prompt, context }` → `{ reply }`.
  Chama a Anthropic API do lado do servidor. Configure `ANTHROPIC_API_KEY`
  no `.env` (nunca no frontend).

Depois de puxar essa atualização, rode novamente:

```bash
npx prisma generate
npx prisma migrate dev --name add_calendar_events_and_file_upload
```
