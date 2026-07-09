// src/components/Footer.tsx

export default function Footer() {
  return (
    <footer
      style={{
        marginTop: "40px",
        padding: "10px 0",
        textAlign: "center",
        fontSize: "14px",
        color: "#555",
        borderTop: "1px solid #eee",
      }}
    >
      © {new Date().getFullYear()} Adote Aqui – Todos os direitos reservados.
    </footer>
  );
}
