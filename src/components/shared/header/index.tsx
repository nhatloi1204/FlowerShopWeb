import Topbar from './topbar'
import MainHeader from './main-header'
import Navbar from './navbar'
import MobileHeader from './mobile-header'
import Container from '@/components/container'
import { productCategoryService } from '@/services/'
import { ProductCategoryOutput } from '@/validations'

export default async function Header() {
  let globalCategories: ProductCategoryOutput[] = []
  try {
    globalCategories = await productCategoryService.getAll()
  } catch (error) {
    console.error('Failed to pre-fetch categories on Server:', error)
  }

  return (
    <header className='w-full flex flex-col sticky top-0 z-50 shadow-xs bg-white'>
      <div className='hidden md:block w-full bg-neutral-900'>
        <Container>
          <Topbar />
        </Container>
      </div>

      <div className='hidden md:block w-full bg-white border-b border-neutral-100'>
        <Container>
          <MainHeader categories={globalCategories} />
        </Container>
      </div>

      <div className='hidden md:block w-full bg-white border-b border-neutral-100'>
        <Container>
          <Navbar categories={globalCategories} />
        </Container>
      </div>

      <div className='block md:hidden w-full bg-white'>
        <MobileHeader categories={globalCategories} />
      </div>
    </header>
  )
}
