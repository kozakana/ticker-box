export type EnvConfig = {
  apiBaseUrl: string;
};

export function getEnvConfig(): EnvConfig {
  return {
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  };
}
