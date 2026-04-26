# Project Architecture

## Overview

Rescue Routes is built using Next.js 16 with the App Router, TypeScript, and MongoDB. The application follows a modular, scalable architecture with clear separation of concerns.

## Technology Stack

### Frontend
- **Next.js 16.2.1**: React framework with App Router and Turbopack
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Lucide React**: Icon library

### Backend
- **Next.js API Routes**: Serverless API endpoints
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB
- **Nodemailer**: Email service

### Payment & Services
- **Razorpay**: Payment gateway integration
- **JWT**: Authentication tokens

## Project Structure

```
rescue-routes/
├── public/
│   └── assets/                    # Organized static assets
│       ├── images/
│       │   ├── brand/            # Logo, branding
│       │   ├── animals/          # Animal photos
│       │   │   └── stories/      # Success story images
│       │   ├── team/             # Team member photos
│       │   │   ├── founder/
│       │   │   ├── core/
│       │   │   └── interns/
│       │   ├── campaigns/        # Campaign images
│       │   └── gallery/          # General gallery
│       └── videos/               # Video assets
│
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (public)/            # Public pages (no auth required)
│   │   │   ├── page.tsx         # Home page
│   │   │   ├── about/
│   │   │   ├── campaigns/
│   │   │   ├── stories/
│   │   │   ├── volunteers/
│   │   │   ├── mission/
│   │   │   ├── resources/
│   │   │   ├── donate/
│   │   │   ├── membership/
│   │   │   ├── store/
│   │   │   └── blogs/
│   │   │
│   │   ├── (auth)/              # Authentication pages
│   │   │   ├── login/
│   │   │   └── signup/
│   │   │
│   │   ├── (dashboard)/         # Protected dashboard routes
│   │   │   ├── admin/           # Admin dashboard
│   │   │   │   ├── layout.tsx   # Admin layout with auth check
│   │   │   │   ├── dashboard/
│   │   │   │   ├── products/
│   │   │   │   ├── orders/
│   │   │   │   ├── donations/
│   │   │   │   ├── campaigns/
│   │   │   │   ├── volunteers/
│   │   │   │   ├── blogs/
│   │   │   │   ├── adoptions/
│   │   │   │   ├── rescue-cases/
│   │   │   │   ├── memberships/
│   │   │   │   ├── analytics/
│   │   │   │   └── settings/
│   │   │   │
│   │   │   ├── volunteer/       # Volunteer dashboard
│   │   │   │   ├── layout.tsx   # Volunteer layout with auth check
│   │   │   │   ├── dashboard/
│   │   │   │   ├── alerts/
│   │   │   │   ├── campaigns/
│   │   │   │   ├── activity/
│   │   │   │   └── profile/
│   │   │   │
│   │   │   └── user/            # User dashboard
│   │   │       ├── layout.tsx   # User layout with auth check
│   │   │       └── dashboard/
│   │   │
│   │   ├── api/                 # API routes
│   │   │   ├── auth/            # Authentication endpoints
│   │   │   │   ├── login/
│   │   │   │   └── signup/
│   │   │   ├── products/
│   │   │   ├── orders/
│   │   │   ├── donations/
│   │   │   ├── campaigns/
│   │   │   ├── volunteers/
│   │   │   ├── blogs/
│   │   │   ├── adoptions/
│   │   │   ├── rescue-cases/
│   │   │   ├── memberships/
│   │   │   ├── razorpay/
│   │   │   │   ├── create-order/
│   │   │   │   └── verify-payment/
│   │   │   └── send-email/
│   │   │
│   │   ├── layout.tsx           # Root layout
│   │   └── globals.css          # Global styles
│   │
│   ├── components/              # React components
│   │   ├── layout/              # Layout components
│   │   │   ├── Navbar.tsx
│   │   │   └── SiteFooter.tsx
│   │   │
│   │   ├── sections/            # Page sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── StatsSection.tsx
│   │   │   ├── TeamSection.tsx
│   │   │   ├── PastCampaignsSection.tsx
│   │   │   └── ...
│   │   │
│   │   ├── admin/               # Admin-specific components
│   │   │   ├── Sidebar.tsx
│   │   │   └── TopNav.tsx
│   │   │
│   │   ├── volunteer/           # Volunteer-specific components
│   │   │   ├── VolunteerSidebar.tsx
│   │   │   └── VolunteerTopNav.tsx
│   │   │
│   │   └── shared/              # Reusable components
│   │       ├── DonationModal.tsx
│   │       ├── WhatsAppButton.tsx
│   │       └── ...
│   │
│   ├── contexts/                # React Context providers
│   │   ├── AuthContext.tsx      # Authentication state
│   │   └── CartContext.tsx      # Shopping cart state
│   │
│   ├── lib/                     # Utility libraries
│   │   ├── mongodb.ts           # MongoDB connection
│   │   ├── config.ts            # App configuration
│   │   ├── constants.ts         # Constants and enums
│   │   └── utils/               # Utility functions
│   │       └── helpers.ts       # Helper functions
│   │
│   ├── types/                   # TypeScript type definitions
│   │   └── index.ts             # Shared types
│   │
│   └── hooks/                   # Custom React hooks
│       └── (custom hooks)
│
├── .env.local                   # Environment variables (not in git)
├── .env.example                 # Environment template
├── .gitignore                   # Git ignore rules
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies and scripts
├── README.md                    # Project documentation
└── ARCHITECTURE.md              # This file
```

## Key Design Patterns

### 1. Route Groups
- `(public)`: Public pages accessible without authentication
- `(auth)`: Authentication pages (login, signup)
- `(dashboard)`: Protected dashboard routes with role-based access

### 2. Layout Hierarchy
```
Root Layout (app/layout.tsx)
├── AuthProvider
├── CartProvider
└── Navbar + Footer

Admin Layout (app/admin/layout.tsx)
└── Auth check + Admin role verification

Volunteer Layout (app/volunteer/layout.tsx)
└── Auth check + Volunteer role verification

User Layout (app/user/layout.tsx)
└── Auth check + User role verification
```

### 3. Authentication Flow
1. User logs in via `/login`
2. Credentials verified against MongoDB
3. JWT token stored in localStorage
4. AuthContext provides user state globally
5. Protected routes check authentication in layout components
6. Unauthorized users redirected to `/login`

### 4. API Route Structure
```
/api/[resource]/route.ts
├── GET: Fetch resources
├── POST: Create resource
├── PUT: Update resource
└── DELETE: Delete resource

/api/[resource]/[id]/route.ts
├── GET: Fetch single resource
├── PUT: Update single resource
└── DELETE: Delete single resource
```

### 5. Component Organization
- **Layout Components**: Navbar, Footer, Sidebars
- **Section Components**: Reusable page sections
- **Feature Components**: Admin, Volunteer specific
- **Shared Components**: Modals, Buttons, Forms

### 6. State Management
- **Global State**: React Context (Auth, Cart)
- **Server State**: API routes with MongoDB
- **Local State**: React useState for component state
- **Persistent State**: localStorage for cart and auth

## Data Flow

### 1. Client-Side Flow
```
User Action → Component → Context/State → UI Update
```

### 2. Server-Side Flow
```
API Request → Route Handler → MongoDB → Response → Client
```

### 3. Authentication Flow
```
Login Form → /api/auth/login → Verify Credentials → Generate JWT → Store in Context → Redirect to Dashboard
```

### 4. Payment Flow
```
Checkout → Create Razorpay Order → Payment Gateway → Verify Payment → Update Order Status → Send Confirmation
```

## Security Measures

### 1. Authentication
- JWT tokens for session management
- Password hashing with bcrypt
- Role-based access control (RBAC)

### 2. Authorization
- Layout-level route protection
- API route authentication checks
- Role verification for admin/volunteer routes

### 3. Data Validation
- Input validation on client and server
- Type safety with TypeScript
- MongoDB schema validation

### 4. Environment Security
- Sensitive data in environment variables
- .env files excluded from git
- Separate configs for dev/prod

## Performance Optimizations

### 1. Image Optimization
- Next.js Image component for automatic optimization
- Organized asset structure for efficient loading
- Lazy loading for images

### 2. Code Splitting
- Automatic code splitting with Next.js
- Dynamic imports for heavy components
- Route-based code splitting

### 3. Caching
- Static page generation where possible
- API response caching
- Browser caching for assets

### 4. Database
- MongoDB indexes for faster queries
- Connection pooling
- Efficient query patterns

## Deployment Considerations

### 1. Environment Variables
- All sensitive data in environment variables
- Separate configs for staging/production
- Validation of required variables

### 2. Build Process
```bash
npm run build    # Production build
npm start        # Start production server
```

### 3. Hosting Recommendations
- **Vercel**: Optimal for Next.js (recommended)
- **Netlify**: Alternative with good Next.js support
- **AWS/GCP**: For custom infrastructure needs

### 4. Database
- MongoDB Atlas for managed database
- Backup strategy in place
- Connection string security

## Monitoring & Maintenance

### 1. Error Tracking
- Console logging in development
- Error boundaries for React components
- API error responses with proper status codes

### 2. Performance Monitoring
- Next.js built-in analytics
- Lighthouse scores
- Core Web Vitals tracking

### 3. Updates
- Regular dependency updates
- Security patch monitoring
- Feature flag system for gradual rollouts

## Future Enhancements

### Planned Features
- [ ] Real-time notifications with WebSockets
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Advanced search and filtering
- [ ] Social media integration
- [ ] Automated email campaigns
- [ ] Volunteer scheduling system
- [ ] Inventory management
- [ ] Reporting and exports

### Technical Improvements
- [ ] Unit and integration tests
- [ ] E2E testing with Playwright
- [ ] CI/CD pipeline
- [ ] Docker containerization
- [ ] Redis caching layer
- [ ] GraphQL API option
- [ ] Microservices architecture
- [ ] Progressive Web App (PWA)

## Contributing

When contributing to this project:
1. Follow the existing folder structure
2. Use TypeScript for type safety
3. Follow naming conventions
4. Add comments for complex logic
5. Update documentation for new features
6. Test thoroughly before submitting PR

## Support

For questions about the architecture:
- Review this document
- Check the README.md
- Open an issue on GitHub
- Contact the development team

---

Last Updated: April 2026
