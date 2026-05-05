import HeroSection from '@/components/home/hero-section'
import PillarsSection from '@/components/home/pillars-section'
import IssueGrid from '@/components/home/issue-grid'
import AboutSection from '@/components/home/about-section'
import FaqSection from '@/components/home/faq-section'
import EngagementSection from '@/components/home/engagement-section'

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <PillarsSection />
      <IssueGrid />
      <AboutSection />
      <FaqSection />
      <EngagementSection />
    </>
  )
}

export default HomePage
