import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Obtém a chave secreta do ambiente e valida sua existência
const SECRET = process.env.SECRET as string
if (!SECRET) throw new Error("A variável SECRET não foi definida no ambiente.")

// Rota GET para verificar a autenticação
export async function GET(req: Request) {
    // Obtém o cabeçalho de autorização
    const authHeader = req.headers.get("authorization") || req.headers.get("Authorization")

    // Verifica se o token foi fornecido
    if (!authHeader) {
        return NextResponse.json({ error: "Token ausente" }, { status: 401 })
    }

    try {
        // Extrai o token do cabeçalho e verifica a autenticidade
        const token = authHeader.split(" ")[1]
        jwt.verify(token, SECRET)
        return NextResponse.json({ message: "Acesso permitido" })
    } catch {
        return NextResponse.json({ error: "Token inválido" }, { status: 403 })
    }
}