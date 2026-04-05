# 🐾 Rescue Routes

A comprehensive web platform for animal welfare NGO operations, featuring volunteer management, donation processing, campaign coordination, and merchandise sales.

## 🌟 Features

### For Public Users
- 🏠 **Landing Page** with hero section and organization partnerships
- 📖 **Mission & About Pages** showcasing the NGO's work
- 📰 **Success Stories** highlighting rescue operations
- 🎯 **Active Campaigns** with participation options
- 👥 **Volunteer Registration** with admin approval workflow
- 💰 **Donation System** integrated with Razorpay payment gateway
- 🎫 **Membership Plans** (Student, Silver, Golden, Platinum, Lifetime)
- 🛍️ **Merchandise Store** with product catalog and ordering
- 📦 **Order Tracking** with delivery status updates

### For Volunteers
- 📊 **Volunteer Dashboard** with activity tracking
- 🚨 **Rescue Alerts** for emergency cases
- 📋 **Campaign Participation** management
- 👤 **Profile Management**

### For Administrators
- 🎛️ **Admin Dashboard** with analytics
- 👥 **Volunteer Management** (approve/reject applications)
- 💵 **Donation Tracking** with payment details
- 🎯 **Campaign Management** (create, edit, delete)
- 📝 **Campaign Request Approval**
- 🐕 **Adoption Management**
- 🚨 **Rescue Case Tracking**
- 🎫 **Membership Management** with email notifications
- 📦 **Product Management** (add, edit, delete merchandise)
- 🛒 **Order Management** with tracking ID and delivery updates
- 📧 **Email Notifications** for approvals and confirmations

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Database:** MongoDB (Atlas)
- **Payment Gateway:** Razorpay
- **Email:** Nodemailer (Gmail)
- **Authentication:** JWT
- **Icons:** Lucide React

## 📋 Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account
- Razorpay account (for payments)
- Gmail account with App Password (for emails)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/rescue-routes.git
cd rescue-routes
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual credentials:

```env
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/rescue-routes?retryWrites=true&w=majority

# JWT Secret
JWT_SECRET=your-secret-key-here

# Razorpay Keys
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Gmail Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Documentation

- [MongoDB Atlas Migration Guide](./MONGODB_ATLAS_MIGRATION.md)
- [Email Setup Guide](./EMAIL_SETUP_GUIDE.md)
- [GitHub Setup Guide](./GITHUB_SETUP.md)

## 🗂️ Project Structure

```
rescue-routes/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── admin/             # Admin dashboard pages
│   │   ├── volunteer/         # Volunteer dashboard pages
│   │   ├── api/               # API routes
│   │   ├── store/             # Merchandise store
│   │   ├── my-orders/         # Order tracking
│   │   └── ...                # Other public pages
│   ├── components/
│   │   ├── admin/             # Admin components
│   │   ├── volunteer/         # Volunteer components
│   │   ├── layout/            # Layout components (Navbar, Footer)
│   │   └── sections/          # Page sections
│   └── lib/
│       └── mongodb.ts         # MongoDB connection
├── public/                     # Static assets
├── .env.local                 # Environment variables (not in git)
├── .env.example               # Environment template
└── package.json
```

## 🔐 Security Features

- JWT-based authentication
- Password hashing
- Environment variable protection
- Payment verification with Razorpay
- Email verification for sensitive actions
- Admin approval workflow for volunteers
- Secure API routes

## 💳 Payment Integration

The platform uses Razorpay for secure payment processing:
- Donations
- Membership purchases
- Merchandise orders

Both online payment and Cash on Delivery (COD) options are available for merchandise.

## 📧 Email Notifications

Automated emails are sent for:
- Volunteer approval/rejection
- Membership confirmation
- Order confirmations
- Campaign updates

## 🎨 Design System

- **Primary Color:** Orange (#F97316)
- **Fonts:**
  - Headings: PoetsenOne
  - Subheadings: Fredoka One
  - Body: Poppins
- **Theme:** Clean, friendly, and professional

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy!

### Environment Variables for Production

Make sure to add all variables from `.env.local` to your hosting platform's environment settings.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- **Your Name** - Initial work

## 🙏 Acknowledgments

- Animal welfare organizations for inspiration
- Open source community for amazing tools
- All contributors and supporters

## 📞 Support

For support, email your-email@example.com or open an issue in the repository.

---

Made with ❤️ for animal welfare
