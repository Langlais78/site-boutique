import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Category, PageProps, Product } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

export default function Boutique({
    products = [],
    categories = [],
    filters,
}: PageProps<{
    products?: Product[];
    categories?: Category[];
    filters?: { category?: string };
}>) {
    const formatPrice = (product: Product) =>
        new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: product.currency || 'EUR',
        }).format((product.price_cents || 0) / 100);
    const formatSale = (product: Product) =>
        product.sale_price_cents
            ? new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: product.currency || 'EUR',
              }).format((product.sale_price_cents || 0) / 100)
            : null;
    const getImage = (product: Product) =>
        product.image || product.images?.[0] || '';

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
                            Des packs calibres pour performancer vos setups et vos ateliers.
                            Pieces certifiees, conseils techniques, disponibilite immediate.
                        </p>
                    </div>

                    <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                        <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                            <span>Filtres rapides</span>
                            <span>{products.length} articles</span>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                            <Link
                                href={route('boutique')}
                                className={
                                    (!filters?.category
                                        ? 'border-[var(--accent)] text-[var(--accent)]'
                                        : 'border-white/10 hover:border-[var(--accent)] hover:text-[var(--accent)]') +
                                    ' rounded-full border px-4 py-2 transition'
                                }
                            >
                                Tous
                            </Link>
                            {categories.map((category) => {
                                const isActive = filters?.category === category.slug;
                                return (
                                    <Link
                                        key={category.id}
                                        href={route('boutique', {
                                            category: category.slug,
                                        })}
                                        className={
                                            (isActive
                                                ? 'border-[var(--accent)] text-[var(--accent)]'
                                                : 'border-white/10 hover:border-[var(--accent)] hover:text-[var(--accent)]') +
                                            ' rounded-full border px-4 py-2 transition'
                                        }
                                    >
                                        {category.name}
                                    </Link>
                                );
                            })}
                        </div>
                        <div className="mt-6 rounded-2xl border border-white/10 bg-[var(--surface-2)] p-4 text-sm text-[var(--muted)]">
                            Livraison 48h, support technique et retours 30 jours.
                        </div>
                    </div>

                    {products.length === 0 ? (
                        <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">
                            Aucun produit actif. Ajoutez vos premiers articles depuis
                            l'admin.
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="card-glow rounded-[26px] border border-white/10 bg-[var(--surface)] p-6 transition hover:-translate-y-1"
                                >
                                    <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                                        <span>{product.badge ?? 'Tech'}</span>
                                        <span>{product.color ?? 'Stock'}</span>
                                    </div>
                                    <Link
                                        href={route('product.show', product.slug)}
                                        className="mt-6 block h-36 overflow-hidden rounded-2xl border border-white/10 bg-[var(--surface-2)]"
                                    >
                                        {getImage(product) ? (
                                            <img
                                                src={getImage(product)}
                                                alt={product.name}
                                                className="h-full w-full object-cover"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="h-full w-full bg-[linear-gradient(135deg,rgba(38,244,208,0.18),rgba(255,138,61,0.2))]" />
                                        )}
                                    </Link>
                                    <Link
                                        href={route('product.show', product.slug)}
                                        className="mt-5 block text-lg font-semibold text-[var(--ink)] hover:text-[var(--accent)]"
                                    >
                                        {product.name}
                                    </Link>
                                    <div className="mt-2 flex items-center justify-between text-sm text-[var(--muted)]">
                                        <div className="flex flex-col">
                                            <span>{formatPrice(product)}</span>
                                            {formatSale(product) && (
                                                <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
                                                    Promo {formatSale(product)}
                                                </span>
                                            )}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                router.post(route('cart.add', product.id))
                                            }
                                            className="rounded-full border border-white/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                                        >
                                            Ajouter
                                        </button>
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
