import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createMemoryRouter, RouterProvider } from "react-router";
import type { ReactElement } from "react";
import { LandingHero, LandingStats } from "./landing";

function render(element: ReactElement) {
  const router = createMemoryRouter([{ path: "/", element }]);
  const html = renderToStaticMarkup(<RouterProvider router={router} />);
  return { html, has: (text: string) => html.includes(text) };
}

describe("LandingHero", () => {
  it("left-aligns the headline, copy and call to action", () => {
    const page = render(<LandingHero />);
    expect(page.has("text-center")).toBe(false);
    expect(page.has("mx-auto mt-6")).toBe(false);
    expect(page.has('class="mx-auto max-w-6xl px-6 py-24 text-left"')).toBe(
      true
    );
    expect(
      page.has('class="mt-10 flex items-center justify-start gap-4"')
    ).toBe(true);
  });

  it("links the call to action to the course catalogue", () => {
    const page = render(<LandingHero />);
    expect(page.has('href="/courses"')).toBe(true);
    expect(page.has("Browse Courses")).toBe(true);
  });
});

describe("LandingStats", () => {
  it("shows the course and category counts with their labels", () => {
    const page = render(<LandingStats totalCourses={7} totalCategories={3} />);
    expect(page.html).toMatch(/>7<\/p><p[^>]*>Available Courses</);
    expect(page.html).toMatch(/>3<\/p><p[^>]*>Categories</);
    expect(page.html).toMatch(
      />Self-paced<\/p><p[^>]*>Learn on your schedule</
    );
  });

  it("left-aligns each stat beside its icon", () => {
    const page = render(<LandingStats totalCourses={1} totalCategories={1} />);
    expect(page.has("text-center")).toBe(false);
    expect(page.html.match(/flex items-center gap-4 text-left/g)).toHaveLength(
      3
    );
  });
});
