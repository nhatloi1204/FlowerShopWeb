import FeatureSection from './_components/feature-section'
import FeaturedCategorySections from './_components/featured-category-sections'
import HeroSlider from './_components/hero-slider'
import PolicySection from './_components/policy-section'

export default function Home() {
  return (
    <>
      <HeroSlider />
      <PolicySection />
      <FeatureSection />
      <FeaturedCategorySections />
    </>
  )
}
