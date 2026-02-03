import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
export default function Show({ product }) {
    const formatPrice = (cents, currency) =>
        new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: currency || "EUR",
        }).format(((cents ?? 0) || 0) / 100);
    const images = [product.image, ...(product.images ?? [])].filter(Boolean);
    return (
        <AdminLayout
            header={
                <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--muted)]">
                        Admin
                    </p>
                    <h2 className="font-['Chakra_Petch'] text-3xl font-semibold text-[var(--ink)]">
                        {product.name}
                    </h2>
                </div>
            }
        >
            <Head title={`Admin � ${product.name}`} />

            <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                    href={route("admin.products.index")}
                    className="rounded-full border border-white/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                    Retour
                </Link>
                <Link
                    href={route("admin.products.edit", product.id)}
                    className="rounded-full bg-[linear-gradient(120deg,var(--accent),var(--accent-2))] px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--bg-0)]"
                >
                    Editer
                </Link>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                    <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                        <span>{product.badge ?? "Produit"}</span>
                        <span>{product.color ?? "Barbu Studio"}</span>
                    </div>
                    <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[var(--surface-2)]">
                        {images[0] ? (
                            <img
                                src={images[0]}
                                alt={product.name}
                                className="h-64 w-full object-cover"
                            />
                        ) : (
                            <div className="h-64 w-full bg-[linear-gradient(135deg,rgba(35,240,255,0.2),rgba(255,74,122,0.2))]" />
                        )}
                    </div>
                    {images.length > 1 && (
                        <div className="mt-4 grid grid-cols-4 gap-3">
                            {images.slice(1).map((img, index) => (
                                <div
                                    key={`${img}-${index}`}
                                    className="overflow-hidden rounded-xl border border-white/10 bg-[var(--surface-2)]"
                                >
                                    <img
                                        src={img}
                                        alt=""
                                        className="h-20 w-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <div className="card-glow rounded-[24px] border border-white/10 bg-[var(--surface)] p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                            Prix
                        </p>
                        <p className="mt-3 text-2xl font-semibold text-[var(--ink)]">
                            {formatPrice(
                                product.sale_price_cents ?? product.price_cents,
                                product.currency,
                            )}
                        </p>
                        {product.sale_price_cents && (
                            <p className="mt-2 text-sm text-[var(--muted)] line-through">
                                {formatPrice(
                                    product.price_cents,
                                    product.currency,
                                )}
                            </p>
                        )}
                        <p className="mt-4 text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                            Stock {product.stock ?? 0} �{" "}
                            {product.is_active ? "Actif" : "Inactif"}
                        </p>
                    </div>

                    <div className="card-glow rounded-[24px] border border-white/10 bg-[var(--surface)] p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                            Infos
                        </p>
                        <div className="mt-4 grid gap-2 text-sm text-[var(--muted)]">
                            <p>
                                <span className="text-[var(--ink)]">SKU:</span>{" "}
                                {product.sku ?? "�"}
                            </p>
                            <p>
                                <span className="text-[var(--ink)]">Slug:</span>{" "}
                                {product.slug}
                            </p>
                            <p>
                                <span className="text-[var(--ink)]">
                                    Marque:
                                </span>{" "}
                                {product.brand ?? "�"}
                            </p>
                            <p>
                                <span className="text-[var(--ink)]">
                                    Categorie:
                                </span>{" "}
                                {product.category ?? "�"}
                            </p>
                            {product.weight_grams ? (
                                <p>
                                    <span className="text-[var(--ink)]">
                                        Poids:
                                    </span>{" "}
                                    {product.weight_grams} g
                                </p>
                            ) : null}
                            {product.dimensions ? (
                                <p>
                                    <span className="text-[var(--ink)]">
                                        Dimensions:
                                    </span>{" "}
                                    {product.dimensions.length ?? "�"} x{" "}
                                    {product.dimensions.width ?? "�"} x{" "}
                                    {product.dimensions.height ?? "�"}{" "}
                                    {product.dimensions.unit ?? "cm"}
                                </p>
                            ) : null}
                        </div>
                    </div>

                    {product.categories?.length ? (
                        <div className="card-glow rounded-[24px] border border-white/10 bg-[var(--surface)] p-6">
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                                Categories
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {product.categories.map((category) => (
                                    <span
                                        key={category.id}
                                        className="rounded-full border border-white/10 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]"
                                    >
                                        {category.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <div className="card-glow rounded-[24px] border border-white/10 bg-[var(--surface)] p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                        Resume
                    </p>
                    <p className="mt-3 text-sm text-[var(--muted)]">
                        {product.short_description || product.summary || "�"}
                    </p>
                </div>
                <div className="card-glow rounded-[24px] border border-white/10 bg-[var(--surface)] p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                        Description
                    </p>
                    <p className="mt-3 text-sm text-[var(--muted)]">
                        {product.description || "�"}
                    </p>
                </div>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
                <div className="card-glow rounded-[24px] border border-white/10 bg-[var(--surface)] p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                        Specs
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
                        {(product.specs ?? []).length === 0 ? (
                            <li>�</li>
                        ) : (
                            (product.specs ?? []).map((spec, index) => (
                                <li key={`${spec}-${index}`}>� {spec}</li>
                            ))
                        )}
                    </ul>
                </div>
                <div className="card-glow rounded-[24px] border border-white/10 bg-[var(--surface)] p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                        Tags
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {(product.tags ?? []).length === 0 ? (
                            <span className="text-sm text-[var(--muted)]">
                                �
                            </span>
                        ) : (
                            (product.tags ?? []).map((tag, index) => (
                                <span
                                    key={`${tag}-${index}`}
                                    className="rounded-full border border-white/10 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]"
                                >
                                    {tag}
                                </span>
                            ))
                        )}
                    </div>
                </div>
                <div className="card-glow rounded-[24px] border border-white/10 bg-[var(--surface)] p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                        Variantes
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
                        {(product.variants ?? []).length === 0 ? (
                            <li>�</li>
                        ) : (
                            (product.variants ?? []).map((variant, index) => (
                                <li key={`${variant}-${index}`}>� {variant}</li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </AdminLayout>
    );
}
