export function LogoMark({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M9.3,5.2 C7,5.2 5.6,8.3 5.6,12 C5.6,15.2 6.9,18 8.8,18.6 C10.1,19 10.8,17.9 10.8,16.4 L10.8,7.1 C10.8,5.9 10.3,5.2 9.3,5.2 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.7,5.2 C17,5.2 18.4,8.3 18.4,12 C18.4,15.2 17.1,18 15.2,18.6 C13.9,19 13.2,17.9 13.2,16.4 L13.2,7.1 C13.2,5.9 13.7,5.2 14.7,5.2 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12,3 L12,7.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3.2,12 L20.8,12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.85" />
      <circle cx="16.6" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

export default function Logo({ size = 20, withText = true, className = "" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <LogoMark size={size} className="text-brand" />
      {withText && (
        <span className="font-bold text-[15px] tracking-tight text-ink">
          PneumoAI
        </span>
      )}
    </div>
  );
}
