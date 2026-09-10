export function Logo({ size = "md" }: { size?: "sm" | "md" }) {
  const box = size === "sm" ? 32 : 36;
  const icon = size === "sm" ? 16 : 18;
  const font = size === "sm" ? 16 : 20;

  return (
    <div className="flex items-center gap-2.5">
      <div
        className="grad-bg flex flex-shrink-0 items-center justify-center rounded-[10px]"
        style={{ width: box, height: box }}
      >
        <svg width={icon} height={icon} viewBox="0 0 24 24">
          <path
            d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
            fill="white"
          />
        </svg>
      </div>
      <span className="font-display font-bold" style={{ fontSize: font }}>
        Interview<span className="grad-text">IQ</span>
      </span>
    </div>
  );
}
