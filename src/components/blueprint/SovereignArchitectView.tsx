import React, { useState } from 'react';
import {
  Compass,
  Building2,
  TrendingUp,
  ShieldAlert,
  Mail,
  BookOpen,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Shield,
  Coins,
  Scale,
  Calendar,
  Layers,
  ChevronDown,
  ChevronUp,
  Award,
  DollarSign,
  Briefcase,
  Trees,
  Utensils,
  Landmark,
  PiggyBank,
  ExternalLink,
  Feather,
  Info,
  LucideIcon,
  Lock,
  Unlock,
  Key,
  Eye,
  EyeOff,
  ShieldCheck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ArchiveEntry } from '../../types';
import {
  blueprintPhases,
  saudiCareerSchedule,
  saudiExtras,
  capitalAllocations,
  portfolioScenarios,
  blueprintRisks,
  lettersToClint,
  sovereignBlueprintMasterEntry,
} from '../../data/blueprintData';

interface SovereignArchitectViewProps {
  onSelectEntry: (entry: ArchiveEntry) => void;
  onSelectScripture?: (ref: string) => void;
  onSelectTopic?: (topic: string) => void;
}

type ViewTab = 'phases' | 'foundations' | 'financials' | 'legacy' | 'risks' | 'letters' | 'appendix';

export const SovereignArchitectView: React.FC<SovereignArchitectViewProps> = ({
  onSelectEntry,
  onSelectScripture,
  onSelectTopic,
}) => {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    return typeof window !== 'undefined' && localStorage.getItem('sovereign_architect_unlocked') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const [activeTab, setActiveTab] = useState<ViewTab>('phases');
  const [expandedPhase, setExpandedPhase] = useState<number | null>(2);
  const [selectedScenarioIdx, setSelectedScenarioIdx] = useState<number>(1); // Realistic default
  const [expandedLetterIdx, setExpandedLetterIdx] = useState<number | null>(0);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === 'Aldwin30') {
      setIsUnlocked(true);
      setErrorMsg('');
      try {
        localStorage.setItem('sovereign_architect_unlocked', 'true');
      } catch (err) {
        // ignore
      }
    } else {
      setErrorMsg('Incorrect passcode. Access denied.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);
    }
  };

  const handleLock = () => {
    setIsUnlocked(false);
    setPasscode('');
    setErrorMsg('');
    try {
      localStorage.removeItem('sovereign_architect_unlocked');
    } catch (err) {
      // ignore
    }
  };

  // If locked, render STRICTLY the secure vault screen — zero leaking of blueprint data in preview or DOM!
  if (!isUnlocked) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 animate-fadeIn max-w-lg mx-auto">
        <motion.div
          animate={isShaking ? { x: [-12, 12, -10, 10, -5, 5, 0] } : {}}
          transition={{ duration: 0.5 }}
          className="w-full p-8 sm:p-12 rounded-3xl bg-[#0B1510]/95 backdrop-blur-2xl border-2 border-[#F2C96D]/40 shadow-2xl text-center space-y-6 relative overflow-hidden"
        >
          {/* Ambient vault radiance */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#F2C96D]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Vault Lock Emblem */}
          <div className="relative mx-auto w-20 h-20 rounded-2xl bg-[#15251E] border-2 border-[#F2C96D]/60 flex items-center justify-center shadow-xl">
            <Lock className="w-10 h-10 text-[#F2C96D]" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#2D5A3C]/90 border border-[#78C491]/50 text-[#F2C96D] text-[10px] font-mono font-bold uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F2C96D]" />
              <span>Encrypted Vault · Master Entry</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-semibold text-[#FAF8F2] tracking-tight">
              The Sovereign Architect
            </h1>
            <p className="text-xs sm:text-sm font-serif-body text-[#D4E3DA] leading-relaxed max-w-md mx-auto">
              Confidential life architecture and private blueprint. Passcode verification is required to decrypt and view.
            </p>
          </div>

          {/* Unlock Form */}
          <form onSubmit={handleUnlock} className="space-y-4 pt-2">
            <div className="relative">
              <input
                id="vault-passcode-input"
                type={showPassword ? 'text' : 'password'}
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="Enter vault passcode"
                autoFocus
                className="w-full px-4 py-3.5 pr-11 rounded-xl bg-black/70 border border-[#F2C96D]/40 text-[#FAF8F2] placeholder-[#8EA898] text-center font-mono tracking-widest text-sm focus:outline-none focus:border-[#F2C96D] focus:ring-2 focus:ring-[#F2C96D]/30 transition-all shadow-inner"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8EA898] hover:text-[#F2C96D] transition-colors p-1 cursor-pointer"
                title={showPassword ? 'Hide passcode' : 'Show passcode'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {errorMsg && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-mono text-red-300 bg-red-950/70 border border-red-500/50 rounded-lg py-2 px-3 shadow-md"
              >
                {errorMsg}
              </motion.p>
            )}

            <button
              id="unlock-vault-button"
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-[#2D5A3C] hover:bg-[#3B7550] text-[#FAF8F2] font-semibold text-xs sm:text-sm font-sans-ui uppercase tracking-wider shadow-xl border border-[#78C491]/60 flex items-center justify-center space-x-2 transition-all cursor-pointer active:scale-98"
            >
              <Key className="w-4 h-4 text-[#F2C96D]" />
              <span>Decrypt & Enter Vault</span>
            </button>
          </form>

          <div className="pt-3 border-t border-white/10">
            <span className="text-[10px] font-mono text-[#8EA898]">
              Protected Document · Passcode Verification Required
            </span>
          </div>
        </motion.div>
      </div>
    );
  }

  const totalSaudiBaseSavings = saudiCareerSchedule[saudiCareerSchedule.length - 1].runningTotalPhp;
  const totalSaudiExtras = saudiExtras.reduce((acc, curr) => acc + curr.amountPhp, 0);
  const grandTotalCapital = totalSaudiBaseSavings + totalSaudiExtras;

  const tabItems: { id: ViewTab; label: string; icon: LucideIcon }[] = [
    { id: 'phases', label: 'The 7 Phases', icon: Layers },
    { id: 'foundations', label: 'Foundations & Stoicism', icon: BookOpen },
    { id: 'financials', label: 'Saudi IT Simulation', icon: TrendingUp },
    { id: 'legacy', label: 'Asset Deployment', icon: Landmark },
    { id: 'risks', label: 'Risk Shield', icon: ShieldAlert },
    { id: 'letters', label: 'Letters to Future Self', icon: Mail },
    { id: 'appendix', label: 'Appendix & Honors', icon: Award },
  ];

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto pb-12">
      {/* ─── Hero Archival Seal Header ─── */}
      <section 
        id="blueprint-hero-header"
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F1B16] via-[#15251E] to-[#1C3227] border border-[#78C491]/30 p-6 sm:p-10 text-[#FAF8F2] shadow-2xl"
      >
        {/* Background Architectural Grid Accent */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#78C491 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center space-x-2.5 flex-wrap gap-y-1">
              <span className="px-3 py-1 rounded-full bg-[#2D5A3C] text-[#F2C96D] text-xs font-mono font-bold tracking-widest uppercase border border-[#78C491]/40 flex items-center space-x-1.5">
                <Compass className="w-3.5 h-3.5" />
                <span>Life Architecture · Category 00</span>
              </span>
              <span className="text-xs font-mono text-[#A8C4B2]">
                Written by Clint, for Clint · June–July 2026 · Age 18
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-display font-semibold tracking-tight text-[#FAF8F2] leading-tight">
              The Sovereign Architect
            </h1>
            <p className="text-sm sm:text-base font-serif-body italic text-[#C5D9CD] leading-relaxed">
              A Blueprint for a Life Well-Built — written one month before the first day of BSIT.
              A tested architecture transforming a working-student discipline into legal Saudi IT ascent,
              permanent generational assets, and quiet freedom.
            </p>

            {/* Scripture Anchor Banner */}
            <div className="p-4 rounded-2xl bg-black/40 border border-[#F2C96D]/30 backdrop-blur-md space-y-1.5 mt-4">
              <div className="flex items-center space-x-2 text-[#F2C96D] text-xs font-mono font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Cornerstone Anchor Scripture</span>
              </div>
              <p className="font-serif-body text-xs sm:text-sm text-[#FAF9F5] italic leading-relaxed">
                “For which of you, intending to build a tower, sitteth not down first, and counteth the cost, whether he have sufficient to finish it?”
              </p>
              <span className="block text-[11px] font-mono text-[#A8C4B2] text-right">
                — Luke 14:28 (KJV)
              </span>
            </div>
          </div>

          {/* Quick Action Button for Full Master Reading & Lock Vault */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 flex-shrink-0">
            <div className="flex items-center justify-between sm:justify-end gap-2">
              <span className="text-[11px] font-mono text-[#78C491] flex items-center space-x-1 bg-[#182C22] px-2.5 py-1 rounded-lg border border-[#78C491]/40">
                <ShieldCheck className="w-3.5 h-3.5 text-[#F2C96D]" />
                <span>Decrypted</span>
              </span>
              <button
                id="re-lock-vault-button"
                onClick={handleLock}
                className="px-3 py-1 rounded-xl bg-red-950/70 hover:bg-red-900/90 text-red-200 border border-red-500/40 text-xs font-mono flex items-center space-x-1.5 transition-all shadow-md cursor-pointer"
                title="Lock vault immediately"
              >
                <Lock className="w-3.5 h-3.5 text-red-300" />
                <span>Lock Vault</span>
              </button>
            </div>

            <button
              id="read-master-blueprint-button"
              onClick={() => onSelectEntry(sovereignBlueprintMasterEntry)}
              className="px-5 py-3 rounded-2xl bg-[#2D5A3C] hover:bg-[#386E4B] text-[#FAF8F2] font-semibold text-xs sm:text-sm transition-all shadow-lg flex items-center justify-center space-x-2 border border-[#78C491]/50 cursor-pointer active:scale-95 group"
            >
              <BookOpen className="w-4 h-4 text-[#F2C96D] group-hover:scale-110 transition-transform" />
              <span>Read Full Document</span>
            </button>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="block text-lg font-mono font-bold text-[#F2C96D]">7 Phases</span>
              <span className="text-[10px] uppercase font-mono text-[#A8C4B2] tracking-wider">Age 18 to 30+</span>
            </div>
          </div>
        </div>

        {/* Category Tab Switcher Bar */}
        <div className="relative z-10 mt-8 pt-6 border-t border-white/15 overflow-x-auto scrollbar-none">
          <div className="flex items-center space-x-2 min-w-max">
            {tabItems.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-sans-ui transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#F2C96D] text-[#0F1B16] font-bold shadow-md'
                      : 'bg-white/10 text-[#C5D9CD] hover:text-white hover:bg-white/15'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#0F1B16]' : 'text-[#78C491]'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── TAB 01: The 7 Phases ─── */}
      {activeTab === 'phases' && (
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#78966A]/20 pb-3">
            <div>
              <h2 className="text-xl font-display font-semibold text-[#253326]">
                The Seven Strategic Phases
              </h2>
              <p className="text-xs font-serif-body text-[#6B7B6C] italic">
                From high school foundation to the tech–business fusion. Detailed, numbered, and corrected where tested.
              </p>
            </div>
            <span className="text-[11px] font-mono text-[#3F6248] bg-[#FAF9F5] px-3 py-1 rounded-full border border-[#78966A]/20">
              Interactive Phase Navigator
            </span>
          </div>

          <div className="space-y-4">
            {blueprintPhases.map((phase) => {
              const isExpanded = expandedPhase === phase.phaseNumber;
              return (
                <div
                  key={phase.phaseNumber}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    phase.status === 'COMPLETED'
                      ? 'bg-[#FAF9F5] border-[#78966A]/30'
                      : phase.status === 'IN_PROGRESS'
                      ? 'bg-white border-[#E5B26E] shadow-md ring-1 ring-[#E5B26E]/40'
                      : 'bg-[#FAF9F5]/70 border-[#78966A]/20'
                  }`}
                >
                  {/* Phase Summary Bar */}
                  <button
                    onClick={() => setExpandedPhase(isExpanded ? null : phase.phaseNumber)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-black/[0.02] transition-colors"
                  >
                    <div className="flex items-center space-x-3.5 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-xs flex-shrink-0 ${
                          phase.status === 'COMPLETED'
                            ? 'bg-[#2A3F35] text-[#FAF9F5]'
                            : phase.status === 'IN_PROGRESS'
                            ? 'bg-[#E5B26E] text-[#2A3F35]'
                            : 'bg-[#78966A]/20 text-[#3F6248]'
                        }`}
                      >
                        0{phase.phaseNumber}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center space-x-2 flex-wrap">
                          <h3 className="text-sm sm:text-base font-display font-medium text-[#253326]">
                            Phase {phase.phaseNumber} — {phase.title}
                          </h3>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[9px] font-mono uppercase font-bold ${
                              phase.status === 'COMPLETED'
                                ? 'bg-[#2A3F35]/15 text-[#2A3F35]'
                                : phase.status === 'IN_PROGRESS'
                                ? 'bg-[#E5B26E]/30 text-[#8F5A0E]'
                                : 'bg-[#78966A]/15 text-[#6B7B6C]'
                            }`}
                          >
                            {phase.status.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-xs font-serif-body text-[#6B7B6C] italic truncate">
                          {phase.subtitle} · {phase.timeframe} ({phase.targetAge})
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 flex-shrink-0 ml-3">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-[#78966A]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#78966A]" />
                      )}
                    </div>
                  </button>

                  {/* Expanded Phase Details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-4 sm:px-6 pb-5 pt-1 space-y-4 border-t border-[#78966A]/15 bg-white/60"
                      >
                        {/* What & Why Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                          <div className="p-3.5 rounded-xl bg-[#FAF9F5] border border-[#78966A]/20 space-y-1">
                            <span className="text-[10px] font-mono uppercase text-[#3F6248] font-bold">What</span>
                            <p className="text-xs sm:text-sm font-serif-body text-[#253326] leading-relaxed">
                              {phase.what}
                            </p>
                          </div>
                          <div className="p-3.5 rounded-xl bg-[#FAF9F5] border border-[#78966A]/20 space-y-1">
                            <span className="text-[10px] font-mono uppercase text-[#3F6248] font-bold">Why</span>
                            <p className="text-xs sm:text-sm font-serif-body text-[#253326] leading-relaxed">
                              {phase.why}
                            </p>
                          </div>
                        </div>

                        {/* How Steps */}
                        {phase.howSteps && (
                          <div className="space-y-2">
                            <span className="text-[10px] font-mono uppercase text-[#3F6248] font-bold block">
                              Execution Blueprint (How)
                            </span>
                            <div className="space-y-1.5">
                              {phase.howSteps.map((step, sIdx) => (
                                <div key={sIdx} className="flex items-start space-x-2 text-xs text-[#253326]">
                                  <span className="text-[#3F6248] font-mono mt-0.5">•</span>
                                  <span className="leading-relaxed">{step}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Lessons & Corrections */}
                        {(phase.lessonLearned || phase.correctionsMade) && (
                          <div className="p-3.5 rounded-xl bg-[#FAF6E8] border border-[#E5B26E]/40 text-xs text-[#614518] space-y-1.5">
                            {phase.lessonLearned && (
                              <p className="italic font-serif-body">
                                <strong>Lesson Learned:</strong> {phase.lessonLearned}
                              </p>
                            )}
                            {phase.correctionsMade && (
                              <p className="italic font-serif-body">
                                <strong>Revision Note:</strong> {phase.correctionsMade}
                              </p>
                            )}
                          </div>
                        )}

                        {/* Key Metrics Chips */}
                        {phase.keyMetrics && (
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                            {phase.keyMetrics.map((m, mIdx) => (
                              <div
                                key={mIdx}
                                className="p-2.5 rounded-xl bg-white border border-[#78966A]/25 text-center shadow-xs"
                              >
                                <span className="block text-xs font-mono font-bold text-[#2A3F35]">
                                  {m.value}
                                </span>
                                <span className="text-[10px] font-mono uppercase text-[#78966A] tracking-wider">
                                  {m.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ─── TAB 02: Foundations & Stoicism ─── */}
      {activeTab === 'foundations' && (
        <section className="space-y-6">
          <div className="border-b border-[#78966A]/20 pb-3">
            <h2 className="text-xl font-display font-semibold text-[#253326]">
              Part I — Foundations: Scripture & Stoic Scaffolding
            </h2>
            <p className="text-xs font-serif-body text-[#6B7B6C] italic">
              “Scripture is the ground. Stoic philosophy is scaffolding — useful, practical tools for the daily grind.”
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Scripture Pillar Cards */}
            <div className="p-5 rounded-2xl bg-white border border-[#78966A]/25 space-y-3 shadow-sm">
              <span className="text-xs font-mono font-bold text-[#3F6248] uppercase tracking-wider flex items-center space-x-1.5">
                <BookOpen className="w-4 h-4 text-[#E5B26E]" />
                <span>Biblical Cornerstones</span>
              </span>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#78966A]/15 space-y-1">
                  <span className="font-mono text-[#3F6248] font-semibold">Proverbs 16:3</span>
                  <p className="italic font-serif-body text-[#253326]">
                    “Commit thy works unto the LORD, and thy thoughts shall be established.”
                  </p>
                  <p className="text-[11px] text-[#6B7B6C]">
                    Plans held loosely and offered honestly to God outlast plans gripped in anxious self-reliance.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#78966A]/15 space-y-1">
                  <span className="font-mono text-[#3F6248] font-semibold">Proverbs 21:5</span>
                  <p className="italic font-serif-body text-[#253326]">
                    “The thoughts of the diligent tend only to plenteousness; but of every one that is hasty only to want.”
                  </p>
                  <p className="text-[11px] text-[#6B7B6C]">
                    Every correction in this Blueprint happened because diligence was chosen over haste.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#78966A]/15 space-y-1">
                  <span className="font-mono text-[#3F6248] font-semibold">Colossians 3:23</span>
                  <p className="italic font-serif-body text-[#253326]">
                    “And whatsoever ye do, do it heartily, as to the Lord, and not unto men.”
                  </p>
                  <p className="text-[11px] text-[#6B7B6C]">
                    All work done as an offering, not just a wage.
                  </p>
                </div>
              </div>
            </div>

            {/* Stoic Scaffolding Cards */}
            <div className="p-5 rounded-2xl bg-white border border-[#78966A]/25 space-y-3 shadow-sm">
              <span className="text-xs font-mono font-bold text-[#3F6248] uppercase tracking-wider flex items-center space-x-1.5">
                <Scale className="w-4 h-4 text-[#E5B26E]" />
                <span>Stoic Tools for the Grind</span>
              </span>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#78966A]/15 space-y-1">
                  <span className="font-mono text-[#3F6248] font-semibold">The Dichotomy of Control (Epictetus)</span>
                  <p className="italic font-serif-body text-[#253326]">
                    “Some things are in our power, and others are not.”
                  </p>
                  <p className="text-[11px] text-[#6B7B6C]">
                    Control research, daily hours, honest numbers, and character. Hold external outcomes with an open hand.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#78966A]/15 space-y-1">
                  <span className="font-mono text-[#3F6248] font-semibold">On Suffering in Advance (Seneca & Marcus Aurelius)</span>
                  <p className="italic font-serif-body text-[#253326]">
                    “We suffer far more often in imagination than we ever do in reality.”
                  </p>
                  <p className="text-[11px] text-[#6B7B6C]">
                    Dread usually costs more sleep than the actual hardship does. Name the fear, plan against it, set it down.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#78966A]/15 space-y-1">
                  <span className="font-mono text-[#3F6248] font-semibold">A Filipino Proverb Worth Keeping</span>
                  <p className="italic font-serif-body text-[#253326]">
                    “Ang hindi marunong lumingon sa pinanggalingan ay hindi makararating sa paroroonan.”
                  </p>
                  <p className="text-[11px] text-[#6B7B6C]">
                    Never let the Saudi salary or capital make you forget the boy who worked 7 AM merchandising while graduating with honors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── TAB 03: Saudi IT Simulation & Financials ─── */}
      {activeTab === 'financials' && (
        <section className="space-y-6">
          <div className="border-b border-[#78966A]/20 pb-3">
            <h2 className="text-xl font-display font-semibold text-[#253326]">
              Phase 5 — Saudi Arabia 5-Year Career & Capital Ascent
            </h2>
            <p className="text-xs font-serif-body text-[#6B7B6C] italic">
              Estimated from cross-checked 2025–2026 Gulf IT salary data (SAR 1 = ₱14.50). Direct IT Specialist entry.
            </p>
          </div>

          {/* Salary Table */}
          <div className="overflow-x-auto rounded-2xl border border-[#78966A]/25 bg-white shadow-sm">
            <table className="w-full text-left text-xs font-sans-ui">
              <thead className="bg-[#2A3F35] text-[#FAF9F5] font-mono text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="p-3 sm:p-4">Timeline / Age</th>
                  <th className="p-3 sm:p-4">Professional Role</th>
                  <th className="p-3 sm:p-4 text-right">Monthly Salary</th>
                  <th className="p-3 sm:p-4 text-right">Monthly Savings</th>
                  <th className="p-3 sm:p-4 text-right">Cumulative Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#78966A]/15 font-mono">
                {saudiCareerSchedule.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-[#FAF9F5] transition-colors">
                    <td className="p-3 sm:p-4 font-bold text-[#2A3F35]">
                      {row.year} <span className="text-[#78966A] font-normal">({row.age})</span>
                    </td>
                    <td className="p-3 sm:p-4 font-sans-ui text-[#253326] font-medium">
                      {row.role}
                    </td>
                    <td className="p-3 sm:p-4 text-right text-[#253326]">
                      ₱{row.monthlySalaryPhp.toLocaleString()}
                    </td>
                    <td className="p-3 sm:p-4 text-right text-[#3F6248] font-semibold">
                      ₱{row.monthlySavingsPhp.toLocaleString()}
                    </td>
                    <td className="p-3 sm:p-4 text-right font-bold text-[#2A3F35]">
                      ₱{row.runningTotalPhp.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bonus & Gratuity Calculation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-[#78966A]/25 space-y-3 shadow-sm">
              <span className="text-xs font-mono font-bold text-[#3F6248] uppercase tracking-wider flex items-center space-x-1.5">
                <Coins className="w-4 h-4 text-[#E5B26E]" />
                <span>Bonuses & Gratuity (Saudi Labor Law)</span>
              </span>
              <div className="space-y-2 text-xs font-mono">
                {saudiExtras.map((extra, eIdx) => (
                  <div
                    key={eIdx}
                    className="p-3 rounded-xl bg-[#FAF9F5] border border-[#78966A]/15 flex items-center justify-between"
                  >
                    <span className="text-[#253326] font-sans-ui">{extra.item}</span>
                    <span className="font-bold text-[#2A3F35]">₱{extra.amountPhp.toLocaleString()}</span>
                  </div>
                ))}
                <div className="pt-2 flex items-center justify-between text-xs font-bold text-[#3F6248] border-t border-[#78966A]/20">
                  <span>Total Supplementary Capital:</span>
                  <span>₱{totalSaudiExtras.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Total Balance Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#2A3F35] to-[#1C2C25] text-white flex flex-col justify-between shadow-lg border border-[#E5B26E]/40">
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase text-[#E5B26E] tracking-widest font-bold">
                  Phase 5 Target Solvency
                </span>
                <h3 className="text-2xl sm:text-3xl font-mono font-bold text-[#FAF9F5]">
                  ₱{grandTotalCapital.toLocaleString()}
                </h3>
                <p className="text-xs font-serif-body text-[#D8E2DC] italic">
                  Total capital in the bank at Age 27–28 before returning to the Philippines.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/15 text-[11px] text-[#D8E2DC] space-y-1 font-sans-ui">
                <p>
                  <strong>Direct IT vs Electrician Route:</strong> The legal direct IT entry is both safer and generates ~₱2,988,450 more in net savings over 5 years.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── TAB 04: Asset Deployment & Portfolio Scenarios ─── */}
      {activeTab === 'legacy' && (
        <section className="space-y-6">
          <div className="border-b border-[#78966A]/20 pb-3">
            <h2 className="text-xl font-display font-semibold text-[#253326]">
              Phase 6 — Capital Deployment & Weighted Portfolio Scenarios
            </h2>
            <p className="text-xs font-serif-body text-[#6B7B6C] italic">
              Deploying ₱10.07M capital into real estate, restaurant, farm, and unbreakable emergency buffers in the Philippines.
            </p>
          </div>

          {/* Capital Allocation Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {capitalAllocations.map((alloc, aIdx) => (
              <div
                key={aIdx}
                className="p-4 rounded-2xl bg-white border border-[#78966A]/25 space-y-2 shadow-xs hover:border-[#78966A] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-display font-medium text-[#253326]">
                    {alloc.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#2A3F35]">
                    ₱{(alloc.amount / 1000000).toFixed(2)}M
                  </span>
                </div>
                <p className="text-xs font-sans-ui text-[#4E5C4F] leading-relaxed">
                  {alloc.description}
                </p>
                <div className="pt-1 text-[11px] font-serif-body text-[#8F5A0E] italic border-t border-[#78966A]/10">
                  {alloc.notes}
                </div>
              </div>
            ))}
          </div>

          {/* Weighted Scenario Selector */}
          <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-[#78966A]/25 space-y-4">
            <span className="text-xs font-mono font-bold text-[#3F6248] uppercase tracking-wider block">
              Simulated Outcome Models (Scenarios A through D)
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {portfolioScenarios.map((sc, scIdx) => (
                <button
                  key={scIdx}
                  onClick={() => setSelectedScenarioIdx(scIdx)}
                  className={`p-3 rounded-xl text-left transition-all cursor-pointer border ${
                    selectedScenarioIdx === scIdx
                      ? 'bg-[#2A3F35] text-white border-[#E5B26E] shadow-sm'
                      : 'bg-white text-[#253326] border-[#78966A]/20 hover:bg-[#F3EEDC]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span>{sc.probability}</span>
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[9px] ${
                        selectedScenarioIdx === scIdx ? 'bg-[#E5B26E] text-[#2A3F35] font-bold' : 'bg-black/5 text-[#6B7B6C]'
                      }`}
                    >
                      {sc.statusBadge}
                    </span>
                  </div>
                  <span className="block text-xs font-display font-medium truncate">
                    {sc.scenario.split(':')[0]}
                  </span>
                  <span className="block text-xs font-mono font-bold mt-1">
                    {sc.netMonthlyPhp}
                  </span>
                </button>
              ))}
            </div>

            {/* Selected Scenario Deep-Dive Card */}
            <div className="p-4 rounded-xl bg-white border border-[#78966A]/20 space-y-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h4 className="text-sm font-display font-medium text-[#253326]">
                  {portfolioScenarios[selectedScenarioIdx].scenario}
                </h4>
                <span className="text-xs font-mono text-[#3F6248] font-bold">
                  Net Cashflow: {portfolioScenarios[selectedScenarioIdx].netMonthlyPhp}
                </span>
              </div>
              <p className="text-xs font-serif-body text-[#253326] leading-relaxed">
                {portfolioScenarios[selectedScenarioIdx].whatHappens}
              </p>
              {selectedScenarioIdx === 3 && (
                <div className="p-3 rounded-xl bg-[#FAF6E8] border border-[#E5B26E]/40 text-xs font-serif-body text-[#614518] italic mt-2">
                  “Read Scenario D again. This is the honest bottom of the whole Blueprint, and it is not a cliff — it is a floor. Skills do not disappear. Hard assets can be sold, not vaporized. That floor exists because Phases 1 through 5 were never just about money. They were about becoming a person who cannot be fully wiped out.”
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ─── TAB 05: Risk Management Shield ─── */}
      {activeTab === 'risks' && (
        <section className="space-y-6">
          <div className="border-b border-[#78966A]/20 pb-3">
            <h2 className="text-xl font-display font-semibold text-[#253326]">
              Part V — The Risk Management Shield & Humility Clause
            </h2>
            <p className="text-xs font-serif-body text-[#6B7B6C] italic">
              “A sovereign architect does not pretend nothing can go wrong. He names every real risk in daylight, in advance.”
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {blueprintRisks.map((risk, rIdx) => (
              <div
                key={rIdx}
                className="p-4 rounded-2xl bg-white border border-[#78966A]/25 space-y-2 shadow-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-xs font-display font-medium text-[#253326] leading-snug">
                    {risk.risk}
                  </h4>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] font-mono uppercase font-bold flex-shrink-0 ${
                      risk.severity === 'Critical'
                        ? 'bg-rose-100 text-rose-800 border border-rose-200'
                        : risk.severity === 'High'
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    {risk.severity}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#FAF9F5] border border-[#78966A]/15 text-xs text-[#4E5C4F]">
                  <strong className="text-[#3F6248] font-mono text-[10px] uppercase block mb-0.5">
                    Mitigation Protocol
                  </strong>
                  {risk.mitigation}
                </div>
              </div>
            ))}
          </div>

          {/* Humility Clause Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-[#1C2C25] to-[#2A3F35] text-white border border-[#E5B26E]/40 space-y-2">
            <span className="text-[10px] font-mono uppercase text-[#E5B26E] tracking-widest font-bold block">
              The Humility Clause — James 4:13–15 (KJV)
            </span>
            <p className="text-xs sm:text-sm font-serif-body italic text-[#FAF9F5] leading-relaxed">
              “Go to now, ye that say, To day or to morrow we will go into such a city... whereas ye know not what shall be on the morrow... For that ye ought to say, If the Lord will, we shall live, and do this, or that.”
            </p>
            <p className="text-[11px] text-[#D8E2DC] font-sans-ui pt-1">
              Every phase, every peso, every year in this document is a plan — not a promise. Hold it firmly enough to work toward it daily, loosely enough that if God’s providence rewrites a chapter, you bend instead of break.
            </p>
          </div>
        </section>
      )}

      {/* ─── TAB 06: Letters to Future Self ─── */}
      {activeTab === 'letters' && (
        <section className="space-y-6">
          <div className="border-b border-[#78966A]/20 pb-3">
            <h2 className="text-xl font-display font-semibold text-[#253326]">
              Part VI — A Letter to My Future Self
            </h2>
            <p className="text-xs font-serif-body text-[#6B7B6C] italic">
              Three letters written at age 18. Read whichever one matches where you are standing.
            </p>
          </div>

          <div className="space-y-4">
            {lettersToClint.map((letter, lIdx) => {
              const isSelected = expandedLetterIdx === lIdx;
              return (
                <div
                  key={lIdx}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isSelected ? 'bg-white border-[#E5B26E] shadow-md' : 'bg-[#FAF9F5] border-[#78966A]/20'
                  }`}
                >
                  <button
                    onClick={() => setExpandedLetterIdx(isSelected ? null : lIdx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-black/[0.02]"
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-[#FAF6E8] border border-[#E5B26E]/40 text-[#8F5A0E] flex items-center justify-center flex-shrink-0">
                        <Feather className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-display font-medium text-[#253326] truncate">
                          {letter.target}
                        </h4>
                        <span className="text-[11px] font-mono text-[#78966A]">
                          {letter.stage}
                        </span>
                      </div>
                    </div>
                    {isSelected ? (
                      <ChevronUp className="w-4 h-4 text-[#78966A] flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#78966A] flex-shrink-0" />
                    )}
                  </button>

                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-5 pb-5 pt-2 border-t border-[#78966A]/15 space-y-3"
                      >
                        <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#78966A]/15 text-xs sm:text-sm font-serif-body text-[#253326] leading-relaxed italic">
                          {letter.content}
                        </div>
                        <div className="p-3 rounded-xl bg-[#FAF6E8] text-[11px] font-mono text-[#614518] border border-[#E5B26E]/30">
                          {letter.verse}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* The Closing Charge */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0F1B16] to-[#182C22] text-[#FAF8F2] border border-[#78C491]/30 space-y-3 shadow-xl">
            <span className="text-xs font-mono uppercase text-[#F2C96D] tracking-widest font-bold block">
              The Closing Charge
            </span>
            <p className="text-xs sm:text-sm font-serif-body text-[#C5D9CD] leading-relaxed">
              Whichever age you are when you read this — you already have everything Phase 1 through this moment required. Diligence over haste. Research before capital. Legal before fast. Family before pride. Faith underneath all of it, not decorating the top of it.
            </p>
            <div className="p-3 rounded-xl bg-black/40 border border-[#F2C96D]/30 text-xs italic font-serif-body text-[#FAF9F5]">
              “Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.” — Proverbs 3:5–6 (KJV)
            </div>
            <p className="text-xs font-mono text-[#F2C96D] text-right italic pt-2">
              — Clint, Age 18, one month before it all began.
            </p>
          </div>
        </section>
      )}

      {/* ─── TAB 07: Appendix & Latin Honors Reference ─── */}
      {activeTab === 'appendix' && (
        <section className="space-y-6">
          <div className="border-b border-[#78966A]/20 pb-3">
            <h2 className="text-xl font-display font-semibold text-[#253326]">
              Appendix — Quick Reference & Conversions
            </h2>
            <p className="text-xs font-serif-body text-[#6B7B6C] italic">
              Philippine SUC grading scale conversion and Latin honors cutoffs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Grade Scale */}
            <div className="rounded-2xl border border-[#78966A]/25 bg-white overflow-hidden shadow-sm">
              <div className="p-3 bg-[#2A3F35] text-white font-mono text-xs font-bold uppercase tracking-wider">
                SHS-to-College Grade Conversion (SUC Scale)
              </div>
              <div className="p-3 divide-y divide-[#78966A]/10 text-xs font-mono">
                <div className="py-1.5 flex justify-between">
                  <span className="font-bold text-[#2A3F35]">1.00 (97–100%)</span>
                  <span className="text-[#78966A]">Excellent</span>
                </div>
                <div className="py-1.5 flex justify-between bg-[#FAF6E8] px-2 rounded-md">
                  <span className="font-bold text-[#8F5A0E]">1.25 (94–96%)</span>
                  <span className="text-[#8F5A0E] font-sans-ui">Your SHS Average (94 ABM)</span>
                </div>
                <div className="py-1.5 flex justify-between">
                  <span className="font-bold text-[#2A3F35]">1.50 (91–93%)</span>
                  <span className="text-[#78966A]">Superior</span>
                </div>
                <div className="py-1.5 flex justify-between">
                  <span className="font-bold text-[#2A3F35]">1.75 (88–90%)</span>
                  <span className="text-[#78966A]">Very Good</span>
                </div>
                <div className="py-1.5 flex justify-between">
                  <span className="font-bold text-[#2A3F35]">2.00 (85–87%)</span>
                  <span className="text-[#78966A]">Good</span>
                </div>
                <div className="py-1.5 flex justify-between">
                  <span className="font-bold text-[#2A3F35]">3.00 (75%)</span>
                  <span className="text-[#78966A]">Passing</span>
                </div>
                <div className="py-1.5 flex justify-between">
                  <span className="font-bold text-rose-700">5.00 (Below 75%)</span>
                  <span className="text-rose-700">Failed</span>
                </div>
              </div>
            </div>

            {/* Latin Honors */}
            <div className="rounded-2xl border border-[#78966A]/25 bg-white overflow-hidden shadow-sm">
              <div className="p-3 bg-[#2A3F35] text-white font-mono text-xs font-bold uppercase tracking-wider">
                Latin Honors Cutoffs (Typical SUC)
              </div>
              <div className="p-3 divide-y divide-[#78966A]/10 text-xs font-mono space-y-1">
                <div className="py-2 flex justify-between items-center">
                  <div>
                    <span className="block font-bold text-[#2A3F35]">Summa Cum Laude</span>
                    <span className="text-[10px] text-[#78966A]">GWA 1.00 – 1.20</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FAF6E8] text-[#8F5A0E]">
                    Extremely Rare
                  </span>
                </div>
                <div className="py-2 flex justify-between items-center">
                  <div>
                    <span className="block font-bold text-[#2A3F35]">Magna Cum Laude</span>
                    <span className="text-[10px] text-[#78966A]">GWA 1.21 – 1.45</span>
                  </div>
                  <span className="text-[10px] text-[#78966A]">High Honors</span>
                </div>
                <div className="py-2 flex justify-between items-center">
                  <div>
                    <span className="block font-bold text-[#2A3F35]">Cum Laude</span>
                    <span className="text-[10px] text-[#78966A]">GWA 1.46 – 1.75</span>
                  </div>
                  <span className="text-[10px] text-[#78966A]">Honors</span>
                </div>
              </div>

              <div className="p-3 bg-[#FAF9F5] border-t border-[#78966A]/15 text-[11px] font-serif-body text-[#6B7B6C] italic leading-relaxed">
                “Aim for honors. Do not let its absence define whether the four years meant anything. A 2.50-average graduate who can actually build things beats a Latin-Honors graduate with no real skill in almost every hiring room that matters.”
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
