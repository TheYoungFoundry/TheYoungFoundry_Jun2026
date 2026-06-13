# Deployment Guide: The Young Foundry

Complete step-by-step guide to deploy The Young Foundry to Vercel with Supabase.

## Prerequisites

- GitHub account with the repository
- Supabase account (free tier available)
- Vercel account (free tier available)
- Node.js 18+ installed locally

## Phase 1: Supabase Setup (5-10 minutes)

### 1.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign in or create account
3. Click "New Project"
4. Choose your organization
5. Configure:
   - **Project Name**: `the-young-foundry`
   - **Database Password**: Create strong password (save this!)
   - **Region**: Choose closest to your users
6. Wait for project initialization (2-3 minutes)

### 1.2 Get API Keys

1. In your Supabase project, click "Settings" > "API"
2. Copy the following from "Project API keys" section:
   - **URL**: `https://[project-id].supabase.co`
   - **Anon Public Key**: starts with `eyJ...`
3. Keep these safe - you'll need them for Vercel

### 1.3 Initialize Database

1. Go to "SQL Editor" in Supabase dashboard
2. Click "New Query"
3. Copy the entire content of `supabase/migrations/001_init.sql`
4. Paste into SQL editor
5. Click "Run"
6. Wait for completion (should show success message)
7. Verify in "Table Editor" - you should see 5 new tables:
   - user_profiles
   - story_journal
   - creative_writings
   - word_progress
   - story_performance

### 1.4 Verify Database Setup

1. Click "Table Editor"
2. Select each table and verify structure:
   - All tables should have their columns
   - Indexes should be created
   - Foreign keys should be in place

**✅ Supabase is ready!**

## Phase 2: Local Testing (5-10 minutes)

### 2.1 Environment Setup

1. In project root, create `.env.local`:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://[your-project-id].supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
   ```

2. Replace with actual values from Supabase

### 2.2 Install & Run Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### 2.3 Test Features

1. Click "Start Learning Stories"
2. Select:
   - Child name
   - Story theme
   - Hero character
   - Story length
3. Click "Generate Story"
4. Read the story
5. Complete comprehension quiz
6. Verify all interactive features work

**✅ Local testing complete!**

## Phase 3: GitHub Setup (2-5 minutes)

### 3.1 Commit to GitHub

```bash
# Stage all changes
git add .

# Commit
git commit -m "chore: migrate to React + Supabase + Vercel

- Rewrite codebase to modern React/Next.js
- Integrate Supabase for data persistence
- Configure for Vercel deployment
- Add TypeScript support
- Implement Zustand for state management"

# Push to your branch
git push origin claude/nifty-hawking-84vja7
```

### 3.2 Create Main Branch

```bash
# Switch to main
git checkout main

# Merge feature branch (or create PR for review)
git merge claude/nifty-hawking-84vja7

# Push to GitHub
git push origin main
```

**✅ Code is on GitHub!**

## Phase 4: Vercel Deployment (5-10 minutes)

### 4.1 Connect Vercel to GitHub

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select "Import from Git"
4. Authorize Vercel with GitHub
5. Find and select `theyoungfoundry/TheYoungFoundry_Jun2026`

### 4.2 Configure Project

1. Framework Preset should auto-detect "Next.js"
2. Root Directory: `.` (or `./`)
3. Environment Variables:
   - Click "Add Environment Variable"
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: (paste from Supabase)
   - Click "Add another"
   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: (paste from Supabase)
4. Click "Deploy"

### 4.3 Monitor Deployment

1. Watch build logs in real-time
2. Should take 2-5 minutes
3. Look for "✓ Built successfully"
4. Check for any errors (rare with Next.js)

### 4.4 Verify Deployment

1. Click "Visit" button when deployment completes
2. Test the application:
   - Home page loads
   - Can generate a story
   - Can read story
   - Quizzes work
   - No console errors

**✅ Deployment complete!**

## Phase 5: Post-Deployment Setup (5-10 minutes)

### 5.1 Configure Custom Domain (Optional)

1. In Vercel project settings
2. Click "Domains"
3. Add your domain (e.g., `theyoungfoundry.com`)
4. Follow DNS setup instructions
5. Wait for DNS propagation (24 hours)

### 5.2 Enable Analytics (Optional)

1. In Vercel project settings
2. Click "Analytics"
3. Enable Web Analytics to track usage

### 5.3 Set Up Deployment Hooks (Optional)

1. For GitHub Actions CI/CD:
   - Create `.github/workflows/deploy.yml`
   - Configure automatic deployments on push

### 5.4 Enable Preview Deployments

1. In Vercel project settings
2. Enable "Preview Deployments for Pull Requests"
3. Each PR will get a preview URL

**✅ Post-deployment setup complete!**

## Phase 6: Monitoring & Maintenance

### 6.1 Regular Tasks

Weekly:
- Check Vercel analytics
- Review error logs
- Monitor Supabase usage

Monthly:
- Backup Supabase data
- Check for security updates
- Review performance metrics

### 6.2 Database Backups

1. In Supabase dashboard
2. Click "Settings" > "Backups"
3. Configure automatic backups
4. Download backups weekly:
   - Settings > Database > Backups > Download

### 6.3 Update Dependencies

```bash
# Check for updates
npm outdated

# Update safe packages
npm update

# Major version updates (test carefully)
npm install next@latest react@latest

# Commit and push
git add package*.json
git commit -m "chore: update dependencies"
git push
```

## Troubleshooting

### Build Fails with "Module not found"

```bash
# Clear cache and reinstall
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### Supabase Connection Error

1. Verify environment variables in Vercel:
   - Project Settings > Environment Variables
   - Check values match exactly (no extra spaces)
2. Check Supabase project status
3. Verify RLS policies if configured

### Database Queries Return Empty

1. Check Row Level Security (RLS) policies
2. Verify table permissions:
   - In Supabase, disable RLS temporarily for testing
   - Check data exists in tables
   - Re-enable RLS with proper policies

### High Server Load or Slow Response

1. Check Vercel analytics
2. Optimize Supabase queries
3. Enable caching in Next.js
4. Add CDN for static assets

## Production Checklist

Before going live:

- [ ] Supabase database fully initialized
- [ ] All environment variables set in Vercel
- [ ] Local testing completed
- [ ] Code pushed to main branch
- [ ] Vercel deployment successful
- [ ] Application tested on Vercel URL
- [ ] Custom domain configured (if applicable)
- [ ] Monitoring enabled
- [ ] Backup strategy in place
- [ ] Error tracking configured

## Deployment Commands Reference

```bash
# Build for production
npm run build

# Start production server
npm start

# Test build locally
npm run build && npm start

# Deploy to Vercel (CLI)
vercel --prod

# Check Vercel deployment status
vercel list

# View Vercel logs
vercel logs
```

## URLs to Remember

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Supabase Dashboard**: https://app.supabase.com
- **GitHub Repository**: https://github.com/theyoungfoundry/TheYoungFoundry_Jun2026
- **Production App**: [Your Vercel URL]

## Support & Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [React Docs](https://react.dev)

## Timeline Summary

| Phase | Time | Status |
|-------|------|--------|
| Supabase Setup | 5-10 min | ✅ |
| Local Testing | 5-10 min | ✅ |
| GitHub Setup | 2-5 min | ✅ |
| Vercel Deploy | 5-10 min | ✅ |
| Post-Deploy | 5-10 min | ✅ |
| **Total** | **22-45 min** | **✅** |

---

**Congratulations! Your application is now live on Vercel! 🚀**

For questions or issues, check the troubleshooting section or contact support.
