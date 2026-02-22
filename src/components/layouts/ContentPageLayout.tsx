import type { ReactNode } from "react";
import { XClose, Zap } from "@untitledui/icons";

import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";

type ContentPageLayoutProps = {
    breadcrumbs?: ReactNode;
    title: ReactNode;
    subtitle?: ReactNode;
    primaryAction?: ReactNode;
    /** Right side of the top bar (defaults to Upgrade + Search + Help). */
    topRightActions?: ReactNode;
    children: ReactNode;
};

const DefaultTopRightActions = () => {
    return (
        <div className="flex items-center gap-2">
            <Button color="secondary" size="md" iconLeading={Zap}>
                Upgrade now
            </Button>
            <ButtonUtility icon={XClose} tooltip="Close" size="md" />
            <ButtonUtility icon={XClose} tooltip="Close" size="md" />
        </div>
    );
};

export function ContentPageLayout({ breadcrumbs, title, subtitle, primaryAction, topRightActions, children }: ContentPageLayoutProps) {
    return (
        <div className="w-full">
            {/* Top bar */}
            <div className="flex h-[60px] items-center justify-between border-b border-secondary">
                <div className="flex h-full min-w-0 items-center px-6 py-3">{breadcrumbs}</div>
                <div className="shrink-0 px-6 py-3">{topRightActions ?? <DefaultTopRightActions />}</div>
            </div>

            <div className="mx-auto w-full max-w-container px-6 py-6">
                {/* Header */}
                <div className="mt-6 flex items-start justify-between gap-6">
                    <div className="min-w-0">
                        <h1 className="text-display-xs font-semibold text-primary">{title}</h1>
                        {subtitle ? <p className="mt-1 text-sm text-tertiary">{subtitle}</p> : null}
                    </div>

                    {primaryAction ? <div className="shrink-0">{primaryAction}</div> : null}
                </div>

                {/* Page body */}
                {children}
            </div>
        </div>
    );
}
