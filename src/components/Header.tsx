import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/login");
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

        <button
          onClick={logout}
          style={{
            color: "white",
            background: "#dc3545",
            border: "none",
            padding: "8px 18px",
            borderRadius: "999px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Sair
        </button>
      </nav>
    </header>
  );
}