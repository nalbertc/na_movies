import { prisma } from "../src/database";
import { encriptPassword } from "../src/services/auth";

async function main() {
  const pass = await encriptPassword("1988652104nlc");

  await prisma.user.upsert({
    where: {
      email: "nalberthcastro1510@gmail.com",
    },
    create: {
      nome: "Nalberth Castro",
      email: "nalberthcastro1510@gmail.com",
      senha: pass,
    },
    update: {},
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();
    process.exit(1);
  });
