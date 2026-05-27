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
    <>
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

      <div className='hidden md:block w-full bg-white border-b border-neutral-100 sticky top-0 left-0 right-0 z-50 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-shadow duration-300'>
        <Container>
          <Navbar categories={globalCategories} />
        </Container>
      </div>

      <div className='block md:hidden w-full bg-white border-b border-neutral-100 sticky top-0 left-0 right-0 z-50 shadow-xs'>
        <MobileHeader categories={globalCategories} />
      </div>
    </>
  )
}
