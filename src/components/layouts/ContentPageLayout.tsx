import type { ReactNode } from "react";
import { HelpCircle, Menu01, SearchLg, Zap } from "@untitledui/icons";

import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { useMobileNav } from "@/layout/MobileNavContext";
import { useBreakpoint } from "@/hooks/use-breakpoint";

type ContentPageLayoutProps = {
    breadcrumbs?: ReactNode;
    title: ReactNode;
    subtitle?: ReactNode;
    primaryAction?: ReactNode;
    /** Right side of the top bar (defaults to Upgrade + Search + Help). */
    topRightActions?: ReactNode;
    /** Custom content rendered under the top bar, inside the same header wrapper. */
    headerContent?: ReactNode;
    /**
     * Customize the header container wrapper.
     * Defaults to: "mx-auto w-full max-w-container"
     */
    headerContainerClassName?: string;
    /** Hide the default page header (title/subtitle/primary action). */
    hideHeader?: boolean;
    /**
     * Customize the main content (body) container wrapper.
     * Defaults to: "mx-auto w-full max-w-container px-6 py-6"
     */
    containerClassName?: string;
    children: ReactNode;
};

const DefaultTopRightActions = () => {
    return (
        <div className="flex items-center gap-2">
            <Button color="secondary" size="md" iconLeading={Zap}>
                Upgrade now
            </Button>
            <ButtonUtility icon={SearchLg} tooltip="Search" size="sm" color="tertiary" />
            <ButtonUtility icon={HelpCircle} tooltip="Help" size="sm" color="tertiary" />
        </div>
    );
};

const FullLogo = ({ className }: { className?: string }) => (
    <svg
        width="151"
        height="38"
        viewBox="0 0 151 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <g filter="url(#filter0_ddiii_7531_72679)">
            <g clipPath="url(#clip0_7531_72679)">
                <rect x="3" width="32" height="32" rx="12" fill="#0A0D12" />
                <rect width="32" height="32" transform="translate(3)" fill="url(#paint0_linear_7531_72679)" />
                <path
                    d="M8 16.5001L10.6838 15.6055C10.889 15.5371 11.111 15.5371 11.3162 15.6055L14 16.5001"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
                <path d="M18 16H32" stroke="#67E3F9" strokeWidth="2" />
                <path
                    d="M11.3525 24.3547L12.6177 21.8244C12.7144 21.6309 12.8714 21.474 13.0649 21.3772L15.5952 20.1121"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
                <path
                    d="M21.9592 12.3339L24.4895 11.0688C24.683 10.972 24.84 10.8151 24.9367 10.6216L26.2019 8.09131"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
                <path
                    d="M19.5001 27.0015L18.6055 24.3177C18.5371 24.1124 18.5371 23.8905 18.6055 23.6852L19.5001 21.0015"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
                <path
                    d="M18.5 11.0015L19.3946 8.31769C19.463 8.11243 19.463 7.8905 19.3946 7.68524L18.5 5.00146"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
                <path
                    d="M27.3545 23.6474L24.8242 22.3823C24.6306 22.2855 24.4737 22.1286 24.377 21.9351L23.1118 19.4048"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
                <path
                    d="M15.3337 13.0407L14.0686 10.5105C13.9718 10.3169 13.8149 10.16 13.6213 10.0632L11.0911 8.7981"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
            </g>
            <rect x="4" y="1" width="30" height="30" rx="11" stroke="url(#paint1_linear_7531_72679)" strokeWidth="2" />
        </g>
        {/* NOTE: Wordmark paths omitted for brevity in this component; we only need the mark on mobile. */}
        <defs>
            <linearGradient id="paint0_linear_7531_72679" x1="16" y1="0" x2="17.3333" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="white" stopOpacity="0" />
                <stop offset="1" stopColor="white" stopOpacity="0.12" />
            </linearGradient>
            <linearGradient id="paint1_linear_7531_72679" x1="19" y1="0" x2="19" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="white" stopOpacity="0.12" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <clipPath id="clip0_7531_72679">
                <rect x="3" width="32" height="32" rx="12" fill="white" />
            </clipPath>
            <filter
                id="filter0_ddiii_7531_72679"
                x="0"
                y="-3"
                width="38"
                height="41"
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
                <feOffset dy="1" />
                <feGaussianBlur stdDeviation="0.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.162923 0 0 0 0 0.162923 0 0 0 0 0.162923 0 0 0 0.08 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_7531_72679" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_7531_72679" result="shape" />
            </filter>
        </defs>
    </svg>
);

export function ContentPageLayout({
    breadcrumbs,
    title,
    subtitle,
    primaryAction,
    topRightActions,
    headerContent,
    headerContainerClassName,
    hideHeader = false,
    containerClassName,
    children,
}: ContentPageLayoutProps) {
    const isDesktop = useBreakpoint("lg");
    const mobileNav = useMobileNav();

    return (
        <div className="flex h-full w-full flex-col">
            {/* Header wrapper (top bar + optional header content) */}
            <div className="w-full shrink-0">
                <div className={headerContainerClassName ?? "mx-auto w-full max-w-container"}>
                    {/* Top bar */}
                    <div className="flex h-[60px] items-center justify-between border-b border-secondary">
                        {isDesktop ? (
                            <>
                                <div className="flex h-full min-w-0 items-center px-6 py-3">{breadcrumbs}</div>
                                <div className="shrink-0 px-6 py-3">{topRightActions ?? <DefaultTopRightActions />}</div>
                            </>
                        ) : (
                            <>
                                <div className="flex h-full min-w-0 items-center px-4 py-3">
                                    <FullLogo className="h-8 w-auto" />
                                </div>
                                <div className="shrink-0 px-4 py-3">
                                    <ButtonUtility icon={Menu01} tooltip="Menu" size="md" onClick={() => mobileNav.toggle()} />
                                </div>
                            </>
                        )}
                    </div>

                    {/* Default header */}
                    {!hideHeader ? (
                        <div className="px-6 pb-6">
                            <div className="mt-6 flex items-start justify-between gap-6">
                                <div className="min-w-0">
                                    <h1 className="text-display-xs font-semibold text-primary">{title}</h1>
                                    {subtitle ? <p className="mt-1 text-sm text-tertiary">{subtitle}</p> : null}
                                </div>

                                {primaryAction ? <div className="shrink-0">{primaryAction}</div> : null}
                            </div>
                        </div>
                    ) : null}

                    {headerContent ? <>{headerContent}</> : null}
                </div>
            </div>

            {/* Page body */}
            <div className={containerClassName ?? "mx-auto w-full max-w-container px-6 py-6 flex-1 min-h-0 overflow-y-auto"}>{children}</div>
        </div>
    );
}
