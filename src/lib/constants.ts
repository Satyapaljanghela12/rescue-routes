// Asset Paths
export const ASSETS = {
  BRAND: {
    LOGO: "/assets/images/brand/logo.png",
    HINDI: "/assets/images/brand/hindi.png",
    PAW_PRINT: "/assets/images/brand/paw-print.png",
  },
  ANIMALS: {
    DOG1: "/assets/images/animals/dog1.png",
    DOG2: "/assets/images/animals/dog2.png",
    STORIES: {
      SHAMPOO: "/assets/images/animals/stories/shampoo.png",
      MITHI: "/assets/images/animals/stories/mithi.png",
      LADOO: "/assets/images/animals/stories/ladoo.png",
      MILKY: "/assets/images/animals/stories/milky.png",
      DAMRU: "/assets/images/animals/stories/damru.png",
      SAMBHAR: "/assets/images/animals/stories/sambhar.png",
      KISMIS: "/assets/images/animals/stories/kismis.png",
      SONA: "/assets/images/animals/stories/sona.png",
      STORY1: "/assets/images/animals/stories/story1.jpg",
    },
  },
  TEAM: {
    FOUNDER: {
      SNEHA: "/assets/images/team/founder/sneha.png",
    },
    CORE: {
      KAUSHIKI: "/assets/images/team/core/kaushiki.jpeg",
      SARVANG: "/assets/images/team/core/sarvang.jpeg",
      VINAYAK: "/assets/images/team/core/vinayak.jpeg",
      SURYANSHA: "/assets/images/team/core/suryansha.jpeg",
    },
    INTERNS: {
      ANANT: "/assets/images/team/interns/anant.jpeg",
      ARYAN: "/assets/images/team/interns/aryan.jpeg",
      HARSHVARDHAN: "/assets/images/team/interns/harshvardhan.jpeg",
      VAIBHAVI: "/assets/images/team/interns/vaibhavi.jpeg",
    },
  },
  CAMPAIGNS: {
    DEC_27_28: "/assets/images/campaigns/27-28dec.jpg",
    WINTER_BED_DRIVE: "/assets/images/campaigns/winter-bed-drive.jpg",
    WATER_POT_DRIVE: "/assets/images/campaigns/water-pot-drive.jpg",
    YEAR_END: "/assets/images/campaigns/year-end.jpg",
    ANNUAL_BED_DRIVE: "/assets/images/campaigns/annual-bed-drive.jpg",
    ADOPTION_DRIVE: "/assets/images/campaigns/adoption-drive.jpg",
    ADOPTION_OLIVERS: "/assets/images/campaigns/adoption-olivers.jpg",
    FOUNDATION_BED: "/assets/images/campaigns/foundation-bed.jpg",
  },
  GALLERY: {
    VOLUNTEER_CARE: "/assets/images/gallery/volunteer-care.jpg",
    RESCUED_DOG: "/assets/images/gallery/rescued-dog.jpg",
    SHELTER_CARE: "/assets/images/gallery/shelter-care.jpeg",
    ANIMALS_SHELTER: "/assets/images/gallery/animals-shelter.jpeg",
    POPULATION_CONTROL: "/assets/images/gallery/population-control.jpg",
    VOLUNTEERS_BG: "/assets/images/gallery/volunteers-bg.jpeg",
    STORIES_BG: "/assets/images/gallery/stories-bg.jpeg",
  },
  VIDEOS: {
    HERO: "/assets/videos/hero.mp4",
  },
} as const;

// App Routes
export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  CAMPAIGNS: "/campaigns",
  STORIES: "/stories",
  VOLUNTEERS: "/volunteers",
  MISSION: "/mission",
  RESOURCES: "/resources",
  DONATE: "/donate",
  MEMBERSHIP: "/membership",
  STORE: "/store",
  BLOGS: "/blogs",
  LOGIN: "/login",
  SIGNUP: "/signup",
  CHECKOUT: "/checkout",
  MY_ORDERS: "/my-orders",
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    PRODUCTS: "/admin/products",
    ORDERS: "/admin/orders",
    DONATIONS: "/admin/donations",
    CAMPAIGNS: "/admin/campaigns",
    VOLUNTEERS: "/admin/volunteers",
    BLOGS: "/admin/blogs",
    ADOPTIONS: "/admin/adoptions",
    ADOPTION_APPLICATIONS: "/admin/adoption-applications",
    RESCUE_CASES: "/admin/rescue-cases",
    ALERTS: "/admin/alerts",
    MEMBERSHIPS: "/admin/memberships",
    CAMPAIGN_REQUESTS: "/admin/campaign-requests",
    ANALYTICS: "/admin/analytics",
    SETTINGS: "/admin/settings",
  },
  VOLUNTEER: {
    DASHBOARD: "/volunteer/dashboard",
    ALERTS: "/volunteer/alerts",
    CAMPAIGNS: "/volunteer/campaigns",
    ACTIVITY: "/volunteer/activity",
    PROFILE: "/volunteer/profile",
  },
  USER: {
    DASHBOARD: "/user/dashboard",
  },
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    SIGNUP: "/api/auth/signup",
  },
  PRODUCTS: "/api/products",
  ORDERS: "/api/orders",
  DONATIONS: "/api/donations",
  CAMPAIGNS: "/api/campaigns",
  CAMPAIGN_REQUESTS: "/api/campaign-requests",
  VOLUNTEERS: "/api/volunteers",
  BLOGS: "/api/blogs",
  ADOPTIONS: "/api/adoptions",
  ADOPTION_APPLICATIONS: "/api/adoption-applications",
  RESCUE_CASES: "/api/rescue-cases",
  RESCUE_ALERTS: "/api/rescue-alerts",
  MEMBERSHIPS: "/api/memberships",
  RAZORPAY: {
    CREATE_ORDER: "/api/razorpay/create-order",
    VERIFY_PAYMENT: "/api/razorpay/verify-payment",
  },
  SEND_EMAIL: "/api/send-email",
} as const;

// User Roles
export const USER_ROLES = {
  ADMIN: "admin",
  VOLUNTEER: "volunteer",
  USER: "user",
} as const;

// Order Status
export const ORDER_STATUS = {
  PENDING: "pending",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
} as const;

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: "pending",
  COMPLETED: "completed",
  FAILED: "failed",
} as const;

// Payment Methods
export const PAYMENT_METHODS = {
  RAZORPAY: "razorpay",
  COD: "cod",
} as const;

// Campaign Status
export const CAMPAIGN_STATUS = {
  UPCOMING: "upcoming",
  ACTIVE: "active",
  COMPLETED: "completed",
} as const;

// Rescue Case Urgency
export const RESCUE_URGENCY = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  CRITICAL: "critical",
} as const;

// Rescue Case Status
export const RESCUE_STATUS = {
  PENDING: "pending",
  IN_PROGRESS: "in-progress",
  RESOLVED: "resolved",
  CLOSED: "closed",
} as const;

// Volunteer Status
export const VOLUNTEER_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
} as const;

// Membership Types
export const MEMBERSHIP_TYPES = {
  MONTHLY: "monthly",
  YEARLY: "yearly",
  LIFETIME: "lifetime",
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  USER: "user",
  CART: "cart",
  AUTH_TOKEN: "authToken",
} as const;

// Validation Rules
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[6-9]\d{9}$/,
  PAN_REGEX: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
  PINCODE_REGEX: /^[1-9][0-9]{5}$/,
  MIN_PASSWORD_LENGTH: 6,
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
} as const;

// Pagination Defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

// Contact Information
export const CONTACT = {
  EMAIL: "rescueroutes@gmail.com",
  PHONE: "+91 98765 43210",
  ADDRESS: "Bhopal, Madhya Pradesh",
  WHATSAPP: "+91 98765 43210",
} as const;

// Social Media Links
export const SOCIAL_MEDIA = {
  FACEBOOK: "https://facebook.com/rescueroutes",
  INSTAGRAM: "https://instagram.com/rescueroutes",
  TWITTER: "https://twitter.com/rescueroutes",
  LINKEDIN: "https://linkedin.com/company/rescueroutes",
} as const;
