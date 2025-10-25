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

const contentContext = require.context("../../../../content/aquario-guias", true, /\.md$/);

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
      key =>
        (key.includes(`/${cursoSlug}/`) || key.startsWith(`./${cursoSlug}/`)) &&
        key.endsWith("/content.md")
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

  getSecoes(guiaSlug: string, cursoSlug?: string): Promise<Secao[]> {
    // Find all content files under this guia (group), optionally filtered by course
    const courseFiles = Object.keys(this.contentFiles).filter(key => {
      const hasGuia = key.includes(`/${guiaSlug}/`);
      const isContentFile = key.endsWith("/content.md");
      const isFromCorrectCourse =
        !cursoSlug || key.includes(`/${cursoSlug}/`) || key.startsWith(`./${cursoSlug}/`);

      return hasGuia && isContentFile && isFromCorrectCourse;
    });

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
      const mainContentFile = Object.keys(this.contentFiles).find(key => {
        const hasGuiaAndSection = key.includes(`/${guiaSlug}/${sectionSlug}/content.md`);
        const isDirectContent = key.endsWith(`/${sectionSlug}/content.md`);
        const isFromCorrectCourse =
          !cursoSlug || key.includes(`/${cursoSlug}/`) || key.startsWith(`./${cursoSlug}/`);
        return hasGuiaAndSection && isDirectContent && isFromCorrectCourse;
      });

      // If no direct content, generate an index of subsections
      let conteudo = mainContentFile ? this.contentFiles[mainContentFile] : null;

      if (!conteudo) {
        // Find subsections for this section, filtered by course
        const subsectionFiles = Object.keys(this.contentFiles).filter(key => {
          const hasGuiaAndSection = key.includes(`/${guiaSlug}/${sectionSlug}/`);
          const isContentFile = key.endsWith("/content.md");
          const isNotMainSection = !key.endsWith(`/${sectionSlug}/content.md`);
          const isFromCorrectCourse =
            !cursoSlug || key.includes(`/${cursoSlug}/`) || key.startsWith(`./${cursoSlug}/`);

          return hasGuiaAndSection && isContentFile && isNotMainSection && isFromCorrectCourse;
        });

        if (subsectionFiles.length > 0) {
          const subsections = subsectionFiles.map(filePath => {
            const parts = filePath.split("/");
            const subsectionSlug = parts[parts.length - 2];
            // Generate absolute URL: /guias/{curso}/{guia}/{secao}/{subsecao}
            const absoluteUrl = cursoSlug
              ? `/guias/${cursoSlug}/${guiaSlug}/${sectionSlug}/${subsectionSlug}`
              : subsectionSlug;
            return `- [${this.slugToName(subsectionSlug)}](${absoluteUrl})`;
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

  getSubSecoes(secaoSlug: string, cursoSlug?: string): Promise<SubSecao[]> {
    // Find all content files under this section, optionally filtered by course
    const subsectionFiles = Object.keys(this.contentFiles).filter(key => {
      const hasSection = key.includes(`/${secaoSlug}/`);
      const isContentFile = key.endsWith("/content.md");
      const isNotMainSection = !key.endsWith(`/${secaoSlug}/content.md`);
      const isFromCorrectCourse =
        !cursoSlug || key.includes(`/${cursoSlug}/`) || key.startsWith(`./${cursoSlug}/`);

      return hasSection && isContentFile && isNotMainSection && isFromCorrectCourse;
    });

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
    // Since we no longer have centro hierarchy, return a default centro
    return Promise.resolve([
      {
        id: "centro-informatica",
        nome: "Centro de Informática",
        sigla: "CI",
      },
    ]);
  }

  getCursos(
    centroSigla: string
  ): Promise<Array<{ id: string; nome: string; centroId: string; realId: string }>> {
    const cursos: Array<{ id: string; nome: string; centroId: string; realId: string }> = [];
    const cursoNames = new Set<string>();

    // Extract unique curso names from file paths (they're now at the root level)
    Object.keys(this.contentFiles).forEach(filePath => {
      const parts = filePath.split("/").filter(p => p && p !== ".");
      // First part after removing dots should be the course slug
      if (parts.length > 0) {
        cursoNames.add(parts[0]);
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
