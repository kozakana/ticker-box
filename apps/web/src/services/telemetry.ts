export type TelemetryEvent = {
  name: string;
  timestamp: string;
  metadata?: Record<string, string | number | boolean>;
};

export function trackEvent(event: TelemetryEvent): void {
  // Placeholder for future analytics integration.
  void event;
}
