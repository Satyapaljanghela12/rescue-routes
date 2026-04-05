# Email Setup Guide - Rescue Routes

## ✅ Email Integration Complete

The system now sends detailed rescue task information to volunteers via email when they accept a task.

## 📧 Email Configuration

### Step 1: Set Up Gmail App Password

1. **Go to your Google Account:**
   - Visit: https://myaccount.google.com/

2. **Enable 2-Step Verification:**
   - Go to Security → 2-Step Verification
   - Follow the steps to enable it

3. **Create App Password:**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Name it "Rescue Routes"
   - Click "Generate"
   - Copy the 16-character password

### Step 2: Update .env.local File

Open `.env.local` and update these values:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-character-app-password
```

**Example:**
```env
EMAIL_USER=rescueroutes@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
```

### Step 3: Restart Development Server

```bash
# Stop the current server (Ctrl+C)
# Start again
npm run dev
```

## 📨 Email Features

### What Gets Sent:

When a volunteer accepts a rescue task, they receive an email with:

1. **Header:** Rescue Routes branding with orange gradient
2. **Greeting:** Personalized with volunteer's name
3. **Alert Details:**
   - Title
   - Animal Type
   - Location (with map pin icon)
   - Description
   - Contact Person & Phone
   - Urgency Level (color-coded badge)
4. **Important Notice:** Reminder to act quickly
5. **Footer:** Rescue Routes branding and copyright

### Email Template Features:

- Professional HTML design
- Responsive layout
- Color-coded urgency badges
- Paw print emoji branding
- Clean, readable formatting
- Mobile-friendly

## 🧪 Testing Email

1. **Create a Rescue Alert** (Admin Dashboard):
   - Go to `/admin/alerts`
   - Click "Create Alert"
   - Fill in details
   - Submit

2. **Accept Task** (Volunteer Dashboard):
   - Login as volunteer
   - Go to `/volunteer/dashboard` or `/volunteer/alerts`
   - Click "Accept Task"
   - Check your email inbox

3. **Verify Email:**
   - Check the volunteer's email inbox
   - Look for "Rescue Task Assignment - Rescue Routes"
   - Verify all details are correct

## 🔧 Troubleshooting

### Email Not Sending?

1. **Check .env.local:**
   - Ensure EMAIL_USER and EMAIL_PASSWORD are set
   - No extra spaces or quotes

2. **Verify App Password:**
   - Must be 16 characters from Google
   - 2-Step Verification must be enabled

3. **Check Console:**
   - Look for error messages in terminal
   - Check browser console for API errors

4. **Gmail Security:**
   - Ensure "Less secure app access" is OFF (use App Password instead)
   - Check if Gmail blocked the sign-in attempt

### Common Issues:

**"Invalid login":**
- Wrong email or app password
- 2-Step Verification not enabled
- Using regular password instead of app password

**"Connection timeout":**
- Firewall blocking port 587
- Network issues

**Email goes to spam:**
- Normal for first few emails
- Mark as "Not Spam" to train Gmail

## 🎨 Email Preview

```
┌─────────────────────────────────────┐
│  🐾 Rescue Routes                   │
│  Task Assignment Confirmation       │
├─────────────────────────────────────┤
│                                     │
│  Hello John Volunteer! 👋           │
│                                     │
│  Thank you for accepting this       │
│  rescue task. Here are the details: │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ 📋 Rescue Alert Details       │ │
│  │                               │ │
│  │ Title: Injured dog reported   │ │
│  │ Animal Type: Dog              │ │
│  │ Location: 📍 Sector 21        │ │
│  │ Description: ...              │ │
│  │ Contact: John - 9876543210    │ │
│  │ Urgency: 🔴 High Priority     │ │
│  └───────────────────────────────┘ │
│                                     │
│  ⚠️ Important: Please reach out     │
│  to the location as soon as         │
│  possible. The animal needs help!   │
│                                     │
│  Best regards,                      │
│  Rescue Routes Team 🐾              │
│                                     │
├─────────────────────────────────────┤
│  © 2026 Rescue Routes               │
└─────────────────────────────────────┘
```

## 🚀 Production Setup

For production, consider using:

1. **SendGrid** (Recommended)
   - More reliable
   - Better deliverability
   - Analytics

2. **AWS SES**
   - Cost-effective
   - Scalable

3. **Mailgun**
   - Developer-friendly
   - Good documentation

## 📝 Notes

- Emails are sent asynchronously (doesn't block the UI)
- Failed emails won't prevent task acceptance
- Email errors are logged in console
- Volunteers still see success modal even if email fails

---

**Status:** ✅ Email Integration Complete
**Dependencies:** ✅ nodemailer installed
**Configuration:** ⚠️ Requires Gmail App Password
