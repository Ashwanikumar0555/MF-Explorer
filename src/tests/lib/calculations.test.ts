import { describe, it, expect } from "vitest";
import { calculateSIP } from "../../lib/calculations/sip";
import { calculateSWP } from "../../lib/calculations/swp";
import { calculateLumpsum } from "../../lib/calculations/lumpsum";
import { compareInvestments } from "../../lib/calculations/compare";

describe("Financial Calculations", () => {
  it("calculates SIP correctly", () => {
    const result = calculateSIP(1000, 1, 12);
    expect(result.invested).toBe(12000);
    expect(result.total).toBeGreaterThan(12000);
  });

  it("calculates SWP correctly", () => {
    const result = calculateSWP(12000, 1, 12);
    expect(result.balance).toBeLessThan(12000);
  });

  it("calculates Lumpsum correctly", () => {
    const result = calculateLumpsum(10000, 1, 12);
    expect(result.total).toBeGreaterThan(10000);
  });

  it("compares SIP and Lumpsum correctly", () => {
    const result = compareInvestments(1000, 1, 12);
    expect(result.sip.total).toBeGreaterThan(result.sip.invested);
    expect(result.lumpsum.total).toBeGreaterThan(result.lumpsum.invested);
  });
});
