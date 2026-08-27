import type { TaskPriority, TaskStatus } from "@cyrano/task-manager-contracts";

export type TaskSource = "manual" | "gmail" | "zoom";

/**
 * Mockup-phase task shape. The real Task contract lands with the first
 * migration; this mirrors the intended fields so the swap is mechanical.
 */
export type MockTask = {
  id: string;
  title: string;
  customer?: string;
  project?: string;
  bucket: string;
  source: TaskSource;
  priority: TaskPriority;
  status: TaskStatus;
  /** Pre-rendered due label — the mockup has no clock or date math. */
  dueLabel?: string;
  overdue?: boolean;
  excerpt?: string;
};

/** ~A realistic day: 15–20 tasks across sources (PROJECT-MEMORY #10). */
export const MOCK_TASKS: MockTask[] = [
  {
    id: "t-01",
    project: "Piedmont captions",
    title: "Send corrected caption file to Piedmont before their 2pm review",
    customer: "Piedmont Health",
    bucket: "Caption edits",
    source: "zoom",
    priority: "p0",
    status: "in_progress",
    dueLabel: "2:00 pm",
    excerpt:
      "…we'd need the corrected captions back before our internal review at two…",
  },
  {
    id: "t-02",
    project: "Renewals",
    title: "Reply to Ottumwa about the renewal quote they flagged",
    customer: "Ottumwa Regional",
    bucket: "Contract / billing",
    source: "gmail",
    priority: "p0",
    status: "todo",
    dueLabel: "overdue 1d",
    overdue: true,
    excerpt:
      "Could you confirm whether the quote includes the second facility?",
  },
  {
    id: "t-03",
    title: "Fix broken share link reported on the demo library page",
    customer: "Mercy General",
    bucket: "Support",
    source: "gmail",
    priority: "p0",
    status: "blocked",
    dueLabel: "today",
    excerpt: "The link you sent our team returns a 'page not found' error.",
  },
  {
    id: "t-04",
    title: "Upload the two new B-roll clips from yesterday's shoot",
    bucket: "Content ops",
    source: "manual",
    priority: "p1",
    status: "todo",
    dueLabel: "today",
  },
  {
    id: "t-05",
    project: "Piedmont onboarding",
    title: "Send Piedmont the onboarding checklist for their second team",
    customer: "Piedmont Health",
    bucket: "Onboarding",
    source: "zoom",
    priority: "p1",
    status: "todo",
    dueLabel: "5:00 pm",
    excerpt:
      "…their marketing team would love the same checklist we used last time…",
  },
  {
    id: "t-06",
    project: "St. Luke's demo",
    title: "Confirm Thursday's demo time with the St. Luke's team",
    customer: "St. Luke's",
    bucket: "Demo prep",
    source: "gmail",
    priority: "p1",
    status: "todo",
    dueLabel: "today",
    excerpt: "Does 10am Thursday still work on your end?",
  },
  {
    id: "t-07",
    title: "Draft agenda for the weekly pipeline sync",
    bucket: "Internal ops",
    source: "manual",
    priority: "p1",
    status: "in_progress",
    dueLabel: "4:30 pm",
  },
  {
    id: "t-08",
    project: "Mercy campaign",
    title: "Review Mercy's edited script and leave comments",
    customer: "Mercy General",
    bucket: "Content review",
    source: "gmail",
    priority: "p2",
    status: "todo",
    dueLabel: "Thu",
    excerpt:
      "Attached is the revised script — any feedback by end of week helps.",
  },
  {
    id: "t-09",
    project: "Q3 reporting",
    title: "Prepare Q3 usage report for Ottumwa's stakeholder meeting",
    customer: "Ottumwa Regional",
    bucket: "Reporting",
    source: "zoom",
    priority: "p2",
    status: "todo",
    dueLabel: "Fri",
    excerpt:
      "…a one-pager on usage this quarter would really help with our board…",
  },
  {
    id: "t-10",
    project: "Renewals",
    title: "Chase the signed SOW from the St. Luke's procurement office",
    customer: "St. Luke's",
    bucket: "Contract / billing",
    source: "manual",
    priority: "p2",
    status: "blocked",
    dueLabel: "Fri",
  },
  {
    id: "t-11",
    project: "St. Luke's demo",
    title: "Update the demo environment with the new caption styles",
    bucket: "Demo prep",
    source: "manual",
    priority: "p2",
    status: "todo",
    dueLabel: "next week",
  },
  {
    id: "t-12",
    title: "Write up FAQ answers from this week's support emails",
    bucket: "Support",
    source: "gmail",
    priority: "p2",
    status: "todo",
    dueLabel: "Fri",
  },
  {
    id: "t-13",
    title: "Piedmont mentioned interest in the Spanish caption pilot",
    customer: "Piedmont Health",
    bucket: "Expansion",
    source: "zoom",
    priority: "p3",
    status: "inbox",
    excerpt: "…if the Spanish pilot goes well we'd want in early next quarter…",
  },
  {
    id: "t-14",
    title: "Mercy's team asked whether bulk download is on the roadmap",
    customer: "Mercy General",
    bucket: "Product feedback",
    source: "gmail",
    priority: "p3",
    status: "inbox",
    excerpt: "Is there any way to download a whole folder at once?",
  },
  {
    id: "t-15",
    title: "Idea: template the monthly check-in agenda",
    bucket: "Internal ops",
    source: "manual",
    priority: "p3",
    status: "inbox",
  },
  {
    id: "t-16",
    title: "Ottumwa's new marketing lead starts next month — intro call?",
    customer: "Ottumwa Regional",
    bucket: "Relationship",
    source: "zoom",
    priority: "p3",
    status: "inbox",
    excerpt: "…our new marketing lead, Dana, starts on the 15th…",
  },
  {
    id: "t-17",
    title: "Archive delivered assets from the spring campaign",
    bucket: "Content ops",
    source: "manual",
    priority: "p3",
    status: "todo",
    dueLabel: "someday",
  },
];
