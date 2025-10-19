/**
 * Centralized environment configuration
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
} as const;

// Data Provider Configuration
console.log("NEXT_PUBLIC_GUIAS_DATA_PROVIDER:", process.env.NEXT_PUBLIC_GUIAS_DATA_PROVIDER);
export const DATA_PROVIDER_CONFIG = {
  PROVIDER: process.env.NEXT_PUBLIC_GUIAS_DATA_PROVIDER || "backend",
  PROVIDERS: {
    BACKEND: "backend",
    LOCAL: "local",
  },
} as const;
