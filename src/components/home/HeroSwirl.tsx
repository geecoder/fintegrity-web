import styles from './HeroSwirl.module.css'

/**
 * Layer 1 of the home hero — the ribbon swirl. Built exactly to
 * HERO-SPEC.md §3: masked SVG container, four gradients, two blur
 * filters, four shared cubic paths, six groups in a fixed draw order
 * (bloom → green solid+dash → blue solid+dash → ochre → navy undertone
 * → travelling particle). Transform and stroke-dashoffset only — no
 * animated gradients, filters, path data, or dimensions.
 */
export default function HeroSwirl() {
  return (
    <div className={styles.container} aria-hidden="true">
      <svg
        className={styles.svg}
        viewBox="0 0 900 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="fgR1" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#0E9F6E" />
            <stop offset="52%" stopColor="#3DDCA0" />
            <stop offset="100%" stopColor="#7FE3C8" />
          </linearGradient>
          <linearGradient id="fgR2" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#2FA5B8" />
            <stop offset="60%" stopColor="#4C7CE0" />
            <stop offset="100%" stopColor="#8FB4FF" />
          </linearGradient>
          <linearGradient id="fgR3" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#F0A93C" />
            <stop offset="55%" stopColor="#FFC94A" />
            <stop offset="100%" stopColor="#FFE49B" />
          </linearGradient>
          <linearGradient id="fgR4" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#0A1F44" />
            <stop offset="100%" stopColor="#2FA5B8" />
          </linearGradient>
          <filter id="fgSoft" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="26" />
          </filter>
          <filter id="fgSoft2" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="9" />
          </filter>
        </defs>

        {/* Group 1 — bloom pass. Sits under everything else. */}
        <g filter="url(#fgSoft)" opacity=".55">
          <path
            d="M-120 880 C 180 760 240 470 520 340 C 720 248 840 168 980 60"
            fill="none" stroke="url(#fgR1)" strokeWidth="176" strokeLinecap="round"
            className={styles.drift1}
          />
          <path
            d="M-160 1010 C 240 900 300 560 640 430 C 820 362 900 250 1020 150"
            fill="none" stroke="url(#fgR2)" strokeWidth="150" strokeLinecap="round"
            className={styles.drift2}
          />
          <path
            d="M-60 700 C 220 620 300 330 560 190 C 700 114 820 70 960 -20"
            fill="none" stroke="url(#fgR3)" strokeWidth="120" strokeLinecap="round"
            className={styles.drift3}
          />
        </g>

        {/* Group 2 — green ribbon, solid + paper-coloured streaming dash. */}
        <g className={styles.drift1}>
          <path
            d="M-120 880 C 180 760 240 470 520 340 C 720 248 840 168 980 60"
            fill="none" stroke="url(#fgR1)" strokeWidth="78" strokeLinecap="round" opacity=".92"
          />
          <path
            d="M-120 880 C 180 760 240 470 520 340 C 720 248 840 168 980 60"
            fill="none" stroke="#FFFDFA" strokeWidth="10" strokeLinecap="round"
            opacity=".5" strokeDasharray="26 60" className={styles.dashFast}
          />
        </g>

        {/* Group 3 — blue ribbon, solid + its own dash (out of phase with green). */}
        <g className={styles.drift2}>
          <path
            d="M-160 1010 C 240 900 300 560 640 430 C 820 362 900 250 1020 150"
            fill="none" stroke="url(#fgR2)" strokeWidth="56" strokeLinecap="round" opacity=".9"
          />
          <path
            d="M-160 1010 C 240 900 300 560 640 430 C 820 362 900 250 1020 150"
            fill="none" stroke="#FFFDFA" strokeWidth="8" strokeLinecap="round"
            opacity=".45" strokeDasharray="18 74" className={styles.dashSlow}
          />
        </g>

        {/* Group 4 — ochre ribbon. No dash. */}
        <g className={styles.drift3}>
          <path
            d="M-60 700 C 220 620 300 330 560 190 C 700 114 820 70 960 -20"
            fill="none" stroke="url(#fgR3)" strokeWidth="44" strokeLinecap="round" opacity=".88"
          />
        </g>

        {/* Group 5 — navy undertone, alternate-reverse so it never syncs with the others. */}
        <g className={styles.drift2Reverse}>
          <path
            d="M-40 1080 C 300 980 420 700 700 620 C 850 576 940 520 1040 470"
            fill="none" stroke="url(#fgR4)" strokeWidth="26" strokeLinecap="round" opacity=".5"
          />
        </g>

        {/* Group 6 — the travelling particle, blurred, drifting with the green ribbon.
            Hidden under reduced motion: its animateMotion is SMIL, which the CSS
            prefers-reduced-motion override can't reach, so it's hidden explicitly
            rather than left floating motionless off-path. */}
        <g opacity=".9" className={`${styles.drift1} ${styles.particle}`} filter="url(#fgSoft2)">
          <circle r="9" fill="#FFFDFA">
            <animateMotion
              dur="7s" repeatCount="indefinite"
              path="M-120 880 C 180 760 240 470 520 340 C 720 248 840 168 980 60"
            />
          </circle>
        </g>
      </svg>
    </div>
  )
}
