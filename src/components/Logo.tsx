interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 40, className = "" }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Baraka Shop"
    >
      <defs>
        <clipPath id="lozenge">
          <polygon points="50,3 97,50 50,97 3,50" />
        </clipPath>
      </defs>
      {/* Green zone top-left */}
      <polygon points="50,3 3,50 50,50" fill="#2E7D32" clipPath="url(#lozenge)" />
      {/* Orange zone top-right */}
      <polygon points="50,3 97,50 50,50" fill="#E64A19" clipPath="url(#lozenge)" />
      {/* Red zone bottom */}
      <polygon points="3,50 50,97 97,50 50,50" fill="#C62828" clipPath="url(#lozenge)" />
      {/* Dividers */}
      <line x1="50" y1="3" x2="50" y2="50" stroke="white" strokeWidth="1" opacity="0.4" clipPath="url(#lozenge)" />
      <line x1="3" y1="50" x2="97" y2="50" stroke="white" strokeWidth="0.6" opacity="0.25" clipPath="url(#lozenge)" />
      {/* Bocal icon — green zone ~(25,30) */}
      <g clipPath="url(#lozenge)" fill="white" opacity="0.9">
        <rect x="19" y="25" width="13" height="17" rx="2" />
        <rect x="18" y="22" width="15" height="4" rx="1.5" />
        <circle cx="23" cy="31" r="1.3" fill="#2E7D32" />
        <circle cx="27" cy="35" r="1.3" fill="#2E7D32" />
        <circle cx="25" cy="38" r="1" fill="#2E7D32" />
      </g>
      {/* Toque icon — orange zone ~(75,30) */}
      <g clipPath="url(#lozenge)" fill="white" opacity="0.9">
        <ellipse cx="74" cy="27" rx="10" ry="8" />
        <rect x="64" y="33" width="20" height="5" rx="1" />
        <ellipse cx="74" cy="21" rx="5.5" ry="4.5" />
      </g>
      {/* Crossed knives — red zone ~(50,72) */}
      <g clipPath="url(#lozenge)" stroke="white" strokeWidth="2.8" strokeLinecap="round" opacity="0.9">
        <line x1="37" y1="59" x2="58" y2="84" />
        <rect x="34" y="56" width="6" height="4" rx="1" fill="white" stroke="none" />
        <line x1="63" y1="59" x2="42" y2="84" />
        <rect x="60" y="56" width="6" height="4" rx="1" fill="white" stroke="none" />
      </g>
      {/* Lozenge border */}
      <polygon points="50,3 97,50 50,97 3,50" fill="none" stroke="#D1D5DB" strokeWidth="1.5" />
    </svg>
  );
}
