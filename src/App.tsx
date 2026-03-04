import AppShell from "./layout/AppShell"
import ArticlesPage from "./pages/ArticlesPage"
import ContentModelPage from "./pages/ContentModelPage"

// Temporary manual switch until routing is added.
const CURRENT_PAGE: "articles" | "contentModel" = "contentModel"

export default function App() {
  return (
    <AppShell>
      {CURRENT_PAGE === "articles" ? <ArticlesPage /> : <ContentModelPage />}
    </AppShell>
  )
}
