import {
  CodeSquare02,
  Grid01,
  HomeLine,
  Image03,
  PenTool02,
  PieChart03,
  PuzzlePiece01,
  Users01,
} from "@untitledui/icons";

import { SidebarNavigationSlim } from "@/components/application/app-navigation/sidebar-navigation/sidebar-slim";

export default function Sidebar() {
  // Keep your nav items here so the Sidebar stays dumb and swap-friendly.
  // Slim sidebar requires icons for each item.
  const items = [
    {
      label: "Home",
      href: "/",
      icon: HomeLine,
      items: [
        { label: "Overview", href: "/overview" },
        { label: "Updates", href: "/updates", badge: 10 },
      ],
    },
    { label: "Grid", href: "/grid", icon: Grid01, items: [{ label: "All", href: "/grid/all" }] },
    { label: "Design", href: "/design", icon: PenTool02, items: [{ label: "Projects", href: "/design/projects" }] },
    { label: "Media", href: "/media", icon: Image03, items: [{ label: "Library", href: "/media/library" }] },
    { label: "Users", href: "/users", icon: Users01, items: [{ label: "All users", href: "/users/all" }] },
    { label: "Code", href: "/code", icon: CodeSquare02, items: [{ label: "Snippets", href: "/code/snippets" }] },
    { label: "Reports", href: "/reports", icon: PieChart03, items: [{ label: "Overview", href: "/reports/overview" }] },
    { label: "Plugins", href: "/plugins", icon: PuzzlePiece01, items: [{ label: "Marketplace", href: "/plugins/marketplace" }] },
  ] as const;

  return (
    <SidebarNavigationSlim
      // Expanded by default (we modified the component to support this).
      defaultExpanded
      // Active URL can be wired to your router later; for now this is fine.
      activeUrl={window.location.pathname}
      items={items as any}
      hideRightBorder
    />
  );
}
