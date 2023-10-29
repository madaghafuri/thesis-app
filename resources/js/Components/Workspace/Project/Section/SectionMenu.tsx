import PrimaryButton from "@/Components/PrimaryButton";
import { Menu, Transition } from "@headlessui/react";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { Fragment } from "react";

export function SectionMenu() {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <Menu.Button>
                <PrimaryButton className="px-1 py-1 hover:bg-bgactive">
                    <MoreHorizontal className="h-4 text-textweak" />
                </PrimaryButton>
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute">
                    <div className="px-1 py-1 bg-nav rounded-md">
                        <Menu.Item>
                            {({ active }) => (
                                <PrimaryButton className="font-thin text-textweak hover:bg-bgactive gap-2 w-full">
                                    <Pencil className="h-4" />
                                    Rename
                                </PrimaryButton>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <PrimaryButton className="font-thin text-textweak hover:bg-bgactive gap-2 w-full">
                                    <Pencil className="h-4" />
                                    Add
                                </PrimaryButton>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <PrimaryButton className="text-danger font-thin hover:bg-bgactive gap-2 w-full">
                                    <Trash className="h-4" />
                                    Delete
                                </PrimaryButton>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}