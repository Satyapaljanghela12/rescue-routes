// User Types
export interface User {
  _id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  role?: "admin" | "volunteer" | "user";
  phone?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Product Types
export interface ProductMedia {
  type: "image" | "video";
  url: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  sizes?: string[];
  image?: string; // Legacy support
  media?: ProductMedia[];
  stock?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
}

// Order Types
export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  size?: string;
}

export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: "razorpay" | "cod";
  paymentStatus: "pending" | "completed" | "failed";
  orderStatus: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Campaign Types
export interface Campaign {
  _id: string;
  title: string;
  description: string;
  image?: string;
  startDate: Date;
  endDate: Date;
  status: "upcoming" | "active" | "completed";
  targetAmount?: number;
  raisedAmount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Donation Types
export interface Donation {
  _id: string;
  userId?: string;
  amount: number;
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  message?: string;
  paymentMethod: "razorpay" | "other";
  paymentStatus: "pending" | "completed" | "failed";
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  createdAt?: Date;
}

// Volunteer Types
export interface Volunteer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  skills?: string[];
  availability?: string;
  status: "pending" | "approved" | "rejected";
  createdAt?: Date;
  updatedAt?: Date;
}

// Blog Types
export interface Blog {
  _id: string;
  title: string;
  content: string;
  excerpt?: string;
  author: string;
  image?: string;
  tags?: string[];
  published: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Adoption Types
export interface AdoptionApplication {
  _id: string;
  userId?: string;
  animalId: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  address: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  createdAt?: Date;
  updatedAt?: Date;
}

// Rescue Case Types
export interface RescueCase {
  _id: string;
  reporterName: string;
  reporterPhone: string;
  reporterEmail?: string;
  location: string;
  description: string;
  animalType?: string;
  urgency: "low" | "medium" | "high" | "critical";
  status: "pending" | "in-progress" | "resolved" | "closed";
  assignedTo?: string;
  images?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Membership Types
export interface Membership {
  _id: string;
  userId?: string;
  memberName: string;
  memberEmail: string;
  memberPhone: string;
  membershipType: "monthly" | "yearly" | "lifetime";
  amount: number;
  paymentStatus: "pending" | "completed" | "failed";
  startDate: Date;
  endDate?: Date;
  panCard?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Pagination Types
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}
