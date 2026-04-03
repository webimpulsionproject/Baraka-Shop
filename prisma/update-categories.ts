import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const renames = [
    { from: "Agneau",        to: "Agneau & Mouton" },
    { from: "Traiteur",      to: "Traiteur & Marinés" },
    { from: "Épicerie Vrac", to: "Épicerie" },
  ];

  for (const r of renames) {
    const { count } = await prisma.product.updateMany({
      where: { category: r.from },
      data:  { category: r.to },
    });
    console.log(`✅ "${r.from}" → "${r.to}" (${count} produits)`);
  }
  console.log("Catégories mises à jour.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
