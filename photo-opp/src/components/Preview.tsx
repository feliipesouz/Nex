type Props = {
    imageUrl: string
    onRetake: () => void
    onApprove: () => void
}

export default function Preview({ imageUrl, onRetake, onApprove }: Props) {
    return (
        <div className="h-screen w-full bg-background flex flex-col items-center justify-center gap-6 p-6">
            <img src={imageUrl} alt="Preview" className="max-h-[75vh] object-contain rounded shadow" />

            <div className="flex gap-20 md:justify-center md:w-full items-center justify-between">
                <button
                    onClick={onRetake}
                    className="bg-danger text-background text-lg font-semibold px-6 py-3 rounded hover:bg-dangerHover"
                >
                    Refazer
                </button>
                <button
                    onClick={onApprove}
                    className="bg-success text-background text-lg font-semibold px-6 py-3 rounded hover:bg-successHover"
                >
                    Continuar
                </button>
            </div>
        </div>
    )
}
