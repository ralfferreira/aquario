"use client"

import GradientHeaderComponent from "@/components/Shared/GradientHeader";
import MarkdownRenderer from "@/components/Shared/MarkdownRender";
import GuideIndex from "@/components/Shared/GuideIndex";

export default function Guias() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-6 px-0">

      <GradientHeaderComponent academicCenter="Centro de Informática" courses={["Engenharia da Computação", "Ciência da Computação", "Ciência de Dados e Inteligência Artificial"]} currentCourse="Engenharia da Computação" />

      <p>FAQ Page</p>

      <GuideIndex data={[]} />

      <MarkdownRenderer content={""} title={""} />
    </main>
  );
}
