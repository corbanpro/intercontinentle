import React from "react";
import { render, screen } from "@testing-library/react";
import GameInputComponent from "./gameInputComponent";

describe("GameInputComponent", () => {
  test("renders", () => {
    render(<GameInputComponent />);
    const rootElement = screen.getByTestId("game-input-component");
    expect(rootElement).toBeDefined();
  });
});
