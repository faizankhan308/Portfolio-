import { NextResponse } from 'next/server'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parse = contactSchema.safeParse(body)

    if (!parse.success) {
      return NextResponse.json(
        { error: 'validation', details: parse.error.flatten() },
        { status: 400 }
      )
    }

    const { name, email, message } = parse.data
    console.log(`[Contact Form Submission] From: ${name} (${email})\nMessage: ${message}`)

    // Optional Nodemailer integration if SMTP configuration is provided in env
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const nodemailer = await import('nodemailer')
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 587),
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        })

        await transporter.sendMail({
          from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
          to: process.env.CONTACT_TO_EMAIL || 'khanfaizan68397@gmail.com',
          subject: `Portfolio Contact from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        })
      } catch (emailErr) {
        console.error('[Contact Form Email Error]:', emailErr)
      }
    }

    return NextResponse.json({ success: true, message: 'Message received successfully' })
  } catch (err) {
    console.error('[api/contact] error:', err)
    return NextResponse.json({ error: 'server', message: 'Failed to process contact message' }, { status: 500 })
  }
}
