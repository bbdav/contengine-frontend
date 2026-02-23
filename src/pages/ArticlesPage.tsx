import { useMemo, useState } from "react"
import type { SortDescriptor } from "react-aria-components"
import { ArrowLeft, ArrowRight, ChevronDown, Columns03, FilterLines, SearchLg } from "@untitledui/icons"
import { CheckCircle, CircleDashed, CircleHalf, HighlighterCircle, RocketLaunch } from "@phosphor-icons/react"

import { Breadcrumbs } from "@/components/application/breadcrumbs/breadcrumbs"
import { DateRangePicker } from "@/components/application/date-picker/date-range-picker"
import { Pagination } from "@/components/application/pagination/pagination-base"
import { Table } from "@/components/application/table/table"
import { Avatar } from "@/components/base/avatar/avatar"
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group"
import { Badge, BadgeWithIcon } from "@/components/base/badges/badges"
import { Button } from "@/components/base/buttons/button"
import { ButtonUtility } from "@/components/base/buttons/button-utility"
import { Dropdown } from "@/components/base/dropdown/dropdown"
import { Input } from "@/components/base/input/input"
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip"
import { ContentPageLayout } from "@/components/layouts/ContentPageLayout"

type Status = "Draft" | "In Review" | "Ready to Publish" | "Published" | "Revision required"

type Row = {
  id: string
  title: string
  desc: string
  authorName: string
  authorAvatarUrl: string
  slug: string
  updated: string
  status: Status
  selected?: boolean
}

const AUTHOR_AVATARS = [
  "https://www.untitledui.com/images/avatars/olivia-rhye?bg=%23E0E0E0",
  "https://www.untitledui.com/images/avatars/phoenix-baker?bg=%23E0E0E0",
  "https://www.untitledui.com/images/avatars/lana-steiner?bg=%23E0E0E0",
  "https://www.untitledui.com/images/avatars/demi-wilkinson?bg=%23E0E0E0",
  "https://www.untitledui.com/images/avatars/natali-craig?bg=%23E0E0E0",
  "https://www.untitledui.com/images/avatars/candice-wu?bg=%23E0E0E0",
  "https://www.untitledui.com/images/avatars/orlando-diggs?bg=%23E0E0E0",
]

const pickAuthorAvatar = (name: string) => AUTHOR_AVATARS[name.charCodeAt(0) % AUTHOR_AVATARS.length]

type Language = {
  code: "en" | "fr" | "es"
  label: string
  flag: "US" | "FR" | "ES"
}

const LANGUAGES: Language[] = [
  { code: "en", label: "English", flag: "US" },
  { code: "fr", label: "Français", flag: "FR" },
  { code: "es", label: "Español", flag: "ES" },
]

const makeFlagIcon = (flag: Language["flag"]) =>
  function FlagIcon({ className }: { className?: string }) {
    return <img src={`https://www.untitledui.com/images/flags/${flag}.svg`} alt={`${flag} flag`} className={className ?? "size-4 rounded-full"} />
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
  const [page, setPage] = useState(1)
  const [language, setLanguage] = useState<Language>(LANGUAGES[0])
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({ column: "updated", direction: "descending" })

  const rows = useMemo<Row[]>(
    () => [
      {
        id: "1",
        title: "A bug is becoming a meme on the internet",
        desc: "Maybe the answer is in this article, or not",
        authorName: "Olivia Rhye",
        authorAvatarUrl: pickAuthorAvatar("Olivia Rhye"),
        slug: "squirrel-steals-pizza",
        updated: "Jan 4, 2025",
        status: "Draft",
      },
      {
        id: "2",
        title: "This shrimp is awesome",
        desc: "Mantis shrimps, or stomatopods, are mesmerizing",
        authorName: "Phoenix Baker",
        authorAvatarUrl: pickAuthorAvatar("Phoenix Baker"),
        slug: "this-shrimp-is-awesome",
        updated: "Jan 4, 2025",
        status: "In Review",
      },
      {
        id: "3",
        title: "The internet's Own boy",
        desc: "How a bug on MySQL is becoming a meme",
        authorName: "Lana Steiner",
        authorAvatarUrl: pickAuthorAvatar("Lana Steiner"),
        slug: "rise-of-ai-generated-art",
        updated: "Jan 2, 2025",
        status: "Ready to Publish",
      },
      {
        id: "4",
        title: "Beautiful picture",
        desc: "Follow the story of Aaron Swartz",
        authorName: "Demi Wilkinson",
        authorAvatarUrl: pickAuthorAvatar("Demi Wilkinson"),
        slug: "a-bug-is-becoming-a-meme",
        updated: "Jan 6, 2025",
        status: "Published",
      },
      {
        id: "5",
        title: "A bug is becoming a meme on the internet",
        desc: "Description of a beautiful picture",
        authorName: "Natali Craig",
        authorAvatarUrl: pickAuthorAvatar("Natali Craig"),
        slug: "this-shrimp-is-awesome",
        updated: "Jan 8, 2025",
        status: "Revision required",
      },
      {
        id: "6",
        title: "The rise of AI generated art",
        desc: "The rise of AI generated art: Explore how",
        authorName: "Candice Wu",
        authorAvatarUrl: pickAuthorAvatar("Candice Wu"),
        slug: "beautiful-picture",
        updated: "Jan 6, 2025",
        status: "Draft",
      },
      {
        id: "7",
        title: "A squirrel steals a slice of pizza",
        desc: "A squirrel steals a slice of pizza: Watch",
        authorName: "Orlando Diggs",
        authorAvatarUrl: pickAuthorAvatar("Orlando Diggs"),
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

  const sorted = useMemo(() => {
    const { column, direction } = sortDescriptor
    const dir = direction === "descending" ? -1 : 1

    const statusRank: Record<Status, number> = {
      Draft: 1,
      "In Review": 2,
      "Revision required": 3,
      "Ready to Publish": 4,
      Published: 5,
    }

    const toTime = (s: string) => {
      // Example values are like "Jan 4, 2025".
      const t = Date.parse(s)
      return Number.isFinite(t) ? t : 0
    }

    return [...filtered].sort((a, b) => {
      let av: string | number = ""
      let bv: string | number = ""

      switch (column) {
        case "title":
          av = a.title
          bv = b.title
          break
        case "author":
          av = a.authorName
          bv = b.authorName
          break
        case "slug":
          av = a.slug
          bv = b.slug
          break
        case "updated":
          av = toTime(a.updated)
          bv = toTime(b.updated)
          break
        case "status":
          av = statusRank[a.status]
          bv = statusRank[b.status]
          break
        default:
          return 0
      }

      if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir
      return String(av).localeCompare(String(bv)) * dir
    })
  }, [filtered, sortDescriptor])

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
      containerClassName="w-full flex-1 min-h-0 overflow-hidden px-0 py-0"
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
      {/* Body (right side): controls stay visible; table scrolls; pagination stays at the bottom */}
      <div className="flex h-full flex-col">
        {/* Controls */}
        <div className="shrink-0 px-6 pt-4">
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
              <DateRangePicker />

              <Button color="secondary" size="md" iconLeading={FilterLines}>
                <span className="inline-flex items-center gap-2">
                  Filters
                  <Badge type="modern" size="sm" color="gray" className="py-0">
                    3
                  </Badge>
                </span>
              </Button>

              <ButtonUtility icon={Columns03} tooltip="Columns" size="md" />

              <Dropdown.Root>
                <Button color="secondary" size="md" iconLeading={makeFlagIcon(language.flag)} iconTrailing={ChevronDown}>
                  {language.code.toUpperCase()}
                </Button>
                <Dropdown.Popover className="w-min">
                  <Dropdown.Menu>
                    {LANGUAGES.map((lang) => (
                      <Dropdown.Item
                        key={lang.code}
                        label={lang.label}
                        icon={makeFlagIcon(lang.flag)}
                        onAction={() => {
                          setLanguage(lang)
                        }}
                      />
                    ))}
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown.Root>
            </div>
          </div>
        </div>

        {/* Table (scrolls) */}
        <div className="mt-4 flex-1 min-h-0 px-6">
          <div className="h-full overflow-hidden rounded-lg bg-primary shadow-xs ring-1 ring-secondary">
              <Table
                aria-label="Articles"
                selectionMode="multiple"
                sortDescriptor={sortDescriptor}
                onSortChange={setSortDescriptor}
                selectedKeys={selectedKeys}
                onSelectionChange={(keys) => {
                  // react-aria can pass "all" or a Set.
                  if (keys === "all") {
                    setSelectedKeys(new Set(sorted.map((r) => r.id)))
                  } else {
                    setSelectedKeys(new Set(Array.from(keys as Set<string>).map(String)))
                  }
                }}
              >
                <Table.Header>
                  <Table.Head id="title" label="Title" allowsSorting />
                  <Table.Head id="author" label="Author" className="w-[120px]" allowsSorting />
                  <Table.Head id="slug" label="Slug" className="w-[260px]" allowsSorting />
                  <Table.Head id="updated" label="Last update" className="w-[160px]" allowsSorting />
                  <Table.Head id="status" label="Status" className="w-[180px]" allowsSorting />
                  <Table.Head id="actions" className="w-[56px]" />
                </Table.Header>

                <Table.Body items={sorted}>
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
                          <Tooltip title={r.authorName} placement="top">
                            <TooltipTrigger>
                              <Avatar size="sm" src={r.authorAvatarUrl} alt={r.authorName} />
                            </TooltipTrigger>
                          </Tooltip>
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
        </div>

      {/* Pagination bar (fixed within the right side; does not scroll with the table) */}
      <div className="shrink-0 mt-4 border-t border-secondary bg-primary">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between gap-3">
            <Pagination.Root page={page} total={10} onPageChange={setPage}>
              <Pagination.Context>
                {({ pages }) => (
                  <ButtonGroup size="md">
                    <Pagination.PrevTrigger asChild>
                      <ButtonGroupItem iconLeading={ArrowLeft} aria-label="Previous page" />
                    </Pagination.PrevTrigger>

                    {pages.map((p, index) =>
                      p.type === "page" ? (
                        <Pagination.Item key={index} {...p} asChild>
                          <ButtonGroupItem isSelected={p.isCurrent} className="size-10 items-center justify-center">
                            {p.value}
                          </ButtonGroupItem>
                        </Pagination.Item>
                      ) : (
                        <Pagination.Ellipsis key={index}>
                          <ButtonGroupItem className="pointer-events-none size-10 items-center justify-center rounded-none!">
                            &#8230;
                          </ButtonGroupItem>
                        </Pagination.Ellipsis>
                      )
                    )}

                    <Pagination.NextTrigger asChild>
                      <ButtonGroupItem iconLeading={ArrowRight} aria-label="Next page" />
                    </Pagination.NextTrigger>
                  </ButtonGroup>
                )}
              </Pagination.Context>
            </Pagination.Root>

            <Dropdown.Root>
              <Button color="tertiary" className="text-tertiary" iconTrailing={ChevronDown}>
                View 25
              </Button>
              <Dropdown.Popover className="w-min">
                <Dropdown.Menu>
                  <Dropdown.Item label="View 10" />
                  <Dropdown.Item label="View 25" />
                  <Dropdown.Item label="View 50" />
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown.Root>
          </div>
        </div>
      </div>
      </div>
    </ContentPageLayout>
  )
}
