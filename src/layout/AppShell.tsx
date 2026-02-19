import Sidebar from "../components/sidebar/Sidebar"

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  )
}
