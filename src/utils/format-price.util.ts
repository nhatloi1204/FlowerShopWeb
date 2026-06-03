interface ProductPriceInput {
  price?: number | null
  priceMin?: number | null
  priceMax?: number | null
}

export const formatPrice = (
  input: ProductPriceInput | number | null | undefined,
): string => {
  if (input == null) return '--'

  if (typeof input === 'number') {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    })
      .format(input)
      .replace(/\s?₫/, ' VND')
  }

  if (input.price != null) {
    return formatPrice(input.price)
  }

  if (input.priceMin != null || input.priceMax != null) {
    const min = input.priceMin ?? 0
    const max = input.priceMax ?? 0
    return `${formatPrice(min)} - ${formatPrice(max)}`
  }

  return '--'
}
