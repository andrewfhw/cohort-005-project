import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createMemoryRouter, RouterProvider } from "react-router";
import type { ReactElement } from "react";
import { LandingHero, LandingStats } from "./landing";

function render(element: ReactElement) {
  const router = createMemoryRouter([{ path: "/", element }]);
  const html = renderToStaticMarkup(<RouterProvider router={router} />);
  const classLists = [...html.matchAll(/class="([^"]*)"/g)].map(([, classes]) =>
    classes.split(/\s+/)
  );
  const withClass = (name: string) =>
    classLists.filter((classes) => classes.includes(name));
  return { html, withClass };
}

function centredBlocks(page: ReturnType<typeof render>) {
  const autoCentred = page
    .withClass("mx-auto")
    .filter((classes) => !classes.includes("max-w-6xl"));
  return [...page.withClass("text-center"), ...autoCentred];
}

describe("LandingHero", () => {
  it("left-aligns the headline, copy and call to action", () => {
    const page = render(<LandingHero />);
    expect(centredBlocks(page)).toEqual([]);
    const centredRows = page
      .withClass("flex")
      .filter((classes) => classes.includes("justify-center"));
    expect(centredRows).toEqual([]);
  });

  it("links the call to action to the course catalogue", () => {
    const { html } = render(<LandingHero />);
    expect(html).toMatch(/<a [^>]*href="\/courses"[^>]*>Browse Courses/);
  });
});

describe("LandingStats", () => {
  it("shows the course and category counts with their labels", () => {
    const { html } = render(
      <LandingStats totalCourses={7} totalCategories={3} />
    );
    expect(html).toMatch(/>7<\/p><p[^>]*>Available Courses</);
    expect(html).toMatch(/>3<\/p><p[^>]*>Categories</);
    expect(html).toMatch(/>Self-paced<\/p><p[^>]*>Learn on your schedule</);
  });

  it("left-aligns each stat", () => {
    expect(
      centredBlocks(
        render(<LandingStats totalCourses={1} totalCategories={1} />)
      )
    ).toEqual([]);
  });
});
