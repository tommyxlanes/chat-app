import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWelcomeEmail = async (to, name) => {
  const from = process.env.EMAIL_FROM || "noreply@emails.teevong.com";
  const siteUrl = process.env.CLIENT_URL || "https://sevalla.com"; // fallback
  const subject = "Welcome to ChatSome";

  const html = `
  <div style="background-color:#f8fafc; padding:40px 0; font-family:Arial, sans-serif;">
    <div style="max-width:600px; margin:auto; background:white; border-radius:12px; overflow:hidden; box-shadow:0 2px 10px rgba(0,0,0,0.05);">
      <div style="background-color:#2563eb; padding:24px; text-align:center;">
        <h1 style="color:white; margin:0; font-size:24px;">Welcome to <span style="color:#bfdbfe;">Sevalla</span>!</h1>
      </div>
      <div style="padding:32px;">
        <p style="font-size:16px; color:#334155;">Hi ${name.split(" ")[0]},</p>
        <p style="font-size:16px; color:#334155; line-height:1.6;">
          We’re thrilled to have you join <strong>Sevalla</strong>! 🎉  
          You’re now part of a growing community of creators and professionals.
        </p>
        <p style="font-size:16px; color:#334155; line-height:1.6;">
          To get started, sign in to your account and explore what’s possible:
        </p>
        <div style="text-align:center; margin:30px 0;">
          <a href="${siteUrl}/login"
            style="background-color:#2563eb; color:white; padding:12px 24px; border-radius:8px; text-decoration:none; font-weight:600;">
            Get Started →
          </a>
        </div>
        <p style="font-size:14px; color:#64748b;">
          If you didn’t sign up for Sevalla, please ignore this email or contact support.
        </p>
      </div>
      <div style="background-color:#f1f5f9; padding:16px; text-align:center; font-size:12px; color:#94a3b8;">
        © ${new Date().getFullYear()} Sevalla. All rights reserved.<br/>
        Sent from <a href="${siteUrl}" style="color:#2563eb; text-decoration:none;">${siteUrl.replace(
    /^https?:\/\//,
    ""
  )}</a>
      </div>
    </div>
  </div>
  `;

  try {
    const data = await resend.emails.send({
      from,
      to,
      subject,
      html,
    });

    console.log("✅ Welcome email sent:", data);
    return data;
  } catch (error) {
    console.error("❌ Error sending welcome email:", error);
    throw new Error("Failed to send welcome email");
  }
};
