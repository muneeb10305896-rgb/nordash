# NORDASH v2.0 - Complete Setup Guide

## 🎯 Overview

Your NORDASH website is now a **complete digital agency platform** with:
- ✅ Portfolio/case studies showcase
- ✅ Team member profiles
- ✅ Service offerings with pricing
- ✅ Job application system
- ✅ Sales lead CRM dashboard
- ✅ Professional admin panel
- ✅ MongoDB database for persistence

---

## 📦 Part 1: Database Setup (MongoDB Atlas)

### Step 1: Create MongoDB Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Sign Up"
3. Create a free account with your email
4. Create your first organization and project

### Step 2: Create Database Cluster
1. Click "Create" next to a project
2. Select **M0 (Free Cluster)** - this is completely free
3. Choose your nearest region
4. Click "Create Cluster"
5. Wait 2-3 minutes for cluster to be created

### Step 3: Create Database User
1. Go to "Database Access" (left sidebar)
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `nordash_admin`
5. Password: Create a strong password (save it!)
6. Database Privileges: "Read and write to any database"
7. Click "Add User"

### Step 4: Add Your IP Address
1. Go to "Network Access" (left sidebar)
2. Click "Add IP Address"
3. Click "Add My Current IP Address"
4. Also add "0.0.0.0/0" for Vercel (production)
5. Click "Confirm"

### Step 5: Get Connection String
1. Go back to "Databases"
2. Click "Connect" on your cluster
3. Choose "Drivers"
4. Copy the connection string
5. Replace `<password>` with your database user password

**Your connection string will look like:**
```
mongodb+srv://nordash_admin:PASSWORD@cluster.mongodb.net/nordash?retryWrites=true&w=majority
```

### Step 6: Add to Environment
1. Open `.env.local` in your project
2. Add this line:
```
MONGODB_URI=mongodb+srv://nordash_admin:PASSWORD@cluster.mongodb.net/nordash?retryWrites=true&w=majority
```
3. Replace `PASSWORD` with your actual database user password
4. Save the file

**IMPORTANT:** Do NOT commit `.env.local` to GitHub. It's already in `.gitignore`.

---

## 🏗️ Part 2: Using the Platform

### Admin Panel URLs
- **Main Admin:** `https://yoursite.com/admin`
- **Job Applications:** Shows at login
- **CRM Dashboard:** `https://yoursite.com/admin/crm`
- **Careers:** `https://yoursite.com` (scroll to Careers section)

### Default Admin Credentials
- Email: `muneeb10305896@gmail.com`
- Password: `nordash2025`

⚠️ **Change this password immediately after first login!**

---

## 📝 Part 3: Adding Content

### Adding Portfolio Projects

**Via API (for testing):**
```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Brand Redesign",
    "slug": "brand-redesign",
    "description": "Complete brand identity redesign for tech startup",
    "category": "branding",
    "client": "TechStartup Inc",
    "imageUrl": "https://example.com/image.jpg",
    "technologies": ["Figma", "Adobe XD", "Branding"],
    "featured": true
  }'
```

**For Production:** Create an admin interface to add projects (future enhancement)

### Adding Services
Each service has:
- Name, slug, description
- Category (development, marketing, design, strategy)
- Features list
- Three pricing tiers (Starter, Professional, Enterprise)
- Deliverables & timeline

### Adding Team Members
- Name, position, bio
- Image URL
- Expertise (array of skills)
- Social links (LinkedIn, Twitter, GitHub)

### Managing Sales Leads (CRM)
1. Go to `/admin/crm`
2. View all leads by status
3. Click on lead to view details
4. Update status using dropdown
5. Track conversion rate

---

## 🔌 Part 4: API Endpoints

### Projects
- `GET /api/projects` - List all projects
- `GET /api/projects?featured=true` - Featured projects only
- `GET /api/projects?category=web-development` - Filter by category
- `GET /api/projects/[id]` - Get single project
- `POST /api/projects` - Create project
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

### Services
- `GET /api/services` - List all services
- `GET /api/services?featured=true` - Featured only
- `POST /api/services` - Create service
- `PUT /api/services/[id]` - Update service
- `DELETE /api/services/[id]` - Delete service

### Team
- `GET /api/team` - List all team members
- `POST /api/team` - Add team member
- `PUT /api/team/[id]` - Update member
- `DELETE /api/team/[id]` - Delete member

### Leads (CRM)
- `GET /api/leads` - List all leads
- `GET /api/leads?status=new` - Filter by status
- `POST /api/leads` - Create lead (from contact form)
- `PUT /api/leads/[id]` - Update lead status
- `DELETE /api/leads/[id]` - Delete lead

### Testimonials
- `GET /api/testimonials` - List approved testimonials
- `GET /api/testimonials?featured=true` - Featured only
- `POST /api/testimonials` - Submit testimonial

---

## 🚀 Part 5: Deployment to Vercel

### Add Environment Variables to Vercel
1. Go to Vercel Dashboard
2. Select your NORDASH project
3. Go to Settings → Environment Variables
4. Add: `MONGODB_URI=mongodb+srv://...`
5. Make sure it's set for all environments (Production, Preview, Development)
6. Redeploy

### Test in Production
1. Push code to GitHub
2. Vercel auto-deploys within 60 seconds
3. Visit your deployed site
4. Try creating a lead/application to test database connection

---

## 🔐 Security Checklist

- [ ] Changed default admin password
- [ ] Added MONGODB_URI to Vercel environment
- [ ] Database user password is strong
- [ ] IP whitelist includes Vercel
- [ ] .env.local is in .gitignore
- [ ] Contact forms validate input
- [ ] Admin pages require authentication

---

## 📊 Next Steps (Future Enhancements)

### Phase 2 (Recommended):
1. **Admin Content Management** - UI to add/edit projects, services, team
2. **Email Automation** - Send follow-up emails to leads
3. **Payment Integration** - Stripe for service packages
4. **Analytics** - Track form submissions, visitor behavior
5. **Blog System** - Content marketing platform

### Phase 3:
1. Client Portal - Project tracking for clients
2. Invoice Generation - Send invoices to clients
3. Team Scheduling - Calendar for team availability
4. Video Uploads - For portfolio projects

---

## 🐛 Troubleshooting

### "Cannot connect to database"
- Check MONGODB_URI in .env.local
- Verify password is correct
- Ensure your IP is whitelisted
- Check cluster is running on MongoDB Atlas

### "Leads/Projects not showing"
- Database might not be connected
- Check browser console for errors
- Verify API endpoints are working: `curl http://localhost:3000/api/leads`

### "Admin login not working"
- Clear browser cache/cookies
- Verify email is registered in database
- Password is case-sensitive

---

## 📞 Support

If you encounter issues:
1. Check console for error messages
2. Verify all environment variables are set
3. Test API endpoints directly
4. Check MongoDB Atlas dashboard for connection logs

---

## ✨ Congratulations!

Your NORDASH agency website is now:
✅ Production-ready
✅ Fully functional CRM
✅ Portfolio showcase
✅ Lead management system
✅ Job application platform
✅ Professional admin panel

**You're ready to start taking clients and building your dream team!**

Nordic Precision. Asian Energy. 🚀
