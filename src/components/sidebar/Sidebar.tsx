import { useMemo, useState } from "react"
import {
  Home,
  LayoutGrid,
  PenTool,
  Image as ImageIcon,
  Users,
  Code2,
  Clock,
  Settings,
  ChevronDown,
  ChevronRight,
  Plus,
  Search,
  PanelLeft,
} from "lucide-react"

import { cn } from "../../lib/utils"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Separator } from "../ui/separator"
import { ScrollArea } from "../ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Input } from "../ui/input"

type NavItem = {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  count?: number
}

type NavSection = {
  title: string
  items: NavItem[]
  defaultOpen?: boolean
}

function RailButton({
  icon: Icon,
  active,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>
  active?: boolean
  label: string
}) {
  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className={cn(
              "h-10 w-10 rounded-lg flex items-center justify-center transition",
              active
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
            )}
            aria-label={label}
            type="button"
          >
            <Icon className="h-5 w-5" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

function Section({
  section,
  activeId,
  onSelect,
}: {
  section: NavSection
  activeId: string
  onSelect: (id: string) => void
}) {
  const [open, setOpen] = useState(section.defaultOpen ?? true)

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between text-xs text-muted-foreground px-2 py-1"
      >
        <span className="font-medium">{section.title}</span>
        {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </button>

      {open && (
        <div className="space-y-1">
          {section.items.map((item) => {
            const active = item.id === activeId
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item.id)}
                className={cn(
                  "w-full flex items-center gap-2 rounded-md px-2 py-2 text-sm transition",
                  active
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                )}
              >
                <span className="flex h-6 w-6 items-center justify-center">
                  <item.icon className="h-4 w-4" />
                </span>
                <span className="flex-1 text-left">{item.label}</span>
                {typeof item.count === "number" && (
                  <Badge variant="secondary" className="rounded-md px-2">
                    {item.count}
                  </Badge>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function Sidebar() {
  const sections = useMemo<NavSection[]>(
    () => [
      {
        title: "Collections (content list)",
        defaultOpen: true,
        items: [
          { id: "articles", label: "Articles", icon: PenTool, count: 9 },
          { id: "authors", label: "Authors", icon: Users, count: 7 },
          { id: "categories", label: "Categories", icon: LayoutGrid, count: 23 },
          { id: "products", label: "Products", icon: Home, count: 21 },
        ],
      },
      {
        title: "Singletons",
        defaultOpen: true,
        items: [
          { id: "homepage", label: "Homepage", icon: Home },
          { id: "about", label: "About Page", icon: LayoutGrid },
          { id: "privacy", label: "Privacy Policy", icon: Code2 },
          { id: "terms", label: "Terms & Conditions", icon: Code2 },
        ],
      },
      {
        title: "Blocks",
        defaultOpen: true,
        items: [
          { id: "hero", label: "Hero Section", icon: ImageIcon },
          { id: "testimonial", label: "Testimonial Block", icon: ImageIcon },
          { id: "gallery", label: "Gallery Block", icon: ImageIcon },
          { id: "faq", label: "FAQ Block", icon: ImageIcon },
        ],
      },
    ],
    []
  )

  const [activeId, setActiveId] = useState("articles")

  return (
    <aside className="h-screen w-[320px] shrink-0 border-r bg-background flex">
      {/* Icon rail */}
      <div className="w-14 border-r flex flex-col items-center py-3 gap-2">
        <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center">
          <span className="text-sm font-semibold">C</span>
        </div>

        <div className="mt-2 flex flex-col gap-2">
          <RailButton icon={Home} label="Home" />
          <RailButton icon={LayoutGrid} label="Content" active />
          <RailButton icon={PenTool} label="Editor" />
          <RailButton icon={ImageIcon} label="Assets" />
          <RailButton icon={Users} label="Users" />
          <RailButton icon={Code2} label="API" />
          <RailButton icon={Clock} label="Activity" />
        </div>

        <div className="mt-auto flex flex-col gap-2 pb-2">
          <RailButton icon={Settings} label="Settings" />
        </div>
      </div>

      {/* Main sidebar panel */}
      <div className="flex-1 flex flex-col">
        <div className="h-14 px-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold">Content Builder</span>
          </div>
          <Button variant="ghost" size="icon" aria-label="Collapse sidebar">
            <PanelLeft className="h-5 w-5" />
          </Button>
        </div>

        <div className="px-3 pb-3">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9 pr-14" placeholder="Search" />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground border rounded-md px-2 py-1">
              ⌘K
            </div>
          </div>
        </div>

        <Separator />

        <ScrollArea className="flex-1">
          <div className="p-3 space-y-6">
            {sections.map((section) => (
              <Section
                key={section.title}
                section={section}
                activeId={activeId}
                onSelect={setActiveId}
              />
            ))}
          </div>
        </ScrollArea>

        <div className="p-3">
          <Button className="w-full justify-center gap-2">
            <Plus className="h-4 w-4" />
            Add New
          </Button>
        </div>

        <div className="p-3 pt-0">
          <div className="rounded-xl border bg-card p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarFallback>MD</AvatarFallback>
              </Avatar>
              <div className="leading-tight">
                <div className="text-sm font-medium">Mohit Davidson</div>
                <div className="text-xs text-muted-foreground">mohit@contengine.io</div>
              </div>
            </div>
            <Button variant="ghost" size="icon" aria-label="Account menu">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </aside>
  )
}
