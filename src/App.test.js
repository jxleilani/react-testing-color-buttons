import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import {replaceCamelWithSpaces} from './App'

test("button has correct initial color & text", () => {
  render(<App />);
  const redButton = screen.getByRole("button", { name: "Click to turn blue" });
  expect(redButton).toHaveStyle({ backgroundColor: "red" });
});

test("button turns blue when clicked", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", {
    name: "Click to turn blue",
  });
  expect(colorButton).toHaveStyle({ backgroundColor: "red" });

  // click button to change text and background color
  fireEvent.click(colorButton);
  expect(colorButton).toHaveStyle({ backgroundColor: "blue" });
  expect(colorButton.textContent).toBe("Click to turn red");
});

test("initial conditions", () => {
  render(<App />);

  // button starts out enabled
  const colorButton = screen.getByRole("button", {
    name: "Click to turn blue",
  });
  expect(colorButton).toBeEnabled();

  // checkbox starts out unchecked
  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toBeChecked();
});

test("Checkbox disables button on first click, enables on second click", () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
  const button = screen.getByRole("button", { name: "Click to turn blue" });

  fireEvent.click(checkbox);
  expect(button).toBeDisabled();

  fireEvent.click(checkbox);
  expect(button).toBeEnabled();
});

test('Disabled button is gray and reverts to red', () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
  const button = screen.getByRole("button", { name: "Click to turn blue" });

  // disable button
  fireEvent.click(checkbox);
  expect(button).toHaveStyle('background-color: gray');
  // re-enable button
  fireEvent.click(checkbox);
  expect(button).toHaveStyle('background-color: red');
})

test('Disabled button is gray and reverts to blue', () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
  const button = screen.getByRole("button", { name: "Click to turn blue" });

  // change button to blue
  fireEvent.click(button)
  // disable button
  fireEvent.click(checkbox);
  expect(button).toHaveStyle('background-color: gray');
  // re-enable button
  fireEvent.click(checkbox);
  expect(button).toHaveStyle('background-color: blue');
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
