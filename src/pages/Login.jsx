import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) {
        window.location.href = '/translate';
      }
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen selection:bg-primary-fixed selection:text-on-primary-fixed overflow-x-hidden">
      {/* Cinematic Background */}
      <div className="fixed inset-0 z-0 bg-black/60">
        <img className="w-full h-full object-cover grayscale-[20%] contrast-[110%] brightness-[90%]" alt="Cinematic misty mountain landscape" src="https://lh3.googleusercontent.com/aida/ADBb0ujKrws3sqCMMSa33i2CSHPfZKj6lv9aojpf3pUYK88wwvo6P-nHvA4eBvC9MDzQ-HW8VqzP_56OmC-LPXO6H9hZRwUO3aiSm2UEduAh_QKe7nzkrLjfgjXoreYZDcM-LJ4N1tekz84Xg81hQT8H32iycstprFNj3FaDFQ4OSD8WrCfQZ4oxt9sYzB1AgtRh3pXtdMan3-lycA6VIT_KgNPabntOV8ZUmGgeznrvax68kN-VythlxZA_OvYG"/>
        <div className="absolute inset-0 bg-gradient-to-tr from-surface/40 via-transparent to-primary-container/20"></div>
      </div>

      {/* Floating Petal Decorations (Simulated via spans) */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        <span className="absolute material-symbols-outlined text-primary-fixed-dim text-xs top-[20%] left-[10%] opacity-40">filter_vintage</span>
        <span className="absolute material-symbols-outlined text-primary-fixed-dim text-sm top-[60%] left-[80%] opacity-30">filter_vintage</span>
        <span className="absolute material-symbols-outlined text-primary-fixed-dim text-[10px] top-[15%] left-[70%] opacity-50">filter_vintage</span>
        <span className="absolute material-symbols-outlined text-primary-fixed-dim text-sm top-[85%] left-[30%] opacity-20">filter_vintage</span>
      </div>

      {/* Navigation Shell (Minimal Brand Only) */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-12 h-24">
        <Link to="/" className="text-2xl font-headline italic text-on-primary drop-shadow-[0_0_12px_rgba(251,179,193,0.3)] select-none">
          Kotoba
        </Link>
        <div className="hidden md:flex gap-8 items-center">
          <span className="text-on-primary/70 text-xs tracking-widest uppercase font-label">The Digital Sanctuary</span>
        </div>
      </header>

      {/* Main Content: Login Form */}
      <main className="relative z-20 flex min-h-screen items-center justify-center p-6">
        <div className="glass-panel w-full max-w-md p-10 md:p-14 rounded-xl shadow-2xl transition-all duration-500 hover:shadow-primary-fixed-dim/10 bg-surface/10">
          <div className="text-center mb-10">
            <h1 className="font-headline text-3xl md:text-4xl text-[var(--color-primary)] text-glow mb-3 leading-tight tracking-tight">
              Welcome back, Scholar.
            </h1>
            <p className="text-on-surface-variant/80 text-sm font-label tracking-wide">
              Your path to mastery awaits in the quiet.
            </p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-1 group">
              <label className="text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold ml-1" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <input 
                  className="w-full bg-surface-container-lowest/40 border-0 border-b border-outline-variant/30 px-4 py-3 text-on-surface focus:ring-0 focus:border-primary-fixed-dim transition-all duration-300 placeholder:text-outline/50 outline-none" 
                  id="email" 
                  placeholder="scholar@kotoba.jp" 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-1 group">
              <div className="flex justify-between items-center">
                <label className="text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold ml-1" htmlFor="password">
                  Password
                </label>
                <a className="text-[10px] uppercase tracking-widest text-on-primary-fixed-variant hover:text-primary-fixed-dim transition-colors" href="#">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <input 
                  className="w-full bg-surface-container-lowest/40 border-0 border-b border-outline-variant/30 px-4 py-3 text-on-surface focus:ring-0 focus:border-primary-fixed-dim transition-all duration-300 placeholder:text-outline/50 outline-none" 
                  id="password" 
                  placeholder="••••••••" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="pt-4">
              <button 
                className="w-full bg-[var(--color-primary)] text-on-primary font-label text-sm uppercase tracking-[0.2em] py-4 rounded-lg neon-btn-glow transform transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] active:scale-95" 
                type="submit"
              >
                Login
              </button>
            </div>
          </form>

          <div className="mt-12 text-center">
            <p className="text-xs text-on-surface-variant/70 font-label">
              New to the sanctuary? 
              <a className="text-[var(--color-primary)] font-semibold hover:text-primary-fixed-dim transition-colors ml-1" href="#">
                Create an account
              </a>
            </p>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 w-full z-50 py-8 px-12 flex justify-between items-end pointer-events-none">
        <div className="text-[9px] uppercase tracking-[0.3em] text-on-primary/40 font-label">
            © 2024 Kotoba Japanese Translator
        </div>
        <div className="flex gap-6 pointer-events-auto">
          <a className="text-[9px] uppercase tracking-[0.3em] text-on-primary/60 hover:text-on-primary transition-all" href="#">Privacy</a>
          <a className="text-[9px] uppercase tracking-[0.3em] text-on-primary/60 hover:text-on-primary transition-all" href="#">Terms</a>
        </div>
      </footer>

      <div className="fixed inset-0 z-[5] pointer-events-none bg-[radial-gradient(circle_at_20%_30%,rgba(251,179,193,0.05)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(197,197,216,0.05)_0%,transparent_50%)]"></div>
    </div>
  );
}
