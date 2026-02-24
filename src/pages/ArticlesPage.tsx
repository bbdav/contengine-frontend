import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { endOfMonth, getLocalTimeZone, startOfMonth, today } from "@internationalized/date"
import { useHotkeys } from "react-hotkeys-hook"
import type { SortDescriptor } from "react-aria-components"
import { ArrowLeft, ArrowRight, Check, ChevronDown, Columns03, FilterLines, SearchLg } from "@untitledui/icons"
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
import { useBreakpoint } from "@/hooks/use-breakpoint"

type Status = "Draft" | "In Review" | "Ready to Publish" | "Published" | "Revision required"

type Row = {
  id: string
  title: string
  desc: string
  authorName: string
  authorAvatarUrl?: string | null
  authorInitials?: string
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

const makeCheckedIcon = (checked: boolean) =>
  function CheckedIcon({ className }: { className?: string }) {
    return <Check className={(className ?? "") + (checked ? "" : " opacity-0")} />
  }

function TruncatedText({ text, className }: { text: string; className: string }) {
  // We always provide a tooltip with the full text.
  // This is more reliable than trying to detect CSS line-clamp truncation at runtime.
  return (
    <Tooltip title={text} placement="top" trigger="hover">
      <TooltipTrigger className="block w-full text-left">
        <div className={className}>{text}</div>
      </TooltipTrigger>
    </Tooltip>
  )
}

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
  const isSmUp = useBreakpoint("sm")
  const thisMonthRange = useMemo(() => {
    const now = today(getLocalTimeZone())
    return { start: startOfMonth(now), end: endOfMonth(now) }
  }, [])

  const [query, setQuery] = useState("")
  const searchRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const tableScrollRef = useRef<HTMLDivElement>(null)
  const paginationRef = useRef<HTMLDivElement>(null)
  const [tableMaxHeight, setTableMaxHeight] = useState<number | undefined>(undefined)

  useHotkeys(
    "meta+k, ctrl+k",
    (e) => {
      e.preventDefault()
      searchRef.current?.focus()
    },
    { enableOnFormTags: true }
  )

  useLayoutEffect(() => {
    const update = () => {
      const tableEl = tableScrollRef.current
      const paginationEl = paginationRef.current
      if (!tableEl || !paginationEl) return

      const tableTop = tableEl.getBoundingClientRect().top
      const paginationTop = paginationEl.getBoundingClientRect().top
      const gap = 16
      const max = Math.floor(paginationTop - tableTop - gap)
      setTableMaxHeight(max > 0 ? max : undefined)
    }

    update()

    const ro = new ResizeObserver(() => update())
    if (bodyRef.current) ro.observe(bodyRef.current)
    if (paginationRef.current) ro.observe(paginationRef.current)
    if (tableScrollRef.current) ro.observe(tableScrollRef.current)

    window.addEventListener("resize", update)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", update)
    }
  }, [])
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set(["3"]))
  const [page, setPage] = useState(1)
  const [language, setLanguage] = useState<Language>(LANGUAGES[0])
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({ column: "updated", direction: "descending" })

  const [visibleColumns, setVisibleColumns] = useState({
    author: true,
    slug: true,
    updated: true,
    status: true,
  })

  const rows = useMemo<Row[]>(
    () => [
      {
        id: "1",
        title: "A bug is becoming a meme on the internet",
        desc: "Maybe the answer is in this article, or not",
        authorName: "Olivia Rhye",
        authorInitials: "OR",
        authorAvatarUrl: null,
        slug: "squirrel-steals-pizza",
        updated: "Jan 4, 2025",
        status: "Draft",
      },
      {
        id: "2",
        title: "This shrimp is awesome",
        desc: "Mantis shrimps, or stomatopods, are mesmerizing",
        authorName: "Phoenix Baker",
        authorInitials: "PB",
        authorAvatarUrl: null,
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

  const effectiveSortDescriptor = useMemo<SortDescriptor>(() => {
    const visible: Record<string, boolean> = {
      title: true,
      author: visibleColumns.author,
      slug: visibleColumns.slug,
      updated: visibleColumns.updated,
      status: visibleColumns.status,
    }

    if (visible[String(sortDescriptor.column)]) return sortDescriptor

    const fallback = visibleColumns.updated
      ? "updated"
      : visibleColumns.status
      ? "status"
      : visibleColumns.slug
      ? "slug"
      : visibleColumns.author
      ? "author"
      : "title"

    return { column: fallback, direction: "descending" }
  }, [sortDescriptor, visibleColumns])

  useEffect(() => {
    // Keep state in sync so the sort indicators remain correct.
    if (
      effectiveSortDescriptor.column !== sortDescriptor.column ||
      effectiveSortDescriptor.direction !== sortDescriptor.direction
    ) {
      setSortDescriptor(effectiveSortDescriptor)
    }
  }, [effectiveSortDescriptor, sortDescriptor.column, sortDescriptor.direction])

  const sorted = useMemo(() => {
    const { column, direction } = effectiveSortDescriptor
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
  }, [filtered, effectiveSortDescriptor])

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
              <Button color="primary" size="sm" className="rounded-lg sm:hidden">
                Create new entry
              </Button>
              <Button color="primary" size="md" className="hidden rounded-lg sm:inline-flex">
                Create new entry
              </Button>
            </div>
          </div>
        </div>
      }
    >
      {/* Body (right side): controls stay visible; table scrolls; pagination stays at the bottom */}
      <div ref={bodyRef} className="flex h-full flex-col">
        {/* Controls */}
        <div className="shrink-0 px-6 pt-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="w-full sm:max-w-md">
              <div className="relative">
                <Input
                  ref={searchRef}
                  shortcut={isSmUp}
                  size="sm"
                  placeholder="Search"
                  icon={SearchLg}
                  value={query}
                  onChange={setQuery}
                  className="rounded-lg"
                  inputClassName={!isSmUp ? "pr-12" : undefined}
                />

                {!isSmUp ? (
                  <Dropdown.Root>
                    <ButtonUtility
                      icon={FilterLines}
                      tooltip="Filters"
                      size="sm"
                      color="tertiary"
                      className="absolute right-1 top-1/2 -translate-y-1/2"
                    />

                    <Dropdown.Popover className="w-[320px]">
                      <div className="p-3">
                        <div className="text-sm font-semibold text-secondary">Filters</div>

                        <div className="mt-3">
                          <DateRangePicker defaultValue={thisMonthRange} triggerSize="sm" triggerClassName="w-full" />
                        </div>

                        <div className="my-3 h-px w-full bg-border-secondary" />

                        <div className="text-sm font-semibold text-secondary">Language</div>
                        <div className="mt-2 flex flex-col gap-1">
                          {LANGUAGES.map((lang) => (
                            <button
                              key={lang.code}
                              type="button"
                              className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm font-semibold text-secondary hover:bg-primary_hover"
                              onClick={() => setLanguage(lang)}
                            >
                              <img
                                src={`https://www.untitledui.com/images/flags/${lang.flag}.svg`}
                                alt={`${lang.flag} flag`}
                                className="size-4 rounded-full"
                              />
                              {lang.label}
                            </button>
                          ))}
                        </div>

                        <div className="my-3 h-px w-full bg-border-secondary" />

                        <div className="text-sm font-semibold text-secondary">Columns</div>
                        <div className="mt-2">
                          <Dropdown.Menu selectionMode="multiple" disallowEmptySelection={false}>
                            <Dropdown.Section>
                              <Dropdown.Item
                                icon={makeCheckedIcon(visibleColumns.author)}
                                label="Author"
                                onAction={() => setVisibleColumns((s) => ({ ...s, author: !s.author }))}
                              />
                              <Dropdown.Item
                                icon={makeCheckedIcon(visibleColumns.slug)}
                                label="Slug"
                                onAction={() => setVisibleColumns((s) => ({ ...s, slug: !s.slug }))}
                              />
                              <Dropdown.Item
                                icon={makeCheckedIcon(visibleColumns.updated)}
                                label="Last update"
                                onAction={() => setVisibleColumns((s) => ({ ...s, updated: !s.updated }))}
                              />
                              <Dropdown.Item
                                icon={makeCheckedIcon(visibleColumns.status)}
                                label="Status"
                                onAction={() => setVisibleColumns((s) => ({ ...s, status: !s.status }))}
                              />
                            </Dropdown.Section>

                            <Dropdown.Separator />

                            <Dropdown.Section>
                              <Dropdown.Item
                                label="Reset columns"
                                onAction={() =>
                                  setVisibleColumns({
                                    author: true,
                                    slug: true,
                                    updated: true,
                                    status: true,
                                  })
                                }
                              />
                            </Dropdown.Section>
                          </Dropdown.Menu>
                        </div>
                      </div>
                    </Dropdown.Popover>
                  </Dropdown.Root>
                ) : null}
              </div>
            </div>

            {isSmUp ? (
              <div className="flex items-center gap-2">
                <DateRangePicker defaultValue={thisMonthRange} triggerSize="md" />

                <Button color="secondary" size="md" iconLeading={FilterLines}>
                  <span className="inline-flex items-center gap-2">
                    Filters
                    <Badge type="modern" size="sm" color="gray" className="py-0">
                      3
                    </Badge>
                  </span>
                </Button>

                <Dropdown.Root>
                  <ButtonUtility icon={Columns03} tooltip="Columns" size="md" />
                  <Dropdown.Popover>
                    <div className="border-b border-secondary p-3">
                      <div className="text-sm font-semibold text-secondary">Columns</div>
                    </div>

                    <Dropdown.Menu selectionMode="multiple" disallowEmptySelection={false}>
                      <Dropdown.Section>
                        <Dropdown.Item
                          icon={makeCheckedIcon(visibleColumns.author)}
                          label="Author"
                          onAction={() => setVisibleColumns((s) => ({ ...s, author: !s.author }))}
                        />
                        <Dropdown.Item
                          icon={makeCheckedIcon(visibleColumns.slug)}
                          label="Slug"
                          onAction={() => setVisibleColumns((s) => ({ ...s, slug: !s.slug }))}
                        />
                        <Dropdown.Item
                          icon={makeCheckedIcon(visibleColumns.updated)}
                          label="Last update"
                          onAction={() => setVisibleColumns((s) => ({ ...s, updated: !s.updated }))}
                        />
                        <Dropdown.Item
                          icon={makeCheckedIcon(visibleColumns.status)}
                          label="Status"
                          onAction={() => setVisibleColumns((s) => ({ ...s, status: !s.status }))}
                        />
                      </Dropdown.Section>

                      <Dropdown.Separator />

                      <Dropdown.Section>
                        <Dropdown.Item
                          label="Reset columns"
                          onAction={() =>
                            setVisibleColumns({
                              author: true,
                              slug: true,
                              updated: true,
                              status: true,
                            })
                          }
                        />
                      </Dropdown.Section>
                    </Dropdown.Menu>
                  </Dropdown.Popover>
                </Dropdown.Root>

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
            ) : null}
          </div>
        </div>

        {/* Table (scrolls only if it would collide with pagination) */}
        <div className="mt-4 px-6">
          <div className="overflow-hidden rounded-lg bg-primary shadow-xs ring-1 ring-secondary">
            <div ref={tableScrollRef} style={{ maxHeight: tableMaxHeight }} className="overflow-auto">
              <Table
                key={`${visibleColumns.author}-${visibleColumns.slug}-${visibleColumns.updated}-${visibleColumns.status}`}
                aria-label="Articles"
                selectionMode="multiple"
                sortDescriptor={effectiveSortDescriptor}
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
                  {visibleColumns.author ? <Table.Head id="author" label="Author" className="w-[120px]" allowsSorting /> : null}
                  {visibleColumns.slug ? <Table.Head id="slug" label="Slug" className="w-[260px]" allowsSorting /> : null}
                  {visibleColumns.updated ? <Table.Head id="updated" label="Last update" className="w-[160px]" allowsSorting /> : null}
                  {visibleColumns.status ? <Table.Head id="status" label="Status" className="w-[180px]" allowsSorting /> : null}
                  <Table.Head id="actions" className="w-[56px]" />
                </Table.Header>

                <Table.Body items={sorted}>
                  {(r: Row) => (
                    <Table.Row id={r.id}>
                      <Table.Cell>
                        <div>
                          <Tooltip
                            trigger="hover"
                            placement="top"
                            title={
                              <div className="flex flex-col gap-1">
                                <div className="text-xs font-medium text-white">{r.title}</div>
                                <div className="text-xs font-normal text-tooltip-supporting-text">{r.desc}</div>
                              </div>
                            }
                          >
                            <TooltipTrigger className="block w-full text-left">
                              <div className="font-medium text-primary line-clamp-2">{r.title}</div>
                              <div className="text-sm text-tertiary line-clamp-1">{r.desc}</div>
                            </TooltipTrigger>
                          </Tooltip>
                        </div>
                      </Table.Cell>

                      {visibleColumns.author ? (
                        <Table.Cell>
                          <div className="flex items-center gap-2">
                            <Tooltip title={r.authorName} placement="top">
                              <TooltipTrigger>
                                <Avatar size="sm" src={r.authorAvatarUrl ?? undefined} initials={r.authorInitials} alt={r.authorName} />
                              </TooltipTrigger>
                            </Tooltip>
                          </div>
                        </Table.Cell>
                      ) : null}

                      {visibleColumns.slug ? (
                        <Table.Cell className="text-tertiary">
                          <TruncatedText text={r.slug} className="line-clamp-1" />
                        </Table.Cell>
                      ) : null}
                      {visibleColumns.updated ? <Table.Cell className="text-tertiary">{r.updated}</Table.Cell> : null}

                      {visibleColumns.status ? (
                        <Table.Cell>
                          <StatusPill status={r.status} />
                        </Table.Cell>
                      ) : null}

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
        </div>

      {/* Pagination bar */}
      <div ref={paginationRef} className="shrink-0 mt-auto border-t border-secondary bg-primary">
        <div className="px-6 py-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="-mx-1 w-full overflow-x-auto px-1 pb-1 [-webkit-overflow-scrolling:touch] sm:mx-0 sm:w-auto sm:overflow-visible sm:px-0 sm:pb-0">
              <Pagination.Root page={page} total={10} onPageChange={setPage}>
                <Pagination.Context>
                  {({ pages }) => (
                    <ButtonGroup size="sm" className="w-max sm:w-auto">
                      <Pagination.PrevTrigger asChild>
                        <ButtonGroupItem iconLeading={ArrowLeft} aria-label="Previous page" />
                      </Pagination.PrevTrigger>

                      {pages.map((p, index) =>
                        p.type === "page" ? (
                          <Pagination.Item key={index} {...p} asChild>
                            <ButtonGroupItem isSelected={p.isCurrent} className="size-9 items-center justify-center sm:size-10">
                              {p.value}
                            </ButtonGroupItem>
                          </Pagination.Item>
                        ) : (
                          <Pagination.Ellipsis key={index}>
                            <ButtonGroupItem className="pointer-events-none size-9 items-center justify-center rounded-none! sm:size-10">
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
            </div>

            <div className="hidden sm:block">
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
      </div>
    </ContentPageLayout>
  )
}
