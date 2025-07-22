# Exclusive E-Commerce Platform

[![Live Demo](https://exclusive-blond-rho.vercel.app/)

A modern, full-featured multi-vendor e-commerce platform built with Next.js, React, Prisma, Clerk authentication, and Tailwind CSS. This project supports customers and vendors, with robust product management, shopping cart, wishlist, and analytics dashboards.

---

## 🚀 Features

- **Multi-Vendor Marketplace:**
  - Customers can browse, search, and purchase products from multiple vendors.
  - Vendors can manage their own products, inventory, and view sales analytics.
- **Authentication:**
  - Secure sign-in/sign-up with [Clerk](https://clerk.dev/).
  - Role-based access for customers and vendors.
- **Product Catalog:**
  - Category browsing, product search, and detailed product pages with images, tags, ratings, and reviews.
- **Shopping Cart & Checkout:**
  - Add/remove products, update quantities, and proceed to checkout with payment integration (Paymob).
- **Wishlist:**
  - Save favorite products for later.
- **Admin & Vendor Dashboards:**
  - Real-time analytics: revenue, new customers, active accounts, growth rate, and sales over time.
  - Product management: add, edit, and remove products with image uploads and tags.
- **Responsive UI:**
  - Mobile-friendly, modern design using Tailwind CSS and Radix UI components.
- **Fast Delivery, 24/7 Support, Money-Back Guarantee:**
  - Highlighted service features for customer trust.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 15, React 19, Tailwind CSS, Radix UI
- **Backend:** Next.js API routes, Prisma ORM, PostgreSQL
- **Authentication:** Clerk
- **File Uploads:** UploadThing
- **Payments:** Paymob
- **State Management:** React Context (Cart, Wishlist)
- **Caching:** Redis (Upstash)
- **Charts:** Recharts
- **Other:** Zod, SWR, ESLint, TypeScript

---

## 🗄️ Database Schema (Prisma)

- **User:** Customer or Vendor, with profile and role
- **Product:** Name, description, price, stock, images, tags, rating, reviews, vendor owner
- **Cart & CartItem:** User cart and items
- **Order & OrderItem:** Orders with status (Pending, Paid, Shipped, Delivered, Cancelled)
- **Wishlist & WishlistItem:** User wishlist
- **Tag/ProductTag:** Product categorization

See [`prisma/schema.prisma`](prisma/schema.prisma) for full details.

---

## 📦 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/e-commerce.git
cd e-commerce
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Set up environment variables
Create a `.env` file in the root with the following (see `.env.example` if available):
```
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
CLERK_SECRET_KEY=your-clerk-secret
CLERK_PUBLISHABLE_KEY=your-clerk-publishable
PAYMOB_IFRAME_ID=your-paymob-iframe-id
REDIS_URL=your-redis-url
# ...other required env vars
```

### 4. Set up the database
```bash
npx prisma migrate deploy
npx prisma generate
```

### 5. Run the development server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🧭 Main Pages & Flows

- `/` — Home: Featured products, banners, categories, flash sales
- `/shop` — All products, filter by tags
- `/category/[category]` — Browse by category
- `/search` — Search products by tag
- `/cart` — Shopping cart and checkout
- `/wishlist` — User wishlist
- `/about` — About the platform, team, and services
- `/vendor/dashboard` — Vendor analytics dashboard
- `/vendor/dashboard/adding-product` — Add new products (vendors)
- `/sign-in`, `/sign-up` — Authentication

---

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🌐 Live Demo

**Update this section with your deployed URL:**

[https://your-live-link-here.com](https://your-live-link-here.com)
