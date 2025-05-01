"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Zookeeper = {
  id: string;
  nome: string;
  cpf: string;
  idade: number;
  especialidade: string;
};

export default function ZookeepersPage() {
  const [zookeepers, setZookeepers] = useState<Zookeeper[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchZookeepers() {
      try {
        const response = await fetch("http://localhost:3000/zookeepers");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setZookeepers(data);
      } catch (error) {
        console.error("Erro ao buscar cuidadores:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchZookeepers();
  }, []);

  const handleDelete = async (id: string) => {
    const confirm = window.confirm(
      "Tem certeza que deseja deletar este cuidador?"
    );
    if (!confirm) return;

    try {
      const response = await fetch(`http://localhost:3000/zookeepers/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar cuidador");
      }

      setZookeepers((prev) => prev.filter((z) => z.id !== id));
      alert("Cuidador deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar cuidador:", error);
      alert("Não foi possível deletar o cuidador.");
    }
  };

  if (loading) {
    return <div>Carregando cuidadores...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Tratadores</h1>

      <div style={{ marginBottom: "20px" }}>
        <Link href="/zookeepers/criarNovo" style={{ textDecoration: "none" }}>
          <button
            style={{
              backgroundColor: "#5d8c57",
              color: "#fff",
              padding: "10px 16px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            + Cadastrar novo cuidador
          </button>
        </Link>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {zookeepers.length === 0 ? (
          <p style={{ fontStyle: "italic", color: "#777", marginTop: "10px" }}>
            👨‍🌾 Nenhum cuidador cadastrado até o momento.
          </p>
        ) : (
          zookeepers.map((z) => (
            <li
              key={z.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "12px",
                padding: "16px",
                marginBottom: "12px",
                backgroundColor: "#f4f1ea",
              }}
            >
              <h2>{z.nome}</h2>
              <p>
                <strong>CPF:</strong> {z.cpf}
              </p>
              <p>
                <strong>Idade:</strong> {z.idade} anos
              </p>
              <p>
                <strong>Especialidade:</strong> {z.especialidade}
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                {/* Botão Deletar - esquerda */}
                <button
                  onClick={() => handleDelete(z.id)}
                  style={{
                    backgroundColor: "#c0392b",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    padding: "8px 12px",
                    cursor: "pointer",
                    fontSize: "1rem",
                  }}
                >
                  🗑️ Deletar
                </button>

                {/* Botão Visualizar - centro */}
                <Link
                  href={`/zookeepers/${z.id}`}
                  style={{
                    backgroundColor: "#f39c12",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    padding: "8px 12px",
                    textDecoration: "none",
                    fontSize: "1rem",
                  }}
                >
                  👁️ Visualizar cuidador
                </Link>

                {/* Botão Editar - direita */}
                <Link
                  href={`/zookeepers/${z.id}/editar`}
                  style={{
                    backgroundColor: "#2980b9",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    padding: "8px 12px",
                    textDecoration: "none",
                    fontSize: "1rem",
                  }}
                >
                  ✏️ Editar
                </Link>
              </div>
            </li>
          ))
        )}
      </ul>

      <div style={{ marginBottom: "20px" }}>
        <a
          href="/"
          style={{
            display: "inline-block",
            backgroundColor: "#ccc",
            color: "#333",
            padding: "8px 14px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          ← Voltar à página principal
        </a>
      </div>
    </div>
  );
}
