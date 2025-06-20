'use client'

type ModalProps = {
    show: boolean
    onClose: () => void
    message: string
}

export default function Modal({ show, onClose, message }: ModalProps) {
    if (!show) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-md text-center transition-all transform scale-100 opacity-100">
                <p className="text-lg font-medium text-gray-800 mb-4">{message}</p>
                <button
                    onClick={onClose}
                    className="mt-2 bg-zinc-700 text-white px-4 py-2 rounded hover:bg-zinc-600"
                >
                    Fechar
                </button>
            </div>
        </div>
    )
}
