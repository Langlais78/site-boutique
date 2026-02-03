import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useMemo, useState } from "react";
export default function Index({ accessories = [] }) {
    const [query, setQuery] = useState("");
    const [activeType, setActiveType] = useState("all");
    const types = useMemo(() => {
        const map = new Map();
        accessories.forEach((item) => {
            if (item.type) {
                map.set(item.type.slug, item.type);
            }
        });
        return Array.from(map.values());
    }, [accessories]);
    const filtered = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();
        return accessories.filter((item) => {
            const typeSlug = item.type?.slug ?? "autre";
            const typeLabel = item.type?.name ?? "Type";
            const matchesType = activeType === "all" || typeSlug === activeType;
            const matchesQuery =
                normalizedQuery.length === 0 ||
                item.name.toLowerCase().includes(normalizedQuery) ||
                typeLabel.toLowerCase().includes(normalizedQuery) ||
                typeSlug.toLowerCase().includes(normalizedQuery);
            return matchesType && matchesQuery;
        });
    }, [accessories, activeType, query]);
    const handleDelete = (id) => {
        if (!confirm("Supprimer cet accessoire ?")) {
            return;
        }
        router.delete(route("admin.accessories.destroy", id));
    };
    return (
        <AdminLayout
            header={
                <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--muted)]">
                        Admin
                    </p>
                    <h2 className="font-['Chakra_Petch'] text-3xl font-semibold text-[var(--ink)]">
                        Accessoires
                    </h2>
                </div>
            }
        >
            <Head title="Accessoires" />

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm text-[var(--muted)]">
                    {filtered.length} accessoires
                </p>
                <Link
                    href={route("admin.accessories.create")}
                    className="rounded-full bg-[linear-gradient(120deg,var(--accent),var(--accent-2))] px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--bg-0)]"
                >
                    Ajouter un accessoire
                </Link>
            </div>

            <div className="mt-6 space-y-6">
                <div className="card-glow rounded-[24px] border border-white/10 bg-[var(--surface)] p-5">
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex flex-wrap gap-2 text-[10px] font-semibold uppercase tracking-[0.25em]">
                            <button
                                type="button"
                                onClick={() => setActiveType("all")}
                                className={
                                    activeType === "all"
                                        ? "rounded-full border border-[var(--accent)] px-4 py-2 text-[var(--accent)]"
                                        : "rounded-full border border-white/15 px-4 py-2 text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                                }
                            >
                                Tous
                            </button>
                            {types.map((type) => (
                                <button
                                    key={type.slug}
                                    type="button"
                                    onClick={() => setActiveType(type.slug)}
                                    className={
                                        activeType === type.slug
                                            ? "rounded-full border border-[var(--accent)] px-4 py-2 text-[var(--accent)]"
                                            : "rounded-full border border-white/15 px-4 py-2 text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                                    }
                                >
                                    {type.name}
                                </button>
                            ))}
                        </div>
                        <div className="ml-auto flex w-full items-center sm:w-auto">
                            <input
                                type="search"
                                value={query}
                                onChange={(event) =>
                                    setQuery(event.target.value)
                                }
                                placeholder="Rechercher un accessoire..."
                                className="h-10 w-full rounded-full border border-white/15 bg-[var(--surface-2)] px-4 text-xs uppercase tracking-[0.2em] text-[var(--ink)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none sm:w-72"
                            />
                        </div>
                    </div>
                </div>

                {filtered.length === 0 ? (
                    <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">
                        Aucun accessoire pour le moment.
                    </div>
                ) : (
                    filtered.map((item) => (
                        <div
                            key={item.id}
                            className="card-glow flex flex-wrap items-center justify-between gap-4 rounded-[24px] border border-white/10 bg-[var(--surface)] px-6 py-4"
                        >
                            <div>
                                <p className="text-lg font-semibold text-[var(--ink)]">
                                    {item.name}
                                </p>
                                <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                                    {item.type?.name ?? "Type"}
                                </p>
                                {item.price_cents !== null &&
                                    item.price_cents !== undefined && (
                                        <p className="mt-1 text-xs text-[var(--muted)]">
                                            {(item.price_cents / 100).toFixed(
                                                2,
                                            )}{" "}
                                            EUR
                                        </p>
                                    )}
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                                <Link
                                    href={route(
                                        "admin.accessories.edit",
                                        item.id,
                                    )}
                                    className="rounded-full border border-white/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                                >
                                    Editer
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => handleDelete(item.id)}
                                    className="rounded-full border border-red-500/40 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-red-300 transition hover:border-red-400 hover:text-red-200"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </AdminLayout>
    );
}
