import { Pencil01 } from "@untitledui/icons";

import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { RightPanelLayout } from "@/components/layouts/RightPanelLayout";

const RightConfigPanel = () => {
    return (
        <div className="flex h-full flex-col">
            <div className="border-b border-secondary px-5 py-4">
                <div className="text-sm font-semibold text-primary">Config</div>
                <div className="mt-1 text-sm text-tertiary">Entry settings and metadata.</div>
            </div>
            <div className="flex-1 p-5">
                <div className="rounded-xl bg-secondary_subtle p-4 text-sm text-tertiary ring-1 ring-secondary">
                    Placeholder panel (toggle via the Config rail).
                </div>
            </div>
        </div>
    );
};

export default function EntryEditorPage() {
    return (
        <RightPanelLayout rightPanel={<RightConfigPanel />} defaultRightPanelOpen={false} railLabel="Config">
            <div className="mx-auto w-full max-w-container px-6 py-6">
                <div className="flex items-center justify-between gap-4">
                    <Button href="/articles" color="tertiary" size="sm">
                         Back
                    </Button>

                    <div className="flex items-center gap-2">
                        <Button color="secondary" size="sm">
                            Save entry
                        </Button>
                        <Button color="primary" size="sm">
                            Publish
                        </Button>

                        <Dropdown.Root>
                            <Dropdown.DotsButton aria-label="More" />
                            <Dropdown.Popover className="w-min">
                                <Dropdown.Menu>
                                    <Dropdown.Item label="Edit model">Edit model</Dropdown.Item>
                                    <Dropdown.Item label="History">History</Dropdown.Item>
                                    <Dropdown.Item label="Delete">Delete</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown.Popover>
                        </Dropdown.Root>
                    </div>
                </div>

                <div className="mt-6">
                    <div className="flex items-center gap-2">
                        <h1 className="text-display-xs font-semibold text-primary">A squirrel steals a slice of pizza</h1>
                        <Pencil01 className="size-4 text-tertiary" />
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                        <Badge type="pill-color" size="sm" color="gray">
                            Article
                        </Badge>
                        <Badge type="pill-color" size="sm" color="brand">
                            Ready to Publish
                        </Badge>
                    </div>
                </div>

                <div className="mt-6 rounded-xl bg-primary p-6 shadow-xs ring-1 ring-secondary">
                    <div className="text-sm font-semibold text-primary">Editor content</div>
                    <div className="mt-2 text-sm text-tertiary">
                        Placeholder editor layout. Next step is to implement blocks/fields matching the Figma entry editor.
                    </div>
                </div>
            </div>
        </RightPanelLayout>
    );
}
