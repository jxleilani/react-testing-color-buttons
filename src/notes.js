import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />); // render creates the virtual dom
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument(); // assertion causes test to succeed or fail
});

test('renders learn react link', () => {
  render(<App />); 
  const linkElement = screen.getByRole('link', { name: /learn react/i });
  expect(linkElement).toBeInTheDocument(); 
});

// https://github.com/bonnie/udemy-TESTING-LIBRARY/tree/main/code-quiz

/* Other Examples of Assertions with jest */
// expect(element.textContent).toBe('hello')
// expect(elementsArray).toHaveLength(7)

// other jest-dom assertions: .toBeVisible() .toBeChecked()

/////////////////////////
// watch mode watches for changes in files since last commit
// only run tests related to these files
// yarn test  - brings you to watch mode. q to quit

// global test method has 2 args
// string description, test function
// test fails if any error when running function
// no error -> tests pass, so empty test -> tests pass.

//////////////////////////
// Unit Tests -> isolated: mock dependencies, test internals
// makes it easy to pinpoint failures. 
// more likely to break with refactoring. 
// not like how users interact with software

// functional testing -> about behavior.
// includes all relevant units. 
// more like how users interact with software
// as long as behavior is the same with refactor, tests should pass
// more dificult to debug failing tests

//////////////////////////
// github jest-dom
// https://testing-library.com/docs/queries/about/#priority
// https://www.w3.org/TR/wai-aria/#role_definitions 
// getByText  - for non interactive
// getByRole  - for interactive, like a link

/* SCREEN QUERY METHODS */
// get: expect element to be in DOM
// query: expect element NOT to be in DOM
// find: expect element to appear async

// [All]
// exclude if you expect only one match
// include if you expect more than one match

// Role
// AltText (images)
// Text (display elements)
// Forms:
// PlaceholderText, LabelText, DisplayValue

/* WARNINGS */
// not wrapped in act(...)
// could mean element in DOM was updated after the test was finished
// so async function occurred after the test finished
// fix: determind how component is getting updated async and account for in test
// ex: waitForElementToBeRemoved()
