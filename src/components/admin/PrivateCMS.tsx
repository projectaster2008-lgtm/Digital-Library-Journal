import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PenTool, Save, X, Plus, Sparkles, Check, Download, Upload, Bookmark, BookOpen, Scroll } from 'lucide-react';
import { ArchiveEntry, EntryType, MoodType } from '../../types';

interface PrivateCMSProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveEntry: (entry: ArchiveEntry) => void;
  existingEntries: ArchiveEntry[];
}

export const PrivateCMS: React.FC<PrivateCMSProps> = ({
  isOpen,
  onClose,
  onSaveEntry,
  existingEntries,
}) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<EntryType>('journal');
  const [mood, setMood] = useState<MoodType>('Peaceful');
  const [scriptureRef, setScriptureRef] = useState('');
  const [scriptureVerseText, setScriptureVerseText] = useState('');
  const [openingThought, setOpeningThought] = useState('');
  const [lesson, setLesson] = useState('');
  const [prayer, setPrayer] = useState('');
  const [topicsInput, setTopicsInput] = useState('');
  const [content, setContent] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const dateObj = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const parsedTopics = topicsInput
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);

    const newEntry: ArchiveEntry = {
      id: `entry-${Date.now()}`,
      slug: title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      status: 'PUBLISHED',
      title: title.trim(),
      type,
      date: dateObj.toISOString().slice(0, 10),
      year: dateObj.getFullYear(),
      month: months[dateObj.getMonth()],
      day: dateObj.getDate(),
      excerpt: content.slice(0, 160) + '...',
      content: content.trim(),
      scriptures: scriptureRef ? [scriptureRef.trim()] : [],
      scriptureVerseText: scriptureVerseText.trim() || undefined,
      topics: parsedTopics.length > 0 ? parsedTopics : ['faith', 'reflections'],
      mood,
      readingTimeMinutes: Math.max(1, Math.ceil(content.split(' ').length / 180)),
      openingThought: openingThought.trim() || undefined,
      lesson: lesson.trim() || undefined,
      prayer: prayer.trim() || undefined,
    };

    onSaveEntry(newEntry);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1200);
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(existingEntries, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `archive-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0B0B0A]/90 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="w-full max-w-3xl rounded-3xl bg-[#141310] border border-[#C9A96E]/30 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between border-b border-[#C9A96E]/15 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-[#C9A96E]/10 border border-[#C9A96E]/30 flex items-center justify-center text-[#C9A96E]">
              <PenTool className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xl font-display text-[#F4F0E8]">The Writer's Desk</h2>
              <p className="text-[11px] text-[#918B80] font-mono uppercase tracking-wider">
                Private Journal Inscription
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleExportJSON}
              className="px-2.5 py-1 rounded-lg text-xs font-mono text-[#918B80] hover:text-[#E8E1D5] hover:bg-[#1C1A17] flex items-center space-x-1.5 border border-[#C9A96E]/15"
              title="Export all writings as JSON backup"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Backup Archive</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[#918B80] hover:text-[#F4F0E8] hover:bg-[#1C1A17]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          {/* Title and Type */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-[10px] font-mono uppercase tracking-widest text-[#C9A96E]">
                Writing Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., The Peace of Letting Go..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0B0A] border border-[#C9A96E]/20 text-sm text-[#F4F0E8] focus:outline-none focus:border-[#C9A96E]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase tracking-widest text-[#C9A96E]">
                Compartment Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as EntryType)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#0B0B0A] border border-[#C9A96E]/20 text-xs text-[#F4F0E8] focus:outline-none focus:border-[#C9A96E]"
              >
                <option value="journal">Journal Chronicle</option>
                <option value="devotional">Sacred Devotional</option>
                <option value="reflection">Philosophical Reflection</option>
                <option value="letter">Letter / Epistolary</option>
              </select>
            </div>
          </div>

          {/* Devotional specific inputs: Scripture & Verse */}
          {type === 'devotional' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-[#0B0B0A]/60 border border-[#C9A96E]/15">
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-widest text-[#C9A96E]">
                  Scripture Reference (e.g. Psalm 27:14)
                </label>
                <input
                  type="text"
                  value={scriptureRef}
                  onChange={(e) => setScriptureRef(e.target.value)}
                  placeholder="e.g., Psalm 27:14"
                  className="w-full px-3 py-2 rounded-lg bg-[#141310] border border-[#C9A96E]/20 text-xs text-[#F4F0E8] focus:outline-none focus:border-[#C9A96E]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-widest text-[#C9A96E]">
                  Scripture Text Verse
                </label>
                <input
                  type="text"
                  value={scriptureVerseText}
                  onChange={(e) => setScriptureVerseText(e.target.value)}
                  placeholder="e.g., Wait for the LORD; be strong and take heart..."
                  className="w-full px-3 py-2 rounded-lg bg-[#141310] border border-[#C9A96E]/20 text-xs text-[#F4F0E8] focus:outline-none focus:border-[#C9A96E]"
                />
              </div>
            </div>
          )}

          {/* Mood & Topics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase tracking-widest text-[#C9A96E]">
                Atmospheric Mood
              </label>
              <select
                value={mood}
                onChange={(e) => setMood(e.target.value as MoodType)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#0B0B0A] border border-[#C9A96E]/20 text-xs text-[#F4F0E8] focus:outline-none focus:border-[#C9A96E]"
              >
                <option value="Peaceful">Peaceful</option>
                <option value="Difficult">Difficult</option>
                <option value="Hopeful">Hopeful</option>
                <option value="Uncertain">Uncertain</option>
                <option value="Grateful">Grateful</option>
                <option value="Contemplative">Contemplative</option>
                <option value="Vulnerable">Vulnerable</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase tracking-widest text-[#C9A96E]">
                Archive Tags (comma separated)
              </label>
              <input
                type="text"
                value={topicsInput}
                onChange={(e) => setTopicsInput(e.target.value)}
                placeholder="faith, waiting, discipline, surrender..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0B0A] border border-[#C9A96E]/20 text-xs text-[#F4F0E8] focus:outline-none focus:border-[#C9A96E]"
              />
            </div>
          </div>

          {/* Body Content */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono uppercase tracking-widest text-[#C9A96E]">
              Writing Body (Markdown / Paragraphs)
            </label>
            <textarea
              required
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Begin writing your chronicle or devotional reflection..."
              className="w-full px-4 py-3 rounded-xl bg-[#0B0B0A] border border-[#C9A96E]/20 text-sm sm:text-base font-serif-body text-[#E8E1D5] leading-relaxed focus:outline-none focus:border-[#C9A96E]"
            />
          </div>

          {/* Lesson and Prayer optional fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase tracking-widest text-[#C9A96E]">
                Personal Lesson / Application
              </label>
              <input
                type="text"
                value={lesson}
                onChange={(e) => setLesson(e.target.value)}
                placeholder="What did this season teach you?"
                className="w-full px-3 py-2 rounded-lg bg-[#0B0B0A] border border-[#C9A96E]/20 text-xs text-[#F4F0E8] focus:outline-none focus:border-[#C9A96E]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase tracking-widest text-[#C9A96E]">
                Sanctuary Prayer
              </label>
              <input
                type="text"
                value={prayer}
                onChange={(e) => setPrayer(e.target.value)}
                placeholder="Lord, teach me to..."
                className="w-full px-3 py-2 rounded-lg bg-[#0B0B0A] border border-[#C9A96E]/20 text-xs text-[#F4F0E8] focus:outline-none focus:border-[#C9A96E]"
              />
            </div>
          </div>

          {/* Footer Save Button */}
          <div className="pt-4 border-t border-[#C9A96E]/15 flex items-center justify-between">
            <span className="text-[11px] font-mono text-[#918B80]">
              Persists securely into your personal browser archive.
            </span>

            <button
              type="submit"
              disabled={isSaved}
              className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-[#C9A96E] hover:bg-[#D4B47B] text-[#0B0B0A] text-xs font-bold font-sans-ui uppercase tracking-wider transition-all shadow-lg cursor-pointer"
            >
              {isSaved ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Inscribed into Archive!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Publish to Archive</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
