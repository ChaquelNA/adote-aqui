// src/pages/cadastro.tsx
import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Cadastro() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validações simples no front
    if (!username.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Preencha todos os campos.");
      return;
    }

    if (password.length < 4) {
      setError("A senha deve ter pelo menos 4 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não conferem.");
      return;
    }

    setLoading(true);
    try {
      const resposta = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await resposta.json();

      if (!resposta.ok) {
        setError(data.error || "Erro ao cadastrar usuário.");
        return;
      }

      // Sucesso
      setSuccess("Cadastro realizado com sucesso! Você será redirecionado para o login.");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Redireciona para o login
      router.push("/login");
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
          minHeight: "430px",
          textAlign: "center",
          color: "black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <h1 style={{ fontSize: "24px", margin: 0 }}>Cadastro</h1>

        {/* Mensagens */}
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
        {success && (
          <div
            style={{
              backgroundColor: "rgba(0, 150, 0, 0.1)",
              color: "#006400",
              padding: "8px 12px",
              borderRadius: "8px",
              fontSize: "14px",
              width: "100%",
            }}
          >
            {success}
          </div>
        )}

        <form style={{ width: "100%" }} onSubmit={handleSubmit}>
          {/* Usuário */}
          <div style={{ marginBottom: "14px" }}>
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

          {/* E-mail */}
          <div style={{ marginBottom: "14px" }}>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          {/* Senha */}
          <div style={{ marginBottom: "14px" }}>
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

          {/* Confirmar senha */}
          <div style={{ marginBottom: "18px" }}>
            <input
              type="password"
              placeholder="Confirmar senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        {/* LINKS ABAIXO DO FORM */}
        <div style={{ fontSize: "14px" }}>
          <div style={{ marginBottom: "8px" }}>
            Já tem conta?{" "}
            <Link
              href="/login"
              style={{ color: "#005f8f", fontWeight: 600, textDecoration: "none" }}
            >
              Fazer login
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
