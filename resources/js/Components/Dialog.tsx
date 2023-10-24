import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, PropsWithChildren, ReactNode, SetStateAction, createContext, useContext, useState } from "react";
import SecondaryButton from "./SecondaryButton";
import { X } from "lucide-react";

export type DialogProps = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    showDialog: (component: ReactNode, title: string) => void;
}

const DialogContext = createContext<DialogProps>({ isOpen: false, setIsOpen: () => {}, showDialog: () => {} });

export default function DialogProvider({ children }: PropsWithChildren) {
    const [isOpen, setIsOpen] = useState(false);
    const [Component, setComponent] = useState<ReactNode | undefined>();
    const [title, setTitle] = useState('');

    const showDialog = (component: ReactNode, title: string) => {
        setComponent(component);
        setTitle(title);
    }

    return (
        <DialogContext.Provider value={{ isOpen, setIsOpen, showDialog }}>
            <Transition show={!!Component}
                enter="transition duration-150 ease-out"
                enterFrom="transform scale-90 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
                as={Fragment}
            >
                <Dialog as="div" open={!!Component} onClose={() => setComponent(undefined)} className="fixed inset-0 z-50 flex items-center justify-center bg-white/10">
                        <Dialog.Panel className="w-full max-w-sm rounded-md bg-nav text-textcolor">
                            <div className="p-5 flex items-center justify-between border-bordercolor border-b-[1px]">
                                <Dialog.Title>{title}</Dialog.Title>
                                <SecondaryButton onClick={() => setComponent(undefined)}>
                                    <X className="h-5" />
                                </SecondaryButton>
                            </div>
                            {Component}
                        </Dialog.Panel>
                </Dialog>
            </Transition>
            {children}
        </DialogContext.Provider>
    )
}

export function useDialog() {
    const context = useContext(DialogContext);
    if (!context) throw Error('useDialog must be used within a DialogProvider');

    return context
}