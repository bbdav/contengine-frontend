import Sidebar from "../components/sidebar/Sidebar"

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-secondary_subtle">
      <Sidebar />
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  )
}
