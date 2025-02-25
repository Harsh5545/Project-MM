import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { firstName, lastName, email } = await req.json();

    if (!firstName || !lastName || !email.match(/\S+@\S+\.\S+/)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "modernmannerism@gmail.com",
        pass: "oghdkhghdfwoioix",
      },
    });

    const mailOptionsUser = {
      from: '"Modern Mannerism" <modernmannerism@gmail.com>',
      to: email,
      subject: "Your Free E-Book - Modern Mannerism",
      html: `<p>Dear ${firstName},</p>
      <p>Here’s your free e-book:</p>
      <a href="https://yourwebsite.com/free-tips.pdf" download>Download E-Book</a>
      <p>Best Regards,<br>Modern Mannerism Team</p>`,
    };

    const mailOptionsAdmin = {
      from: '"Modern Mannerism" <modernmannerism@gmail.com>',
      to: "modernmannerism@gmail.com",
      subject: "New E-Book Download",
      html: `<p>New e-book download:</p>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>`,
    };

    await transporter.sendMail(mailOptionsUser);
    await transporter.sendMail(mailOptionsAdmin);

    return NextResponse.json({ success: true, message: "Emails sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json({ error: "Error sending email" }, { status: 500 });
  }
}
