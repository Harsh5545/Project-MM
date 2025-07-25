import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req) {
  try {
    const { firstName, lastName, email } = await req.json()

    if (!firstName || !lastName || !email.match(/\S+@\S+\.\S+/)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 })
    }

    // Optional: Check if an entry for this email already exists to prevent duplicate emails
    const existingEntry = await prisma.DownloadEntry.findFirst({
      where: {
        email: email,
      },
    })

    if (existingEntry) {
      console.log(`Duplicate e-book download request for ${email}.`)
      // You might choose to return here if you strictly want to prevent re-sends
      // return NextResponse.json({ success: true, message: "E-book already sent to this email." }, { status: 200 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // 📧 User Email Template (Responsive & Improved UI for E-Book)
    const userEmailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your Free E-Book - Modern Mannerism</title>
          <style>
              body {
                  margin: 0;
                  padding: 0;
                  font-family: 'Arial', sans-serif;
                  background-color: #f4f4f4;
                  color: #333333;
              }
              table {
                  border-collapse: collapse;
                  width: 100%;
              }
              td {
                  padding: 0;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  border-radius: 8px;
                  overflow: hidden;
                  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
              }
              .header {
                  padding: 20px;
                  text-align: center;
              }
              .header img {
                  max-width: 180px;
                  height: auto;
                  display: block;
                  margin: 0 auto;
              }
              .content {
                  padding: 30px;
                  text-align: center;
              }
              .content h2 {
                  color: #333333;
                  font-size: 24px;
                  margin-bottom: 20px;
              }
              .content p {
                  color: #555555;
                  font-size: 16px;
                  line-height: 1.6;
                  margin-bottom: 15px;
              }
              .button-container {
                  text-align: center;
                  margin-top: 30px;
              }
              .button {
                  display: inline-block;
                  background-color: #eabf91;
                  color: #ffffff; /* Changed to white */
                  padding: 12px 25px;
                  border-radius: 5px;
                  text-decoration: none;
                  font-weight: bold;
              }
              .footer {
                  background-color: #f0f0f0;
                  padding: 20px;
                  text-align: center;
                  font-size: 14px;
                  color: #777777;
              }
              .footer a {
                  color: #c3965d;
                  text-decoration: none;
              }
              @media only screen and (max-width: 600px) {
                  .container {
                      width: 100% !important;
                      border-radius: 0 !important;
                  }
                  .content {
                      padding: 20px !important;
                  }
                  .content h2 {
                      font-size: 20px !important;
                  }
                  .content p {
                      font-size: 14px !important;
                  }
                  .button {
                      padding: 10px 20px !important;
                      font-size: 14px !important;
                      text-color: #ffffff; /* Ensure button text is white */
                  }
              }
          </style>
      </head>
      <body>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
              <tr>
                  <td>
                      <div class="container">
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                              <tr>
                                  <td class="header">
                                      <!-- Logo removed as requested -->
                                  </td>
                              </tr>
                              <tr>
                                  <td class="content">
                                      <p style="color: #555555; font-size: 16px; line-height: 1.6; margin-bottom: 15px; text-align: left;">
                                          Hello ${firstName}! I’m Manasi, founder of Modern Mannerism, and I’m delighted to share this resource with you!
                                      </p>
                                      <p style="color: #555555; font-size: 16px; line-height: 1.6; margin-bottom: 15px; text-align: left;">
                                          If it inspires or helps you in any way, we’d love to hear from you, whether through a quick Google review or a simple email.
                                      </p>
                                      <p style="color: #555555; font-size: 16px; line-height: 1.6; margin-bottom: 25px; text-align: left;">
                                          Feel free to reach out anytime if you have questions or would like to share your thoughts.
                                      </p>
                                      <div class="button-container">
                                          <a href="${process.env.NEXT_PUBLIC_API_URL}/api/download" class="button">Download Your Free E-Book</a>
                                      </div>
                                      <p style="color: #555555; font-size: 16px; line-height: 1.6; margin-top: 25px; text-align: left;">
                                          Best Regards,<br>
                                          <strong>Manasi K</strong><br>
                                          Founder, Modern Mannerism
                                      </p>
                                  </td>
                              </tr>
                              <tr>
                                  <td class="footer">
                                      <p>&copy; ${new Date().getFullYear()} Modern Mannerism. All rights reserved.</p>
                                      <p>Follow us on: 
                                          <a href="https://www.instagram.com/modernmannerism/">Instagram</a> | 
                                          <a href="https://www.linkedin.com/in/k-manasi/">LinkedIn</a> | 
                                          <a href="https://www.facebook.com/modernmannerism/">Facebook</a>
                                      </p>
                                  </td>
                              </tr>
                          </table>
                      </div>
                  </td>
              </tr>
          </table>
      </body>
      </html>
    `

    const mailOptionsUser = {
      from: '"Modern Mannerism" <modernmannerism@gmail.com>',
      to: email,
      subject: "Your Free E-Book from Modern Mannerism",
      html: userEmailHtml,
    }

    const mailOptionsAdmin = {
      from: '"Modern Mannerism" <modernmannerism@gmail.com>',
      to: "modernmannerism@gmail.com",
      subject: "New E-Book Download",
      html: `<p>New e-book download:</p>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>`,
    }

    const res = await transporter.sendMail(mailOptionsUser)
    if (res.accepted.length > 0) {
      const EmailUser = await prisma.DownloadEntry.create({
        data: {
          name: firstName,
          last_name: lastName,
          email: email,
          downloaded: true,
        },
      })
    }
    await transporter.sendMail(mailOptionsAdmin)

    return NextResponse.json({ success: true, message: "Emails sent successfully!" }, { status: 200 })
  } catch (error) {
    console.error("Email sending error:", error)
    return NextResponse.json({ error: "Error sending email" }, { status: 500 })
  }
}
