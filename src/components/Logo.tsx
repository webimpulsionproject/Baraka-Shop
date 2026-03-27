import Image from "next/image";

interface LogoProps {
  size?: number;
  className?: string;
}

/**
 * Logo Baraka Shop — losange tricolore (épicerie / traiteur / boucherie)
 * Utilise le fichier SVG dans /public pour bénéficier du cache navigateur.
 */
export default function Logo({ size = 40, className = "" }: LogoProps) {
  return (
    <Image
      src="/logo.svg"
      alt="Baraka Shop"
      width={size}
      height={size}
      className={className}
      priority
    />
  );
}
