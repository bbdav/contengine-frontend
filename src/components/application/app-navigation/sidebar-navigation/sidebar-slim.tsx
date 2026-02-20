import type { FC } from "react";
import { useState } from "react";
import { LifeBuoy01, LogOut01, Settings01, LayoutLeft } from "@untitledui/icons";
import { AnimatePresence, motion } from "motion/react";
import { Button as AriaButton, DialogTrigger as AriaDialogTrigger, Popover as AriaPopover } from "react-aria-components";
import { Avatar } from "@/components/base/avatar/avatar";
import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";

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
import { cx } from "@/lib/utils/cx";
import { MobileNavigationHeader } from "../base-components/mobile-header";
import { NavAccountMenu } from "../base-components/nav-account-card";
import { NavItemBase } from "../base-components/nav-item";
import { NavItemButton } from "../base-components/nav-item-button";
import { NavList } from "../base-components/nav-list";
import type { NavItemType } from "../config";

interface SidebarNavigationSlimProps {
    /** URL of the currently active item. */
    activeUrl?: string;
    /** List of items to display. */
    items: (NavItemType & { icon: FC<{ className?: string }> })[];
    /** List of footer items to display. */
    footerItems?: (NavItemType & { icon: FC<{ className?: string }> })[];
    /** Whether to hide the border. */
    hideBorder?: boolean;
    /** Whether to hide the right side border. */
    hideRightBorder?: boolean;
    /** When true, show the secondary panel on desktop without requiring hover. */
    defaultExpanded?: boolean;
}

export const SidebarNavigationSlim = ({
    activeUrl,
    items,
    footerItems = [],
    hideBorder,
    hideRightBorder,
    defaultExpanded = false,
}: SidebarNavigationSlimProps) => {
    const activeItem = [...items, ...footerItems].find((item) => item.href === activeUrl || item.items?.some((subItem) => subItem.href === activeUrl));
    const [currentItem, setCurrentItem] = useState(activeItem || items[0]);

    // Replace hover-only behavior with an explicit expanded state.
    const [isExpanded, setIsExpanded] = useState(Boolean(defaultExpanded));

    const isSecondarySidebarVisible = isExpanded && Boolean(currentItem.items?.length);

    const MAIN_SIDEBAR_WIDTH = 68;
    const SECONDARY_SIDEBAR_WIDTH = 268;

    // Total width when expanded on desktop. Used by the parent layout.
    const TOTAL_WIDTH = MAIN_SIDEBAR_WIDTH + (isSecondarySidebarVisible ? SECONDARY_SIDEBAR_WIDTH : 0);

    const mainSidebar = (
        <aside
            style={{
                width: MAIN_SIDEBAR_WIDTH,
            }}
            className={cx(
                "group flex h-full max-h-full max-w-full overflow-y-auto py-1 pl-1 transition duration-100 ease-linear",
                isSecondarySidebarVisible && "bg-primary",
            )}
            onPointerEnter={() => setIsExpanded(true)}
        >
            <div
                className={cx(
                    "flex w-auto flex-col justify-between rounded-xl bg-primary pt-5 ring-1 ring-secondary transition duration-300 ring-inset",
                    hideBorder && !isSecondarySidebarVisible && "ring-transparent",
                )}
            >
                <div className="flex justify-center px-3">
                    <CompanyLogo className="size-8" />
                </div>

                <ul className="mt-4 flex flex-col gap-0.5 px-3">
                    {items.map((item) => (
                        <li key={item.label}>
                            <NavItemButton
                                size="md"
                                current={currentItem.href === item.href}
                                href={item.href}
                                label={item.label || ""}
                                icon={item.icon}
                                onClick={() => {
                                    setCurrentItem(item);
                                    setIsExpanded(true);
                                }}
                            />
                        </li>
                    ))}
                </ul>
                <div className="mt-auto flex flex-col gap-4 px-3 py-5">
                    {footerItems.length > 0 && (
                        <ul className="flex flex-col gap-0.5">
                            {footerItems.map((item) => (
                                <li key={item.label}>
                                    <NavItemButton
                                        size="md"
                                        current={currentItem.href === item.href}
                                        label={item.label || ""}
                                        href={item.href}
                                        icon={item.icon}
                                        onClick={() => setCurrentItem(item)}
                                    />
                                </li>
                            ))}
                        </ul>
                    )}

                    <AriaDialogTrigger>
                        <AriaButton
                            className={({ isPressed, isFocused }) =>
                                cx("group relative inline-flex rounded-full", (isPressed || isFocused) && "outline-2 outline-offset-2 outline-focus-ring")
                            }
                        >
                            <Avatar status="online" src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80" size="md" alt="Olivia Rhye" />
                        </AriaButton>
                        <AriaPopover
                            placement="right bottom"
                            offset={8}
                            crossOffset={6}
                            className={({ isEntering, isExiting }) =>
                                cx(
                                    "will-change-transform",
                                    isEntering &&
                                        "duration-300 ease-out animate-in fade-in placement-right:slide-in-from-left-2 placement-top:slide-in-from-bottom-2 placement-bottom:slide-in-from-top-2",
                                    isExiting &&
                                        "duration-150 ease-in animate-out fade-out placement-right:slide-out-to-left-2 placement-top:slide-out-to-bottom-2 placement-bottom:slide-out-to-top-2",
                                )
                            }
                        >
                            <NavAccountMenu />
                        </AriaPopover>
                    </AriaDialogTrigger>
                </div>
            </div>
        </aside>
    );

    const secondarySidebar = (
        <AnimatePresence initial={false}>
            {isSecondarySidebarVisible && (
                <motion.div
                    initial={{ width: 0, borderColor: "var(--color-border-secondary)" }}
                    animate={{ width: SECONDARY_SIDEBAR_WIDTH, borderColor: "var(--color-border-secondary)" }}
                    exit={{ width: 0, borderColor: "rgba(0,0,0,0)", transition: { borderColor: { type: "tween", delay: 0.05 } } }}
                    transition={{ type: "spring", damping: 26, stiffness: 220, bounce: 0 }}
                    className={cx(
                        "relative h-full overflow-x-hidden overflow-y-auto bg-primary",
                        !(hideBorder || hideRightBorder) && "box-content border-r-[1.5px]",
                    )}
                >
                    <div style={{ width: SECONDARY_SIDEBAR_WIDTH }} className="flex h-full flex-col px-4 pt-6">
                        <div className="flex items-center justify-between gap-3">
                            <h3 className="text-sm font-semibold text-brand-secondary">{currentItem.label}</h3>
                            <button
                                type="button"
                                aria-label="Collapse sidebar"
                                onClick={() => setIsExpanded(false)}
                                className="flex h-8 w-8 items-center justify-center rounded-md text-tertiary hover:bg-primary_hover"
                            >
                                <LayoutLeft className="h-5 w-5 rotate-180" />
                            </button>
                        </div>
                        <ul className="py-2">
                            {currentItem.items?.map((item) => (
                                <li key={item.label} className="py-0.5">
                                    <NavItemBase current={activeUrl === item.href} href={item.href} icon={item.icon} badge={item.badge} type="link">
                                        {item.label}
                                    </NavItemBase>
                                </li>
                            ))}
                        </ul>
                        <div className="sticky bottom-0 mt-auto flex justify-between border-t border-secondary bg-primary px-2 py-5">
                            <div>
                                <p className="text-sm font-semibold text-primary">Olivia Rhye</p>
                                <p className="text-sm text-tertiary">olivia@untitledui.com</p>
                            </div>
                            <div className="absolute top-2.5 right-0">
                                <ButtonUtility size="sm" color="tertiary" tooltip="Log out" icon={LogOut01} />
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <>
            {/* Desktop sidebar navigation (static in layout, not fixed) */}
            <div style={{ width: TOTAL_WIDTH }} className="z-50 hidden shrink-0 lg:flex">
                {mainSidebar}
                {secondarySidebar}
            </div>

            {/* Mobile header navigation */}
            <MobileNavigationHeader>
                <aside className="group flex h-full max-h-full w-full max-w-full flex-col justify-between overflow-y-auto bg-primary pt-4">
                    <div className="px-4">
                        <CompanyLogo className="h-8 w-auto" />
                    </div>

                    <NavList items={items} />

                    <div className="mt-auto flex flex-col gap-5 px-2 py-4">
                        <div className="flex flex-col gap-2">
                            <NavItemBase current={activeUrl === "/support"} type="link" href="/support" icon={LifeBuoy01}>
                                Support
                            </NavItemBase>
                            <NavItemBase current={activeUrl === "/settings"} type="link" href="/settings" icon={Settings01}>
                                Settings
                            </NavItemBase>
                        </div>

                        <div className="relative flex items-center gap-3 border-t border-secondary pt-6 pr-8 pl-2">
                            <AvatarLabelGroup
                                status="online"
                                size="md"
                                src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
                                title="Olivia Rhye"
                                subtitle="olivia@untitledui.com"
                            />

                            <div className="absolute top-1/2 right-0 -translate-y-1/2">
                                <Button
                                    size="sm"
                                    color="tertiary"
                                    iconLeading={<LogOut01 className="size-5 text-fg-quaternary transition-inherit-all group-hover:text-fg-quaternary_hover" />}
                                    className="p-1.5!"
                                />
                            </div>
                        </div>
                    </div>
                </aside>
            </MobileNavigationHeader>
        </>
    );
};
