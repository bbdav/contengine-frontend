import { useMemo, useState } from "react"
import {
  Calendar,
  CheckCircle,
  ChevronRight,
  Code01,
  Copy01,
  DotsHorizontal,
  Edit05,
  File02,
  Image01,
  LinkExternal01,
  List,
  Plus,
  SearchLg,
  Settings01,
  TextInput,
  Users01,
  XClose,
} from "@untitledui/icons"

import { Breadcrumbs } from "@/components/application/breadcrumbs/breadcrumbs"
import { Badge } from "@/components/base/badges/badges"
import { Button } from "@/components/base/buttons/button"
import { ButtonUtility } from "@/components/base/buttons/button-utility"
import { Input } from "@/components/base/input/input"
import { ContentPageLayout } from "@/components/layouts/ContentPageLayout"

type FieldType =
  | "Single line text"
  | "Slug"
  | "Date"
  | "Tags"
  | "Image"
  | "Formatted text"
  | "Reference"
  | "Relation"
  | "Multi line text"

type FieldRow = {
  id: string
  name: string
  type: FieldType
  required?: boolean
  description: string
}

function iconForType(type: FieldType) {
  switch (type) {
    case "Single line text":
      return TextInput
    case "Slug":
      return LinkExternal01
    case "Date":
      return Calendar
    case "Tags":
      return List
    case "Image":
      return Image01
    case "Formatted text":
      return Edit05
    case "Reference":
      return Users01
    case "Relation":
      return Copy01
    case "Multi line text":
      return File02
    default:
      return File02
  }
}

function FieldCard({ row, muted }: { row: FieldRow; muted?: boolean }) {
  const Icon = iconForType(row.type)

  return (
    <div
      className={
        "flex items-start gap-4 rounded-xl border border-secondary p-3 " +
        (muted ? "bg-secondary_subtle" : "bg-primary")
      }
    >
      <div className="mt-0.5 flex size-10 items-center justify-center rounded-lg bg-secondary_subtle ring-1 ring-secondary">
        <Icon className="size-5 text-tertiary" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <div className="min-w-0 text-sm font-semibold text-primary">{row.name}</div>

          <Badge type="pill-color" size="sm" color="gray">
            {row.type}
          </Badge>

          {row.required ? (
            <Badge type="modern" size="sm" color="gray">
              Required
            </Badge>
          ) : null}
        </div>

        <div className="mt-1 text-sm text-tertiary">{row.description}</div>
      </div>

      <ButtonUtility icon={DotsHorizontal} tooltip="More" size="md" />
    </div>
  )
}

function TabsRow() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Button color="secondary" size="md" className="rounded-lg">
          Manage entries
        </Button>

        <Button color="primary" size="md" className="rounded-lg">
          <span className="inline-flex items-center gap-2">
            Fields
            <Badge type="modern" size="sm" color="gray">
              2
            </Badge>
          </span>
        </Button>

        <Button color="secondary" size="md" className="rounded-lg">
          <span className="inline-flex items-center gap-2">
            Settings
            <Badge type="modern" size="sm" color="gray">
              2
            </Badge>
          </span>
        </Button>

        <Button color="secondary" size="md" className="rounded-lg" iconTrailing={ChevronRight}>
          More...
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {[
          { label: "Team", icon: Users01 },
          { label: "Plan", icon: CheckCircle },
          { label: "Billing", icon: Code01 },
          { label: "Email", icon: File02 },
          { label: "Notifications", icon: Settings01 },
        ].map((it) => (
          <Button key={it.label} color="secondary" size="md" className="rounded-lg" iconLeading={it.icon}>
            {it.label}
          </Button>
        ))}
      </div>
    </div>
  )
}

type AddFieldGroup = {
  title: string
  items: { label: string; desc: string }[]
}

function AddFieldsPanel({ onClose }: { onClose: () => void }) {
  const groups: AddFieldGroup[] = [
    {
      title: "Basic Fields",
      items: [
        { label: "Single line text", desc: "Titles, headings" },
        { label: "Multi line text", desc: "Descriptions" },
        { label: "Rich text", desc: "Formatted text editor" },
        { label: "Add", desc: "" },
        { label: "Number", desc: "Decimals or whole numbers" },
        { label: "Float", desc: "Decimals (e.g., price, ratings)" },
        { label: "Boolean", desc: "True or false" },
        { label: "Date", desc: "Calendar date picker" },
        { label: "Date & Time", desc: "Date picker with time selection" },
      ],
    },
    {
      title: "Media",
      items: [
        { label: "Image", desc: "Upload or select an image" },
        { label: "Video", desc: "Upload or embed a video link" },
        { label: "File Upload", desc: "PDFs, docs, etc." },
        { label: "Gallery", desc: "Multiple images or media files" },
      ],
    },
    {
      title: "Link/Reference",
      items: [
        { label: "URL", desc: "Web link (e.g., external URLs)" },
        { label: "Email", desc: "Email address input" },
        { label: "Reference", desc: "Link to another entry or model" },
        { label: "Relation", desc: "Set relations (e.g., one-to-many)" },
      ],
    },
    {
      title: "Structured Fields",
      items: [
        { label: "List", desc: "Array of values (e.g., tags, keywords)" },
        { label: "Select list", desc: "Pick one or many" },
        { label: "Component Block", desc: "Use existing or create new block" },
        { label: "Reusable Block", desc: "Reuse existing content" },
        { label: "Local Block", desc: "Create a unique block for this entry" },
      ],
    },
    {
      title: "Specialized Fields",
      items: [
        { label: "Slug", desc: "URL-friendly identifier" },
        { label: "Color Picker", desc: "HEX or RGBA color selection" },
        { label: "Location", desc: "Geolocation (latitude and longitude)" },
      ],
    },
    {
      title: "Advanced Fields",
      items: [
        { label: "JSON", desc: "Custom JSON data input" },
        { label: "Code Field", desc: "Code snippets (HTML, CSS, JS)" },
        { label: "Formula Field", desc: "Dynamic computed values" },
      ],
    },
  ]

  return (
    <aside className="flex h-full w-[360px] flex-col border-l border-secondary bg-primary">
      {/* Header */}
      <div className="flex h-[60px] items-center justify-between border-b border-secondary px-6">
        <div className="text-sm font-semibold text-primary">Add fields</div>
        <ButtonUtility icon={XClose} tooltip="Close" size="md" onClick={onClose} />
      </div>

      {/* Body (scrolls) */}
      <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4">
        <div className="max-w-none space-y-4">
          <div className="text-sm text-tertiary">Redesign of untitledui.com</div>

          <Input size="md" placeholder="Search" icon={SearchLg} shortcut className="rounded-lg" />

          <div className="space-y-5">
            {groups.map((g) => (
              <div key={g.title}>
                <div className="text-xs font-semibold text-tertiary">{g.title}</div>
                <div className="mt-2 space-y-2">
                  {g.items.map((it) => (
                    <button
                      key={it.label}
                      className="flex w-full items-start justify-between gap-3 rounded-lg px-3 py-2 text-left hover:bg-primary_hover"
                    >
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-primary">{it.label}</div>
                        {it.desc ? <div className="mt-0.5 text-sm text-tertiary">{it.desc}</div> : null}
                      </div>
                      <ChevronRight className="mt-1 size-4 text-tertiary" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}

export default function ContentTypes() {
  const [isAddPanelOpen, setIsAddPanelOpen] = useState(false)

  const rows = useMemo<FieldRow[]>(
    () => [
      {
        id: "title",
        name: "Title",
        type: "Single line text",
        required: true,
        description: "Headings and titles",
      },
      {
        id: "slug",
        name: "Slug",
        type: "Slug",
        required: true,
        description: "URL-friendly identifier",
      },
      {
        id: "date",
        name: "Date",
        type: "Date",
        required: true,
        description: "Calendar date picker",
      },
      {
        id: "tags",
        name: "Tags",
        type: "Tags",
        description: "Headings and titles",
      },
      {
        id: "featuredImage",
        name: "Featured Image",
        type: "Image",
        required: true,
        description: "Upload or select an image",
      },
      {
        id: "content",
        name: "Content",
        type: "Formatted text",
        description: "Formatted text editor",
      },
      {
        id: "authors",
        name: "Authors",
        type: "Reference",
        required: true,
        description: "Link to another entry or model",
      },
      {
        id: "relatedPosts",
        name: "Related Posts",
        type: "Relation",
        required: true,
        description: "Set relations (e.g., one-to-many)",
      },
      {
        id: "desc",
        name: "",
        type: "Multi line text",
        description: "Descriptions",
      },
    ],
    []
  )

  return (
    <ContentPageLayout
      breadcrumbs={
        <Breadcrumbs type="button" maxVisibleItems={4}>
          <Breadcrumbs.Item href="/content">Content</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/content/collections">Collections</Breadcrumbs.Item>
          <Breadcrumbs.Item href="#">Another link</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/content/collections/articles">Article</Breadcrumbs.Item>
        </Breadcrumbs>
      }
      title="Article"
      subtitle="article"
      topRightActions={
        <div className="flex items-center gap-2">
          <Button color="tertiary" size="md" className="rounded-lg">
            Upgrade now
          </Button>
          <Button color="secondary" size="md" className="rounded-lg">
            Secondary
          </Button>
          <Button color="primary" size="md" className="rounded-lg">
            Create new entry
          </Button>
        </div>
      }
    >
      {/* Two-column layout: fields + slide-out panel */}
      <div className="mt-4 flex min-h-0 gap-6">
        <div className="min-w-0 flex-1">
          <TabsRow />

          {/* Fields list (scrolls inside) */}
          <div className="mt-6 max-h-[calc(100vh-260px)] min-h-0 overflow-y-auto pr-1">
            <div className="space-y-3">
              {rows.map((r) => (
                <FieldCard key={r.id} row={r} muted={r.id === "content"} />
              ))}

              <button
                type="button"
                onClick={() => setIsAddPanelOpen(true)}
                className="flex h-16 w-full items-center justify-center rounded-xl border border-secondary bg-secondary_subtle text-tertiary hover:bg-primary_hover"
              >
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  <Plus className="size-5 text-tertiary" />
                  Add fields
                </span>
              </button>
            </div>
          </div>
        </div>

        {isAddPanelOpen ? <AddFieldsPanel onClose={() => setIsAddPanelOpen(false)} /> : null}
      </div>
    </ContentPageLayout>
  )
}
