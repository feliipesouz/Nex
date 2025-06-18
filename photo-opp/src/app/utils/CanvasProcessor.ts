export async function processarImagemComMoldura(
    video: HTMLVideoElement,
    frameUrl: string
): Promise<string> {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas')
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight

        const ctx = canvas.getContext('2d')!
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

        const moldura = new Image()
        moldura.src = frameUrl
        moldura.onload = () => {
            ctx.drawImage(moldura, 0, 0, canvas.width, canvas.height)
            resolve(canvas.toDataURL('image/png'))
        }

        moldura.onerror = () => {
            console.warn('Erro ao carregar moldura. Salvando sem moldura.')
            resolve(canvas.toDataURL('image/png'))
        }
    })
}
