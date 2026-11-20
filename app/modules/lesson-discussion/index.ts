import { lessonDiscussionTabs as tabs } from "./lib/tabs";

export type { DiscussionTab, DiscussionTabValue } from "./lib/tabs";

/**
 * The tabs of the panel at the foot of a lesson: the Discussion, and the
 * Student's own Note beside it. A signed-out visitor has no Note, so they get
 * the Discussion alone. Deleted comments don't count towards the badge.
 */
export function lessonDiscussionTabs(input: Parameters<typeof tabs>[0]) {
  return tabs(input);
}
