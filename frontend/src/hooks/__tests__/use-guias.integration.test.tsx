/**
 * Integration tests for useGuias, useSecoes, and useSubSecoes hooks
 * Tests React Query integration, caching, loading states, and error handling
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { waitFor } from "@testing-library/react";
import { renderHookWithProviders } from "../../__tests__/utils/test-providers";
import { useGuias, useSecoes, useSubSecoes } from "../use-guias";
import * as guiasService from "../../lib/api/guias";

// Mock the guias service
vi.mock("../../lib/api/guias");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockGuiasService = guiasService as any;

describe("useGuias Hook", () => {
  const mockGuias = [
    {
      id: "guia-1",
      titulo: "Bem Vindo",
      slug: "bem-vindo",
      descricao: "Guia de boas-vindas",
      status: "ATIVO",
      cursoId: "ciencia-da-computacao",
      tags: ["CC", "Bem Vindo"],
    },
    {
      id: "guia-2",
      titulo: "Cadeiras",
      slug: "cadeiras",
      descricao: "Guia de cadeiras",
      status: "ATIVO",
      cursoId: "ciencia-da-computacao",
      tags: ["CC", "Cadeiras"],
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch guias for a given curso", async () => {
    mockGuiasService.guiasService = {
      getByCurso: vi.fn().mockResolvedValue(mockGuias),
    };

    const { result } = renderHookWithProviders(() => useGuias("ciencia-da-computacao"));

    // Initially loading
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();

    // Wait for data to load
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(mockGuias);
    expect(result.current.isSuccess).toBe(true);
    expect(mockGuiasService.guiasService.getByCurso).toHaveBeenCalledWith("ciencia-da-computacao");
  });

  it("should not fetch when cursoSlug is empty", async () => {
    mockGuiasService.guiasService = {
      getByCurso: vi.fn(),
    };

    const { result } = renderHookWithProviders(() => useGuias(""));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(mockGuiasService.guiasService.getByCurso).not.toHaveBeenCalled();
    expect(result.current.data).toBeUndefined();
  });

  it("should handle errors gracefully", async () => {
    const error = new Error("Failed to fetch guias");
    mockGuiasService.guiasService = {
      getByCurso: vi.fn().mockRejectedValue(error),
    };

    const { result } = renderHookWithProviders(() => useGuias("ciencia-da-computacao"));

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBe(error);
    expect(result.current.data).toBeUndefined();
  });

  it("should cache results with React Query", async () => {
    mockGuiasService.guiasService = {
      getByCurso: vi.fn().mockResolvedValue(mockGuias),
    };

    const { result: result1, rerender } = renderHookWithProviders(() =>
      useGuias("ciencia-da-computacao")
    );

    await waitFor(() => {
      expect(result1.current.isSuccess).toBe(true);
    });

    expect(result1.current.data).toEqual(mockGuias);

    // Rerender should use cached data
    rerender();

    expect(result1.current.data).toEqual(mockGuias);

    // Service should only be called once due to caching
    expect(mockGuiasService.guiasService.getByCurso).toHaveBeenCalledTimes(1);
  });
});

describe("useSecoes Hook", () => {
  const mockSecoes = [
    {
      id: "secao-1",
      guiaId: "guia-bem-vindo",
      titulo: "Sobre O Curso",
      slug: "sobre-o-curso",
      ordem: 1,
      conteudo: "# Sobre o curso",
      status: "ATIVO",
    },
    {
      id: "secao-2",
      guiaId: "guia-bem-vindo",
      titulo: "Grade Curricular",
      slug: "grade-curricular",
      ordem: 2,
      conteudo: "# Grade",
      status: "ATIVO",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch secoes for a given guia", async () => {
    mockGuiasService.guiasService = {
      getSecoes: vi.fn().mockResolvedValue(mockSecoes),
    };

    const { result } = renderHookWithProviders(() =>
      useSecoes("bem-vindo", "ciencia-da-computacao")
    );

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(mockSecoes);
    expect(mockGuiasService.guiasService.getSecoes).toHaveBeenCalledWith(
      "bem-vindo",
      "ciencia-da-computacao"
    );
  });

  it("should not fetch when guiaSlug is empty", async () => {
    mockGuiasService.guiasService = {
      getSecoes: vi.fn(),
    };

    const { result } = renderHookWithProviders(() => useSecoes("", "ciencia-da-computacao"));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(mockGuiasService.guiasService.getSecoes).not.toHaveBeenCalled();
  });

  it("should handle cursoSlug as optional parameter", async () => {
    mockGuiasService.guiasService = {
      getSecoes: vi.fn().mockResolvedValue(mockSecoes),
    };

    const { result } = renderHookWithProviders(() => useSecoes("bem-vindo"));

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockGuiasService.guiasService.getSecoes).toHaveBeenCalledWith("bem-vindo", undefined);
  });
});

describe("useSubSecoes Hook", () => {
  const mockSubSecoes = [
    {
      id: "subsecao-1",
      secaoId: "secao-principais-cadeiras",
      titulo: "Calculo I",
      slug: "calculo-I",
      ordem: 1,
      conteudo: "# Cálculo I",
      status: "ATIVO",
    },
    {
      id: "subsecao-2",
      secaoId: "secao-principais-cadeiras",
      titulo: "Programacao I",
      slug: "programacao-I",
      ordem: 2,
      conteudo: "# Programação I",
      status: "ATIVO",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch subsecoes for a given secao", async () => {
    mockGuiasService.guiasService = {
      getSubSecoes: vi.fn().mockResolvedValue(mockSubSecoes),
    };

    const { result } = renderHookWithProviders(() =>
      useSubSecoes("principais-cadeiras", "ciencia-da-computacao")
    );

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(mockSubSecoes);
    expect(mockGuiasService.guiasService.getSubSecoes).toHaveBeenCalledWith(
      "principais-cadeiras",
      "ciencia-da-computacao"
    );
  });

  it("should not fetch when secaoSlug is empty", async () => {
    mockGuiasService.guiasService = {
      getSubSecoes: vi.fn(),
    };

    const { result } = renderHookWithProviders(() => useSubSecoes("", "ciencia-da-computacao"));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(mockGuiasService.guiasService.getSubSecoes).not.toHaveBeenCalled();
  });

  it("should handle errors", async () => {
    const error = new Error("Failed to fetch subsecoes");
    mockGuiasService.guiasService = {
      getSubSecoes: vi.fn().mockRejectedValue(error),
    };

    const { result } = renderHookWithProviders(() =>
      useSubSecoes("principais-cadeiras", "ciencia-da-computacao")
    );

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBe(error);
  });
});
