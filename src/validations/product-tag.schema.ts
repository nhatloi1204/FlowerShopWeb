import { z } from 'zod'

export const ProductTagOutputSchema = z.object({
  id: z.number(),
  name: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const ProductTagListSchema = z.array(ProductTagOutputSchema)
export type ProductTagOutput = z.infer<typeof ProductTagOutputSchema>

export const tagFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Tag name must be at least 2 characters')
    .max(50, 'Tag name must not exceed 50 characters'),
})

export type TagFormData = z.infer<typeof tagFormSchema>
