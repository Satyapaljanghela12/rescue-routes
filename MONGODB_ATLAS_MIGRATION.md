# MongoDB Atlas Migration Guide

This guide will help you migrate from MongoDB Compass (local) to MongoDB Atlas (cloud).

## Why Migrate to Atlas?

- ✅ Cloud-hosted (accessible from anywhere)
- ✅ Automatic backups
- ✅ Better security
- ✅ Free tier available (512MB storage)
- ✅ No need to run MongoDB locally
- ✅ Easy to deploy to production

---

## Step-by-Step Migration Process

### 1. Create MongoDB Atlas Account

1. Visit [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Sign up with your email or Google account
3. Verify your email address

### 2. Create a Free Cluster

1. After logging in, click **"Build a Database"**
2. Choose **"M0 FREE"** tier (512MB storage, free forever)
3. Select your cloud provider:
   - AWS (recommended)
   - Google Cloud
   - Azure
4. Choose a region closest to your location (e.g., Mumbai for India)
5. Name your cluster (default: "Cluster0")
6. Click **"Create"** (takes 3-5 minutes)

### 3. Create Database User

1. In the left sidebar, click **"Database Access"**
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication method
4. Enter:
   - Username: `rescue-routes-admin` (or your choice)
   - Password: Generate a strong password (SAVE THIS!)
5. Database User Privileges: Select **"Read and write to any database"**
6. Click **"Add User"**

**⚠️ IMPORTANT:** Save your username and password securely!

### 4. Configure Network Access

1. In the left sidebar, click **"Network Access"**
2. Click **"Add IP Address"**
3. For development:
   - Click **"Allow Access from Anywhere"**
   - This adds `0.0.0.0/0` (all IPs)
4. For production:
   - Add only your server's IP address
5. Click **"Confirm"**

### 5. Get Your Connection String

1. Go to **"Database"** in the left sidebar
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Select:
   - Driver: **Node.js**
   - Version: **5.5 or later**
5. Copy the connection string (looks like this):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### 6. Update Your .env.local File

1. Open `.env.local` in your project
2. Replace the `MONGODB_URI` value with your Atlas connection string
3. Replace `<username>` with your database username
4. Replace `<password>` with your database password
5. Add `/rescue-routes` after `.net/` to specify the database name

**Example:**
```env
MONGODB_URI=mongodb+srv://rescue-routes-admin:MySecurePassword123@cluster0.abc123.mongodb.net/rescue-routes?retryWrites=true&w=majority
```

**⚠️ Make sure to:**
- Remove `<` and `>` brackets
- Add the database name `/rescue-routes` after `.net/`
- Keep `?retryWrites=true&w=majority` at the end

### 7. Migrate Your Existing Data (Optional)

If you have existing data in MongoDB Compass that you want to migrate:

#### Option A: Using MongoDB Compass (Easiest)

1. Open MongoDB Compass
2. Connect to your local database (`mongodb://localhost:27017`)
3. For each collection:
   - Click on the collection
   - Click **"Export Collection"**
   - Choose **JSON** format
   - Save the file
4. Connect to your Atlas cluster in Compass:
   - Use your Atlas connection string
5. For each collection:
   - Create the collection
   - Click **"Import Data"**
   - Select your exported JSON file

#### Option B: Using mongodump/mongorestore (Command Line)

```bash
# Export from local MongoDB
mongodump --uri="mongodb://localhost:27017/rescue-routes" --out=./backup

# Import to Atlas
mongorestore --uri="mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/rescue-routes" ./backup/rescue-routes
```

### 8. Test Your Connection

1. Stop your Next.js development server (Ctrl+C)
2. Start it again:
   ```bash
   npm run dev
   ```
3. Check the console for any connection errors
4. Try accessing your application
5. Test creating/reading data (e.g., create a volunteer, place an order)

### 9. Verify in Atlas Dashboard

1. Go to your Atlas dashboard
2. Click **"Browse Collections"** on your cluster
3. You should see your database `rescue-routes` with all collections:
   - users
   - volunteers
   - campaigns
   - donations
   - memberships
   - products
   - orders
   - etc.

---

## Troubleshooting

### Connection Error: "Authentication failed"
- Double-check your username and password
- Make sure you removed `<` and `>` brackets
- Verify the user has correct permissions

### Connection Error: "IP not whitelisted"
- Go to Network Access in Atlas
- Add your current IP or use 0.0.0.0/0 for development

### Connection Error: "ENOTFOUND"
- Check your internet connection
- Verify the connection string is correct
- Make sure the cluster is running (not paused)

### Data Not Showing Up
- Verify the database name in the connection string (`/rescue-routes`)
- Check if collections exist in Atlas dashboard
- Ensure data was migrated correctly

---

## Security Best Practices

### For Development:
- ✅ Use environment variables (`.env.local`)
- ✅ Never commit `.env.local` to Git
- ✅ Use "Allow Access from Anywhere" for convenience

### For Production:
- ✅ Use strong passwords (20+ characters)
- ✅ Whitelist only your server's IP address
- ✅ Enable MongoDB Atlas encryption
- ✅ Set up automatic backups
- ✅ Use separate database users for different environments
- ✅ Rotate passwords regularly

---

## Benefits After Migration

✅ **No Local MongoDB Required**: Your database is in the cloud
✅ **Access from Anywhere**: Work from any computer
✅ **Automatic Backups**: Atlas backs up your data automatically
✅ **Better Performance**: Atlas uses optimized infrastructure
✅ **Easy Scaling**: Upgrade your cluster as you grow
✅ **Production Ready**: Same setup for development and production

---

## Next Steps

1. ✅ Complete the migration
2. ✅ Test all features of your application
3. ✅ Set up automatic backups in Atlas
4. ✅ Monitor your database usage in Atlas dashboard
5. ✅ Consider upgrading to a paid tier when you need more storage

---

## Support

- MongoDB Atlas Documentation: [https://docs.atlas.mongodb.com/](https://docs.atlas.mongodb.com/)
- MongoDB University (Free Courses): [https://university.mongodb.com/](https://university.mongodb.com/)
- Community Forums: [https://www.mongodb.com/community/forums/](https://www.mongodb.com/community/forums/)

---

**Need Help?** If you encounter any issues during migration, check the troubleshooting section above or refer to the MongoDB Atlas documentation.
