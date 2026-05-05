import HeroSection from '@/components/home/hero-section'
import IssueGrid from '@/components/home/issue-grid'
import WhyRunning from '@/components/home/why-running'
import BioByNumbers from '@/components/home/bio-by-numbers'
import PrinciplesBanner from '@/components/home/principles-banner'
import VoterFeel from '@/components/home/voter-feel'
import SignUpForm from '@/components/home/sign-up-form'

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <IssueGrid />
      <WhyRunning />
      <BioByNumbers />
      <PrinciplesBanner />
      <VoterFeel />
      <SignUpForm />
    </>
  )
}

export default HomePage
