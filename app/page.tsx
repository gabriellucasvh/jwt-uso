import Login from "@/components/Login";
import Registro from "@/components/Registro";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Registro />
      <Login/>
    </div>
  );
}
