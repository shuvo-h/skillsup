import CounterClientComponent from "@/components/CounterClientComponent";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <h2 className="text-2xl">THis is home page</h2>
      <div>
        <CounterClientComponent />
      </div>
    </main>
  );
}
