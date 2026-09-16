# Stage House

Website for a small home staging business. Built with Next.js, React, TypeScript, and Tailwind.

## Product

See [Requirements.md](./Requirements.md). The site exists to generate consultation leads and show staging work.

## Develop

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Consultation emails

The contact form posts to `/api/consultation`, which sends mail through [Resend](https://resend.com) to the address in `src/content/site.ts`.

1. Create an API key at [resend.com/api-keys](https://resend.com/api-keys).
2. Verify a sending domain at [resend.com/domains](https://resend.com/domains). Yahoo cannot be used as the *from* address.
3. Copy `.env.example` to `.env.local` and set `RESEND_API_KEY` and `RESEND_FROM` (for example `Stage House Interiors <hello@yourdomain.com>`).
4. Add the same variables in Vercel (or your host) for production.

Angela can reply directly to the visitor because `replyTo` is set to the form email.

## Where to edit

| What | Where |
| --- | --- |
| Business copy, nav, services, portfolio, testimonials | `src/content/site.ts` |
| Pages | `src/app/` |
| Shared UI | `src/components/` |
| Agent instructions | `AGENTS.md` and `.cursor/rules/` |

## Brand files

Logos live in `icons/` and are copied to `public/brand/` for the site.
