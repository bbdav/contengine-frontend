import { useMemo } from "react"
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
  Settings01,
  TextInput,
  Users01,
} from "@untitledui/icons"

import { Breadcrumbs } from "@/components/application/breadcrumbs/breadcrumbs"
import { Badge } from "@/components/base/badges/badges"
import { Button } from "@/components/base/buttons/button"
import { ButtonUtility } from "@/components/base/buttons/button-utility"
import { ContentPageLayout } from "@/components/layouts/ContentPageLayout"

type FieldType = "Single line text" | "Slug" | "Date" | "Tags" | "Image" | "Formatted text" | "Reference" | "Relation" | "Multi line text"

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
        "flex items-start gap-4 rounded-xl border p-3 " +
        (muted ? "bg-secondary_subtle border-secondary" : "bg-primary border-secondary")
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

export default function ContentTypes() {
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
        id: "add",
        name: "",
        type: "Single line text",
        description: "",
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
      <div className="mt-4">
        <TabsRow />
      </div>

      <div className="mt-6">
        <div className="space-y-3">
          {rows.map((r) =>
            r.id === "add" ? (
              <button
                key={r.id}
                className="flex h-16 w-full items-center justify-center rounded-xl border border-secondary bg-secondary_subtle text-tertiary hover:bg-primary_hover"
              >
                <Plus className="size-5" />
              </button>
            ) : (
              <FieldCard
                key={r.id}
                row={r}
                muted={r.id === "content"}
              />
            )
          )}
        </div>
      </div>
    </ContentPageLayout>
  )
}
