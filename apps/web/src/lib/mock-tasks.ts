import type { TaskPriority, TaskStatus } from "@cyrano/task-manager-contracts";
import { isoAddDays } from "@/lib/schedule";

export type TaskSource = "manual" | "gmail" | "zoom";

/**
 * Mockup-phase task shape. The real Task contract lands with the first
 * migration; this mirrors the intended fields so the swap is mechanical.
 * `dueDate` (ISO) drives board placement via boardSlot(); `priority` is
 * the manual fallback when there is no date.
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
  dueDate?: string;
  /** Display time for today-scheduled tasks (mock; real times come with data). */
  dueTime?: string;
  excerpt?: string;
};

export type MockProjectStep = { id: string; title: string; done: boolean };

/** An internal project: notes + an ordered step outline (the design's
 * Projects section pushes the next open step onto the board). */
export type MockProject = {
  id: string;
  name: string;
  notes: string;
  defaultBucket: string;
  steps: MockProjectStep[];
};

/** A task proposed by extraction, waiting in the Review queue. */
export type MockSuggestedTask = Omit<MockTask, "status"> & {
  sourceLine: string;
};

const TODAY = new Date();
const iso = (days: number) => isoAddDays(days, TODAY);

export const BUCKETS = [
  "Caption edits",
  "Contract / billing",
  "Support",
  "Onboarding",
  "Demo prep",
  "Content ops",
  "Internal ops",
  "Content review",
  "Reporting",
  "Expansion",
  "Product feedback",
  "Relationship",
];

/** ~A realistic day: 15–20 open tasks across sources (PROJECT-MEMORY #10). */
export const MOCK_TASKS: MockTask[] = [
  {
    id: "t-01",
    title: "Send corrected caption file to Piedmont before their 2pm review",
    customer: "Piedmont Health",
    project: "Piedmont captions",
    bucket: "Caption edits",
    source: "zoom",
    priority: "p0",
    status: "in_progress",
    dueDate: iso(0),
    dueTime: "2:00 pm",
    excerpt:
      "…we'd need the corrected captions back before our internal review at two…",
  },
  {
    id: "t-02",
    title: "Reply to Ottumwa about the renewal quote they flagged",
    customer: "Ottumwa Regional",
    project: "Renewals",
    bucket: "Contract / billing",
    source: "gmail",
    priority: "p0",
    status: "todo",
    dueDate: iso(-1),
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
    excerpt: "The link you sent our team returns a 'page not found' error.",
  },
  {
    id: "t-04",
    title: "Upload the two new B-roll clips from yesterday's shoot",
    bucket: "Content ops",
    source: "manual",
    priority: "p1",
    status: "todo",
    dueDate: iso(0),
  },
  {
    id: "t-05",
    title: "Send Piedmont the onboarding checklist for their second team",
    customer: "Piedmont Health",
    project: "Piedmont onboarding",
    bucket: "Onboarding",
    source: "zoom",
    priority: "p1",
    status: "todo",
    dueDate: iso(0),
    dueTime: "5:00 pm",
    excerpt:
      "…their marketing team would love the same checklist we used last time…",
  },
  {
    id: "t-06",
    title: "Confirm Thursday's demo time with the St. Luke's team",
    customer: "St. Luke's",
    project: "St. Luke's demo",
    bucket: "Demo prep",
    source: "gmail",
    priority: "p1",
    status: "todo",
    dueDate: iso(1),
    excerpt: "Does 10am Thursday still work on your end?",
  },
  {
    id: "t-07",
    title: "Draft agenda for the weekly pipeline sync",
    bucket: "Internal ops",
    source: "manual",
    priority: "p1",
    status: "in_progress",
  },
  {
    id: "t-08",
    title: "Review Mercy's edited script and leave comments",
    customer: "Mercy General",
    project: "Mercy campaign",
    bucket: "Content review",
    source: "gmail",
    priority: "p2",
    status: "todo",
    dueDate: iso(2),
    excerpt:
      "Attached is the revised script — any feedback by end of week helps.",
  },
  {
    id: "t-09",
    title: "Prepare Q3 usage report for Ottumwa's stakeholder meeting",
    customer: "Ottumwa Regional",
    project: "Q3 reporting",
    bucket: "Reporting",
    source: "zoom",
    priority: "p2",
    status: "todo",
    dueDate: iso(3),
    excerpt:
      "…a one-pager on usage this quarter would really help with our board…",
  },
  {
    id: "t-10",
    title: "Chase the signed SOW from the St. Luke's procurement office",
    customer: "St. Luke's",
    project: "Renewals",
    bucket: "Contract / billing",
    source: "manual",
    priority: "p2",
    status: "blocked",
  },
  {
    id: "t-11",
    title: "Update the demo environment with the new caption styles",
    project: "St. Luke's demo",
    bucket: "Demo prep",
    source: "manual",
    priority: "p2",
    status: "todo",
  },
  {
    id: "t-12",
    title: "Write up FAQ answers from this week's support emails",
    bucket: "Support",
    source: "gmail",
    priority: "p2",
    status: "todo",
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
    title: "Book the fall shoot dates with Mercy's team",
    customer: "Mercy General",
    project: "Mercy campaign",
    bucket: "Content ops",
    source: "zoom",
    priority: "p2",
    status: "todo",
    dueDate: iso(9),
  },
  {
    id: "t-18",
    title: "Prepare the renewal deck for Piedmont's October review",
    customer: "Piedmont Health",
    project: "Renewals",
    bucket: "Contract / billing",
    source: "gmail",
    priority: "p2",
    status: "todo",
    dueDate: iso(12),
    excerpt: "…we'll want the renewal numbers ahead of the October review…",
  },
];

export const MOCK_PROJECTS: MockProject[] = [
  {
    id: "pr-01",
    name: "Piedmont onboarding",
    notes: "Second marketing team going live; mirror the spring rollout.",
    defaultBucket: "Onboarding",
    steps: [
      { id: "s-01", title: "Send onboarding checklist", done: true },
      { id: "s-02", title: "Schedule kickoff call", done: false },
      { id: "s-03", title: "Provision accounts for the new team", done: false },
      { id: "s-04", title: "30-day check-in", done: false },
    ],
  },
  {
    id: "pr-02",
    name: "Q3 reporting",
    notes: "Usage one-pagers for each stakeholder meeting this quarter.",
    defaultBucket: "Reporting",
    steps: [
      { id: "s-05", title: "Pull Q3 usage exports", done: true },
      { id: "s-06", title: "Draft Ottumwa one-pager", done: false },
      { id: "s-07", title: "Draft Mercy one-pager", done: false },
    ],
  },
];

export const MOCK_SUGGESTED: MockSuggestedTask[] = [
  {
    id: "sg-01",
    title: "Send St. Luke's the updated pricing sheet before Thursday",
    customer: "St. Luke's",
    bucket: "Contract / billing",
    source: "gmail",
    priority: "p1",
    dueDate: iso(1),
    excerpt: "Could you get us the updated pricing before our Thursday sync?",
    sourceLine: "Gmail — from procurement@stlukes.org, 9:14 am",
  },
  {
    id: "sg-02",
    title: "Add captions to Mercy's two new recruiting videos",
    customer: "Mercy General",
    bucket: "Caption edits",
    source: "zoom",
    priority: "p2",
    excerpt: "…two more recruiting spots coming your way for captions…",
    sourceLine: "Zoom — Mercy weekly sync, yesterday",
  },
  {
    id: "sg-03",
    title: "Intro call with Dana, Ottumwa's incoming marketing lead",
    customer: "Ottumwa Regional",
    bucket: "Relationship",
    source: "zoom",
    priority: "p3",
    excerpt: "…Dana starts on the 15th — worth an intro call early on…",
    sourceLine: "Zoom — Ottumwa check-in, yesterday",
  },
];
