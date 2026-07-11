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
