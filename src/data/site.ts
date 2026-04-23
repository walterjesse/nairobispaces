// Central placeholders so they're easy to swap.
export const BRAND = "Nairobi Spaces";
export const FOUNDER = "Amani"; // [FRIEND NAME]
export const WHATSAPP_NUMBER = "254741987770"; // E.164 (no +)
export const PHONE_DISPLAY = "+254 741 987 770";
export const PHONE_TEL = "+254741987770";
export const INSTAGRAM_URL = "https://www.instagram.com/nairobi___spaces";
export const INSTAGRAM_HANDLE = "@nairobi___spaces";
export const TIKTOK_URL = "https://www.tiktok.com/@nairobi__spaces";
export const TIKTOK_HANDLE = "@nairobi__spaces";
export const EMAIL = "stay@nairobispaces.co.ke";

export const KES_PER_USD = 129; // approx — display only

export function fmtKES(n: number) {
  return "KES " + n.toLocaleString("en-KE");
}
export function fmtUSD(n: number) {
  return "$" + Math.round(n / KES_PER_USD).toLocaleString("en-US");
}

export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
