import { FormEvent, useState } from "react";
import InputLabel from "../InputLabel";
import { Button } from "../Button";
import { cn } from "@/utils";
import { useForm, usePage } from "@inertiajs/react";
import { ReactMultiEmail } from "../Multi/MultiEmailInput";
import { Workspace } from "@/types";
import { useModal } from "../Dialog";
import { useToast } from "../Toast/useToast";

type Props = {
    workspace: Workspace;
};

export function InviteWorkspaceForm({ workspace }: Props) {
    const [emails, setEmails] = useState<string[]>([]);
    const { setData, post, errors } = useForm<{
        emails: string;
        workspace_id: number;
    }>({ emails: "", workspace_id: workspace.id });
    const { showModal } = useModal();
    const { toast } = useToast();

    const handleSendInvitation = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        post(route("email.invite"), {
            onSuccess: () => {
                showModal(undefined, "");
                toast({
                    title: "Invitation successfully sent",
                    variant: "destructive",
                });
            },
        });
    };

    return (
        <div className="p-6 text-textcolor">
            <form onSubmit={handleSendInvitation}>
                <div className="flex flex-col gap-3">
                    <InputLabel
                        className="text-textweak text-sm"
                        value="Email Address"
                        htmlFor="email"
                    />
                    <ReactMultiEmail
                        className="bg-black"
                        placeholder="Input Your Email"
                        emails={emails}
                        onChange={(emails) => {
                            setEmails(emails);
                            setData("emails", JSON.stringify(emails));
                        }}
                        validateEmail={(email) => email.includes("@")}
                        autoFocus
                        getLabel={(email, index, removeEmail) => {
                            return (
                                <div
                                    data-tag
                                    key={index}
                                    className="bg-bordercolor rounded-lg text-xs inline-flex items-center px-1 outline outline-bordercolor outline-1 mr-2 mb-2"
                                >
                                    <div data-tag-item>{email}</div>
                                    <span
                                        className="p-1 select-none hover:bg-bgactive rounded-full"
                                        data-tag-handle
                                        onClick={() => removeEmail(index)}
                                    >
                                        x
                                    </span>
                                </div>
                            );
                        }}
                    />
                </div>

                <div className="flex items-center mt-3 w-full">
                    <Button
                        type="submit"
                        className={cn(
                            "h-8 px-2 font-extralight self-end",
                            emails.length > 0 ? "bg-blue" : "bg-transparent"
                        )}
                        disabled={emails.length < 1}
                    >
                        Send
                    </Button>
                </div>
            </form>
        </div>
    );
}
