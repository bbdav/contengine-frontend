import { useMemo, useState } from "react";
import { parseDate } from "@internationalized/date";
import {
    ArrowLeft,
    BarChartSquare02,
    Calendar,
    CheckDone01,
    ChevronRight,
    Download01,
    DownloadCloud02,
    File05,
    FilterLines,
    HomeLine,
    PieChart03,
    Plus,
    Rows01,
    SearchLg,
    Trash01,
    Users01,
} from "@untitledui/icons";
import type { SortDescriptor } from "react-aria-components";
import type { NavItemType } from "@/components/application/app-navigation/config";
import { SidebarNavigationSectionsSubheadings } from "@/components/application/app-navigation/sidebar-navigation/sidebar-sections-subheadings";
import { Breadcrumbs } from "@/components/application/breadcrumbs/breadcrumbs";
import { DateRangePicker } from "@/components/application/date-picker/date-range-picker";
import { PaginationCardMinimal, PaginationPageMinimalCenter } from "@/components/application/pagination/pagination";
import { Table, TableCard, TableRowActionsDropdown } from "@/components/application/table/table";
import { TabList, Tabs } from "@/components/application/tabs/tabs";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge, BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Input } from "@/components/base/input/input";

// Helper functions for formatting
const formatCurrency = (amount: number): string => {
    return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
};

const formatDate = (timestamp: number): string =>
    new Date(timestamp).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

const navItemsWithSectionsSubheadings: Array<{ label: string; items: NavItemType[] }> = [
    {
        label: "General",
        items: [
            {
                label: "Dashboard",
                href: "/",
                icon: BarChartSquare02,
            },
            {
                label: "Projects",
                href: "/projects",
                icon: Rows01,
            },
            {
                label: "Documents",
                href: "/documents",
                icon: File05,
            },
            {
                label: "Calendar",
                href: "/calendar",
                icon: Calendar,
            },
        ],
    },
    {
        label: "Untitled UI",
        items: [
            {
                label: "Reporting",
                href: "#",
                icon: PieChart03,
            },
            {
                label: "Tasks",
                href: "#",
                icon: CheckDone01,
                badge: (
                    <Badge size="sm" type="modern">
                        8
                    </Badge>
                ),
            },
            {
                label: "Users",
                href: "#",
                icon: Users01,
            },
        ],
    },
    {
        label: "Your teams",
        items: [
            {
                label: "Catalog",
                href: "#",
                icon: () => <Avatar src="https://www.untitledui.com/logos/images/Catalog.jpg" className="mr-2 size-5" />,
                badge: (
                    <div className="flex items-center gap-3">
                        <Badge size="sm" type="modern">
                            ⌘1
                        </Badge>
                        <ChevronRight size={16} className="text-fg-quaternary" />
                    </div>
                ),
            },
            {
                label: "Warpspeed",
                href: "#",
                icon: () => <Avatar src="https://www.untitledui.com/logos/images/Warpspeed.jpg" className="mr-2 size-5" />,
                badge: (
                    <div className="flex items-center gap-3">
                        <Badge size="sm" type="modern">
                            ⌘2
                        </Badge>
                        <ChevronRight size={16} className="text-fg-quaternary" />
                    </div>
                ),
            },
            {
                label: "Boltshift",
                href: "#",
                icon: () => <Avatar src="https://www.untitledui.com/logos/images/Boltshift.jpg" className="mr-2 size-5" />,
                badge: (
                    <div className="flex items-center gap-3">
                        <Badge size="sm" type="modern">
                            ⌘3
                        </Badge>
                        <ChevronRight size={16} className="text-fg-quaternary" />
                    </div>
                ),
            },
            {
                label: "Sisyphus",
                href: "#",
                icon: () => <Avatar src="https://www.untitledui.com/logos/images/Sisyphus.jpg" className="mr-2 size-5" />,
                badge: (
                    <div className="flex items-center gap-3">
                        <Badge size="sm" type="modern">
                            ⌘4
                        </Badge>
                        <ChevronRight size={16} className="text-fg-quaternary" />
                    </div>
                ),
            },
        ],
    },
];

const tabs = [
    { id: "all", label: "All trades" },
    { id: "buy", label: "Buy" },
    { id: "sell", label: "Sell" },
];

type Trade = {
    id: string;
    label: string;
    company: string;
    amount: number;
    deliveryDate: number;
    status: "processing" | "success" | "declined";
    author: {
        name: string;
        email: string;
        avatarUrl: string;
        initials: string;
    };
};

const trades: Trade[] = [
    {
        id: "trade-01",
        label: "TSLA BUY",
        company: "Tesla, Inc.",
        amount: 30021.23,
        deliveryDate: new Date(2025, 0, 12).getTime(),
        status: "processing",
        author: {
            name: "Olivia Rhye",
            email: "olivia@untitledui.com",
            avatarUrl: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80",
            initials: "OR",
        },
    },
    {
        id: "trade-02",
        label: "MTCH SELL",
        company: "Match Group, Inc,",
        amount: 10045.0,
        deliveryDate: new Date(2025, 0, 13).getTime(),
        status: "success",
        author: {
            name: "Phoenix Baker",
            email: "phoenix@untitledui.com",
            avatarUrl: "https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80",
            initials: "PB",
        },
    },
    {
        id: "trade-03",
        label: "DDOG BUY",
        company: "Datadog Inc",
        amount: 40132.16,
        deliveryDate: new Date(2025, 0, 13).getTime(),
        status: "success",
        author: { name: "Lana Steiner", email: "lana@untitledui.com", avatarUrl: "", initials: "LS" },
    },
    {
        id: "trade-04",
        label: "ARKG BUY",
        company: "ARK Genomic Revolution ETF",
        amount: 22665.12,
        deliveryDate: new Date(2025, 0, 13).getTime(),
        status: "declined",
        author: { name: "Demi Wilkinson", email: "demi@untitledui.com", avatarUrl: "", initials: "DW" },
    },
    {
        id: "trade-05",
        label: "SQ BUY",
        company: "Square, Inc.",
        amount: 18221.3,
        deliveryDate: new Date(2025, 0, 12).getTime(),
        status: "success",
        author: {
            name: "Candice Wu",
            email: "candice@untitledui.com",
            avatarUrl: "https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80",
            initials: "CW",
        },
    },
    {
        id: "trade-06",
        label: "MSTR SELL",
        company: "MicroStrategy Inc.",
        amount: 24118.18,
        deliveryDate: new Date(2025, 0, 12).getTime(),
        status: "success",
        author: { name: "Natali Craig", email: "natali@untitledui.com", avatarUrl: "", initials: "NC" },
    },
];

export const Informational01 = () => {
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "deliveryDate",
        direction: "descending",
    });

    const sortedItems = useMemo(() => {
        if (!sortDescriptor) return trades;

        const direction = sortDescriptor.direction === "descending" ? -1 : 1;

        return [...trades].sort((a, b) => {
            const col = sortDescriptor.column;

            if (col === "deliveryDate" || col === "amount") {
                const first = a[col];
                const second = b[col];
                return (first - second) * direction;
            }

            // Fallback: string compare for any other column
            const first = String(a[col as keyof Trade] ?? "");
            const second = String(b[col as keyof Trade] ?? "");
            return first.localeCompare(second) * direction;
        });
    }, [sortDescriptor]);

    return (
        <div className="flex flex-col bg-primary lg:flex-row">
            <SidebarNavigationSectionsSubheadings items={navItemsWithSectionsSubheadings} />
            <main className="min-w-0 flex-1 bg-secondary_subtle pt-8 pb-12 shadow-none lg:bg-primary">
                <div className="mx-auto mb-8 flex max-w-container flex-col gap-5 px-4 lg:px-8">
                    {/* Page header simple */}
                    <div className="relative flex flex-col gap-4">
                        <div className="max-lg:hidden">
                            <Breadcrumbs type="button" maxVisibleItems={3}>
                                <Breadcrumbs.Item href="#" icon={HomeLine} />
                                <Breadcrumbs.Item href="#">Dashboard</Breadcrumbs.Item>
                                <Breadcrumbs.Item href="#">Orders</Breadcrumbs.Item>
                                <Breadcrumbs.Item href="#">Trade history</Breadcrumbs.Item>
                            </Breadcrumbs>
                        </div>
                        <div className="flex lg:hidden">
                            <Button href="#" color="link-gray" size="md" iconLeading={ArrowLeft}>
                                Back
                            </Button>
                        </div>
                        <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                            <div className="flex flex-col gap-0.5 md:gap-1">
                                <p className="text-xl font-semibold text-primary md:text-display-xs">Trade history</p>
                                <p className="text-md text-tertiary">View your team's trades and transactions.</p>
                            </div>
                            <div className="flex flex-col gap-4 lg:flex-row">
                                <div className="flex items-start gap-3">
                                    <Button iconLeading={Download01} color="secondary" size="md">
                                        Export
                                    </Button>
                                    <Button iconLeading={Plus} size="md">
                                        Add trade
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Tabs orientation="horizontal" selectedKey="all">
                        <TabList size="sm" type="underline" items={tabs} />
                    </Tabs>
                </div>
                <div className="mx-auto flex max-w-container flex-col px-4 lg:gap-6 lg:px-8">
                    <div className="relative flex flex-wrap items-center justify-between gap-x-3 gap-y-4 pb-6 after:pointer-events-none after:absolute after:inset-0 after:border-b after:border-secondary lg:flex-nowrap lg:px-0 lg:pb-0 lg:after:border-b-0">
                        <Input shortcut className="lg:max-w-100" size="sm" placeholder="Search for trades" icon={SearchLg} />
                        <div className="flex gap-3">
                            <DateRangePicker
                                defaultValue={{
                                    start: parseDate("2025-01-10"),
                                    end: parseDate("2025-01-16"),
                                }}
                            />
                            <Button iconLeading={FilterLines} size="md" color="secondary" className="hidden lg:inline-flex">
                                Filters
                            </Button>
                            <Button iconLeading={FilterLines} size="md" color="secondary" className="inline-flex lg:hidden" />
                        </div>
                    </div>
                    <TableCard.Root className="-mx-4 rounded-none lg:mx-0 lg:rounded-xl">
                        <TableCard.Header
                            title="All trades"
                            badge={
                                <Badge color="gray" type="modern" size="sm">
                                    58 trades
                                </Badge>
                            }
                            contentTrailing={
                                <div className="absolute top-5 right-6 lg:static">
                                    <TableRowActionsDropdown />
                                </div>
                            }
                            className="px-6 pb-5"
                        />
                        <Table
                            aria-label="Trades"
                            selectionMode="multiple"
                            defaultSelectedKeys={["trade-01", "trade-03", "trade-04", "trade-05"]}
                            sortDescriptor={sortDescriptor}
                            onSortChange={setSortDescriptor}
                            className="bg-primary"
                        >
                            <Table.Header>
                                <Table.Head id="trade" isRowHeader label="Trade" className="w-full" />
                                <Table.Head id="amount" label="Order amount" />
                                <Table.Head id="deliveryDate" label="Delivery date" allowsSorting />
                                <Table.Head id="status" label="Status" />
                                <Table.Head id="author" label="Executed by" />
                                <Table.Head id="actions" />
                            </Table.Header>
                            <Table.Body items={sortedItems}>
                                {(trade: Trade) => (
                                    <Table.Row id={trade.id} className="selected:bg-primary">
                                        <Table.Cell>
                                            <div>
                                                <p className="text-sm font-medium whitespace-nowrap text-primary">{trade.label}</p>
                                                <p className="text-sm whitespace-nowrap text-tertiary">{trade.company}</p>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell>{formatCurrency(trade.amount)}</Table.Cell>
                                        <Table.Cell>{formatDate(trade.deliveryDate)}</Table.Cell>
                                        <Table.Cell>
                                            <BadgeWithDot
                                                color={
                                                    trade.status === "success"
                                                        ? "success"
                                                        : trade.status === "processing"
                                                          ? "gray"
                                                          : trade.status === "declined"
                                                            ? "error"
                                                            : "gray"
                                                }
                                                size="sm"
                                                type="modern"
                                                className="capitalize"
                                            >
                                                {trade.status}
                                            </BadgeWithDot>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <div className="group flex items-center gap-3 outline-hidden">
                                                <Avatar src={trade.author.avatarUrl} alt={trade.author.name} size="sm" initials={trade.author.initials} />
                                                <div>
                                                    <p className="text-sm font-medium text-primary">{trade.author.name}</p>
                                                    <p className="text-sm text-tertiary">{trade.author.email}</p>
                                                </div>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell className="px-4">
                                            <div className="flex justify-end gap-0.5">
                                                <ButtonUtility size="xs" color="tertiary" tooltip="Download" icon={DownloadCloud02} />
                                                <ButtonUtility size="xs" color="tertiary" tooltip="Edit" icon={Trash01} />
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table>
                        <div className="max-lg:hidden">
                            <PaginationCardMinimal align="right" page={1} total={10} />
                        </div>
                    </TableCard.Root>
                    <div className="lg:hidden">
                        <PaginationPageMinimalCenter page={1} total={10} className="mt-6" />
                    </div>
                </div>
            </main>
        </div>
    );
};
export default Informational01
