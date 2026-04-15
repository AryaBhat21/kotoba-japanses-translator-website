import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SplashAnimation from '../components/SplashAnimation';

export default function LandingPage() {
  const [showSplash, setShowSplash] = useState(true);

  // Custom cursor
  useEffect(() => {
    const cursor = document.getElementById('cursor');
    if (!cursor) return;
    const handleMouseMove = (e) => {
      cursor.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`;
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container">
      {showSplash && (
        <SplashAnimation onComplete={() => setShowSplash(false)} />
      )}

      {/* Backgrounds */}
      <div className="bg-landscape"></div>
      <div className="custom-cursor" id="cursor"></div>

      <div className="sakura-container">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[var(--color-primary)] rounded-full blur-[120px]"></div>
          <div class="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[var(--color-secondary)] rounded-full blur-[150px]"></div>
        </div>
      </div>

      {/* Navbar (Minimal Brand Only) */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-3 bg-white/40 backdrop-blur-3xl rounded-full mt-6 mx-auto w-[90%] max-w-5xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-white/40">
        <div className="flex items-center gap-8">
          <span className="text-2xl font-serif italic text-[var(--color-primary)] drop-shadow-sm">Kotoba</span>
          <div className="hidden md:flex gap-6 items-center">
            <Link to="/translate" className="text-[var(--color-primary)] font-bold border-b border-[var(--color-primary)]/50 pb-1 font-sans tracking-wide text-xs">Translate</Link>
            <Link to="/library" className="text-on-surface/70 hover:text-[var(--color-primary)] transition-colors duration-500 font-sans tracking-wide text-xs hover:bg-white/40 hover:backdrop-blur-3xl p-1 px-2 rounded-sm">Library</Link>
            <Link to="/login" className="text-on-surface/70 hover:text-[var(--color-primary)] transition-colors duration-500 font-sans tracking-wide text-xs hover:bg-white/40 hover:backdrop-blur-3xl p-1 px-2 rounded-sm">Scholar</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-[var(--color-primary)] hover:scale-110 transition-all duration-300">
            <span className="material-symbols-outlined">account_circle</span>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6">
        <div className="relative mb-8 mt-24">
          <span className="absolute -top-12 -left-16 text-[var(--color-primary)]/40 font-headline italic text-4xl select-none">こんにちは</span>
          <h1 className="font-headline italic text-7xl md:text-9xl text-[var(--color-primary)] glow-text tracking-tight mb-4">Kotoba</h1>
          <p className="font-body text-[var(--color-primary)]/90 text-lg md:text-2xl tracking-[0.3em] uppercase drop-shadow-md">Interactive Japanese Translator</p>
        </div>

        <div className="mt-16">
          <Link to="/translate" className="group relative px-12 py-4 bg-white/60 backdrop-blur-3xl rounded-full border border-[var(--color-primary)]/30 transition-all duration-500 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.1)] cta-glow hover:border-[var(--color-primary)]/40 inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/0 via-[var(--color-primary)]/5 to-[var(--color-primary)]/0 group-hover:translate-x-full transition-transform duration-1000"></div>
            <span className="relative font-label tracking-widest text-[var(--color-primary)] uppercase text-sm font-semibold">Enter Experience</span>
            <div className="absolute -bottom-1 left-0 right-0 h-1 bg-[var(--color-primary)]/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </Link>
        </div>
      </main>

      {/* Features */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-32 space-y-24">
        <div className="text-center space-y-6">
          <h2 className="font-headline italic text-5xl md:text-6xl text-on-surface leading-tight drop-shadow-sm">
            Wisdom Beyond <span className="text-[var(--color-primary)] glow-text">Vocabulary.</span>
          </h2>
          <p className="text-on-surface font-body leading-relaxed mx-auto max-w-2xl text-lg md:text-xl drop-shadow-sm">
            Kotoba isn't just a dictionary; it is a linguistic companion. We bridge the gap between literal translation and cultural nuance through an atmospheric, scholarly interface.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <div className="h-[1px] w-12 bg-[var(--color-primary)] self-center"></div>
            <span className="font-label text-xs uppercase tracking-widest text-[var(--color-primary)] font-medium">The Moonlit Scholar</span>
            <div className="h-[1px] w-12 bg-[var(--color-primary)] self-center"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { tag: 'auto_awesome', title: 'Nuance Detection', desc: 'Automatically identifies honorifics, regional dialects, and emotional subtext in every sentence.', mt: false },
            { tag: 'menu_book', title: 'Context Library', desc: 'A curated archive of literary excerpts and classical texts to deepen your linguistic journey.', mt: true },
            { tag: 'brush', title: 'Stroke Analysis', desc: 'Interactive kanji decomposition that reveals the history and etymology of every character.', mt: false },
          ].map((f, i) => (
            <div key={i} className={`glass-panel p-10 rounded-full border border-[var(--color-primary)]/20 space-y-4 hover:bg-white/80 transition-all duration-500 hover:-translate-y-2 text-center shadow-sm ${f.mt ? 'md:mt-12' : ''}`}>
              <span className="material-symbols-outlined text-[var(--color-primary)] text-3xl">{f.tag}</span>
              <h3 className="font-headline text-2xl text-on-surface">{f.title}</h3>
              <p className="text-sm text-on-surface/80 leading-relaxed font-medium">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 w-full flex flex-col items-center gap-4 py-16 bg-white/10 backdrop-blur-md">
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-[var(--color-primary)]/40 to-transparent mb-4"></div>
        <div className="flex gap-12">
          <Link to="#" className="text-on-surface/80 hover:text-[var(--color-primary)] transition-colors font-sans text-[10px] uppercase tracking-[0.2em] font-bold">Privacy</Link>
          <Link to="#" className="text-on-surface/80 hover:text-[var(--color-primary)] transition-colors font-sans text-[10px] uppercase tracking-[0.2em] font-bold">Terms</Link>
          <Link to="#" className="text-on-surface/80 hover:text-[var(--color-primary)] transition-colors font-sans text-[10px] uppercase tracking-[0.2em] font-bold">Discord</Link>
        </div>
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[var(--color-primary)] font-bold mt-4">
            © 2024 Kotoba — The Moonlit Scholar.
        </p>
      </footer>
    </div>
  );
}
