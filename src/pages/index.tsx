// src/pages/index.tsx
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#ffffffff",
        padding: "40px 16px",
      }}
    >
      {/* LOGO CENTRALIZADA */}
      <Image
        src="/logodesenho.png" // precisa estar em /public/logodesenho.png
        alt="Logo Adote Aqui"
        width={260}
        height={260}
        style={{ objectFit: "contain", marginBottom: "24px" }}
      />

      {/* BOTÃO DE LOGIN */}
      <Link href="/login">
        <button
          style={{
            backgroundColor: "#31A9C4",
            color: "#fff",
            border: "none",
            padding: "12px 32px",
            borderRadius: "999px",
            fontWeight: 600,
            fontSize: "16px",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
            transition: "background-color 0.2s ease, transform 0.1s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#2890D4";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#31A9C4";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Ir para Login
        </button>
      </Link>

      <div
        style={{
          maxWidth: "900px",
          marginTop: "40px",
          backgroundColor: "rgba(49, 169, 196, 0.08)",
          borderRadius: "16px",
          padding: "24px 32px",
          color: "#333",
          fontSize: "16px",
          lineHeight: 1.8,
          textAlign: "justify",
          boxShadow: "0 6px 18px rgba(0, 0, 0, 0.06)",
          border: "1px solid rgba(49, 169, 196, 0.25)",
        }}
      >
        <p
          style={{
            marginBottom: "16px",
            textAlign: "center",
            fontSize: "18px",
          }}
        >
          No <strong>Adote Aqui</strong>, conectamos quem sonha em adotar um pet
          com uma rede de ONGs e protetores independentes parceiros.
        </p>
        <p style={{ marginBottom: "12px" }}>
          Funciona de forma simples: você navega pelo nosso site, conhece os
          animais disponíveis para adoção e se candidata àquele que tocar o seu
          coração. As ONGs e protetores parceiros ficam responsáveis por todo o
          processo de análise e entrevista com os potenciais adotantes,
          garantindo a segurança e o bem-estar dos pets.
        </p>
        <p style={{ textAlign: "center", marginTop: "4px" }}>
          Acreditamos que, juntos, podemos transformar histórias e construir
          novos lares cheios de amor. 💙
        </p>
      </div>
    </div>
  );
}
