import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";
export default function AccessoryTypeForm({
    submitLabel,
    action,
    method = "post",
    initialValues,
}) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: initialValues?.name ?? "",
        slug: initialValues?.slug ?? "",
    });
    const submit = (event) => {
        event.preventDefault();
        if (method === "put") {
            put(action);
            return;
        }
        post(action);
    };
    return (
        <form onSubmit={submit} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <InputLabel htmlFor="name" value="Nom" />
                    <TextInput
                        id="name"
                        value={data.name}
                        className="mt-2 block w-full"
                        onChange={(event) =>
                            setData("name", event.target.value)
                        }
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="slug" value="Slug" />
                    <TextInput
                        id="slug"
                        value={data.slug}
                        className="mt-2 block w-full"
                        onChange={(event) =>
                            setData("slug", event.target.value)
                        }
                        placeholder="box, screen, joystick..."
                    />
                    <InputError message={errors.slug} className="mt-2" />
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <PrimaryButton disabled={processing}>
                    {submitLabel}
                </PrimaryButton>
                <Link
                    href={route("admin.accessory-types.index")}
                    className="rounded-full border border-white/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                    Annuler
                </Link>
            </div>
        </form>
    );
}
