import nodemailer from "nodemailer";

const ContactFormHandler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { name, email, phone, course, message } = req.body;

    if (!name || !email || !course) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Configure email transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const courseMap = {
      "personal-branding": "Personal Branding",
      "communication-skills": "Communication Skills",
      "corporate-etiquette": "Corporate Etiquette",
      "fine-dining-manners": "Fine Dining Manners",
    };

    const courseName = courseMap[course] || course;
    const firstName = name.split(" ")[0];

    // 📧 User Email Template
    const userEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; color: #333; background-color: #f9f9f9; border-radius: 10px;">
        <h2 style="color: #007BFF;">Hello ${firstName},</h2>
        <p>Thank you for reaching out to <strong>Modern Mannerism</strong>! We appreciate your interest in our <strong>${courseName}</strong> course.</p>
        <p>One of our team members will get in touch with you shortly.</p>
        <p style="margin-top: 20px;">Best Regards,</p>
        <p><strong>Modern Mannerism Team</strong></p>
      </div>
    `;

    // 📧 Admin Email Template
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; color: #333;">
        <h2 style="color: #d9534f;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Course:</strong> ${courseName}</p>
        <p><strong>Message:</strong> ${message || "No message provided"}</p>
      </div>
    `;

    // Send confirmation email to user
    const data = await transporter.sendMail({
      from: '"Modern Mannerism" <modernmannerism@gmail.com>',
      to: email,
      subject: "Thank You for Contacting Modern Mannerism",
      html: userEmailHtml,
    });
    console.log(data,'DATA')
    // Send notification email to admin
    await transporter.sendMail({
      from: '"Modern Mannerism Website" <modernmannerism@gmail.com>',
      to: "modernmannerism@gmail.com",
      subject: "New Contact Form Submission",
      html: adminEmailHtml,
    });

    return res.status(200).json({ success: true, message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return res.status(500).json({ error: "Failed to process form submission" });
  }
};

export default ContactFormHandler;
