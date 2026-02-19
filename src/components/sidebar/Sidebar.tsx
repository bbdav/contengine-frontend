// src/components/sidebar/Sidebar.tsx
import { useState } from 'react';
import {
  HomeLine,
  LifeBuoy01,
  Settings01,
  Plus,
  ChevronDown,
  SearchLg,
  LayoutLeft,
} from '@untitledui/icons';

const CompanyLogo = () => (
  <div className="flex items-center justify-center">
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Paste your full SVG code here – same as in your original file */}
      <g filter="url(#filter0_dd_907_5058)">
        <g clipPath="url(#clip0_907_5058)">
          <path
            d="M3 16C3 12.2774 3 10.4162 3.48943 8.90983C4.47861 5.86545 6.86545 3.47861 9.90983 2.48943C11.4162 2 13.2774 2 17 2C20.7226 2 22.5838 2 24.0902 2.48943C27.1346 3.47861 29.5214 5.86545 30.5106 8.90983C31 10.4162 31 12.2774 31 16C31 19.7226 31 21.5838 30.5106 23.0902C29.5214 26.1346 27.1346 28.5214 24.0902 29.5106C22.5838 30 20.7226 30 17 30C13.2774 30 11.4162 30 9.90983 29.5106C6.86545 28.5214 4.47861 26.1346 3.48943 23.0902C3 21.5838 3 19.7226 3 16Z"
            fill="#0A0D12"
          />
          <rect width="28" height="28" transform="translate(3 2)" fill="url(#paint0_linear_907_5058)" />
          {/* ... rest of your paths ... */}
        </g>
        {/* ... defs, filter, gradients, clipPath ... */}
      </g>
    </svg>
  </div>
);

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openCollections, setOpenCollections] = useState(true);
  const [openSingletons, setOpenSingletons] = useState(true);
  const [openBlocks, setOpenBlocks] = useState(true);

  return (
    <aside className="flex h-screen shrink-0 border-r border-secondary bg-primary text-secondary">
      {/* Slim icon-only sidebar */}
      <div className="group relative flex w-16 flex-col border-r border-secondary bg-primary">
        {/* Logo / expand trigger */}
        <div className="relative h-16 flex items-center justify-center">
          <div className={isCollapsed ? 'group-hover:opacity-0 transition-opacity' : 'opacity-100'}>
            <CompanyLogo />
          </div>

          {isCollapsed && (
            <button
              className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
              onClick={() => setIsCollapsed(false)}
              aria-label="Expand sidebar"
            >
              <LayoutLeft className="h-5 w-5 text-tertiary" />
            </button>
          )}
        </div>

        {/* Main icons (only Content for now) */}
        <div className="flex flex-1 flex-col items-center gap-2 py-4">
          <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600" aria-label="Content">
            <HomeLine className="h-5 w-5" />
          </button>
        </div>

        {/* Footer icons */}
        <div className="flex flex-col items-center gap-2 pb-4">
          <button className="flex h-10 w-10 items-center justify-center rounded-lg text-tertiary transition-colors hover:bg-primary_hover hover:text-tertiary_hover">
            <LifeBuoy01 className="h-5 w-5" />
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-lg text-tertiary transition-colors hover:bg-primary_hover hover:text-tertiary_hover">
            <Settings01 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Expanded panel */}
      <div
        className={`flex flex-col border-r border-secondary bg-primary transition-all duration-200 ${
          isCollapsed ? 'w-0 overflow-hidden' : 'w-72'
        }`}
      >
        {/* Header */}
        <div className="flex h-14 items-center justify-between border-b border-secondary px-4">
          <span className="text-base font-semibold text-primary">Content</span>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-md text-tertiary hover:bg-primary_hover"
            onClick={() => setIsCollapsed(true)}
            aria-label="Collapse sidebar"
          >
            <LayoutLeft className="h-5 w-5 rotate-180" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <SearchLg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-tertiary" />
            <input
              placeholder="Search"
              className="h-9 w-full rounded-lg border border-secondary bg-primary pl-9 pr-20 text-sm text-primary placeholder:text-placeholder outline-hidden focus:ring-2 focus:ring-brand"
            />
            <div className="pointer-events-none absolute right-2 top-1/2 flex -translate-y-1/2 items-center rounded border border-secondary bg-primary px-1.5 py-0.5 text-xs font-medium text-tertiary">
              ⌘K
            </div>
          </div>
        </div>

        {/* Scrollable sections */}
        <div className="flex-1 overflow-y-auto px-3 pb-4">
          {/* Collections */}
          <div className="mb-2">
            <button
              onClick={() => setOpenCollections(!openCollections)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-secondary hover:bg-primary_hover"
            >
              Collections
              <ChevronDown className={`h-4 w-4 transition-transform ${openCollections ? 'rotate-180' : ''}`} />
            </button>
            {openCollections && (
              <div className="mt-1 space-y-0.5">
                <a
                  href="#"
                  className="flex items-center gap-2.5 rounded-lg bg-active px-3 py-2 text-sm text-secondary"
                >
                  <span className="size-2 rounded-full bg-emerald-500" />
                  Articles
                  <span className="ml-auto rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-tertiary">7</span>
                </a>
                <a href="#" className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-tertiary hover:bg-primary_hover">
                  Authors <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-tertiary">9</span>
                </a>
                <a href="#" className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-tertiary hover:bg-primary_hover">
                  Categories <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-tertiary">23</span>
                </a>
                <a href="#" className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-tertiary hover:bg-primary_hover">
                  Products <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-tertiary">21</span>
                </a>
              </div>
            )}
          </div>

          {/* Singletons */}
          <div className="mb-2">
            <button
              onClick={() => setOpenSingletons(!openSingletons)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-secondary hover:bg-primary_hover"
            >
              Singletons
              <ChevronDown className={`h-4 w-4 transition-transform ${openSingletons ? 'rotate-180' : ''}`} />
            </button>
            {openSingletons && (
              <div className="mt-1 space-y-0.5 pl-1">
                <a href="#" className="block rounded-lg px-3 py-2 text-sm text-tertiary hover:bg-primary_hover">Homepage</a>
                <a href="#" className="block rounded-lg px-3 py-2 text-sm text-tertiary hover:bg-primary_hover">About Page</a>
                <a href="#" className="block rounded-lg px-3 py-2 text-sm text-tertiary hover:bg-primary_hover">Privacy Policy</a>
                <a href="#" className="block rounded-lg px-3 py-2 text-sm text-tertiary hover:bg-primary_hover">Terms & Conditions</a>
              </div>
            )}
          </div>

          {/* Blocks */}
          <div className="mb-4">
            <button
              onClick={() => setOpenBlocks(!openBlocks)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-secondary hover:bg-primary_hover"
            >
              Blocks
              <ChevronDown className={`h-4 w-4 transition-transform ${openBlocks ? 'rotate-180' : ''}`} />
            </button>
            {openBlocks && (
              <div className="mt-1 space-y-0.5 pl-1">
                <a href="#" className="block rounded-lg px-3 py-2 text-sm text-tertiary hover:bg-primary_hover">Hero Section</a>
                <a href="#" className="block rounded-lg px-3 py-2 text-sm text-tertiary hover:bg-primary_hover">Testimonial Block</a>
                <a href="#" className="block rounded-lg px-3 py-2 text-sm text-tertiary hover:bg-primary_hover">Gallery Block</a>
                <a href="#" className="block rounded-lg px-3 py-2 text-sm text-tertiary hover:bg-primary_hover">FAQ Block</a>
              </div>
            )}
          </div>

          {/* + Add New */}
          <button className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-brand-solid px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-solid_hover">
            <Plus className="h-4 w-4" />
            Add New
          </button>
        </div>

        {/* Account card */}
        <div className="border-t border-secondary p-4">
          <div className="flex items-center gap-3 rounded-lg bg-secondary_subtle px-3 py-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-solid text-sm font-medium text-white">
              MD
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-medium text-primary">Mohit Davidson</div>
              <div className="truncate text-xs text-tertiary">mohit@contengine.io</div>
            </div>
            <button className="ml-auto text-tertiary hover:text-tertiary_hover">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
