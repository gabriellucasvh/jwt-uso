"use client"

import { useState } from 'react';

export default function Registro() {
    // Estados para armazenar email, senha, token e mensagens
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [token, setToken] = useState<string | null>(null)
    const [message, setMessage] = useState("")

    // Função para lidar com o login do usuário
    const handleLogin = async () => {
        const res = await fetch("/api/auth/register", {
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
    
    // Função para verificar acesso a rota protegida
    const handleCheckProtected = async () => {
        const res = await fetch("/api/auth/protected", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        const data = await res.json()
        setMessage(data.message || data.error)
    }

    // Função para logout e remoção do token armazenado
    const handleLogout = () => {
        localStorage.removeItem("token")
        setToken(null)
    }

    return (
        <div className='min-h-screen flex flex-col items-center justify-center gap-4 p-6 bg-gray-900 text-white'>
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
            
            <button onClick={handleLogin} className='px-4 py-2 bg-blue-600 rounded'>
                Entrar
            </button>

            {/* Botão de logout (visível apenas se o usuário estiver autenticado) */}
            {token && (
                <button onClick={handleLogout} className='px-4 py-2 bg-red-600 rounded'>
                    Logout
                </button>
            )}
            
            {/* Botão para testar a rota protegida */}
            <button onClick={handleCheckProtected} className='px-4 py-2 bg-green-600 rounded'>
                Testar rota protegida
            </button>

            {/* Exibição de mensagens de resposta do servidor */}
            {message && <p className='mt-4'>{message}</p>}
        </div>
    )
}
