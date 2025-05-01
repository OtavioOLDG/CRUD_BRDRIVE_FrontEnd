"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Animal = {
  id: string;
  nome: string;
  especie: string;
  idade: number;
  habitat: string;
  criadoEm: string;
  cuidadorId: string;
};

export default function AnimalsPage() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnimals() {
      try {
        const response = await fetch("http://localhost:3000/animals");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setAnimals(data);
      } catch (error) {
        console.error("Error fetching animals:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAnimals();
  }, []);

  const handleDelete = async (id: string) => {
    const confirm = window.confirm(
      "Tem certeza que deseja deletar este animal?"
    );
    if (!confirm) return;

    try {
      const response = await fetch(`http://localhost:3000/animals/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar animal");
      }

      setAnimals((prev) => prev.filter((animal) => animal.id !== id));
      alert("Animal deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar animal:", error);
      alert("Não foi possível deletar o animal.");
    }
  };

  if (loading) {
    return <div>Carregando animais...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Animais</h1>

      <div style={{ marginBottom: "20px" }}>
        <Link href="/animals/criarNovo" style={{ textDecoration: "none" }}>
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
            + Cadastrar novo animal
          </button>
        </Link>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {animals.length === 0 ? (
          <p style={{ fontStyle: "italic", color: "#777", marginTop: "10px" }}>
            🐾 Nenhum animal cadastrado até o momento.
          </p>
        ) : (
          animals.map((animal) => (
            <li
              key={animal.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "12px",
                padding: "16px",
                marginBottom: "12px",
                backgroundColor: "#f4f1ea",
              }}
            >
              <h2>{animal.nome}</h2>
              <p>
                <strong>Id:</strong> {animal.id}
              </p>
              <p>
                <strong>Espécie:</strong> {animal.especie}
              </p>
              <p>
                <strong>Idade:</strong> {animal.idade} anos
              </p>
              <p>
                <strong>Habitat:</strong> {animal.habitat}
              </p>
              <p>
                <strong>Criado em:</strong>{" "}
                {new Date(animal.criadoEm).toLocaleDateString()}
              </p>
              <p>
                <strong>Cuidador ID:</strong> {animal.cuidadorId}
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
                  onClick={() => handleDelete(animal.id)}
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
                  href={`/animals/${animal.id}`}
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
                  👁️ Visualizar animal
                </Link>

                {/* Botão Editar - direita */}
                <Link
                  href={`/animals/${animal.id}/editar`}
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
