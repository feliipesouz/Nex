import { storage } from '@/lib/firebaseAdmin'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    try {
        const { id, image } = await req.json()

        const base64Data = image.replace(/^data:image\/\w+;base64,/, '')
        const buffer = Buffer.from(base64Data, 'base64')
        const bucket = storage.bucket()

        const file = bucket.file(`saved-images/${id}.png`)

        await file.save(buffer, {
            metadata: {
                contentType: 'image/png',
                cacheControl: 'public, max-age=31536000',
            },
            public: true,
        })

        const publicUrl = `https://storage.googleapis.com/${bucket.name}/saved-images/${id}.png`

        return NextResponse.json({ url: publicUrl })
    } catch (err) {
        console.error(err)
        return new NextResponse('Erro ao salvar imagem', { status: 500 })
    }
}
