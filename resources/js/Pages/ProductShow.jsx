import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
export default function ProductShow({ product, accessories = [] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeImage, setActiveImage] = useState(null);
    const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
    const [isZooming, setIsZooming] = useState(false);
    const [selectedAccessories, setSelectedAccessories] = useState({});
    const [customText, setCustomText] = useState("");
    const [customColor, setCustomColor] = useState("");
    const [customFont, setCustomFont] = useState("");
    const title = product.name || "Produit tech";
    const badge = product.badge || "Tech";
    const color = product.color || "Standard";
    const description =
        product.description ||
        product.short_description ||
        product.summary ||
        "Produit technique premium, concu pour performance et durabilite.";
    const specs = product.specs?.length
        ? product.specs
        : ["Garantie 2 ans", "Support premium", "Qualite pro"];
    const brand = product.brand || "Barbu";
    const category =
        product.categories && product.categories.length > 0
            ? product.categories.map((item) => item.name).join(", ")
            : product.category || "Impression 3D / Gaming";
    const sku = product.sku || "SKU-0000";
    const weight = product.weight_grams ? `${product.weight_grams} g` : "-";
    const dimensions = product.dimensions?.length
        ? `${product.dimensions.length}x${product.dimensions.width ?? "-"}x${product.dimensions.height ?? "-"} ${product.dimensions.unit ?? "cm"}`
        : "-";
    const stockLabel =
        product.stock !== undefined && product.stock !== null
            ? product.stock > 0
                ? `En stock (${product.stock})`
                : "Rupture"
            : "Disponible";
    const accessoriesByType = useMemo(() => {
        const grouped = new Map();
        accessories.forEach((item) => {
            const typeName = item.type?.name ?? "Sans type";
            const key = item.type?.id
                ? `type-${item.type.id}`
                : `type-${typeName}`;
            if (!grouped.has(key)) {
                grouped.set(key, { key, typeName, items: [] });
            }
            grouped.get(key)?.items.push(item);
        });
        return Array.from(grouped.values());
    }, [accessories]);
    const containsKeyword = (value, keyword) =>
        value.toLowerCase().includes(keyword);
    const colorOptions = [
        { label: "Noir", value: "#111827" },
        { label: "Blanc", value: "#ffffff" },
        { label: "Rouge", value: "#ef4444" },
        { label: "Bleu", value: "#3b82f6" },
        { label: "Vert", value: "#22c55e" },
        { label: "Jaune", value: "#facc15" },
        { label: "Orange", value: "#f97316" },
        { label: "Violet", value: "#8b5cf6" },
        { label: "Rose", value: "#ec4899" },
        { label: "Gris", value: "#6b7280" },
    ];
    const fontOptions = [
        "Arial",
        "Calibri",
        "Cambria",
        "Candara",
        "Comic Sans MS",
        "Consolas",
        "Constantia",
        "Corbel",
        "Courier New",
        "Georgia",
        "Impact",
        "Lucida Console",
        "Lucida Sans Unicode",
        "Palatino Linotype",
        "Segoe UI",
        "Tahoma",
        "Times New Roman",
        "Trebuchet MS",
        "Verdana",
    ];
    const accessoryById = useMemo(() => {
        const map = new Map();
        accessories.forEach((item) => {
            map.set(item.id, item);
        });
        return map;
    }, [accessories]);
    const formatMoney = (cents) =>
        new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: product.currency || "EUR",
        }).format(cents / 100);
    const formatPrice = new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: product.currency || "EUR",
    }).format((product.price_cents || 0) / 100);
    const formatSale = product.sale_price_cents
        ? new Intl.NumberFormat("fr-FR", {
              style: "currency",
              currency: product.currency || "EUR",
          }).format((product.sale_price_cents || 0) / 100)
        : null;
    const basePriceCents = product.sale_price_cents ?? product.price_cents ?? 0;
    const isPersonalizable = Boolean(product.is_personalizable);
    const hasTextAccessory = accessoriesByType.some((group) =>
        containsKeyword(group.typeName, "texte"),
    );
    const hasColorAccessory = accessoriesByType.some((group) =>
        containsKeyword(group.typeName, "couleur"),
    );
    const hasFontAccessory = accessoriesByType.some((group) =>
        containsKeyword(group.typeName, "police"),
    );
    const accessoriesTotalCents = Object.values(selectedAccessories).reduce(
        (total, accessoryId) =>
            total + (accessoryById.get(accessoryId)?.price_cents ?? 0),
        0,
    );
    const textPriceCents = customText.length * 500;
    const totalPriceCents =
        basePriceCents + accessoriesTotalCents + textPriceCents;
    const selectedAccessoryIds = useMemo(() => {
        const chosen = Object.values(selectedAccessories);
        if (chosen.length > 0) {
            return chosen;
        }
        return accessories.map((item) => item.id);
    }, [selectedAccessories, accessories]);
    const mainImage = product.image || "";
    const gallery = (product.images ?? []).filter((value) => Boolean(value));
    const allImages = [mainImage, ...gallery].filter(Boolean);
    useEffect(() => {
        setActiveImage(allImages[0] ?? null);
    }, [mainImage]);
    const activeIndex = activeImage
        ? Math.max(0, allImages.indexOf(activeImage))
        : 0;
    const goPrev = () => {
        if (allImages.length === 0) return;
        const nextIndex =
            (activeIndex - 1 + allImages.length) % allImages.length;
        setActiveImage(allImages[nextIndex]);
    };
    const goNext = () => {
        if (allImages.length === 0) return;
        const nextIndex = (activeIndex + 1) % allImages.length;
        setActiveImage(allImages[nextIndex]);
    };
    return (
        <AuthenticatedLayout>
            <Head title={title} />

            <section className="pt-6">
                <div className="space-y-10">
                    <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                            <span className="rounded-full border border-white/10 px-3 py-1">
                                {badge}
                            </span>

                            <span className="rounded-full border border-white/10 px-3 py-1">
                                {color}
                            </span>

                            <span className="rounded-full border border-white/10 px-3 py-1">
                                {brand}
                            </span>
                        </div>

                        <h1 className="font-['Chakra_Petch'] text-4xl font-semibold leading-tight">
                            {title}
                        </h1>

                        <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                            <span className="text-[var(--accent)]">4.6/5</span>

                            <span>212 avis</span>
                        </div>

                        <p className="max-w-4xl text-sm text-[var(--muted)]">
                            {description}
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-[1.1fr_1.2fr_0.8fr] lg:items-stretch">

                        <div className="flex h-full flex-col gap-6">
                            <div className="card-glow h-full rounded-[24px] border border-white/10 bg-[var(--surface)] p-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (activeImage) {
                                            setIsModalOpen(true);
                                        }
                                    }}
                                    onMouseMove={(event) => {
                                        const rect =
                                            event.currentTarget.getBoundingClientRect();
                                        const x =
                                            ((event.clientX - rect.left) /
                                                rect.width) *
                                            100;
                                        const y =
                                            ((event.clientY - rect.top) /
                                                rect.height) *
                                            100;
                                        setZoomPosition({
                                            x: Math.max(0, Math.min(100, x)),
                                            y: Math.max(0, Math.min(100, y)),
                                        });
                                    }}
                                    onMouseEnter={() => setIsZooming(true)}
                                    onMouseLeave={() => setIsZooming(false)}
                                    className="relative block h-[420px] w-full cursor-zoom-in overflow-hidden rounded-2xl border border-white/10 bg-[var(--surface-2)]"
                                >
                                    {activeImage ? (
                                        <>
                                            <img
                                                src={activeImage}
                                                alt={title}
                                                className={
                                                    (isZooming
                                                        ? "opacity-0"
                                                        : "opacity-100") +
                                                    " h-full w-full object-cover transition-opacity"
                                                }
                                            />
                                            <div
                                                className={
                                                    (isZooming
                                                        ? "opacity-100"
                                                        : "opacity-0") +
                                                    " absolute inset-0 bg-no-repeat transition-opacity"
                                                }
                                                style={{
                                                    backgroundImage: `url(${activeImage})`,
                                                    backgroundSize: "200%",
                                                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                                                }}
                                            />
                                        </>
                                    ) : (
                                        <div className="h-full w-full bg-[linear-gradient(135deg,rgba(38,244,208,0.2),rgba(255,138,61,0.2))]" />
                                    )}
                                </button>
                                <div className="mt-3 grid grid-cols-5 gap-2">
                                    {allImages.length > 0
                                        ? allImages.slice(0, 5).map((url) => (
                                              <button
                                                  key={url}
                                                  type="button"
                                                  onClick={() =>
                                                      setActiveImage(url)
                                                  }
                                                  className={`h-16 overflow-hidden rounded-xl border ${
                                                      activeImage === url
                                                          ? "border-[var(--accent)]"
                                                          : "border-white/10"
                                                  } bg-[var(--surface-2)]`}
                                              >
                                                  <img
                                                      src={url}
                                                      alt={title}
                                                      className="h-full w-full object-cover"
                                                      loading="lazy"
                                                  />
                                              </button>
                                          ))
                                        : Array.from({ length: 5 }).map(
                                              (_, index) => (
                                                  <div
                                                      key={index}
                                                      className="h-16 rounded-xl bg-[linear-gradient(135deg,rgba(38,244,208,0.12),rgba(255,138,61,0.14))]"
                                                  ></div>
                                              ),
                                          )}
                                </div>
                                <p className="mt-3 text-xs text-[var(--muted)]">
                                    Survolez pour zoomer, cliquez pour agrandir.
                                </p>
                            </div>

                            <div className="card-glow flex-1 rounded-[24px] border border-white/10 bg-[var(--surface)] p-6">
                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                                    Points forts
                                </p>

                                <ul className="mt-4 grid gap-2 text-sm text-[var(--muted)]">
                                    {specs.map((spec) => (
                                        <li key={spec} className="flex gap-2">
                                            <span className="text-[var(--accent)]">
                                                ?
                                            </span>

                                            <span>{spec}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="flex h-full flex-col gap-6">

                            {isPersonalizable ? (
                                <div className="card-glow flex-1 rounded-[24px] border border-white/10 bg-[var(--surface)] p-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
                                                Personnalisation
                                            </p>

                                            <p className="mt-2 text-2xl font-semibold text-[var(--ink)]">
                                                Choisissez vos options
                                            </p>

                                            <p className="mt-2 text-sm text-[var(--muted)]">
                                                Selectionnez les accessoires
                                                disponibles pour ce produit.
                                            </p>
                                        </div>

                                        <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                                            Sur mesure
                                        </span>
                                    </div>

                                    <div className="mt-6 space-y-4">
                                        {accessoriesByType.length === 0 ? (
                                            <div className="rounded-2xl border border-white/10 bg-[var(--surface-2)] px-4 py-3 text-sm text-[var(--muted)]">
                                                Aucun accessoire associe pour
                                                le moment.
                                            </div>
                                        ) : (
                                            <>
                                                {(hasTextAccessory ||
                                                    hasColorAccessory ||
                                                    hasFontAccessory) && (
                                                    <div className="card-glow rounded-[22px] border border-white/10 bg-[var(--surface-2)] p-4">
                                                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                                                            Personnalisation
                                                            texte
                                                        </p>
                                                        <div className="mt-4 grid gap-4">
                                                            {hasTextAccessory && (
                                                                <div>
                                                                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                                                                        Texte
                                                                        (18
                                                                        caracteres
                                                                        max)
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        maxLength={
                                                                            18
                                                                        }
                                                                        value={
                                                                            customText
                                                                        }
                                                                        onChange={(
                                                                            event,
                                                                        ) =>
                                                                            setCustomText(
                                                                                event
                                                                                    .target
                                                                                    .value,
                                                                            )
                                                                        }
                                                                        className="mt-2 w-full rounded-2xl border border-white/10 bg-[var(--surface)] px-4 py-3 text-sm text-[var(--ink)]"
                                                                        placeholder="Votre texte"
                                                                    />
                                                                    <div className="mt-2 flex items-center justify-between text-xs text-[var(--muted)]">
                                                                        <span>
                                                                            {
                                                                                customText.length
                                                                            }
                                                                            /18
                                                                        </span>
                                                                        <span>
                                                                            +
                                                                            {formatMoney(
                                                                                customText.length *
                                                                                    500,
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            )}
                                                            <div className="grid gap-4">
                                                                {hasFontAccessory && (
                                                                    <div>
                                                                        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                                                                            Police
                                                                        </label>
                                                                        <select
                                                                            className="mt-2 w-full rounded-2xl border border-white/10 bg-[var(--surface)] px-4 py-3 text-sm text-[var(--ink)]"
                                                                            value={
                                                                                customFont
                                                                            }
                                                                            onChange={(
                                                                                event,
                                                                            ) =>
                                                                                setCustomFont(
                                                                                    event
                                                                                        .target
                                                                                        .value,
                                                                                )
                                                                            }
                                                                        >
                                                                            <option
                                                                                value=""
                                                                                disabled
                                                                            >
                                                                                Choisir
                                                                                une
                                                                                police
                                                                            </option>
                                                                            {fontOptions.map(
                                                                                (
                                                                                    font,
                                                                                ) => (
                                                                                    <option
                                                                                        key={
                                                                                            font
                                                                                        }
                                                                                        value={
                                                                                            font
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            font
                                                                                        }
                                                                                    </option>
                                                                                ),
                                                                            )}
                                                                        </select>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {hasColorAccessory && (
                                                            <div className="mt-4">
                                                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                                                                    Couleur
                                                                </p>
                                                                <div className="mt-3 grid grid-cols-8 gap-3">
                                                                    {colorOptions
                                                                        .slice(
                                                                            0,
                                                                            8,
                                                                        )
                                                                        .map(
                                                                            (
                                                                                option,
                                                                            ) => (
                                                                                <button
                                                                                    key={
                                                                                        option.value
                                                                                    }
                                                                                    type="button"
                                                                                    onClick={() =>
                                                                                        setCustomColor(
                                                                                            option.value,
                                                                                        )
                                                                                    }
                                                                                    className={
                                                                                        "h-9 w-full rounded-full border transition " +
                                                                                        (customColor ===
                                                                                        option.value
                                                                                            ? "border-[var(--accent)]"
                                                                                            : "border-white/10")
                                                                                    }
                                                                                    style={{
                                                                                        backgroundColor:
                                                                                            option.value,
                                                                                    }}
                                                                                    aria-label={
                                                                                        option.label
                                                                                    }
                                                                                />
                                                                            ),
                                                                        )}
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div className="mt-4 rounded-2xl border border-white/10 bg-[var(--surface)] px-4 py-3">
                                                            <p
                                                                className="text-sm text-[var(--ink)]"
                                                                style={{
                                                                    fontFamily:
                                                                        customFont ||
                                                                        "inherit",
                                                                    color:
                                                                        customColor ||
                                                                        undefined,
                                                                }}
                                                            >
                                                                {customText ||
                                                                    "Apercu du texte"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                                {accessoriesByType
                                                    .filter((group) => {
                                                        const lower =
                                                            group.typeName.toLowerCase();
                                                        return (
                                                            !lower.includes(
                                                                "texte",
                                                            ) &&
                                                            !lower.includes(
                                                                "police",
                                                            ) &&
                                                            !lower.includes(
                                                                "couleur",
                                                            )
                                                        );
                                                    })
                                                    .map((group) => (
                                                        <div key={group.key}>
                                                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                                                                Type
                                                                d'accessoire :{" "}
                                                                {
                                                                    group.typeName
                                                                }
                                                            </p>
                                                            <select
                                                                className="mt-2 w-full rounded-2xl border border-white/10 bg-[var(--surface-2)] px-4 py-3 text-sm text-[var(--ink)]"
                                                                value={
                                                                    selectedAccessories[
                                                                        group
                                                                            .key
                                                                    ] ?? ""
                                                                }
                                                                onChange={(
                                                                    event,
                                                                ) => {
                                                                    const value =
                                                                        event
                                                                            .target
                                                                            .value;
                                                                    setSelectedAccessories(
                                                                        (
                                                                            prev,
                                                                        ) => {
                                                                            if (
                                                                                !value
                                                                            ) {
                                                                                const next =
                                                                                    {
                                                                                        ...prev,
                                                                                    };
                                                                                delete next[
                                                                                    group
                                                                                        .key
                                                                                ];
                                                                                return next;
                                                                            }
                                                                            return {
                                                                                ...prev,
                                                                                [group.key]:
                                                                                    Number(
                                                                                        value,
                                                                                    ),
                                                                            };
                                                                        },
                                                                    );
                                                                }}
                                                            >
                                                                <option
                                                                    value=""
                                                                    disabled
                                                                >
                                                                    Choisir
                                                                    une option
                                                                </option>
                                                                {group.items.map(
                                                                    (item) => (
                                                                        <option
                                                                            key={
                                                                                item.id
                                                                            }
                                                                            value={
                                                                                item.id
                                                                            }
                                                                        >
                                                                            {
                                                                                item.name
                                                                            }
                                                                            {item.price_cents !==
                                                                                null &&
                                                                            item.price_cents !==
                                                                                undefined
                                                                                ? ` - ${(item.price_cents / 100).toFixed(2)} EUR`
                                                                                : ""}
                                                                        </option>
                                                                    ),
                                                                )}
                                                            </select>
                                                        </div>
                                                    ))}
                                            </>
                                        )}
                                    </div>
                                    <div className="mt-6 rounded-2xl border border-white/10 bg-[var(--surface-2)] px-4 py-3 text-xs text-[var(--muted)]">
                                        Tarif indicatif base. Devis final apres
                                        personnalisation.
                                    </div>
                                </div>
                            ) : (
                                <div className="card-glow flex-1 rounded-[24px] border border-white/10 bg-[var(--surface)] p-6">
                                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                                        Achat produit
                                    </p>
                                    <p className="mt-2 text-2xl font-semibold text-[var(--ink)]">
                                        {formatMoney(basePriceCents)}
                                    </p>
                                    {formatSale && (
                                        <p className="mt-1 text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
                                            Promo {formatSale}
                                        </p>
                                    )}
                                    <p className="mt-3 text-sm text-[var(--muted)]">
                                        {stockLabel}
                                    </p>
                                    <div className="mt-5 rounded-2xl border border-white/10 bg-[var(--surface-2)] px-4 py-4 text-sm text-[var(--muted)]">
                                        <div className="grid gap-3">
                                            <div className="flex items-center justify-between">
                                                <span>Livraison</span>
                                                <span className="text-[var(--ink)]">
                                                    48h - 72h
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span>Retour</span>
                                                <span className="text-[var(--ink)]">
                                                    30 jours
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span>Garantie</span>
                                                <span className="text-[var(--ink)]">
                                                    2 ans
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span>Support</span>
                                                <span className="text-[var(--ink)]">
                                                    Expert
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span>Paiement</span>
                                                <span className="text-[var(--ink)]">
                                                    3D Secure
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>

                        <aside className="flex h-full flex-col gap-6">
                            <div className="card-glow flex-1 rounded-[24px] border border-white/10 bg-[var(--surface)] p-5">
                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                                    Resume commande
                                </p>

                                <div className="mt-4 space-y-3 text-sm text-[var(--muted)]">
                                    <div className="flex items-center justify-between">
                                        <span>Prix</span>

                                        <span className="text-[var(--ink)]">
                                            {formatMoney(totalPriceCents)}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span>Livraison</span>

                                        <span className="text-[var(--ink)]">
                                            Offerte
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span>Disponibilite</span>

                                        <span className="text-[var(--ink)]">
                                            {stockLabel}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-5 grid gap-3">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            router.post(
                                                route("cart.add", product.id),
                                                {
                                                    accessory_ids:
                                                        selectedAccessoryIds,
                                                    custom_text:
                                                        hasTextAccessory
                                                            ? customText
                                                            : "",
                                                    custom_color:
                                                        hasColorAccessory
                                                            ? customColor
                                                            : "",
                                                    custom_font:
                                                        hasFontAccessory
                                                            ? customFont
                                                            : "",
                                                },
                                            )
                                        }
                                        className="neon-border w-full rounded-full border border-white/15 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                                    >
                                        Ajouter au panier
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            router.post(
                                                route("cart.add", product.id),
                                                {
                                                    accessory_ids:
                                                        selectedAccessoryIds,
                                                    custom_text:
                                                        hasTextAccessory
                                                            ? customText
                                                            : "",
                                                    custom_color:
                                                        hasColorAccessory
                                                            ? customColor
                                                            : "",
                                                    custom_font:
                                                        hasFontAccessory
                                                            ? customFont
                                                            : "",
                                                    onSuccess: () =>
                                                        router.visit(
                                                            route("cart.index"),
                                                        ),
                                                },
                                            )
                                        }
                                        className="w-full rounded-full bg-[linear-gradient(120deg,var(--accent),var(--accent-2))] px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--bg-0)]"
                                    >
                                        Achat express
                                    </button>
                                </div>

                                <div className="mt-4 rounded-2xl border border-white/10 bg-[var(--surface-2)] px-4 py-3 text-xs text-[var(--muted)]">
                                    Paiement securise, livraison suivie et
                                    retours faciles.
                                </div>
                            </div>

                            <div className="card-glow flex h-full flex-col rounded-[24px] border border-white/10 bg-[var(--surface)] p-5 text-sm text-[var(--muted)]">
                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                                    Paiement & services
                                </p>

                                <div className="mt-4 space-y-3 text-sm text-[var(--muted)]">
                                    <div className="flex items-center justify-between">
                                        <span>Paiement securise</span>

                                        <span className="text-[var(--ink)]">
                                            3D Secure
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span>Livraison</span>

                                        <span className="text-[var(--ink)]">
                                            48h - 72h
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span>Retours</span>

                                        <span className="text-[var(--ink)]">
                                            30 jours
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-auto flex justify-center pt-5">
                                    <img
                                        src="/images/logo-barbu.png"
                                        alt="Logo du site"
                                        className="h-8 opacity-80"
                                    />
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>

                <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="card-glow rounded-[24px] border border-white/10 bg-[var(--surface)] p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                            Description
                        </p>

                        <p className="mt-4 text-sm text-[var(--muted)]">
                            {description}
                        </p>
                    </div>

                    <div className="card-glow rounded-[24px] border border-white/10 bg-[var(--surface)] p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                            Fiche technique
                        </p>

                        <div className="mt-4 grid gap-3 text-sm text-[var(--muted)]">
                            <div className="flex items-center justify-between">
                                <span>Marque</span>

                                <span className="text-[var(--ink)]">
                                    {brand}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span>Categories</span>

                                <span className="text-[var(--ink)]">
                                    {category}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span>SKU</span>

                                <span className="text-[var(--ink)]">{sku}</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span>Poids</span>

                                <span className="text-[var(--ink)]">
                                    {weight}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span>Dimensions</span>

                                <span className="text-[var(--ink)]">
                                    {dimensions}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
                    onClick={() => setIsModalOpen(false)}
                >
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="absolute right-6 top-6 rounded-full border border-white/20 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-white"
                    >
                        Fermer
                    </button>

                    <div
                        className="relative max-h-[85vh] w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[var(--surface)]"
                        onClick={(event) => event.stopPropagation()}
                    >
                        {activeImage ? (
                            <img
                                src={activeImage}
                                alt={title}
                                className="h-full w-full object-contain"
                            />
                        ) : (
                            <div className="flex h-[60vh] items-center justify-center text-sm text-[var(--muted)]">
                                Aucune image
                            </div>
                        )}

                        {allImages.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    onClick={goPrev}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                                >
                                    &lt;
                                </button>

                                <button
                                    type="button"
                                    onClick={goNext}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                                >
                                    &gt;
                                </button>
                            </>
                        )}
                    </div>

                    {allImages.length > 1 && (
                        <div className="absolute bottom-6 flex max-w-[90vw] gap-3 overflow-x-auto rounded-2xl bg-black/30 px-4 py-3">
                            {allImages.map((url) => (
                                <button
                                    key={url}
                                    type="button"
                                    onClick={() => setActiveImage(url)}
                                    className={`h-16 w-16 overflow-hidden rounded-xl border ${
                                        activeImage === url
                                            ? "border-[var(--accent)]"
                                            : "border-white/20"
                                    }`}
                                >
                                    <img
                                        src={url}
                                        alt={title}
                                        className="h-full w-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </AuthenticatedLayout>
    );
}
