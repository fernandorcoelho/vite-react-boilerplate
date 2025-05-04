import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock("react-hook-form", () => ({
  useForm: vi.fn(),
}));
