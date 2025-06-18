'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { QRCodeCanvas } from 'qrcode.react'

type Props = {
    params: {
        id: string
    }
}

export default function PhotoFinalPage({ params }: Props) {
    const { id } = params
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        const saved = localStorage.getItem(id)
        if (saved) {
            setImageUrl(saved)

            const blob = dataURLtoBlob(saved)
            const url = URL.createObjectURL(blob)
            setDownloadUrl(url)
        } else {
            router.push('/')
        }

        const timeout = setTimeout(() => {
            router.push('/')
        }, 20000)

        return () => clearTimeout(timeout)
    }, [id, router])

    if (!imageUrl || !downloadUrl) return null

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-white p-4 gap-8">
            <h2 className="text-white text-2xl font-semibold text-center">Escaneie o QR Code para baixar sua imagem</h2>

            <QRCodeCanvas
                value={downloadUrl}
                size={200}
                bgColor="#ffffff"
                fgColor="#000000"
                level="H"
            />

            <img src={imageUrl} alt="Foto final" className="max-h-[60vh] rounded-lg shadow-lg" />

            <p className="text-white text-sm opacity-60 mt-4">Você será redirecionado à tela inicial em alguns segundos...</p>
        </div>
    )
}

function dataURLtoBlob(dataURL: string) {
    const byteString = atob(dataURL.split(',')[1])
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0]

    const ab = new ArrayBuffer(byteString.length)
    const ia = new Uint8Array(ab)
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
    }

    return new Blob([ab], { type: mimeString })
}
