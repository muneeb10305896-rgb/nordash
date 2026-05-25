# Adding Farheen's Projects to Portfolio

The following 4 professional projects from Farheen's experience should be added to the portfolio section:

## Project 1: Social Media Marketing Strategy & Campaign Management
```json
{
  "title": "Social Media Marketing Strategy & Campaign Management",
  "slug": "oktopus-group-social-media",
  "description": "Comprehensive social media marketing strategy development and execution across multiple platforms. Managed day-to-day social media channels (LinkedIn, Facebook, Twitter, Instagram, YouTube), developed data-driven media plans, monitored ad campaigns, and optimized spending allocation.",
  "category": "digital-marketing",
  "client": "Oktopus Group",
  "technologies": ["Facebook Ads", "Instagram Marketing", "LinkedIn Strategy", "YouTube", "Data Analytics", "CRM Tools"],
  "results": {
    "metric": "Campaign Optimization",
    "value": "Improved ad spend efficiency and audience targeting across all channels"
  },
  "featured": true,
  "status": "completed"
}
```

## Project 2: Agency Partnership & Marketing Strategy Development
```json
{
  "title": "Agency Partnership & Marketing Strategy Development",
  "slug": "hovertise-agency-partnerships",
  "description": "Led strategic partnerships with local advertising agencies and developed comprehensive marketing initiatives. Onboarded new agency partners, established positioning and marketing strategies, managed relationship communications, and provided creative direction for advertising campaigns.",
  "category": "digital-marketing",
  "client": "Hovertise",
  "technologies": ["Strategic Planning", "Market Analysis", "Creative Direction", "Partnership Management"],
  "results": {
    "metric": "Partnership Success",
    "value": "Successfully managed multiple agency partnerships"
  },
  "featured": true,
  "status": "completed"
}
```

## Project 3: Social Media Content Marketing for International Outreach
```json
{
  "title": "Social Media Content Marketing for International Outreach",
  "slug": "uef-social-media-content",
  "description": "Designed and produced English-language social media content for TikTok and Instagram to promote University of Eastern Finland. Created short-form videos and reels targeting international students. Achieved 49.9% engagement growth, 31.6% reach increase, and 420K+ views.",
  "category": "digital-marketing",
  "client": "University of Eastern Finland",
  "technologies": ["TikTok", "Instagram", "Video Production", "Content Creation", "Audience Growth"],
  "results": {
    "metric": "Content Performance",
    "value": "49.9% engagement growth, 31.6% reach increase, 420K+ views"
  },
  "featured": true,
  "status": "completed"
}
```

## Project 4: TikTok Advertising Campaign Management & Optimization
```json
{
  "title": "TikTok Advertising Campaign Management & Optimization",
  "slug": "fonezone-tiktok-ads",
  "description": "Planned and executed TikTok advertising campaigns with strategic targeting and audience segmentation. Conducted A/B testing, managed advertising budgets, and prepared detailed performance reports with actionable insights for maximum ROI.",
  "category": "digital-marketing",
  "client": "FoneZone.Ae",
  "technologies": ["TikTok Ads Manager", "Campaign Planning", "A/B Testing", "Budget Optimization", "Analytics"],
  "results": {
    "metric": "Campaign Performance",
    "value": "Optimized ad delivery and audience targeting"
  },
  "featured": true,
  "status": "completed"
}
```

## How to Add These Projects

### Option 1: Using MongoDB Atlas (Recommended)
1. Go to https://cloud.mongodb.com/
2. Connect to your database
3. Navigate to your `projects` collection
4. Click "Insert Document"
5. Paste each JSON object above (remove the outer triple backticks)
6. Click Insert

### Option 2: Using the API
If your server is running locally:
```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{...paste json here...}'
```

### Option 3: Using the Seed Script
```bash
npm install
node scripts/seed-farheen-projects.js
```
(Make sure MongoDB URI is in .env.local)
