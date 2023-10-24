import { cn } from "@/utils";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "../PrimaryButton";
import { FormEvent } from "react";
import { useDialog } from "../Dialog";

type FormData = {
    name: string;
}

export function CreateWorkspaceForm({ className }: { className?: string }) {
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm<FormData>();
    const { showDialog } = useDialog();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        post(route('workspaces.store'), {
            onSuccess: () => {
                showDialog(undefined, '');
            },
            onError: (error) => {
                console.log(error);
            }
        });
    }

    return (
        <section className={cn(
            "",
            className
        )}>
            <form className="p-4 flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="w-full flex items-center justify-between">
                    <InputLabel htmlFor="workspace_name" value="Workspace Name" />

                    <TextInput 
                        id="workspace_name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />
                </div>

                <div className="flex w-full items-center justify-end">
                    <PrimaryButton type="submit" className="bg-blue" disabled={processing}>Create</PrimaryButton>
                </div>
            </form>
        </section>
    )
}