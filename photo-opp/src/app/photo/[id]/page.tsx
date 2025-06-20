'use client'

import { useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { QRCodeCanvas } from 'qrcode.react'

export default function PhotoFinalPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const url = searchParams.get('url')

    useEffect(() => {
        if (!url) {
            router.push('/')
        }

        const timeout = setTimeout(() => {
            router.push('/')
        }, 20000)

        return () => clearTimeout(timeout)
    }, [url, router])

    if (!url) return null

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-background gap-8 p-6">
            <h2 className="text-2xl font-semibold text-center">Escaneie o QR Code para baixar sua imagem</h2>

            <QRCodeCanvas value={url} size={200} level="H" />

            <img src={url} alt="Foto" className="max-h-[60vh] rounded shadow" />
        </div>
    )
}
