import { useEffect, useState } from "react"

import Sidebar from "../components/sidebar/Sidebar"
import { MobileNavProvider } from "./MobileNavContext"

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isDesktop, setIsDesktop] = useState(true)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    const update = () => {
      const desktop = window.matchMedia("(min-width: 1024px)").matches
      setIsDesktop(desktop)
      if (desktop) setMobileNavOpen(false)
    }

    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  return (
    <MobileNavProvider
      value={{
        isOpen: mobileNavOpen,
        open: () => setMobileNavOpen(true),
        close: () => setMobileNavOpen(false),
        toggle: () => setMobileNavOpen((v) => !v),
      }}
    >
      <div className="flex h-screen bg-secondary_subtle">
        {/* Desktop sidebar */}
        {isDesktop ? <Sidebar /> : null}

        {/* Mobile drawer sidebar */}
        {!isDesktop && mobileNavOpen ? (
          <>
            <div className="fixed inset-0 z-40 bg-black/30" onClick={() => setMobileNavOpen(false)} />
            <div className="fixed inset-y-0 left-0 z-50">
              <Sidebar mode="drawer" />
            </div>
          </>
        ) : null}

        <main className="min-w-0 flex-1 overflow-hidden">{children}</main>
      </div>
    </MobileNavProvider>
  )
}
