"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Zookeeper = {
  id: string;
  nome: string;
  cpf: string;
  idade: number;
  especialidade: string;
};

export default function EditarZookeeperPage() {
  const { id } = useParams();
  const router = useRouter();

  const [zookeeper, setZookeeper] = useState<Zookeeper | null>(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    idade: "",
    especialidade: "",
  });

  useEffect(() => {
    async function fetchZookeeper() {
      try {
        const res = await fetch(`http://localhost:3000/zookeepers/${id}`);
        if (!res.ok) throw new Error("Erro ao buscar cuidador");
        const data: Zookeeper = await res.json();
        setZookeeper(data);
        setForm({
          nome: data.nome,
          cpf: data.cpf,
          idade: data.idade.toString(),
          especialidade: data.especialidade,
        });
      } catch (err) {
        alert("Erro ao carregar dados.");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchZookeeper();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/zookeepers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: form.nome,
          cpf: form.cpf,
          idade: parseInt(form.idade),
          especialidade: form.especialidade,
        }),
      });

      if (!response.ok) throw new Error("Erro ao atualizar");
      alert("Cuidador atualizado com sucesso!");
      router.push("/zookeepers");
    } catch (err) {
      alert("Erro ao salvar alterações.");
    }
  };

  if (loading) return <div>Carregando dados...</div>;
  if (!zookeeper) return <div>Cuidador não encontrado.</div>;

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
      <h1>Editar Cuidador</h1>

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
          <strong>ID:</strong> {zookeeper.id}
        </p>
        <p>
          <strong>Nome:</strong> {zookeeper.nome}
        </p>
        <p>
          <strong>CPF:</strong> {zookeeper.cpf}
        </p>
        <p>
          <strong>Idade:</strong> {zookeeper.idade} anos
        </p>
        <p>
          <strong>Especialidade:</strong> {zookeeper.especialidade}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <div>
          <label htmlFor="nome">
            <strong>Nome</strong>
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
          <label htmlFor="cpf">
            <strong>CPF</strong>
          </label>
          <input
            id="cpf"
            name="cpf"
            value={form.cpf}
            onChange={handleChange}
            required
            placeholder="Digite o CPF"
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
          <label htmlFor="especialidade">
            <strong>Especialidade</strong>
          </label>
          <input
            id="especialidade"
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
            padding: "10px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1rem",
            marginTop: "10px",
          }}
        >
          Salvar Alterações
        </button>
      </form>

      <a
        href="/zookeepers"
        style={{
          display: "inline-block",
          marginTop: "20px",
          color: "#5d8c57",
          textDecoration: "none",
        }}
      >
        ← Voltar para lista de cuidadores
      </a>
    </div>
  );
}
