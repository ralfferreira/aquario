# Testing Guide - Aquario Frontend

This guide teaches you how to write tests for the Aquario frontend, covering patterns, best practices, and real examples from the Guias module.

---

## Table of Contents

1. [Overview](#overview)
2. [Unit Tests (Jest)](#unit-tests-jest)
3. [Integration Tests (Vitest)](#integration-tests-vitest)
4. [E2E Tests (Playwright)](#e2e-tests-playwright)
5. [Test Utilities](#test-utilities)
6. [Running Tests](#running-tests)
7. [Common Patterns](#common-patterns)
8. [Troubleshooting](#troubleshooting)

---

## Overview

We use a three-tier testing strategy:

| Type            | Framework  | What to Test                       | Location                                  |
| --------------- | ---------- | ---------------------------------- | ----------------------------------------- |
| **Unit**        | Jest       | Individual functions, classes      | `src/**/__tests__/*.test.ts`              |
| **Integration** | Vitest     | React hooks, components with state | `src/**/__tests__/*.integration.test.tsx` |
| **E2E**         | Playwright | Full user flows in real browser    | `tests/e2e/*.e2e.test.ts`                 |

**General Rules:**

- ✅ Unit tests for pure logic (providers, utilities, helpers)
- ✅ Integration tests for React hooks and component behavior
- ✅ E2E tests for critical user journeys
- ❌ Don't test implementation details
- ❌ Don't duplicate coverage between layers

---

## Unit Tests (Jest)

### When to Write Unit Tests

Write unit tests when you have:

- Pure functions or classes with no React dependencies
- Data transformation logic
- API clients or data providers
- Complex algorithms or business logic

### File Structure

```
src/lib/api/guias_providers/
├── local-file-guias-provider.ts          # The code to test
├── __tests__/
│   └── local-file-guias-provider.test.ts # Unit tests
└── __mocks__/
    └── local-file-guias-provider.ts      # Manual mock
```

### Basic Pattern

```typescript
// src/lib/api/my-module/__tests__/my-class.test.ts

describe("MyClass", () => {
  let instance: MyClass;

  beforeEach(() => {
    // Setup: Create fresh instance for each test
    instance = new MyClass();
  });

  describe("myMethod", () => {
    it("should return expected result for valid input", () => {
      // Arrange
      const input = "test-input";

      // Act
      const result = instance.myMethod(input);

      // Assert
      expect(result).toBe("expected-output");
    });

    it("should handle edge case", () => {
      const result = instance.myMethod("");
      expect(result).toBe(null);
    });
  });
});
```

### Real Example: Testing LocalFileGuiasProvider

```typescript
// src/lib/api/guias_providers/__tests__/local-file-guias-provider.test.ts

import { LocalFileGuiasProvider } from "../local-file-guias-provider";
import { mockContentFiles } from "../../../__tests__/utils/guias-mock-data";

// Mock require.context since it's Webpack-specific
jest.mock("../local-file-guias-provider");

describe("LocalFileGuiasProvider", () => {
  let provider: LocalFileGuiasProvider;

  beforeEach(() => {
    provider = new LocalFileGuiasProvider();
    // Inject mock data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (provider as any).contentFiles = mockContentFiles;
  });

  describe("getByCurso", () => {
    it("should return guides for a valid course", async () => {
      const result = await provider.getByCurso("ciencia-da-computacao");

      expect(result).toHaveLength(2);
      expect(result[0]).toHaveProperty("titulo", "Bem Vindo");
      expect(result[1]).toHaveProperty("titulo", "Cadeiras");
    });

    it("should return empty array for non-existent course", async () => {
      const result = await provider.getByCurso("curso-invalido");
      expect(result).toEqual([]);
    });
  });
});
```

### Key Patterns for Unit Tests

**1. Mock External Dependencies**

```typescript
// Mock the entire module
jest.mock("../external-dependency");

// Mock specific functions
jest.mock("../utils", () => ({
  fetchData: jest.fn(() => Promise.resolve({ data: "mocked" })),
}));
```

**2. Test Edge Cases**

```typescript
describe("edge cases", () => {
  it("handles empty input", () => {
    expect(myFunction("")).toBe(null);
  });

  it("handles null input", () => {
    expect(myFunction(null)).toBe(null);
  });

  it("handles undefined input", () => {
    expect(myFunction(undefined)).toBe(null);
  });
});
```

**3. Use Descriptive Test Names**

```typescript
// ❌ Bad
it("works", () => {});

// ✅ Good
it("should return formatted date string when given valid timestamp", () => {});
```

---

## Integration Tests (Vitest)

### When to Write Integration Tests

Write integration tests when you have:

- React hooks that use external data
- Components that interact with context or state management
- Multiple units working together (hooks + services)
- React Query integration

### File Structure

```
src/hooks/
├── use-guias.ts
├── use-guias-page.ts
└── __tests__/
    ├── use-guias.integration.test.tsx
    └── use-guias-page.integration.test.tsx
```

### Basic Pattern

```typescript
// src/hooks/__tests__/use-my-hook.integration.test.tsx

import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { createTestQueryClient } from "../../__tests__/utils/test-providers";
import { QueryClientProvider } from "@tanstack/react-query";
import { useMyHook } from "../use-my-hook";
import * as myService from "../../lib/api/my-service";

// Mock the service
vi.mock("../../lib/api/my-service");

describe("useMyHook", () => {
  let queryClient: QueryClient;
  const mockService = myService as any;

  beforeEach(() => {
    queryClient = createTestQueryClient();
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("should fetch data successfully", async () => {
    // Arrange
    mockService.getData.mockResolvedValue([{ id: 1, name: "Test" }]);

    // Act
    const { result } = renderHook(() => useMyHook("test-id"), { wrapper });

    // Assert
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toHaveLength(1);
    expect(mockService.getData).toHaveBeenCalledWith("test-id");
  });

  it("should handle errors gracefully", async () => {
    // Arrange
    mockService.getData.mockRejectedValue(new Error("Failed"));

    // Act
    const { result } = renderHook(() => useMyHook("test-id"), { wrapper });

    // Assert
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeDefined();
  });
});
```

### Real Example: Testing useGuias Hook

```typescript
// src/hooks/__tests__/use-guias.integration.test.tsx

import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { useGuias } from "../use-guias";
import { createTestQueryWrapper } from "../../__tests__/utils/test-providers";
import * as guiasService from "../../lib/api/guias";
import { mockGuias } from "../../__tests__/utils/guias-mock-data";

vi.mock("../../lib/api/guias");

describe("useGuias Integration", () => {
  const mockGuiasService = guiasService as any;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch and cache guias data", async () => {
    mockGuiasService.getByCurso.mockResolvedValue(mockGuias);

    const { result } = renderHook(() => useGuias("ciencia-da-computacao"), {
      wrapper: createTestQueryWrapper(),
    });

    // Initial state
    expect(result.current.isLoading).toBe(true);

    // After fetch
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockGuias);
    expect(mockGuiasService.getByCurso).toHaveBeenCalledTimes(1);
  });

  it("should use cached data on re-render", async () => {
    mockGuiasService.getByCurso.mockResolvedValue(mockGuias);

    const { result, rerender } = renderHook(() => useGuias("ciencia-da-computacao"), {
      wrapper: createTestQueryWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // Re-render with same params
    rerender();

    // Should not call service again (cached)
    expect(mockGuiasService.getByCurso).toHaveBeenCalledTimes(1);
  });
});
```

### Key Patterns for Integration Tests

**1. Always Use Query Client Wrapper**

```typescript
import { createTestQueryWrapper } from "../../__tests__/utils/test-providers";

const { result } = renderHook(() => useMyHook(), {
  wrapper: createTestQueryWrapper(),
});
```

**2. Wait for Async Operations**

```typescript
// ❌ Bad - might pass/fail randomly
expect(result.current.data).toBeDefined();

// ✅ Good - waits for condition
await waitFor(() => expect(result.current.isSuccess).toBe(true));
```

**3. Test React Query States**

```typescript
it("should show loading state initially", async () => {
  const { result } = renderHook(() => useMyHook(), { wrapper });

  expect(result.current.isLoading).toBe(true);
  expect(result.current.data).toBeUndefined();

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
});
```

**4. Mock Service Functions**

```typescript
vi.mock("../../lib/api/my-service");

const mockService = myService as any;

mockService.getData.mockResolvedValue([...]);
mockService.getData.mockRejectedValue(new Error("Failed"));
```

---

## E2E Tests (Playwright)

### When to Write E2E Tests

Write E2E tests for:

- Critical user journeys (login, checkout, etc.)
- Multi-step workflows
- Cross-page navigation
- Visual verification
- Responsive design

### File Structure

```
tests/
└── e2e/
    ├── guias.e2e.test.ts           # E2E tests
    └── mocks/
        └── guias-mock-data.ts       # Optional mock data
```

### Basic Pattern

```typescript
// tests/e2e/my-feature.e2e.test.ts

import { test, expect } from "@playwright/test";

test.describe("My Feature", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to starting page
    await page.goto("/my-feature");
  });

  test("should complete user journey", async ({ page }) => {
    // Step 1: Verify initial state
    await expect(page.locator("h1")).toContainText("Welcome");

    // Step 2: Interact with UI
    await page.click("button:has-text('Start')");

    // Step 3: Wait for navigation
    await page.waitForURL("**/step-2");

    // Step 4: Verify result
    await expect(page.locator(".success-message")).toBeVisible();
  });
});
```

### Real Example: Testing Guias Navigation

```typescript
// tests/e2e/guias.e2e.test.ts

import { test, expect } from "@playwright/test";

test.describe("Guias - User Navigation Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/guias/ciencia-da-computacao");
  });

  test("should display guide list for a course", async ({ page }) => {
    // Check page loaded correctly
    await expect(page).toHaveTitle(/Aquario/);

    // Verify header is visible
    const header = page.locator("text=Centro de Informática");
    await expect(header).toBeVisible({ timeout: 10000 });

    // Verify content area shows instructions
    const body = page.locator("body");
    const bodyText = await body.textContent();
    expect(bodyText).toContain("Selecione");
  });

  test("should handle navigation without JavaScript errors", async ({ page }) => {
    // Listen for console errors
    const errors: string[] = [];
    page.on("console", msg => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await page.goto("/guias/ciencia-da-computacao");
    await page.waitForLoadState("networkidle");

    // Navigate to another section
    const links = page.locator('a[href*="guias"]');
    if ((await links.count()) > 0) {
      await links.first().click();
      await page.waitForLoadState("networkidle");
    }

    // Filter out non-critical errors
    const criticalErrors = errors.filter(
      error =>
        !error.includes("Warning") && !error.includes("favicon") && !error.includes("sourcemap")
    );

    expect(criticalErrors).toHaveLength(0);
  });
});

test.describe("Guias - Responsive Design", () => {
  test("should be usable on mobile viewport", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto("/guias/ciencia-da-computacao");
    await page.waitForLoadState("networkidle");

    // Verify content is visible
    const body = page.locator("body");
    await expect(body).toBeVisible();

    // Check no horizontal overflow
    const bodyWidth = await body.evaluate(el => el.scrollWidth);
    const viewportWidth = page.viewportSize()!.width;
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1);
  });
});
```

### Key Patterns for E2E Tests

**1. Use Flexible Selectors**

```typescript
// ❌ Bad - too specific, breaks easily
await page.click("#button-123");

// ✅ Good - semantic and flexible
await page.click('button:has-text("Submit")');
await page.locator('[data-testid="submit-button"]').click();
```

**2. Wait for Conditions**

```typescript
// Wait for URL
await page.waitForURL("**/success");

// Wait for network
await page.waitForLoadState("networkidle");

// Wait for element
await page.waitForSelector(".content");

// Wait with custom condition
await page.waitForFunction(() => document.querySelectorAll(".item").length > 0);
```

**3. Test Multiple Browsers**

Playwright automatically runs tests on Chromium, Firefox, and WebKit. Your test count will be multiplied by 3.

**4. Use beforeEach for Common Setup**

```typescript
test.describe("My Feature", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/my-feature");
    await page.waitForLoadState("networkidle");
  });

  test("test 1", async ({ page }) => {
    // Already on /my-feature
  });

  test("test 2", async ({ page }) => {
    // Already on /my-feature
  });
});
```

---

## Test Utilities

### Creating Reusable Test Helpers

**Location:** `src/__tests__/utils/`

**Example: Mock Data**

```typescript
// src/__tests__/utils/my-feature-mock-data.ts

export const mockUsers = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

export const mockUserData = {
  user1: mockUsers[0],
  user2: mockUsers[1],
};
```

**Example: Test Helpers**

```typescript
// src/__tests__/utils/my-feature-test-helpers.ts

import { expect } from "@jest/globals";

export function expectValidUser(user: any) {
  expect(user).toHaveProperty("id");
  expect(user).toHaveProperty("name");
  expect(user).toHaveProperty("email");
  expect(user.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
}
```

**Example: React Query Wrapper**

```typescript
// src/__tests__/utils/test-providers.tsx

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Disable retries in tests
        cacheTime: 0,
      },
    },
  });
}

export function createTestQueryWrapper() {
  const queryClient = createTestQueryClient();

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
```

---

## Running Tests

### All Tests

```bash
npm run test:all
```

### By Type

```bash
# Unit tests
npm run test
npm run test:watch
npm run test:coverage

# Integration tests
npm run test:integration
npm run test:integration:watch
npm run test:integration:ui

# E2E tests
npm run test:e2e
npm run test:e2e:ui
npm run test:e2e:headed
```

### Specific Files

```bash
# Jest (unit)
npm run test -- path/to/file.test.ts

# Vitest (integration)
npm run test:integration -- path/to/file.integration.test.tsx

# Playwright (E2E)
npm run test:e2e -- path/to/file.e2e.test.ts
```

### Debug Mode

```bash
# Jest with debugger
node --inspect-brk node_modules/.bin/jest --runInBand

# Vitest UI (visual debugging)
npm run test:integration:ui

# Playwright UI (visual debugging)
npm run test:e2e:ui

# Playwright headed (see browser)
npm run test:e2e:headed
```

---

## Common Patterns

### Pattern 1: Testing Async Operations

```typescript
// ❌ Bad
it("fetches data", () => {
  const data = fetchData();
  expect(data).toBeDefined();
});

// ✅ Good - with async/await
it("fetches data", async () => {
  const data = await fetchData();
  expect(data).toBeDefined();
});

// ✅ Good - with waitFor (React hooks)
it("fetches data", async () => {
  const { result } = renderHook(() => useData());
  await waitFor(() => expect(result.current.isSuccess).toBe(true));
});
```

### Pattern 2: Testing Error States

```typescript
it("handles errors gracefully", async () => {
  // Mock service to throw error
  mockService.getData.mockRejectedValue(new Error("Network error"));

  const { result } = renderHook(() => useData());

  await waitFor(() => expect(result.current.isError).toBe(true));
  expect(result.current.error).toBeDefined();
  expect(result.current.error?.message).toBe("Network error");
});
```

### Pattern 3: Testing Loading States

```typescript
it("shows loading state while fetching", async () => {
  // Create a promise we can control
  let resolvePromise: (value: any) => void;
  const promise = new Promise(resolve => {
    resolvePromise = resolve;
  });

  mockService.getData.mockReturnValue(promise);

  const { result } = renderHook(() => useData());

  // Should be loading
  expect(result.current.isLoading).toBe(true);

  // Resolve the promise
  resolvePromise!({ data: "test" });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(result.current.isLoading).toBe(false);
});
```

### Pattern 4: Testing Conditional Rendering

```typescript
it("does not fetch when disabled", () => {
  const { result } = renderHook(() => useData({ enabled: false }));

  // Should not trigger fetch
  expect(mockService.getData).not.toHaveBeenCalled();
  expect(result.current.data).toBeUndefined();
});
```

---

## Troubleshooting

### Issue: `require.context is not a function`

**Problem:** Webpack-specific function not available in test environment.

**Solution:** Add global mock in setup file:

```typescript
// jest.setup.js or vitest.setup.ts
global.require = {
  ...global.require,
  context: () => ({
    keys: () => [],
    resolve: () => "",
    id: "test",
  }),
};
```

### Issue: Tests timeout in integration tests

**Problem:** Async operations taking too long or not completing.

**Solution:**

```typescript
// Increase timeout
await waitFor(() => expect(result.current.isSuccess).toBe(true), {
  timeout: 10000,
});

// Or disable timeout in config
// vitest.config.ts
export default defineConfig({
  test: {
    testTimeout: 10000,
  },
});
```

### Issue: E2E tests fail intermittently

**Problem:** Race conditions or timing issues.

**Solution:**

```typescript
// Always wait for network idle
await page.waitForLoadState("networkidle");

// Use explicit waits
await page.waitForSelector(".content", { state: "visible" });

// Increase timeout for specific assertion
await expect(element).toBeVisible({ timeout: 10000 });
```

### Issue: Mock not working

**Problem:** Mock declared after import.

**Solution:**

```typescript
// ❌ Bad - mock after import
import { myFunction } from "./my-module";
jest.mock("./my-module");

// ✅ Good - mock before import
jest.mock("./my-module");
import { myFunction } from "./my-module";
```

### Issue: Jest finds utility files as test suites

**Problem:** Files in `__tests__/utils/` being run as tests.

**Solution:** Add to `jest.config.js`:

```javascript
module.exports = {
  testPathIgnorePatterns: ["/node_modules/", "/__tests__/utils/", "/__mocks__/"],
};
```

---

## Checklist for Adding New Tests

### Before Writing Tests

- [ ] Identify what type of test you need (Unit/Integration/E2E)
- [ ] Check if similar tests exist for reference
- [ ] Identify dependencies that need mocking
- [ ] Prepare mock data if needed

### While Writing Tests

- [ ] Use descriptive test names (`should...`, `when...then...`)
- [ ] Follow AAA pattern: Arrange, Act, Assert
- [ ] Test happy path first
- [ ] Add edge case tests
- [ ] Add error case tests
- [ ] Keep tests independent (no shared state)

### After Writing Tests

- [ ] Run tests: `npm run test` / `test:integration` / `test:e2e`
- [ ] Check for lint errors: `npm run lint`
- [ ] Verify tests actually test what they claim
- [ ] Run tests in watch mode to ensure stability
- [ ] Update this guide if you discover new patterns

---

## Best Practices Summary

1. **Test behavior, not implementation**
2. **Keep tests simple and focused**
3. **Use meaningful assertions** (not just `toBeTruthy()`)
4. **Don't test library code** (React, React Query, etc.)
5. **Mock external dependencies** (APIs, services)
6. **Clean up after tests** (clear mocks, reset state)
7. **Make tests deterministic** (no random data, fixed dates)
8. **Write tests that fail for the right reasons**
9. **Keep test files close to source code**
10. **Update tests when code changes**

---

**Questions or Issues?** Check the [Troubleshooting](#troubleshooting) section or consult the team.

**Contributing:** When adding new testing patterns, please update this guide!
