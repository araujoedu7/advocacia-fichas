import "dotenv/config"; // Isso carrega o .env automaticamente
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma", // aponta pro seu schema
  migrations: {
    path: "prisma/migrations", // pasta das migrações (pode deixar assim)
  },
  datasource: {
    url: env("DATABASE_URL"), // pega do .env
  },
});