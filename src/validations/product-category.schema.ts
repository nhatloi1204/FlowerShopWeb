import { z } from 'zod'

export const ProductCategoryOutputSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const ProductCategoryListSchema = z.array(ProductCategoryOutputSchema)

export type ProductCategoryOutput = z.infer<typeof ProductCategoryOutputSchema>
