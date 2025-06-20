'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { QRCodeCanvas } from 'qrcode.react'
import Modal from '@/components/Modal'

export default function PhotoFinalPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const url = searchParams.get('url')

    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if (!url) router.push('/')

        const modalTimeout = setTimeout(() => {
            setShowModal(true)
        }, 6000)

        const returnTimeout = setTimeout(() => {
            router.push('/')
        }, 20000)

        return () => {
            clearTimeout(modalTimeout)
            clearTimeout(returnTimeout)
        }
    }, [url, router])

    if (!url) return null

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-white gap-8 p-6">
            <h2 className="text-2xl font-semibold text-center">
                Escaneie o QR Code para baixar sua imagem
            </h2>

            <QRCodeCanvas value={url} size={200} level="H" />

            <img src={url} alt="Foto" className="max-h-[60vh] rounded shadow" />

            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                message="Obrigado pela oportunidade, espero que gostem do meu trabalho."
            />
        </div>
    )
}
