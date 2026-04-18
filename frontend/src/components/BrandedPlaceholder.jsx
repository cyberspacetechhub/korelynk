import React from 'react';

const gradients = [
  ['#4f46e5', '#7c3aed'],
  ['#0ea5e9', '#6366f1'],
  ['#10b981', '#0ea5e9'],
  ['#f59e0b', '#ef4444'],
  ['#8b5cf6', '#ec4899'],
  ['#06b6d4', '#3b82f6'],
  ['#6366f1', '#10b981'],
  ['#f97316', '#f59e0b'],
];

function pickGradient(title) {
  const sum = title.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return gradients[sum % gradients.length];
}

function truncate(str, max) {
  return str.length > max ? str.slice(0, max - 1) + '…' : str;
}

const BrandedPlaceholder = ({ title, subtitle, className = '', aspectRatio = '16/9' }) => {
  const [from, to] = pickGradient(title);
  const gradId = `grad-${btoa(encodeURIComponent(title)).replace(/[^a-zA-Z0-9]/g, '').slice(0, 12)}`;

  const paddingMap = { '16/9': '56.25%', '4/3': '75%', '1/1': '100%' };
  const padding = paddingMap[aspectRatio] || '56.25%';

  const displayTitle = truncate(title, 40);
  const words = displayTitle.split(' ');
  const mid = Math.ceil(words.length / 2);
  const line1 = words.slice(0, mid).join(' ');
  const line2 = words.slice(mid).join(' ');

  return (
    <div className={`group relative w-full overflow-hidden ${className}`} style={{ paddingBottom: padding }}>
      <svg
        viewBox="0 0 800 450"
        xmlns="http://www.w3.org/2000/svg"
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
          <text x="22" y="30" textAnchor="middle"
            fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="16" fill="white" letterSpacing="1">
            ITL
          </text>
        </g>

        <text x="116" y="76"
          fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="18" fill="rgba(255,255,255,0.9)">
          InnTechLab
        </text>

        <line x1="60" y1="120" x2="740" y2="120" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

        <text x="60" y="230"
          fontFamily="'Inter', sans-serif" fontWeight="700"
          fontSize={line2 ? '36' : '40'} fill="white">
          {line1}
        </text>

        {line2 && (
          <text x="60" y="280"
            fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="36" fill="white">
            {line2}
          </text>
        )}

        {subtitle && (
          <text x="60" y={line2 ? '330' : '290'}
            fontFamily="'Inter', sans-serif" fontWeight="400" fontSize="16" fill="rgba(255,255,255,0.65)">
            {truncate(subtitle, 60)}
          </text>
        )}

        <rect x="0" y="420" width="800" height="30" fill="rgba(0,0,0,0.15)" />
        <text x="60" y="440"
          fontFamily="'Inter', sans-serif" fontWeight="500" fontSize="13" fill="rgba(255,255,255,0.5)">
          academy.inntechlab.online
        </text>
      </svg>
    </div>
  );
};

export default BrandedPlaceholder;
