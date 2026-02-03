import StatCard from "../components/StatCard"

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          First screen skeleton
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Content types" value="12" />
        <StatCard label="Entries" value="248" />
        <StatCard label="Environments" value="3" />
      </div>

      <div className="rounded-lg border bg-card p-4">
        Main panel
      </div>
    </div>
  )
}
