import { Season } from '../types';

export function getCurrentDateSeason(date: Date = new Date()): Season {
  const month = date.getMonth(); // 0 = Jan, 11 = Dec
  if (month >= 2 && month <= 4) {
    return 'spring'; // Mar, Apr, May
  } else if (month >= 5 && month <= 7) {
    return 'summer'; // Jun, Jul, Aug
  } else if (month >= 8 && month <= 10) {
    return 'autumn'; // Sep, Oct, Nov
  } else {
    return 'winter'; // Dec, Jan, Feb
  }
}

export interface SeasonInfo {
  id: Season;
  name: string;
  subtitle: string;
  themePhrase: string;
  accentColor: string;
  leafPrimary: string;
  leafSecondary: string;
  terrainColor: string;
  particleDescription: string;
  months: string;
}

export const SEASONS_DATA: Record<Season, SeasonInfo> = {
  spring: {
    id: 'spring',
    name: 'Spring',
    subtitle: 'Season of Awakening & Bloom',
    themePhrase: 'Tender blossoms, fresh green shoots, and morning mist.',
    accentColor: '#84B082',
    leafPrimary: '#E8A598', // Blossom pink & spring tender green
    leafSecondary: '#84B082',
    terrainColor: '#EAF4EB',
    particleDescription: 'Floating cherry blossom petals & golden spring pollen',
    months: 'March – May',
  },
  summer: {
    id: 'summer',
    name: 'Summer',
    subtitle: 'Season of Fullness & Radiant Sun',
    themePhrase: 'Vibrant emerald canopies, golden sunlight motes, and warm breezes.',
    accentColor: '#F2C96D',
    leafPrimary: '#3F6248',
    leafSecondary: '#2D5A27',
    terrainColor: '#E8EFE5',
    particleDescription: 'Shimmering sunlight motes & energetic firefly specks',
    months: 'June – August',
  },
  autumn: {
    id: 'autumn',
    name: 'Autumn',
    subtitle: 'Season of Russet Leaves & Harvest',
    themePhrase: 'Burnt copper foliage, amber twilight dust, and gentle surrender.',
    accentColor: '#D97736',
    leafPrimary: '#C05C38',
    leafSecondary: '#D9822B',
    terrainColor: '#EFE6D8',
    particleDescription: 'Tumbling russet & amber maple leaves caught in the breeze',
    months: 'September – November',
  },
  winter: {
    id: 'winter',
    name: 'Winter',
    subtitle: 'Season of Stillness & First Snow',
    themePhrase: 'Frosted evergreen branches, crystalline snowflakes, and deep sanctuary quiet.',
    accentColor: '#8EC5C1',
    leafPrimary: '#526E65',
    leafSecondary: '#8CA19A',
    terrainColor: '#E8EEF1',
    particleDescription: 'Soft fluttering snowflakes & crystalline ice glitter',
    months: 'December – February',
  },
};
