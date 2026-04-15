import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Library() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    // Fetch combined library and translations
    fetch('/api/translations')
      .then(r => r.json())
      .then(data => {
        setEntries(data.map(d => ({
          type: 'Translation',
          title: d.source_text.slice(0, 15) + '...',
          content: d.translated_text,
          date: d.created_at
        })));
      })
      .catch(e => console.error(e));
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-hidden bg-background font-body text-on-surface">
      <div className="absolute inset-0 z-0 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAS6ADwHDtonXUv9-SpxpKMRc6kioQnjWXCoZ-PuHrwmzOwZAQRoMzdLk-LHvliTcAS-Hqaz4ej-fQW7AVuxwgZea6PiOwfdfYlBMlMxDYraAk0RSat5lPRzPDqWm6GQazTT2Flg5M7j9U7fqdwKdDDYqGrOj-pquu1L9v1IQQthjmmdFyABgOf960DWpj0lh9Qt8z9QSmXxFSSKcDDceYCxu_MY_RRVJVRYEVHosCrK0kVNCuE-vCzmFteHYiZEIPYJFI8M6hVQCQD')"}}></div>
      <div className="absolute inset-0 z-10 bg-white/40 backdrop-blur-[2px]"></div>

      <div className="relative z-20 flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-white/20 px-10 py-4 backdrop-blur-md bg-white/20">
          <Link to="/" className="flex items-center gap-4 text-[var(--color-primary)]">
            <h2 className="font-headline text-xl font-bold tracking-tight">Kotoba</h2>
          </Link>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link to="/translate" className="text-on-surface hover:text-[var(--color-primary)] transition-colors">Translator</Link>
              <Link to="/library" className="text-[var(--color-primary)] border-b-2 border-primary-fixed-dim pb-1">Library</Link>
            </nav>
            <div className="flex items-center gap-4">
              <Link to="/login" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/50 backdrop-blur-sm text-[var(--color-primary)] transition-all hover:bg-white/80">
                <span className="material-symbols-outlined">settings</span>
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 px-10 py-12 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 flex flex-col items-start gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] opacity-70">Archive Collection</span>
              <h1 className="font-headline text-5xl font-bold text-[var(--color-primary)] tracking-tight editoral-shadow">Library Archive</h1>
              <p className="mt-2 text-on-surface-variant max-w-md">Your collection of translations, brush-strokes, and ancient manuscripts preserved in the moonlit study.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {entries.map((item, idx) => (
                <div key={idx} className="glass-card group flex flex-col p-6 rounded-xl transition-all cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-3xl font-headline text-[var(--color-primary)]">{item.title}</span>
                    <span className="text-[10px] font-bold uppercase tracking-tighter bg-white/40 px-2 py-1 rounded">{item.type}</span>
                  </div>
                  <p className="text-sm text-on-surface-variant line-clamp-3 italic mb-6">"{item.content}"</p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-[10px] text-on-surface-variant font-medium">{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}

              <div className="border-2 border-dashed border-white/40 flex flex-col items-center justify-center p-6 rounded-xl hover:bg-white/20 transition-all cursor-pointer group">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[var(--color-primary)]">add</span>
                </div>
                <p className="text-sm font-bold text-on-surface-variant group-hover:text-[var(--color-primary)] transition-colors">New Manuscript</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
