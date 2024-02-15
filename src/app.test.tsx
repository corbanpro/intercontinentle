import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("renders App component", () => {
    render(<App />);
    const linkElement = screen.getByText(/Intercontinentle/i);
    expect(linkElement).toBeDefined();
  });
});
