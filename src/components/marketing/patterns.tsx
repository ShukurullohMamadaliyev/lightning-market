const CANDLES = [
  { x: 10, top: 120, bottom: 160, wickTop: 105, wickBottom: 175 },
  { x: 40, top: 140, bottom: 170, wickTop: 128, wickBottom: 182 },
  { x: 70, top: 110, bottom: 150, wickTop: 95, wickBottom: 162 },
  { x: 100, top: 130, bottom: 155, wickTop: 118, wickBottom: 168 },
  { x: 130, top: 95, bottom: 135, wickTop: 80, wickBottom: 148 },
  { x: 160, top: 105, bottom: 128, wickTop: 92, wickBottom: 140 },
  { x: 190, top: 75, bottom: 112, wickTop: 60, wickBottom: 124 },
  { x: 220, top: 90, bottom: 108, wickTop: 78, wickBottom: 118 },
  { x: 250, top: 55, bottom: 95, wickTop: 42, wickBottom: 106 },
  { x: 280, top: 68, bottom: 88, wickTop: 56, wickBottom: 98 },
  { x: 310, top: 35, bottom: 72, wickTop: 22, wickBottom: 84 },
  { x: 340, top: 48, bottom: 66, wickTop: 36, wickBottom: 78 },
  { x: 370, top: 18, bottom: 52, wickTop: 6, wickBottom: 64 },
  { x: 400, top: 30, bottom: 48, wickTop: 18, wickBottom: 58 },
] as const;

export function CandlestickPattern({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 200"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      {CANDLES.map((c) => (
        <g key={c.x} stroke="currentColor" strokeWidth={1}>
          <line x1={c.x + 9} x2={c.x + 9} y1={c.wickTop} y2={c.wickBottom} />
          <rect
            x={c.x}
            y={c.top}
            width={18}
            height={Math.max(c.bottom - c.top, 4)}
            fill="currentColor"
            fillOpacity={0.5}
          />
        </g>
      ))}
    </svg>
  );
}

const NODES = [
  { x: 20, y: 40, layer: 0 },
  { x: 20, y: 100, layer: 0 },
  { x: 20, y: 160, layer: 0 },
  { x: 130, y: 20, layer: 1 },
  { x: 130, y: 70, layer: 1 },
  { x: 130, y: 130, layer: 1 },
  { x: 130, y: 180, layer: 1 },
  { x: 240, y: 50, layer: 2 },
  { x: 240, y: 110, layer: 2 },
  { x: 240, y: 165, layer: 2 },
  { x: 340, y: 90, layer: 3 },
] as const;

const EDGES: Array<[number, number]> = [
  [0, 3], [0, 4], [1, 3], [1, 4], [1, 5], [2, 5], [2, 6],
  [3, 7], [4, 7], [4, 8], [5, 8], [5, 9], [6, 9],
  [7, 10], [8, 10], [9, 10],
];

export function NetworkPattern({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 200"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="currentColor" strokeOpacity={0.4} strokeWidth={1}>
        {EDGES.map(([a, b]) => {
          const from = NODES[a];
          const to = NODES[b];
          return <line key={`${a}-${b}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y} />;
        })}
      </g>
      <g fill="currentColor">
        {NODES.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={4} />
        ))}
      </g>
    </svg>
  );
}
