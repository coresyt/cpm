# Cloud Platform for Microcontrollers

## Quick Started

1. Install packages

```bash
pnpm install
pnpm approve-builds
```

2. Create private and public pem in backend

```bash
cd apps/server/

openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -aes256 -out private.pem
openssl rsa -in private.pem -pubout -out public.pem
```

3. Create .env

- Windows

  ```pwsh
  cd ./apps/server/

  New-Item -Path . -Name ".env"
  ```

- Linux & MacOS

  ```bash
  cd ./apps/server/

  touch .env
  ```

4. Add variables in env

```env
PORT = 3000
HOST = 127.0.0.1
HTTPS = false # Set it to true if you're going to use it with https!
DB_FILE = "db"
```

5. Generate self-signed certificates

```bash
cd apps/server/

mkdir ssl/
cd ssl/

openssl req -nodes -new -x509 -keyout server.key -out server.cert
```

6. Run server and frontend

```bash
pnpm --recursive dev
```
