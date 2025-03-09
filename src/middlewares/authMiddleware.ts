import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";

export const authenticateJWT = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return reply
        .status(401)
        .send({ error: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return reply
        .status(401)
        .send({ error: "Unauthorized: Invalid token format" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (request as any).user = decoded;
  } catch (error) {
    return reply
      .status(403)
      .send({ error: "Forbidden: Invalid or expired token" });
  }
};
