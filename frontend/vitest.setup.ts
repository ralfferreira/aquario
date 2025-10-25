import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock require.context for Webpack-specific features
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global.require as any) = global.require || {};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global.require as any).context = vi.fn((_directory, _useSubdirectories, _regExp) => {
  const keys = vi.fn(() => []);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const context: any = vi.fn(_key => "");
  context.keys = keys;
  context.resolve = vi.fn(key => key);
  context.id = "mockContext";
  return context;
});

// Mock the LocalFileGuiasProvider to avoid require.context issues
vi.mock("./src/lib/api/guias_providers/local-file-guias-provider", () => {
  return {
    LocalFileGuiasProvider: class MockLocalFileGuiasProvider {
      getByCurso() {
        return Promise.resolve([]);
      }
      getSecoes() {
        return Promise.resolve([]);
      }
      getSubSecoes() {
        return Promise.resolve([]);
      }
      getCentros() {
        return Promise.resolve([]);
      }
      getCursos() {
        return Promise.resolve([]);
      }
    },
  };
});
