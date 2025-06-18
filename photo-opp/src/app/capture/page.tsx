'use client'

import { useState } from 'react'
import CameraView from '@/components/CameraView'
import Preview from '@/components/Preview'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

export default function CapturePage() {
    const [photo, setPhoto] = useState<string | null>(null)
    const router = useRouter()

    const handleApprove = () => {
        const id = uuidv4()
        localStorage.setItem(id, photo!)
        router.push(`/photo/${id}`)
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

    return (
        <CameraView
            frameUrl="/frames/frame.png"
            onPhotoCaptured={(dataUrl) => setPhoto(dataUrl)}
        />
    )
}
