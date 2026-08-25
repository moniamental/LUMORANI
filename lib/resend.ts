import "server-only";
import { Resend } from "resend";

let cached: Resend | null = null;

/** Server-Resend-Client. Null, wenn kein RESEND_API_KEY gesetzt ist. */
export function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!cached) cached = new Resend(key);
  return cached;
}
