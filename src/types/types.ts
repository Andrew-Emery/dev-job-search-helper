export type SeniorityLevel = 'junior' | 'mid-level' | 'senior';

export interface InterviewQuestion {
  id: string;
  question: string;
  answer: string;
  seniority: SeniorityLevel;
  category: string;
} 