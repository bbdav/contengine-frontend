import AppShell from "./layout/AppShell"
import ArticlesPage from "./pages/ArticlesPage"
import EntryEditorPage from "./pages/EntryEditorPage"

export default function App() {
  const path = window.location.pathname

  return (
    <AppShell>
      {path === "/entry" ? <EntryEditorPage /> : <ArticlesPage />}
    </AppShell>
  )
}
