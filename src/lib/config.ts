/**
 * Application Configuration
 * Centralized configuration management for the application
 */

// Environment check
export const isDevelopment = process.env.NODE_ENV === "development";
export const isProduction = process.env.NODE_ENV === "production";
export const isTest = process.env.NODE_ENV === "test";

// Database Configuration
export const database = {
  uri: process.env.MONGODB_URI || "",
  options: {
    retryWrites: true,
    w: "majority" as const,
  },
};

// Authentication Configuration
export const auth = {
  jwtSecret: process.env.JWT_SECRET || "default-secret-change-in-production",
  jwtExpiresIn: "7d",
  bcryptSaltRounds: 10,
};

// Payment Gateway Configuration
export const razorpay = {
  keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
  keySecret: process.env.RAZORPAY_KEY_SECRET || "",
  currency: "INR",
};

// Email Configuration
export const email = {
  user: process.env.EMAIL_USER || "",
  password: process.env.EMAIL_PASSWORD || process.env.EMAIL_PASS || "",
  from: process.env.EMAIL_USER || "noreply@rescueroutes.com",
  service: "gmail",
};

// Application Configuration
export const app = {
  name: "Rescue Routes",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  description: "A comprehensive platform for animal rescue operations",
  version: "1.0.0",
};

// File Upload Configuration
export const upload = {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedImageTypes: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
  allowedVideoTypes: ["video/mp4", "video/webm"],
};

// Pagination Configuration
export const pagination = {
  defaultPage: 1,
  defaultLimit: 10,
  maxLimit: 100,
};

// Session Configuration
export const session = {
  cookieName: "rescue-routes-session",
  maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
};

// Rate Limiting Configuration
export const rateLimit = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
};

// Feature Flags
export const features = {
  enableDonations: true,
  enableMemberships: true,
  enableStore: true,
  enableVolunteerRegistration: true,
  enableCampaigns: true,
  enableBlogs: true,
  enableAdoptions: true,
  enableRescueCases: true,
};

// Social Media Links
export const socialMedia = {
  facebook: "https://facebook.com/rescueroutes",
  instagram: "https://instagram.com/rescueroutes",
  twitter: "https://twitter.com/rescueroutes",
  linkedin: "https://linkedin.com/company/rescueroutes",
  youtube: "https://youtube.com/@rescueroutes",
};

// Contact Information
export const contact = {
  email: "rescueroutes@gmail.com",
  phone: "+91 98765 43210",
  whatsapp: "+91 98765 43210",
  address: {
    street: "",
    city: "Bhopal",
    state: "Madhya Pradesh",
    country: "India",
    pincode: "",
  },
};

// SEO Configuration
export const seo = {
  defaultTitle: "Rescue Routes - Animal Rescue & Welfare",
  titleTemplate: "%s | Rescue Routes",
  defaultDescription:
    "Join us in our mission to rescue, rehabilitate, and rehome animals in need. Support through donations, volunteering, or adopting.",
  keywords: [
    "animal rescue",
    "animal welfare",
    "pet adoption",
    "volunteer",
    "donate",
    "NGO",
    "Bhopal",
    "India",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: app.url,
    siteName: app.name,
  },
};

// Validate required environment variables
export function validateConfig() {
  const required = {
    MONGODB_URI: database.uri,
    NEXT_PUBLIC_RAZORPAY_KEY_ID: razorpay.keyId,
    RAZORPAY_KEY_SECRET: razorpay.keySecret,
    EMAIL_USER: email.user,
  };

  const missing = Object.entries(required)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0 && isProduction) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }

  return missing.length === 0;
}

// Export all configuration
export default {
  isDevelopment,
  isProduction,
  isTest,
  database,
  auth,
  razorpay,
  email,
  app,
  upload,
  pagination,
  session,
  rateLimit,
  features,
  socialMedia,
  contact,
  seo,
  validateConfig,
};
