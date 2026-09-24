<p align="center">
  <a href="https://github.com/Vignesh025/StockX-Backend" target="_blank" rel="noopener noreferrer">
    <strong>🔗 Backend Repository: StockX Backend</strong>
  </a>
</p>

<p align="center">
  <h1 align="center">📈 StockX Frontend</h1>
  <p align="center">
    A modern, responsive single-page application for a stock-trading simulation platform.<br/>
    Built with <strong>React 19</strong>, <strong>Vite 8</strong>, and <strong>Vanilla CSS</strong> with a premium dark/light design system.
  </p>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white" alt="Vite 8" />
  <img src="https://img.shields.io/badge/Router-v7-CA4245?logo=reactrouter&logoColor=white" alt="React Router" />
  <img src="https://img.shields.io/badge/Axios-HTTP-5A29E4?logo=axios&logoColor=white" alt="Axios" />
  <img src="https://img.shields.io/badge/Lucide-Icons-F56565?logo=lucide&logoColor=white" alt="Lucide" />
</p>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
  - [Production Build](#production-build)
- [Design System](#design-system)
- [Routing & Navigation](#routing--navigation)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Pages & Components](#pages--components)
- [Utilities](#utilities)

---

## Overview

**StockX Frontend** is the client-side application for the StockX stock-trading simulation platform. It provides a rich, dashboard-style interface where users can:

- 🔐 **Register & log in** with JWT-based authentication
- 📊 **Browse top stocks** with real-time pricing data
- 🔍 **Search** across thousands of US-listed equities
- 💰 **Buy & sell stocks** with instant wallet debit/credit
- 📈 **Track portfolio** performance with P&L breakdowns
- 💳 **Deposit funds** via Stripe Checkout integration
- 📜 **View transaction history** with type filtering
- 👑 **Admin dashboard** for user management (admin role only)
- 🌗 **Dark & light theme** toggle with persistence

---

## Features

| Feature | Description |
|---|---|
| **Premium Dark/Light UI** | Curated design tokens with dark and light themes. Smooth transitions, glassmorphism, and a polished feel using Inter font. |
| **Sidebar Navigation** | Fixed sidebar with branded logo, navigation links, user profile card, wallet balance, and logout. Admin links appear for admin users. |
| **Stock Search** | Debounced search input that queries the backend for matching stocks. Click any result to open a detail modal. |
| **Top Stocks Grid** | Homepage displays the top 15 most-valued stocks as cards with price and change indicators. |
| **Stock Detail Modal** | Shows current price, exchange info, and a buy form — all in an animated modal overlay. |
| **Trading (Buy/Sell)** | Buy stocks from the market page. Sell from the portfolio page. Quantity validation and balance checks. |
| **Portfolio Dashboard** | Summary stats (total value, cost, P&L) plus a holdings table with per-stock profit/loss. |
| **Wallet & Deposits** | View balance, initiate Stripe Checkout deposits ($10–$10,000), and see a full transaction history. |
| **Toast Notifications** | Contextual success/error/info/warning toasts with auto-dismiss and manual close. |
| **Route Guards** | `RequireAuth`, `RequireAdmin`, and `GuestOnly` wrappers protect pages based on auth state and role. |
| **Auto Token Validation** | On mount, the app validates the stored JWT by calling `/auth/me`. Invalid tokens are cleared silently. |
| **Global 401 Handling** | Axios interceptor auto-clears auth and redirects to login on any 401 response. |

---

## Tech Stack

| Category | Technology | Version |
|---|---|---|
| **UI Library** | [React](https://react.dev/) | 19.2 |
| **Build Tool** | [Vite](https://vite.dev/) | 8.0 |
| **Routing** | [React Router](https://reactrouter.com/) | 7.13 |
| **HTTP Client** | [Axios](https://axios-http.com/) | 1.13 |
| **Icons** | [Lucide React](https://lucide.dev/) | 0.577 |
| **Styling** | Vanilla CSS with design tokens | — |
| **Typography** | [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts) | — |
| **Linting** | ESLint 9 + React Hooks plugin | — |

---

## Architecture

The frontend follows a **feature-based** organization with clear separation between pages, components, services, context, hooks, and utilities.

```
┌─────────────────────────────────────────────────────────────────┐
│                          Pages                                  │
│    HomePage · MarketPage · PortfolioPage · WalletPage · Admin   │
├─────────────────────────────────────────────────────────────────┤
│                       Components                                │
│  Layout (Sidebar, Header, Footer, MainLayout)                   │
│  Market (StockSearch, TopStocks, StockCard, StockDetailModal,   │
│          BuyStockForm)                                          │
│  Portfolio (PortfolioSummary, PortfolioTable, HoldingCard,      │
│            SellStockForm)                                       │
│  Wallet (WalletBalance, DepositModal, TransactionHistory)       │
│  Auth (LoginForm, RegisterForm, LogoutButton)                   │
│  Admin (AdminDashboard, UserManagementTable, UserDetailModal)   │
│  Common (LoadingSpinner, ErrorAlert, SuccessAlert,              │
│          ConfirmDialog)                                         │
├─────────────────────────────────────────────────────────────────┤
│                    Context (State)                               │
│   AuthContext · WalletContext · ThemeContext ·                   │
│   NotificationContext                                           │
├─────────────────────────────────────────────────────────────────┤
│                   Custom Hooks                                  │
│   useAuth · useWallet · useQuery · usePagination                │
├─────────────────────────────────────────────────────────────────┤
│                   API Services                                  │
│   api.js (Axios instance) · authService · stockService          │
│   tradingService · walletService · adminService                 │
├─────────────────────────────────────────────────────────────────┤
│                    Utilities                                    │
│   constants · formatters · validators · localStorage            │
└─────────────────────────────────────────────────────────────────┘
```

**Data Flow:**
1. **Pages** compose **Components** and wire up state
2. **Components** call **Services** for API interaction
3. **Services** use a shared **Axios instance** with JWT interceptors
4. **Context providers** manage global state (auth, wallet, theme, notifications)
5. **Hooks** abstract common patterns (data fetching, pagination)

---

## Project Structure

```
StockX-Frontend/
├── public/
│   ├── favicon.svg                    # App favicon
│   └── icons.svg                     # SVG icon sprite
│
├── src/
│   ├── main.jsx                       # React DOM entry point
│   ├── App.jsx                        # Root component (providers + router)
│   ├── Router.jsx                     # Route definitions + guards
│   ├── index.css                      # Global design system (~400 lines)
│   ├── App.css                        # App-level overrides
│   │
│   ├── assets/                        # Static assets
│   │   ├── hero.png                   # Hero image
│   │   ├── react.svg
│   │   └── vite.svg
│   │
│   ├── components/
│   │   ├── Admin/
│   │   │   ├── AdminDashboard.jsx     # Dashboard layout wrapper
│   │   │   ├── UserManagementTable.jsx # Paginated user list with search
│   │   │   └── UserDetailModal.jsx    # User detail drill-down modal
│   │   │
│   │   ├── Auth/
│   │   │   ├── LoginForm.jsx          # Email/password login with validation
│   │   │   ├── RegisterForm.jsx       # Registration with name/email/password
│   │   │   └── LogoutButton.jsx       # Logout trigger
│   │   │
│   │   ├── Common/
│   │   │   ├── ConfirmDialog.jsx      # Reusable confirmation modal
│   │   │   ├── ErrorAlert.jsx         # Error message display
│   │   │   ├── LoadingSpinner.jsx     # Animated loading indicator
│   │   │   └── SuccessAlert.jsx       # Success message display
│   │   │
│   │   ├── Layout/
│   │   │   ├── MainLayout.jsx         # Sidebar + Header + Footer + Toasts
│   │   │   ├── Sidebar.jsx            # Fixed sidebar navigation
│   │   │   ├── Header.jsx             # Top bar (title, balance, theme toggle)
│   │   │   └── Footer.jsx             # Footer strip
│   │   │
│   │   ├── Market/
│   │   │   ├── StockSearch.jsx        # Debounced search input + results list
│   │   │   ├── TopStocks.jsx          # Top stocks grid (auto-fetching)
│   │   │   ├── StockCard.jsx          # Individual stock card
│   │   │   ├── StockDetailModal.jsx   # Stock price + buy form modal
│   │   │   └── BuyStockForm.jsx       # Buy shares form with validation
│   │   │
│   │   ├── Portfolio/
│   │   │   ├── PortfolioSummary.jsx   # Total value / cost / P&L stats
│   │   │   ├── PortfolioTable.jsx     # Holdings table
│   │   │   ├── HoldingCard.jsx        # Individual holding with sell trigger
│   │   │   └── SellStockForm.jsx      # Sell shares form with validation
│   │   │
│   │   └── Wallet/
│   │       ├── WalletBalance.jsx      # Balance display card
│   │       ├── DepositModal.jsx       # Stripe Checkout deposit form
│   │       └── TransactionHistory.jsx # Filterable transaction list
│   │
│   ├── context/
│   │   ├── AuthContext.jsx            # Auth state, login, register, logout
│   │   ├── WalletContext.jsx          # Wallet balance state
│   │   ├── ThemeContext.jsx           # Dark/light theme toggle
│   │   └── NotificationContext.jsx    # Toast notification system
│   │
│   ├── hooks/
│   │   ├── useAuth.js                 # Shorthand for useContext(AuthContext)
│   │   ├── useWallet.js               # Shorthand for useContext(WalletContext)
│   │   ├── useQuery.js                # Data-fetching hook (loading, error, refetch)
│   │   └── usePagination.js           # Pagination state (page, limit, offset)
│   │
│   ├── services/
│   │   ├── api.js                     # Axios instance + JWT/401 interceptors
│   │   ├── authService.js             # register, login, getMe
│   │   ├── stockService.js            # searchStocks, getTopStocks, getStockDetails
│   │   ├── tradingService.js          # buyStock, sellStock, getPortfolio
│   │   ├── walletService.js           # getBalance, initiateDeposit, getTransactions
│   │   └── adminService.js            # getAdminUsers, getAdminUserDetail, etc.
│   │
│   └── utils/
│       ├── constants.js               # API_URL, routes, roles, transaction types
│       ├── formatters.js              # Currency, percent, date, relative time
│       ├── validators.js              # Email, password, name, amount, quantity
│       └── localStorage.js            # Token & user storage helpers
│
├── .env.local                         # Local environment variables
├── .env.production                    # Production environment variables
├── index.html                         # HTML entry point
├── vite.config.js                     # Vite configuration (port, proxy)
├── eslint.config.js                   # ESLint flat config
├── package.json
└── package-lock.json
```

---

## Getting Started

### Prerequisites

| Tool | Version |
|---|---|
| [Node.js](https://nodejs.org/) | 18+ (LTS recommended) |
| [npm](https://www.npmjs.com/) | 9+ |
| StockX Backend | Running locally on `http://localhost:5052` |

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/StockX-Frontend.git
cd StockX-Frontend

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Base URL for API calls (proxied to backend in dev)
VITE_API_URL=/api

# Stripe publishable key (for client-side Checkout)
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

For production, create `.env.production`:

```env
VITE_API_URL=https://your-backend-domain.com/api
VITE_STRIPE_PUBLIC_KEY=pk_live_...
```

> **Note:** All environment variables must be prefixed with `VITE_` to be exposed to the client bundle.

### Running Locally

```bash
npm run dev
```

The app starts at **http://localhost:3000** with:
- Hot Module Replacement (HMR) enabled
- API proxy configured to forward `/api/*` requests to `http://localhost:5052`

### Production Build

```bash
# Build for production
npm run build

# Preview the build locally
npm run preview
```

The build output is written to the `dist/` directory and is ready for static hosting.

---

## Design System

The application uses a comprehensive CSS design system defined in `src/index.css` (~400 lines) with the following features:

### Design Tokens

All colors, spacing, radii, shadows, and transitions are defined as CSS custom properties:

```css
:root {
  /* Background layers */
  --bg-base, --bg-surface, --bg-elevated, --bg-card, --bg-overlay

  /* Brand palette */
  --brand (#6366f1), --brand-hover, --brand-dim, --brand-border

  /* Semantic colors */
  --green, --red, --amber, --blue (with -dim variants)

  /* Typography */
  --text, --text-muted, --text-subtle, --text-inverse

  /* Spacing scale */
  --sp-1 (4px) through --sp-16 (64px)

  /* Border radius */
  --r-sm (6px) → --r-full (9999px)
}
```

### Theme Support

Themes are toggled via `data-theme="light"` on `<html>`:

| Token | Dark | Light |
|---|---|---|
| `--bg-base` | `#0a0b0f` | `#f4f7fb` |
| `--bg-surface` | `#111318` | `#ffffff` |
| `--brand` | `#6366f1` | `#4f46e5` |
| `--text` | `#e2e8f0` | `#0f172a` |

### Component Classes

The CSS provides pre-built classes for:

| Category | Classes |
|---|---|
| **Buttons** | `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-success`, `.btn-danger`, `.btn-ghost`, `.btn-sm`, `.btn-lg`, `.btn-icon` |
| **Forms** | `.form-group`, `.form-label`, `.form-input`, `.form-error`, `.form-hint` |
| **Cards** | `.card`, `.card-header` |
| **Badges** | `.badge`, `.badge-brand`, `.badge-green`, `.badge-red`, `.badge-amber`, `.badge-blue`, `.badge-muted` |
| **Tables** | `.table-wrap`, standard `table`/`thead`/`tbody` styling |
| **Modals** | `.modal-overlay`, `.modal`, `.modal-title`, `.modal-footer` |
| **Toasts** | `.toast-container`, `.toast`, `.toast-success`, `.toast-error`, `.toast-info`, `.toast-warning` |
| **Layout** | `.app-layout`, `.main-content`, `.page-container`, `.sidebar`, `.header` |
| **Stats** | `.stat-grid`, `.stat-card`, `.stat-label`, `.stat-value` |
| **Auth** | `.auth-page`, `.auth-card`, `.auth-form`, `.auth-logo` |
| **States** | `.empty-state`, `.skeleton` (shimmer animation), `.loading-spinner` |

### Responsive Design

The layout switches from sidebar to full-width at `768px`:
- Sidebar slides off-screen on mobile
- Main content takes full width
- Grid columns reduce from auto-fit to 1–2 columns

---

## Routing & Navigation

Routes are defined in `src/Router.jsx` with three guard types:

| Guard | Behavior |
|---|---|
| **`RequireAuth`** | Redirects to `/login` if not authenticated |
| **`RequireAdmin`** | Redirects to `/login` (unauthenticated) or `/unauthorized` (non-admin) |
| **`GuestOnly`** | Redirects to `/` if already authenticated |

### Route Map

| Path | Guard | Page | Description |
|---|---|---|---|
| `/login` | GuestOnly | `LoginForm` | Login page |
| `/register` | GuestOnly | `RegisterForm` | Registration page |
| `/` | RequireAuth | `HomePage` | Dashboard with top stocks & wallet |
| `/market` | RequireAuth | `MarketPage` | Stock search & quick picks |
| `/portfolio` | RequireAuth | `PortfolioPage` | Holdings & P&L summary |
| `/wallet` | RequireAuth | `WalletPage` | Balance, deposits, transactions |
| `/admin` | RequireAdmin | `AdminDashboardPage` | User management (admin only) |
| `/wallet/deposit/success` | RequireAuth | → `/wallet?success=true` | Stripe success redirect |
| `/wallet/deposit/cancel` | RequireAuth | → `/wallet?canceled=true` | Stripe cancel redirect |
| `/unauthorized` | — | `UnauthorizedPage` | 403 page |
| `/404` | — | `NotFoundPage` | 404 page |
| `*` | — | `NotFoundPage` | Catch-all |

---

## State Management

Global state is managed through four React Context providers, nested in `App.jsx`:

```
BrowserRouter
  └── ThemeProvider          (dark/light theme)
        └── NotificationProvider  (toast notifications)
              └── AuthProvider         (user, login, logout)
                    └── WalletProvider       (balance state)
```

### Context Details

| Context | State | Actions | Hook |
|---|---|---|---|
| **AuthContext** | `user`, `loading`, `isAuthenticated`, `isAdmin` | `login()`, `register()`, `logout()`, `refreshUser()` | `useAuth()` |
| **WalletContext** | `balance`, `loadingBalance` | `fetchBalance()`, `updateBalance()` | `useWallet()` |
| **ThemeContext** | `theme`, `isLightMode` | `toggleTheme()` | `useTheme()` |
| **NotificationContext** | `notifications[]` | `notify.success()`, `.error()`, `.info()`, `.warning()`, `dismiss()` | `useNotification()` |

All contexts persist relevant state to `localStorage`:
- **Auth:** JWT token (`stockx_token`) and user object (`stockx_user`)
- **Theme:** Theme preference (`stockx-theme`)

---

## API Integration

### Axios Instance (`services/api.js`)

A central Axios instance handles:

1. **Base URL:** Reads from `VITE_API_URL` environment variable (defaults to `/api`)
2. **Request Interceptor:** Attaches `Authorization: Bearer <token>` header to every request
3. **Response Interceptor:** On 401 responses, clears auth storage and redirects to `/login`

### Service Modules

| Service | Methods | Backend Endpoints |
|---|---|---|
| **authService** | `register()`, `login()`, `getMe()` | `POST /auth/register`, `POST /auth/login`, `GET /auth/me` |
| **stockService** | `searchStocks()`, `getTopStocks()`, `getStockDetails()` | `GET /stock/search`, `GET /stock/top`, `GET /stock/{symbol}` |
| **tradingService** | `buyStock()`, `sellStock()`, `getPortfolio()` | `POST /trading/buy`, `POST /trading/sell`, `GET /portfolio` |
| **walletService** | `getBalance()`, `initiateDeposit()`, `getTransactions()` | `GET /wallet/balance`, `POST /wallet/deposit/initiate`, `GET /transactions` |
| **adminService** | `getAdminUsers()`, `getAdminUserDetail()`, `updateUserActivation()`, `updateUserRole()` | `GET /admin/users`, `GET /admin/users/:id`, `PUT /admin/users/:id/activate`, `PUT /admin/users/:id/role` |

### Dev Proxy

In development, Vite proxies all `/api` requests to the backend:

```js
// vite.config.js
server: {
  port: 3000,
  proxy: {
    '/api': {
      target: 'http://localhost:5052',
      changeOrigin: true,
    },
  },
}
```

---

## Pages & Components

### Pages

| Page | Key Components | Description |
|---|---|---|
| **HomePage** | `WalletBalance`, `TopStocks`, `StockDetailModal` | Welcome banner, wallet snapshot, top 15 stocks |
| **MarketPage** | `StockSearch`, `StockDetailModal` | Search bar, quick-pick badges (AAPL, TSLA, etc.) |
| **PortfolioPage** | `PortfolioSummary`, `PortfolioTable`, `HoldingCard`, `SellStockForm` | P&L stats grid, holdings list with sell action |
| **WalletPage** | `WalletBalance`, `DepositModal`, `TransactionHistory` | Balance card, deposit button, filtered transaction list |
| **AdminDashboardPage** | `AdminDashboard`, `UserManagementTable`, `UserDetailModal` | Paginated user table with search and detail drill-down |

### Component Highlights

| Component | Behavior |
|---|---|
| **StockSearch** | Debounced text input that fetches matching stocks as you type. Click a result to open the detail modal. |
| **StockDetailModal** | Fetches real-time price via `getStockDetails()`. Includes an inline `BuyStockForm`. |
| **BuyStockForm** | Validates quantity, shows estimated cost, confirms purchase, updates wallet balance. |
| **SellStockForm** | Shows owned quantity, validates sell amount, confirms sale, updates wallet. |
| **DepositModal** | Amount input ($10–$10,000), calls `initiateDeposit()`, redirects to Stripe Checkout. |
| **TransactionHistory** | Fetches transactions with type filter (`all`, `deposit`, `trade`). Paginated display. |
| **UserManagementTable** | Paginated user list with search. Click a row to open `UserDetailModal`. |

---

## Utilities

### Formatters (`utils/formatters.js`)

| Function | Example Output |
|---|---|
| `formatCurrency(175.1)` | `$175.10` |
| `formatPercent(3.5)` | `+3.50%` |
| `formatLargeNumber(2500000000)` | `$2.50B` |
| `formatDate(timestamp)` | `Apr 28, 2026, 10:30 AM` |
| `formatRelativeTime(timestamp)` | `5 minutes ago` |
| `formatTransactionType('StockBuy')` | `Buy` |
| `profitLossClass(51)` | `'positive'` |

### Validators (`utils/validators.js`)

| Function | Rules |
|---|---|
| `validateEmail()` | Required, valid email format |
| `validatePassword()` | Required, min 8 chars, 1 uppercase, 1 number |
| `validateName()` | Required, min 2 chars |
| `validateDepositAmount()` | Required, $10–$10,000 range |
| `validateQuantity()` | Required, > 0, optional max check |
| `validateSymbol()` | Required, alphanumeric |

### Custom Hooks

| Hook | Purpose |
|---|---|
| `useQuery(fetchFn, deps, options)` | Generic data fetcher with `loading`, `error`, `data`, `refetch`. Supports `immediate` fetch and `refetchInterval`. |
| `usePagination(initialPage, limit)` | Pagination state with `nextPage`, `prevPage`, `goToPage`, `reset`, and computed `offset`. |

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server on port 3000 with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint across all JS/JSX files |

---

<p align="center">
  Built with ❤️ using React 19 + Vite 8
</p>
