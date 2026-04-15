import { useState, useEffect } from 'react'
import './SplashAnimation.css'

const letters = [
  { char: 'K', jp: '言', delay: 0 },
  { char: 'o', jp: '葉', delay: 0.08 },
  { char: 't', jp: 'の', delay: 0.16 },
  { char: 'o', jp: '道', delay: 0.24 },
  { char: 'b', jp: '筆', delay: 0.32 },
  { char: 'a', jp: '墨', delay: 0.40 },
]

// Random spread positions for each letter
const spreads = [
  { x: -320, y: -200, r: -45, s: 0.3 },
  { x: 280, y: -280, r: 30, s: 0.2 },
  { x: -200, y: 300, r: 60, s: 0.4 },
  { x: 350, y: 180, r: -25, s: 0.25 },
  { x: -380, y: 100, r: 50, s: 0.35 },
  { x: 200, y: -150, r: -55, s: 0.3 },
]

export default function SplashAnimation({ onComplete }) {
  const [phase, setPhase] = useState('spread')     // spread → gather → glow → fade
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Phase 1: Letters are spread (initial state, brief pause)
    const t1 = setTimeout(() => setPhase('gather'), 400)
    // Phase 2: Letters gather to center (animation takes ~1.2s)
    const t2 = setTimeout(() => setPhase('glow'), 1800)
    // Phase 3: Glow + subtitle reveal (hold for ~1s)
    const t3 = setTimeout(() => setPhase('fade'), 3000)
    // Phase 4: Fade out entire splash
    const t4 = setTimeout(() => {
      setVisible(false)
      onComplete?.()
    }, 3700)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [onComplete])

  if (!visible) return null

  return (
    <div className={`splash ${phase === 'fade' ? 'fadeOut' : ''}`}>
      {/* Ambient particles */}
      <div className="particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="particle"
            style={{
              '--px': `${Math.random() * 100}%`,
              '--py': `${Math.random() * 100}%`,
              '--delay': `${Math.random() * 2}s`,
              '--size': `${2 + Math.random() * 4}px`,
              '--duration': `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Background kanji ghosts */}
      <div className="ghost-kanji">
        {letters.map((l, i) => (
          <span
            key={`ghost-${i}`}
            className={`ghost ${phase !== 'spread' ? 'ghost-visible' : ''}`}
            style={{
              '--gdelay': `${i * 0.12}s`,
              left: `${15 + i * 14}%`,
              top: `${30 + (i % 2 === 0 ? -8 : 8)}%`,
            }}
          >
            {l.jp}
          </span>
        ))}
      </div>

      {/* Main logo letters */}
      <div className="logo-wrap">
        {letters.map((l, i) => {
          const spread = spreads[i]
          return (
            <span
              key={i}
              className={`letter ${phase !== 'spread' ? 'gathered' : ''} ${phase === 'glow' || phase === 'fade' ? 'glowing' : ''}`}
              style={{
                '--spread-x': `${spread.x}px`,
                '--spread-y': `${spread.y}px`,
                '--spread-r': `${spread.r}deg`,
                '--spread-s': spread.s,
                '--delay': `${l.delay}s`,
              }}
            >
              {l.char}
            </span>
          )
        })}
      </div>

      {/* Subtitle */}
      <div className={`subtitle ${phase === 'glow' || phase === 'fade' ? 'subtitle-visible' : ''}`}>
        <span className="subtitle-line" />
        <span className="subtitle-text">The Moonlit Scholar</span>
        <span className="subtitle-line" />
      </div>

      {/* Sakura bloom ring */}
      <div className={`bloom-ring ${phase === 'glow' || phase === 'fade' ? 'bloom-visible' : ''}`} />
    </div>
  )
}
