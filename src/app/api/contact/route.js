import nodemailer from "nodemailer"
import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const { name, email, phone, course, message, agree } = await request.json()

    if (!name || !email || !course || !agree) {
      return NextResponse.json({ error: "Missing required fields or agreement not checked" }, { status: 400 })
    }

    // Configure email transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    const courseMap = {
      "personal-branding": "Personal Branding",
      "communication-skills": "Communication Skills",
      "corporate-etiquette": "Corporate Etiquette",
      "fine-dining-manners": "Fine Dining Manners",
    }

    const courseName = courseMap[course] || course
    const firstName = name.split(" ")[0]

    // 📧 User Email Template (Responsive & Improved UI)
    const userEmailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You for Contacting Modern Mannerism</title>
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
                                </td>
                              </tr>
                              <tr>
                                  <td class="content">
                                      <h2>Hello ${firstName},</h2>
                                      <p>
                                          Thank you for reaching out to <strong>Modern Mannerism</strong>! We've received your <span style="font-weight: bold;">enquiry</span> regarding the <strong>${courseName}</strong> course.
                                      </p>
                                      <p>
                                          Our team is excited to connect with you and will get in touch shortly to discuss your needs and how we can help you enhance your personal and professional presence.
                                      </p>
                                      <p>
                                          In the meantime, feel free to explore more about our offerings on our website.
                                      </p>
                                      <div class="button-container">
                                          <a href="https://www.modernmannerism.com/" class="button">Visit Our Website</a>
                                      </div>
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

    // 📧 Admin Email Template (Responsive & Improved UI)
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
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
                  background-color: #c3965d; /* Golden color for admin notification */
                  padding: 20px;
                  text-align: center;
              }
              .header h2 {
                  color: #ffffff;
                  font-size: 24px;
                  margin: 0;
              }
              .content {
                  padding: 30px;
              }
              .content p {
                  color: #333333;
                  font-size: 16px;
                  line-height: 1.6;
                  margin-bottom: 10px;
              }
              .content ul {
                  list-style: none;
                  padding: 0;
                  margin: 0;
              }
              .content li {
                  margin-bottom: 8px;
              }
              .content strong {
                  color: #555555;
              }
              .content a {
                  color: #007BFF;
                  text-decoration: none;
              }
              .footer {
                  background-color: #f0f0f0;
                  padding: 20px;
                  text-align: center;
                  font-size: 14px;
                  color: #777777;
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
                  .content p, .content li {
                      font-size: 14px !important;
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
                                      <h2>New Contact Form Submission</h2>
                                  </td>
                              </tr>
                              <tr>
                                  <td class="content">
                                      <p>A new message has been submitted through the contact form:</p>
                                      <ul>
                                          <li><strong>Name:</strong> ${name}</li>
                                          <li><strong>Email:</strong> <a href="mailto:${email}">${email}</a></li>
                                          <li><strong>Phone:</strong> ${phone || "Not provided"}</li>
                                          <li><strong>Course of Interest:</strong> ${courseName}</li>
                                          <li><strong>Message:</strong> ${message || "No message provided"}</li>
                                          <li><strong>Agreed to Marketing:</strong> ${agree ? "Yes" : "No"}</li>
                                      </ul>
                                  </td>
                              </tr>
                              <tr>
                                  <td class="footer">
                                      <p>This is an automated notification from your website.</p>
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

    // Send confirmation email to user
    await transporter.sendMail({
      from: '"Modern Mannerism" <modernmannerism@gmail.com>',
      to: email,
      subject: "Thank You for Contacting Modern Mannerism",
      html: userEmailHtml,
    })

    // Send notification email to admin
    await transporter.sendMail({
      from: '"Modern Mannerism Website" <modernmannerism@gmail.com>',
      to: "modernmannerism@gmail.com", // Ensure this is your actual admin email
      subject: "New Contact Form Submission",
      html: adminEmailHtml,
    })

    return NextResponse.json({ success: true, message: "Form submitted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json({ error: "Failed to process form submission" }, { status: 500 })
  }
}
