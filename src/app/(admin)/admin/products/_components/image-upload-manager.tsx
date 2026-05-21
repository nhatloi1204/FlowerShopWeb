import * as React from 'react'
import { Trash2, Plus } from 'lucide-react'
import Image from 'next/image'
import { mediaService } from '@/services'
import { toast } from 'sonner'
import { Spinner } from '@/components/ui/spinner'
import { Button } from '@/components/ui/button'

export interface ManagedImage {
  id: string
  url: string
  isExisting: boolean
  publicId?: string
  isUploading?: boolean
}

interface ImageUploadManagerProps {
  value: ManagedImage[]
  onChange: (images: ManagedImage[]) => void
  onChangeAction: (
    tempId: string,
    updatedData: Partial<ManagedImage> | null,
  ) => void
  onTrackUploadedSession: (publicId: string, action: 'add' | 'remove') => void
}

export function ImageUploadManager({
  value,
  onChange,
  onChangeAction,
  onTrackUploadedSession,
}: ImageUploadManagerProps) {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const fileList = Array.from(files)
    const tempImages: ManagedImage[] = fileList.map((file, idx) => ({
      id: `temp-${Date.now()}-${idx}`,
      url: URL.createObjectURL(file),
      isExisting: false,
      isUploading: true,
    }))

    onChange([...value, ...tempImages])

    fileList.forEach(async (file, idx) => {
      const targetTempId = tempImages[idx].id
      try {
        const res = await mediaService.uploadRaw(file)
        onTrackUploadedSession(res.publicId, 'add')
        onChangeAction(targetTempId, {
          url: res.url,
          publicId: res.publicId,
          isUploading: false,
        })
      } catch {
        toast.error(`Failed to upload image: ${file.name}`)
        onChangeAction(targetTempId, null)
      }
    })
  }

  const handleRemove = async (targetItem: ManagedImage) => {
    if (targetItem.isExisting) {
      onChange(value.filter(img => img.id !== targetItem.id))
      return
    }
    if (targetItem.isUploading) return

    if (targetItem.publicId) {
      onChange(value.filter(img => img.id !== targetItem.id))
      onTrackUploadedSession(targetItem.publicId, 'remove')
      try {
        await mediaService.deleteRaw(targetItem.publicId)
      } catch {
        console.error('Failed to clear raw image in background.')
      }
    }
  }

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <p className='text-xs text-muted-foreground'>
          Upload up to 6 images for the product gallery view.
        </p>
      </div>

      {/* Thay đổi từ grid-cols-2 lên hệ linh hoạt md:grid-cols-4 để layout trải rộng đều */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
        {value.map(img => (
          <div
            key={img.id}
            className='relative group aspect-square overflow-hidden rounded-lg border bg-muted/20'
          >
            <Image
              src={img.url}
              alt='product'
              width={200}
              height={200}
              className='h-full w-full object-cover transition-transform duration-200 group-hover:scale-105'
            />

            {img.isUploading && (
              <div className='absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm'>
                <Spinner />
              </div>
            )}

            <span
              className={`absolute bottom-2 left-2 rounded px-1.5 py-0.5 text-[9px] font-semibold tracking-wide uppercase text-white shadow-sm ${
                img.isExisting ? 'bg-blue-600' : 'bg-emerald-600'
              }`}
            >
              {img.isExisting ? 'Saved' : 'Pending'}
            </span>

            {!img.isUploading && (
              <Button
                type='button'
                variant='destructive'
                size='icon'
                className='absolute right-2 top-2 h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100 shadow-md'
                onClick={() => handleRemove(img)}
              >
                <Trash2 className='h-3.5 w-3.5' />
              </Button>
            )}
          </div>
        ))}

        {/* Nút add ảnh được bo góc mượt mà đồng bộ */}
        <label className='flex flex-col items-center justify-center gap-2 aspect-square rounded-lg border-2 border-dashed border-muted-foreground/30 px-2 text-center text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:border-muted-foreground/50 cursor-pointer'>
          <Plus className='h-5 w-5 text-muted-foreground/70' />
          <span>Add Image</span>
          <input
            type='file'
            className='hidden'
            accept='image/*'
            multiple
            onChange={handleFileChange}
          />
        </label>
      </div>
    </div>
  )
}
