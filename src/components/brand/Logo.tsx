const COLORS = {
  dark: "#3d4a63",
  light: "#f5f6f8",
} as const;

export function LogoMark({
  variant = "dark",
  className,
}: {
  variant?: keyof typeof COLORS;
  className?: string;
}) {
  const fill = COLORS[variant];
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M22 12 L40 12 L82 88 L64 88 Z" fill={fill} />
      <path
        d="M78 12 L61 12 C 52 30, 40 48, 16 88 L 33 88 C 44 68, 56 48, 78 12 Z"
        fill={fill}
      />
    </svg>
  );
}

export function Logo({
  variant = "dark",
  className = "",
}: {
  variant?: keyof typeof COLORS;
  className?: string;
}) {
  const textColor = variant === "light" ? "text-white" : "text-[#3d4a63]";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark variant={variant} className="h-7 w-7" />
      <span className={`text-lg font-semibold tracking-tight ${textColor}`}>
        X <span className="font-normal">Academy</span>
      </span>
    </span>
  );
}
