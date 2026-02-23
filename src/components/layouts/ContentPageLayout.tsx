import type { ReactNode } from "react";
import { HelpCircle, SearchLg, Zap } from "@untitledui/icons";

import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";

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
    return (
        <div className="w-full">
            {/* Header wrapper (top bar + optional header content) */}
            <div className="w-full">
                <div className={headerContainerClassName ?? "mx-auto w-full max-w-container"}>
                    {/* Top bar */}
                    <div className="flex h-[60px] items-center justify-between border-b border-secondary">
                        <div className="flex h-full min-w-0 items-center px-6 py-3">{breadcrumbs}</div>
                        <div className="shrink-0 px-6 py-3">{topRightActions ?? <DefaultTopRightActions />}</div>
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
            <div className={containerClassName ?? "mx-auto w-full max-w-container px-6 py-6"}>{children}</div>
        </div>
    );
}
