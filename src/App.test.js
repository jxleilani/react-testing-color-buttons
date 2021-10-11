import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("button has correct initial color & text", () => {
  render(<App />);
  const redButton = screen.getByRole("button", { name: "Click to turn blue" });
  expect(redButton).toHaveStyle({ backgroundColor: "red" });
});

test("button turns blue when clicked", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", { name: "Click to turn blue" });
  expect(colorButton).toHaveStyle({ backgroundColor: "red" });

  // click button to change text and background color
  fireEvent.click(colorButton);
  expect(colorButton).toHaveStyle({ backgroundColor: 'blue'})
  expect(colorButton.textContent).toBe('Click to turn red')
});

test('initial conditions', () => {
  render(<App />)

  // button starts out enabled
  const colorButton = screen.getByRole('button', { name: 'Click to turn blue' });
  expect(colorButton).toBeEnabled();

  // checkbox starts out unchecked
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
});

test('Checkbox disables button on first click, enables on second click', () => {
  render(<App />)
  const checkbox = screen.getByRole('checkbox')
  const button = screen.getByRole('button')

  fireEvent.click(checkbox)
  expect(button).toBeDisabled()

  fireEvent.click(checkbox)
  expect(button).toBeEnabled()
})
