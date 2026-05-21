// src/services/product.service.ts
import apiClient from '@/lib/api-client'
import {
  ProductPagedList,
  ProductListResponseSchema,
  ProductQuery,
  ProductOutputSchema,
  ProductOutput,
  ProductFormData,
} from '@/validations'

type ProductInputPayload = ProductFormData & { imageUrls: string[] }

type GetProductsOptions = {
  query?: ProductQuery
}

export const productService = {
  getProducts: async ({
    query,
  }: GetProductsOptions = {}): Promise<ProductPagedList> => {
    const response = await apiClient.get('/products', { params: query })
    const parsed = ProductListResponseSchema.parse(response)
    return parsed.data
  },

  createProduct: async (payload: ProductInputPayload): Promise<unknown> => {
    const response = await apiClient.post('/admin/products', payload)
    return response.data
  },

  updateProduct: async (
    id: number,
    payload: ProductInputPayload,
  ): Promise<unknown> => {
    const response = await apiClient.put(`/admin/products/${id}`, payload)
    return response.data
  },

  getProductById: async (id: number): Promise<ProductOutput> => {
    const response = await apiClient.get(`/products/${id}`)
    return ProductOutputSchema.parse(response.data)
  },

  deleteProduct: async (id: number): Promise<void> => {
    await apiClient.delete(`/admin/products/${id}`)
  },
}
