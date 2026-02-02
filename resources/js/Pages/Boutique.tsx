import { PageProps, Product } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

export default function Boutique({
    auth,
    cart,
    products = [],
}: PageProps<{ products?: Product[] }>) {
    const formatPrice = (product: Product) =>
        new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: product.currency || 'EUR',
        }).format((product.price_cents || 0) / 100);

    return (
        <>
            <Head title="Boutique" />
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
                            className="text-[var(--accent)]"
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
                            href="/"
                            className="rounded-full border border-white/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em]"
                        >
                            Accueil
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
                    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                        <div className="space-y-4">
                            <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.35em] text-[var(--muted)]">
                                Boutique
                            </p>
                            <h1 className="animate-fade-up-delay-1 font-['Chakra_Petch'] text-4xl font-semibold leading-tight sm:text-5xl">
                                Materiel selectionne pour impression 3D et
                                gaming.
                            </h1>
                            <p className="animate-fade-up-delay-2 max-w-xl text-base text-[var(--muted)]">
                                Des packs calibres pour performancer vos setups
                                et vos ateliers. Pieces certifiees, conseils
                                techniques, disponibilité immediate.
                            </p>
                        </div>
                        <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                            <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                                <span>Filtres rapides</span>
                                <span>{products.length} articles</span>
                            </div>
                            <div className="mt-4 flex flex-wrap gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                                {[
                                    'Imprimantes',
                                    'Filaments',
                                    'Gaming',
                                    'Upgrades',
                                ].map((chip) => (
                                    <span
                                        key={chip}
                                        className="rounded-full border border-white/10 px-4 py-2"
                                    >
                                        {chip}
                                    </span>
                                ))}
                            </div>
                            <div className="mt-6 rounded-2xl border border-white/10 bg-[var(--surface-2)] p-4 text-sm text-[var(--muted)]">
                                Livraison 48h, support technique et retours 30
                                jours.
                            </div>
                        </div>
                    </div>

                    {products.length === 0 ? (
                        <div className="mt-12 card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">
                            Aucun produit actif. Ajoutez vos premiers articles
                            depuis l&apos;admin.
                        </div>
                    ) : (
                        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                                        className="mt-6 block h-36 rounded-2xl bg-[linear-gradient(135deg,rgba(38,244,208,0.18),rgba(255,138,61,0.2))]"
                                    ></Link>
                                    <Link
                                        href={route('product.show', product.slug)}
                                        className="mt-5 block text-lg font-semibold text-[var(--ink)] hover:text-[var(--accent)]"
                                    >
                                        {product.name}
                                    </Link>
                                    <div className="mt-2 flex items-center justify-between text-sm text-[var(--muted)]">
                                        <span>{formatPrice(product)}</span>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                router.post(
                                                    route(
                                                        'cart.add',
                                                        product.id,
                                                    ),
                                                )
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
                </main>
            </div>
        </>
    );
}
