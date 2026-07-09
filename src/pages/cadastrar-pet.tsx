import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function CadastrarPet() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [especie, setEspecie] = useState("");
  const [idade, setIdade] = useState("");
  const [porte, setPorte] = useState("");
  const [cidade, setCidade] = useState("");
  const [ong, setOng] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState("");

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  async function buscarImagem() {
    setErro("");
    setSucesso("");

    try {
      const resposta = await fetch("/api/external/dog-image");
      const data = await resposta.json();

      if (!resposta.ok) {
        setErro(data.error || "Erro ao buscar imagem.");
        return;
      }

      setImagem(data.image);
      setSucesso("Imagem carregada pela API externa!");
    } catch (error) {
      console.error("Erro ao buscar imagem:", error);
      setErro("Erro ao buscar imagem da API externa.");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setErro("");
    setSucesso("");

    if (
      !nome ||
      !especie ||
      !idade ||
      !porte ||
      !cidade ||
      !ong ||
      !descricao ||
      !imagem
    ) {
      setErro("Preencha todos os campos.");
      return;
    }

    try {
      const resposta = await fetch("/api/pets/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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

      const data = await resposta.json();

      if (!resposta.ok) {
        setErro(data.error || "Erro ao cadastrar pet.");
        return;
      }

      setSucesso("Pet cadastrado com sucesso!");

      setNome("");
      setEspecie("");
      setIdade("");
      setPorte("");
      setCidade("");
      setOng("");
      setDescricao("");
      setImagem("");

      setTimeout(() => {
        router.push("/pets");
      }, 1500);
    } catch (error) {
      console.error("Erro ao cadastrar pet:", error);
      setErro("Erro ao cadastrar pet.");
    }
  }

  return (
    <div style={container}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Cadastrar Pet
      </h1>

      {erro && <p style={{ color: "red", textAlign: "center" }}>{erro}</p>}

      {sucesso && (
        <p style={{ color: "green", textAlign: "center" }}>{sucesso}</p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={input}
        />

        <input
          placeholder="Espécie"
          value={especie}
          onChange={(e) => setEspecie(e.target.value)}
          style={input}
        />

        <input
          placeholder="Idade"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          style={input}
        />

        <input
          placeholder="Porte"
          value={porte}
          onChange={(e) => setPorte(e.target.value)}
          style={input}
        />

        <input
          placeholder="Cidade"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          style={input}
        />

        <input
          placeholder="ONG"
          value={ong}
          onChange={(e) => setOng(e.target.value)}
          style={input}
        />

        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          style={{ ...input, height: "100px", resize: "none" }}
        />

        <input
          placeholder="Imagem"
          value={imagem}
          onChange={(e) => setImagem(e.target.value)}
          style={input}
        />

        <button type="button" onClick={buscarImagem} style={botaoApi}>
          Buscar imagem aleatória 🐶
        </button>

        {imagem && (
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <img
              src={imagem}
              alt="Prévia do pet"
              style={{
                width: "250px",
                height: "200px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
          </div>
        )}

        <button type="submit" style={botao}>
          Cadastrar Pet
        </button>
      </form>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <Link href="/pets">← Voltar para lista</Link>
      </div>
    </div>
  );
}

const container = {
  maxWidth: "700px",
  margin: "40px auto",
  background: "#fff",
  padding: "40px",
  borderRadius: "16px",
  boxShadow: "0 5px 15px rgba(0,0,0,.1)",
};

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "15px",
  boxSizing: "border-box" as const,
};

const botao = {
  width: "100%",
  padding: "14px",
  background: "#31A9C4",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "bold" as const,
  cursor: "pointer",
};

const botaoApi = {
  ...botao,
  marginBottom: "20px",
  background: "#2d8fb0",
};
