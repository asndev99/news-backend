const { PrismaClient } = require("prisma");

const prisma = new PrismaClient({
  log: ["query", "error"],
});

module.exports = prisma;
