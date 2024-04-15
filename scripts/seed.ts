const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Ծրագրավորում" },
        { name: "Կայքերի մշակում" },
        { name: "Գրաֆիկ դիզայն" },
        { name: "Լուսանկարչություն" },
        { name: "Ֆիլմերի ստեղծում" },
        { name: "Անիմացիա" },
        { name: "Եռաչափ մոդելավորում" },
      ]
    });

    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();