import type { FC, ReactNode } from "react";
import { cx } from "@/lib/utils/cx";
import { NavItemBase } from "./nav-item";

type NavIcon = FC<{ className?: string }>;

export type NavListItem = {
    id?: string;
    label?: ReactNode;
    href?: string;
    icon?: NavIcon;
    badge?: ReactNode;
    current?: boolean;
    divider?: boolean;
    items?: Array<{
        id?: string;
        label: ReactNode;
        href: string;
        icon?: NavIcon;
        badge?: ReactNode;
        current?: boolean;
    }>;
};

type NavListProps = {
    className?: string;
    /** Optional helper for determining current state */
    activeUrl?: string;
    items?: NavListItem[];
};

export function NavList({ className, items = [], activeUrl }: NavListProps) {
    return (
        <ul className={cx("flex flex-col gap-1", className)}>
            {items.map((item, index) => {
                const key = item.id ?? (typeof item.label === "string" ? item.label : undefined) ?? `${index}`;

                if (item.divider) {
                    return (
                        <li key={key} className="list-none px-3 pt-5 pb-2">
                            {item.label && <p className="text-xs font-semibold text-quaternary">{item.label}</p>}
                        </li>
                    );
                }

                const isCurrent =
                    item.current ?? (activeUrl ? item.href === activeUrl || item.items?.some((sub) => sub.href === activeUrl) : false);

                const hasChildren = Boolean(item.items && item.items.length > 0);

                if (hasChildren) {
                    return (
                        <li key={key} className="list-none py-0.5">
                            <details open={isCurrent} className="group">
                                <NavItemBase type="collapsible" href={item.href} icon={item.icon} badge={item.badge} current={isCurrent}>
                                    {item.label}
                                </NavItemBase>

                                <ul className="flex flex-col">
                                    {item.items!.map((child, childIndex) => {
                                        const childKey = child.id ?? (typeof child.label === "string" ? child.label : undefined) ?? `${childIndex}`;
                                        const childCurrent = child.current ?? (activeUrl ? child.href === activeUrl : false);

                                        return (
                                            <li key={childKey} className="list-none py-0.5">
                                                <NavItemBase
                                                    type="collapsible-child"
                                                    href={child.href}
                                                    icon={child.icon}
                                                    badge={child.badge}
                                                    current={childCurrent}
                                                >
                                                    {child.label}
                                                </NavItemBase>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </details>
                        </li>
                    );
                }

                return (
                    <li key={key} className="list-none py-0.5">
                        <NavItemBase type="link" href={item.href} icon={item.icon} badge={item.badge} current={isCurrent}>
                            {item.label}
                        </NavItemBase>
                    </li>
                );
            })}
        </ul>
    );
}
