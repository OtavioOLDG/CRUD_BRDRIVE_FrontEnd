"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

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

export default function EditarAnimalPage() {
  const { id } = useParams();
  const router = useRouter();

  const [animal, setAnimal] = useState<Animal | null>(null);
  const [cuidador, setCuidador] = useState<Zookeeper | null>(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    nome: "",
    especie: "",
    idade: "",
    habitat: "",
  });

  useEffect(() => {
    async function fetchAnimalAndZookeeper() {
      try {
        const animalRes = await fetch(`http://localhost:3000/animals/${id}`);
        if (!animalRes.ok) throw new Error("Erro ao buscar animal");
        const animalData: Animal = await animalRes.json();
        setAnimal(animalData);

        setForm({
          nome: animalData.nome,
          especie: animalData.especie,
          idade: animalData.idade.toString(),
          habitat: animalData.habitat,
        });

        const cuidadorRes = await fetch(
          `http://localhost:3000/zookeepers/${animalData.cuidadorId}`
        );
        if (!cuidadorRes.ok) throw new Error("Erro ao buscar cuidador");
        const cuidadorData: Zookeeper = await cuidadorRes.json();
        setCuidador(cuidadorData);
      } catch (err) {
        alert("Erro ao carregar dados.");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchAnimalAndZookeeper();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/animals/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: form.nome,
          especie: form.especie,
          idade: parseInt(form.idade),
          habitat: form.habitat,
        }),
      });

      if (!response.ok) throw new Error("Erro ao atualizar");
      alert("Animal atualizado com sucesso!");
      router.push("/animals");
    } catch (err) {
      alert("Erro ao salvar alterações.");
    }
  };

  if (loading) return <div>Carregando dados...</div>;
  if (!animal) return <div>Animal não encontrado.</div>;

  const inputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    boxShadow: "1px 1px 3px rgba(0,0,0,0.1)",
    fontSize: "1rem",
  };

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto", padding: "20px" }}>
      <h1>Editar Animal</h1>

      <div
        style={{
          backgroundColor: "#f4f1ea",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "16px",
          marginBottom: "24px",
        }}
      >
        <h2>📋 Dados atuais</h2>
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

        {cuidador && (
          <div style={{ marginTop: "12px" }}>
            <h3>👨‍🌾 Cuidador</h3>
            <p>
              <strong>Nome:</strong> {cuidador.nome}
            </p>
            <p>
              <strong>Idade:</strong> {cuidador.idade} anos
            </p>
            <p>
              <strong>CPF:</strong> {cuidador.cpf}
            </p>
            <p>
              <strong>Especialidade:</strong> {cuidador.especialidade}
            </p>
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <div>
          <label htmlFor="nome">
            <strong>Nome do animal</strong>
          </label>
          <input
            id="nome"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
            placeholder="Digite o nome"
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="especie">
            <strong>Espécie</strong>
          </label>
          <input
            id="especie"
            name="especie"
            value={form.especie}
            onChange={handleChange}
            required
            placeholder="Digite a espécie"
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="idade">
            <strong>Idade</strong>
          </label>
          <input
            id="idade"
            name="idade"
            type="number"
            value={form.idade}
            onChange={handleChange}
            required
            placeholder="Digite a idade"
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="habitat">
            <strong>Habitat</strong>
          </label>
          <input
            id="habitat"
            name="habitat"
            value={form.habitat}
            onChange={handleChange}
            required
            placeholder="Digite o habitat"
            style={inputStyle}
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#5d8c57",
            color: "#fff",
            padding: "10px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "10px",
            fontSize: "1rem",
          }}
        >
          Salvar Alterações
        </button>
      </form>

      <a
        href="/animals"
        style={{
          display: "inline-block",
          marginTop: "20px",
          color: "#5d8c57",
          textDecoration: "none",
        }}
      >
        ← Voltar para lista de animais
      </a>
    </div>
  );
}
