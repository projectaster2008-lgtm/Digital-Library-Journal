export type EntryType = 'journal' | 'devotional' | 'reflection' | 'letter';

export type EntryStatus = 'PUBLISHED' | 'DRAFT' | 'PRIVATE' | 'ARCHIVED';

export type MoodType = 'Peaceful' | 'Difficult' | 'Hopeful' | 'Uncertain' | 'Grateful' | 'Contemplative' | 'Vulnerable';

export interface PhotoAttachment {
  url: string;
  caption: string;
  location?: string;
  date?: string;
}

export interface ArchiveEntry {
  id: string;
  slug: string;
  title: string;
  type: EntryType;
  date: string; // YYYY-MM-DD
  year: number;
  month: string;
  day: number;
  scriptures: string[]; // e.g. ["Romans 10:9", "Psalm 27:14"]
  topics: string[]; // e.g. ["faith", "salvation", "waiting"]
  mood: MoodType;
  excerpt: string;
  content: string;
  openingThought?: string;
  scriptureVerseText?: string;
  personalNotes?: string;
  reflection?: string;
  lesson?: string;
  prayer?: string;
  closingThought?: string;
  photos?: PhotoAttachment[];
  status: EntryStatus;
  readingTimeMinutes: number;
  isFeatured?: boolean;
  isTranscribedOriginal?: boolean; // From handwritten notebook
  memoNumber?: string; // e.g. "Memo No. 1"
  author?: string; // e.g. "Clint Aldwin Maurin"
  collection?: string; // e.g. "Personal Devotions"
  devotionNumber?: string; // e.g. "Devotion I"
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  count?: number;
}

export interface ScriptureRecord {
  reference: string;
  text: string;
  book: string;
  theme: string;
  connectedEntryIds: string[];
}

export interface TimelineMilestone {
  id: string;
  year: number;
  date: string;
  title: string;
  description: string;
  category: 'realization' | 'season' | 'growth' | 'milestone' | 'spiritual';
  relatedEntryId?: string;
  quote?: string;
}

export type RoomTheme = 'morning' | 'afternoon' | 'evening' | 'night' | 'rain' | 'paper' | 'forest' | 'dawn';

export type GardenAtmosphere = 'morning' | 'afternoon' | 'evening' | 'night' | 'rain';

export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export type AmbienceType = 'silent' | 'morning' | 'rain' | 'forest' | 'night' | 'library';

export interface YearlyReview {
  year: number;
  themeTitle: string;
  totalWritings: number;
  mostWrittenTopic: string;
  mostReferencedScripture: string;
  mostActiveMonth: string;
  firstEntryDate: string;
  lastEntryDate: string;
  lessonsLearned: string[];
  strugglesFaced: string[];
  prayersAnswered: string[];
  thingsStillQuestioning: string[];
  personalReflection: string;
}
