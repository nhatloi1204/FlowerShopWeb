import apiClient from '@/lib/api-client'
import {
  ProductTagListSchema,
  ProductTagOutput,
  TagFormData,
  tagFormSchema,
} from '@/validations'

export const productTagService = {
  getAll: async (): Promise<ProductTagOutput[]> => {
    const response = await apiClient.get('/product-tags')
    return ProductTagListSchema.parse(response.data)
  },

  create: async (payload: TagFormData) => {
    const validatedPayload = tagFormSchema.parse(payload)
    const response = await apiClient.post(
      '/admin/product-tags',
      validatedPayload,
    )
    return response.data
  },

  update: async (id: number, payload: TagFormData) => {
    const validatedPayload = tagFormSchema.parse(payload)
    const response = await apiClient.put(
      `/admin/product-tags/${id}`,
      validatedPayload,
    )
    return response.data
  },

  delete: async (id: number) => {
    const response = await apiClient.delete(`/admin/product-tags/${id}`)
    return response.data
  },
}
