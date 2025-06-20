'use client'

import { useState } from 'react'
import CameraView from '@/components/CameraView'
import Preview from '@/components/Preview'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import { loadMoldura } from '@/lib/loadMoldura'

export default function CapturePage() {
    const [photo, setPhoto] = useState<string | null>(null)
    const router = useRouter()

    const handleApprove = async () => {
        const id = uuidv4()

        const response = await fetch('/api/upload', {
            method: 'POST',
            body: JSON.stringify({ id, image: photo }),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const { url } = await response.json()

        router.push(`/photo/${id}?url=${encodeURIComponent(url)}`)
    }



    const handleCapture = async (video: HTMLVideoElement) => {
        try {
            const moldura = await loadMoldura('/frames/frame.png')

            const canvas = document.createElement('canvas')
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight

            const ctx = canvas.getContext('2d')!
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
            ctx.drawImage(moldura, 0, 0, canvas.width, canvas.height)

            const dataUrl = canvas.toDataURL('image/png')
            setPhoto(dataUrl)
        } catch (err) {
            console.error('Erro ao capturar imagem:', err)
            alert('Não foi possível aplicar a moldura.')
        }
    }

    if (photo) {
        return (
            <Preview
                imageUrl={photo}
                onRetake={() => setPhoto(null)}
                onApprove={handleApprove}
            />
        )
    }

    return <CameraView onCapture={handleCapture} />
}
