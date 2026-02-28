import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// LISTAR
export async function GET() {
  const usuarios = await prisma.usuario.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(usuarios);
}

// CRIAR
export async function POST(request: Request) {
  const body = await request.json();

  const usuario = await prisma.usuario.create({
    data: {
      nome: body.nome,
      dataNascimento: new Date(body.dataNascimento),
      rg: body.rg,
      cpf: body.cpf,
    },
  });

  return NextResponse.json(usuario);
}