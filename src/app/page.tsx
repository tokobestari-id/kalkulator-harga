import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CalculatorApp } from "@/components/calculator/CalculatorApp";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <CalculatorApp />
      </main>
      <Footer />
    </div>
  );
}
