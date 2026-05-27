import Container from '@/components/container'
import CategoryTabSection from './category-tab-section'
import { MOCK_HOMEPAGE_SECTIONS } from '@/mocks/mock-category-data'

export default function FeaturedCategorySections() {
  const sections = MOCK_HOMEPAGE_SECTIONS

  return (
    <Container className='my-16'>
      {sections.map(section => (
        <CategoryTabSection
          key={section.parentId}
          parentName={section.parentName}
          tabs={section.tabs}
        />
      ))}
    </Container>
  )
}
