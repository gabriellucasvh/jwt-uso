import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

// Define a chave secreta para o JWT, utilizando uma variável de ambiente ou valor padrão
const SECRET = process.env.SECRET || "default_secret"

interface User {
    email: string
    password: string
}

// Simulação com banco de dados com usuário pré-registrado
const users: User[] = [
    { email: "teste@email.com", password: await bcrypt.hash("123456", 10) }
]

// POST para autenticar o usuário
export async function POST(req: Request) {

    // Requisição para extrair os dados
    const { email, password }: { email: string; password: string } = await req.json()

    // Busca o usuário pelo email
    const user = users.find((user) => user.email === email)

    // Verifica se o usuário existe e se a senha está correta
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 })
    }

    // Gera um token JWT válido por 1 hora
    const token: string = jwt.sign({ email }, SECRET, { expiresIn: "1h" })
    return NextResponse.json({ token })
}