import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { SkillsBento } from "@/components/SkillsBento";
import { Experience } from "@/components/Experience";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Projects />
      <SkillsBento />
      <Experience />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
