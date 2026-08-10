# FastFactor for Sellers

FastFactor is a lightweight B2B order collection platform designed for small sellers who operate primarily through social media or direct messaging and need a simple, reliable way to collect structured orders and payment proofs.

Instead of managing orders through scattered chat messages, sellers can create a storefront, generate a unique order link, and let customers submit orders through a structured form.

---

## 🚀 Problem Statement

Many small businesses and individual sellers:

- Sell products through Instagram, WhatsApp, or Telegram
- Collect orders manually via chat messages
- Receive payment receipts as images in DMs
- Manually track customer details, addresses, and orders

This leads to:

- Lost or incomplete order information
- Difficult order tracking
- No centralized order history
- High cognitive load for sellers

FastFactor aims to solve this by providing a **single, structured order flow** without requiring sellers to build a full e-commerce website.

---

## 🎯 Target Users

**Primary users (B2B):**

- Small business owners
- Instagram-based sellers
- Home businesses
- Individual sellers without technical background

**Secondary users:**

- Customers submitting orders via a public order form

---

## 🧠 Solution Overview

FastFactor provides:

- Seller authentication and dashboard
- Store profile creation (name, payment info, delivery cost)
- Unique public order link per seller
- Public customer order form
- Payment receipt upload
- Centralized order management panel

The platform focuses on **speed, simplicity, and low setup cost**.

---

## 🏗 Architecture Overview

### Frontend

- **React + TypeScript**
- **Vite** for fast builds and development
- **TailwindCSS + shadcn/ui** for consistent UI
- **React Router** for routing
- **TanStack Query** for server-state management
- **PWA support** for installability on mobile devices

### Backend / Infrastructure

- **Supabase**
  - Authentication
  - PostgreSQL database
  - File storage for payment receipts
  - Row Level Security (RLS)

### Deployment

- Frontend deployed on **Vercel**
- Backend managed by Supabase

---

## 🔄 User Flow

### Seller Flow

1. Seller signs up / logs in
2. Creates or updates store profile
3. Receives a unique public order link
4. Shares the link with customers
5. Views incoming orders in dashboard

### Customer Flow

1. Opens seller’s public order link
2. Fills order form (product, quantity, address)
3. Uploads payment receipt
4. Submits order

---

## 🗂 Data Model (Simplified)

- **users**
  - id
  - email

- **stores**
  - id
  - owner_id
  - name
  - payment_info
  - shipping_cost

- **orders**
  - id
  - store_id
  - customer_name
  - customer_phone
  - address
  - product_details
  - receipt_url
  - created_at

---

## 🔐 Security Considerations

- Supabase Auth for authentication
- Row Level Security (RLS) ensures:
  - Sellers can only access their own stores and orders
  - Public order creation is limited to insert-only operations
- Uploaded payment receipts are stored securely in Supabase Storage

---

## ⚙️ State Management Strategy

- **TanStack Query** is used for:
  - Fetching orders
  - Caching server responses
  - Preventing unnecessary refetches
- Local UI state handled with React hooks
- Clear separation between server state and UI state

---

## 🧪 Testing Strategy (Planned)

Currently, the project focuses on functional completeness.
Planned improvements include:

- Unit tests for Supabase service layer
- Integration tests for order submission flow

---

## 📈 Trade-offs & Design Decisions

### Why Supabase?

- Fast backend setup
- Built-in authentication
- PostgreSQL with RLS
- Minimal backend maintenance

**Trade-off:** Less flexibility compared to a fully custom backend.

### Why TanStack Query?

- Clear separation of server and client state
- Automatic caching and revalidation
- Reduced boilerplate compared to Redux for async data

### Why not a full e-commerce system?

- Target users need **simplicity**, not feature overload
- Lower friction means higher adoption for small sellers

---

## 🔮 Future Improvements

- Order status management (pending / confirmed / shipped)
- Seller analytics dashboard
- SMS or WhatsApp notifications
- Multi-product orders
- Admin moderation tools

---

## 🧑‍💻 Developer Notes

This project was built to demonstrate:

- Product thinking
- End-to-end ownership
- Clean frontend architecture
- Real-world integration with backend services
- B2B-focused problem solving

It reflects how I approach building production-ready internal tools and customer-facing workflows.

---

## 📦 Installation

```bash
npm install
npm run dev
```

---

## 🐳 Running with Docker

The Docker Compose setup can run PostgreSQL and the Express backend locally.
The backend reads its Docker environment from `backend/.env.docker`.

### Backend and Database Only

Start PostgreSQL and the backend from the repository root:

```bash
docker compose up --build -d postgres backend
```

Apply the database migrations after the containers are running:

```bash
docker compose exec backend pnpm db:up
```

Check that the backend is reachable:

```bash
curl http://localhost:4000/
curl http://localhost:4000/health
```

Useful Docker commands:

```bash
docker compose ps
docker compose logs -f backend
docker compose logs -f postgres
```

Stop the services:

```bash
docker compose down
```

Stop the services and remove the local PostgreSQL data volume:

```bash
docker compose down -v
```

To restart from a clean database:

```bash
docker compose down -v
docker compose up --build -d postgres backend
docker compose exec backend pnpm db:up
```

### Full Local Stack

To run PostgreSQL, backend, and frontend together:

```bash
docker compose up --build -d
docker compose exec backend pnpm db:up
```

Local service URLs:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`
- Health check: `http://localhost:4000/health`
- PostgreSQL: `localhost:5432`

Inside Docker, `DATABASE_URL` must use the Compose service hostname
`postgres`, not `localhost`:

```env
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/fastfactor_db
```
