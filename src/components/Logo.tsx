import Image from "next/image";

interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 48, className = "" }: LogoProps) {
  return (
    <Image
      src="/logo.jpg"
      alt="Baraka Shop"
      width={size}
      height={size}
      className={`object-contain ${className}`}
      priority
    />
  );
}
