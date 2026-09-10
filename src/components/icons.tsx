interface IconProps {
  size?: number;
  className?: string;
  color?: string;
}

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export function UploadCloudIcon({ size = 20, className, color }: IconProps) {
  return (
    <svg {...base(size)} className={className} style={{ color }}>
      <path d="M7 18a4.6 4.4 0 0 1 0-9 5.5 5.5 0 0 1 10.7-2A4.5 4.5 0 0 1 19 18H7Z" />
      <path d="M12 12v7" />
      <path d="M9.5 14.5 12 12l2.5 2.5" />
    </svg>
  );
}

export function DocumentIcon({ size = 20, className, color }: IconProps) {
  return (
    <svg {...base(size)} className={className} style={{ color }}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M9 13h6M9 17h6M9 9h1" />
    </svg>
  );
}

export function BuildingIcon({ size = 20, className, color }: IconProps) {
  return (
    <svg {...base(size)} className={className} style={{ color }}>
      <path d="M4 21V6a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v15" />
      <path d="M14 9h5a1 1 0 0 1 1 1v11" />
      <path d="M9 8h.01M9 12h.01M9 16h.01M4 21h16" />
    </svg>
  );
}

export function ChatIcon({ size = 20, className, color }: IconProps) {
  return (
    <svg {...base(size)} className={className} style={{ color }}>
      <path d="M4 4h16v12H8l-4 4z" />
    </svg>
  );
}

export function TargetIcon({ size = 20, className, color }: IconProps) {
  return (
    <svg {...base(size)} className={className} style={{ color }}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" fill={color ?? "currentColor"} />
    </svg>
  );
}

export function CheckIcon({ size = 16, className, color }: IconProps) {
  return (
    <svg {...base(size)} className={className} style={{ color }} strokeWidth={2.5}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function ChevronDownIcon({ size = 16, className, color }: IconProps) {
  return (
    <svg {...base(size)} className={className} style={{ color }} strokeWidth={2}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function ShieldIcon({ size = 18, className, color }: IconProps) {
  return (
    <svg {...base(size)} className={className} style={{ color }}>
      <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5z" />
    </svg>
  );
}

export function MicIcon({ size = 20, className, color }: IconProps) {
  return (
    <svg {...base(size)} className={className} style={{ color }}>
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0M12 19v3" />
    </svg>
  );
}

export function SendIcon({ size = 18, className, color }: IconProps) {
  return (
    <svg {...base(size)} className={className} style={{ color }}>
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22l-4-9-9-4z" />
    </svg>
  );
}

export function UsersIcon({ size = 18, className, color }: IconProps) {
  return (
    <svg {...base(size)} className={className} style={{ color }}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export function CodeIcon({ size = 18, className, color }: IconProps) {
  return (
    <svg {...base(size)} className={className} style={{ color }}>
      <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
    </svg>
  );
}

export function BriefcaseIcon({ size = 18, className, color }: IconProps) {
  return (
    <svg {...base(size)} className={className} style={{ color }}>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

export function TrendingUpIcon({ size = 18, className, color }: IconProps) {
  return (
    <svg {...base(size)} className={className} style={{ color }}>
      <path d="M23 6 13.5 15.5l-5-5L1 18" />
      <path d="M17 6h6v6" />
    </svg>
  );
}

export function ClockIcon({ size = 16, className, color }: IconProps) {
  return (
    <svg {...base(size)} className={className} style={{ color }}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

export function XIcon({ size = 16, className, color }: IconProps) {
  return (
    <svg {...base(size)} className={className} style={{ color }} strokeWidth={2}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export function LayersIcon({ size = 18, className, color }: IconProps) {
  return (
    <svg {...base(size)} className={className} style={{ color }}>
      <path d="m12 2 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 17 9 5 9-5" />
    </svg>
  );
}

export function TerminalIcon({ size = 18, className, color }: IconProps) {
  return (
    <svg {...base(size)} className={className} style={{ color }}>
      <path d="m4 7 5 5-5 5" />
      <path d="M13 17h7" />
    </svg>
  );
}

export function PhoneIcon({ size = 18, className, color }: IconProps) {
  return (
    <svg {...base(size)} className={className} style={{ color }}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export function SparkIcon({ size = 16, className, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
      <path
        d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
        fill={color}
      />
    </svg>
  );
}
