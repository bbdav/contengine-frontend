import { useMemo, useState } from "react"
import { Calendar, Columns01, FilterLines, SearchLg } from "@untitledui/icons"
import { CheckCircle, CircleDashed, CircleHalf, HighlighterCircle, RocketLaunch } from "@phosphor-icons/react"

import { Breadcrumbs } from "@/components/application/breadcrumbs/breadcrumbs"
import { Table } from "@/components/application/table/table"
import { Badge, BadgeWithIcon } from "@/components/base/badges/badges"
import { Button } from "@/components/base/buttons/button"
import { ButtonUtility } from "@/components/base/buttons/button-utility"
import { Dropdown } from "@/components/base/dropdown/dropdown"
import { Input } from "@/components/base/input/input"
import { ContentPageLayout } from "@/components/layouts/ContentPageLayout"

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

const InReviewIcon = ({ className }: { className?: string }) => <CircleHalf className={className} weight="fill" />
const ReadyToPublishIcon = ({ className }: { className?: string }) => <RocketLaunch className={className} weight="fill" />
const PublishedIcon = ({ className }: { className?: string }) => <CheckCircle className={className} weight="fill" />
const RevisionRequiredIcon = ({ className }: { className?: string }) => <HighlighterCircle className={className} weight="fill" />

function StatusPill({ status }: { status: Status }) {
  const badge =
    status === "Draft"
      ? { color: "gray" as const, icon: CircleDashed }
      : status === "In Review"
      ? { color: "warning" as const, icon: InReviewIcon }
      : status === "Ready to Publish"
      ? { color: "blue" as const, icon: ReadyToPublishIcon }
      : status === "Published"
      ? { color: "success" as const, icon: PublishedIcon }
      : { color: "error" as const, icon: RevisionRequiredIcon }

  return (
    <BadgeWithIcon type="pill-color" size="sm" color={badge.color} iconLeading={badge.icon}>
      {status}
    </BadgeWithIcon>
  )
}

export default function ArticlesPage() {
  const [query, setQuery] = useState("")
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set(["3"]))

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

  // Table selection is handled by react-aria-components.
  // We keep `selectedKeys` controlled so we can read/use it later.

  return (
    <ContentPageLayout
      breadcrumbs={
        <Breadcrumbs type="button">
          <Breadcrumbs.Item href="/content">Content</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/content/collections">Collections</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/articles">Article</Breadcrumbs.Item>
        </Breadcrumbs>
      }
      title="Article"
      hideHeader
      containerClassName="w-full px-0 py-0"
      headerContainerClassName="w-full"
      headerContent={
        <div className="px-6">
          <div className="mt-4 flex items-start justify-between gap-6">
            <div className="min-w-0">
              <h1 className="text-display-xs font-semibold text-primary">Article</h1>
              <p className="mt-1 text-sm text-tertiary">7 entries found</p>
            </div>

            <div className="shrink-0">
              <Button color="primary" size="md" className="rounded-lg">
                Create new entry
              </Button>
            </div>
          </div>
        </div>
      }
    >
      {/* Controls + table */}
      <div className="px-6 pb-10">
        <div className="mt-4">
          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="w-full max-w-md">
              <Input
                shortcut
                size="sm"
                placeholder="Search"
                icon={SearchLg}
                value={query}
                onChange={setQuery}
                className="rounded-lg"
              />
            </div>

        <div className="flex items-center gap-2">
          <Button color="secondary" size="md" iconLeading={Calendar}>
            Jan 10, 2025 – Jan 16, 2025
          </Button>

          <Button color="secondary" size="md" iconLeading={FilterLines}>
            <span className="inline-flex items-center gap-2">
              Filters
              <Badge type="modern" size="sm" color="gray" className="py-0">
                3
              </Badge>
            </span>
          </Button>

          <ButtonUtility icon={Columns01} tooltip="Columns" size="md" />

          <Dropdown.Root>
            <Button color="secondary" size="md">
              EN
            </Button>
            <Dropdown.Popover className="w-min">
              <Dropdown.Menu>
                <Dropdown.Item label="English">English</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown.Root>
        </div>
      </div>

        {/* Table */}
        <div className="mt-4 overflow-hidden rounded-lg bg-primary shadow-xs ring-1 ring-secondary">
          <Table
            aria-label="Articles"
            selectionMode="multiple"
            selectedKeys={selectedKeys}
            onSelectionChange={(keys) => {
              // react-aria can pass "all" or a Set.
              if (keys === "all") {
                setSelectedKeys(new Set(filtered.map((r) => r.id)))
              } else {
                setSelectedKeys(new Set(Array.from(keys as Set<string>).map(String)))
              }
            }}
          >
          <Table.Header>
            <Table.Head id="title" label="Title" allowsSorting />
            <Table.Head id="author" label="Author" className="w-[120px]" />
            <Table.Head id="slug" label="Slug" className="w-[260px]" />
            <Table.Head id="updated" label="Last update" className="w-[160px]" />
            <Table.Head id="status" label="Status" className="w-[180px]" />
            <Table.Head id="actions" className="w-[56px]" />
          </Table.Header>

          <Table.Body items={filtered}>
            {(r: Row) => (
              <Table.Row id={r.id}>
                <Table.Cell>
                  <div>
                    <div className="font-medium text-primary">{r.title}</div>
                    <div className="text-sm text-tertiary line-clamp-1">{r.desc}</div>
                  </div>
                </Table.Cell>

                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-semibold">{r.author}</div>
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
            )}
          </Table.Body>
        </Table>
      </div>

          {/* Footer controls */}
          <div className="mt-6 flex items-center justify-end gap-3">
            <Button color="tertiary" className="text-tertiary">
              View 25
            </Button>
          </div>
        </div>
      </div>
    </ContentPageLayout>
  )
}
