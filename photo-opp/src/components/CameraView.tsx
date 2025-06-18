'use client'

import { useEffect, useRef, useState } from 'react'
import Countdown from './Countdown'
import LoadingSpinner from './LoadingSpinner'

type Props = {
    frameUrl: string
    onPhotoCaptured: (dataUrl: string) => void
}

export default function CameraView({ frameUrl, onPhotoCaptured }: Props) {
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [counting, setCounting] = useState(false)

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

    const handleShutterClick = () => {
        setCounting(true)
    }

    const handleCountdownComplete = () => {
        setCounting(false)

        const video = videoRef.current
        const canvas = canvasRef.current

        if (!video || !canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        canvas.width = video.videoWidth
        canvas.height = video.videoHeight

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

        const frame = new Image()
        frame.src = frameUrl
        frame.onload = () => {
            ctx.drawImage(frame, 0, 0, canvas.width, canvas.height)
            const dataUrl = canvas.toDataURL('image/png')
            onPhotoCaptured(dataUrl)
        }
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
            <div className="w-full h-screen flex flex-col justify-center items-center text-center p-6 text-zinc-700">
                <p className="text-lg font-semibold mb-4">Ops! Não foi possível acessar a câmera.</p>
                <p className="text-sm max-w-md">{error}</p>
            </div>
        )
    }

    return (
        <div className="relative w-full h-screen flex flex-col items-center justify-center bg-black">
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="rounded-lg w-auto h-full object-contain"
            />

            <canvas ref={canvasRef} className="hidden" />

            {!counting && (
                <button
                    onClick={handleShutterClick}
                    className="absolute bottom-10 w-20 h-20 rounded-full border-[6px] border-zinc-400 bg-white shadow-md hover:scale-105 transition"
                />
            )}

            {counting && <Countdown onComplete={handleCountdownComplete} />}
        </div>
    )
}
