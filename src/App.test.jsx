import { act, fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  window.sessionStorage.setItem("ak-portfolio:booted", "1");
  window.scrollTo = vi.fn();
});

test("renders the portfolio with the work deck selected", () => {
  render(<App />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Arnav Kasturia");
  expect(screen.getByRole("tab", { name: /~\/work/ })).toHaveAttribute("aria-selected", "true");
  expect(screen.getByLabelText(/External Report Pulls, 1 \/ 9/)).toBeInTheDocument();
});

test("left swipes are refused and the card stays", () => {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: /swipe left/i }));
  expect(screen.getByText(/Spread love, not hate/)).toBeInTheDocument();
  expect(screen.getByLabelText(/External Report Pulls, 1 \/ 9/)).toBeInTheDocument();
});

test("liking advances the deck and switching category shows personal projects", () => {
  vi.useFakeTimers();
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: /like this project/i }));
  act(() => {
    vi.advanceTimersByTime(500);
  });
  expect(screen.getByLabelText(/Experian Integration, 2 \/ 9/)).toBeInTheDocument();
  fireEvent.click(screen.getByRole("tab", { name: /~\/personal/ }));
  expect(screen.getByLabelText(/Wingo, 1 \/ 3/)).toBeInTheDocument();
  vi.useRealTimers();
});

test("shows the boot loader on a first visit", () => {
  window.sessionStorage.clear();
  render(<App />);
  expect(screen.getByRole("status", { name: /loading portfolio/i })).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: /skip/i }));
});

test("liked projects expand to show their details again", () => {
  vi.useFakeTimers();
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: /like this project/i }));
  act(() => {
    vi.advanceTimersByTime(500);
  });
  const row = screen.getByRole("button", { name: /External Report Pulls/ });
  expect(row).toHaveAttribute("aria-expanded", "false");
  fireEvent.click(row);
  expect(row).toHaveAttribute("aria-expanded", "true");
  expect(screen.getByRole("region", { name: /External Report Pulls details/ })).toHaveTextContent(
    "Restored offer eligibility"
  );
  fireEvent.click(row);
  expect(row).toHaveAttribute("aria-expanded", "false");
  vi.useRealTimers();
});
