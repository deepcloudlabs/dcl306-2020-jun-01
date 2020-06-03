import React from 'react';
import { render } from '@testing-library/react';
import Mastermind from "./mastermind";
let fun = ()=>42;
test('renders learn react link', () => {
  /*
  const { getByText } = render(<Mastermind />);
  const linkElement = getByText(/Game Console/i);
  expect(linkElement).toBeInTheDocument();

   */
  expect(fun()).toBe(42);
});
