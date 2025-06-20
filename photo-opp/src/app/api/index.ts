const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    (typeof window !== 'undefined'
        ? window.location.origin
        : 'http://localhost:3000')

type RequestOptions<T> = {
    path: string
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
    body?: T
    headers?: HeadersInit
}

export async function apiFetch<TReq, TRes>({
    path,
    method = 'POST',
    body,
    headers = { 'Content-Type': 'application/json' },
}: RequestOptions<TReq>): Promise<TRes> {
    const res = await fetch(`${baseUrl}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    })

    if (!res.ok) {
        const message = await res.text()
        throw new Error(`Erro ${res.status}: ${message}`)
    }

    return res.json()
}
