import { useModal } from "@/Components/Dialog";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Workspace } from "@/types";
import { useForm } from "@inertiajs/react";
import { FormEvent, useState } from "react";

type ProjectFormData = {
    name: string;
};

type ProjectFormProps = {
    currentWorkspace?: Workspace;
};

export function CreateProjectForm({ currentWorkspace }: ProjectFormProps) {
    const { data, setData, post, processing } = useForm<ProjectFormData>();
    const { showModal } = useModal();
    const [loading, setLoading] = useState(false);

    const handleCreateProject = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setLoading(true);
        setTimeout(() => {
            post(route("workspaces.projects.store", currentWorkspace?.id), {
                onSuccess: () => {
                    showModal(undefined, "");
                    setLoading(false);
                },
            });
        }, 1000);
    };

    return (
        <section>
            <form onSubmit={handleCreateProject}>
                <div className="grid grid-cols-1 items-center p-4 gap-2">
                    <InputLabel htmlFor="project_name" value="Project Name" />

                    <TextInput
                        id="project_name"
                        required
                        isFocused
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        autoComplete="name"
                        className="w-3/4"
                    />
                </div>

                <div className="flex items-center justify-end p-4">
                    <PrimaryButton
                        type="submit"
                        className="bg-blue"
                        disabled={loading}
                    >
                        Create
                    </PrimaryButton>
                </div>
            </form>
        </section>
    );
}
