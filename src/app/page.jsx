import HeroSection from '@/components/home/hero-section'
import PillarsSection from '@/components/home/pillars-section'
import IssueGrid from '@/components/home/issue-grid'
import StatsSection from '@/components/home/stats-section'
import FaqSection from '@/components/home/faq-section'
import EngagementSection from '@/components/home/engagement-section'

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <PillarsSection />
      <IssueGrid />
      <StatsSection />
      <FaqSection />
      <EngagementSection />
    </>
  )
}

export default HomePage
