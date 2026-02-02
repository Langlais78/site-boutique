import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, Product } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

export default function ProductShow({
    product,
}: PageProps<{ product: Product }>) {
    const formatPrice = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: product.currency || 'EUR',
    }).format((product.price_cents || 0) / 100);

    return (
        <AuthenticatedLayout>
            <Head title={product.name} />
            <main className="relative mx-auto w-full max-w-6xl px-6 pb-20">
                    <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
                        <div className="space-y-6">
                            <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                                <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                                    <span>{product.badge ?? 'Tech'}</span>
                                    <span>{product.color ?? 'Stock'}</span>
                                </div>
                                <div className="mt-6 h-72 rounded-3xl bg-[linear-gradient(135deg,rgba(38,244,208,0.2),rgba(255,138,61,0.2))]"></div>
                                <div className="mt-4 grid grid-cols-3 gap-3">
                                    {Array.from({ length: 3 }).map(
                                        (_, index) => (
                                            <div
                                                key={index}
                                                className="h-20 rounded-2xl bg-[linear-gradient(135deg,rgba(38,244,208,0.12),rgba(255,138,61,0.14))]"
                                            ></div>
                                        ),
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--muted)]">
                                    Produit
                                </p>
                                <h1 className="font-['Chakra_Petch'] text-4xl font-semibold leading-tight">
                                    {product.name}
                                </h1>
                                <p className="text-sm text-[var(--muted)]">
                                    {product.description ?? product.summary}
                                </p>
                            </div>

                            <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                                <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                                    <span>Prix</span>
                                    <span>{formatPrice}</span>
                                </div>
                                <div className="mt-5 flex flex-wrap gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                                    {(product.specs ?? ['—']).map((spec) => (
                                        <span
                                            key={spec}
                                            className="rounded-full border border-white/10 px-4 py-2"
                                        >
                                            {spec}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-6 flex flex-wrap gap-3">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            router.post(
                                                route('cart.add', product.id),
                                            )
                                        }
                                        className="rounded-full bg-[linear-gradient(120deg,var(--accent),var(--accent-2))] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--bg-0)]"
                                    >
                                        Ajouter au panier
                                    </button>
                                    <Link
                                        href={route('boutique')}
                                        className="rounded-full border border-white/15 px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                                    >
                                        Retour boutique
                                    </Link>
                                </div>
                            </div>

                            <div className="neon-border rounded-[28px] bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">
                                Livraison 48h, retours 30 jours et support
                                technique maker.
                            </div>
                        </div>
                    </div>
            </main>
        </AuthenticatedLayout>
    );
}
