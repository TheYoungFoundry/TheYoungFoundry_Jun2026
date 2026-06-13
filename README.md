# The Young Foundry - React + Supabase + Vercel

A modern interactive Telugu language learning platform for children, built with React, Supabase, and deployed on Vercel.

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Database**: Supabase (PostgreSQL)
- **State Management**: Zustand
- **Deployment**: Vercel
- **Styling**: CSS3 with CSS Variables

## Features

- 🎭 **Interactive Story Generation**: Dynamic story creation based on themes, characters, and grade levels
- 📚 **Grade-Adaptive Content**: Content complexity adjusts based on student grade (1-6)
- 🎮 **Comprehension Quizzes**: Interactive assessments after each story
- 📖 **Story Journal**: Track reading progress and history
- 🎨 **Beautiful UI**: Modern, colorful interface optimized for children
- 🔊 **Text-to-Speech**: Read stories aloud with Web Speech API
- 📊 **Progress Tracking**: Monitor learning metrics and performance

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── TopBar.tsx         # Navigation bar
│   └── story/
│       ├── StorySetup.tsx      # Story configuration
│       ├── StoryReader.tsx      # Story reading interface
│       └── StoryComprehension.tsx # Quiz component
├── data/
│   ├── stories.ts         # Story themes, characters, profiles
│   └── storyTemplates.ts  # Story templates for each theme
├── lib/
│   ├── supabase.ts        # Supabase client & queries
│   └── storyUtils.ts      # Utility functions
├── store/
│   └── storyStore.ts      # Zustand state management
├── styles/
│   └── globals.css        # Global styles
└── types/
    └── index.ts           # TypeScript interfaces
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- A Supabase account
- A Vercel account

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd TheYoungFoundry_Jun2026
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Get your project URL and anonymous key from Settings > API
   - Run the migration SQL from `supabase/migrations/001_init.sql` in your Supabase SQL editor
   - Create `.env.local`:
     ```
     NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
     ```

4. **Run development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

## Deployment to Vercel

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Initial React migration with Supabase"
git push origin claude/nifty-hawking-84vja7
```

### Step 2: Deploy to Vercel

**Option A: Using Vercel CLI**
```bash
npm i -g vercel
vercel
```

**Option B: Using Vercel Dashboard**
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Select the project
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Deploy

### Step 3: Configure Custom Domain (Optional)

In Vercel project settings:
1. Go to Settings > Domains
2. Add your custom domain
3. Follow DNS configuration steps

## Environment Variables

Create `.env.local` for development:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

For Vercel deployment, add these in project settings.

## Database Schema

### user_profiles
- Stores user/child information
- Fields: id, email, child_name, grade, preferred_themes, created_at, updated_at

### story_journal
- Tracks stories read by each user
- Fields: id, user_id, date, title, theme, grade, seconds, words, rating, created_at

### creative_writings
- Stores creative writing submissions
- Fields: id, user_id, story_id, story_title, content, grade, created_at

### word_progress
- Tracks learned words
- Fields: id, user_id, word_telugu, word_english, times_seen, mastered, created_at

### story_performance
- Tracks comprehension scores
- Fields: id, user_id, story_title, theme, questions_total, questions_correct, percentage, created_at

## Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
npm run type-check # TypeScript type checking
```

## Features Implemented

✅ Story Generation Engine
✅ Interactive Story Reader
✅ Comprehension Quizzes
✅ Supabase Integration
✅ Vercel Deployment Ready
✅ Responsive Design
✅ State Management (Zustand)
✅ TypeScript Support

## Future Enhancements

- [ ] User Authentication (Supabase Auth)
- [ ] Leaderboard & Badges
- [ ] Word Games & Flashcards
- [ ] Parent Dashboard
- [ ] Audio Pronunciation Guide
- [ ] Offline Mode (PWA)
- [ ] Multi-language Support

## Story Themes

1. 🌳 **Jungle** - Adventure and sharing
2. 🏫 **School** - Education and hard work
3. 🪔 **Festival** - Celebrations and culture
4. 🌾 **Farm** - Agriculture and nature
5. 🌊 **Sea** - Ocean adventures
6. 🦅 **Sky** - Dreams and aspirations
7. 💝 **Friendship** - Relationships and support
8. 🦁 **Courage** - Bravery and overcoming fears
9. ✨ **Magic** - Imagination and helping others
10. 🏡 **Village** - Community and togetherness

## Grade Levels

- **Grade 1-2**: Basic vocabulary, simple sentences, 4-5 paragraphs
- **Grade 3-4**: Medium vocabulary, compound sentences, 6-7 paragraphs
- **Grade 5-6**: Rich vocabulary, idioms, 8-9 paragraphs

## API Endpoints (Future)

When adding backend API routes:

```
GET  /api/stories/:id          - Get story details
POST /api/journal              - Save to story journal
GET  /api/progress/:userId     - Get user progress
POST /api/performance          - Save quiz results
```

## Performance Optimization

- Image optimization with Next.js Image component
- Font loading optimization
- CSS minification
- JavaScript code splitting
- Vercel edge caching

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

## License

MIT License - Feel free to use this project for educational purposes.

## Support

For issues or questions:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Include browser/device info
4. Attach screenshots if applicable

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit changes with clear messages
4. Push to your fork
5. Create a Pull Request

## Troubleshooting

### Supabase Connection Issues
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Check Supabase project status
- Ensure RLS policies are configured if needed

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check Node version: `node --version` (should be 18+)

### Deployment Issues
- Check Vercel logs in project dashboard
- Verify environment variables are set
- Ensure database migrations ran successfully

## Migration from Old Codebase

This is a complete rewrite from the old HTML/JS structure to modern React:

**Old Stack**: HTML + Vanilla JS + LocalStorage
**New Stack**: Next.js + React + Supabase + Vercel

### What Was Preserved
- All story themes and templates
- Grade adaptation logic
- Comprehension question system
- UI/UX design aesthetic

### What Improved
- Component-based architecture
- Type safety with TypeScript
- Persistent data storage
- Scalable state management
- Modern development tooling
- Built-in optimization
- Easy deployment

---

**Built with ❤️ for Telugu Language Learners**
