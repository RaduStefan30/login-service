import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const users: { username: string; passwordHash: string }[] = []; // Temporary storage

export const registerUser = async (username: string, password: string) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  users.push({ username, passwordHash });

  return { message: "User registered successfully!" };
};

export const loginUser = async (username: string, password: string) => {
  const user = users.find((u) => u.username === username);
  if (!user) throw new Error("Invalid credentials");

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) throw new Error("Invalid credentials");

  const token = jwt.sign({ username }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });

  return { token };
};
