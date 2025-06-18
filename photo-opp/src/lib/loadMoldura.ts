export function loadMoldura(frameUrl: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = frameUrl
        img.onload = () => resolve(img)
        img.onerror = () => reject(new Error('Falha ao carregar a moldura'))
    })
}
