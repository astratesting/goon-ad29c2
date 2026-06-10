interface AtlasGridProps {
  opacity?: number;
  className?: string;
}

export default function AtlasGrid({ opacity = 1, className = '' }: AtlasGridProps) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="atlas-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--indigo)" stopOpacity="0.15" />
            <stop offset="50%" stopColor="var(--cyan)" stopOpacity="0.12" />
            <stop offset="100%" stopColor="var(--teal)" stopOpacity="0.08" />
          </linearGradient>
          <radialGradient id="dot-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--cyan)" stopOpacity="0" />
          </radialGradient>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="var(--ink-3)"
              strokeWidth="0.5"
              strokeOpacity="0.4"
            />
          </pattern>
        </defs>

        {/* Base grid */}
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Longitude lines (vertical, slightly curved) */}
        {[150, 300, 450, 600, 750, 900, 1050].map((x, i) => (
          <line
            key={`lon-${i}`}
            x1={x}
            y1="0"
            x2={x + (i % 2 === 0 ? 20 : -20)}
            y2="800"
            stroke="url(#atlas-line-grad)"
            strokeWidth="0.75"
            className="animate-pulse-glow"
          />
        ))}

        {/* Latitude lines (horizontal, slightly curved) */}
        {[120, 240, 360, 480, 600, 720].map((y, i) => (
          <path
            key={`lat-${i}`}
            d={`M 0 ${y} Q 600 ${y + (i % 2 === 0 ? 15 : -15)} 1200 ${y}`}
            fill="none"
            stroke="url(#atlas-line-grad)"
            strokeWidth="0.75"
            className="animate-pulse-glow"
            style={{ animationDelay: `${i * 0.5}s` }}
          />
        ))}

        {/* Isometric diagonals */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={`iso-${i}`}
            x1={i * 300}
            y1="0"
            x2={i * 300 + 400}
            y2="800"
            stroke="url(#atlas-line-grad)"
            strokeWidth="0.4"
            strokeDasharray="4 8"
          />
        ))}

        {/* Data points (glowing dots) */}
        {[
          { cx: 300, cy: 200 },
          { cx: 750, cy: 350 },
          { cx: 450, cy: 500 },
          { cx: 900, cy: 180 },
          { cx: 200, cy: 600 },
          { cx: 1000, cy: 450 },
          { cx: 600, cy: 280 },
        ].map((point, i) => (
          <g key={`dot-${i}`}>
            <circle
              cx={point.cx}
              cy={point.cy}
              r="12"
              fill="url(#dot-glow)"
              className="animate-pulse-glow"
              style={{ animationDelay: `${i * 1.2}s` }}
            />
            <circle
              cx={point.cx}
              cy={point.cy}
              r="2"
              fill="var(--cyan)"
              fillOpacity="0.7"
            />
          </g>
        ))}

        {/* Coordinate labels */}
        {[
          { x: 155, y: 15, text: '02°N' },
          { x: 605, y: 15, text: '18°N' },
          { x: 905, y: 15, text: '27°N' },
          { x: 10, y: 125, text: '44°E' },
          { x: 10, y: 365, text: '72°E' },
          { x: 10, y: 605, text: '96°E' },
        ].map((label, i) => (
          <text
            key={`label-${i}`}
            x={label.x}
            y={label.y}
            fill="var(--text-lo)"
            fontSize="9"
            fontFamily="var(--font-jetbrains-mono)"
            opacity="0.5"
          >
            {label.text}
          </text>
        ))}
      </svg>
    </div>
  );
}
