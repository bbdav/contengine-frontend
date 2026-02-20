import { Breadcrumbs } from "@/components/application/breadcrumbs/breadcrumbs";
import StatCard from "../components/StatCard";
import { ContentPageLayout } from "@/components/layouts/ContentPageLayout";

export default function DashboardPage() {
  return (
    <ContentPageLayout
      breadcrumbs={
        <Breadcrumbs type="button">
          <Breadcrumbs.Item href="/">Content</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/">Dashboard</Breadcrumbs.Item>
        </Breadcrumbs>
      }
      title="Dashboard"
      subtitle="First screen skeleton"
    >
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <StatCard label="Content types" value="12" />
        <StatCard label="Entries" value="248" />
        <StatCard label="Environments" value="3" />
      </div>

      <div className="mt-6 rounded-xl bg-primary p-4 shadow-xs ring-1 ring-secondary">
        Main panel
      </div>
    </ContentPageLayout>
  );
}
