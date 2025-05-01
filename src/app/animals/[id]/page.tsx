"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Animal = {
  id: string;
  nome: string;
  especie: string;
  idade: number;
  habitat: string;
  criadoEm: string;
  cuidadorId: string;
};

type Zookeeper = {
  id: string;
  nome: string;
  cpf: string;
  idade: number;
  especialidade: string;
};

export default function VisualizarAnimalPage() {
  const { id } = useParams();
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [cuidador, setCuidador] = useState<Zookeeper | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnimalAndZookeeper() {
      try {
        // Busca o animal
        const resAnimal = await fetch(`http://localhost:3000/animals/${id}`);
        if (!resAnimal.ok) throw new Error("Erro ao buscar animal");
        const animalData: Animal = await resAnimal.json();
        setAnimal(animalData);

        // Busca o cuidador com base no cuidadorId
        const resZookeeper = await fetch(
          `http://localhost:3000/zookeepers/${animalData.cuidadorId}`
        );
        if (!resZookeeper.ok) throw new Error("Erro ao buscar cuidador");
        const cuidadorData: Zookeeper = await resZookeeper.json();
        setCuidador(cuidadorData);
      } catch (err) {
        alert("Erro ao carregar dados.");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchAnimalAndZookeeper();
  }, [id]);

  if (loading) return <div>Carregando animal...</div>;
  if (!animal) return <div>Animal não encontrado.</div>;

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto", padding: "20px" }}>
      <h1>Detalhes do Animal</h1>

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
          <strong>ID:</strong> {animal.id}
        </p>
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
        <p>
          <strong>Criado em:</strong>{" "}
          {new Date(animal.criadoEm).toLocaleDateString()}
        </p>
        <p>
          <strong>Cuidador ID:</strong> {animal.cuidadorId}
        </p>
      </div>

      <h2>👨‍🌾 Dados do Cuidador Responsável</h2>
      {cuidador ? (
        <div
          style={{
            backgroundColor: "#eaf7e9",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "16px",
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
      ) : (
        <p style={{ color: "#c0392b", fontStyle: "italic" }}>
          Cuidador não encontrado.
        </p>
      )}

      <a
        href="/animals"
        style={{
          display: "inline-block",
          marginTop: "30px",
          textDecoration: "none",
          color: "#5d8c57",
        }}
      >
        ← Voltar para lista de animais
      </a>
    </div>
  );
}
