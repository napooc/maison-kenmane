This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Shopify setup (headless)

1) Create `.env.local` at the project root (you can copy from `.env.example`).

Required:

- `SHOPIFY_STORE_DOMAIN` (example: `your-store.myshopify.com`)
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN`

For COD order creation (server-side):

- `SHOPIFY_ADMIN_ACCESS_TOKEN`

### OAuth connect (Client ID / Secret)

If you only have a Shopify app `Client ID` + `Client Secret`, set these in `.env.local`:

- `SHOPIFY_APP_CLIENT_ID`
- `SHOPIFY_APP_CLIENT_SECRET`

Then open:

- `http://localhost:3000/api/auth/shopify/start?shop=your-store.myshopify.com`

After you approve, the app saves tokens into `.shopify-tokens.json` (dev-only) and the storefront will load products from your Shopify store.

Optional:

- `NEXT_PUBLIC_COD_CITIES` (comma-separated)
- `NEXT_PUBLIC_WHATSAPP_NUMBER` (international format without `+`)

### Product tagging

The homepage sections pull products using Shopify tags:

- Best sellers: `bestseller` (or `best-seller`)
- Nouveautés: `nouveaute` (or `nouveau`)

If no tagged products are found, the UI falls back to the first products returned by Shopify.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
