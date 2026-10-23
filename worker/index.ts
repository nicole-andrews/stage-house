import { sendConsultation } from "../src/lib/consultation";

type Env = {
  RESEND_API_KEY: string;
  RESEND_FROM: string;
  ASSETS: { fetch: typeof fetch };
};

export default {
  async fetch(request: Request, env: Env) {
    const { pathname } = new URL(request.url);

    if (request.method === "POST" && pathname === "/api/consultation") {
      return sendConsultation(request, env);
    }

    if (pathname.startsWith("/api/")) {
      return Response.json({ ok: false }, { status: 404 });
    }

    return env.ASSETS.fetch(request);
  },
};
