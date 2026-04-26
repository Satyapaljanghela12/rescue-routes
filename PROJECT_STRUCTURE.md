# Project Structure

## Overview
This document provides a comprehensive overview of the Rescue Routes project structure, explaining the purpose of each directory and file organization.

## Root Directory

```
rescue-routes/
├── public/                 # Static assets
├── src/                    # Source code
├── .codex/                 # Codex configuration
├── .git/                   # Git repository
├── .next/                  # Next.js build output (generated)
├── node_modules/           # Dependencies (generated)
├── .env.local              # Environment variables (not in git)
├── .env.example            # Environment template
├── .gitignore              # Git ignore rules
├── ARCHITECTURE.md         # Architecture documentation
├── next.config.ts          # Next.js configuration
├── package.json            # Project dependencies
├── postcss.config.mjs      # PostCSS configuration
├── README.md               # Project documentation
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## Public Directory Structure

```
public/
└── assets/                 # Organized static assets
    ├── images/
    │   ├── brand/          # Branding assets
    │   │   ├── logo.png
    │   │   ├── hindi.png
    │   │   └── paw-print.png
    │   │
    │   ├── animals/        # Animal photos
    │   │   ├── dog1.png
    │   │   ├── dog2.png
    │   │   └── stories/    # Success story images
    │   │       ├── shampoo.png
    │   │       ├── mithi.png
    │   │       ├── ladoo.png
    │   │       ├── milky.png
    │   │       ├── damru.png
    │   │       ├── sambhar.png
    │   │       ├── kismis.png
    │   │       ├── sona.png
    │   │       └── story1.jpg
    │   │
    │   ├── team/           # Team member photos
    │   │   ├── founder/
    │   │   │   └── sneha.png
    │   │   ├── core/
    │   │   │   ├── kaushiki.jpeg
    │   │   │   ├── sarvang.jpeg
    │   │   │   ├── vinayak.jpeg
    │   │   │   └── suryansha.jpeg
    │   │   └── interns/
    │   │       ├── anant.jpeg
    │   │       ├── aryan.jpeg
    │   │       ├── harshvardhan.jpeg
    │   │       └── vaibhavi.jpeg
    │   │
    │   ├── campaigns/      # Campaign images
    │   │   ├── 27-28dec.jpg
    │   │   ├── winter-bed-drive.jpg
    │   │   ├── water-pot-drive.jpg
    │   │   ├── year-end.jpg
    │   │   ├── annual-bed-drive.jpg
    │   │   ├── adoption-drive.jpg
    │   │   ├── adoption-olivers.jpg
    │   │   └── foundation-bed.jpg
    │   │
    │   └── gallery/        # General gallery images
    │       ├── volunteer-care.jpg
    │       ├── rescued-dog.jpg
    │       ├── shelter-care.jpeg
    │       ├── animals-shelter.jpeg
    │       ├── population-control.jpg
    │       ├── volunteers-bg.jpeg
    │       └── stories-bg.jpeg
    │
    └── videos/             # Video assets
        └── hero.mp4
```

## Source Directory Structure

```
src/
├── app/                    # Next.js App Router (Pages & Routes)
│   ├── (public pages)      # Public routes (no authentication required)
│   │   ├── page.tsx        # Home page (/)
│   │   ├── about/          # About page (/about)
│   │   ├── campaigns/      # Campaigns page (/campaigns)
│   │   ├── stories/        # Success stories (/stories)
│   │   ├── volunteers/     # Volunteers page (/volunteers)
│   │   ├── mission/        # Mission page (/mission)
│   │   ├── resources/      # Resources page (/resources)
│   │   ├── donate/         # Donation page (/donate)
│   │   ├── membership/     # Membership page (/membership)
│   │   ├── store/          # Store page (/store)
│   │   ├── blogs/          # Blogs listing (/blogs)
│   │   ├── checkout/       # Checkout page (/checkout)
│   │   └── my-orders/      # Order tracking (/my-orders)
│   │
│   ├── (auth)              # Authentication routes
│   │   ├── login/          # Login page (/login)
│   │   └── signup/         # Signup page (/signup)
│   │
│   ├── admin/              # Admin dashboard routes (/admin/*)
│   │   ├── layout.tsx      # Admin layout with auth protection
│   │   ├── dashboard/      # Admin dashboard home
│   │   ├── products/       # Product management
│   │   ├── orders/         # Order management
│   │   ├── donations/      # Donation tracking
│   │   ├── campaigns/      # Campaign management
│   │   ├── volunteers/     # Volunteer management
│   │   ├── blogs/          # Blog management
│   │   ├── adoptions/      # Adoption management
│   │   ├── adoption-applications/  # Adoption applications
│   │   ├── rescue-cases/   # Rescue case tracking
│   │   ├── alerts/         # Alert management
│   │   ├── memberships/    # Membership management
│   │   ├── campaign-requests/  # Campaign request approval
│   │   ├── analytics/      # Analytics dashboard
│   │   └── settings/       # Admin settings
│   │
│   ├── volunteer/          # Volunteer dashboard routes (/volunteer/*)
│   │   ├── layout.tsx      # Volunteer layout with auth protection
│   │   ├── dashboard/      # Volunteer dashboard home
│   │   ├── alerts/         # Rescue alerts
│   │   ├── campaigns/      # Campaign participation
│   │   ├── activity/       # Activity tracking
│   │   └── profile/        # Volunteer profile
│   │
│   ├── user/               # User dashboard routes (/user/*)
│   │   ├── layout.tsx      # User layout with auth protection
│   │   └── dashboard/      # User dashboard (orders, cart, products)
│   │
│   ├── api/                # API routes (Backend endpoints)
│   │   ├── auth/           # Authentication endpoints
│   │   │   ├── login/      # POST /api/auth/login
│   │   │   └── signup/     # POST /api/auth/signup
│   │   ├── products/       # Product CRUD operations
│   │   ├── orders/         # Order management
│   │   ├── donations/      # Donation processing
│   │   ├── campaigns/      # Campaign operations
│   │   ├── volunteers/     # Volunteer management
│   │   ├── blogs/          # Blog operations
│   │   ├── adoptions/      # Adoption management
│   │   ├── adoption-applications/  # Adoption applications
│   │   ├── rescue-cases/   # Rescue case management
│   │   ├── rescue-alerts/  # Rescue alerts
│   │   ├── memberships/    # Membership operations
│   │   ├── campaign-requests/  # Campaign requests
│   │   ├── razorpay/       # Payment gateway integration
│   │   │   ├── create-order/   # Create Razorpay order
│   │   │   └── verify-payment/ # Verify payment
│   │   └── send-email/     # Email service
│   │
│   ├── layout.tsx          # Root layout (wraps all pages)
│   ├── globals.css         # Global styles
│   └── favicon.ico         # Favicon
│
├── components/             # React Components
│   ├── layout/             # Layout components
│   │   ├── Navbar.tsx      # Main navigation bar
│   │   └── SiteFooter.tsx  # Site footer
│   │
│   ├── admin/              # Admin-specific components
│   │   ├── Sidebar.tsx     # Admin sidebar navigation
│   │   └── TopNav.tsx      # Admin top navigation
│   │
│   ├── volunteer/          # Volunteer-specific components
│   │   ├── VolunteerSidebar.tsx    # Volunteer sidebar
│   │   └── VolunteerTopNav.tsx     # Volunteer top nav
│   │
│   ├── sections/           # Page section components
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── StatsSection.tsx
│   │   ├── TeamSection.tsx
│   │   ├── FoundingTeamSection.tsx
│   │   ├── PastCampaignsSection.tsx
│   │   ├── UpcomingEventsSection.tsx
│   │   ├── WhatWeDo.tsx
│   │   ├── WhyRescueMatters.tsx
│   │   ├── FinalCTA.tsx
│   │   ├── ContactForm.tsx
│   │   ├── EventsSection.tsx
│   │   ├── BlogCarousel.tsx
│   │   └── OrganizationsCarousel.tsx
│   │
│   ├── shared/             # Shared/reusable components
│   │   ├── DonationModal.tsx
│   │   ├── DonationNotification.tsx
│   │   ├── RealtimeNotifications.tsx
│   │   ├── SocialMediaPopup.tsx
│   │   ├── WhatsAppButton.tsx
│   │   └── index.ts        # Barrel export
│   │
│   └── index.ts            # Component barrel exports
│
├── contexts/               # React Context Providers
│   ├── AuthContext.tsx     # Authentication state management
│   └── CartContext.tsx     # Shopping cart state management
│
├── lib/                    # Utility libraries
│   ├── mongodb.ts          # MongoDB connection & configuration
│   ├── config.ts           # Application configuration
│   ├── constants.ts        # Constants (routes, assets, enums)
│   └── utils/              # Utility functions
│       └── helpers.ts      # Helper functions (formatting, validation, etc.)
│
├── types/                  # TypeScript type definitions
│   └── index.ts            # Shared type definitions
│
└── hooks/                  # Custom React hooks
    └── (custom hooks)      # Place custom hooks here
```

## Key Concepts

### 1. App Router Structure
- **Pages**: Each folder in `src/app/` represents a route
- **Layouts**: `layout.tsx` files wrap child routes
- **API Routes**: `route.ts` files in `src/app/api/` handle backend logic

### 2. Component Organization
- **Layout**: Components used in layouts (Navbar, Footer)
- **Sections**: Reusable page sections
- **Admin/Volunteer**: Role-specific components
- **Shared**: Components used across multiple pages

### 3. Authentication Flow
```
User → Login Page → API Route → MongoDB → JWT Token → Context → Protected Route
```

### 4. Asset Organization
- All assets in `/public/assets/` for clean structure
- Organized by type: brand, animals, team, campaigns, gallery, videos
- Referenced via constants in `src/lib/constants.ts`

### 5. Type Safety
- All types defined in `src/types/index.ts`
- Shared across frontend and backend
- Ensures consistency and autocomplete

### 6. Configuration Management
- Environment variables in `.env.local`
- Configuration in `src/lib/config.ts`
- Constants in `src/lib/constants.ts`

## File Naming Conventions

### Pages (App Router)
- `page.tsx` - Page component
- `layout.tsx` - Layout wrapper
- `route.ts` - API route handler
- `loading.tsx` - Loading state
- `error.tsx` - Error boundary

### Components
- PascalCase: `ComponentName.tsx`
- Descriptive names: `AdminSidebar.tsx`, `HeroSection.tsx`

### Utilities
- camelCase: `helpers.ts`, `config.ts`
- Descriptive: `mongodb.ts`, `constants.ts`

### Types
- PascalCase for interfaces: `User`, `Product`, `Order`
- Descriptive: `ApiResponse`, `PaginatedResponse`

## Import Patterns

### Absolute Imports (Recommended)
```typescript
import { User } from "@/types";
import { ROUTES } from "@/lib/constants";
import { Navbar } from "@/components";
```

### Relative Imports (When Necessary)
```typescript
import Component from "./Component";
import { helper } from "../utils/helpers";
```

## Best Practices

1. **Keep components small and focused**
2. **Use TypeScript for type safety**
3. **Organize by feature, not by file type**
4. **Use barrel exports (index.ts) for cleaner imports**
5. **Keep business logic in API routes**
6. **Use contexts for global state**
7. **Centralize constants and configuration**
8. **Document complex logic with comments**

## Adding New Features

### Adding a New Page
1. Create folder in `src/app/[page-name]/`
2. Add `page.tsx` file
3. Add route to `ROUTES` in `constants.ts`

### Adding a New Component
1. Create component in appropriate folder
2. Export from `index.ts` if reusable
3. Import using absolute path

### Adding a New API Route
1. Create folder in `src/app/api/[endpoint]/`
2. Add `route.ts` with HTTP methods
3. Add endpoint to `API_ENDPOINTS` in `constants.ts`

### Adding New Types
1. Add to `src/types/index.ts`
2. Export for use across app
3. Use in components and API routes

## Maintenance

### Regular Tasks
- Update dependencies: `npm update`
- Check for security issues: `npm audit`
- Clean build: `rm -rf .next && npm run build`
- Format code: `npm run format` (if configured)

### Before Deployment
- Run build: `npm run build`
- Check for TypeScript errors
- Test all critical flows
- Update environment variables

---

Last Updated: April 2026
Version: 1.0.0
