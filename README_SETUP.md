# MongoDB Setup Instructions

## Prerequisites
1. Install MongoDB Compass from: https://www.mongodb.com/try/download/compass
2. Install MongoDB Community Server (if not already installed)

## Setup Steps

### 1. Start MongoDB
- Open MongoDB Compass
- Connect to: `mongodb://localhost:27017`

### 2. Create Database
- In MongoDB Compass, create a new database named: `rescue-routes`
- Create a collection named: `users`

### 3. Configure Environment Variables
- The `.env.local` file has been created with default settings
- Update `MONGODB_URI` if your MongoDB is running on a different port or host
- Change `JWT_SECRET` to a secure random string in production

### 4. Test the Setup
1. Start the development server: `npm run dev`
2. Go to: http://localhost:3000/signup
3. Create a test account (select any role)
4. Check MongoDB Compass - you 