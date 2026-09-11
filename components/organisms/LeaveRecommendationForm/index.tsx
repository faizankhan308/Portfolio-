'use client'

import { useState } from 'react'
import Button from '@/components/atoms/Button'
import Input from '@/components/molecules/Input'
import SectionHeading from '@/components/molecules/SectionHeading'
import { submitContact } from '@/services/contact'

const cardCls = 'border border-[var(--border)] bg-[var(--surface)] rounded-[14px] p-6'

const LeaveRecommendationForm = () => {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const form = e.currentTarget
    const name = (form.elements.namedItem('name') as HTMLInputElement).value
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const comment = (form.elements.namedItem('comment') as HTMLTextAreaElement).value
    const profileUrl = (form.elements.namedItem('profileUrl') as HTMLInputElement | null)?.value

    try {
      await submitContact({
        name: `Recommendation: ${name}`,
        email,
        message: `Recommendation Comment:\n${comment}\n\nProfile/Role: ${profileUrl || 'Not provided'}`,
      })
      setSent(true)
    } catch {
      setError('Something went wrong — please try again or email directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative py-20 border-t border-[var(--border)]" id="leave-recommendation">
      <SectionHeading
        num="02"
        label="LEAVE A RECOMMENDATION"
        title="Vouch for me."
        aside={
          <>
            ~/recommendations/new
            <br />
            <span className="text-[var(--accent)]">● reviewed before publishing</span>
          </>
        }
      />

      <div className="grid grid-cols-[1fr_1.1fr] gap-8 max-[940px]:grid-cols-1">
        <div className="flex flex-col gap-5">
          <p className="font-[family-name:var(--font-sans)] text-[15px] text-[var(--text)] leading-[1.65] max-w-[40ch]">
            Worked with me? I&apos;d love a reference. Share your recommendation and profile link below.
          </p>
          <div className="flex flex-col gap-2">
            {[
              'Reviewed before publishing',
              'Profile link & role featured on site',
              'Direct submission to Faizan',
            ].map((item) => (
              <div
                key={item}
                className="font-[family-name:var(--font-mono)] text-[12px] text-[var(--text-dim)] flex items-center gap-2"
              >
                <span className="text-[var(--accent)]">→</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div>
          {sent ? (
            <div className={`${cardCls} flex flex-col gap-4`}>
              <p className="font-[family-name:var(--font-mono)] text-[13px] text-[var(--accent)] flex items-center gap-1.5">
                ● recommendation received — thank you! It will appear once reviewed.
              </p>
            </div>
          ) : (
            <form className={cardCls} onSubmit={handleSubmit}>
              <Input.Field>
                <Input.Label htmlFor="name" required>
                  YOUR NAME
                </Input.Label>
                <Input.Text id="name" name="name" required placeholder="John Doe" disabled={loading} />
              </Input.Field>

              <Input.Field>
                <Input.Label htmlFor="email" required>
                  YOUR EMAIL
                </Input.Label>
                <Input.Text id="email" name="email" type="email" required placeholder="john@example.com" disabled={loading} />
              </Input.Field>

              <Input.Field>
                <Input.Label htmlFor="profileUrl">
                  PROFILE URL / COMPANY / ROLE
                </Input.Label>
                <Input.Text id="profileUrl" name="profileUrl" placeholder="github.com/username or Senior Lead at Company" disabled={loading} />
              </Input.Field>

              <Input.Field>
                <Input.Label htmlFor="comment" required>
                  RECOMMENDATION
                </Input.Label>
                <Input.Textarea
                  id="comment"
                  name="comment"
                  required
                  minLength={10}
                  maxLength={1000}
                  placeholder="Faizan is a thoughtful engineer who…"
                  disabled={loading}
                />
              </Input.Field>

              <div className="flex items-center justify-between pt-1.5">
                <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-faint)]">
                  10–1000 chars · reviewed before publishing
                </span>
                <Button as="button" type="submit" variant="primary" disabled={loading}>
                  {loading ? 'submitting…' : 'submit recommendation'}
                </Button>
              </div>

              {error && (
                <p className="font-[family-name:var(--font-mono)] text-[12px] text-red-400 mt-3 flex items-center gap-1.5">
                  ✕ {error}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default LeaveRecommendationForm
