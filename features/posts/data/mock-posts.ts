import type { Post } from '@/features/posts/types/post'

/**
 * 32 realistic mock posts distributed across:
 *  - 12 published  (Oct 4–15, 2026)
 *  -  6 failed     (Oct 10–17, 2026, with error messages)
 *  - 14 scheduled  (Oct 18–25, 2026, today and future)
 *
 * All `scheduledAt` timestamps are UTC ISO 8601.
 * Display in local timezone is handled by timezone utilities.
 */
export const mockPosts: Post[] = [
  // -------------------------------------------------------------------------
  // PUBLISHED — past 14 days
  // -------------------------------------------------------------------------
  {
    id: 'post-001',
    content:
      "Excited to share our Q3 roadmap! 🚀 This quarter we're focusing on three big themes: faster scheduling, smarter analytics, and deeper platform integrations. Stay tuned for weekly updates as we ship each milestone.",
    platforms: ['instagram'],
    mediaUrl: 'https://picsum.photos/seed/flintzy-001/800/600',
    scheduledAt: '2026-10-04T03:30:00.000Z',
    status: 'published',
  },
  {
    id: 'post-002',
    content:
      'Big news from the Flintzy product team 📣 We just rolled out batch scheduling — select multiple posts and push them to your queue in one click. Available to all Pro users starting today.',
    platforms: ['facebook'],
    scheduledAt: '2026-10-05T09:00:00.000Z',
    status: 'published',
  },
  {
    id: 'post-003',
    content:
      'Just shipped: dark mode for the Flintzy mobile app. No more burning eyes at 2 AM while you review tomorrow\'s queue. 🌙 Update available on iOS and Android now.',
    platforms: ['x'],
    scheduledAt: '2026-10-06T10:30:00.000Z',
    status: 'published',
  },
  {
    id: 'post-004',
    content:
      'POV: You just deployed to production on a Friday and it actually worked 😤 Our engineers shipped the new composer redesign today — smoother, faster, and keyboard-first.',
    platforms: ['tiktok'],
    mediaUrl: 'https://picsum.photos/seed/flintzy-004/800/600',
    scheduledAt: '2026-10-07T12:30:00.000Z',
    status: 'published',
  },
  {
    id: 'post-005',
    content:
      'Introducing Flintzy Pro — your social media workflow, supercharged. ✨ Unlimited scheduled posts, AI caption suggestions, team collaboration, and priority support. Try it free for 14 days.',
    platforms: ['instagram', 'facebook'],
    mediaUrl: 'https://picsum.photos/seed/flintzy-005/800/600',
    scheduledAt: '2026-10-08T04:30:00.000Z',
    status: 'published',
  },
  {
    id: 'post-006',
    content:
      'Tip: Use keyboard shortcuts to schedule posts 10× faster. Press ? anywhere in the app to see the full list. Our power users save an average of 40 minutes per week just from shortcuts.',
    platforms: ['x'],
    scheduledAt: '2026-10-09T06:30:00.000Z',
    status: 'published',
  },
  {
    id: 'post-007',
    content:
      'Behind the scenes at our design sprint last week 👇 We redesigned the entire post composer from scratch — 3 days, 47 prototypes, and a lot of great feedback from our beta users.',
    platforms: ['instagram'],
    mediaUrl: 'https://picsum.photos/seed/flintzy-007/800/600',
    scheduledAt: '2026-10-10T02:30:00.000Z',
    status: 'published',
  },
  {
    id: 'post-008',
    content:
      "We're hiring! 🎉 Open roles: Frontend Engineer, Senior Product Designer, and Growth Lead. We're a small, fully remote team building tools that social media managers actually love. Link in bio.",
    platforms: ['facebook'],
    scheduledAt: '2026-10-11T09:30:00.000Z',
    status: 'published',
  },
  {
    id: 'post-009',
    content:
      'Day in the life of a social media manager using Flintzy 📱 From morning content review to evening queue check — here\'s how our users are saving 5+ hours every week.',
    platforms: ['tiktok', 'instagram'],
    mediaUrl: 'https://picsum.photos/seed/flintzy-009/800/600',
    scheduledAt: '2026-10-12T11:30:00.000Z',
    status: 'published',
  },
  {
    id: 'post-010',
    content:
      'We crossed 10,000 users today! 🙏 Thank you to everyone who believed in us from day one. From a scrappy weekend project to a tool that powers thousands of social media calendars — we\'re just getting started.',
    platforms: ['x', 'facebook'],
    scheduledAt: '2026-10-13T05:30:00.000Z',
    status: 'published',
  },
  {
    id: 'post-011',
    content:
      'Your engagement rate is about more than likes. Here\'s what actually matters 🧵\n\n1/ Saves indicate your content is worth revisiting\n2/ Shares expand reach beyond your follower count\n3/ Comments signal genuine conversation\n4/ Story replies show personal connection',
    platforms: ['instagram'],
    mediaUrl: 'https://picsum.photos/seed/flintzy-011/800/600',
    scheduledAt: '2026-10-14T04:00:00.000Z',
    status: 'published',
  },
  {
    id: 'post-012',
    content:
      'Weekly recap: features shipped, bugs squashed, and a sneak peek at what\'s coming 👀\n\n✅ Bulk scheduling\n✅ Dark mode\n✅ Composer redesign\n🔜 AI caption generator\n🔜 Analytics dashboard',
    platforms: ['facebook'],
    scheduledAt: '2026-10-15T10:30:00.000Z',
    status: 'published',
  },

  // -------------------------------------------------------------------------
  // FAILED — with error messages
  // -------------------------------------------------------------------------
  {
    id: 'post-013',
    content:
      'Our biggest feature drop yet: the Flintzy AI writing assistant is here. Describe your post in plain English and let AI draft it for you. Edit, schedule, done. Available in beta now.',
    platforms: ['x'],
    scheduledAt: '2026-10-10T07:30:00.000Z',
    status: 'failed',
    errorMessage:
      'API rate limit exceeded. Your account has reached the maximum number of posts per hour. Please try again in 15 minutes.',
  },
  {
    id: 'post-014',
    content:
      'New integration: connect your Shopify store and schedule product announcements automatically whenever you publish a new collection. No code required.',
    platforms: ['instagram'],
    mediaUrl: 'https://picsum.photos/seed/flintzy-014/800/600',
    scheduledAt: '2026-10-12T05:30:00.000Z',
    status: 'failed',
    errorMessage:
      'Media processing failed. The uploaded image format is not supported by the platform. Please use JPEG or PNG.',
  },
  {
    id: 'post-015',
    content:
      'We surveyed 500 social media managers about their biggest scheduling pain points. Here\'s what they told us 📊 Full report linked in bio — drop a 🔥 if you want us to share the highlights here.',
    platforms: ['tiktok'],
    scheduledAt: '2026-10-14T08:30:00.000Z',
    status: 'failed',
    errorMessage:
      'Content flagged for review. This post could not be published because it may violate community guidelines. Review your content and try again.',
  },
  {
    id: 'post-016',
    content:
      'Announcing our Series A funding round! 🎉 We\'re thrilled to welcome our new investors as we scale the team, expand platform support, and bring Flintzy to markets worldwide.',
    platforms: ['facebook'],
    mediaUrl: 'https://picsum.photos/seed/flintzy-016/800/600',
    scheduledAt: '2026-10-15T04:30:00.000Z',
    status: 'failed',
    errorMessage:
      'Authentication token expired. Your Facebook account connection has timed out. Please reconnect your account in Settings and try again.',
  },
  {
    id: 'post-017',
    content:
      'Scheduled posts vs. real-time posts: which drives more engagement? We analyzed 2 million posts across all four platforms. The data might surprise you — thread below 👇',
    platforms: ['x'],
    scheduledAt: '2026-10-16T10:00:00.000Z',
    status: 'failed',
    errorMessage:
      'Network timeout. The request to the platform API could not be completed within the allowed time. This is usually a temporary issue.',
  },
  {
    id: 'post-018',
    content:
      'Our Black Friday campaign templates are live! 🎁 Choose from 20+ professionally designed content calendars, customize in minutes, and schedule your entire holiday campaign in one afternoon.',
    platforms: ['instagram', 'facebook'],
    mediaUrl: 'https://picsum.photos/seed/flintzy-018/800/600',
    scheduledAt: '2026-10-17T03:30:00.000Z',
    status: 'failed',
    errorMessage:
      'Platform temporarily unavailable. The request failed after 3 retry attempts. The platform API is experiencing intermittent issues.',
  },

  // -------------------------------------------------------------------------
  // SCHEDULED — today (Oct 18) and future (Oct 19–25)
  // -------------------------------------------------------------------------
  {
    id: 'post-019',
    content:
      'How to write captions that stop the scroll 🧵\n\nThread time. After reviewing 10,000 top-performing posts, here are the 7 caption patterns that consistently drive saves, shares, and comments.',
    platforms: ['instagram'],
    scheduledAt: '2026-10-18T14:30:00.000Z',
    status: 'scheduled',
  },
  {
    id: 'post-020',
    content:
      'Hot take: the best time to post isn\'t when your audience is most active. Here\'s why 👇 Posting when everyone else posts means more competition for attention. Counterintuitive but the data backs it up.',
    platforms: ['x'],
    scheduledAt: '2026-10-18T16:00:00.000Z',
    status: 'scheduled',
  },
  {
    id: 'post-021',
    content:
      'Flintzy update: We\'ve improved the post composer with real-time character counting for every platform simultaneously. Select multiple platforms and see exactly how much space you have on each. Available now.',
    platforms: ['facebook'],
    scheduledAt: '2026-10-18T17:30:00.000Z',
    status: 'scheduled',
  },
  {
    id: 'post-022',
    content:
      '3 things I wish I knew about social media scheduling before I started 🤔\n\n1. Consistency beats perfection every time\n2. Your best content times are unique to your audience\n3. Batching content saves more time than any tool',
    platforms: ['tiktok'],
    mediaUrl: 'https://picsum.photos/seed/flintzy-022/800/600',
    scheduledAt: '2026-10-19T02:30:00.000Z',
    status: 'scheduled',
  },
  {
    id: 'post-023',
    content:
      "We're speaking at SocialMediaWorld 2026 next week! Come say hi at booth 42 and see a live demo of Flintzy's new team collaboration features. Tickets still available — link in bio. 👋",
    platforms: ['instagram', 'x'],
    mediaUrl: 'https://picsum.photos/seed/flintzy-023/800/600',
    scheduledAt: '2026-10-19T08:30:00.000Z',
    status: 'scheduled',
  },
  {
    id: 'post-024',
    content:
      'Case study: How GrowthCorp scaled their Instagram engagement by 340% using Flintzy\'s content calendar and optimal timing features. Read the full story — link in comments.',
    platforms: ['facebook'],
    scheduledAt: '2026-10-20T04:30:00.000Z',
    status: 'scheduled',
  },
  {
    id: 'post-025',
    content:
      'Your competitors are already scheduling content 2 weeks in advance. Are you? The brands winning on social aren\'t posting reactively — they\'re planning strategically. Flintzy makes it easy.',
    platforms: ['x'],
    scheduledAt: '2026-10-20T10:30:00.000Z',
    status: 'scheduled',
  },
  {
    id: 'post-026',
    content:
      'Weekend is for content batching ✨ Here\'s our 2-hour content creation workflow that produces 3 weeks of posts in a single sitting. Save this for Sunday.',
    platforms: ['instagram'],
    mediaUrl: 'https://picsum.photos/seed/flintzy-026/800/600',
    scheduledAt: '2026-10-21T03:30:00.000Z',
    status: 'scheduled',
  },
  {
    id: 'post-027',
    content:
      'We built Flintzy in 6 months. Here\'s the exact tech stack we used and why:\n\n⚡ Next.js App Router — for performance\n🎨 Tailwind + shadcn — for speed\n🔄 TanStack Query — for data sync\n✅ Zod — for type safety',
    platforms: ['tiktok', 'facebook'],
    scheduledAt: '2026-10-21T12:30:00.000Z',
    status: 'scheduled',
  },
  {
    id: 'post-028',
    content:
      'Big announcement coming Friday. Set a reminder. You\'re not going to want to miss this one. 🔔',
    platforms: ['x', 'instagram', 'facebook'],
    scheduledAt: '2026-10-22T06:30:00.000Z',
    status: 'scheduled',
  },
  {
    id: 'post-029',
    content:
      "The Flintzy team's top 10 content creation tools for 2027 🧵\n\nThread below. We've tested hundreds of tools so you don't have to. These are the ones that actually made it into our daily workflow.",
    platforms: ['instagram'],
    scheduledAt: '2026-10-23T04:30:00.000Z',
    status: 'scheduled',
  },
  {
    id: 'post-030',
    content:
      'Halloween is almost here! 🎃 Have you scheduled your themed content yet? Our Holiday Calendar template has 13 pre-written Halloween posts ready to customize and queue. Link in bio.',
    platforms: ['facebook'],
    mediaUrl: 'https://picsum.photos/seed/flintzy-030/800/600',
    scheduledAt: '2026-10-23T09:30:00.000Z',
    status: 'scheduled',
  },
  {
    id: 'post-031',
    content:
      'Tip Tuesday: Use Flintzy\'s bulk import to schedule an entire month of content in one afternoon. Export from Notion or Google Sheets, drop the CSV, review, and queue. Done.',
    platforms: ['x'],
    scheduledAt: '2026-10-24T05:30:00.000Z',
    status: 'scheduled',
  },
  {
    id: 'post-032',
    content:
      '🚨 MAJOR UPDATE: Flintzy now supports all four major platforms simultaneously. Schedule one post to Instagram, Facebook, X, and TikTok at once — with per-platform character count validation. Drop your 🔥 if you\'re excited!',
    platforms: ['instagram', 'facebook', 'x', 'tiktok'],
    mediaUrl: 'https://picsum.photos/seed/flintzy-032/800/600',
    scheduledAt: '2026-10-25T08:30:00.000Z',
    status: 'scheduled',
  },
]
