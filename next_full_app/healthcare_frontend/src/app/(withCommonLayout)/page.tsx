import HeroSection from '@/components/ui/HomePage/HeroSection/HeroSection'
import TopRatedDoctors from '@/components/ui/HomePage/TopRatedDoctors/TopRatedDoctors'
import Specialist from '@/components/ui/HomePage/specialist/Specialist'
import WhyUs from '@/components/ui/HomePage/whyUs/WhyUs'


export default function Home() {
  return (
    <main>
      <HeroSection />
      <Specialist />
      <TopRatedDoctors />
      <WhyUs />
    </main>
  )
}
