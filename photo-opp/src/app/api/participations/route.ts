import { storage } from '@/lib/firebaseAdmin'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const [files] = await storage.bucket().getFiles({ prefix: 'saved-images/' })

        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const allItems = await Promise.all(
            files.map(async (file) => {
                const [metadata] = await file.getMetadata()
                const createdAtRaw = metadata.timeCreated ?? ''
                const createdAt = new Date(createdAtRaw)

                return {
                    id: file.name.replace('saved-images/', '').replace('.png', ''),
                    imageUrl: `https://storage.googleapis.com/${file.bucket.name}/${file.name}`,
                    createdAt,
                }
            })
        )

        const todayCount = allItems.filter(item => item.createdAt >= today).length

        return NextResponse.json({
            today: {
                date: today.toLocaleDateString('pt-BR'),
                count: todayCount,
            },
            all: allItems,
        })
    } catch (error) {
        console.error('Erro ao acessar o Storage:', error)
        return new NextResponse('Erro ao acessar o Storage', { status: 500 })
    }
}
