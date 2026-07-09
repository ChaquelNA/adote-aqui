// src/pages/login.tsx
import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !password) {
      setError("Preencha usuário e senha.");
      return;
    }

    if (password.length < 4) {
      setError("A senha deve ter pelo menos 4 caracteres.");
      return;
    }

    setLoading(true);
    try {
      const resposta = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await resposta.json();

      if (!resposta.ok) {
        setError(data.error || "Erro ao realizar login.");
        return;
      }

      // Sucesso: aqui você futuramente pode guardar o usuário em contexto/localStorage
      // e redirecionar para a página principal ou de pets.
      router.push("/");
    } catch (err) {
      console.error(err);
      setError("Erro de comunicação com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        gap: "200px",
      }}
    >
      {/* IMAGEM À ESQUERDA */}
      <div
        style={{
          width: "45%",
          height: "70%",
          backgroundImage: "url('/logosite.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />

      {/* FORMULÁRIO À DIREITA */}
      <div
        style={{
          backgroundColor: "rgba(47, 164, 231, 0.5)",
          padding: "40px",
          borderRadius: "16px",
          width: "450px",
          minHeight: "400px",
          textAlign: "center",
          color: "black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <h1 style={{ fontSize: "24px", margin: 0 }}>Login</h1>

        {/* Mensagem de erro */}
        {error && (
          <div
            style={{
              backgroundColor: "rgba(255, 0, 0, 0.1)",
              color: "#b00000",
              padding: "8px 12px",
              borderRadius: "8px",
              fontSize: "14px",
              width: "100%",
            }}
          >
            {error}
          </div>
        )}

        <form style={{ width: "100%" }} onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <input
              type="text"
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "20px",
                border: "1px solid white",
                background: "transparent",
                color: "black",
                outline: "none",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "20px",
                border: "1px solid white",
                background: "transparent",
                color: "black",
                outline: "none",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "20px",
              border: "none",
              backgroundColor: "white",
              color: "#333",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.8 : 1,
            }}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        {/* LINKS ABAIXO DO FORM */}
        <div style={{ fontSize: "14px" }}>
          <div style={{ marginBottom: "8px" }}>
            Não tem conta?{" "}
            <Link
              href="/cadastro"
              style={{ color: "#005f8f", fontWeight: 600, textDecoration: "none" }}
            >
              Cadastre-se
            </Link>
          </div>

          <Link
            href="/"
            style={{
              color: "black",
              textDecoration: "none",
              fontSize: "13px",
            }}
          >
            ← Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
