// app/usuarios/novo/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface FormData {
  nome: string;
  dataNascimento: string;
  rg: string;
  cpf: string;
}

export default function NovoUsuarioPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    dataNascimento: "",
    rg: "",
    cpf: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/usuarios");
      } else {
        alert("Erro ao cadastrar usuário");
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar usuário");
    }
  };

  return (
    <div style={container}>
      <div style={header}>
        <h1 style={{ margin: 0 }}>Novo Usuário</h1>
      </div>

      <div style={card}>
        <form onSubmit={handleSubmit} style={form}>
          <div style={formGroup}>
            <label style={label}>Nome</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              style={input}
            />
          </div>

          <div style={formGroup}>
            <label style={label}>Data de Nascimento</label>
            <input
              type="date"
              name="dataNascimento"
              value={formData.dataNascimento}
              onChange={handleChange}
              required
              style={input}
            />
          </div>

          <div style={formGroup}>
            <label style={label}>RG</label>
            <input
              type="text"
              name="rg"
              value={formData.rg}
              onChange={handleChange}
              required
              style={input}
            />
          </div>

          <div style={formGroup}>
            <label style={label}>CPF</label>
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              required
              style={input}
            />
          </div>

          <button type="submit" style={buttonPrimary}>
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

/* ====== ESTILOS ====== */

const container = {
  padding: "40px",
  fontFamily: "Inter, Arial, sans-serif",
  backgroundColor: "#f8fafc",
  minHeight: "100vh",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "30px",
};

const card = {
  backgroundColor: "white",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
  padding: "20px",
};

const form = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "20px",
};

const formGroup = {
  display: "flex",
  flexDirection: "column" as const,
};

const label = {
  marginBottom: "8px",
  fontSize: "14px",
  color: "#475569",
  fontWeight: 500,
};

const input = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  fontSize: "14px",
};

const buttonPrimary = {
  backgroundColor: "#2563eb",
  color: "white",
  padding: "10px 16px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontWeight: 500,
  marginTop: "10px",
};