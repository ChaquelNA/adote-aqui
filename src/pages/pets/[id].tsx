import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import pets from "../../../data/pets.json";
import Link from "next/link";

export default function PetDetalhes() {
  const router = useRouter();
  const { id } = router.query;

  const pet = pets.find((p) => p.id === Number(id));

  const [editando, setEditando] = useState(false);

  const [nome, setNome] = useState("");
  const [especie, setEspecie] = useState("");
  const [idade, setIdade] = useState("");
  const [porte, setPorte] = useState("");
  const [cidade, setCidade] = useState("");
  const [ong, setOng] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState("");

  useEffect(() => {
    if (!pet) return;

    setNome(pet.name);
    setEspecie(pet.species);
    setIdade(pet.age);
    setPorte(pet.size);
    setCidade(pet.city);
    setOng(pet.ong);
    setDescricao(pet.descriptionShort);
    setImagem(pet.image);
  }, [pet]);

  async function excluirPet() {
    const confirmar = confirm("Tem certeza que deseja excluir este pet?");
    if (!confirmar) return;

    const resposta = await fetch("/api/pets/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: pet?.id }),
    });

    if (resposta.ok) {
      alert("Pet excluído com sucesso!");
      router.push("/pets");
    } else {
      alert("Erro ao excluir pet.");
    }
  }

  async function salvarAlteracoes() {
    const resposta = await fetch("/api/pets/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: pet?.id,
        name: nome,
        species: especie,
        age: idade,
        size: porte,
        city: cidade,
        ong,
        descriptionShort: descricao,
        image: imagem,
      }),
    });

    if (resposta.ok) {
      alert("Pet atualizado com sucesso!");
      setEditando(false);
      router.reload();
    } else {
      alert("Erro ao atualizar pet.");
    }
  }

  if (!pet) {
    return <h1 style={{ textAlign: "center" }}>Pet não encontrado.</h1>;
  }

  return (
    <div style={card}>
      <div style={imageBox}>
        <img src={imagem} alt={nome} style={imageStyle} />
      </div>

      <div style={{ padding: "30px" }}>
        {editando ? (
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={{ ...input, fontSize: "28px" }}
          />
        ) : (
          <h1 style={{ fontSize: "40px" }}>{pet.name}</h1>
        )}

        <p>
          <strong>🐾 Espécie:</strong>{" "}
          {editando ? (
            <input value={especie} onChange={(e) => setEspecie(e.target.value)} style={input} />
          ) : (
            pet.species
          )}
        </p>

        <p>
          <strong>🎂 Idade:</strong>{" "}
          {editando ? (
            <input value={idade} onChange={(e) => setIdade(e.target.value)} style={input} />
          ) : (
            pet.age
          )}
        </p>

        <p>
          <strong>📏 Porte:</strong>{" "}
          {editando ? (
            <input value={porte} onChange={(e) => setPorte(e.target.value)} style={input} />
          ) : (
            pet.size
          )}
        </p>

        <p>
          <strong>📍 Cidade:</strong>{" "}
          {editando ? (
            <input value={cidade} onChange={(e) => setCidade(e.target.value)} style={input} />
          ) : (
            pet.city
          )}
        </p>

        <p>
          <strong>🏠 ONG:</strong>{" "}
          {editando ? (
            <input value={ong} onChange={(e) => setOng(e.target.value)} style={input} />
          ) : (
            pet.ong
          )}
        </p>

        {editando && (
          <p>
            <strong>🖼️ Imagem:</strong>
            <input value={imagem} onChange={(e) => setImagem(e.target.value)} style={input} />
          </p>
        )}

        <hr style={{ margin: "30px 0" }} />

        <h2>Sobre o pet</h2>

        {editando ? (
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            style={{ ...input, height: "120px", resize: "none" }}
          />
        ) : (
          <p style={{ fontSize: "17px", lineHeight: "28px" }}>
            {pet.descriptionShort}
          </p>
        )}

        <div style={buttonsBox}>
          {editando ? (
            <>
              <button onClick={salvarAlteracoes} style={btnBlue}>
                Salvar alterações
              </button>

              <button onClick={() => setEditando(false)} style={btnWhite}>
                Cancelar
              </button>
            </>
          ) : (
            <>
              <button style={btnBlue}>Quero adotar ❤️</button>

              <button onClick={() => setEditando(true)} style={btnYellow}>
                Editar ✏️
              </button>

              <button onClick={excluirPet} style={btnRed}>
                Excluir 🗑️
              </button>

              <Link href="/pets">
                <button style={btnWhite}>Voltar</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const card = {
  maxWidth: "900px",
  margin: "50px auto",
  backgroundColor: "#fff",
  borderRadius: "20px",
  boxShadow: "0 5px 20px rgba(0,0,0,0.15)",
  overflow: "hidden",
};

const imageBox = {
  backgroundColor: "#f5f5f5",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "350px",
};

const imageStyle = {
  maxWidth: "100%",
  maxHeight: "100%",
  objectFit: "contain" as const,
};

const input = {
  width: "100%",
  padding: "10px",
  marginTop: "5px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
  boxSizing: "border-box" as const,
};

const buttonsBox = {
  display: "flex",
  gap: "20px",
  marginTop: "35px",
  flexWrap: "wrap" as const,
};

const btnBlue = {
  padding: "14px 30px",
  border: "none",
  borderRadius: "10px",
  backgroundColor: "#31A9C4",
  color: "white",
  fontWeight: "bold" as const,
  cursor: "pointer",
  fontSize: "16px",
};

const btnYellow = {
  ...btnBlue,
  backgroundColor: "#ffc107",
  color: "black",
};

const btnRed = {
  ...btnBlue,
  backgroundColor: "#dc3545",
};

const btnWhite = {
  padding: "14px 30px",
  borderRadius: "10px",
  border: "1px solid #31A9C4",
  backgroundColor: "white",
  color: "#31A9C4",
  cursor: "pointer",
  fontWeight: "bold" as const,
  fontSize: "16px",
};