"use client"

import { useState } from 'react';

export default function Registro() {
    // Estados para armazenar email, senha, token e mensagens
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [token, setToken] = useState<string | null>(null)
    const [message, setMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    // Função para lidar com o login do usuário
    const handleLogin = async () => {
        try {

            setIsLoading(true)
            setMessage("")

            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            })

            const data = await res.json()
            if (res.ok) {
                setMessage(data.message)
                if (data.token) {
                    localStorage.setItem("token", data.token)
                    setToken(data.token)
                }
            } else {
                setMessage(data.error)
            }
        } catch (error) {
            setMessage("Erro ao conectar com o servidor")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='min-h-screen w-full flex flex-col items-center justify-center gap-4 p-6 bg-gray-900 text-white'>
            <h1 className='text-2xl font-bold'>Registro com JWT</h1>

            <input
                type="email"
                placeholder='E-mail'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='p-2 rounded bg-gray-800 border-gray-600'
            />

            <input
                type="password"
                placeholder='Senha'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='p-2 rounded bg-gray-800 border-gray-600'
            />

            <button onClick={handleLogin} disabled={isLoading} className='px-4 py-2 bg-blue-600 rounded'>
                {isLoading ? "Carregando" : "Cadastrar"}
            </button>

            {/* Exibição de mensagens de resposta do servidor */}
            {message && <p className='mt-4'>{message}</p>}
        </div>
    )
}
