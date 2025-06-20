'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

type Props = {
    params: { id: string }
}

export default function DownloadPage({ params }: Props) {
    const router = useRouter()

    useEffect(() => {
        const dataUrl = localStorage.getItem(params.id)
        if (!dataUrl) {
            alert('Imagem não encontrada.')
            router.push('/')
            return
        }

        const a = document.createElement('a')
        a.href = dataUrl
        a.download = 'photo.png'
        a.click()

        setTimeout(() => {
            router.push('/')
        }, 2000)
    }, [params.id, router])

    return (
        <div className="h-screen flex items-center justify-center text-center p-6">
            <p className="text-textMuted text-lg font-semibold">
                Preparando download da sua imagem...
            </p>
        </div>
    )
}
