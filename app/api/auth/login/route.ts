import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { PrismaClient } from "@prisma/client"

// Define a chave secreta para o JWT, utilizando uma variável de ambiente ou valor padrão
const prisma = new PrismaClient()
function getSecret(): string {

    const secret = process.env.SECRET
    if (!secret || secret.length === 0) {
        throw new Error("A variável de ambiente SECRET é necessária para produção")
    }
    return secret
}
const SECRET = getSecret()

// POST para autenticar o usuário
export async function POST(req: Request) {
    try {
        // Requisição para extrair os dados
        const { email, password } = await req.json()

        // Busca o usuário pelo email
        const user = await prisma.user.findUnique({ where: { email } })

        // Verifica se o usuário existe e se a senha está correta
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 })
        }

        // Gera um token JWT válido por 1 hora
        const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" })
        return NextResponse.json({ token })
    } catch (error) {
        return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
    }
}