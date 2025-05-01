"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Zookeeper = {
  id: string;
  nome: string;
  cpf: string;
  idade: number;
  especialidade: string;
};

export default function CriarAnimalPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    nome: "",
    especie: "",
    idade: "",
    habitat: "",
    cuidadorId: "",
  });

  const [cuidadores, setCuidadores] = useState<Zookeeper[]>([]);

  useEffect(() => {
    async function fetchCuidadores() {
      try {
        const res = await fetch("http://localhost:3000/zookeepers");
        if (!res.ok) throw new Error("Erro ao buscar cuidadores");
        const data = await res.json();
        setCuidadores(data);
      } catch (err) {
        alert("Não foi possível carregar os cuidadores.");
      }
    }

    fetchCuidadores();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cuidadores.length === 0) {
      alert("Você precisa cadastrar um tratador antes de criar um animal.");
      return;
    }

    const response = await fetch("http://localhost:3000/animals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: form.nome,
        especie: form.especie,
        idade: parseInt(form.idade),
        habitat: form.habitat,
        cuidadorId: form.cuidadorId,
      }),
    });

    if (response.ok) {
      alert("Animal cadastrado com sucesso!");
      router.push("/animals");
    } else {
      alert("Erro ao cadastrar animal.");
    }
  };

  const inputStyle = {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    boxShadow: "1px 1px 3px rgba(0,0,0,0.1)",
    fontSize: "1rem",
  };

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto", padding: "20px" }}>
      <h1>Cadastrar Novo Animal</h1>

      <p
        style={{
          backgroundColor: "#f9f3d2",
          padding: "10px",
          borderRadius: "6px",
        }}
      >
        ⚠️ Para cadastrar um novo animal, é necessário escolher um cuidador
        responsável.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginTop: "20px",
        }}
      >
        <label>
          <strong>Nome do animal</strong>
        </label>
        <input
          name="nome"
          value={form.nome}
          onChange={handleChange}
          required
          placeholder="Digite o nome"
          style={inputStyle}
        />

        <label>
          <strong>Espécie</strong>
        </label>
        <input
          name="especie"
          value={form.especie}
          onChange={handleChange}
          required
          placeholder="Digite a espécie"
          style={inputStyle}
        />

        <label>
          <strong>Idade</strong>
        </label>
        <input
          name="idade"
          type="number"
          value={form.idade}
          onChange={handleChange}
          required
          placeholder="Digite a idade"
          style={inputStyle}
        />

        <label>
          <strong>Habitat</strong>
        </label>
        <input
          name="habitat"
          value={form.habitat}
          onChange={handleChange}
          required
          placeholder="Digite o habitat"
          style={inputStyle}
        />

        <label>
          <strong>Cuidador Responsável</strong>
        </label>
        {cuidadores.length === 0 ? (
          <p style={{ color: "#c0392b", fontWeight: "bold" }}>
            ⚠️ Cadastre um tratador antes de prosseguir.
          </p>
        ) : (
          <select
            name="cuidadorId"
            value={form.cuidadorId}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">-- Selecione um cuidador --</option>
            {cuidadores.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </select>
        )}

        <button
          type="submit"
          style={{
            backgroundColor: "#5d8c57",
            color: "#fff",
            padding: "10px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Cadastrar
        </button>
      </form>

      <h2 style={{ marginTop: "40px" }}>👨‍🌾 Cuidadores Disponíveis</h2>
      {cuidadores.length === 0 ? (
        <p style={{ fontStyle: "italic", color: "#777" }}>
          Nenhum cuidador cadastrado ainda.
        </p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {cuidadores.map((cuidador) => (
            <li
              key={cuidador.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "12px",
                marginBottom: "10px",
                backgroundColor: "#f4f1ea",
              }}
            >
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
            </li>
          ))}
        </ul>
      )}

      <p style={{ marginTop: "20px" }}>
        🔍 Deseja visualizar todos os cuidadores ou cadastrar um novo?{" "}
        <a
          href="/zookeepers"
          style={{
            marginLeft: "6px",
            color: "#2980b9",
            textDecoration: "underline",
            fontWeight: "bold",
          }}
        >
          Acesse a página de tratadores →
        </a>
      </p>

      <a
        href="/animals"
        style={{
          marginTop: "30px",
          display: "inline-block",
          textDecoration: "none",
          color: "#5d8c57",
        }}
      >
        ← Voltar para lista de animais
      </a>
    </div>
  );
}
