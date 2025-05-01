"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Animal = {
  id: string;
  nome: string;
  especie: string;
  idade: number;
  habitat: string;
};

type Zookeeper = {
  id: string;
  nome: string;
  cpf: string;
  idade: number;
  especialidade: string;
  animais: Animal[];
};

export default function ZookeeperDetailsPage() {
  const { id } = useParams();
  const [cuidador, setCuidador] = useState<Zookeeper | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchZookeeper() {
      try {
        const response = await fetch(`http://localhost:3000/zookeepers/${id}`);
        if (!response.ok) throw new Error("Erro ao buscar cuidador");
        const data = await response.json();
        setCuidador(data);
      } catch (err) {
        alert("Erro ao carregar dados do cuidador.");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchZookeeper();
  }, [id]);

  if (loading) return <div>Carregando cuidador...</div>;
  if (!cuidador) return <div>Cuidador não encontrado.</div>;

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto", padding: "20px" }}>
      <h1>Detalhes do Cuidador</h1>

      <div
        style={{
          backgroundColor: "#f4f1ea",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "16px",
          marginBottom: "24px",
        }}
      >
        <p>
          <strong>Nome:</strong> {cuidador.nome}
        </p>
        <p>
          <strong>CPF:</strong> {cuidador.cpf}
        </p>
        <p>
          <strong>Idade:</strong> {cuidador.idade} anos
        </p>
        <p>
          <strong>Especialidade:</strong> {cuidador.especialidade}
        </p>
      </div>

      <h2>🐾 Animais sob sua responsabilidade</h2>
      {cuidador.animais.length === 0 ? (
        <p style={{ fontStyle: "italic", color: "#777" }}>
          Este cuidador não está responsável por nenhum animal até o momento.
        </p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {cuidador.animais.map((animal) => (
            <li
              key={animal.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "12px",
                marginBottom: "10px",
                backgroundColor: "#fff",
              }}
            >
              <p>
                <strong>Nome:</strong> {animal.nome}
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
            </li>
          ))}
        </ul>
      )}

      <a
        href="/zookeepers"
        style={{
          display: "inline-block",
          marginTop: "30px",
          textDecoration: "none",
          color: "#5d8c57",
        }}
      >
        ← Voltar para lista de cuidadores
      </a>
    </div>
  );
}
