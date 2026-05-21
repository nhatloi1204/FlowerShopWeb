import apiClient from '@/lib/api-client'
import { ProductCategoryListSchema, ProductCategoryOutput } from '@/validations'

export const productCategoryService = {
  getAll: async (): Promise<ProductCategoryOutput[]> => {
    const response = await apiClient.get('/product-categories')
    return ProductCategoryListSchema.parse(response.data)
  },
}
