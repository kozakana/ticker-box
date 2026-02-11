export type LambdaConfig = {
  bucketName: string;
  catalogDatabase: string;
};

export function getConfig(): LambdaConfig {
  return {
    bucketName: process.env.PRICE_BUCKET || "",
    catalogDatabase: process.env.ICEBERG_DB || "watchlist_iceberg",
  };
}
