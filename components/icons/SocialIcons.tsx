// Custom social icons — lucide-react removed brand/logo icons
// (Facebook, Instagram, etc.) in newer versions, so these are
// simple hand-drawn SVGs instead of a library dependency.

type IconProps = {
  size?: number;
  className?: string;
};

export function InstagramIcon({ size = 20, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon({ size = 20, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M15 3h-2.5C10.02 3 8.5 4.79 8.5 7.5V10H6v3.5h2.5V21H12v-7.5h2.7l.5-3.5h-3.2V7.7c0-1 .3-1.7 1.7-1.7H15V3z"
        fill="currentColor"
      />
    </svg>
  );
}
