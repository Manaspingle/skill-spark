export interface TestResult {
  id: string;
  userId: string;
  topicId: string;
  topicTitle: string;
  score: number;
  total: number;
  accuracy: number;
  date: string;
  timeTaken: number;
  incorrectTags: string[];
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  accuracy: number;
  testsCompleted: number;
  badge: 'gold' | 'silver' | 'bronze' | 'none';
}

export const mockResults: TestResult[] = [
  { id: 'r1', userId: '1', topicId: 'prog-basics', topicTitle: 'Programming Basics', score: 8, total: 10, accuracy: 80, date: '2026-03-14', timeTaken: 420, incorrectTags: ['recursion', 'operators'] },
  { id: 'r2', userId: '1', topicId: 'js-fundamentals', topicTitle: 'JavaScript Fundamentals', score: 6, total: 10, accuracy: 60, date: '2026-03-12', timeTaken: 540, incorrectTags: ['closures', 'hoisting', 'this keyword'] },
  { id: 'r3', userId: '1', topicId: 'data-structures', topicTitle: 'Data Structures', score: 9, total: 10, accuracy: 90, date: '2026-03-10', timeTaken: 380, incorrectTags: ['heap'] },
  { id: 'r4', userId: '1', topicId: 'ai-basics', topicTitle: 'AI Basics', score: 7, total: 10, accuracy: 70, date: '2026-03-08', timeTaken: 460, incorrectTags: ['overfitting', 'gradient descent', 'features'] },
  { id: 'r5', userId: '1', topicId: 'logical-reasoning', topicTitle: 'Logical Reasoning', score: 10, total: 10, accuracy: 100, date: '2026-03-06', timeTaken: 300, incorrectTags: [] },
];

export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'Priya Sharma', points: 680, accuracy: 94, testsCompleted: 12, badge: 'gold' },
  { rank: 2, name: 'Alex Chen', points: 450, accuracy: 82, testsCompleted: 8, badge: 'silver' },
  { rank: 3, name: 'Marcus Johnson', points: 420, accuracy: 78, testsCompleted: 9, badge: 'silver' },
  { rank: 4, name: 'Yuki Tanaka', points: 380, accuracy: 75, testsCompleted: 7, badge: 'bronze' },
  { rank: 5, name: 'Sara Ahmed', points: 350, accuracy: 72, testsCompleted: 6, badge: 'bronze' },
  { rank: 6, name: 'David Kim', points: 310, accuracy: 68, testsCompleted: 8, badge: 'bronze' },
  { rank: 7, name: 'Emma Wilson', points: 280, accuracy: 65, testsCompleted: 5, badge: 'none' },
  { rank: 8, name: 'Raj Patel', points: 240, accuracy: 62, testsCompleted: 6, badge: 'none' },
];

export const getResultsForUser = (userId: string) => mockResults.filter(r => r.userId === userId);

export const getBadgeForScore = (accuracy: number): { badge: string; points: number; label: string } => {
  if (accuracy >= 90) return { badge: 'gold', points: 100, label: 'Gold Mastery' };
  if (accuracy >= 70) return { badge: 'silver', points: 70, label: 'Silver Proficiency' };
  if (accuracy >= 50) return { badge: 'bronze', points: 40, label: 'Bronze Foundation' };
  return { badge: 'none', points: 10, label: 'Keep Practicing' };
};
