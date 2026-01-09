export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 border-r">Sidebar</aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
