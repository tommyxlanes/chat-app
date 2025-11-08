import { Resend } from "resend";
import { ENV } from "../lib/env.js";

if (!ENV.RESEND_API_KEY) {
  throw new Error("❌ Missing RESEND_API_KEY in .env");
}

export const resend = new Resend(ENV.RESEND_API_KEY);
