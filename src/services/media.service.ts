import apiClient from '@/lib/api-client'
import { UploadMediaResponse, UploadMediaResponseSchema } from '@/validations'

export const mediaService = {
  uploadRaw: async (file: File): Promise<UploadMediaResponse> => {
    const formData = new FormData()
    formData.append('file', file)

    const response = await apiClient.post('/media/upload-raw', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return UploadMediaResponseSchema.parse(response)
  },

  deleteRaw: async (publicId: string): Promise<void> => {
    await apiClient.delete(`/media/delete-raw`, {
      params: { publicId },
    })
  },

  deleteMulti: async (publicIds: string[]): Promise<void> => {
    if (!publicIds || publicIds.length === 0) return
    await apiClient.post('/media/delete-multi', publicIds)
  },
}
