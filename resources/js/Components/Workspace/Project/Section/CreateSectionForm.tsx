import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { PageProps, Project } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import { FormEvent } from "react";
import { ProjectViewProps } from "../ProjectViewLayout";
import { useModal } from "@/Components/Dialog";

export function CreateSectionForm({ project }: { project: Project }) {
    const { data, setData, post, processing } = useForm<{ name: string }>()
    const { showModal } = useModal();

    const handleCreateSection = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        post(route('section.store', { project: project.id }), {
            onSuccess: () => {
                showModal(undefined, '');
            }
        });
    }

    return (
        <section>
            <form onSubmit={handleCreateSection}>
                <div className="flex items-center justify-between p-4">
                    <InputLabel htmlFor="section_name" value="Section Name" />

                    <TextInput
                        id="section_name"
                        required
                        isFocused
                        autoComplete="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
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