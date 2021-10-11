import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import {replaceCamelWithSpaces} from './App'

test("button has correct initial color & text", () => {
  render(<App />);
  const redButton = screen.getByRole("button", { name: "Click to turn Midnight Blue" });
  expect(redButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });
});

test("button turns MidnightBlue when clicked", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", {
    name: "Click to turn Midnight Blue",
  });
  expect(colorButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });

  // click button to change text and background color
  fireEvent.click(colorButton);
  expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });
  expect(colorButton.textContent).toBe("Click to turn Medium Violet Red");
});

test("initial conditions", () => {
  render(<App />);

  // button starts out enabled
  const colorButton = screen.getByRole("button", {
    name: "Click to turn Midnight Blue",
  });
  expect(colorButton).toBeEnabled();

  // checkbox starts out unchecked
  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toBeChecked();
});

test("Checkbox disables button on first click, enables on second click", () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
  const button = screen.getByRole("button", { name: "Click to turn Midnight Blue" });

  fireEvent.click(checkbox);
  expect(button).toBeDisabled();

  fireEvent.click(checkbox);
  expect(button).toBeEnabled();
});

test('Disabled button is gray and reverts to MediumVioletRed', () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
  const button = screen.getByRole("button", { name: "Click to turn Midnight Blue" });

  // disable button
  fireEvent.click(checkbox);
  expect(button).toHaveStyle('background-color: gray');
  // re-enable button
  fireEvent.click(checkbox);
  expect(button).toHaveStyle('background-color: MediumVioletRed');
})

test('Disabled button is gray and reverts to MidnightBlue', () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
  const button = screen.getByRole("button", { name: "Click to turn Midnight Blue" });

  // change button to blue
  fireEvent.click(button)
  // disable button
  fireEvent.click(checkbox);
  expect(button).toHaveStyle('background-color: gray');
  // re-enable button
  fireEvent.click(checkbox);
  expect(button).toHaveStyle('background-color: MidnightBlue');
})

/* FUNCTIONAL UNIT TEST */
describe('spaces before camel-case capital letters', () => {
  test('Works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red')
  })
  test('Works for one inner capital letters', () => {
    expect(replaceCamelWithSpaces('midnightBlue')).toBe('midnight Blue')
  })
  test('Works for multiple inner capital letters', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red')
  })
})
