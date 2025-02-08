import Login from "@/components/Login";
import Registro from "@/components/Registro";

export default function Home() {
  return (
    <div className="h-screen w-full flex items-center justify-center gap-4">
      <Registro />
      <Login/>
    </div>
  );
}
