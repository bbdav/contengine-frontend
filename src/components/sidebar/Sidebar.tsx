import { useMemo, useState } from "react";
import {
  CodeSquare02,
  Grid01,
  HelpCircle,
  HomeLine,
  Image03,
  LayoutLeft,
  PenTool02,
  PieChart03,
  Plus,
  PuzzlePiece01,
  Settings01,
  Users01,
} from "@untitledui/icons";

const CompanyLogo = (props: { className?: string }) => (
  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className}>
    <g filter="url(#filter0_dd_925_5058)">
      <g clipPath="url(#clip0_925_5058)">
        <path
          d="M3 16C3 12.2774 3 10.4162 3.48943 8.90983C4.47861 5.86545 6.86545 3.47861 9.90983 2.48943C11.4162 2 13.2774 2 17 2C20.7226 2 22.5838 2 24.0902 2.48943C27.1346 3.47861 29.5214 5.86545 30.5106 8.90983C31 10.4162 31 12.2774 31 16C31 19.7226 31 21.5838 30.5106 23.0902C29.5214 26.1346 27.1346 28.5214 24.0902 29.5106C22.5838 30 20.7226 30 17 30C13.2774 30 11.4162 30 9.90983 29.5106C6.86545 28.5214 4.47861 26.1346 3.48943 23.0902C3 21.5838 3 19.7226 3 16Z"
          fill="#0A0D12"
        />
        <rect width="28" height="28" transform="translate(3 2)" fill="url(#paint0_linear_925_5058)" />
        <path
          d="M7.375 16.4375L9.7233 15.6548C9.90291 15.5949 10.0971 15.5949 10.2767 15.6548L12.625 16.4375"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M16.125 16H28.375" stroke="#67E3F9" strokeWidth="2" />
        <path
          d="M10.3086 23.3104L11.4156 21.0964C11.5003 20.927 11.6376 20.7897 11.8069 20.7051L14.0209 19.5981"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M19.5894 12.7922L21.8034 11.6852C21.9727 11.6005 22.11 11.4632 22.1947 11.2938L23.3017 9.07984"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M17.4375 25.6263L16.6548 23.278C16.5949 23.0984 16.5949 22.9042 16.6548 22.7246L17.4375 20.3763"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M16.5625 11.6263L17.3453 9.27799C17.4051 9.09838 17.4051 8.9042 17.3453 8.72459L16.5625 6.37629"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M24.3102 22.6914L22.0962 21.5844C21.9269 21.4998 21.7896 21.3625 21.7049 21.1931L20.5979 18.9791"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M13.7919 13.4107L12.6849 11.1967C12.6002 11.0273 12.4629 10.89 12.2936 10.8054L10.0796 9.69835"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
      <path
        d="M17 3C20.8004 3 22.4635 3.01228 23.7812 3.44043C26.5211 4.3307 28.6693 6.47887 29.5596 9.21875C29.9877 10.5365 30 12.1996 30 16C30 19.8004 29.9877 21.4635 29.5596 22.7812C28.6693 25.5211 26.5211 27.6693 23.7812 28.5596C22.4635 28.9877 20.8004 29 17 29C13.1996 29 11.5365 28.9877 10.2188 28.5596C7.47887 27.6693 5.3307 25.5211 4.44043 22.7812C4.01228 21.4635 4 19.8004 4 16C4 12.1996 4.01228 10.5365 4.44043 9.21875C5.3307 6.47886 7.47886 4.3307 10.2188 3.44043C11.5365 3.01228 13.1996 3 17 3Z"
        stroke="url(#paint1_linear_925_5058)"
        strokeWidth="2"
      />
    </g>
    <defs>
      <filter
        id="filter0_dd_925_5058"
        x="0"
        y="0"
        width="34"
        height="34"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feMorphology radius="1" operator="erode" in="SourceAlpha" result="effect1_dropShadow_925_5058" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0392157 0 0 0 0 0.0496732 0 0 0 0 0.0705882 0 0 0 0.1 0"
        />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_925_5058" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0392157 0 0 0 0 0.0496732 0 0 0 0 0.0705882 0 0 0 0.1 0"
        />
        <feBlend mode="normal" in2="effect1_dropShadow_925_5058" result="effect2_dropShadow_925_5058" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_925_5058" result="shape" />
      </filter>
      <linearGradient id="paint0_linear_925_5058" x1="14" y1="3.47694e-7" x2="15.1667" y2="28" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" stopOpacity="0" />
        <stop offset="1" stopColor="white" stopOpacity="0.12" />
      </linearGradient>
      <linearGradient id="paint1_linear_925_5058" x1="17" y1="2" x2="17" y2="30" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" stopOpacity="0.12" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
      <clipPath id="clip0_925_5058">
        <path
          d="M3 16C3 12.2774 3 10.4162 3.48943 8.90983C4.47861 5.86545 6.86545 3.47861 9.90983 2.48943C11.4162 2 13.2774 2 17 2C20.7226 2 22.5838 2 24.0902 2.48943C27.1346 3.47861 29.5214 5.86545 30.5106 8.90983C31 10.4162 31 12.2774 31 16C31 19.7226 31 21.5838 30.5106 23.0902C29.5214 26.1346 27.1346 28.5214 24.0902 29.5106C22.5838 30 20.7226 30 17 30C13.2774 30 11.4162 30 9.90983 29.5106C6.86545 28.5214 4.47861 26.1346 3.48943 23.0902C3 21.5838 3 19.7226 3 16Z"
          fill="white"
        />
      </clipPath>
    </defs>
  </svg>
);

import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Input } from "@/components/base/input/input";
import { Dot } from "@/components/foundations/dot-icon";
import { cx } from "@/lib/utils/cx";
import { NavAccountCard } from "@/components/application/app-navigation/base-components/nav-account-card";
import { NavItemButton } from "@/components/application/app-navigation/base-components/nav-item-button";
import { NavItemBase } from "@/components/application/app-navigation/base-components/nav-item";

const RAIL_WIDTH = 52;
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
  const [isRailHovering, setIsRailHovering] = useState(false);
  const totalWidth = RAIL_WIDTH + (isPanelOpen ? PANEL_WIDTH : 0);

  return (
    <div className="hidden shrink-0 lg:flex" style={{ width: totalWidth }}>
      {/* Left rail: no bg, only right-edge ring */}
      <aside
        className={cx(
          "relative flex h-full flex-col",
          "after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:w-px after:bg-border-secondary",
        )}
        style={{ width: RAIL_WIDTH }}
        onPointerEnter={() => setIsRailHovering(true)}
        onPointerLeave={() => setIsRailHovering(false)}
      >
        <div className="relative flex w-full items-center justify-center overflow-hidden py-4">
          {/* When the sub-nav is collapsed, swap logo → expand button on rail hover with a quick push-slide. */}
          <div
            className={cx(
              "transition-all duration-150 ease-out",
              !isPanelOpen && isRailHovering ? "-translate-x-4 opacity-0" : "translate-x-0 opacity-100",
            )}
          >
            <CompanyLogo className="size-7" />
          </div>

          {!isPanelOpen ? (
            <div
              className={cx(
                "absolute inset-0 flex items-center justify-center transition-all duration-150 ease-out",
                isRailHovering ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0",
              )}
            >
              <ButtonUtility tooltip="Expand" icon={LayoutLeft} color="tertiary" size="xs" onClick={() => setIsPanelOpen(true)} />
            </div>
          ) : null}
        </div>

        <div className="mt-4 flex flex-col items-center gap-0.5">
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

        <div className="mt-auto pb-5">
          <div className="flex flex-col items-center gap-0.5">
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
          {/* Fixed header (title + collapse) */}
          <div className="p-4 border-b border-secondary">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-primary">Content</h2>
              <ButtonUtility tooltip="Collapse" icon={LayoutLeft} color="tertiary" size="xs" onClick={() => setIsPanelOpen(false)} />
            </div>
          </div>

          {/* Fixed search */}
          <div className="px-4 pt-4">
            <Input shortcut size="sm" aria-label="Search" placeholder="Search" />
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
