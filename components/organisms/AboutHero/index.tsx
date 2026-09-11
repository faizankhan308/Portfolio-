import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Blip from '@/components/atoms/Blip'
import CornerDecorations from '@/components/atoms/CornerDecorations'

const FACTS: { k: string; v: ReactNode }[] = [
  { k: 'name', v: 'Faizan Khan' },
  {
    k: 'role',
    v: (
      <>
        Full-Stack Developer <span className="text-[var(--accent)]">// Software Engineer</span>
      </>
    ),
  },
  {
    k: 'phone',
    v: (
      <a href="tel:+918874917623" className="hover:text-[var(--accent)] transition-colors">
        +91 8874917623
      </a>
    ),
  },
  {
    k: 'based in',
    v: (
      <>
        Delhi, India <span className="text-[var(--accent)]">// GMT+5:30</span>
      </>
    ),
  },
  { k: 'speaks', v: 'Hindi (native), English (conversational)' },
  {
    k: 'status',
    v: (
      <span className="inline-flex items-center gap-1.5">
        <Blip size={7} />
        seeking opportunities
      </span>
    ),
  },
]

const AboutHero = () => (
  <section className="pt-[88px] pb-18 grid grid-cols-[1.1fr_0.9fr] gap-14 items-center max-[940px]:grid-cols-1 max-[940px]:gap-9 max-[940px]:pt-14 max-[940px]:pb-12">
    <div>
      <div className="font-[family-name:var(--font-mono)] text-[12px] text-[var(--text-dim)] mb-[22px] flex items-center gap-2">
        <Link href="/" className="transition-colors duration-150 hover:text-[var(--accent)]">
          ~
        </Link>
        <span className="text-[var(--text-faint)]">/</span>
        <span className="text-[var(--text-bright)]">about</span>
      </div>

      <h1 className="font-[family-name:var(--font-mono)] font-medium text-[clamp(38px,5.2vw,62px)] leading-[1.02] tracking-[-0.04em] mb-2.5 mt-0 text-[var(--text-bright)]">
        <span className="text-[var(--text-faint)] font-light">$ </span>whoami
      </h1>

      <p className="font-[family-name:var(--font-mono)] text-[14px] text-[var(--text-dim)] mb-6 mt-0">
        Faizan Khan <span className="text-[var(--accent)]">· @faizankhan308</span>
      </p>

      <p className="text-[19px] leading-[1.55] text-[var(--text)] max-w-[46ch] mb-[30px] mt-0 text-pretty">
        <em className="text-[var(--accent)] not-italic">Computer Science undergraduate</em>, AI Training Expert, and Full-Stack Developer who builds software solutions that make digital products faster, smarter, and easier to use.
      </p>

      <div className="border-t border-[var(--border)]">
        {FACTS.map(({ k, v }) => (
          <div
            key={k}
            className="grid grid-cols-[120px_1fr] gap-4 py-[11px] border-b border-[var(--border)] items-baseline"
          >
            <span className="font-[family-name:var(--font-mono)] text-[12px] text-[var(--text-dim)] tracking-[0.02em] before:content-['→_'] before:text-[var(--text-faint)]">
              {k}
            </span>
            <span className="font-[family-name:var(--font-mono)] text-[13.5px] text-[var(--text-bright)]">
              {v}
            </span>
          </div>
        ))}
      </div>
    </div>

    <div className="relative justify-self-center w-full max-w-[380px]">
      <span className="absolute -top-3.5 -right-3.5 font-[family-name:var(--font-mono)] text-[11px] text-[#001a0e] bg-[var(--accent)] px-3 py-1.5 rounded-full font-semibold shadow-[0_0_24px_-4px_var(--accent-glow)] z-[2]">
        ★ irl
      </span>
      <div className="relative border border-[var(--border)] rounded-2xl p-2.5 bg-[var(--surface)] shadow-[0_0_60px_-20px_var(--accent-glow)]">
        <CornerDecorations />
        <Image
          src="/profile.png"
          alt="Faizan Khan"
          width={360}
          height={450}
          className="w-full rounded-xl object-cover aspect-[4/5]"
          priority
        />
      </div>
    </div>
  </section>
)

export default AboutHero
