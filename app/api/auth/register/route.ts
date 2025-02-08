import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

// Rota POST para registro de usuário
export async function POST(req: Request) {
    try {
    // Extrai email e senha da requisição
    const { email, password } = await req.json()

    if (!email || !password) {
        return NextResponse.json({ error: "E-mail e senha são obrigatórios" }, { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
        return NextResponse.json({ error: "Usuário já cadastrado" }, { status: 400 })
    }

    // Hash da senha antes de armazenar
    const hashedPassword = await bcrypt.hash(password, 10)
    await prisma.user.create({
        data: { email, password: hashedPassword },
    })  
        return NextResponse.json({ message: "Usuário registrado com sucesso" }, { status: 201 })

} catch (err) {
    console.error("Erro no registro:", err)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
    }
}