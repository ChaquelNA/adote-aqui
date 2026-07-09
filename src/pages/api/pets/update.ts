import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs/promises";
import path from "path";

const petsFilePath = path.join(process.cwd(), "data", "pets.json");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Método não permitido." });
  }

  try {
    const petAtualizado = req.body;

    const data = await fs.readFile(petsFilePath, "utf-8");
    const pets = JSON.parse(data);

    const index = pets.findIndex(
      (pet: any) => pet.id === petAtualizado.id
    );

    if (index === -1) {
      return res.status(404).json({ error: "Pet não encontrado." });
    }

    pets[index] = petAtualizado;

    await fs.writeFile(
      petsFilePath,
      JSON.stringify(pets, null, 2),
      "utf-8"
    );

    return res.status(200).json({
      message: "Pet atualizado com sucesso.",
      pet: petAtualizado,
    });
  } catch (error) {
    console.error("Erro ao atualizar pet:", error);
    return res.status(500).json({ error: "Erro interno no servidor." });
  }
}