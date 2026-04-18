interface Props {
  title: string
  subtitle?: string
  className?: string
  aspectRatio?: '16/9' | '4/3' | '1/1'
}

const gradients: [string, string][] = [
  ['#4f46e5', '#7c3aed'],
  ['#0ea5e9', '#6366f1'],
  ['#10b981', '#0ea5e9'],
  ['#f59e0b', '#ef4444'],
  ['#8b5cf6', '#ec4899'],
  ['#06b6d4', '#3b82f6'],
  ['#6366f1', '#10b981'],
  ['#f97316', '#f59e0b'],
]

function pickGradient(title: string): [string, string] {
  const sum = title.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return gradients[sum % gradients.length]
}

function truncate(str: string, max: number) {
  return str.length > max ? str.slice(0, max - 1) + '…' : str
}

export default function BrandedPlaceholder({ title, subtitle, className = '', aspectRatio = '16/9' }: Props) {
  const [from, to] = pickGradient(title)

  // Collision-safe: use btoa for unique ID even with same first chars
  const gradId = `grad-${btoa(encodeURIComponent(title)).replace(/[^a-zA-Z0-9]/g, '').slice(0, 12)}`

  const paddingMap = { '16/9': '56.25%', '4/3': '75%', '1/1': '100%' }
  const padding = paddingMap[aspectRatio]

  const displayTitle = truncate(title, 40)
  const words = displayTitle.split(' ')
  const mid = Math.ceil(words.length / 2)
  const line1 = words.slice(0, mid).join(' ')
  const line2 = words.slice(mid).join(' ')

  return (
    // Hover scale animation — group class lets parent cards trigger it too
    <div
      className={`group relative w-full overflow-hidden ${className}`}
      style={{ paddingBottom: padding }}
    >
      <svg
        viewBox="0 0 800 450"
        xmlns="http://www.w3.org/2000/svg"
        // pointer-events-none so clicks pass through to the card
        className="absolute inset-0 w-full h-full pointer-events-none transition-transform duration-500 group-hover:scale-105"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
          <pattern id={`grid-${gradId}`} width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
          </pattern>
        </defs>

        <rect width="800" height="450" fill={`url(#${gradId})`} />
        <rect width="800" height="450" fill={`url(#grid-${gradId})`} />

        <circle cx="680" cy="80" r="120" fill="rgba(255,255,255,0.06)" />
        <circle cx="720" cy="380" r="80" fill="rgba(255,255,255,0.04)" />
        <circle cx="60" cy="360" r="100" fill="rgba(255,255,255,0.05)" />

        {/* Logo mark */}
        <g transform="translate(60, 48)">
          <rect width="44" height="44" rx="10" fill="rgba(255,255,255,0.15)" />
          <text
            x="22" y="30"
            textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', 'Inter', sans-serif"
            fontWeight="800"
            fontSize="16"
            fill="white"
            letterSpacing="1"
          >
            ITL
          </text>
        </g>

        <text
          x="116" y="76"
          fontFamily="'Plus Jakarta Sans', 'Inter', sans-serif"
          fontWeight="700"
          fontSize="18"
          fill="rgba(255,255,255,0.9)"
        >
          InnTechLab
        </text>

        <line x1="60" y1="120" x2="740" y2="120" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

        <text
          x="60" y="230"
          fontFamily="'Plus Jakarta Sans', 'Inter', sans-serif"
          fontWeight="700"
          fontSize={line2 ? '36' : '40'}
          fill="white"
        >
          {line1}
        </text>

        {line2 && (
          <text
            x="60" y="280"
            fontFamily="'Plus Jakarta Sans', 'Inter', sans-serif"
            fontWeight="700"
            fontSize="36"
            fill="white"
          >
            {line2}
          </text>
        )}

        {subtitle && (
          <text
            x="60"
            y={line2 ? '330' : '290'}
            fontFamily="'Inter', sans-serif"
            fontWeight="400"
            fontSize="16"
            fill="rgba(255,255,255,0.65)"
          >
            {truncate(subtitle, 60)}
          </text>
        )}

        <rect x="0" y="420" width="800" height="30" fill="rgba(0,0,0,0.15)" />
        <text
          x="60" y="440"
          fontFamily="'Inter', sans-serif"
          fontWeight="500"
          fontSize="13"
          fill="rgba(255,255,255,0.5)"
        >
          inntechlab.online
        </text>
      </svg>
    </div>
  )
}
