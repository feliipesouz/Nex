type Props = {
    imageUrl: string
    onRetake: () => void
    onApprove: () => void
}

export default function Preview({ imageUrl, onRetake, onApprove }: Props) {
    return (
        <div className="h-screen w-full bg-white flex flex-col items-center justify-center gap-6 p-6">
            <img src={imageUrl} alt="Preview" className="max-h-[75vh] object-contain rounded shadow" />

            <div className="flex gap-20 md:justify-center md:w-full items-center justify-between">
                <button
                    onClick={onRetake}
                    className="bg-red-900 text-white text-lg font-semibold px-6 py-3 rounded hover:bg-red-800"
                >
                    Refazer
                </button>
                <button
                    onClick={onApprove}
                    className="bg-green-600 text-white text-lg font-semibold px-6 py-3 rounded hover:bg-green-500"
                >
                    Continuar
                </button>
            </div>
        </div>
    )
}
