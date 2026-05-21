import { z } from 'zod'

export const UploadMediaResponseSchema = z.object({
  url: z.string().url(),
  publicId: z.string().min(1),
})

export const DeleteMultiPayloadSchema = z.object({
  publicIds: z.array(z.string()),
})

export type UploadMediaResponse = z.infer<typeof UploadMediaResponseSchema>
export type DeleteMultiPayload = z.infer<typeof DeleteMultiPayloadSchema>
