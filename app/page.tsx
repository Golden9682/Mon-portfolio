import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Projects } from "@/components/Projects";
import { Statement } from "@/components/Statement";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ScrollEngine } from "@/components/ui/ScrollEngine";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col">
      <ScrollEngine />
      <Navbar />
      <Hero />
      <Services />
      <Projects />
      <Statement />
      <Skills />
      <Experience />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
