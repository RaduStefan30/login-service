import Fastify from "fastify";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const app = Fastify({ logger: true });

app.get("/", async () => {
  return { message: "Login Service is running!" };
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

const start = async () => {
  try {
    await app.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`Server running at http://localhost:${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
