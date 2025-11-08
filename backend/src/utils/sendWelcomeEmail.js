import { ENV } from "../lib/env.js";
import { resend } from "./resendClient.js";

export const sendWelcomeEmail = async (to, name) => {
  const from = ENV.EMAIL_FROM || "noreply@emails.teevong.com";
  const siteUrl = ENV.CLIENT_URL || "https://sevalla.com";
  const appName = ENV.APP_NAME || "Sevalla";

  const html = `
    <div style="font-family:Arial,sans-serif;background:#f8fafc;padding:40px 0;">
      <div style="max-width:600px;margin:auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.05);">
        <div style="background-color:#2563eb;padding:20px;text-align:center;">
          <h1 style="color:white;margin:0;font-size:24px;">Welcome to ${appName} 🎉</h1>
        </div>
        <div style="padding:30px;">
          <p style="font-size:16px;color:#334155;">Hey ${
            name.split(" ")[0]
          },</p>
          <p style="font-size:16px;color:#334155;line-height:1.6;">
            We’re so excited to have you onboard at <strong>${appName}</strong>!  
            Get started by exploring your dashboard and connecting with your team.
          </p>
          <div style="text-align:center;margin:25px 0;">
            <a href="${siteUrl}/login"
               style="background-color:#2563eb;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600;">
              Get Started →
            </a>
          </div>
          <p style="font-size:14px;color:#64748b;">
            If you didn’t create this account, you can safely ignore this message.
          </p>
        </div>
        <div style="background:#f1f5f9;text-align:center;padding:12px;font-size:12px;color:#94a3b8;">
          © ${new Date().getFullYear()} ${appName}. All rights reserved.
        </div>
      </div>
    </div>
  `;

  try {
    const data = await resend.emails.send({
      from,
      to,
      subject: `Welcome to ${appName}! 🎉`,
      html,
    });
    console.log("✅ Welcome email sent:", data);
    return data;
  } catch (err) {
    console.error("❌ Failed to send welcome email:", err);
    throw new Error("Failed to send welcome email");
  }
};
