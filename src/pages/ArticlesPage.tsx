import { useMemo, useState } from "react"
import {
  Calendar,
  Filter,
  Search,
  Columns3,
  Flag,
} from "lucide-react"

import { Button } from "@/components/base/buttons/button"
import { Input } from "@/components/base/input/input"
import { Table } from "@/components/application/table/table"
import { Checkbox } from "@/components/base/checkbox/checkbox"
import { Dropdown } from "@/components/base/dropdown/dropdown"
import { Breadcrumbs } from "@/components/application/breadcrumbs/breadcrumbs"
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
    <div className="min-h-screen bg-background-color-primary">
      <div>  
        <div className="border-b border-secondary px-6 py-3">
                <Breadcrumbs type="button">
          <Breadcrumbs.Item href="/content">Content</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/content/collections">Collections</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/articles">Article</Breadcrumbs.Item>
        </Breadcrumbs>
        </div>

        <div className="px-6 mt-4 flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Article</h1>
            <div className="mt-1 text-sm text-tertiary">7 entries found</div>
          </div>

          <Button color="primary" size="sm">Create new entry</Button>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <div className="relative w-[420px]">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-tertiary" />
            <Input
              className="pl-9 pr-16 rounded-xl"
              placeholder="Search for trades"
              value={query}
              onChange={(value) => setQuery(value)}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-tertiary border rounded-md px-2 py-1">
              ⌘K
            </div>
          </div>

          <div className="flex-1" />

          <Button color="secondary" size="sm" className="rounded-xl gap-2">
            <Calendar className="h-4 w-4" />
            Jan 10, 2025 – Jan 16, 2025
          </Button>

          <Button color="secondary" size="sm" className="rounded-xl gap-2">
            <Filter className="h-4 w-4" />
            Filters
            <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-secondary px-1.5 text-xs">
              3
            </span>
          </Button>

          <Button color="secondary" className="rounded-xl h-9 w-9 p-0" aria-label="Columns">
            <Columns3 className="h-4 w-4" />
          </Button>

          <Button color="secondary" className="rounded-xl h-9 w-9 p-0" aria-label="Locale">
            <Flag className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl bg-primary shadow-xs ring-1 ring-secondary">
          <Table aria-label="Articles">
            <Table.Header>
              <Table.Row className="bg-secondary">
                <Table.Head className="w-[48px]">
                  <Checkbox
                    isSelected={allChecked}
                    isIndeterminate={someChecked}
                    onChange={toggleAll}
                    aria-label="Select all"
                  />
                </Table.Head>
                <Table.Head>Title</Table.Head>
                <Table.Head className="w-[120px]">Author</Table.Head>
                <Table.Head className="w-[260px]">Slug</Table.Head>
                <Table.Head className="w-[160px]">Last update</Table.Head>
                <Table.Head className="w-[180px]">Status</Table.Head>
                <Table.Head className="w-[56px]" />
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {filtered.map((r) => {
                const isChecked = !!selected[r.id]
                return (
                  <Table.Row key={r.id} className={isChecked ? "bg-primary_hover" : undefined}>
                    <Table.Cell>
                      <Checkbox
                        isSelected={isChecked}
                        onChange={(v) => toggleOne(r.id, v)}
                        aria-label="Select row"
                      />
                    </Table.Cell>

                    <Table.Cell>
                      <div className="font-medium">{r.title}</div>
                      <div className="text-sm text-tertiary line-clamp-1">{r.desc}</div>
                    </Table.Cell>

                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-xs font-semibold">
                          {r.author}
                        </div>
                      </div>
                    </Table.Cell>

                    <Table.Cell className="text-tertiary">{r.slug}</Table.Cell>
                    <Table.Cell className="text-tertiary">{r.updated}</Table.Cell>

                    <Table.Cell>
                      <StatusPill status={r.status} />
                    </Table.Cell>

                    <Table.Cell className="text-right">
                      <Dropdown.Root>
                        <Dropdown.DotsButton aria-label="Row actions" />

                        <Dropdown.Popover className="w-min">
                          <Dropdown.Menu>
                            <Dropdown.Item label="Edit">Edit</Dropdown.Item>
                            <Dropdown.Item label="Duplicate">Duplicate</Dropdown.Item>
                            <Dropdown.Item label="Delete">Delete</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown.Popover>
                      </Dropdown.Root>
                    </Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table>
        </div>

        <div className="mt-6 flex items-center justify-between pb-10">
          <div className="inline-flex rounded-xl border overflow-hidden bg-primary">
            <button className="px-3 py-2 text-sm text-tertiary hover:bg-primary_hover">←</button>
            <button className="px-3 py-2 text-sm bg-primary_hover">1</button>
            <button className="px-3 py-2 text-sm text-tertiary hover:bg-primary_hover">2</button>
            <button className="px-3 py-2 text-sm text-tertiary hover:bg-primary_hover">3</button>
            <button className="px-3 py-2 text-sm text-tertiary hover:bg-primary_hover">…</button>
            <button className="px-3 py-2 text-sm text-tertiary hover:bg-primary_hover">8</button>
            <button className="px-3 py-2 text-sm text-tertiary hover:bg-primary_hover">9</button>
            <button className="px-3 py-2 text-sm text-tertiary hover:bg-primary_hover">10</button>
            <button className="px-3 py-2 text-sm text-tertiary hover:bg-primary_hover">→</button>
          </div>

          <Button color="tertiary" className="text-tertiary">
            View 25
          </Button>
        </div>
      </div>
    </div>
  )
}
