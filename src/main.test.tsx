import { describe, it, expect, vi } from "vitest";
import { createRoot } from "react-dom/client";

/**
 * Mock the createRoot function.
 */
vi.mock("react-dom/client", () => ({
  createRoot: vi.fn(() => ({
    render: vi.fn(),
  })),
}));

describe("Main entry point component", () => {
  it("should execute main.tsx successfully", async () => {
    const mockElement = document.createElement("div");
    vi.spyOn(document, "getElementById").mockReturnValue(mockElement);

    await import("./main.tsx");

    expect(createRoot).toHaveBeenCalledWith(mockElement);
  });
});
