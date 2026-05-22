import apiClient from '@/lib/api-client'
import {
  ProductCategoryListSchema,
  ProductCategoryOutput,
  CategoryFormData,
  categoryFormSchema,
} from '@/validations'

export const productCategoryService = {
  getAll: async (): Promise<ProductCategoryOutput[]> => {
    const response = await apiClient.get('/product-categories')
    return ProductCategoryListSchema.parse(response.data)
  },

  create: async (payload: CategoryFormData) => {
    const validatedPayload = categoryFormSchema.parse(payload)
    const response = await apiClient.post(
      '/admin/product-categories',
      validatedPayload,
    )
    return response.data
  },

  update: async (id: number, payload: CategoryFormData) => {
    const validatedPayload = categoryFormSchema.parse(payload)
    const response = await apiClient.put(
      `/admin/product-categories/${id}`,
      validatedPayload,
    )
    return response.data
  },

  delete: async (id: number) => {
    const response = await apiClient.delete(`/admin/product-categories/${id}`)
    return response.data
  },
}
