const CANDLES = [
  { x: 60, top: 210, bottom: 260, wickTop: 195, wickBottom: 272, up: false },
  { x: 90, top: 230, bottom: 255, wickTop: 220, wickBottom: 264, up: false },
  { x: 120, top: 195, bottom: 232, wickTop: 182, wickBottom: 242, up: true },
  { x: 150, top: 205, bottom: 222, wickTop: 195, wickBottom: 230, up: false },
  { x: 180, top: 165, bottom: 202, wickTop: 152, wickBottom: 212, up: true },
  { x: 210, top: 178, bottom: 195, wickTop: 168, wickBottom: 204, up: false },
  { x: 240, top: 130, bottom: 172, wickTop: 118, wickBottom: 182, up: true },
  { x: 270, top: 145, bottom: 160, wickTop: 135, wickBottom: 168, up: false },
  { x: 300, top: 95, bottom: 138, wickTop: 82, wickBottom: 148, up: true },
] as const;

export function TradingIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="trading-glow" cx="55%" cy="60%" r="55%">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="trading-line" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#3d4a63" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>
      </defs>

      <ellipse cx="210" cy="270" rx="170" ry="130" fill="url(#trading-glow)" />

      <g stroke="#ffffff" strokeOpacity="0.06">
        <line x1="40" y1="110" x2="360" y2="110" />
        <line x1="40" y1="180" x2="360" y2="180" />
        <line x1="40" y1="250" x2="360" y2="250" />
        <line x1="40" y1="320" x2="360" y2="320" />
      </g>

      <g strokeWidth="1">
        {CANDLES.map((c) => (
          <g key={c.x} stroke={c.up ? "#34d399" : "#8b9ab5"}>
            <line x1={c.x + 9} x2={c.x + 9} y1={c.wickTop} y2={c.wickBottom} />
            <rect
              x={c.x}
              y={c.top}
              width={18}
              height={Math.max(c.bottom - c.top, 4)}
              fill={c.up ? "#34d399" : "#8b9ab5"}
              fillOpacity={c.up ? 0.9 : 0.45}
            />
          </g>
        ))}
      </g>

      <path
        d="M55 285 C 130 265, 175 210, 235 185 S 315 110, 335 78"
        fill="none"
        stroke="url(#trading-line)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M320 68 L338 76 L326 92"
        fill="none"
        stroke="#34d399"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <g>
        <circle cx="330" cy="150" r="27" fill="#0d0f12" stroke="#34d399" strokeOpacity="0.5" />
        <text x="330" y="158" textAnchor="middle" fontSize="22" fill="#34d399" fontWeight="700">
          $
        </text>
      </g>
    </svg>
  );
}
