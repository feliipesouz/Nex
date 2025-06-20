import { apiFetch } from "@/app/api"

type UploadImageRequest = {
    id: string
    image: string
}

type UploadImageResponse = {
    url: string
}

export async function uploadImage(payload: UploadImageRequest): Promise<UploadImageResponse> {
    return apiFetch<UploadImageRequest, UploadImageResponse>({
        path: '/api/upload',
        body: payload,
    })
}
