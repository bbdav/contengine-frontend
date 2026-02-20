import { useMemo, useState } from "react";
import {
  CodeSquare02,
  Grid01,
  HelpCircle,
  HomeLine,
  Image03,
  PenTool02,
  PieChart03,
  Plus,
  PuzzlePiece01,
  Settings01,
  Users01,
} from "@untitledui/icons";

import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Dot } from "@/components/foundations/dot-icon";
import { cx } from "@/lib/utils/cx";
import { NavAccountCard } from "@/components/application/app-navigation/base-components/nav-account-card";
import { NavItemButton } from "@/components/application/app-navigation/base-components/nav-item-button";
import { NavItemBase } from "@/components/application/app-navigation/base-components/nav-item";

const RAIL_WIDTH = 68;
const PANEL_WIDTH = 296;

function SectionHeader({
  label,
  isOpen,
  onToggle,
}: {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="mt-5 flex w-full cursor-pointer items-center justify-between gap-3 px-4 text-xs font-semibold text-tertiary"
    >
      <span>{label}</span>
      <span className="text-tertiary">{isOpen ? "▴" : "▾"}</span>
    </button>
  );
}

export default function Sidebar() {
  const activeUrl = window.location.pathname;

  // Left rail (universal)
  const topRailItems = useMemo(
    () =>
      [
        { label: "Home", href: "/", icon: HomeLine },
        { label: "Content Types", href: "/content-types", icon: Grid01 },
        { label: "Content", href: "/content", icon: PenTool02 },
        { label: "Media Library", href: "/media", icon: Image03 },
        { label: "User Management", href: "/users", icon: Users01 },
        { label: "API Access and Management", href: "/api", icon: CodeSquare02 },
        { label: "Analytics", href: "/analytics", icon: PieChart03 },
        { label: "Integrations", href: "/integrations", icon: PuzzlePiece01 },
      ],
    []
  );

  const bottomRailItems = useMemo(
    () =>
      [
        { label: "Help", href: "/help", icon: HelpCircle },
        { label: "Settings", href: "/settings", icon: Settings01 },
      ],
    []
  );

  // Right panel (content sub-nav)
  const [collectionsOpen, setCollectionsOpen] = useState(true);
  const [singletonsOpen, setSingletonsOpen] = useState(true);
  const [blocksOpen, setBlocksOpen] = useState(true);

  const pill = (n: number) => (
    <Badge type="pill-color" size="sm" color="gray" className="ml-3">
      {n}
    </Badge>
  );

  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const totalWidth = RAIL_WIDTH + (isPanelOpen ? PANEL_WIDTH : 0);

  return (
    <div className="hidden shrink-0 lg:flex" style={{ width: totalWidth }}>
      {/* Left rail: no bg, only right-edge ring */}
      <aside
        className={cx(
          "relative flex h-full flex-col pt-5",
          "after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:w-px after:bg-border-secondary",
        )}
        style={{ width: RAIL_WIDTH }}
      >
        <div className="flex flex-col gap-0.5 px-3">
          {topRailItems.map((item) => (
            <NavItemButton
              key={item.href}
              size="md"
              href={item.href}
              label={item.label}
              icon={item.icon}
              current={activeUrl === item.href || (item.href !== "/" && activeUrl.startsWith(item.href))}
              onClick={() => {
                // Clicking Content should always reveal the sub nav.
                if (item.href === "/content") setIsPanelOpen(true);
              }}
            />
          ))}
        </div>

        <div className="mt-auto px-3 pb-5">
          <div className="flex flex-col gap-0.5">
            {bottomRailItems.map((item) => (
              <NavItemButton
                key={item.href}
                size="md"
                href={item.href}
                label={item.label}
                icon={item.icon}
                current={activeUrl === item.href}
              />
            ))}
          </div>
        </div>
      </aside>

      {/* Sub nav panel: no bg, only right-edge ring */}
      {isPanelOpen ? (
        <aside
          className={cx(
            "relative flex h-full flex-col",
            "after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:w-px after:bg-border-secondary",
          )}
          style={{ width: PANEL_WIDTH }}
        >
          {/* Fixed header (pixel-perfect target: title + collapse button + search) */}
          <div className="px-4 pt-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-primary">Content</h2>
              <button
                type="button"
                aria-label="Collapse sidebar"
                onClick={() => setIsPanelOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-md text-tertiary hover:bg-primary_hover"
              >
                <Grid01 className="size-5" />
              </button>
            </div>
            <div className="mt-4">
              <Input shortcut size="sm" aria-label="Search" placeholder="Search" />
            </div>
          </div>

        {/* Scrollable nav */}
        <div className="min-h-0 flex-1 overflow-y-auto pb-4">
          <SectionHeader label="Collections" isOpen={collectionsOpen} onToggle={() => setCollectionsOpen((v) => !v)} />
          {collectionsOpen ? (
            <ul className="mt-2 px-3">
              <li className="py-0.5">
                <NavItemBase
                  type="link"
                  href="/content/collections/articles"
                  current={activeUrl === "/content/collections/articles" || activeUrl.startsWith("/articles")}
                  icon={() => <Dot className="mr-2 text-success-500" size="sm" />}
                  badge={pill(7)}
                >
                  Articles
                </NavItemBase>
              </li>
              <li className="py-0.5">
                <NavItemBase type="link" href="/content/collections/authors" current={activeUrl === "/content/collections/authors"} badge={pill(9)}>
                  Authors
                </NavItemBase>
              </li>
              <li className="py-0.5">
                <NavItemBase type="link" href="/content/collections/categories" current={activeUrl === "/content/collections/categories"} badge={pill(23)}>
                  Categories
                </NavItemBase>
              </li>
              <li className="py-0.5">
                <NavItemBase type="link" href="/content/collections/products" current={activeUrl === "/content/collections/products"} badge={pill(21)}>
                  Products
                </NavItemBase>
              </li>
            </ul>
          ) : null}

          <SectionHeader label="Singletons" isOpen={singletonsOpen} onToggle={() => setSingletonsOpen((v) => !v)} />
          {singletonsOpen ? (
            <ul className="mt-2 px-3">
              <li className="py-0.5">
                <NavItemBase type="link" href="/content/singletons/homepage" current={activeUrl === "/content/singletons/homepage"}>
                  Homepage
                </NavItemBase>
              </li>
              <li className="py-0.5">
                <NavItemBase type="link" href="/content/singletons/about" current={activeUrl === "/content/singletons/about"}>
                  About Page
                </NavItemBase>
              </li>
              <li className="py-0.5">
                <NavItemBase type="link" href="/content/singletons/privacy" current={activeUrl === "/content/singletons/privacy"}>
                  Privacy Policy
                </NavItemBase>
              </li>
              <li className="py-0.5">
                <NavItemBase type="link" href="/content/singletons/terms" current={activeUrl === "/content/singletons/terms"}>
                  Terms & Conditions
                </NavItemBase>
              </li>
            </ul>
          ) : null}

          <SectionHeader label="Blocks" isOpen={blocksOpen} onToggle={() => setBlocksOpen((v) => !v)} />
          {blocksOpen ? (
            <ul className="mt-2 px-3">
              <li className="py-0.5">
                <NavItemBase type="link" href="/content/blocks/hero" current={activeUrl === "/content/blocks/hero"}>
                  Hero Section
                </NavItemBase>
              </li>
              <li className="py-0.5">
                <NavItemBase type="link" href="/content/blocks/testimonial" current={activeUrl === "/content/blocks/testimonial"}>
                  Testimonial Block
                </NavItemBase>
              </li>
              <li className="py-0.5">
                <NavItemBase type="link" href="/content/blocks/gallery" current={activeUrl === "/content/blocks/gallery"}>
                  Gallery Block
                </NavItemBase>
              </li>
              <li className="py-0.5">
                <NavItemBase type="link" href="/content/blocks/faq" current={activeUrl === "/content/blocks/faq"}>
                  FAQ Block
                </NavItemBase>
              </li>
            </ul>
          ) : null}
        </div>

        {/* Fixed footer */}
        <div className="px-4 pb-5">
          <Button color="secondary" size="sm" iconLeading={Plus} className="w-full justify-center">
            Add New
          </Button>

          <div className="mt-4">
            <NavAccountCard />
          </div>
        </div>
      </aside>
      ) : null}
    </div>
  );
}
