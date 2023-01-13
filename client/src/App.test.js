import { render, screen } from '@testing-library/react';
import App from './App';

it('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Go Home/i);
  expect(linkElement).toBeInTheDocument();
});

it('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/create/i);
  expect(linkElement).toBeInTheDocument();
});

it('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/breeds/i);
  expect(linkElement).toBeInTheDocument();
});
