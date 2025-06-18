'use client'

import { useEffect, useRef, useState } from 'react'
import LoadingSpinner from './LoadingSpinner'

export default function Camera() {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const enableCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'user' },
                    audio: false,
                })

                if (videoRef.current) {
                    videoRef.current.srcObject = stream
                }

                setLoading(false)
            } catch (err) {
                console.error('Erro ao acessar a câmera:', err)
                setError('Permissão para acessar a câmera foi negada ou não está disponível.')
                setLoading(false)
            }
        }

        enableCamera()
    }, [])

    if (loading) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <LoadingSpinner />
            </div>
        )
    }

    if (error) {
        return (
            <div className="w-full h-full flex flex-col justify-center items-center text-center p-6 text-zinc-700">
                <p className="text-lg font-semibold mb-4">Ops! Não foi possível acessar a câmera.</p>
                <p className="text-sm max-w-md">{error}</p>
            </div>
        )
    }

    return (
        <div className="w-full h-full flex justify-center items-center">
            <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-auto h-[80vh] rounded-lg shadow-md"
            />
        </div>
    )
}
