import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useMemo, useState } from "react";
export default function Index({ products = [] }) {
    const [query, setQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const [activeStatus, setActiveStatus] = useState("all");
    const [activeStock, setActiveStock] = useState("all");
    const formatPrice = (product) =>
        new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: product.currency || "EUR",
        }).format((product.price_cents || 0) / 100);
    const formatSale = (product) =>
        product.sale_price_cents
            ? new Intl.NumberFormat("fr-FR", {
                  style: "currency",
                  currency: product.currency || "EUR",
              }).format((product.sale_price_cents || 0) / 100)
            : null;
    const handleDelete = (productId) => {
        if (!confirm("Supprimer ce produit ?")) {
            return;
        }
        router.delete(route("admin.products.destroy", productId));
    };
    const categories = useMemo(() => {
        const list = products.flatMap((product) => product.categories ?? []);
        const unique = new Map();
        list.forEach((category) => {
            if (category) {
                unique.set(category.id, category);
            }
        });
        return Array.from(unique.values());
    }, [products]);
    const filtered = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();
        return products.filter((product) => {
            const matchesQuery =
                normalizedQuery.length === 0 ||
                product.name.toLowerCase().includes(normalizedQuery) ||
                product.slug.toLowerCase().includes(normalizedQuery) ||
                (product.categories ?? []).some((category) =>
                    category.name.toLowerCase().includes(normalizedQuery),
                );
            const matchesCategory =
                activeCategory === "all" ||
                (product.categories ?? []).some(
                    (category) => category.slug === activeCategory,
                );
            const matchesStatus =
                activeStatus === "all" ||
                (activeStatus === "active" && product.is_active) ||
                (activeStatus === "inactive" && !product.is_active);
            const stockValue = product.stock ?? 0;
            const matchesStock =
                activeStock === "all" ||
                (activeStock === "in" && stockValue > 0) ||
                (activeStock === "out" && stockValue <= 0);
            return (
                matchesQuery && matchesCategory && matchesStatus && matchesStock
            );
        });
    }, [products, query, activeCategory, activeStatus, activeStock]);
    const getImage = (product) => product.image || product.images?.[0] || "";
    return (
        <AdminLayout
            header={
                <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--muted)]">
                        Admin
                    </p>
                    <h2 className="font-['Chakra_Petch'] text-3xl font-semibold text-[var(--ink)]">
                        Produits
                    </h2>
                </div>
            }
        >
            <Head title="Admin produits" />

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm text-[var(--muted)]">
                    {filtered.length} produits
                </p>
                <Link
                    href={route("admin.products.create")}
                    className="rounded-full bg-[linear-gradient(120deg,var(--accent),var(--accent-2))] px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--bg-0)]"
                >
                    Ajouter un produit
                </Link>
            </div>

            <div className="mt-6 space-y-6">
                <div className="card-glow rounded-[24px] border border-white/10 bg-[var(--surface)] p-5">
                    <div className="grid gap-4 md:grid-cols-[1.2fr_1fr_1fr]">
                        <div>
                            <label className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                                Recherche
                            </label>
                            <input
                                type="search"
                                value={query}
                                onChange={(event) =>
                                    setQuery(event.target.value)
                                }
                                placeholder="Nom, slug, categorie..."
                                className="mt-2 h-10 w-full rounded-full border border-white/15 bg-[var(--surface-2)] px-4 text-xs uppercase tracking-[0.2em] text-[var(--ink)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                                Categorie
                            </label>
                            <select
                                value={activeCategory}
                                onChange={(event) =>
                                    setActiveCategory(event.target.value)
                                }
                                className="mt-2 h-10 w-full rounded-full border border-white/15 bg-[var(--surface-2)] px-4 text-xs uppercase tracking-[0.2em] text-[var(--ink)] focus:border-[var(--accent)] focus:outline-none"
                            >
                                <option value="all">Toutes</option>
                                {categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.slug}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                            <div>
                                <label className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                                    Statut
                                </label>
                                <select
                                    className="mt-2 h-10 w-full rounded-full border border-white/15 bg-[var(--surface-2)] px-4 text-xs uppercase tracking-[0.2em] text-[var(--ink)] focus:border-[var(--accent)] focus:outline-none"
                                    onChange={(event) =>
                                        setActiveStatus(event.target.value)
                                    }
                                    value={activeStatus}
                                >
                                    <option value="all">Tous</option>
                                    <option value="active">Actif</option>
                                    <option value="inactive">Inactif</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                                    Stock
                                </label>
                                <select
                                    className="mt-2 h-10 w-full rounded-full border border-white/15 bg-[var(--surface-2)] px-4 text-xs uppercase tracking-[0.2em] text-[var(--ink)] focus:border-[var(--accent)] focus:outline-none"
                                    onChange={(event) =>
                                        setActiveStock(event.target.value)
                                    }
                                    value={activeStock}
                                >
                                    <option value="all">Tous</option>
                                    <option value="in">En stock</option>
                                    <option value="out">Rupture</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {filtered.length === 0 ? (
                    <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">
                        Aucun produit pour le moment.
                    </div>
                ) : (
                    <div className="grid gap-6 lg:grid-cols-2">
                        {filtered.map((product) => (
                            <div
                                key={product.id}
                                className="card-glow relative flex flex-col gap-4 rounded-[24px] border border-white/10 bg-[var(--surface)] p-6"
                            >
                                <Link
                                    href={route(
                                        "admin.products.show",
                                        product.id,
                                    )}
                                    className="absolute inset-0 rounded-[24px]"
                                    aria-label={`Voir ${product.name}`}
                                />
                                <div className="relative flex flex-wrap gap-4">
                                    <div className="h-24 w-28 overflow-hidden rounded-2xl border border-white/10 bg-[var(--surface-2)]">
                                        {getImage(product) ? (
                                            <img
                                                src={getImage(product)}
                                                alt={product.name}
                                                className="h-full w-full object-cover"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="h-full w-full bg-[linear-gradient(135deg,rgba(35,240,255,0.2),rgba(255,74,122,0.2))]" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-lg font-semibold text-[var(--ink)]">
                                            {product.name}
                                        </p>
                                        <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                                            {(product.categories?.[0]?.name ??
                                                "Sans categorie") +
                                                " - " +
                                                product.slug}
                                        </p>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {(product.categories ?? [])
                                                .slice(0, 3)
                                                .map((category) => (
                                                    <span
                                                        key={category.id}
                                                        className="rounded-full border border-white/10 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]"
                                                    >
                                                        {category.name}
                                                    </span>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="relative flex flex-wrap items-center justify-between gap-4">
                                    <div>
                                        <p className="text-sm font-semibold text-[var(--accent)]">
                                            {formatPrice(product)}
                                        </p>
                                        {formatSale(product) && (
                                            <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                                                Promo {formatSale(product)}
                                            </p>
                                        )}
                                        <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                                            Stock {product.stock ?? 0} -{" "}
                                            {product.is_active
                                                ? "Actif"
                                                : "Inactif"}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <Link
                                            href={route(
                                                "admin.products.edit",
                                                product.id,
                                            )}
                                            className="relative z-10 rounded-full border border-white/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                                        >
                                            Editer
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDelete(product.id)
                                            }
                                            className="relative z-10 rounded-full border border-red-500/40 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-red-300 transition hover:border-red-400 hover:text-red-200"
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
