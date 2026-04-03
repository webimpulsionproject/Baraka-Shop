import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const LAMB     = "1529692236671-f1f6cf9683ba";
const CHICKEN  = "1587593810167-a84920ea0781";
const STEAK    = "1529694157872-4e0c0f3b238b";
const RIBS     = "1544025162-d76694265947";

const img = (id: string, x = 0.5, y = 0.5) =>
  `https://images.unsplash.com/photo-${id}?w=600&h=450&fit=crop&crop=focalpoint&fp-x=${x}&fp-y=${y}&auto=format&q=80`;

async function main() {
  const fixes = [
    { slug: "souris-agneau",    image: img(LAMB, 0.4, 0.6) },
    { slug: "collier-agneau",   image: img(LAMB, 0.6, 0.55) },
    { slug: "escalope-veau",    image: img(CHICKEN, 0.45, 0.4) },
    { slug: "bavette-aloyau",   image: img(STEAK, 0.55, 0.5) },
    { slug: "cotelettes-agneau",image: img(RIBS, 0.5, 0.45) },
    { slug: "tajine-agneau",    image: img(LAMB, 0.3, 0.65) },
  ];

  for (const fix of fixes) {
    await prisma.product.update({
      where: { slug: fix.slug },
      data:  { image: fix.image },
    });
    console.log(`✅ ${fix.slug}`);
  }
  console.log("Images corrigées.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
