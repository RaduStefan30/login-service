import { FastifyInstance } from "fastify";
import { registerUser, loginUser } from "../services/userService";
import { authenticateJWT } from "../middlewares/authMiddleware";

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/register", async (request, reply) => {
    try {
      const { username, password } = request.body as {
        username: string;
        password: string;
      };
      const response = await registerUser(username, password);
      reply.send(response);
    } catch (error) {
      const err = error as Error;
      reply.status(400).send({ error: err.message });
    }
  });

  fastify.post("/login", async (request, reply) => {
    try {
      const { username, password } = request.body as {
        username: string;
        password: string;
      };
      const response = await loginUser(username, password);
      reply.send(response);
    } catch (error) {
      const err = error as Error;
      reply.status(401).send({ error: err.message });
    }
  });

  fastify.get(
    "/home",
    { preHandler: authenticateJWT },
    async (request, reply) => {
      return { message: "Welcome home!", user: (request as any).user };
    }
  );
}
