import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps, Product } from '@/types';

type Props = {
    products: Product[];
};

export default function Index({ products = [] }: PageProps<Props>) {
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

    const handleDelete = (productId: number) => {
        if (!confirm('Supprimer ce produit ?')) {
            return;
        }

        router.delete(route('admin.products.destroy', productId));
    };

    return (
        <AuthenticatedLayout
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
                    {products.length} produits
                </p>
                <Link
                    href={route('admin.products.create')}
                    className="rounded-full bg-[linear-gradient(120deg,var(--accent),var(--accent-2))] px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--bg-0)]"
                >
                    Ajouter un produit
                </Link>
            </div>

            <div className="mt-6 space-y-3">
                {products.length === 0 ? (
                    <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">
                        Aucun produit pour le moment.
                    </div>
                ) : (
                    products.map((product) => (
                        <div
                            key={product.id}
                            className="card-glow flex flex-wrap items-center justify-between gap-4 rounded-[24px] border border-white/10 bg-[var(--surface)] px-6 py-4"
                        >
                            <div>
                                <p className="text-lg font-semibold text-[var(--ink)]">
                                    {product.name}
                                </p>
                                <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                                    {product.category ?? '—'} · {product.slug}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-semibold text-[var(--accent)]">
                                    {formatPrice(product)}
                                </p>
                                {formatSale(product) && (
                                    <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                                        Promo {formatSale(product)}
                                    </p>
                                )}
                                <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                                    Stock {product.stock ?? 0} ·{' '}
                                    {product.is_active ? 'Actif' : 'Inactif'}
                                </p>
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                                <Link
                                    href={route(
                                        'admin.products.edit',
                                        product.id,
                                    )}
                                    className="rounded-full border border-white/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                                >
                                    Editer
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => handleDelete(product.id)}
                                    className="rounded-full border border-red-500/40 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-red-300 transition hover:border-red-400 hover:text-red-200"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </AuthenticatedLayout>
    );
}
