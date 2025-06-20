'use client'

import { useEffect, useState } from 'react'

type CountdownProps = {
    onComplete: () => void
}

export default function Countdown({ onComplete }: CountdownProps) {
    const [count, setCount] = useState(3)
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        if (count === 0) {
            setVisible(false)
            onComplete()
            return
        }

        const timer = setTimeout(() => {
            setCount((prev) => prev - 1)
        }, 1000)

        return () => clearTimeout(timer)
    }, [count, onComplete])

    if (!visible) return null

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
            <span
                key={count}
                className="text-[80px] md:text-[160px] font-extrabold text-background drop-shadow-lg animate-scale-fade"
            >
                {count}
            </span>
        </div>
    )
}
