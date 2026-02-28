// app/page.tsx
import { redirect } from 'next/navigation';

export default function Home() {
  // Redireciona imediatamente para a página de usuários
  redirect('/usuarios');
  
  // O código abaixo nunca é executado por causa do redirect
  return null;
}
