"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CriarZookeeperPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    idade: "",
    especialidade: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/zookeepers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: form.nome,
        cpf: form.cpf,
        idade: parseInt(form.idade),
        especialidade: form.especialidade,
      }),
    });

    if (response.ok) {
      alert("Cuidador cadastrado com sucesso!");
      router.push("/zookeepers");
    } else {
      alert("Erro ao cadastrar cuidador.");
    }
  };

  const inputStyle = {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    boxShadow: "1px 1px 3px rgba(0,0,0,0.1)",
    fontSize: "1rem",
    width: "100%",
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}>
      <h1>Cadastrar Novo Cuidador</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          marginTop: "20px",
        }}
      >
        <div>
          <label>
            <strong>Nome</strong>
          </label>
          <input
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
            placeholder="Digite o nome"
            style={inputStyle}
          />
        </div>

        <div>
          <label>
            <strong>CPF</strong>
          </label>
          <input
            name="cpf"
            value={form.cpf}
            onChange={handleChange}
            required
            placeholder="Digite o CPF"
            style={inputStyle}
          />
        </div>

        <div>
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
        </div>

        <div>
          <label>
            <strong>Especialidade</strong>
          </label>
          <input
            name="especialidade"
            value={form.especialidade}
            onChange={handleChange}
            required
            placeholder="Digite a especialidade"
            style={inputStyle}
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#5d8c57",
            color: "#fff",
            padding: "12px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Cadastrar
        </button>
      </form>

      <a
        href="/zookeepers"
        style={{
          marginTop: "30px",
          display: "inline-block",
          textDecoration: "none",
          color: "#5d8c57",
        }}
      >
        ← Voltar para lista de cuidadores
      </a>
    </div>
  );
}
