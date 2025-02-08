import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen w-full flex items-center justify-center gap-4">
      <Link className="p-4 bg-blue-900 border border-blue-500 rounded-lg hover:bg-blue-500" href={'/login'}>Entrar</Link>
      <Link className="p-4 bg-blue-900 border border-blue-500 rounded-lg hover:bg-blue-500" href={'/registro'}>Registrar</Link>
    </div>
  );
}
