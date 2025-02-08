# **Documentação do Projeto: Chat com Autenticação JWT e Prisma**

## **1. Visão Geral**
Este projeto é um sistema de chat com autenticação JWT, construído utilizando **Next.js**, **Prisma**, **PostgreSQL** e **bcryptjs** para hashing de senhas. O projeto permite o registro, login, gerenciamento de sessões e acesso a rotas protegidas.

## **2. Tecnologias Utilizadas**
- **Next.js** - Framework para React
- **Prisma** - ORM para interação com o banco de dados PostgreSQL
- **PostgreSQL** - Banco de dados relacional
- **bcryptjs** - Hashing de senhas
- **JSON Web Tokens (JWT)** - Autenticação segura
- **Tailwind CSS** - Estilização do frontend

## **3. Estrutura do Projeto**
```
/
├── prisma/
│   ├── schema.prisma  # Configuração do banco de dados
│
├── src/ (raiz)
│   ├── app/
│   │   ├── layout.tsx  # Layout do Next.js
│   │   ├── page.tsx  # Página principal
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── login/route.ts  # Endpoint de login
│   │   │   │   ├── register/route.ts  # Endpoint de registro
│   │   │   │   ├── protected/route.ts  # Endpoint protegido
│   │
│   ├── components/
│   │   ├── Registro.tsx  # Componente de registro
│   │   ├── Login.tsx  # Componente de login
│
├── .env  # Variáveis de ambiente
├── .env.local  # Armazena key sensível 
├── package.json  # Dependências do projeto
├── tailwind.config.js  # Configuração do Tailwind
```

## **4. Configuração do Banco de Dados**
### **4.1. Definição do Prisma**
Arquivo `prisma/schema.prisma`:

```prisma
model User {
  id       String @id @default(uuid())
  email    String @unique
  password String
}
```

### **4.2. Configuração das Variáveis de Ambiente**
Crie um arquivo `.env` na raiz do projeto:
```plaintext
DATABASE_URL="postgresql://usuario:senha@localhost:5432/meubanco"
JWT_SECRET="sua_chave_secreta" #Neste projeto, fica em .env.local
```

### **4.3. Criar o Banco e Aplicar Migração**
Execute os seguintes comandos:
```sh
npx prisma migrate dev --name init
npx prisma db push
```

## **5. Endpoints da API**
### **5.1. Registro de Usuário**
**Rota:** `POST /api/auth/register`

**Exemplo de Request:**
```json
{
  "email": "usuario@email.com",
  "password": "123456"
}
```

**Exemplo de Response:**
```json
{
  "message": "Usuário registrado com sucesso"
}
```

### **5.2. Login de Usuário**
**Rota:** `POST /api/auth/login`

**Exemplo de Request:**
```json
{
  "email": "usuario@email.com",
  "password": "123456"
}
```

**Exemplo de Response:**
```json
{
  "token": "seu_token_jwt"
}
```

### **5.3. Rota Protegida**
**Rota:** `GET /api/auth/protected`

**Headers:**
```plaintext
Authorization: Bearer SEU_TOKEN
```

**Exemplo de Response:**
```json
{
  "message": "Acesso permitido"
}
```

## **6. Autenticação no Frontend**
### **6.1. Registro de Usuário**
Arquivo `Registro.tsx`:

```tsx
const handleRegister = async () => {
    setMessage("")
    const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    setMessage(res.ok ? data.message : data.error)
}
```

### **6.2. Login de Usuário**
Arquivo `Login.tsx`:

```tsx
const handleLogin = async () => {
    const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (res.ok) {
        localStorage.setItem("token", data.token)
        setToken(data.token)
    } else {
        setMessage(data.error)
    }
}
```

### **6.3. Verificação de Rota Protegida**
```tsx
const handleCheckProtected = async () => {
    const res = await fetch("/api/auth/protected", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    const data = await res.json()
    setMessage(data.message || data.error)
}
```

## **7. Considerações Finais**
- **Segurança**: JWT deve ser armazenado com cuidado para evitar ataques XSS. O ideal é usar `httpOnly cookies` ao invés de `localStorage`.
- **Erros**: Sempre trate erros com mensagens claras para o usuário e registre logs no servidor para depuração.
- **Melhoria Futura**: Implementar refresh token e expiração automática do token JWT.

Caso precise de melhorias ou explicações adicionais, só avisar! 🚀

