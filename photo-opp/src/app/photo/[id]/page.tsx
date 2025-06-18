'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
// import { QRCodeCanvas } from 'qrcode.react'

type Props = {
    params: {
        id: string
    }
}

export default function PhotoFinalPage({ params }: Props) {
    const { id } = params
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        const saved = localStorage.getItem(id)
        if (saved) {
            setImageUrl(saved)
        } else {
            router.push('/')
        }

        const timeout = setTimeout(() => {
            router.push('/')
        }, 20000)

        return () => clearTimeout(timeout)
    }, [id, router])

    if (!imageUrl) return null

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-black p-4 gap-8">
            <h2 className="text-white text-2xl font-semibold text-center">Escaneie o QR Code para baixar sua imagem</h2>

            {/* <QRCodeCanvas
                value={imageUrl}
                size={200}
                bgColor="#ffffff"
                fgColor="#000000"
                level="H"
            /> */}

            <img src={imageUrl} alt="Foto final" className="max-h-[60vh] rounded-lg shadow-lg" />

            <p className="text-white text-sm opacity-60 mt-4">Você será redirecionado à tela inicial em alguns segundos...</p>
        </div>
    )
}
