import {
  lessonDiscussionTabs as tabs,
  type DiscussionTab,
  type DiscussionTabsInput,
} from "./lib/tabs";

export type {
  DiscussionTab,
  DiscussionTabsInput,
  DiscussionTabValue,
} from "./lib/tabs";
export type { RenderedComment } from "./lib/rendered-comment";

/**
 * The tabs of the panel at the foot of a lesson: the Discussion, and the
 * Student's own Note beside it. A signed-out visitor has no Note, so they get
 * the Discussion alone. Deleted comments don't count towards the badge.
 */
export function lessonDiscussionTabs(
  input: DiscussionTabsInput
): DiscussionTab[] {
  return tabs(input);
}
