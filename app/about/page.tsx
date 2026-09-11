import { pageMeta } from '@/lib/site'
import AboutHero from '@/components/organisms/AboutHero'
import AboutBio from '@/components/organisms/AboutBio'
import AboutGallery from '@/components/organisms/AboutGallery'
import AboutTimeline from '@/components/organisms/AboutTimeline'
import AboutSkills from '@/components/organisms/AboutSkills'
import AboutCurrently from '@/components/organisms/AboutCurrently'
import AboutSocials from '@/components/organisms/AboutSocials'

export const revalidate = 86400

export const metadata = pageMeta(
  'about — fk.dev',
  'Full-Stack Developer, AI Training Expert, and CS Student. A bit about who I am, how I got here, and what I build.',
)

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutBio />
      <AboutGallery />
      <AboutTimeline />
      <AboutSkills />
      <AboutCurrently />
      <AboutSocials />
    </>
  )
}
