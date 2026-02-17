import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
    try {
        const { name, email, message } = await request.json()

        // Validate input
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            )
        }

        // Create transporter
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT || '587'),
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_FROM,
                pass: process.env.EMAIL_PASSWORD,
            },
        })

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_TO,
            subject: `Portfolio Contact Form: Message from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
                    <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                        <h2 style="color: #333; margin-bottom: 20px; border-bottom: 3px solid #4F46E5; padding-bottom: 10px;">
                            New Contact Form Submission
                        </h2>
                        
                        <div style="margin-bottom: 20px;">
                            <h3 style="color: #4F46E5; margin-bottom: 5px;">Name:</h3>
                            <p style="color: #555; font-size: 16px; margin: 0;">${name}</p>
                        </div>
                        
                        <div style="margin-bottom: 20px;">
                            <h3 style="color: #4F46E5; margin-bottom: 5px;">Email:</h3>
                            <p style="color: #555; font-size: 16px; margin: 0;">
                                <a href="mailto:${email}" style="color: #4F46E5; text-decoration: none;">${email}</a>
                            </p>
                        </div>
                        
                        <div style="margin-bottom: 20px;">
                            <h3 style="color: #4F46E5; margin-bottom: 5px;">Message:</h3>
                            <div style="background-color: #f8f8f8; padding: 15px; border-radius: 5px; border-left: 4px solid #4F46E5;">
                                <p style="color: #555; font-size: 16px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
                            </div>
                        </div>
                        
                        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                            <p style="color: #888; font-size: 12px; margin: 0;">
                                Sent from your portfolio contact form on ${new Date().toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>
            `,
            text: `
New Contact Form Submission

Name: ${name}
Email: ${email}

Message:
${message}

---
Sent from your portfolio contact form on ${new Date().toLocaleString()}
            `,
        }

        // Send email
        await transporter.sendMail(mailOptions)

        return NextResponse.json(
            { message: 'Email sent successfully' },
            { status: 200 }
        )
    } catch (error) {
        console.error('Error sending email:', error)
        return NextResponse.json(
            { error: 'Failed to send email' },
            { status: 500 }
        )
    }
}
