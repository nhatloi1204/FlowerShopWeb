import { ProductsTableClient } from './_components/products-table-client'
import { ADMIN_TITLES, ROUTES } from '@/constants/routes.constant'

export default function ProductsPage() {
  return (
    <div className='flex flex-1 flex-col gap-4'>
      <div>
        <h1 className='text-lg font-semibold uppercase'>
          {ADMIN_TITLES[ROUTES.ADMIN.PRODUCTS.INDEX]}
        </h1>
        <p className='text-sm text-muted-foreground'>
          Manage catalog items and pricing.
        </p>
      </div>

      <ProductsTableClient />
    </div>
  )
}
