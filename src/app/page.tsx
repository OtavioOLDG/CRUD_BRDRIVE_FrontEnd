export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <main
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          width: "100%",
          marginTop: "60px",
          padding: "20px",
          backgroundColor: "#f4f1ea", // fundo bege claro
        }}
      >
        <a
          href="/animals"
          style={{
            textDecoration: "none",
            color: "#3e3d38", // marrom escuro
          }}
        >
          <div
            style={{
              padding: "20px",
              border: "2px solid #5d8c57", // verde folhagem
              borderRadius: "16px",
              textAlign: "center",
              backgroundColor: "#ffffff", // fundo claro nos cards
            }}
          >
            <h2 style={{ margin: "0 0 10px", color: "#3e3d38" }}>Animais</h2>
            <p style={{ margin: 0, color: "#5d8c57" }}>
              Conheça nossos incríveis animais
            </p>
          </div>
        </a>

        <a
          href="/zookeepers"
          style={{
            textDecoration: "none",
            color: "#3e3d38",
          }}
        >
          <div
            style={{
              padding: "20px",
              border: "2px solid #5d8c57",
              borderRadius: "16px",
              textAlign: "center",
              backgroundColor: "#ffffff",
            }}
          >
            <h2 style={{ margin: "0 0 10px", color: "#3e3d38" }}>Tratadores</h2>
            <p style={{ margin: 0, color: "#5d8c57" }}>
              Saiba mais sobre nossa equipe de tratadores
            </p>
          </div>
        </a>
      </main>
      <footer style={{ marginTop: "40px" }}>
        <p>© 2025 Zoológico. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
