import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const createTransporter = () => {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  console.log("======================================");
  console.log("SMTP TRANSPORT CONFIG");
  console.log("SMTP USER:", user);
  console.log("SMTP PASS LENGTH:", pass ? pass.length : 0);
  console.log("SMTP HOST:", process.env.SMTP_HOST);
  console.log("SMTP PORT:", process.env.SMTP_PORT);
  console.log("======================================");

  if (!user) {
    throw new Error("SMTP_USER در فایل .env تنظیم نشده است.");
  }

  if (!pass) {
    throw new Error("SMTP_PASS در فایل .env تنظیم نشده است.");
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 465),
    secure: Number(process.env.SMTP_PORT || 465) === 465,

    auth: {
      user,
      pass,
    },
  });
};

export const verifyEmailConnection = async () => {
  try {
    const transporter = createTransporter();

    await transporter.verify();

    console.log("======================================");
    console.log("SMTP CONNECTION: OK");
    console.log("SMTP USER:", process.env.SMTP_USER);
    console.log("======================================");
  } catch (error) {
    console.error("======================================");
    console.error("SMTP CONNECTION ERROR");
    console.error("CODE:", error.code);
    console.error("MESSAGE:", error.message);
    console.error("======================================");
  }
};

export const sendPasswordResetEmail = async ({
  to,
  firstName,
  resetUrl,
}) => {
  try {
    const transporter = createTransporter();

    const info = await transporter.sendMail({
      from: `"RiceShop" <${process.env.SMTP_USER}>`,
      to,

      subject: "بازیابی رمز عبور RiceShop",

      text: `
سلام ${firstName || ""}

برای تغییر رمز عبور حساب RiceShop خود روی لینک زیر کلیک کنید:

${resetUrl}

این لینک فقط ۱۵ دقیقه اعتبار دارد.

اگر شما این درخواست را ارسال نکرده‌اید، این ایمیل را نادیده بگیرید.

RiceShop
`,

      html: `
        <div
          dir="rtl"
          style="
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 0 auto;
            padding: 30px;
            line-height: 2;
            color: #222;
          "
        >
          <h2>بازیابی رمز عبور RiceShop</h2>

          <p>
            سلام ${firstName || ""}
          </p>

          <p>
            برای تغییر رمز عبور حساب کاربری خود
            روی دکمه زیر کلیک کنید:
          </p>

          <div style="margin: 30px 0;">
            <a
              href="${resetUrl}"
              style="
                display: inline-block;
                background: #15803d;
                color: #ffffff;
                padding: 14px 25px;
                border-radius: 10px;
                text-decoration: none;
                font-weight: bold;
              "
            >
              تغییر رمز عبور
            </a>
          </div>

          <p>
            این لینک فقط ۱۵ دقیقه اعتبار دارد.
          </p>

          <p>
            اگر شما این درخواست را ارسال نکرده‌اید،
            این ایمیل را نادیده بگیرید.
          </p>

          <hr />

          <p>RiceShop</p>
        </div>
      `,
    });

    console.log("======================================");
    console.log("PASSWORD RESET EMAIL SENT");
    console.log("TO:", to);
    console.log("MESSAGE ID:", info.messageId);
    console.log("======================================");

    return info;
  } catch (error) {
    console.error("======================================");
    console.error("EMAIL SEND ERROR");
    console.error("CODE:", error.code);
    console.error("COMMAND:", error.command);
    console.error("MESSAGE:", error.message);
    console.error("======================================");

    throw error;
  }
};