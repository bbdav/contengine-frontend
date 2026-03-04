import { useEffect, useState } from "react"

import AppShell from "./layout/AppShell"
import ArticlesPage from "./pages/ArticlesPage"
import ContentTypes from "./pages/ContentTypes"

type Route = "/" | "/articles" | "/content-types"

function getRoute(): Route {
  const p = window.location.pathname
  if (p === "/content-types") return "/content-types"
  if (p === "/articles") return "/articles"
  return "/"
}

export default function App() {
  const [route, setRoute] = useState<Route>(() => getRoute())

  useEffect(() => {
    const onPop = () => setRoute(getRoute())

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return
      if (e.button !== 0) return
      if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return

      const target = e.target as Element | null
      const a = target?.closest?.("a") as HTMLAnchorElement | null
      if (!a) return
      if (a.target && a.target !== "_self") return
      if (a.hasAttribute("download")) return

      const href = a.getAttribute("href")
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return

      const url = new URL(a.href, window.location.href)
      if (url.origin !== window.location.origin) return

      const path = url.pathname as Route
      if (path !== "/" && path !== "/articles" && path !== "/content-types") return

      e.preventDefault()
      window.history.pushState({}, "", url.pathname + url.search + url.hash)
      setRoute(getRoute())
    }

    window.addEventListener("popstate", onPop)
    window.addEventListener("click", onClick)
    return () => {
      window.removeEventListener("popstate", onPop)
      window.removeEventListener("click", onClick)
    }
  }, [])

  return (
    <AppShell>
      {route === "/content-types" ? <ContentTypes /> : <ArticlesPage />}
    </AppShell>
  )
}
