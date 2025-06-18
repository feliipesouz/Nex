'use client'

import { useState } from 'react'
import CameraView from '@/components/CameraView'

export default function CapturePage() {
    const [photo, setPhoto] = useState<string | null>(null)

    if (photo) {
        return (
            <div className="h-screen flex items-center justify-center bg-black">
                <img src={photo} alt="Foto capturada" className="max-h-screen object-contain" />
            </div>
        )
    }

    return (
        <CameraView
            frameUrl="/frames/frame.png"
            onPhotoCaptured={(dataUrl) => setPhoto(dataUrl)}
        />
    )
}
