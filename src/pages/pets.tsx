import pets from "../../data/pets.json";
import Link from "next/link";

export default function Pets() {
  return (
    <div style={{ padding: "40px", minHeight: "100vh" }}>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "8px",
          fontSize: "36px",
        }}
      >
        Pets disponíveis para adoção
      </h1>

      <p
        style={{
          textAlign: "center",
          marginBottom: "40px",
          color: "#555",
          fontSize: "18px",
        }}
      >
        Encontre um novo melhor amigo e transforme uma vida.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, 300px)",
          justifyContent: "center",
          gap: "32px",
        }}
      >
        {pets.map((pet) => (
          <div
            key={pet.id}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
            style={{
              borderRadius: "16px",
              overflow: "hidden",
              backgroundColor: "#fff",
              boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
              transition: "0.3s",
              cursor: "pointer",
            }}
          >
            <img
              src={pet.image}
              alt={pet.name}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
              }}
            />

            <div style={{ padding: "18px" }}>
              <h2 style={{ margin: "0 0 15px", fontSize: "30px" }}>
                {pet.name}
              </h2>

              <p>
                <strong>🐾 Espécie:</strong> {pet.species}
              </p>

              <p>
                <strong>🎂 Idade:</strong> {pet.age}
              </p>

              <p>
                <strong>📏 Porte:</strong> {pet.size}
              </p>

              <p>
                <strong>📍 Cidade:</strong> {pet.city}
              </p>

              <p style={{ marginTop: "15px", minHeight: "60px" }}>
                {pet.descriptionShort}
              </p>

              <div style={{ marginTop: "20px" }}>
                <Link href={`/pets/${pet.id}`}>
                  <button
                    style={{
                      width: "100%",
                      padding: "14px",
                      border: "none",
                      borderRadius: "10px",
                      backgroundColor: "#31A9C4",
                      color: "#fff",
                      fontWeight: "bold",
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                  >
                    Ver detalhes
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}