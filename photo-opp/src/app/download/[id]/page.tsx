'use client'

import { useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

export default function DownloadPage() {
    const searchParams = useSearchParams()
    const url = searchParams.get('url')
    const router = useRouter()

    useEffect(() => {
        if (!url) {
            router.push('/')
            return
        }

        const a = document.createElement('a')
        a.href = url
        a.download = 'photo.png'
        a.click()

        setTimeout(() => {
            router.push('/')
        }, 2000)
    }, [url, router])

    return (
        <div className="h-screen flex items-center justify-center text-center p-6">
            <p className="text-textMuted text-lg font-semibold">
                Preparando download da sua imagem...
            </p>
        </div>
    )
}
