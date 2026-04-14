# Headless WordPress

Et headless WordPress setup med Docker, der eksponerer indhold via WPGraphQL.

## Krav

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

## Kom i gang

### 1. Klon repositoriet

```bash
git clone https://github.com/naif2500/headless_opgave.git
cd headless_opgave/headless_wordpress
```

### 2. Opret .env fil

Opret en fil kaldet `.env` i `headless_wordpress/` mappen med følgende indhold:

```env
MYSQL_DATABASE=wordpress
MYSQL_USER=wpuser
MYSQL_PASSWORD=wppassword
MYSQL_ROOT_PASSWORD=rootpassword
```

### 3. Opret nødvendige mapper

```bash
mkdir plugins
mkdir themes
```

### 4. Start containerne

```bash
docker compose up -d
```

### 5. Installér WordPress

```bash
docker compose exec wordpress wp core install \
  --url=http://localhost:8080 \
  --title="Headless WP" \
  --admin_user=admin \
  --admin_password=admin123 \
  --admin_email=admin@example.com \
  --allow-root
```

### 6. Installér WP-CLI i containeren

```bash
docker compose exec wordpress bash
curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
chmod +x wp-cli.phar
mv wp-cli.phar /usr/local/bin/wp
exit
```

### 7. Installér WPGraphQL

```bash
docker compose exec wordpress wp plugin install wp-graphql --activate --allow-root
```

Bekræft at det virker ved at åbne **http://localhost:8080/graphql** i din browser.

## Next.js Frontend

### 1. Opret .env.local fil

Opret en fil kaldet `.env.local` i `headless_frontend/` mappen:

```env
NEXT_PUBLIC_WORDPRESS_API_URL=http://localhost:8080/graphql
```

### 2. Start frontend

```bash
cd ../headless_frontend
npm install
npm run dev
```

## Adgang

| Service | URL |
|---|---|
| WordPress | http://localhost:8080 |
| WP Admin | http://localhost:8080/wp-admin |
| phpMyAdmin | http://localhost:8081 |
| GraphQL endpoint | http://localhost:8080/graphql |
| Next.js frontend | http://localhost:3000 |

## Standard legitimationsoplysninger

| | Brugernavn | Adgangskode |
|---|---|---|
| WP Admin | admin | admin123 |
| phpMyAdmin | root | *(fra din .env)* |

## Nyttige kommandoer

```bash
# Start
docker compose up -d

# Stop
docker compose down

# Stop og slet database
docker compose down -v

# Se logs
docker compose logs -f

# Åbn shell i WordPress containeren
docker compose exec wordpress bash
```

## Projektstruktur

```
headless_opgave/
├── README.md
├── headless_wordpress/     ← Docker WordPress backend
│   ├── docker-compose.yml
│   ├── .env                # kun lokalt, ikke i git
│   ├── plugins/
│   └── themes/
└── headless_frontend/      ← Next.js frontend
    ├── app/
    │   ├── page.js
    │   └── posts/
    │       └── [slug]/
    │           └── page.js
    ├── lib/
    │   └── api.js
    └── .env.local          # kun lokalt, ikke i git