import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, PropsWithChildren, ReactNode, SetStateAction, createContext, useContext, useState } from "react";
import SecondaryButton from "./SecondaryButton";
import { X } from "lucide-react";
import { Button } from "./Button";

export type ModalProps = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    showModal: (component: ReactNode, title: string) => void;
}

const ModalContext = createContext<ModalProps>({ isOpen: false, setIsOpen: () => {}, showModal: () => {} });

export default function DialogProvider({ children }: PropsWithChildren) {
    const [isOpen, setIsOpen] = useState(false);
    const [Component, setComponent] = useState<ReactNode | undefined>();
    const [title, setTitle] = useState('');

    const showModal = (component: ReactNode, title: string) => {
        setComponent(component);
        setTitle(title);
    }

    return (
        <ModalContext.Provider value={{ isOpen, setIsOpen, showModal }}>
            <Transition show={!!Component}
                enter="transition duration-150 ease-out"
                enterFrom="transform scale-90 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
                as={Fragment}
            >
                <Dialog as="div" open={!!Component} onClose={() => setComponent(undefined)} className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-sm">
                        <Dialog.Panel className="w-full max-w-sm rounded-md bg-nav text-textcolor">
                            <div className="p-5 flex items-center justify-between border-bordercolor border-b-[1px]">
                                <Dialog.Title className="font-bold text-2xl">{title}</Dialog.Title>
                                <Button className="h-8 hover:bg-bgactive px-2 text-textweak hover:text-textcolor" onClick={() => setComponent(undefined)}>
                                    <X className="h-5" />
                                </Button>
                            </div>
                            {Component}
                        </Dialog.Panel>
                </Dialog>
            </Transition>
            {children}
        </ModalContext.Provider>
    )
}

export function useModal() {
    const context = useContext(ModalContext);
    if (!context) throw Error('useModal must be used within a DialogProvider');

    return context
}