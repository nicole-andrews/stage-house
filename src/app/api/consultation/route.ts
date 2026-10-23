import { sendConsultation } from "@/lib/consultation";

export async function POST(request: Request) {
  return sendConsultation(request, {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM: process.env.RESEND_FROM,
  });
}
