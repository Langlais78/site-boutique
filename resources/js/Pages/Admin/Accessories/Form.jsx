import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";
export default function AccessoryForm({
    submitLabel,
    action,
    method = "post",
    types,
    initialValues,
}) {
    const { data, setData, post, put, processing, errors } = useForm({
        type_id: initialValues?.type_id ?? types[0]?.id?.toString() ?? "",
        name: initialValues?.name ?? "",
        price: initialValues?.price ?? "",
        image: initialValues?.image ?? "",
        characteristics: initialValues?.characteristics ?? "",
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
                    <InputLabel htmlFor="type" value="Type" />
                    <select
                        id="type"
                        value={data.type_id}
                        onChange={(event) =>
                            setData("type_id", event.target.value)
                        }
                        className="mt-2 block w-full rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-[var(--ink)]"
                    >
                        {types.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.type_id} className="mt-2" />
                </div>

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
                    <InputLabel htmlFor="price" value="Prix (EUR)" />
                    <TextInput
                        id="price"
                        value={data.price}
                        className="mt-2 block w-full"
                        onChange={(event) =>
                            setData("price", event.target.value)
                        }
                    />
                    <InputError message={errors.price} className="mt-2" />
                </div>

                <div className="sm:col-span-2">
                    <InputLabel htmlFor="image" value="Image (URL)" />
                    <TextInput
                        id="image"
                        value={data.image}
                        className="mt-2 block w-full"
                        onChange={(event) =>
                            setData("image", event.target.value)
                        }
                    />
                    <InputError message={errors.image} className="mt-2" />
                </div>
            </div>

            <div>
                <InputLabel
                    htmlFor="characteristics"
                    value="Caracteristiques (1 par ligne)"
                />
                <textarea
                    id="characteristics"
                    value={data.characteristics}
                    className="mt-2 block w-full rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-[var(--ink)] shadow-[0_10px_30px_rgba(5,10,20,0.35)]"
                    rows={4}
                    onChange={(event) =>
                        setData("characteristics", event.target.value)
                    }
                ></textarea>
                <InputError message={errors.characteristics} className="mt-2" />
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <PrimaryButton disabled={processing}>
                    {submitLabel}
                </PrimaryButton>
                <Link
                    href={route("admin.accessories.index")}
                    className="rounded-full border border-white/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                    Annuler
                </Link>
            </div>
        </form>
    );
}
