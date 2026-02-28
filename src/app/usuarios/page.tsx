"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Usuario {
  id: string;
  nome: string;
  dataNascimento: string;
  rg: string;
  cpf: string;
}

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  const fetchUsuarios = () => {
    fetch("/api/usuarios")
      .then((res) => res.json())
      .then((data) => setUsuarios(data));
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este usuário?")) return;

    try {
      const res = await fetch(`/api/usuarios/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // Remove o usuário da lista local sem recarregar a página
        setUsuarios((prev) => prev.filter((u) => u.id !== id));
      } else {
        alert("Erro ao excluir usuário");
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir usuário");
    }
  };

  return (
    <div style={container}>
      <div style={header}>
        <h1 style={{ margin: 0 }}>Usuários</h1>

        <Link href="/usuarios/novo">
          <button style={buttonPrimary}>+ Novo Usuário</button>
        </Link>
      </div>

      <div style={card}>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>Nome</th>
              <th style={th}>CPF</th>
              <th style={th}>RG</th>
              <th style={th}>Data Nascimento</th>
              <th style={th}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length === 0 ? (
              <tr>
                <td colSpan={5} style={emptyState}>
                  Nenhum usuário cadastrado
                </td>
              </tr>
            ) : (
              usuarios.map((usuario) => (
                <tr key={usuario.id} style={row}>
                  <td style={td}>{usuario.nome}</td>
                  <td style={td}>{usuario.cpf}</td>
                  <td style={td}>{usuario.rg}</td>
                  <td style={td}>
                    {new Date(usuario.dataNascimento).toLocaleDateString()}
                  </td>
                  <td style={td}>
                    <Link href={`/usuarios/${usuario.id}/editar`}>
                      <button style={buttonEdit}>Editar</button>
                    </Link>
                    <button
                      style={buttonDelete}
                      onClick={() => handleDelete(usuario.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
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

const table = {
  width: "100%",
  borderCollapse: "collapse" as const,
};

const th = {
  textAlign: "left" as const,
  padding: "14px",
  borderBottom: "2px solid #e2e8f0",
  fontSize: "14px",
  color: "#475569",
};

const td = {
  padding: "14px",
  borderBottom: "1px solid #f1f5f9",
  fontSize: "14px",
};

const row = {
  transition: "background 0.2s",
};

const emptyState = {
  textAlign: "center" as const,
  padding: "30px",
  color: "#94a3b8",
};

const buttonPrimary = {
  backgroundColor: "#2563eb",
  color: "white",
  padding: "10px 16px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontWeight: 500,
  marginRight: "8px",
};

const buttonEdit = {
  backgroundColor: "#facc15",
  color: "#1f2937",
  padding: "6px 12px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  marginRight: "6px",
};

const buttonDelete = {
  backgroundColor: "#ef4444",
  color: "white",
  padding: "6px 12px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
};