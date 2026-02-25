# TechBuy

An online electronics store built for the Albanian market. Supports bilingual content (English / Albanian), dual currency (ALL / EUR), user accounts, wishlists, cart with stock reservations, and a full checkout flow.
[text](https://www.deluxomarketplace.live/)
Live product catalog includes laptops, phones, TVs, gaming gear, and accessories from brands like Apple, Samsung, Sony, Dell, ASUS, and others.

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + shadcn/ui (Radix primitives)
- **Backend / Auth / DB:** Supabase (auth, Postgres, row-level security)
- **State:** React Context (auth, cart, wishlist, language, currency)
- **Forms:** React Hook Form + Zod validation
- **Package Manager:** pnpm

## Features

- **Product browsing** — categories, search, filters, product detail pages with specs
- **Deals & sale badges** — products can be marked on sale with original/discounted prices
- **Bilingual UI** — full English and Albanian translations via a language context + `t()` helper
- **Dual currency** — prices stored in both ALL and EUR; user can switch at any time
- **Auth** — email/password sign-up, Google OAuth, password reset (all through Supabase Auth)
- **User accounts** — profile editing, saved addresses, order history, wishlist
- **Cart** — add/remove/update quantities, persisted in localStorage for guests
- **Stock reservations** — timed reservation system during checkout so two people can't buy the last unit
- **Wishlist** — synced with Supabase for logged-in users
- **Dark mode** — via `next-themes`
- **Responsive** — mobile-first, drawer-based cart, collapsible navigation

## Project Structure

```
app/
├── (shop)/           # Main storefront — homepage, products, categories, deals, cart, checkout
├── (auth)/           # Login, register, forgot password
├── (account)/        # User dashboard — profile, orders, addresses, wishlist
├── api/              # API routes (auth callbacks, stock reservations)
├── about/  contact/  faq/  help/  pricing/  ...   # Static / info pages
components/
├── ui/               # shadcn/ui primitives (button, card, dialog, etc.)
├── products/         # Product card
├── cart/             # Cart drawer
├── checkout/         # Reservation timer
├── account/          # Account sidebar
contexts/             # Auth, Cart, Wishlist, Language, Currency providers
hooks/                # useStockReservation, useMobile, useToast
lib/
├── products-data.ts  # Static product catalog (used as seed / fallback)
├── supabase/         # Supabase client, server, and middleware helpers
types/
├── database.ts       # Supabase-generated DB types (profiles, addresses, orders, products, etc.)
supabase/
└── migrations/       # SQL migrations (stock reservations, etc.)
```

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm 8.15+
- A Supabase project (free tier works fine)

### Setup

1. Clone the repo:
   ```bash
   git clone <repo-url>
   cd TechBuy
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Create a `.env.local` file in the project root with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

4. Run the SQL migrations in `supabase/migrations/` against your Supabase project (you can paste them into the SQL editor in the Supabase dashboard).

5. Start the dev server:
   ```bash
   pnpm dev
   ```

   The app will be available at `http://localhost:3000`.

### Build

```bash
pnpm build
pnpm start
```

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous/public key |

## Notes

- Product data in `lib/products-data.ts` is used as a static catalog. In production you'd pull this from the `products` table in Supabase.
- The cart currently uses localStorage for both guest and authenticated users. Supabase sync is stubbed out and can be wired up.
- Stock reservations expire after a configurable timeout (see `useStockReservation` hook and the `reservations` API route).
- Images are loaded from Unsplash and Supabase Storage — the domains are allowlisted in `next.config.mjs`.

## License

MIT
