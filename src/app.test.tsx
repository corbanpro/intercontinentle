import React from "react";
import { render, screen } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  test("renders App component", () => {
    render(<App />);
    const rootElement = screen.getByTestId("app");
    expect(rootElement).toBeDefined();
  });
});
