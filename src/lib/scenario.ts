import { getLisbonNow, type Instant } from "@/lib/hours";

export const SCENARIOS = ["open", "closed", "special-sold-out", "live"] as const;
export type Scenario = (typeof SCENARIOS)[number];

export interface ScenarioConfig {
  now: Instant;
  specialSoldOut: boolean;
}

export function parseScenario(raw: string | string[] | undefined): Scenario {
  const value = Array.isArray(raw) ? raw[0] : raw;
  return SCENARIOS.find((s) => s === value) ?? "open";
}

/** Maps the ?state= param onto a fixed clock so every reviewer sees the same page. */
export function resolveScenario(scenario: Scenario): ScenarioConfig {
  switch (scenario) {
    case "closed":
      return { now: { day: "monday", minutes: 11 * 60 + 30 }, specialSoldOut: false };
    case "special-sold-out":
      return { now: { day: "tuesday", minutes: 11 * 60 + 30 }, specialSoldOut: true };
    case "live":
      return { now: getLisbonNow(), specialSoldOut: false };
    case "open":
    default:
      return { now: { day: "tuesday", minutes: 11 * 60 + 30 }, specialSoldOut: false };
  }
}
