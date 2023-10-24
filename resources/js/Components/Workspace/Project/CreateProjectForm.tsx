import { useDialog } from "@/Components/Dialog";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Workspace } from "@/types";
import { useForm } from "@inertiajs/react"
import { FormEvent } from "react";

type ProjectFormData = {
    name: string;
}

type ProjectFormProps = {
    currentWorkspace?: Workspace;
}

export function CreateProjectForm({ currentWorkspace }: ProjectFormProps) {
    const { data, setData, post, processing } = useForm<ProjectFormData>();
    const { showDialog } = useDialog();

    const handleCreateProject = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        post(route('workspaces.projects.store', currentWorkspace?.id), {
            onSuccess: () => {
                showDialog(undefined, '');
            }
        });
    }

    return (
        <section>
            <form onSubmit={handleCreateProject}>
                <div className="flex items-center justify-between p-4">
                    <InputLabel htmlFor="project_name" value="Project Name" />

                    <TextInput
                        id="project_name"
                        required
                        isFocused
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        autoComplete="name"
                    />
                </div>

                <div className="flex items-center justify-end p-4">
                    <PrimaryButton type="submit" className="bg-blue" disabled={processing}>
                        Create
                    </PrimaryButton>
                </div>
            </form>
        </section>
    )
}