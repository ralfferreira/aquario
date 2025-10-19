import { Guia, Secao, SubSecao } from "../../types";
import { GuiasDataProvider } from "./guias-provider.interface";

// Import all markdown files from the content directory
declare const require: {
  context(
    path: string,
    deep?: boolean,
    filter?: RegExp
  ): {
    keys(): string[];
    (id: string): { default: string };
  };
};

const contentContext = require.context("../../../../content/guias", true, /\.md$/);

export class LocalFileGuiasProvider implements GuiasDataProvider {
  private contentFiles: Record<string, string> = {};

  constructor() {
    // Load all markdown files at initialization
    contentContext.keys().forEach((key: string) => {
      const content = contentContext(key);
      this.contentFiles[key] = typeof content === "string" ? content : content.default;
    });
  }

  getByCurso(cursoSlug: string): Promise<Guia[]> {
    // Find all files for this course
    const courseFiles = Object.keys(this.contentFiles).filter(
      key => key.includes(`/${cursoSlug}/`) && key.endsWith("/content.md")
    );

    const guias: Guia[] = [];
    const cursoName = this.slugToName(cursoSlug);

    // Group files by section (parent directory)
    const sections = new Set<string>();
    courseFiles.forEach(filePath => {
      const parts = filePath.split("/");
      const sectionIndex = parts.indexOf(cursoSlug) + 1;
      if (sectionIndex < parts.length) {
        sections.add(parts[sectionIndex]);
      }
    });

    sections.forEach(sectionSlug => {
      const guiaId = `guia-${sectionSlug}`;
      guias.push({
        id: guiaId,
        titulo: this.slugToName(sectionSlug),
        slug: sectionSlug,
        descricao: `Guia para ${this.slugToName(sectionSlug)}`,
        status: "ATIVO",
        cursoId: cursoSlug,
        tags: [cursoName, this.slugToName(sectionSlug)],
      });
    });

    return Promise.resolve(guias);
  }

  getSecoes(guiaSlug: string): Promise<Secao[]> {
    // Find the main content file for this section
    const mainContentFile = Object.keys(this.contentFiles).find(key =>
      key.includes(`/${guiaSlug}/content.md`)
    );

    if (!mainContentFile) {
      return Promise.resolve([]);
    }

    const secao: Secao = {
      id: `secao-${guiaSlug}`,
      guiaId: `guia-${guiaSlug}`,
      titulo: this.slugToName(guiaSlug),
      slug: guiaSlug,
      ordem: 1,
      conteudo: this.contentFiles[mainContentFile] || "# Conteúdo não disponível",
      status: "ATIVO",
    };

    return Promise.resolve([secao]);
  }

  getSubSecoes(secaoSlug: string): Promise<SubSecao[]> {
    // Find all subsection files for this section
    const subsectionFiles = Object.keys(this.contentFiles).filter(
      key =>
        key.includes(`/${secaoSlug}/`) &&
        key.endsWith("/content.md") &&
        !key.endsWith(`/${secaoSlug}/content.md`) // Exclude the main section file
    );

    const subSecoes: SubSecao[] = [];

    subsectionFiles.forEach((filePath, index) => {
      const parts = filePath.split("/");
      const subsectionSlug = parts[parts.length - 2]; // Get the subsection folder name

      const subSecao: SubSecao = {
        id: `subsecao-${subsectionSlug}`,
        secaoId: `secao-${secaoSlug}`,
        titulo: this.slugToName(subsectionSlug),
        slug: subsectionSlug,
        ordem: index + 1,
        conteudo: this.contentFiles[filePath] || "# Conteúdo não disponível",
        status: "ATIVO",
      };
      subSecoes.push(subSecao);
    });

    return Promise.resolve(subSecoes);
  }

  getCentros(): Promise<Array<{ id: string; nome: string; sigla: string }>> {
    const centros: Array<{ id: string; nome: string; sigla: string }> = [];
    const centroNames = new Set<string>();

    // Extract unique centro names from file paths
    Object.keys(this.contentFiles).forEach(filePath => {
      const parts = filePath.split("/");
      const centroIndex = parts.indexOf("centro-de-informatica");
      if (centroIndex !== -1) {
        centroNames.add(parts[centroIndex]);
      }
    });

    centroNames.forEach(centroName => {
      centros.push({
        id: centroName.toLowerCase(),
        nome: this.slugToName(centroName),
        sigla: centroName.toUpperCase(),
      });
    });

    return Promise.resolve(centros);
  }

  getCursos(centroSigla: string): Promise<Array<{ id: string; nome: string; centroId: string }>> {
    const cursos: Array<{ id: string; nome: string; centroId: string }> = [];
    const cursoNames = new Set<string>();

    // Extract unique curso names from file paths
    Object.keys(this.contentFiles).forEach(filePath => {
      const parts = filePath.split("/");
      const centroIndex = parts.indexOf("centro-de-informatica");
      if (centroIndex !== -1 && centroIndex + 1 < parts.length) {
        const cursoName = parts[centroIndex + 1];
        cursoNames.add(cursoName);
      }
    });

    cursoNames.forEach(cursoName => {
      cursos.push({
        id: cursoName,
        nome: this.slugToName(cursoName),
        centroId: centroSigla.toLowerCase(),
      });
    });

    return Promise.resolve(cursos);
  }

  private slugToName(slug: string): string {
    return slug
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
}
