import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs/promises";
import path from "path";

type Pet = {
  id: number;
  name: string;
  species: string;
  age: string;
  size: string;
  city: string;
  ong: string;
  descriptionShort: string;
  image: string;
};

const petsFilePath = path.join(process.cwd(), "data", "pets.json");

async function readPets(): Promise<Pet[]> {
  const data = await fs.readFile(petsFilePath, "utf-8");
  return JSON.parse(data) as Pet[];
}

async function writePets(pets: Pet[]) {
  await fs.writeFile(petsFilePath, JSON.stringify(pets, null, 2), "utf-8");
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { id } = req.body as { id?: number };

    if (!id) {
      return res.status(400).json({ error: "ID do pet não informado." });
    }

    const pets = await readPets();

    const petExists = pets.some((pet) => pet.id === id);

    if (!petExists) {
      return res.status(404).json({ error: "Pet não encontrado." });
    }

    const updatedPets = pets.filter((pet) => pet.id !== id);

    await writePets(updatedPets);

    return res.status(200).json({ message: "Pet excluído com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir pet:", error);
    return res.status(500).json({ error: "Erro interno no servidor." });
  }
}