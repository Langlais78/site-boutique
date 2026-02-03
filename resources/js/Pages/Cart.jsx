import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
export default function Cart({ items = [], summary }) {
    const formatCurrency = (cents) =>
        new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: summary.currency || "EUR",
        }).format((cents || 0) / 100);
    return (
        <AuthenticatedLayout>
            <Head title="Panier" />
            <main className="relative mx-auto w-full max-w-6xl px-6 pb-20">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--muted)]">
                            Panier
                        </p>
                        <h1 className="mt-2 font-['Chakra_Petch'] text-3xl font-semibold">
                            Vos selections
                        </h1>
                    </div>
                    {items.length > 0 && (
                        <button
                            type="button"
                            onClick={() => router.delete(route("cart.clear"))}
                            className="rounded-full border border-white/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--ink)]"
                        >
                            Vider le panier
                        </button>
                    )}
                </div>

                {items.length === 0 ? (
                    <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">
                        Panier vide. Choisissez un produit dans la boutique.
                    </div>
                ) : (
                    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div
                                    key={item.product_id}
                                    className="card-glow rounded-[24px] border border-white/10 bg-[var(--surface)] px-5 py-4"
                                >
                                    <div className="flex flex-wrap items-center justify-between gap-4">
                                        <div>
                                            <Link
                                                href={route(
                                                    "product.show",
                                                    item.slug,
                                                )}
                                                className="text-lg font-semibold text-[var(--ink)] hover:text-[var(--accent)]"
                                            >
                                                {item.name}
                                            </Link>
                                            <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                                                {formatCurrency(
                                                    item.unit_price_cents,
                                                )}{" "}
                                                / unite
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="number"
                                                min={1}
                                                value={item.quantity}
                                                onChange={(event) =>
                                                    router.patch(
                                                        route(
                                                            "cart.update",
                                                            item.product_id,
                                                        ),
                                                        {
                                                            quantity:
                                                                event.target
                                                                    .value,
                                                        },
                                                    )
                                                }
                                                className="w-20 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[var(--ink)]"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    router.delete(
                                                        route(
                                                            "cart.remove",
                                                            item.product_id,
                                                        ),
                                                    )
                                                }
                                                className="rounded-full border border-red-500/40 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-red-300"
                                            >
                                                Retirer
                                            </button>
                                        </div>
                                    </div>
                                    <p className="mt-3 text-sm text-[var(--muted)]">
                                        Total:{" "}
                                        {formatCurrency(item.total_cents)}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                            <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                                <span>Resume</span>
                                <span>{summary.items_count} articles</span>
                            </div>
                            <div className="mt-5 space-y-3 text-sm text-[var(--muted)]">
                                <div className="flex items-center justify-between">
                                    <span>Total</span>
                                    <span className="text-[var(--ink)]">
                                        {formatCurrency(summary.total_cents)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Livraison</span>
                                    <span>48h</span>
                                </div>
                            </div>
                            <button
                                type="button"
                                className="mt-6 w-full rounded-full bg-[linear-gradient(120deg,var(--accent),var(--accent-2))] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--bg-0)]"
                            >
                                Passer commande
                            </button>
                            <Link
                                href={route("boutique")}
                                className="mt-3 block text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)] hover:text-[var(--accent)]"
                            >
                                Continuer vos achats
                            </Link>
                        </div>
                    </div>
                )}
            </main>
        </AuthenticatedLayout>
    );
}
