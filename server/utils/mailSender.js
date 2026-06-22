const nodemailer = require("nodemailer")

const mailSender = async (email, title, body) => {
  try {
    // Check if email configuration exists
    if (!process.env.MAIL_HOST || !process.env.MAIL_USER || !process.env.MAIL_PASS) {
      console.log("⚠️  EMAIL CONFIGURATION MISSING - Skipping email send");
      console.log("⚠️  Please set MAIL_HOST, MAIL_USER, and MAIL_PASS in .env file");
      throw new Error("Email configuration missing");
    }

    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS.replace(/\s/g, ""),
      },
    })

    let info = await transporter.sendMail({
      from: `"StudyNotion" <${process.env.MAIL_USER}>`, // sender address
      to: `${email}`, // list of receivers
      subject: `${title}`, // Subject line
      html: `${body}`, // html body
    })
    console.log("✅ Email sent successfully:", info.response)
    return info
  } catch (error) {
    console.log("❌ Email sending failed:", error.message)
    throw error // Re-throw to be caught by OTP model
  }
}

module.exports = mailSender
