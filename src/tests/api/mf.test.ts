import { describe, it, expect } from "vitest";
import { fetchAllFunds } from "../../lib/api/mfapi";

describe("MF API", () => {
  it("should fetch all funds", async () => {
    const funds = await fetchAllFunds();
    expect(funds).toBeDefined();
    expect(Array.isArray(funds)).toBe(true);
  });
});
