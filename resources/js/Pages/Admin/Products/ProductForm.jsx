import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, router, useForm } from "@inertiajs/react";
import { useMemo, useState } from "react";
export default function ProductForm({
    submitLabel,
    action,
    method = "post",
    updateAction,
    categories,
    accessories,
    accessoryTypes,
    selectedCategoryIds = [],
    selectedAccessoryIds = [],
    initialValues,
    initialImage,
    initialImages = [],
}) {
    const [showCategoryInput, setShowCategoryInput] = useState(false);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [showAccessoryPicker, setShowAccessoryPicker] = useState(false);
    const [activeAccessoryTypeId, setActiveAccessoryTypeId] = useState("");
    const { data, setData, post, processing, errors } = useForm({
        name: initialValues?.name ?? "",
        slug: initialValues?.slug ?? "",
        sku: initialValues?.sku ?? "",
        price: initialValues?.price ?? "",
        sale_price: initialValues?.sale_price ?? "",
        currency: initialValues?.currency ?? "EUR",
        badge: initialValues?.badge ?? "",
        color: initialValues?.color ?? "",
        summary: initialValues?.summary ?? "",
        short_description: initialValues?.short_description ?? "",
        description: initialValues?.description ?? "",
        specs: initialValues?.specs ?? "",
        tags: initialValues?.tags ?? "",
        variants: initialValues?.variants ?? "",
        categories: selectedCategoryIds,
        accessories: selectedAccessoryIds,
        brand: initialValues?.brand ?? "",
        stock: initialValues?.stock ?? "0",
        weight_grams: initialValues?.weight_grams ?? "",
        dimensions_length: initialValues?.dimensions_length ?? "",
        dimensions_width: initialValues?.dimensions_width ?? "",
        dimensions_height: initialValues?.dimensions_height ?? "",
        dimensions_unit: initialValues?.dimensions_unit ?? "cm",
        is_active: initialValues?.is_active ?? true,
        is_featured: initialValues?.is_featured ?? false,
        is_personalizable: initialValues?.is_personalizable ?? false,
        image_file: null,
        images_files: [],
    });
    const selectedCategoryNames = categories
        .filter((category) => data.categories.includes(category.id))
        .map((category) => category.name);
    const accessoriesByType = useMemo(() => {
        if (accessoryTypes.length > 0) {
            const ordered = accessoryTypes.map((type) => ({
                id: type.id,
                name: type.name,
                items: accessories.filter(
                    (accessory) => accessory.type?.id === type.id,
                ),
            }));
            const loose = accessories.filter((accessory) => !accessory.type);
            if (loose.length > 0) {
                ordered.push({ id: 0, name: "Autre", items: loose });
            }
            return ordered.filter((group) => group.items.length > 0);
        }
        const grouped = {};
        accessories.forEach((accessory) => {
            const key = accessory.type?.name ?? "Autre";
            if (!grouped[key]) {
                grouped[key] = [];
            }
            grouped[key].push(accessory);
        });
        return Object.entries(grouped).map(([name, items], index) => ({
            id: index + 1,
            name,
            items,
        }));
    }, [accessories, accessoryTypes]);
    const accessoryTypeOptions = useMemo(() => {
        if (accessoryTypes.length > 0) {
            return accessoryTypes.map((type) => ({
                id: type.id,
                name: type.name,
            }));
        }
        return accessoriesByType.map((group) => ({
            id: group.id,
            name: group.name,
        }));
    }, [accessoryTypes, accessoriesByType]);
    const selectedAccessoriesByType = useMemo(() => {
        return accessoriesByType
            .map((group) => ({
                ...group,
                items: group.items.filter((accessory) =>
                    data.accessories.includes(accessory.id),
                ),
            }))
            .filter((group) => group.items.length > 0);
    }, [accessoriesByType, data.accessories]);
    const activeAccessoryGroup = useMemo(() => {
        if (accessoriesByType.length === 0) {
            return null;
        }
        const activeId =
            activeAccessoryTypeId || accessoryTypeOptions[0]?.id?.toString();
        if (!activeId) {
            return accessoriesByType[0];
        }
        return (
            accessoriesByType.find(
                (group) => group.id.toString() === activeId,
            ) ?? accessoriesByType[0]
        );
    }, [accessoriesByType, accessoryTypeOptions, activeAccessoryTypeId]);
    const submit = (event) => {
        event.preventDefault();
        if (method === "put") {
            post(updateAction ?? action, { forceFormData: true });
            return;
        }
        post(action, { forceFormData: true });
    };
    return (
        <form onSubmit={submit} className="space-y-6">
            <div className="card-glow rounded-[24px] border border-white/10 bg-[var(--surface)] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                    Categorie
                </p>
                <div className="mt-4">
                    <div className="flex items-center justify-between">
                        <InputLabel value="Categories" />
                        <button
                            type="button"
                            onClick={() =>
                                setShowCategoryInput((value) => !value)
                            }
                            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/20 text-xs font-semibold text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                            aria-label="Ajouter une categorie"
                        >
                            +
                        </button>
                    </div>
                    {showCategoryInput && (
                        <div className="mt-3 flex flex-wrap items-center gap-3">
                            <TextInput
                                value={newCategoryName}
                                className="h-10 w-full flex-1"
                                placeholder="Nouvelle categorie"
                                onChange={(event) =>
                                    setNewCategoryName(event.target.value)
                                }
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    if (!newCategoryName.trim()) {
                                        return;
                                    }
                                    router.post(
                                        route("admin.categories.store"),
                                        { name: newCategoryName.trim() },
                                        {
                                            preserveScroll: true,
                                            onSuccess: () => {
                                                setNewCategoryName("");
                                                setShowCategoryInput(false);
                                                router.reload({
                                                    only: ["categories"],
                                                });
                                            },
                                        },
                                    );
                                }}
                                className="rounded-full border border-white/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                            >
                                Ajouter
                            </button>
                        </div>
                    )}
                    <div className="mt-2">
                        <button
                            type="button"
                            onClick={() =>
                                setShowCategoryDropdown((value) => !value)
                            }
                            className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-[var(--surface-2)] px-4 py-3 text-left text-sm text-[var(--muted)]"
                        >
                            <span>
                                {data.categories.length > 0
                                    ? selectedCategoryNames.join(", ")
                                    : "Selectionner des categories"}
                            </span>
                            <span className="text-xs">?</span>
                        </button>
                        {showCategoryDropdown && (
                            <div className="mt-2 grid gap-2 rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-[var(--muted)]">
                                {categories.length === 0 ? (
                                    <p>Aucune categorie disponible.</p>
                                ) : (
                                    categories.map((category) => (
                                        <label
                                            key={category.id}
                                            className="flex items-center gap-2"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={data.categories.includes(
                                                    category.id,
                                                )}
                                                onChange={(event) => {
                                                    if (event.target.checked) {
                                                        setData("categories", [
                                                            ...data.categories,
                                                            category.id,
                                                        ]);
                                                    } else {
                                                        setData(
                                                            "categories",
                                                            data.categories.filter(
                                                                (id) =>
                                                                    id !==
                                                                    category.id,
                                                            ),
                                                        );
                                                    }
                                                }}
                                                className="h-4 w-4 rounded border-white/20 text-[var(--accent)] focus:ring-[var(--accent)]"
                                            />
                                            <span>{category.name}</span>
                                        </label>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                    <InputError message={errors.categories} className="mt-2" />
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
                <div className="card-glow rounded-[24px] border border-white/10 bg-[var(--surface)] p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                        Infos principales
                    </p>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <div>
                            <InputLabel htmlFor="name" value="Nom" />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-2 block w-full"
                                onChange={(event) =>
                                    setData("name", event.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="slug"
                                value="Slug (optionnel)"
                            />
                            <TextInput
                                id="slug"
                                name="slug"
                                value={data.slug}
                                className="mt-2 block w-full"
                                onChange={(event) =>
                                    setData("slug", event.target.value)
                                }
                            />
                            <InputError
                                message={errors.slug}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="sku" value="SKU / Reference" />
                            <TextInput
                                id="sku"
                                name="sku"
                                value={data.sku}
                                className="mt-2 block w-full"
                                onChange={(event) =>
                                    setData("sku", event.target.value)
                                }
                            />
                            <InputError message={errors.sku} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="brand" value="Marque" />
                            <TextInput
                                id="brand"
                                name="brand"
                                value={data.brand}
                                className="mt-2 block w-full"
                                onChange={(event) =>
                                    setData("brand", event.target.value)
                                }
                            />
                            <InputError
                                message={errors.brand}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="badge" value="Badge" />
                            <TextInput
                                id="badge"
                                name="badge"
                                value={data.badge}
                                className="mt-2 block w-full"
                                onChange={(event) =>
                                    setData("badge", event.target.value)
                                }
                            />
                            <InputError
                                message={errors.badge}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="color" value="Couleur" />
                            <TextInput
                                id="color"
                                name="color"
                                value={data.color}
                                className="mt-2 block w-full"
                                onChange={(event) =>
                                    setData("color", event.target.value)
                                }
                            />
                            <InputError
                                message={errors.color}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-6">
                        <label className="flex items-center gap-3 text-sm text-[var(--muted)]">
                            <input
                                id="is_active"
                                type="checkbox"
                                checked={data.is_active}
                                onChange={(event) =>
                                    setData("is_active", event.target.checked)
                                }
                                className="h-4 w-4 rounded border-white/20 text-[var(--accent)] focus:ring-[var(--accent)]"
                            />
                            Produit actif
                        </label>
                        <label className="flex items-center gap-3 text-sm text-[var(--muted)]">
                            <input
                                id="is_featured"
                                type="checkbox"
                                checked={data.is_featured}
                                onChange={(event) =>
                                    setData("is_featured", event.target.checked)
                                }
                                className="h-4 w-4 rounded border-white/20 text-[var(--accent)] focus:ring-[var(--accent)]"
                            />
                            Produit mis en avant
                        </label>
                        <label className="flex items-center gap-3 text-sm text-[var(--muted)]">
                            <input
                                id="is_personalizable"
                                type="checkbox"
                                checked={data.is_personalizable}
                                onChange={(event) =>
                                    setData(
                                        "is_personalizable",
                                        event.target.checked,
                                    )
                                }
                                className="h-4 w-4 rounded border-white/20 text-[var(--accent)] focus:ring-[var(--accent)]"
                            />
                            Produit personnalisable
                        </label>
                    </div>
                </div>
                <div className="grid gap-6">
                    <div className="card-glow rounded-[24px] border border-white/10 bg-[var(--surface)] p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                            Prix & Stock
                        </p>
                        <div className="mt-4 grid gap-4">
                            <div>
                                <InputLabel
                                    htmlFor="price"
                                    value="Prix (EUR)"
                                />
                                <TextInput
                                    id="price"
                                    name="price"
                                    value={data.price}
                                    className="mt-2 block w-full"
                                    onChange={(event) =>
                                        setData("price", event.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.price}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="sale_price"
                                    value="Prix promo (EUR)"
                                />
                                <TextInput
                                    id="sale_price"
                                    name="sale_price"
                                    value={data.sale_price}
                                    className="mt-2 block w-full"
                                    onChange={(event) =>
                                        setData(
                                            "sale_price",
                                            event.target.value,
                                        )
                                    }
                                />
                                <InputError
                                    message={errors.sale_price}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="stock" value="Stock" />
                                <TextInput
                                    id="stock"
                                    name="stock"
                                    value={data.stock}
                                    className="mt-2 block w-full"
                                    onChange={(event) =>
                                        setData("stock", event.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.stock}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="currency" value="Devise" />
                                <TextInput
                                    id="currency"
                                    name="currency"
                                    value={data.currency}
                                    className="mt-2 block w-full"
                                    onChange={(event) =>
                                        setData("currency", event.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.currency}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="card-glow rounded-[24px] border border-white/10 bg-[var(--surface)] p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                            Poids & Dimensions
                        </p>
                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            <div>
                                <InputLabel
                                    htmlFor="weight_grams"
                                    value="Poids (g)"
                                />
                                <TextInput
                                    id="weight_grams"
                                    name="weight_grams"
                                    value={data.weight_grams}
                                    className="mt-2 block w-full"
                                    onChange={(event) =>
                                        setData(
                                            "weight_grams",
                                            event.target.value,
                                        )
                                    }
                                />
                                <InputError
                                    message={errors.weight_grams}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="dimensions_unit"
                                    value="Unite"
                                />
                                <TextInput
                                    id="dimensions_unit"
                                    name="dimensions_unit"
                                    value={data.dimensions_unit}
                                    className="mt-2 block w-full"
                                    onChange={(event) =>
                                        setData(
                                            "dimensions_unit",
                                            event.target.value,
                                        )
                                    }
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="dimensions_length"
                                    value="Dimensions (L)"
                                />
                                <TextInput
                                    id="dimensions_length"
                                    name="dimensions_length"
                                    value={data.dimensions_length}
                                    className="mt-2 block w-full"
                                    onChange={(event) =>
                                        setData(
                                            "dimensions_length",
                                            event.target.value,
                                        )
                                    }
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="dimensions_width"
                                    value="Dimensions (l)"
                                />
                                <TextInput
                                    id="dimensions_width"
                                    name="dimensions_width"
                                    value={data.dimensions_width}
                                    className="mt-2 block w-full"
                                    onChange={(event) =>
                                        setData(
                                            "dimensions_width",
                                            event.target.value,
                                        )
                                    }
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="dimensions_height"
                                    value="Dimensions (h)"
                                />
                                <TextInput
                                    id="dimensions_height"
                                    name="dimensions_height"
                                    value={data.dimensions_height}
                                    className="mt-2 block w-full"
                                    onChange={(event) =>
                                        setData(
                                            "dimensions_height",
                                            event.target.value,
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <div className="card-glow rounded-[24px] border border-white/10 bg-[var(--surface)] p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                        Description
                    </p>
                    <div className="mt-4 grid gap-4">
                        <div>
                            <InputLabel htmlFor="summary" value="Resume" />
                            <TextInput
                                id="summary"
                                name="summary"
                                value={data.summary}
                                className="mt-2 block w-full"
                                onChange={(event) =>
                                    setData("summary", event.target.value)
                                }
                            />
                            <InputError
                                message={errors.summary}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="short_description"
                                value="Description courte"
                            />
                            <TextInput
                                id="short_description"
                                name="short_description"
                                value={data.short_description}
                                className="mt-2 block w-full"
                                onChange={(event) =>
                                    setData(
                                        "short_description",
                                        event.target.value,
                                    )
                                }
                            />
                            <InputError
                                message={errors.short_description}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="description"
                                value="Description"
                            />
                            <textarea
                                id="description"
                                name="description"
                                value={data.description}
                                className="mt-2 block w-full rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-[var(--ink)] shadow-[0_10px_30px_rgba(5,10,20,0.35)]"
                                rows={4}
                                onChange={(event) =>
                                    setData("description", event.target.value)
                                }
                            ></textarea>
                            <InputError
                                message={errors.description}
                                className="mt-2"
                            />
                        </div>
                    </div>
                </div>

                <div className="card-glow rounded-[24px] border border-white/10 bg-[var(--surface)] p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                        Detail tech
                    </p>
                    <div className="mt-4 grid gap-4">
                        <div>
                            <InputLabel
                                htmlFor="specs"
                                value="Specs (1 par ligne)"
                            />
                            <textarea
                                id="specs"
                                name="specs"
                                value={data.specs}
                                className="mt-2 block w-full rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-[var(--ink)] shadow-[0_10px_30px_rgba(5,10,20,0.35)]"
                                rows={3}
                                onChange={(event) =>
                                    setData("specs", event.target.value)
                                }
                            ></textarea>
                            <InputError
                                message={errors.specs}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="tags"
                                value="Tags (1 par ligne)"
                            />
                            <textarea
                                id="tags"
                                name="tags"
                                value={data.tags}
                                className="mt-2 block w-full rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-[var(--ink)] shadow-[0_10px_30px_rgba(5,10,20,0.35)]"
                                rows={2}
                                onChange={(event) =>
                                    setData("tags", event.target.value)
                                }
                            ></textarea>
                            <InputError
                                message={errors.tags}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="variants"
                                value="Variants (1 par ligne)"
                            />
                            <textarea
                                id="variants"
                                name="variants"
                                value={data.variants}
                                className="mt-2 block w-full rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-[var(--ink)] shadow-[0_10px_30px_rgba(5,10,20,0.35)]"
                                rows={2}
                                onChange={(event) =>
                                    setData("variants", event.target.value)
                                }
                            ></textarea>
                            <InputError
                                message={errors.variants}
                                className="mt-2"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-glow rounded-[24px] border border-white/10 bg-[var(--surface)] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                    Accessoires
                </p>
                <div className="mt-4 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="text-sm text-[var(--muted)]">
                            Ajoutez des accessoires par type.
                        </p>
                        <button
                            type="button"
                            onClick={() => {
                                if (!showAccessoryPicker) {
                                    const fallbackId =
                                        accessoryTypeOptions[0]?.id?.toString();
                                    if (fallbackId) {
                                        setActiveAccessoryTypeId(fallbackId);
                                    }
                                }
                                setShowAccessoryPicker((value) => !value);
                            }}
                            className="rounded-full border border-white/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                        >
                            Ajouter accessoire +
                        </button>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
                        {showAccessoryPicker ? (
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <div>
                                    <InputLabel
                                        htmlFor="accessory_type"
                                        value="Type d'accessoire"
                                    />
                                    <select
                                        id="accessory_type"
                                        className="mt-2 block w-full rounded-lg border border-white/10 bg-[var(--surface-2)] px-3 py-2 text-sm text-[var(--ink)]"
                                        value={
                                            activeAccessoryTypeId ||
                                            accessoryTypeOptions[0]?.id?.toString() ||
                                            ""
                                        }
                                        onChange={(event) =>
                                            setActiveAccessoryTypeId(
                                                event.target.value,
                                            )
                                        }
                                        disabled={
                                            accessoryTypeOptions.length === 0
                                        }
                                    >
                                        {accessoryTypeOptions.length === 0 ? (
                                            <option value="">
                                                Aucun type disponible
                                            </option>
                                        ) : (
                                            accessoryTypeOptions.map((type) => (
                                                <option
                                                    key={type.id}
                                                    value={type.id}
                                                >
                                                    {type.name}
                                                </option>
                                            ))
                                        )}
                                    </select>
                                </div>

                                <div className="mt-4">
                                    <InputLabel value="Accessoires" />
                                    <div className="mt-2 grid gap-2 sm:grid-cols-2">
                                        {activeAccessoryGroup?.items?.length ? (
                                            activeAccessoryGroup.items.map(
                                                (accessory) => (
                                                    <label
                                                        key={accessory.id}
                                                        className="flex items-center gap-2 text-sm text-[var(--muted)]"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={data.accessories.includes(
                                                                accessory.id,
                                                            )}
                                                            onChange={(
                                                                event,
                                                            ) => {
                                                                if (
                                                                    event.target
                                                                        .checked
                                                                ) {
                                                                    setData(
                                                                        "accessories",
                                                                        [
                                                                            ...data.accessories,
                                                                            accessory.id,
                                                                        ],
                                                                    );
                                                                } else {
                                                                    setData(
                                                                        "accessories",
                                                                        data.accessories.filter(
                                                                            (
                                                                                id,
                                                                            ) =>
                                                                                id !==
                                                                                accessory.id,
                                                                        ),
                                                                    );
                                                                }
                                                            }}
                                                            className="h-4 w-4 rounded border-white/20 text-[var(--accent)] focus:ring-[var(--accent)]"
                                                        />
                                                        <span>
                                                            {accessory.name}
                                                        </span>
                                                    </label>
                                                ),
                                            )
                                        ) : (
                                            <p className="text-sm text-[var(--muted)]">
                                                Aucun accessoire pour ce type.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <p className="text-sm text-[var(--muted)]">
                                    Cliquez sur “Ajouter accessoire +” pour
                                    choisir un type.
                                </p>
                            </div>
                        )}

                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                                Accessoires ajoutes
                            </p>
                            <div className="mt-3 grid gap-3">
                                {selectedAccessoriesByType.length === 0 ? (
                                    <p className="text-sm text-[var(--muted)]">
                                        Aucun accessoire selectionne.
                                    </p>
                                ) : (
                                    selectedAccessoriesByType.map((group) => (
                                        <div key={group.id}>
                                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                                                {group.name}
                                            </p>
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {group.items.map(
                                                    (accessory) => (
                                                        <button
                                                            key={accessory.id}
                                                            type="button"
                                                            onClick={() =>
                                                                setData(
                                                                    "accessories",
                                                                    data.accessories.filter(
                                                                        (id) =>
                                                                            id !==
                                                                            accessory.id,
                                                                    ),
                                                                )
                                                            }
                                                            className="rounded-full border border-white/15 px-3 py-1 text-xs text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                                                        >
                                                            {accessory.name}
                                                        </button>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <InputError message={errors.accessories} className="mt-2" />
            </div>

            <div className="card-glow rounded-[24px] border border-white/10 bg-[var(--surface)] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                    Images
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                        <InputLabel
                            htmlFor="image_file"
                            value="Image principale (upload)"
                        />
                        {initialImage && !data.image_file && (
                            <div className="mt-3 h-32 w-full overflow-hidden rounded-2xl border border-white/10 bg-[var(--surface-2)]">
                                <img
                                    src={initialImage}
                                    alt="Image principale"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        )}
                        <input
                            id="image_file"
                            type="file"
                            accept="image/*"
                            className="mt-2 block w-full text-sm text-[var(--muted)]"
                            onChange={(event) =>
                                setData(
                                    "image_file",
                                    event.target.files?.[0] ?? null,
                                )
                            }
                        />
                        <InputError
                            message={errors.image_file}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="images_files"
                            value="Galerie (upload multiple)"
                        />
                        {initialImages.length > 0 &&
                            data.images_files.length === 0 && (
                                <div className="mt-3 grid grid-cols-3 gap-3">
                                    {initialImages.map((url) => (
                                        <div
                                            key={url}
                                            className="h-20 overflow-hidden rounded-xl border border-white/10 bg-[var(--surface-2)]"
                                        >
                                            <img
                                                src={url}
                                                alt="Galerie"
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        <input
                            id="images_files"
                            type="file"
                            accept="image/*"
                            multiple
                            className="mt-2 block w-full text-sm text-[var(--muted)]"
                            onChange={(event) =>
                                setData(
                                    "images_files",
                                    Array.from(event.target.files ?? []),
                                )
                            }
                        />
                        <InputError
                            message={errors.images_files}
                            className="mt-2"
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <PrimaryButton disabled={processing}>
                    {submitLabel}
                </PrimaryButton>
                <Link
                    href={route("admin.products.index")}
                    className="rounded-full border border-white/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                    Annuler
                </Link>
            </div>
        </form>
    );
}
