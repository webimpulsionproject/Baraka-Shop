interface BarakaLogoProps {
  size?: number;
  className?: string;
}

/**
 * Logo SVG losange Baraka Shop
 * 3 zones : vert (épices) | orange (toque) | rouge (couteaux)
 */
export default function BarakaLogo({ size = 40, className = "" }: BarakaLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Baraka Shop logo"
    >
      {/* Diamond clip path */}
      <defs>
        <clipPath id="diamond-clip">
          <polygon points="50,4 96,50 50,96 4,50" />
        </clipPath>
      </defs>

      {/* Zone verte — haut gauche */}
      <polygon
        points="50,4 4,50 50,50"
        fill="#2E7D32"
        clipPath="url(#diamond-clip)"
      />

      {/* Zone orange — haut droite */}
      <polygon
        points="50,4 96,50 50,50"
        fill="#E64A19"
        clipPath="url(#diamond-clip)"
      />

      {/* Zone rouge — bas */}
      <polygon
        points="4,50 50,96 96,50 50,50"
        fill="#C62828"
        clipPath="url(#diamond-clip)"
      />

      {/* Séparateurs subtils */}
      <line x1="50" y1="4" x2="50" y2="50" stroke="white" strokeWidth="1.2" opacity="0.5" clipPath="url(#diamond-clip)" />
      <line x1="4" y1="50" x2="96" y2="50" stroke="white" strokeWidth="0.8" opacity="0.3" clipPath="url(#diamond-clip)" />

      {/* Icône bocal/épices — zone verte (centre ~25,33) */}
      <g clipPath="url(#diamond-clip)" fill="white" opacity="0.92">
        {/* Bocal */}
        <rect x="20" y="26" width="12" height="16" rx="2" />
        {/* Couvercle */}
        <rect x="19" y="23" width="14" height="4" rx="1.5" />
        {/* Détail épices (petits points) */}
        <circle cx="24" cy="32" r="1.2" fill="#2E7D32" />
        <circle cx="28" cy="35" r="1.2" fill="#2E7D32" />
        <circle cx="26" cy="38" r="1" fill="#2E7D32" />
      </g>

      {/* Icône toque chef — zone orange (centre ~75,33) */}
      <g clipPath="url(#diamond-clip)" fill="white" opacity="0.92">
        {/* Corps de la toque */}
        <ellipse cx="74" cy="28" rx="9" ry="7" />
        {/* Base plate */}
        <rect x="65" y="34" width="18" height="5" rx="1" />
        {/* Bosse au sommet */}
        <ellipse cx="74" cy="22" rx="5" ry="4" />
      </g>

      {/* Icône couteaux croisés — zone rouge (centre ~50,72) */}
      <g clipPath="url(#diamond-clip)" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.92">
        {/* Couteau gauche */}
        <line x1="38" y1="60" x2="58" y2="83" />
        <rect x="35.5" y="57" width="5" height="3" rx="0.5" fill="white" stroke="none" />
        {/* Couteau droit */}
        <line x1="62" y1="60" x2="42" y2="83" />
        <rect x="59.5" y="57" width="5" height="3" rx="0.5" fill="white" stroke="none" />
      </g>

      {/* Contour losange */}
      <polygon
        points="50,4 96,50 50,96 4,50"
        fill="none"
        stroke="#D0D0D0"
        strokeWidth="2"
      />
    </svg>
  );
}
