import { describe, expect, it } from "vitest";
import { lessonDiscussionTabs } from "../index";

type TestComment = { deleted: boolean; replies: TestComment[] };

function comment(replies: TestComment[] = [], deleted = false): TestComment {
  return { deleted, replies };
}

describe("lessonDiscussionTabs", () => {
  it("puts the Discussion first and the Note beside it", () => {
    const tabs = lessonDiscussionTabs({
      comments: [],
      hasNote: false,
      canTakeNotes: true,
    });

    expect(tabs).toEqual([
      { value: "discussion", label: "Questions & Discussion", badge: null },
      { value: "notes", label: "Your notes", badge: null },
    ]);
  });

  it("shows only the Discussion to someone who cannot take notes", () => {
    const tabs = lessonDiscussionTabs({
      comments: [comment()],
      hasNote: false,
      canTakeNotes: false,
    });

    expect(tabs.map((tab) => tab.value)).toEqual(["discussion"]);
  });

  it("counts every visible comment, replies included", () => {
    const [discussion] = lessonDiscussionTabs({
      comments: [comment([comment(), comment()]), comment()],
      hasNote: false,
      canTakeNotes: true,
    });

    expect(discussion.badge).toBe("4");
  });

  it("leaves a deleted comment out of the count but keeps its replies", () => {
    const [discussion] = lessonDiscussionTabs({
      comments: [comment([comment()], true)],
      hasNote: false,
      canTakeNotes: true,
    });

    expect(discussion.badge).toBe("1");
  });

  it("shows no count when every comment is deleted", () => {
    const [discussion] = lessonDiscussionTabs({
      comments: [comment([], true)],
      hasNote: false,
      canTakeNotes: true,
    });

    expect(discussion.badge).toBeNull();
  });

  it("marks the Note tab once the Student has saved a Note", () => {
    const [, notes] = lessonDiscussionTabs({
      comments: [],
      hasNote: true,
      canTakeNotes: true,
    });

    expect(notes.badge).toBe("Saved");
  });
});
