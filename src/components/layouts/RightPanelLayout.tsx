import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "@untitledui/icons";

import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { cx } from "@/lib/utils/cx";

type RightPanelLayoutProps = {
    children: ReactNode;

    /** When provided, enables the config rail and panel. */
    rightPanel?: ReactNode;

    /** Initial open state for the right panel (desktop). */
    defaultRightPanelOpen?: boolean;

    /** Rail label (defaults to "Config"). */
    railLabel?: string;
};

const PANEL_WIDTH = 384; // ~w-96
const RAIL_WIDTH = 44;

export function RightPanelLayout({
    children,
    rightPanel,
    defaultRightPanelOpen = false,
    railLabel = "Config",
}: RightPanelLayoutProps) {
    const isEnabled = Boolean(rightPanel);
    const [isOpen, setIsOpen] = useState(defaultRightPanelOpen);

    const widths = useMemo(() => {
        if (!isEnabled) return { rail: 0, panel: 0, total: 0 };
        return {
            rail: RAIL_WIDTH,
            panel: isOpen ? PANEL_WIDTH : 0,
            total: RAIL_WIDTH + (isOpen ? PANEL_WIDTH : 0),
        };
    }, [isEnabled, isOpen]);

    return (
        <div className="flex min-w-0 flex-1">
            <div className="min-w-0 flex-1">{children}</div>

            {isEnabled ? (
                <aside
                    className="relative hidden shrink-0 lg:block"
                    style={{ width: widths.total }}
                    aria-label="Config panel"
                >
                    {/* Rail */}
                    <div
                        className={cx(
                            "absolute inset-y-0 right-0 z-10 flex items-center justify-center border-l border-secondary bg-primary",
                            isOpen ? "w-11" : "w-11",
                        )}
                        style={{ width: widths.rail }}
                    >
                        <div className="flex h-full w-full flex-col items-center justify-between py-3">
                            <ButtonUtility
                                tooltip={isOpen ? "Collapse" : "Expand"}
                                icon={isOpen ? ChevronRight : ChevronLeft}
                                onClick={() => setIsOpen((v) => !v)}
                            />

                            <div
                                className="select-none text-xs font-semibold text-tertiary"
                                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                            >
                                {railLabel}
                            </div>

                            <div className="h-8" />
                        </div>
                    </div>

                    {/* Panel */}
                    <div
                        className={cx(
                            "absolute inset-y-0 left-0 overflow-hidden border-l border-secondary bg-primary transition-[width] duration-200 ease-out",
                            isOpen ? "shadow-lg" : "shadow-none",
                        )}
                        style={{ width: widths.panel }}
                    >
                        <div className="h-full w-96">{rightPanel}</div>
                    </div>
                </aside>
            ) : null}
        </div>
    );
}
