import { Link } from "react-router";
import { ArrowRight, BookOpen, GraduationCap, Users } from "lucide-react";
import { Button } from "~/components/ui/button";

export function LandingHero() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 text-left">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Courses for developers
        </p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl">
          Learn to code,
          <br />
          <span className="text-muted-foreground">at your own pace</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Structured courses built by experienced instructors. Track your
          progress, take quizzes, and build real-world skills.
        </p>
        <div className="mt-10 flex items-center justify-start gap-4">
          <Button asChild size="lg">
            <Link to="/courses">
              Browse Courses
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function LandingStats({
  totalCourses,
  totalCategories,
}: {
  totalCourses: number;
  totalCategories: number;
}) {
  const stats = [
    { icon: BookOpen, value: totalCourses, label: "Available Courses" },
    { icon: GraduationCap, value: totalCategories, label: "Categories" },
    { icon: Users, value: "Self-paced", label: "Learn on your schedule" },
  ];

  return (
    <section className="border-y border-border bg-muted/50 py-12">
      <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 sm:grid-cols-3">
        {stats.map(({ icon: Icon, value, label }) => (
          <li key={label} className="flex items-center gap-4 text-left">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Icon className="size-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
