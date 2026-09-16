import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  Users,
  User,
  Shield,
  Key,
  Sparkles,
  BookOpen,
  Cross,
  Clock,
  Compass,
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronRight,
  Info,
  Calendar,
  X,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import { ArchiveEntry } from '../../types';

export interface RadialEntity {
  id: string;
  name: string;
  shortName: string;
  role: string;
  category: 'core' | 'family' | 'faith' | 'mentors' | 'external';
  orbitTier: 1 | 2 | 3; // 1 = Core Covenant, 2 = Family Circle, 3 = Community/External
  angleDeg: number;
  radius: number;
  iconType: 'heart' | 'user' | 'cross' | 'shield' | 'users' | 'sparkles';
  accentColor: string;
  lightBgColor: string;
  borderColor: string;
  description: string;
  relationToChronicle: string;
  keyPhrases: string[];
  keyQuotes: { speaker: string; text: string; chapter: number }[];
  connectedEntityIds: string[];
  activeChapters: number[]; // 1 to 7
}

export interface RadialChapterSatellite {
  chapterNumber: number;
  date: string;
  title: string;
  subtitle: string;
  angleDeg: number;
  radius: number;
  activeEntityIds: string[];
  keyTheme: string;
}

export interface RelationshipRadialNetworkProps {
  onSelectChapter?: (chapterNumber: number) => void;
  onSelectEntry?: (entry: ArchiveEntry) => void;
  masterEntry?: ArchiveEntry;
}

export const RelationshipRadialNetwork: React.FC<RelationshipRadialNetworkProps> = ({
  onSelectChapter,
  onSelectEntry,
  masterEntry,
}) => {
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>('jamaica');
  const [selectedChapterNum, setSelectedChapterNum] = useState<number | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'network' | 'chapters' | 'matrix'>('network');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // Define the 10 People & Groups identified in the Relationship Journal
  const entities: RadialEntity[] = useMemo(
    () => [
      {
        id: 'god',
        name: 'God & Sovereign Christ',
        shortName: 'God / The 3rd Strand',
        role: 'The Divine Anchor & Cord of Three Strands (Eccl 4:12)',
        category: 'core',
        orbitTier: 1,
        angleDeg: 270,
        radius: 110,
        iconType: 'cross',
        accentColor: '#D4A359',
        lightBgColor: '#FAF3E0',
        borderColor: '#D4A359',
        description:
          'The sacred center of the covenant. Both Clint and Maica surrender their anxieties, religious tensions, and future steps to God. He is the author of unconditional Agape love (Ephesians 5:1).',
        relationToChronicle:
          'Transforms a fragile human relationship into an unshakeable covenant. Intercessory prayer is their chosen weapon against guilt and distance.',
        keyPhrases: ['Cord of Three Strands', 'Agape Love', 'Ephesians 5:1', 'Sovereign Anchor', 'Intercession'],
        keyQuotes: [
          {
            speaker: 'CLINT',
            chapter: 4,
            text: 'This is not Just You and Me lang, but YOU AND ME AND GOD. "AGAPE"—meaning ultimate, supernatural Love that only God can give. Ephesians 5:1 says "be Imitators of God."',
          },
          {
            speaker: 'MAICA',
            chapter: 1,
            text: 'Ginapangita pa nako unsa jud ang gusto ni Jehovah para sa akoa... I\'ll always pray nga i-bless ka ni Jehovah ug ma achieve nimo imong dreams.',
          },
        ],
        connectedEntityIds: ['clint', 'jamaica', 'maica-mom', 'clint-family', 'discipleship-fellowship', 'jw-congregation'],
        activeChapters: [1, 2, 3, 4, 5, 6, 7],
      },
      {
        id: 'clint',
        name: 'Clint Aldwin Maurin (Me)',
        shortName: 'Clint (Author / Me)',
        role: 'Narrator, Christian Disciple & Protector of Boundaries',
        category: 'core',
        orbitTier: 1,
        angleDeg: 35,
        radius: 135,
        iconType: 'user',
        accentColor: '#2A3F35',
        lightBgColor: '#EBF2EE',
        borderColor: '#4A6B5B',
        description:
          'The author and boyfriend. Learns to dismantle rigid doctrinal pride to see Maica’s genuine heart; initiates high-EQ emotional check-ins, introduces the "Treasure & Keys" boundary, and commits to radical ownership.',
        relationToChronicle:
          'Rides to Pangilatan mountain to fight for reconciliation; models radical masculine ownership, blocks past distractions, and stands in the trenches with Maica.',
        keyPhrases: ['Kita Duha', 'High EQ Discernment', 'Treasure & Keys', 'Nag-unongay Bedrock', 'Radical Ownership'],
        keyQuotes: [
          {
            speaker: 'CLINT',
            chapter: 7,
            text: 'Mag sinabtanay ta lovey, dli lang pud ako mo understand but kita duha, and kita rapud mo solve pud. Dli lang ako, but KITA DUHA!',
          },
          {
            speaker: 'CLINT',
            chapter: 4,
            text: 'You have Given me the Keys. Ang naka lock is something nindot, a TREASURE. You are that treasure lovey! Love is a choice, choosing each other everyday.',
          },
        ],
        connectedEntityIds: ['god', 'jamaica', 'maica-mom', 'maica-siblings', 'clint-family', 'work-mentors', 'edziel', 'discipleship-fellowship'],
        activeChapters: [1, 2, 3, 4, 5, 6, 7],
      },
      {
        id: 'jamaica',
        name: 'Jamaica (Maica / Lovey)',
        shortName: 'Jamaica (Maica)',
        role: 'Beloved Partner, Eldest Daughter & All-Rounder Worker',
        category: 'core',
        orbitTier: 1,
        angleDeg: 145,
        radius: 135,
        iconType: 'heart',
        accentColor: '#B0413E',
        lightBgColor: '#FDF1F0',
        borderColor: '#B0413E',
        description:
          'Eldest daughter carrying heavy financial and moral burdens for her family; working far from home as a helper. Courageous, hardworking, deeply sensitive, and seeking truth beyond legalistic constraints.',
        relationToChronicle:
          'Provides the emotional vulnerability that unlocks the chronicle; reveals her vision of a husband with "diskarte" and high EQ, and coins the sacred anchor term "Nag-unongay".',
        keyPhrases: ['Nag-unongay', 'All-Rounder Mindset', 'Eldest Sister Burden', 'Vulnerable & Fragile', 'Diskarte'],
        keyQuotes: [
          {
            speaker: 'MAICA',
            chapter: 7,
            text: 'Ni unong JD ka nako lovey! Kani Karun tawag Ani is NAG-UNONGAY ba... KITA DUHA MO SOLVE! And katu mo grow together.',
          },
          {
            speaker: 'MAICA',
            chapter: 3,
            text: 'Akong ganahan JD ma husband Kay kanang kabalo sd tanan sa trabaho ba tas naa diskarte... tapos naay emotional intelligence!',
          },
        ],
        connectedEntityIds: ['god', 'clint', 'maica-mom', 'maica-siblings', 'jw-congregation', 'work-mentors'],
        activeChapters: [1, 2, 3, 4, 5, 6, 7],
      },
      {
        id: 'maica-mom',
        name: "Maica's Mother (Mama)",
        shortName: "Maica's Mama",
        role: 'Maternal Advisor & Moral Anchor in the Province',
        category: 'family',
        orbitTier: 2,
        angleDeg: 95,
        radius: 220,
        iconType: 'users',
        accentColor: '#8C5E28',
        lightBgColor: '#FAF4E8',
        borderColor: '#C29147',
        description:
          'Maica’s mother who deeply respects Clint’s character, his church service, emotional stability, and protective care. Gave her maternal blessing and affirmed that godly character matters more than external religious labels.',
        relationToChronicle:
          'When Maica considered ending the relationship over church advice, her mother’s affirmation of Clint gave her reassurance and counter-balanced religious guilt.',
        keyPhrases: ['Parental Blessing', 'Respect for Church Service', 'Proverbial Wife Wisdom', 'Family Anchor'],
        keyQuotes: [
          {
            speaker: 'MAICA',
            chapter: 1,
            text: 'Her Mom highly admired me—calling me rare for serving in the church, being patient, financially grounded, and protective.',
          },
        ],
        connectedEntityIds: ['jamaica', 'clint', 'maica-siblings'],
        activeChapters: [1, 2, 3],
      },
      {
        id: 'maica-siblings',
        name: "Maica's Siblings (Mga Manghud)",
        shortName: "Mga Manghud (Siblings)",
        role: "Maica's Motivation for Sacrificial Labor",
        category: 'family',
        orbitTier: 2,
        angleDeg: 165,
        radius: 220,
        iconType: 'users',
        accentColor: '#2B6E62',
        lightBgColor: '#EAF5F2',
        borderColor: '#4A9C8D',
        description:
          'Younger siblings living in the province. Maica feels the weight of an "Ate" to ensure their schooling and basic needs are met, driving her long hours of work away from home.',
        relationToChronicle:
          'Clint embraces her siblings as future shared family, promising that she will never have to bear the financial and familial burden alone.',
        keyPhrases: ['Eldest Sister Weight', 'Generational Hope', 'Shared Burden', 'Family Lifting'],
        keyQuotes: [
          {
            speaker: 'MAICA',
            chapter: 1,
            text: 'Usahay mag tan-aw ko sa akong mama ug mga manghud then ma pressure ko kay gusto kaayo nako sila matabangan someday. Murag as the ate, dako kaayo kog responsibility sa ilaha.',
          },
        ],
        connectedEntityIds: ['jamaica', 'maica-mom', 'clint'],
        activeChapters: [1, 2, 6, 7],
      },
      {
        id: 'clint-family',
        name: "Clint's Family & Household",
        shortName: "Clint's Household",
        role: 'Spiritual Heritage & Welcoming Haven',
        category: 'family',
        orbitTier: 2,
        angleDeg: 340,
        radius: 220,
        iconType: 'users',
        accentColor: '#3A506B',
        lightBgColor: '#EBF1F8',
        borderColor: '#5B7C99',
        description:
          'Clint’s household where faith, responsibility, and discipleship were nurtured. Provided a safe, welcoming home where Maica felt honored and respected.',
        relationToChronicle:
          'Represents the solid family framework Clint brings to the relationship, inspiring confidence that their future home will be founded on stability and faith.',
        keyPhrases: ['Generational Foundation', 'Household of Faith', 'Welcoming Haven', 'Long-term Stability'],
        keyQuotes: [
          {
            speaker: 'CLINT',
            chapter: 4,
            text: 'A safe environment rooted in faith, where family members support one another through prayer and honest counsel.',
          },
        ],
        connectedEntityIds: ['clint', 'god', 'jamaica'],
        activeChapters: [4, 6, 7],
      },
      {
        id: 'jw-congregation',
        name: 'Kingdom Hall / JW Congregation & Elders',
        shortName: 'JW Congregation & Elders',
        role: 'Doctrinal Strictness & Religious Crossroads',
        category: 'faith',
        orbitTier: 3,
        angleDeg: 195,
        radius: 300,
        iconType: 'shield',
        accentColor: '#7A3E65',
        lightBgColor: '#F7EEF4',
        borderColor: '#9E5B86',
        description:
          'The church community and elders of Maica’s background who strictly warned against marrying outside their organization, creating internal friction and fears of religious condemnation.',
        relationToChronicle:
          'Pushed Maica to the emotional breaking point of May 30; overcame by realizing true faith is anchored in personal relationship with Christ rather than fear-based legalism.',
        keyPhrases: ['Doctrinal Divide', 'Legalistic Barrier', 'Religious Crossroads', 'Freedom in Christ'],
        keyQuotes: [
          {
            speaker: 'MAICA',
            chapter: 1,
            text: 'Her churchmates warned her that differing beliefs often create an irreconcilable divide... maybe i-stop sa natu ni, focus nlng sa ta sa Ginoo.',
          },
        ],
        connectedEntityIds: ['jamaica', 'god'],
        activeChapters: [1, 2, 5],
      },
      {
        id: 'work-mentors',
        name: "Older Co-workers ('Mga Edaran' Mentors)",
        shortName: "Work Mentors ('Mga Edaran')",
        role: 'Experienced Mothers & Practical Relationship Mentors',
        category: 'mentors',
        orbitTier: 3,
        angleDeg: 55,
        radius: 300,
        iconType: 'sparkles',
        accentColor: '#A06828',
        lightBgColor: '#FBF5EE',
        borderColor: '#C68B42',
        description:
          'Married female co-workers and older experienced mothers at work who shared real-world advice on marriage, mutual teamwork ("tinabangay"), and emotional communication.',
        relationToChronicle:
          'Helped Maica shape her dream of an all-rounder husband with high EQ, affirming that emotional connection and teamwork matter more than superficial romance.',
        keyPhrases: ['Tinabangay (Teamwork)', 'Real-world Wisdom', 'Husband Blueprint', 'Diskarte in Marriage'],
        keyQuotes: [
          {
            speaker: 'MAICA',
            chapter: 3,
            text: 'Akong mga katabi Kay mga edaran na, something nana say family ba, ganahan kaau ko makig tabi ing ana Kay daghan Sila Ihatag ma advice and experiences nila...',
          },
        ],
        connectedEntityIds: ['jamaica', 'clint'],
        activeChapters: [3, 6],
      },
      {
        id: 'edziel',
        name: 'Edziel (The Acquaintance)',
        shortName: 'Edziel (The Catalyst)',
        role: 'External Catalyst for Boundary Enforcement & Radical Transparency',
        category: 'external',
        orbitTier: 3,
        angleDeg: 305,
        radius: 300,
        iconType: 'shield',
        accentColor: '#9C3D3D',
        lightBgColor: '#FDEEEE',
        borderColor: '#C56262',
        description:
          'A mutual online acquaintance from the past whose casual gossip created a sudden fear in Maica that her privacy might be compromised or disrespected by male friends.',
        relationToChronicle:
          'Became the catalyst for Clint to prove his absolute loyalty: he took full masculine ownership, erased the chat history, and blocked Edziel to permanently secure Maica’s dignity.',
        keyPhrases: ['Boundary Enforcement', 'Radical Accountability', 'Privacy Defense', 'Ending Distractions'],
        keyQuotes: [
          {
            speaker: 'CLINT',
            chapter: 7,
            text: 'And I know why naka tell ka about chissmis—nag doubt ka because sa katong kay Edziel. Sorry talaga, careless ako. But ayaw na ka worry, I already blocked Edziel, gi delete nako iyang convo!',
          },
        ],
        connectedEntityIds: ['clint'],
        activeChapters: [7],
      },
      {
        id: 'discipleship-fellowship',
        name: 'Christian Fellowship & Discipleship Circle',
        shortName: 'Discipleship Brotherhood',
        role: 'Spiritual Accountability & Biblical Grounding',
        category: 'faith',
        orbitTier: 3,
        angleDeg: 250,
        radius: 300,
        iconType: 'cross',
        accentColor: '#2B5876',
        lightBgColor: '#EEF4F8',
        borderColor: '#4E7D9E',
        description:
          'Clint’s church mentors and brothers in discipleship who walked with him, prayed with him, and grounded his understanding of 1 Corinthians 13 love and spiritual endurance.',
        relationToChronicle:
          'Provided the spiritual maturity Clint needed to respond to heartbreak with patience, prayer, and sacrificial grace rather than anger.',
        keyPhrases: ['Spiritual Brotherhood', '1 Corinthians 13 Grounding', 'Intercession', 'Accountability'],
        keyQuotes: [
          {
            speaker: 'CLINT',
            chapter: 5,
            text: 'Love is patient, love is kind. Willing ba sila magpadayun for 40-50 years? Love is a choice, choosing everyday each other through obedience and loyalty.',
          },
        ],
        connectedEntityIds: ['clint', 'god'],
        activeChapters: [1, 4, 5, 7],
      },
    ],
    []
  );

  // 7 Relationship Chapters as Radial Satellites (outer orbit r = 380)
  const chapters: RadialChapterSatellite[] = useMemo(
    () => [
      {
        chapterNumber: 1,
        date: 'May 30, 2026',
        title: 'The Crucible & The Late-Night Call',
        subtitle: 'Facing the doctrinal wall, weeping at midnight, and surrendering control',
        angleDeg: 190,
        radius: 380,
        activeEntityIds: ['clint', 'jamaica', 'god', 'maica-mom', 'maica-siblings', 'jw-congregation', 'discipleship-fellowship'],
        keyTheme: 'Surrender, Long-Distance & The Midnight Call',
      },
      {
        chapterNumber: 2,
        date: 'May 31, 2026',
        title: 'The Mountain Reconciliation at Pangilatan',
        subtitle: 'Dissolving heavy clouds, choosing empathy over pity, and honest smiles',
        angleDeg: 140,
        radius: 380,
        activeEntityIds: ['clint', 'jamaica', 'god', 'maica-mom', 'maica-siblings'],
        keyTheme: 'Mountain Reunion, Empathy vs Pity, Authentic Smiles',
      },
      {
        chapterNumber: 3,
        date: 'June 15, 2026',
        title: 'Practical Dreams & The Husband Blueprint',
        subtitle: 'All-rounder mindset, "diskarte", and wisdom from older co-workers',
        angleDeg: 65,
        radius: 380,
        activeEntityIds: ['clint', 'jamaica', 'god', 'work-mentors', 'maica-mom'],
        keyTheme: 'The Husband Blueprint, Diskarte & Mentors',
      },
      {
        chapterNumber: 4,
        date: 'June 21–22, 2026',
        title: "Affection, 'Treasure & Keys', and Agape Love",
        subtitle: 'Navigating boundaries, de-escalating guilt, and love as a decision of the will',
        angleDeg: 10,
        radius: 380,
        activeEntityIds: ['clint', 'jamaica', 'god', 'clint-family', 'discipleship-fellowship'],
        keyTheme: 'Treasure & Keys, Moral Boundaries, Ephesians 5:1',
      },
      {
        chapterNumber: 5,
        date: 'June 27, 2026',
        title: 'Deconstructing Modern Commitment (1 Cor 13)',
        subtitle: 'Dissecting viral breakups, pleasure vs love, and daily choice',
        angleDeg: 280,
        radius: 380,
        activeEntityIds: ['clint', 'jamaica', 'god', 'jw-congregation', 'discipleship-fellowship'],
        keyTheme: '1 Corinthians 13, Obedience & Daily Choice',
      },
      {
        chapterNumber: 6,
        date: 'July 4, 2026',
        title: 'The Morning Jog & Unmasked Peace',
        subtitle: 'Secure attachment, freedom from vulnerability hangover, and joyful rest',
        angleDeg: 330,
        radius: 380,
        activeEntityIds: ['clint', 'jamaica', 'god', 'clint-family', 'maica-siblings', 'work-mentors'],
        keyTheme: 'Secure Attachment, Morning Jog & Lasting Peace',
      },
      {
        chapterNumber: 7,
        date: 'July 2026',
        title: 'Nag-unongay & Overcoming Shame at Midnight',
        subtitle: 'Radical masculine ownership, blocking past careless connections, and Kita Duha',
        angleDeg: 245,
        radius: 380,
        activeEntityIds: ['clint', 'jamaica', 'god', 'edziel', 'maica-siblings', 'clint-family', 'discipleship-fellowship'],
        keyTheme: 'Nag-unongay Bedrock, Blocking Edziel & Kita Duha',
      },
    ],
    []
  );

  // Selected Entity lookup
  const selectedEntity = useMemo(() => {
    if (!selectedEntityId) return null;
    return entities.find((e) => e.id === selectedEntityId) || null;
  }, [selectedEntityId, entities]);

  // Selected Chapter lookup
  const selectedChapter = useMemo(() => {
    if (!selectedChapterNum) return null;
    return chapters.find((c) => c.chapterNumber === selectedChapterNum) || null;
  }, [selectedChapterNum, chapters]);

  // Filtered Entities based on active category
  const filteredEntities = useMemo(() => {
    if (activeCategoryFilter === 'all') return entities;
    return entities.filter((e) => e.category === activeCategoryFilter);
  }, [entities, activeCategoryFilter]);

  // Polar to Cartesian conversion helper (center = [420, 420])
  const centerCoord = 420;
  const getCoordinates = (radius: number, angleDeg: number) => {
    const angleRad = ((angleDeg - 90) * Math.PI) / 180;
    return {
      x: centerCoord + radius * Math.cos(angleRad),
      y: centerCoord + radius * Math.sin(angleRad),
    };
  };

  // Determine if an entity is currently highlighted
  const isEntityHighlighted = (entityId: string) => {
    if (hoveredNodeId) {
      if (hoveredNodeId === entityId) return true;
      const hovered = entities.find((e) => e.id === hoveredNodeId);
      if (hovered?.connectedEntityIds.includes(entityId)) return true;
      return false;
    }
    if (selectedChapterNum) {
      const ch = chapters.find((c) => c.chapterNumber === selectedChapterNum);
      return ch?.activeEntityIds.includes(entityId) ?? false;
    }
    if (selectedEntityId) {
      if (selectedEntityId === entityId) return true;
      return selectedEntity?.connectedEntityIds.includes(entityId) ?? false;
    }
    return true;
  };

  // Determine if a chapter is currently highlighted
  const isChapterHighlighted = (chapterNumber: number) => {
    if (selectedChapterNum === chapterNumber) return true;
    if (hoveredNodeId) {
      const ch = chapters.find((c) => c.chapterNumber === chapterNumber);
      return ch?.activeEntityIds.includes(hoveredNodeId) ?? false;
    }
    if (selectedEntityId) {
      const ch = chapters.find((c) => c.chapterNumber === chapterNumber);
      return ch?.activeEntityIds.includes(selectedEntityId) ?? false;
    }
    return true;
  };

  const renderIcon = (type: string, color: string, className = 'w-4 h-4') => {
    switch (type) {
      case 'heart':
        return <Heart className={className} style={{ color }} />;
      case 'cross':
        return <Cross className={className} style={{ color }} />;
      case 'shield':
        return <Shield className={className} style={{ color }} />;
      case 'users':
        return <Users className={className} style={{ color }} />;
      case 'sparkles':
        return <Sparkles className={className} style={{ color }} />;
      default:
        return <User className={className} style={{ color }} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* ─── Top Control & Legend Bar ─── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#2A3F35]/25 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-[#FAF3E0] text-[#D4A359] border border-[#D4A359]/30">
              <Compass className="w-4 h-4" />
            </span>
            <h3 className="text-base font-display font-bold text-[#14241B]">
              Radial Network Graph of Relationships
            </h3>
          </div>
          <p className="text-xs font-serif-body italic text-[#4A5D4E] mt-0.5">
            Concentric orbits mapping the 10 people, groups & faith circles across 7 documented chapters
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center p-1 rounded-xl bg-[#FAF8F2] border border-[#78966A]/30">
            <button
              onClick={() => setViewMode('network')}
              className={`px-3 py-1 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                viewMode === 'network'
                  ? 'bg-[#2A3F35] text-white font-bold shadow-sm'
                  : 'text-[#2A3C30] hover:bg-[#F3EEDC]'
              }`}
            >
              Radial Canvas
            </button>
            <button
              onClick={() => setViewMode('chapters')}
              className={`px-3 py-1 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                viewMode === 'chapters'
                  ? 'bg-[#2A3F35] text-white font-bold shadow-sm'
                  : 'text-[#2A3C30] hover:bg-[#F3EEDC]'
              }`}
            >
              Chapter Satellites
            </button>
            <button
              onClick={() => setViewMode('matrix')}
              className={`px-3 py-1 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                viewMode === 'matrix'
                  ? 'bg-[#2A3F35] text-white font-bold shadow-sm'
                  : 'text-[#2A3C30] hover:bg-[#F3EEDC]'
              }`}
            >
              Connection Matrix
            </button>
          </div>

          {/* Zoom controls */}
          <div className="flex items-center space-x-1 p-1 rounded-xl bg-[#FAF8F2] border border-[#78966A]/30 text-[#2A3C30]">
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 0.15, 1.4))}
              className="p-1 rounded hover:bg-white cursor-pointer"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 0.15, 0.7))}
              className="p-1 rounded hover:bg-white cursor-pointer"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                setZoomLevel(1);
                setSelectedEntityId('jamaica');
                setSelectedChapterNum(null);
              }}
              className="p-1 rounded hover:bg-white cursor-pointer"
              title="Reset view"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ─── Category Filter Pills ─── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
        <span className="text-[#6A7B6D] shrink-0 uppercase tracking-wider text-[11px] font-bold">
          Filter Orbits:
        </span>
        {[
          { id: 'all', label: 'All Identified (10 Entities)' },
          { id: 'core', label: 'Core Covenant (Clint, Maica, God)' },
          { id: 'family', label: 'Family Circles (Mama, Manghud, Home)' },
          { id: 'faith', label: 'Faith & Doctrine (JW Elders, Fellowship)' },
          { id: 'mentors', label: 'Mentors (Workplace Edaran)' },
          { id: 'external', label: 'External (Edziel & Boundaries)' },
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => setActiveCategoryFilter(btn.id)}
            className={`px-3 py-1 rounded-xl transition-all shrink-0 cursor-pointer border ${
              activeCategoryFilter === btn.id
                ? 'bg-[#2A3F35] text-white border-[#2A3F35] font-bold shadow-sm'
                : 'bg-white text-[#2A3C30] border-[#78966A]/30 hover:bg-[#F3EEDC]'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* ─── Main Interactive Radial Canvas & Detail Drawer ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SVG Radial Graph Visualizer */}
        <div className="lg:col-span-8 rounded-3xl bg-[#FAF8F2] border-2 border-[#2A3F35]/30 shadow-lg overflow-hidden relative p-4 flex flex-col items-center justify-center min-h-[580px]">
          {/* Subtle Background Radial Rings Pattern */}
          <div className="absolute inset-0 pointer-events-none opacity-40 flex items-center justify-center">
            <div className="w-[220px] h-[220px] rounded-full border border-dashed border-[#78966A]/40" />
            <div className="absolute w-[440px] h-[440px] rounded-full border border-dashed border-[#78966A]/30" />
            <div className="absolute w-[600px] h-[600px] rounded-full border border-dashed border-[#78966A]/20" />
            <div className="absolute w-[760px] h-[760px] rounded-full border border-[#D4A359]/20" />
          </div>

          {/* Interactive SVG Stage */}
          <div className="w-full overflow-auto flex justify-center py-2">
            <motion.svg
              viewBox="0 0 840 840"
              className="w-[540px] sm:w-[680px] lg:w-[760px] h-[540px] sm:h-[680px] lg:h-[760px] max-w-none transition-transform duration-300 select-none"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <defs>
                {/* Glow Filter */}
                <filter id="radial-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <linearGradient id="gold-covenant" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D4A359" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#B0413E" stopOpacity="0.6" />
                </linearGradient>
                <linearGradient id="nag-unongay-cord" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2A3F35" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#B0413E" stopOpacity="0.9" />
                </linearGradient>
              </defs>

              {/* ─── Radial Orbit Guides ─── */}
              {/* Center Aura */}
              <circle cx={centerCoord} cy={centerCoord} r={35} fill="#FAF3E0" stroke="#D4A359" strokeWidth={1.5} opacity={0.6} />

              {/* Orbit 1: Core Covenant (r = 125) */}
              <circle
                cx={centerCoord}
                cy={centerCoord}
                r={125}
                fill="none"
                stroke="#2A3F35"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                opacity={0.35}
              />
              <text
                x={centerCoord}
                y={centerCoord - 132}
                textAnchor="middle"
                className="text-[10px] font-mono fill-[#6A7B6D] font-bold uppercase tracking-widest pointer-events-none"
              >
                Orbit I: Core Covenant & Purity
              </text>

              {/* Orbit 2: Family & Relational Circles (r = 220) */}
              <circle
                cx={centerCoord}
                cy={centerCoord}
                r={220}
                fill="none"
                stroke="#78966A"
                strokeWidth={1.5}
                strokeDasharray="5 5"
                opacity={0.35}
              />
              <text
                x={centerCoord}
                y={centerCoord - 227}
                textAnchor="middle"
                className="text-[10px] font-mono fill-[#6A7B6D] font-bold uppercase tracking-widest pointer-events-none"
              >
                Orbit II: Family & Shared Burdens
              </text>

              {/* Orbit 3: Faith, Mentors & External Boundaries (r = 300) */}
              <circle
                cx={centerCoord}
                cy={centerCoord}
                r={300}
                fill="none"
                stroke="#78966A"
                strokeWidth={1.5}
                strokeDasharray="6 6"
                opacity={0.25}
              />
              <text
                x={centerCoord}
                y={centerCoord - 307}
                textAnchor="middle"
                className="text-[10px] font-mono fill-[#6A7B6D] font-bold uppercase tracking-widest pointer-events-none"
              >
                Orbit III: Community, Faith Divide & Mentors
              </text>

              {/* Orbit 4: Chapter Satellites (r = 380) */}
              {viewMode !== 'matrix' && (
                <circle
                  cx={centerCoord}
                  cy={centerCoord}
                  r={380}
                  fill="none"
                  stroke="#D4A359"
                  strokeWidth={1.5}
                  strokeDasharray="3 6"
                  opacity={0.4}
                />
              )}

              {/* ─── Network Interconnection Lines ─── */}
              {entities.map((source) => {
                const sourceCoords = getCoordinates(source.radius, source.angleDeg);
                return source.connectedEntityIds.map((targetId) => {
                  const target = entities.find((e) => e.id === targetId);
                  if (!target || source.id > target.id) return null; // Avoid duplicate bidirectional lines
                  const targetCoords = getCoordinates(target.radius, target.angleDeg);

                  const isEdgeActive =
                    (selectedEntityId === source.id || selectedEntityId === target.id) ||
                    (hoveredNodeId === source.id || hoveredNodeId === target.id);

                  const isCoreCovenantEdge =
                    (source.id === 'clint' && target.id === 'jamaica') ||
                    (source.id === 'god' && (target.id === 'clint' || target.id === 'jamaica'));

                  return (
                    <line
                      key={`${source.id}-${target.id}`}
                      x1={sourceCoords.x}
                      y1={sourceCoords.y}
                      x2={targetCoords.x}
                      y2={targetCoords.y}
                      stroke={
                        isCoreCovenantEdge
                          ? '#D4A359'
                          : isEdgeActive
                          ? '#2A3F35'
                          : '#B8C7B8'
                      }
                      strokeWidth={isCoreCovenantEdge ? 2.5 : isEdgeActive ? 2 : 1}
                      strokeDasharray={isCoreCovenantEdge ? undefined : isEdgeActive ? undefined : '3 3'}
                      opacity={isEdgeActive ? 0.9 : 0.4}
                    />
                  );
                });
              })}

              {/* ─── Chapter Satellites & Edges to People ─── */}
              {viewMode !== 'matrix' &&
                chapters.map((ch) => {
                  const chCoords = getCoordinates(ch.radius, ch.angleDeg);
                  const isChActive = isChapterHighlighted(ch.chapterNumber);

                  return (
                    <g key={`chapter-satellite-${ch.chapterNumber}`}>
                      {/* Lines from Chapter to its active entities */}
                      {isChActive &&
                        ch.activeEntityIds.map((entId) => {
                          const ent = entities.find((e) => e.id === entId);
                          if (!ent) return null;
                          const entCoords = getCoordinates(ent.radius, ent.angleDeg);
                          return (
                            <line
                              key={`ch-${ch.chapterNumber}-${ent.id}`}
                              x1={chCoords.x}
                              y1={chCoords.y}
                              x2={entCoords.x}
                              y2={entCoords.y}
                              stroke="#D4A359"
                              strokeWidth={selectedChapterNum === ch.chapterNumber ? 2 : 1}
                              strokeDasharray="2 4"
                              opacity={0.6}
                            />
                          );
                        })}

                      {/* Chapter Satellite Node */}
                      <g
                        className="cursor-pointer transition-transform duration-200"
                        onClick={() => {
                          setSelectedChapterNum(
                            selectedChapterNum === ch.chapterNumber ? null : ch.chapterNumber
                          );
                          if (onSelectChapter) onSelectChapter(ch.chapterNumber);
                        }}
                      >
                        <circle
                          cx={chCoords.x}
                          cy={chCoords.y}
                          r={selectedChapterNum === ch.chapterNumber ? 22 : 17}
                          fill={selectedChapterNum === ch.chapterNumber ? '#1B2E24' : '#FAF8F2'}
                          stroke="#D4A359"
                          strokeWidth={2}
                          className="transition-all"
                        />
                        <text
                          x={chCoords.x}
                          y={chCoords.y + 4}
                          textAnchor="middle"
                          className={`text-[11px] font-mono font-bold ${
                            selectedChapterNum === ch.chapterNumber ? 'fill-[#FAF8F2]' : 'fill-[#14241B]'
                          }`}
                        >
                          C{ch.chapterNumber}
                        </text>
                      </g>
                    </g>
                  );
                })}

              {/* ─── Central Covenant Medallion ─── */}
              <g
                className="cursor-pointer"
                onClick={() => {
                  setSelectedEntityId('god');
                  setSelectedChapterNum(null);
                }}
              >
                <circle
                  cx={centerCoord}
                  cy={centerCoord}
                  r={26}
                  fill="#1B2E24"
                  stroke="#D4A359"
                  strokeWidth={2.5}
                />
                <Cross className="w-5 h-5 text-[#D4A359]" />
                <text
                  x={centerCoord}
                  y={centerCoord + 4}
                  textAnchor="middle"
                  className="text-[9px] font-mono font-bold fill-[#D4A359] uppercase tracking-wider pointer-events-none"
                >
                  AGAPE
                </text>
              </g>

              {/* ─── People & Groups Radial Nodes ─── */}
              {filteredEntities.map((entity) => {
                const coords = getCoordinates(entity.radius, entity.angleDeg);
                const isSelected = selectedEntityId === entity.id;
                const isHovered = hoveredNodeId === entity.id;
                const isHighlighted = isEntityHighlighted(entity.id);

                return (
                  <g
                    key={entity.id}
                    className="cursor-pointer group"
                    onClick={() => {
                      setSelectedEntityId(entity.id);
                      setSelectedChapterNum(null);
                    }}
                    onMouseEnter={() => setHoveredNodeId(entity.id)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                  >
                    {/* Outer Glow Halo on Selection */}
                    {(isSelected || isHovered) && (
                      <circle
                        cx={coords.x}
                        cy={coords.y}
                        r={28}
                        fill={entity.lightBgColor}
                        stroke={entity.accentColor}
                        strokeWidth={1.5}
                        opacity={0.6}
                      />
                    )}

                    {/* Main Node Disc */}
                    <circle
                      cx={coords.x}
                      cy={coords.y}
                      r={isSelected ? 20 : 16}
                      fill={isSelected ? entity.accentColor : '#FFFFFF'}
                      stroke={entity.accentColor}
                      strokeWidth={isSelected ? 2.5 : 2}
                      opacity={isHighlighted ? 1 : 0.3}
                      className="transition-all duration-200"
                    />

                    {/* Node Center Icon / Initials */}
                    <foreignObject
                      x={coords.x - 10}
                      y={coords.y - 10}
                      width={20}
                      height={20}
                      className="pointer-events-none"
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        {renderIcon(
                          entity.iconType,
                          isSelected ? '#FFFFFF' : entity.accentColor,
                          'w-3.5 h-3.5'
                        )}
                      </div>
                    </foreignObject>

                    {/* Label Badge below node */}
                    <text
                      x={coords.x}
                      y={coords.y + 26}
                      textAnchor="middle"
                      className={`text-[10px] font-sans-ui font-semibold ${
                        isSelected ? 'fill-[#14241B] font-bold text-[11px]' : 'fill-[#2A3C30]'
                      } transition-all`}
                    >
                      {entity.shortName}
                    </text>
                  </g>
                );
              })}
            </motion.svg>
          </div>

          {/* Bottom helper label inside canvas */}
          <div className="w-full pt-2 border-t border-[#78966A]/20 flex flex-wrap items-center justify-between text-[11px] font-mono text-[#6A7B6D]">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#D4A359]" />
              <span>Center: Eccl 4:12 Divine Anchor</span>
            </div>
            <span>Click any person or C1–C7 chapter satellite to inspect details</span>
          </div>
        </div>

        {/* ─── Detail Side Drawer / Inspector Card ─── */}
        <div className="lg:col-span-4 rounded-3xl bg-white border-2 border-[#2A3F35]/30 shadow-lg p-5 sm:p-6 space-y-5">
          {/* Chapter Inspector (if chapter satellite selected) */}
          {selectedChapter && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#78966A]/20 pb-3">
                <span className="px-2.5 py-1 rounded-lg bg-[#FAF6E8] text-[#8F5A0E] border border-[#E5B26E]/40 text-xs font-mono font-bold">
                  Chapter {selectedChapter.chapterNumber} · {selectedChapter.date}
                </span>
                <button
                  onClick={() => setSelectedChapterNum(null)}
                  className="text-xs text-[#6A7B6D] hover:text-[#14241B] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <h4 className="text-lg font-display font-bold text-[#14241B]">
                  {selectedChapter.title}
                </h4>
                <p className="text-xs font-serif-body text-[#4A5D4E] italic mt-1">
                  {selectedChapter.subtitle}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF8F2] border border-[#78966A]/20 space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#6A7B6D] font-bold">
                  Central Narrative Theme:
                </span>
                <p className="text-xs font-sans-ui font-medium text-[#14241B]">
                  {selectedChapter.keyTheme}
                </p>
              </div>

              {/* People active in this chapter */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#14241B] font-bold flex items-center space-x-1.5">
                  <Users className="w-3.5 h-3.5 text-[#D4A359]" />
                  <span>People Active in Chapter {selectedChapter.chapterNumber}:</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedChapter.activeEntityIds.map((id) => {
                    const ent = entities.find((e) => e.id === id);
                    if (!ent) return null;
                    return (
                      <button
                        key={id}
                        onClick={() => {
                          setSelectedEntityId(id);
                          setSelectedChapterNum(null);
                        }}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white border border-[#78966A]/30 text-[#14241B] hover:bg-[#FAF6E8] cursor-pointer flex items-center space-x-1"
                      >
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: ent.accentColor }}
                        />
                        <span>{ent.shortName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quick Jump to Chapter Dialogue Button */}
              {onSelectChapter && (
                <button
                  onClick={() => onSelectChapter(selectedChapter.chapterNumber)}
                  className="w-full py-2.5 rounded-xl bg-[#2A3F35] hover:bg-[#1B2E24] text-white font-sans-ui font-bold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-sm"
                >
                  <BookOpen className="w-4 h-4 text-[#D4A359]" />
                  <span>Jump to Chapter {selectedChapter.chapterNumber} Dialogue Logs</span>
                </button>
              )}
            </div>
          )}

          {/* Entity Inspector (if person/group selected) */}
          {!selectedChapter && selectedEntity && (
            <div className="space-y-4">
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-[#78966A]/20 pb-3">
                <div className="flex items-center space-x-2">
                  <div
                    className="p-2 rounded-xl"
                    style={{ backgroundColor: selectedEntity.lightBgColor }}
                  >
                    {renderIcon(selectedEntity.iconType, selectedEntity.accentColor, 'w-4 h-4')}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#6A7B6D] block">
                      Orbit Tier {selectedEntity.orbitTier} · {selectedEntity.category.toUpperCase()}
                    </span>
                    <h4 className="text-base sm:text-lg font-display font-bold text-[#14241B] leading-tight">
                      {selectedEntity.name}
                    </h4>
                  </div>
                </div>
              </div>

              {/* Role & Description */}
              <div className="space-y-2">
                <p className="text-xs font-mono font-medium text-[#8F5A0E] bg-[#FAF6E8] p-2 rounded-lg border border-[#E5B26E]/40">
                  {selectedEntity.role}
                </p>
                <p className="text-xs font-serif-body text-[#2A3C30] leading-relaxed">
                  {selectedEntity.description}
                </p>
              </div>

              {/* Chronicle Influence */}
              <div className="p-3 rounded-xl bg-[#FAF8F2] border border-[#78966A]/20 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#6A7B6D] font-bold">
                  Role in the Chronicle:
                </span>
                <p className="text-xs font-sans-ui text-[#2A3C30] italic">
                  {selectedEntity.relationToChronicle}
                </p>
              </div>

              {/* Key Concept Chips */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#6A7B6D] font-bold">
                  Core Architectural Concepts:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedEntity.keyPhrases.map((phrase, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-[#FAF6E8] text-[#8F5A0E] border border-[#E5B26E]/30 text-[11px] font-mono"
                    >
                      {phrase}
                    </span>
                  ))}
                </div>
              </div>

              {/* Dialogue Quotes from Entries */}
              {selectedEntity.keyQuotes.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#14241B] font-bold flex items-center space-x-1">
                    <MessageCircle className="w-3 h-3 text-[#D4A359]" />
                    <span>Documented Words in the Chronicle:</span>
                  </span>
                  <div className="space-y-2">
                    {selectedEntity.keyQuotes.map((q, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-white border border-[#78966A]/30 text-[11px] space-y-1 shadow-2xs"
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono text-[#6A7B6D]">
                          <span className="font-bold text-[#14241B]">{q.speaker}</span>
                          <span>Ch. {q.chapter}</span>
                        </div>
                        <p className="font-serif-body italic text-[#2A3C30]">
                          "{q.text}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Chapters Where This Person Appears */}
              <div className="space-y-2 pt-1 border-t border-[#78966A]/20">
                <span className="text-[11px] font-mono text-[#6A7B6D] uppercase font-bold">
                  Active in Chapters ({selectedEntity.activeChapters.length}/7):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedEntity.activeChapters.map((chNum) => (
                    <button
                      key={chNum}
                      onClick={() => {
                        setSelectedChapterNum(chNum);
                        if (onSelectChapter) onSelectChapter(chNum);
                      }}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#FAF8F2] hover:bg-[#2A3F35] hover:text-white border border-[#78966A]/30 transition-all cursor-pointer"
                    >
                      Chapter {chNum}
                    </button>
                  ))}
                </div>
              </div>

              {/* Master Full Reading Action */}
              {masterEntry && onSelectEntry && (
                <button
                  onClick={() => onSelectEntry(masterEntry)}
                  className="w-full py-2.5 rounded-xl bg-[#D4A359] hover:bg-[#C29147] text-[#14241B] font-sans-ui font-bold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-sm mt-2"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Open Full Chronicle of Grace & Loyalty</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ─── View Mode: Connection Matrix Tab ─── */}
      {viewMode === 'matrix' && (
        <div className="rounded-3xl bg-white border-2 border-[#2A3F35]/30 shadow-md p-6 space-y-4">
          <div className="flex items-center space-x-2 border-b border-[#78966A]/20 pb-3">
            <Layers className="w-5 h-5 text-[#D4A359]" />
            <h4 className="text-base font-display font-bold text-[#14241B]">
              Person-to-Chapter Presence & Involvement Matrix
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-[#2A3F35]/30 bg-[#FAF8F2]">
                  <th className="py-2.5 px-3 font-bold text-[#14241B]">Identified Person / Group</th>
                  <th className="py-2.5 px-2 font-bold text-[#14241B] text-center">Orbit</th>
                  {chapters.map((ch) => (
                    <th key={ch.chapterNumber} className="py-2.5 px-2 font-bold text-[#14241B] text-center">
                      Ch. {ch.chapterNumber}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#78966A]/20">
                {entities.map((ent) => (
                  <tr
                    key={ent.id}
                    onClick={() => {
                      setSelectedEntityId(ent.id);
                      setSelectedChapterNum(null);
                    }}
                    className={`hover:bg-[#FAF6E8] cursor-pointer transition-colors ${
                      selectedEntityId === ent.id ? 'bg-[#FAF3E0] font-bold' : ''
                    }`}
                  >
                    <td className="py-2.5 px-3 flex items-center space-x-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: ent.accentColor }}
                      />
                      <span className="text-[#14241B]">{ent.name}</span>
                    </td>
                    <td className="py-2.5 px-2 text-center text-[#6A7B6D]">
                      T{ent.orbitTier}
                    </td>
                    {chapters.map((ch) => {
                      const isActive = ent.activeChapters.includes(ch.chapterNumber);
                      return (
                        <td key={ch.chapterNumber} className="py-2.5 px-2 text-center">
                          {isActive ? (
                            <span className="inline-block w-4 h-4 rounded-full bg-[#2A3F35] text-white text-[9px] font-bold leading-4">
                              ✓
                            </span>
                          ) : (
                            <span className="text-[#D0DDD0]">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
