import { PrismaClient, RoleName } from '@prisma/client/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Empezando el seeding...');

  await prisma.role.createMany({
    data: [
      { name: RoleName.ADMINISTRADOR },
      { name: RoleName.PROFESIONAL },
      { name: RoleName.SECRETARIA },
      { name: RoleName.PACIENTE },
    ],
    skipDuplicates: true, // No falla si los roles ya existen
  });

  console.log('Seeding completado. Los 4 roles están en la BBDD.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
