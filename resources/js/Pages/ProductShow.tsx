import { PageProps, Product } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

export default function ProductShow({
    auth,
    cart,
    product,
}: PageProps<{ product: Product }>) {
    const formatPrice = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: product.currency || 'EUR',
    }).format((product.price_cents || 0) / 100);

    return (
        <>
            <Head title={product.name} />
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
                            className="text-[var(--muted)] hover:text-[var(--accent)]"
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
                        <Link
                            href={route('cart.index')}
                            className="rounded-full border border-white/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em]"
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
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="rounded-full bg-[var(--accent)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--bg-0)]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <Link
                                href={route('login')}
                                className="rounded-full bg-[var(--accent)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--bg-0)]"
                            >
                                Connexion
                            </Link>
                        )}
                    </div>
                </header>

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
            </div>
        </>
    );
}
