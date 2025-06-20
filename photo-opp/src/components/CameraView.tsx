'use client'

import { useEffect, useRef, useState } from 'react'
import Countdown from './Countdown'
import LoadingSpinner from './LoadingSpinner'

type Props = {
    onCapture: (video: HTMLVideoElement) => void
}

export default function CameraView({ onCapture }: Props) {
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [counting, setCounting] = useState(false)

    useEffect(() => {
        const enableCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'user' },
                })

                console.log('Stream capturado:', stream)

                if (videoRef.current) {
                    videoRef.current.srcObject = stream
                    console.log('srcObject setado no vídeo')
                }

                const devices = await navigator.mediaDevices.enumerateDevices()
                console.log('Devices disponíveis:', devices)
                setLoading(false)
            } catch (err) {
                console.error('Erro ao acessar a câmera:', err)
                setError('Permissão para acessar a câmera foi negada ou não está disponível.')
                setLoading(false)
            }
        }

        enableCamera()
    }, [])

    const handleShutterClick = async () => {
        const video = videoRef.current
        if (!video) return

        try {
            await video.play()
            setCounting(true)
            console.log('Play manual acionado')
        } catch (err) {
            console.warn('Erro ao tentar dar play manualmente:', err)
        }
    }

    const handleCountdownComplete = async () => {
        setCounting(false)
        const video = videoRef.current
        if (!video) return

        console.log('ReadyState antes da captura:', video.readyState)
        console.log('VideoWidth:', video.videoWidth, 'VideoHeight:', video.videoHeight)

        await new Promise<void>((resolve) => {
            if (video.videoWidth > 0 && video.videoHeight > 0) return resolve()
            const check = setInterval(() => {
                if (video.videoWidth > 0 && video.videoHeight > 0) {
                    clearInterval(check)
                    resolve()
                }
            }, 100)
        })

        onCapture(video)
    }

    if (loading) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <LoadingSpinner />
            </div>
        )
    }

    if (error) {
        return (
            <div className="w-full h-screen flex flex-col justify-center items-center text-center p-6 text-textMuted">
                <p className="text-lg font-semibold mb-4">Ops! Não foi possível acessar a câmera.</p>
                <p className="text-sm max-w-md">{error}</p>
            </div>
        )
    }

    return (
        <div className="relative w-full h-screen flex flex-col items-center justify-center bg-text">
            <video
                ref={videoRef}
                muted
                playsInline
                autoPlay={false}
                className="absolute inset-0 w-full h-full object-cover"
            />

            {!counting && (
                <button
                    onClick={handleShutterClick}
                    className="absolute bottom-10 w-20 h-20 rounded-full border-[6px] border-borderMuted bg-background shadow-md hover:scale-105 transition"
                />
            )}

            {counting && <Countdown onComplete={handleCountdownComplete} />}
        </div>
    )
}
