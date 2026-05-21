import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import type { Control } from 'react-hook-form'
import type {
  ProductCategoryOutput,
  ProductFormData,
  ProductStatus,
} from '@/validations'

import {
  Combobox,
  ComboboxChips,
  ComboboxValue,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxList,
  ComboboxItem,
  ComboboxChip,
  useComboboxAnchor,
} from '@/components/ui/combobox'

interface StatusOption {
  value: ProductStatus
  label: string
}

interface FormSidebarProps {
  control: Control<ProductFormData>
  categories: ProductCategoryOutput[]
  statusOptions: StatusOption[]
}

export function FormSidebar({
  control,
  categories,
  statusOptions,
}: FormSidebarProps) {
  const anchor = useComboboxAnchor()

  return (
    <div className='space-y-5 rounded-xl border bg-card p-5 shadow-sm'>
      {/* PRICE BLOCK */}
      <FormField
        control={control}
        name='price'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='font-semibold text-muted-foreground'>
              Price (VND)
            </FormLabel>
            <FormControl>
              <Input
                type='number'
                placeholder='0'
                value={field.value === 0 ? '' : (field.value ?? '')}
                onChange={event => {
                  field.onChange(
                    event.target.value === ''
                      ? 0
                      : parseInt(event.target.value, 10),
                  )
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* STATUS BLOCK */}
      <div className='border-t border-dashed pt-4'>
        <FormField
          control={control}
          name='status'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-semibold text-muted-foreground'>
                Status
              </FormLabel>
              <FormControl>
                <select
                  value={field.value}
                  onChange={field.onChange}
                  className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer'
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* CATEGORIES BLOCK */}
      <div className='border-t border-dashed pt-4'>
        <FormField
          control={control}
          name='categoryIds'
          render={({ field }) => {
            const currentSelectedValues = Array.isArray(field.value)
              ? field.value.map(String)
              : []
            return (
              <FormItem className='flex flex-col'>
                <FormLabel className='font-semibold text-muted-foreground mb-1'>
                  Categories
                </FormLabel>
                <FormControl>
                  <Combobox
                    multiple
                    autoHighlight
                    items={categories}
                    value={currentSelectedValues}
                    onValueChange={(nextValue: string[]) => {
                      const numberIds = nextValue
                        .map(val => parseInt(val, 10))
                        .filter(Boolean)
                      field.onChange(numberIds)
                    }}
                    filter={(value, search) => {
                      const category = categories.find(
                        c => String(c.id) === value,
                      )
                      if (!category) return false
                      return category.name
                        .toLowerCase()
                        .includes(search.toLowerCase())
                    }}
                  >
                    <ComboboxChips
                      ref={anchor}
                      className='w-full min-h-9 border border-input rounded-md bg-transparent p-1 gap-1 flex flex-wrap shadow-sm focus-within:ring-1 focus-within:ring-ring'
                    >
                      <ComboboxValue>
                        {(values: string[]) => (
                          <>
                            {values.map((id: string) => {
                              const category = categories.find(
                                c => String(c.id) === id,
                              )
                              if (!category) return null
                              return (
                                <ComboboxChip key={id}>
                                  {category.name}
                                </ComboboxChip>
                              )
                            })}
                            <ComboboxChipsInput
                              placeholder={
                                currentSelectedValues.length === 0
                                  ? 'Select categories...'
                                  : ''
                              }
                              className='flex-1 min-w-15 bg-transparent text-sm outline-none placeholder:text-muted-foreground'
                            />
                          </>
                        )}
                      </ComboboxValue>
                    </ComboboxChips>

                    <ComboboxContent
                      anchor={anchor}
                      className='w-(--radix-popover-trigger-width)'
                    >
                      <ComboboxEmpty>No categories found.</ComboboxEmpty>
                      <ComboboxList>
                        {(category: ProductCategoryOutput) => (
                          <ComboboxItem
                            key={category.id}
                            value={String(category.id)}
                          >
                            {category.name}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
      </div>
    </div>
  )
}
