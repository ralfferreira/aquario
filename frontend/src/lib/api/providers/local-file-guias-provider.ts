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
    // Find all section folders for this course (these become the guias)
    const courseFiles = Object.keys(this.contentFiles).filter(
      key => key.includes(`/${cursoSlug}/`) && key.endsWith("/content.md")
    );

    const sections = new Set<string>();
    courseFiles.forEach(filePath => {
      const parts = filePath.split("/");
      const sectionIndex = parts.indexOf(cursoSlug) + 1;
      if (sectionIndex < parts.length) {
        sections.add(parts[sectionIndex]);
      }
    });

    const guias: Guia[] = [];
    const cursoName = this.slugToName(cursoSlug);

    sections.forEach(sectionSlug => {
      const guiaId = `guia-${sectionSlug}`;
      guias.push({
        id: guiaId,
        titulo: this.slugToName(sectionSlug), // Group titles like "Conceitos Básicos"
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
    // Find all content files under this guia (group)
    const courseFiles = Object.keys(this.contentFiles).filter(
      key => key.includes(`/${guiaSlug}/`) && key.endsWith("/content.md")
    );

    const sections = new Set<string>();
    courseFiles.forEach(filePath => {
      const parts = filePath.split("/");
      const guiaIndex = parts.indexOf(guiaSlug);

      // Get the next level after the guia (main sections)
      if (guiaIndex + 1 < parts.length) {
        sections.add(parts[guiaIndex + 1]);
      }
    });

    const secoes: Secao[] = [];
    let ordem = 1;

    sections.forEach(sectionSlug => {
      // Main sections can have content or be containers
      const mainContentFile = Object.keys(this.contentFiles).find(
        key =>
          key.includes(`/${guiaSlug}/${sectionSlug}/content.md`) &&
          key.endsWith(`/${sectionSlug}/content.md`) // Direct content file
      );

      // If no direct content, generate an index of subsections
      let conteudo = mainContentFile ? this.contentFiles[mainContentFile] : null;

      if (!conteudo) {
        // Find subsections for this section
        const subsectionFiles = Object.keys(this.contentFiles).filter(
          key =>
            key.includes(`/${guiaSlug}/${sectionSlug}/`) &&
            key.endsWith("/content.md") &&
            !key.endsWith(`/${sectionSlug}/content.md`)
        );

        if (subsectionFiles.length > 0) {
          const subsections = subsectionFiles.map(filePath => {
            const parts = filePath.split("/");
            const subsectionSlug = parts[parts.length - 2];
            return `- [${this.slugToName(subsectionSlug)}](${subsectionSlug})`;
          });

          conteudo = `# ${this.slugToName(sectionSlug)}\n\n## Conteúdo disponível\n\n${subsections.join("\n")}`;
        }
      }

      const secao: Secao = {
        id: `secao-${sectionSlug}`,
        guiaId: `guia-${guiaSlug}`,
        titulo: this.slugToName(sectionSlug),
        slug: sectionSlug,
        ordem: ordem++,
        conteudo: conteudo,
        status: "ATIVO",
      };

      secoes.push(secao);
    });

    return Promise.resolve(secoes);
  }

  getSubSecoes(secaoSlug: string): Promise<SubSecao[]> {
    // Find all content files under this section
    const subsectionFiles = Object.keys(this.contentFiles).filter(
      key =>
        key.includes(`/${secaoSlug}/`) &&
        key.endsWith("/content.md") &&
        !key.endsWith(`/${secaoSlug}/content.md`) // Exclude the main section file
    );

    const subSecoes: SubSecao[] = [];
    let ordem = 1;

    subsectionFiles.forEach(filePath => {
      const parts = filePath.split("/");
      const secaoIndex = parts.indexOf(secaoSlug);

      // Get the main section slug (the folder name after the section)
      const mainSectionSlug = parts[secaoIndex + 1];

      // Check if this is a sub-section (3 levels deep: section/main-section/sub-section/content.md)
      const isSubSection = parts.length > secaoIndex + 3;

      if (isSubSection) {
        // This is a sub-section (level 3)
        const subSectionSlug = parts[secaoIndex + 2];
        const subSecao: SubSecao = {
          id: `subsecao-${subSectionSlug}`,
          secaoId: `secao-${secaoSlug}`,
          titulo: this.slugToName(subSectionSlug),
          slug: subSectionSlug,
          ordem: ordem++,
          conteudo: this.contentFiles[filePath] || "# Conteúdo não disponível",
          status: "ATIVO",
        };
        subSecoes.push(subSecao);
      } else {
        // This is a main section (level 2) - treat as subsection for now
        const subSecao: SubSecao = {
          id: `subsecao-${mainSectionSlug}`,
          secaoId: `secao-${secaoSlug}`,
          titulo: this.slugToName(mainSectionSlug),
          slug: mainSectionSlug,
          ordem: ordem++,
          conteudo: this.contentFiles[filePath] || "# Conteúdo não disponível",
          status: "ATIVO",
        };
        subSecoes.push(subSecao);
      }
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

  getCursos(
    centroSigla: string
  ): Promise<Array<{ id: string; nome: string; centroId: string; realId: string }>> {
    const cursos: Array<{ id: string; nome: string; centroId: string; realId: string }> = [];
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
        realId: cursoName, // For local provider, realId is same as id
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
