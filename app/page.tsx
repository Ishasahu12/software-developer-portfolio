import Hero from '@/components/hero/Hero'
import Work from '@/components/sections/Work'
import EngineeringDiscipline from '@/components/sections/EngineeringDiscipline'
import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <main className="bg-[#020204]">
      <Hero />
      <Work />
      <EngineeringDiscipline />
      <About />
      <Contact />
    </main>
  )
}
