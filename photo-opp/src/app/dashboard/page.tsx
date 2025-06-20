'use client'

import LoadingSpinner from '@/components/LoadingSpinner'
import { useEffect, useState } from 'react'

interface Participation {
    id: string
    imageUrl: string
    createdAt: string
}

export default function DashboardPage() {
    const [participations, setParticipations] = useState<Participation[]>([])
    const [todayCount, setTodayCount] = useState<number>(0)
    const [todayDate, setTodayDate] = useState<string>('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/participations')
            .then(res => res.json())
            .then(data => {
                const today = new Date()
                today.setHours(0, 0, 0, 0)

                const filtered = data.all.filter((p: Participation) => {
                    return new Date(p.createdAt) >= today
                })

                setParticipations(filtered)
                setTodayCount(data.today.count)
                setTodayDate(data.today.date)
                setLoading(false)
            })
    }, [])

    if (loading) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <LoadingSpinner />
            </div>
        )
    }


    return (
        <div className="p-6 space-y-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow p-4">
                    <p className="text-gray-500">Participações de hoje ({todayDate})</p>
                    <p className="text-2xl font-semibold">{todayCount}</p>
                </div>
            </div>

            <div className="overflow-auto">
                <table className="min-w-full text-left border mt-4">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border">ID</th>
                            <th className="p-2 border">Data</th>
                            <th className="p-2 border">Imagem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {participations.map(p => (
                            <tr key={p.id} className="hover:bg-gray-50">
                                <td className="p-2 border text-xs">{p.id}</td>
                                <td className="p-2 border">{new Date(p.createdAt).toLocaleString()}</td>
                                <td className="p-2 border">
                                    <a
                                        href={p.imageUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline"
                                    >
                                        Ver
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
