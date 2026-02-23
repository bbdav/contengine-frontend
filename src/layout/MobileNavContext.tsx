import { createContext, useContext } from "react"

type MobileNavContextValue = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const MobileNavContext = createContext<MobileNavContextValue | null>(null)

export function useMobileNav() {
  const ctx = useContext(MobileNavContext)
  if (!ctx) throw new Error("useMobileNav must be used within <MobileNavProvider>")
  return ctx
}

export function MobileNavProvider({ value, children }: { value: MobileNavContextValue; children: React.ReactNode }) {
  return <MobileNavContext.Provider value={value}>{children}</MobileNavContext.Provider>
}
