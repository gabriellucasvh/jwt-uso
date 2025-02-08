import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"

// Simulação de banco de dados para armazenar usuários
const users: { email: string; password: string }[] = []

// Rota POST para registro de usuário
export async function POST(req: Request) {
    // Extrai email e senha da requisição
    const { email, password } = await req.json()

    if (!email || !password) {
        return NextResponse.json({ error: "E-mail e senha são obrigatórios" }, { status: 400 })
    }
    
    // Verifica se o usuário já existe
    if (users.find((user) => user.email === email)) {
        return NextResponse.json({ error: "Usuário já existe" }, { status: 400 })
    }
    // Hash da senha antes de armazenar
    const hashedPassword = await bcrypt.hash(password, 10)
    users.push({ email, password: hashedPassword })

    return NextResponse.json({ message: "Usuário registrado com sucesso" })
}
