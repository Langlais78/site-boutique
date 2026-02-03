import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
export default function Boutique({ products = [], categories = [], filters }) {
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
    const getImage = (product) => product.image || product.images?.[0] || "";
    return (
        <AuthenticatedLayout>
            <Head title="Boutique" />
            <section className="pt-6">
                <div className="space-y-8">
                    <div className="space-y-4">
                        <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.35em] text-[var(--muted)]">
                            Boutique
                        </p>
                        <h1 className="animate-fade-up-delay-1 font-['Chakra_Petch'] text-4xl font-semibold leading-tight sm:text-5xl">
                            Materiel selectionne pour impression 3D et gaming.
                        </h1>
                        <p className="animate-fade-up-delay-2 max-w-2xl text-base text-[var(--muted)]">
                            Des packs calibres pour performancer vos setups et
                            vos ateliers. Pieces certifiees, conseils
                            techniques, disponibilite immediate.
                        </p>
                    </div>

                    <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                        <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                            <span>Filtres rapides</span>
                            <span>{products.length} articles</span>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                            <Link
                                href={route("boutique")}
                                className={
                                    (!filters?.category
                                        ? "border-[var(--accent)] text-[var(--accent)]"
                                        : "border-white/10 hover:border-[var(--accent)] hover:text-[var(--accent)]") +
                                    " rounded-full border px-4 py-2 transition"
                                }
                            >
                                Tous
                            </Link>
                            {categories.map((category) => {
                                const isActive =
                                    filters?.category === category.slug;
                                return (
                                    <Link
                                        key={category.id}
                                        href={route("boutique", {
                                            category: category.slug,
                                        })}
                                        className={
                                            (isActive
                                                ? "border-[var(--accent)] text-[var(--accent)]"
                                                : "border-white/10 hover:border-[var(--accent)] hover:text-[var(--accent)]") +
                                            " rounded-full border px-4 py-2 transition"
                                        }
                                    >
                                        {category.name}
                                    </Link>
                                );
                            })}
                        </div>
                        <div className="mt-6 rounded-2xl border border-white/10 bg-[var(--surface-2)] p-4 text-sm text-[var(--muted)]">
                            Livraison 48h, support technique et retours 30
                            jours.
                        </div>
                    </div>

                    {products.length === 0 ? (
                        <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">
                            Aucun produit actif. Ajoutez vos premiers articles
                            depuis l'admin.
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="card-glow group relative overflow-hidden rounded-[26px] border border-white/10 bg-[var(--surface)] p-6 transition hover:-translate-y-1"
                                >
                                    <div className="mt-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                                        {product.is_featured ? (
                                            <span className="rounded-full border border-[var(--accent)] px-3 py-1 text-[var(--accent)]">
                                                Best seller
                                            </span>
                                        ) : (
                                            <span className="text-[var(--muted)]">
                                                Selection Barbu Studio
                                            </span>
                                        )}
                                        <span className="text-[var(--muted)]">
                                            Premium
                                        </span>
                                    </div>
                                    <Link
                                        href={route(
                                            "product.show",
                                            product.slug,
                                        )}
                                        className="relative mt-5 block h-44 overflow-hidden rounded-2xl border border-white/10 bg-[var(--surface-2)]"
                                    >
                                        {getImage(product) ? (
                                            <img
                                                src={getImage(product)}
                                                alt={product.name}
                                                className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.04]"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="h-full w-full bg-[linear-gradient(135deg,rgba(38,244,208,0.18),rgba(255,138,61,0.2))]" />
                                        )}
                                        <span className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-[rgba(8,10,18,0.7)] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#23f0ff]">
                                            Impression 3D
                                        </span>
                                    </Link>
                                    <div className="mt-2 flex items-center justify-end">
                                        {product.stock && product.stock > 0 ? (
                                            <span className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-emerald-300">
                                                En stock
                                            </span>
                                        ) : (
                                            <span className="rounded-full border border-red-500/40 bg-red-500/10 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-red-300">
                                                Rupture
                                            </span>
                                        )}
                                    </div>
                                    <Link
                                        href={route(
                                            "product.show",
                                            product.slug,
                                        )}
                                        className="mt-4 block text-lg font-semibold text-[var(--ink)] transition group-hover:text-[var(--accent)]"
                                    >
                                        {product.name}
                                    </Link>
                                    <p className="mt-2 text-sm text-[var(--muted)] line-clamp-2">
                                        {product.short_description ||
                                            product.summary ||
                                            "Produit selectionne par Barbu Studio."}
                                    </p>
                                    <div className="mt-4 flex items-end justify-between">
                                        <div>
                                            <div className="mb-2 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#23f0ff]">
                                                <div className="flex items-center gap-0.5">
                                                    {[0, 1, 2, 3, 4].map(
                                                        (star) => (
                                                            <svg
                                                                key={star}
                                                                aria-hidden="true"
                                                                className="h-3 w-3"
                                                                viewBox="0 0 24 24"
                                                                fill="currentColor"
                                                            >
                                                                <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                                            </svg>
                                                        ),
                                                    )}
                                                </div>
                                                <span className="text-[var(--muted)]">
                                                    4.9
                                                </span>
                                            </div>
                                            <div className="text-sm font-semibold text-[var(--muted)]">
                                                A partir de{" "}
                                                <span className="text-[#23f0ff]">
                                                    {formatPrice(product)}
                                                </span>
                                            </div>
                                            {formatSale(product) && (
                                                <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
                                                    Promo {formatSale(product)}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <Link
                                                href={route(
                                                    "product.show",
                                                    product.slug,
                                                )}
                                                className="rounded-full border border-white/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                                            >
                                                Detail
                                            </Link>
                                            {product.is_personalizable ? (
                                                <Link
                                                    href={route(
                                                        "product.show",
                                                        product.slug,
                                                    )}
                                                    className="rounded-full bg-[linear-gradient(120deg,var(--accent),var(--accent-2))] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--bg-0)] shadow-[0_10px_25px_rgba(38,244,208,0.25)]"
                                                >
                                                    Personnaliser
                                                </Link>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        router.post(
                                                            route(
                                                                "cart.add",
                                                                product.id,
                                                            ),
                                                        )
                                                    }
                                                    className="flex items-center gap-2 rounded-full bg-[linear-gradient(120deg,var(--accent),var(--accent-2))] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--bg-0)] shadow-[0_10px_25px_rgba(38,244,208,0.25)]"
                                                >
                                                    <svg
                                                        aria-hidden="true"
                                                        className="h-3.5 w-3.5"
                                                        viewBox="0 0 24 24"
                                                        fill="currentColor"
                                                    >
                                                        <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.2 6h13.5c.9 0 1.6.8 1.4 1.7l-1.2 6.3c-.2.7-.8 1.2-1.5 1.2H8.1c-.7 0-1.3-.5-1.5-1.2L4.3 3H2V1h3.1c.7 0 1.3.5 1.5 1.2L7.2 6z" />
                                                    </svg>
                                                    Ajouter
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
