import React from "react";
import { render, screen } from "@testing-library/react";
import GameInputComponent from "./gameInputComponent";

test("App renders", () => {
  render(<GameInputComponent />);
  const displayElement = screen.getByPlaceholderText("Enter country");
  expect(displayElement).toBeDefined();
});
