# Games Online API

Backend com cadastro, login, favoritos, recordes, ranking global e painel ADM.

## Configuração
1. Copie .env.example para .env.
2. Defina JWT_SECRET.
3. Defina ADMIN_EMAIL e ADMIN_PASSWORD.
4. npm install
5. npm start

A conta ADM é criada automaticamente na primeira inicialização se ADMIN_EMAIL/ADMIN_PASSWORD estiverem configurados.

## Endpoints
- POST /api/register
- POST /api/login
- GET /api/me
- GET/POST/DELETE /api/favorites
- POST /api/scores
- GET /api/ranking
- GET /api/admin/stats
- GET /api/admin/users
