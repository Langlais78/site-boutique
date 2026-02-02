import { Head, Link, router } from '@inertiajs/react';
import { PageProps } from '@/types';

type CartItem = {
    product_id: number;
    name: string;
    slug: string;
    unit_price_cents: number;
    currency: string;
    quantity: number;
    total_cents: number;
};

type CartSummary = {
    total_cents: number;
    currency: string;
    items_count: number;
};

type CartProps = {
    items: CartItem[];
    summary: CartSummary;
};

export default function Cart({
    auth,
    cart,
    items = [],
    summary,
}: PageProps<CartProps>) {
    const formatCurrency = (cents: number) =>
        new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: summary.currency || 'EUR',
        }).format((cents || 0) / 100);

    return (
        <>
            <Head title="Panier" />
            <div className="min-h-screen bg-tech text-[var(--ink)]">
                <div className="absolute inset-0 bg-grid opacity-70"></div>

                <header className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
                    <div className="flex items-center gap-3 font-['Chakra_Petch'] text-sm font-semibold uppercase tracking-[0.3em]">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent)] text-[var(--bg-0)]">
                            BS
                        </span>
                        Barbu Shop
                    </div>
                    <nav className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-[0.22em] lg:flex">
                        <Link
                            href="/"
                            className="text-[var(--muted)] hover:text-[var(--accent)]"
                        >
                            Accueil
                        </Link>
                        <Link
                            href={route('boutique')}
                            className="text-[var(--muted)] hover:text-[var(--accent)]"
                        >
                            Boutique
                        </Link>
                        <Link
                            href={route('cart.index')}
                            className="text-[var(--accent)]"
                        >
                            <span className="relative">
                                Panier
                                {(cart?.count ?? 0) > 0 && (
                                    <span className="absolute -right-4 -top-3 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[var(--accent)] px-1 text-[9px] font-bold text-[var(--bg-0)]">
                                        {cart?.count}
                                    </span>
                                )}
                            </span>
                        </Link>
                        <span className="h-5 w-px bg-white/10"></span>
                        {auth.user ? (
                            <>
                                <Link
                                    href={route('dashboard')}
                                    className="text-[var(--muted)] hover:text-[var(--accent)]"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href={route('profile.edit')}
                                    className="text-[var(--muted)] hover:text-[var(--accent)]"
                                >
                                    Mon compte
                                </Link>
                                {auth.user?.is_admin && (
                                    <Link
                                        href={route('admin.dashboard')}
                                        className="text-[var(--muted)] hover:text-[var(--accent)]"
                                    >
                                        Admin
                                    </Link>
                                )}
                            </>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="text-[var(--muted)] hover:text-[var(--accent)]"
                                >
                                    Connexion
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="rounded-full bg-[linear-gradient(120deg,var(--accent),var(--accent-2))] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--bg-0)]"
                                >
                                    Inscription
                                </Link>
                            </>
                        )}
                    </nav>
                    <div className="flex items-center gap-3 lg:hidden">
                        <Link
                            href={route('boutique')}
                            className="rounded-full border border-white/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em]"
                        >
                            Boutique
                        </Link>
                    </div>
                </header>

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
                                onClick={() => router.delete(route('cart.clear'))}
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
                                                        'product.show',
                                                        item.slug,
                                                    )}
                                                    className="text-lg font-semibold text-[var(--ink)] hover:text-[var(--accent)]"
                                                >
                                                    {item.name}
                                                </Link>
                                                <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                                                    {formatCurrency(
                                                        item.unit_price_cents,
                                                    )}{' '}
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
                                                                'cart.update',
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
                                                                'cart.remove',
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
                                            Total: {formatCurrency(item.total_cents)}
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
                                    href={route('boutique')}
                                    className="mt-3 block text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)] hover:text-[var(--accent)]"
                                >
                                    Continuer vos achats
                                </Link>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}
