const NODES = [
  { x: 90, y: 130, r: 4 },
  { x: 70, y: 210, r: 5 },
  { x: 95, y: 290, r: 4 },
  { x: 200, y: 90, r: 5 },
  { x: 200, y: 320, r: 5 },
  { x: 310, y: 130, r: 4 },
  { x: 330, y: 210, r: 5 },
  { x: 305, y: 290, r: 4 },
] as const;

const CENTER = { x: 200, y: 205 };

export function AIIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="ai-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ai-core" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3d4a63" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>

      <circle cx={CENTER.x} cy={CENTER.y} r="160" fill="url(#ai-glow)" />

      <g stroke="#8b9ab5" strokeOpacity="0.35">
        {NODES.map((n) => (
          <line key={`${n.x}-${n.y}`} x1={CENTER.x} y1={CENTER.y} x2={n.x} y2={n.y} />
        ))}
      </g>

      <g fill="#c4b5fd" fillOpacity="0.7">
        {NODES.map((n) => (
          <circle key={`${n.x}-${n.y}-dot`} cx={n.x} cy={n.y} r={n.r} />
        ))}
      </g>

      <polygon
        points="200,130 254,163 254,229 200,262 146,229 146,163"
        fill="url(#ai-core)"
        fillOpacity="0.92"
      />
      <polygon
        points="200,130 254,163 254,229 200,262 146,229 146,163"
        fill="none"
        stroke="#c4b5fd"
        strokeOpacity="0.6"
        strokeWidth="1.5"
      />

      <circle cx={CENTER.x} cy={CENTER.y} r="9" fill="#ffffff" fillOpacity="0.9" />
    </svg>
  );
}
