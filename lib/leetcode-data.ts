// LeetCode data utilities
// To connect live data: the component fetches from LeetCode GraphQL API client-side
// Endpoint: POST https://leetcode.com/graphql
// Query: userProfileCalendar($username: String!, $year: Int)
// Returns: { matchedUser: { userCalendar: { submissionCalendar: "{timestamp: count}" } } }
//
// NOTE: LeetCode's GraphQL requires proper CORS handling. Client-side fetch may be blocked.
// For production reliability, use a Next.js API route as proxy.

export const LEETCODE_USERNAME = "bhagvansingh";
export const LEETCODE_PROFILE_URL = `https://leetcode.com/u/${LEETCODE_USERNAME}/`;

export interface DayActivity {
  date: Date;
  count: number;
  timestamp: number;
}

export interface ContributionData {
  days: DayActivity[];
  totalProblems: number;
  streak: number;
  currentStreak: number;
  maxInOneDay: number;
  activeDays: number;
  year: number;
}

function generateMockData(): ContributionData {
  const days: DayActivity[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 364);

  let totalProblems = 0;
  let currentStreak = 0;
  let maxStreak = 0;
  let tempStreak = 0;
  let maxInOneDay = 0;
  let activeDays = 0;

  for (let i = 0; i < 365; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isRecent = i > 300;

    let count = 0;
    const rand = Math.random();

    if (rand < 0.18) {
      count = 0;
    } else if (rand < 0.50) {
      count = Math.floor(Math.random() * 2) + 1;
    } else if (rand < 0.78) {
      count = Math.floor(Math.random() * 3) + 2;
    } else if (rand < 0.93) {
      count = Math.floor(Math.random() * 3) + 5;
    } else {
      count = Math.floor(Math.random() * 4) + 8;
    }

    if (isWeekend && Math.random() < 0.35) {
      count = Math.max(0, count - Math.floor(Math.random() * 3));
    }

    // Ensure recent days have activity for realistic "current streak"
    if (isRecent && count === 0 && Math.random() < 0.7) {
      count = Math.floor(Math.random() * 3) + 1;
    }

    totalProblems += count;
    if (count > 0) {
      activeDays++;
      tempStreak++;
      maxStreak = Math.max(maxStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
    maxInOneDay = Math.max(maxInOneDay, count);

    days.push({
      date,
      count,
      timestamp: Math.floor(date.getTime() / 1000),
    });
  }

  // Calculate current streak from end
  currentStreak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) {
      currentStreak++;
    } else {
      break;
    }
  }

  return {
    days,
    totalProblems,
    streak: maxStreak,
    currentStreak,
    maxInOneDay,
    activeDays,
    year: new Date().getFullYear(),
  };
}

export function parseLeetCodeCalendar(
  submissionCalendar: string,
  year: number
): ContributionData {
  const parsed: Record<string, number> = JSON.parse(submissionCalendar);
  const days: DayActivity[] = [];
  let totalProblems = 0;
  let tempStreak = 0;
  let maxStreak = 0;
  let maxInOneDay = 0;
  let activeDays = 0;

  const timestamps = Object.keys(parsed).map(Number).sort((a, b) => a - b);

  for (const ts of timestamps) {
    const count = parsed[ts];
    const date = new Date(ts * 1000);
    days.push({ date, count, timestamp: ts });
    totalProblems += count;
    if (count > 0) {
      activeDays++;
      tempStreak++;
      maxStreak = Math.max(maxStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
    maxInOneDay = Math.max(maxInOneDay, count);
  }

  // Calculate current streak from end
  let currentStreak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) {
      currentStreak++;
    } else {
      break;
    }
  }

  return {
    days,
    totalProblems,
    streak: maxStreak,
    currentStreak,
    maxInOneDay,
    activeDays,
    year,
  };
}

// Client-side fetch with fallback to mock data
export async function fetchLeetCodeDataClient(
  username: string,
  year?: number
): Promise<ContributionData> {
  const targetYear = year || new Date().getFullYear();

  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Referer": "https://leetcode.com",
      },
      body: JSON.stringify({
        query: `
          query userProfileCalendar($username: String!, $year: Int) {
            matchedUser(username: $username) {
              userCalendar(year: $year) {
                submissionCalendar
              }
            }
          }
        `,
        variables: { username, year: targetYear },
      }),
    });

    if (!res.ok) throw new Error("Fetch failed");

    const json = await res.json();
    const calendarStr = json?.data?.matchedUser?.userCalendar?.submissionCalendar;

    if (!calendarStr || calendarStr === "{}") {
      console.warn("LeetCode returned empty calendar, using mock data");
      return generateMockData();
    }

    return parseLeetCodeCalendar(calendarStr, targetYear);
  } catch (err) {
    console.warn("LeetCode fetch failed, using mock data:", err);
    return generateMockData();
  }
}

export const mockContributionData: ContributionData = generateMockData();

// GitHub-style activity color levels using portfolio palette
export function getActivityColor(count: number): string {
  if (count === 0) return "bg-[#1a1a16]";
  if (count === 1) return "bg-[#3a3a20]";
  if (count <= 3) return "bg-[#5a5a28]";
  if (count <= 5) return "bg-[#8a8a30]";
  if (count <= 8) return "bg-[#b8b838]";
  return "bg-[#DBF241]";
}

export function getActivityLevel(count: number): string {
  if (count === 0) return "No activity";
  if (count === 1) return "Light";
  if (count <= 3) return "Moderate";
  if (count <= 5) return "Active";
  if (count <= 8) return "Focused";
  return "Deep work";
}

export const monthLabels = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export const dayLabels = ["Mon", "Wed", "Fri"];

export interface TechCategory {
  label: string;
  items: string[];
}

export const techCategories: TechCategory[] = [
  { label: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind"] },
  { label: "Backend", items: ["Node.js", "Express", "MongoDB", "PostgreSQL"] },
  { label: "Design", items: ["Figma", "Framer Motion", "Three.js"] },
  { label: "Deploy", items: ["Docker", "Vercel", "Firebase"] },
];
