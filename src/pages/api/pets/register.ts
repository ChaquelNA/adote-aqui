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
  try {
    const data = await fs.readFile(petsFilePath, "utf-8");
    return JSON.parse(data) as Pet[];
  } catch (err: any) {
    if (err.code === "ENOENT") {
      return [];
    }
    throw err;
  }
}

async function writePets(pets: Pet[]) {
  await fs.writeFile(petsFilePath, JSON.stringify(pets, null, 2), "utf-8");
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { name, species, age, size, city, ong, descriptionShort, image } =
      req.body as {
        name?: string;
        species?: string;
        age?: string;
        size?: string;
        city?: string;
        ong?: string;
        descriptionShort?: string;
        image?: string;
      };

    if (
      !name ||
      !species ||
      !age ||
      !size ||
      !city ||
      !ong ||
      !descriptionShort ||
      !image
    ) {
      return res.status(400).json({ error: "Preencha todos os campos." });
    }

    const pets = await readPets();

    const newPet: Pet = {
      id: pets.length > 0 ? pets[pets.length - 1].id + 1 : 1,
      name,
      species,
      age,
      size,
      city,
      ong,
      descriptionShort,
      image,
    };

    pets.push(newPet);
    await writePets(pets);

    return res
      .status(201)
      .json({ message: "Pet cadastrado com sucesso.", pet: newPet });
  } catch (error) {
    console.error("Erro ao cadastrar pet:", error);
    return res.status(500).json({ error: "Erro interno no servidor." });
  }
}