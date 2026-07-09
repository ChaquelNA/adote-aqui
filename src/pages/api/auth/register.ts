import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs/promises";
import path from "path";

type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

const usersFilePath = path.join(process.cwd(), "data", "users.json");

async function readUsers(): Promise<User[]> {
  try {
    const data = await fs.readFile(usersFilePath, "utf-8");
    return JSON.parse(data) as User[];
  } catch (err: any) {
    // Se o arquivo não existir ainda, começamos com lista vazia
    if (err.code === "ENOENT") {
      return [];
    }
    throw err;
  }
}

async function writeUsers(users: User[]) {
  await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), "utf-8");
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { username, email, password } = req.body as {
      username?: string;
      email?: string;
      password?: string;
    };

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Preencha todos os campos." });
    }

    const users = await readUsers();

    // Verifica se já existe usuário com o mesmo username ou email
    const existingUser = users.find(
      (u) => u.username === username || u.email === email
    );

    if (existingUser) {
      return res
        .status(409)
        .json({ error: "Já existe um usuário com esse nome ou e-mail." });
    }

    const newUser: User = {
      id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
      username,
      email,
      password, // em projeto real deveria ser hash
    };

    users.push(newUser);
    await writeUsers(users);

    return res
      .status(201)
      .json({ message: "Usuário cadastrado com sucesso.", user: newUser });
  } catch (error) {
    console.error("Erro no cadastro:", error);
    return res.status(500).json({ error: "Erro interno no servidor." });
  }
}
