export type DiscussionTabValue = "discussion" | "notes";

export type DiscussionTab = {
  value: DiscussionTabValue;
  label: string;
  badge: string | null;
};

type CountableComment = { deleted: boolean; replies: CountableComment[] };

export function countVisibleComments(comments: CountableComment[]): number {
  return comments.reduce(
    (total, comment) =>
      total + (comment.deleted ? 0 : 1) + countVisibleComments(comment.replies),
    0
  );
}

export function lessonDiscussionTabs({
  comments,
  hasNote,
  canTakeNotes,
}: {
  comments: CountableComment[];
  hasNote: boolean;
  canTakeNotes: boolean;
}): DiscussionTab[] {
  const count = countVisibleComments(comments);
  const discussion: DiscussionTab = {
    value: "discussion",
    label: "Questions & Discussion",
    badge: count > 0 ? String(count) : null,
  };
  if (!canTakeNotes) return [discussion];

  return [
    discussion,
    { value: "notes", label: "Your notes", badge: hasNote ? "Saved" : null },
  ];
}
