import { useMemo, useState } from "react"
import {
  Calendar,
  Filter,
  MoreHorizontal,
  Search,
  ChevronRight,
  Columns3,
  Flag,
} from "lucide-react"

import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Badge } from "../components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Checkbox } from "../components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"

type Status = "Draft" | "In Review" | "Ready to Publish" | "Published" | "Revision required"

type Row = {
  id: string
  title: string
  desc: string
  author: string
  slug: string
  updated: string
  status: Status
  selected?: boolean
}

function StatusPill({ status }: { status: Status }) {
  const variant =
    status === "Published"
      ? "success"
      : status === "In Review"
      ? "warning"
      : status === "Ready to Publish"
      ? "brand"
      : status === "Revision required"
      ? "destructive"
      : "secondary"

  const className =
    variant === "success"
      ? "bg-success-50 text-success-700 border border-success-200"
      : variant === "warning"
      ? "bg-warning-50 text-warning-700 border border-warning-200"
      : variant === "brand"
      ? "bg-brand-50 text-brand-700 border border-brand-200"
      : variant === "destructive"
      ? "bg-error-50 text-error-700 border border-error-200"
      : "bg-gray-50 text-gray-700 border border-gray-200"

  return (
    <span className={"inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium " + className}>
      {status}
    </span>
  )
}

export default function ArticlesPage() {
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState<Record<string, boolean>>({ "3": true })

  const rows = useMemo<Row[]>(
    () => [
      {
        id: "1",
        title: "A bug is becoming a meme on the internet",
        desc: "Maybe the answer is in this article, or not",
        author: "A",
        slug: "squirrel-steals-pizza",
        updated: "Jan 4, 2025",
        status: "Draft",
      },
      {
        id: "2",
        title: "This shrimp is awesome",
        desc: "Mantis shrimps, or stomatopods, are mesmerizing",
        author: "B",
        slug: "this-shrimp-is-awesome",
        updated: "Jan 4, 2025",
        status: "In Review",
      },
      {
        id: "3",
        title: "The internet's Own boy",
        desc: "How a bug on MySQL is becoming a meme",
        author: "C",
        slug: "rise-of-ai-generated-art",
        updated: "Jan 2, 2025",
        status: "Ready to Publish",
      },
      {
        id: "4",
        title: "Beautiful picture",
        desc: "Follow the story of Aaron Swartz",
        author: "D",
        slug: "a-bug-is-becoming-a-meme",
        updated: "Jan 6, 2025",
        status: "Published",
      },
      {
        id: "5",
        title: "A bug is becoming a meme on the internet",
        desc: "Description of a beautiful picture",
        author: "E",
        slug: "this-shrimp-is-awesome",
        updated: "Jan 8, 2025",
        status: "Revision required",
      },
      {
        id: "6",
        title: "The rise of AI generated art",
        desc: "The rise of AI generated art: Explore how",
        author: "F",
        slug: "beautiful-picture",
        updated: "Jan 6, 2025",
        status: "Draft",
      },
      {
        id: "7",
        title: "A squirrel steals a slice of pizza",
        desc: "A squirrel steals a slice of pizza: Watch",
        author: "G",
        slug: "the-internets-own-boy",
        updated: "Jan 4, 2025",
        status: "Draft",
      },
    ],
    []
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return rows
    return rows.filter((r) => (r.title + " " + r.slug).toLowerCase().includes(q))
  }, [rows, query])

  const allChecked = filtered.length > 0 && filtered.every((r) => selected[r.id])
  const someChecked = filtered.some((r) => selected[r.id]) && !allChecked

  function toggleAll() {
    if (allChecked) {
      const next = { ...selected }
      filtered.forEach((r) => delete next[r.id])
      setSelected(next)
      return
    }
    const next = { ...selected }
    filtered.forEach((r) => (next[r.id] = true))
    setSelected(next)
  }

  function toggleOne(id: string, value: boolean) {
    const next = { ...selected }
    if (value) next[id] = true
    else delete next[id]
    setSelected(next)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="px-8 pt-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <span className="h-6 w-6 rounded-md border bg-card" />
            Content Builder
          </span>
          <ChevronRight className="h-4 w-4" />
          <span>Article</span>
        </div>

        <div className="mt-5 flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Article</h1>
            <div className="mt-1 text-sm text-muted-foreground">7 entries found</div>
          </div>

          <Button className="rounded-xl px-5">Create new entry</Button>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <div className="relative w-[420px]">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-9 pr-16 rounded-xl"
              placeholder="Search for trades"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground border rounded-md px-2 py-1">
              ⌘K
            </div>
          </div>

          <div className="flex-1" />

          <Button variant="outline" className="rounded-xl gap-2">
            <Calendar className="h-4 w-4" />
            Jan 10, 2025 – Jan 16, 2025
          </Button>

          <Button variant="outline" className="rounded-xl gap-2">
            <Filter className="h-4 w-4" />
            Filters
            <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-muted px-1.5 text-xs">
              3
            </span>
          </Button>

          <Button variant="outline" size="icon" className="rounded-xl" aria-label="Columns">
            <Columns3 className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="icon" className="rounded-xl" aria-label="Locale">
            <Flag className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-4 rounded-2xl border bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="w-[48px]">
                  <Checkbox
                    checked={allChecked ? true : someChecked ? "indeterminate" : false}
                    onCheckedChange={() => toggleAll()}
                    aria-label="Select all"
                  />
                </TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="w-[120px]">Author</TableHead>
                <TableHead className="w-[260px]">Slug</TableHead>
                <TableHead className="w-[160px]">Last update</TableHead>
                <TableHead className="w-[180px]">Status</TableHead>
                <TableHead className="w-[56px]" />
              </TableRow>
            </TableHeader>

            <TableBody>
              {filtered.map((r) => {
                const isChecked = !!selected[r.id]
                return (
                  <TableRow key={r.id} className={isChecked ? "bg-muted/20" : undefined}>
                    <TableCell>
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={(v) => toggleOne(r.id, !!v)}
                        aria-label="Select row"
                      />
                    </TableCell>

                    <TableCell>
                      <div className="font-medium">{r.title}</div>
                      <div className="text-sm text-muted-foreground line-clamp-1">{r.desc}</div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold">
                          {r.author}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="text-muted-foreground">{r.slug}</TableCell>
                    <TableCell className="text-muted-foreground">{r.updated}</TableCell>

                    <TableCell>
                      <StatusPill status={r.status} />
                    </TableCell>

                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-xl" aria-label="Row actions">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>

        <div className="mt-6 flex items-center justify-between pb-10">
          <div className="inline-flex rounded-xl border overflow-hidden bg-card">
            <button className="px-3 py-2 text-sm text-muted-foreground hover:bg-muted/40">←</button>
            <button className="px-3 py-2 text-sm bg-muted/40">1</button>
            <button className="px-3 py-2 text-sm text-muted-foreground hover:bg-muted/40">2</button>
            <button className="px-3 py-2 text-sm text-muted-foreground hover:bg-muted/40">3</button>
            <button className="px-3 py-2 text-sm text-muted-foreground hover:bg-muted/40">…</button>
            <button className="px-3 py-2 text-sm text-muted-foreground hover:bg-muted/40">8</button>
            <button className="px-3 py-2 text-sm text-muted-foreground hover:bg-muted/40">9</button>
            <button className="px-3 py-2 text-sm text-muted-foreground hover:bg-muted/40">10</button>
            <button className="px-3 py-2 text-sm text-muted-foreground hover:bg-muted/40">→</button>
          </div>

          <Button variant="ghost" className="text-muted-foreground">
            View 25
          </Button>
        </div>
      </div>
    </div>
  )
}
