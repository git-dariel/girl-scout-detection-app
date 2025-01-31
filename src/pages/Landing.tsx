import { Features } from "../components/Features";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { Navigation } from "../components/Navigation";

export const Landing = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-green-500/10" />

      {/* Content */}
      <div className="relative">
        <Navigation />
        <Hero />
        <Features />
        <Footer />
      </div>

      {/* Background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/10 rounded-full mix-blend-overlay filter blur-3xl" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full mix-blend-overlay filter blur-3xl" />
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-green-500/10 rounded-full mix-blend-overlay filter blur-3xl" />
    </div>
  );
};
