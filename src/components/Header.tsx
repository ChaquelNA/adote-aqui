import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();

  const [logado, setLogado] = useState(false);
  const [carregando, setCarregando] = useState(true);

  async function verificarLogin() {
    try {
      const resposta = await fetch("/api/auth/status");
      const data = await resposta.json();

      setLogado(data.authenticated);
    } catch (error) {
      console.error("Erro ao verificar login:", error);
      setLogado(false);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    verificarLogin();

    router.events.on("routeChangeComplete", verificarLogin);

    return () => {
      router.events.off("routeChangeComplete", verificarLogin);
    };
  }, [router.events]);

  async function logout() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      setLogado(false);
      router.push("/login");
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  }

  return (
    <header
      style={{
        width: "100%",
        padding: "18px 48px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #eee",
        backgroundColor: "#fff",
        boxSizing: "border-box",
      }}
    >
      <Link href="/" style={{ textDecoration: "none" }}>
        <img
          src="/logoescrita.png"
          alt="Adote Aqui"
          style={{
            height: "50px",
            objectFit: "contain",
          }}
        />
      </Link>

      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
          fontSize: "16px",
        }}
      >
        <Link href="/" style={{ color: "#111", textDecoration: "none" }}>
          Início
        </Link>

        <Link href="/pets" style={{ color: "#111", textDecoration: "none" }}>
          Pets
        </Link>

        <Link
          href="/cadastrar-pet"
          style={{ color: "#111", textDecoration: "none" }}
        >
          Cadastrar Pet
        </Link>

        {!carregando &&
          (logado ? (
            <button
              onClick={logout}
              style={{
                color: "white",
                backgroundColor: "#dc3545",
                border: "none",
                padding: "8px 18px",
                borderRadius: "999px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Sair
            </button>
          ) : (
            <Link
              href="/login"
              style={{
                color: "#31A9C4",
                textDecoration: "none",
                border: "1px solid #31A9C4",
                padding: "8px 18px",
                borderRadius: "999px",
                fontWeight: "bold",
              }}
            >
              Login
            </Link>
          ))}
      </nav>
    </header>
  );
}