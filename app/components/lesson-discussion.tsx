import { MessageSquare, NotebookPen } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { CommentThread } from "~/components/comment-thread";
import { LessonNote, type LessonNoteData } from "~/components/lesson-note";
import {
  lessonDiscussionTabs,
  type DiscussionTab,
  type DiscussionTabValue,
  type RenderedComment,
} from "~/modules/lesson-discussion";

const TAB_ICONS: Record<DiscussionTabValue, typeof MessageSquare> = {
  discussion: MessageSquare,
  notes: NotebookPen,
};

// Both panels stay mounted, so switching tabs keeps an unsaved draft in
// either box.
function KeptMountedPanel({
  value,
  children,
}: {
  value: DiscussionTabValue;
  children: React.ReactNode;
}) {
  return (
    <TabsContent
      value={value}
      forceMount
      className="data-[state=inactive]:hidden"
    >
      {children}
    </TabsContent>
  );
}

const HEADING_ID = "lesson-discussion-heading";

function DiscussionTabsList({ tabs }: { tabs: DiscussionTab[] }) {
  return (
    <TabsList aria-labelledby={HEADING_ID}>
      {tabs.map(({ value, label, badge }) => {
        const Icon = TAB_ICONS[value];
        return (
          <TabsTrigger key={value} value={value}>
            <Icon />
            {label}
            {badge && (
              <span className="rounded-full bg-primary/10 px-1.5 text-xs text-primary">
                {badge}
              </span>
            )}
          </TabsTrigger>
        );
      })}
    </TabsList>
  );
}

export function LessonDiscussion({
  comments,
  note,
  currentUserId,
  canModerate,
  instructorName,
}: {
  comments: RenderedComment[];
  note: LessonNoteData;
  currentUserId: number | null;
  canModerate: boolean;
  instructorName: string;
}) {
  const tabs = lessonDiscussionTabs({
    comments,
    hasNote: note !== null,
    canTakeNotes: currentUserId !== null,
  });
  const showsNotes = tabs.some((tab) => tab.value === "notes");

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        {/* The tabs replaced the panel's visible headings; this keeps the
            section reachable by heading navigation. */}
        <h2 id={HEADING_ID} className="sr-only">
          Discussion and notes
        </h2>
        <Tabs defaultValue="discussion" className="gap-4">
          <DiscussionTabsList tabs={tabs} />

          <KeptMountedPanel value="discussion">
            <CommentThread
              comments={comments}
              currentUserId={currentUserId}
              canModerate={canModerate}
              canPost
              instructorName={instructorName}
            />
          </KeptMountedPanel>
          {showsNotes && (
            <KeptMountedPanel value="notes">
              <LessonNote note={note} />
            </KeptMountedPanel>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
}
