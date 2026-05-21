import { z } from 'zod'

export const ProductStatusSchema = z.enum([
  'Available',
  'OutOfStock',
  'Discontinued',
])

export const ProductCategoryPivotSchema = z.object({
  productId: z.number(),
  categoryId: z.number(),
})

export const ProductOutputSchema = z.object({
  id: z.number(),
  name: z.string().nullable().optional(),
  slug: z.string().nullable().optional(),
  priceMin: z.number().nullable().optional(),
  priceMax: z.number().nullable().optional(),
  price: z.number().nullable().optional(),
  stockQuantity: z.number().nullable().optional(),
  description: z.string().nullable().optional(),
  status: ProductStatusSchema.optional(),
  companyId: z.number().nullable().optional(),
  imageUrls: z.array(z.string()).default([]),
  categoryIds: z.array(z.number()).default([]),
  createdAt: z.string().nullable().optional(),
  updatedAt: z.string().nullable().optional(),
})

export const ProductQuerySchema = z.object({
  search: z.string().optional(),
  categoryId: z.number().optional(),
  tagId: z.number().optional(),
  status: ProductStatusSchema.optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  page: z.number().optional(),
  pageSize: z.number().optional(),
})

export const ProductPagedListSchema = z.object({
  items: z.array(ProductOutputSchema),
  totalItems: z.number(),
  currentPage: z.number(),
  totalPages: z.number(),
})

export const ProductListResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().nullable().optional(),
  data: ProductPagedListSchema,
})

export const productFormSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  price: z.coerce
    .number()
    .min(0, 'Price must be greater than or equal to 0')
    .catch(0),
  stockQuantity: z.coerce
    .number()
    .min(0, 'Stock quantity must be greater than or equal to 0')
    .catch(0),
  status: z.enum(['Available', 'OutOfStock', 'Discontinued'] as const),
  description: z.string().optional().default(''),
  categoryIds: z.array(z.number()).default([]),
})

export type ProductOutput = z.infer<typeof ProductOutputSchema>
export type ProductQuery = z.infer<typeof ProductQuerySchema>
export type ProductListResponse = z.infer<typeof ProductListResponseSchema>
export type ProductPagedList = z.infer<typeof ProductPagedListSchema>
export type ProductList = ProductPagedList['items']
export type ProductStatus = z.infer<typeof ProductStatusSchema>
export type ProductCategoryPivot = z.infer<typeof ProductCategoryPivotSchema>
export type ProductFormData = z.infer<typeof productFormSchema>
