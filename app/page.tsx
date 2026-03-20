import { Badge, Button, Card, CardHeader } from "./components/ui";

interface DashboardMetric {
  label: string;
  value: string;
  change: string;
}

interface FocusItem {
  title: string;
  description: string;
  status: "On track" | "Needs review" | "Planned";
}

interface ActivityItem {
  title: string;
  time: string;
  summary: string;
}

const metrics: DashboardMetric[] = [
  {
    label: "Active projects",
    value: "12",
    change: "+2 this week",
  },
  {
    label: "Team focus",
    value: "84%",
    change: "Stable from yesterday",
  },
  {
    label: "Open tasks",
    value: "27",
    change: "5 due today",
  },
];

const focusItems: FocusItem[] = [
  {
    title: "Homepage refresh",
    description:
      "Finalize the navigation pass and align the last content blocks.",
    status: "On track",
  },
  {
    title: "Analytics setup",
    description:
      "Confirm event naming before the next release candidate is shared.",
    status: "Needs review",
  },
  {
    title: "Mobile QA",
    description:
      "Prepare the next testing round for the updated dashboard screens.",
    status: "Planned",
  },
];

const activityItems: ActivityItem[] = [
  {
    title: "Design handoff updated",
    time: "10 minutes ago",
    summary: "New spacing guidance and component notes were added for review.",
  },
  {
    title: "Sprint board refined",
    time: "1 hour ago",
    summary:
      "Tasks were regrouped to keep delivery focused on the current milestone.",
  },
  {
    title: "Stakeholder summary sent",
    time: "Earlier today",
    summary:
      "A concise progress update was shared with the latest blockers and wins.",
  },
];

const statusVariantMap: Record<
  FocusItem["status"],
  "success" | "warning" | "default"
> = {
  "On track": "success",
  "Needs review": "warning",
  Planned: "default",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="flex flex-col gap-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <Badge variant="info" size="sm" dot>
              Daily overview
            </Badge>
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                A calm dashboard for the work that matters.
              </h1>
              <p className="text-sm leading-6 text-gray-500 sm:text-base">
                Track progress, spot priorities, and keep the team aligned from
                a single spacious home screen.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="secondary">Share update</Button>
            <Button>New task</Button>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {metrics.map((metric) => (
            <Card key={metric.label} className="rounded-3xl" padding="lg">
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-500">
                  {metric.label}
                </p>
                <div className="space-y-1">
                  <p className="text-3xl font-semibold tracking-tight text-gray-900">
                    {metric.value}
                  </p>
                  <p className="text-sm text-gray-500">{metric.change}</p>
                </div>
              </div>
            </Card>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(320px,1fr)]">
          <Card className="rounded-3xl" padding="lg">
            <CardHeader
              title="Current focus"
              description="A simple view of the work that needs attention next."
              action={
                <Button variant="ghost" size="sm">
                  View all
                </Button>
              }
            />
            <div className="space-y-4">
              {focusItems.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col gap-3 rounded-2xl border border-gray-100 p-4 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div className="space-y-1">
                    <h2 className="text-base font-medium text-gray-900">
                      {item.title}
                    </h2>
                    <p className="max-w-xl text-sm leading-6 text-gray-500">
                      {item.description}
                    </p>
                  </div>
                  <Badge variant={statusVariantMap[item.status]}>
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid gap-4">
            <Card className="rounded-3xl" padding="lg">
              <CardHeader
                title="Upcoming"
                description="Key checkpoints for the rest of the day."
              />
              <div className="space-y-4">
                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-sm font-medium text-gray-900">
                    Team check-in
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    1:30 PM · Weekly delivery sync
                  </p>
                </div>
                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-sm font-medium text-gray-900">
                    Review window
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    3:00 PM · Approve homepage content updates
                  </p>
                </div>
              </div>
            </Card>

            <Card className="rounded-3xl" padding="lg">
              <CardHeader
                title="Recent activity"
                description="A concise timeline of the latest movement."
              />
              <div className="space-y-4">
                {activityItems.map((item) => (
                  <div key={item.title} className="space-y-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium text-gray-900">
                        {item.title}
                      </p>
                      <span className="text-xs text-gray-400">{item.time}</span>
                    </div>
                    <p className="text-sm leading-6 text-gray-500">
                      {item.summary}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}
