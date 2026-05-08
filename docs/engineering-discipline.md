# Engineering Discipline Section

## Feature Overview
A compact, premium credibility section showcasing 560+ LeetCode problems solved alongside a categorized tools & languages display. Balanced two-column layout with subtle glassmorphism cards.

## Layout Structure
- **Left card**: LeetCode stats + profile link
- **Right card**: Tools & Languages categorized grid
- **Footer line**: "Quiet consistency compounds over time."

## Left Card — LeetCode Stats
```
560+ problems solved
View LeetCode Profile ↗
```

### Design
- Large number display with tabular-nums font
- Subtle glassmorphism border (`border-white/[0.06]`)
- Background: `bg-white/[0.015]`

## Right Card — Tools & Languages
```
Frontend:    JavaScript, HTML5, CSS3, React, Next.js, Tailwind CSS
Backend:     Node.js, Express.js, MongoDB, REST APIs
Design:      Figma, Framer Motion
Deploy:      Docker, Vercel, Vite, Postman, GitHub
```

### Design
- Category labels with `tracking-[0.2em] uppercase`
- Tool names separated by "•" dots
- Muted warm-600 color, warm-400 on hover

## Typography
- Section headings: Poppins (via `font-heading`)
- Body text: DM Sans (via `font-body`)

## Mobile Responsiveness
- **Section padding**: `py-14 sm:py-24 lg:py-32` — tighter on mobile
- **Container padding**: `px-8 sm:px-12 lg:px-16`
- **Layout**: `grid-cols-1 lg:grid-cols-2` — stacked on mobile, two columns on desktop
- **Grid gap**: `gap-12 lg:gap-16` — tighter on mobile
- **Stats number**: `text-5xl sm:text-6xl` — scales down on mobile
- **Tools layout**: Stacked category rows, each `flex items-start gap-4`
- **Category label**: `w-20 shrink-0` fixed width for alignment
- **Closing line**: `mt-10 lg:mt-16` — tighter on mobile, `max-w-md`

## File Location
`components/sections/EngineeringDiscipline.tsx`
