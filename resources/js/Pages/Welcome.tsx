import { PageProps, Product } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({
    auth,
    cart,
    featuredProducts = [],
}: PageProps<{ featuredProducts?: Product[] }>) {
    const formatPrice = (product: Product) =>
        new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: product.currency || 'EUR',
        }).format((product.price_cents || 0) / 100);

    return (
        <>
            <Head title="Barbu Shop" />
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

                <main className="relative mx-auto w-full max-w-6xl px-6 pb-24 pt-6">
                    <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                        <div className="space-y-6">
                            <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.35em] text-[var(--muted)]">
                                Tech • Impression 3D • Gaming
                            </p>
                            <h1 className="animate-fade-up-delay-1 font-['Chakra_Petch'] text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                                Le shop qui equipe vos setups et vos ateliers.
                            </h1>
                            <p className="animate-fade-up-delay-2 max-w-xl text-base text-[var(--muted)]">
                                Imprimantes 3D, filaments premium, accessoires
                                makers et gear gaming. Stock select, fiches
                                techniques claires, livraison 48h.
                            </p>
                            <div className="flex flex-wrap items-center gap-4">
                                <Link
                                    href={route('boutique')}
                                    className="rounded-full bg-[linear-gradient(120deg,var(--accent),var(--accent-2))] px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--bg-0)] shadow-[0_20px_50px_rgba(38,244,208,0.25)]"
                                >
                                    Explorer la boutique
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="rounded-full border border-white/15 px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                                >
                                    Creer un compte
                                </Link>
                            </div>
                            <div className="mt-8 flex flex-wrap gap-6 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                                <span>Setup ready</span>
                                <span>Support technique</span>
                                <span>Guides d’impression</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                                <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                                    <span>Capsule 3D</span>
                                    <span>02/2026</span>
                                </div>
                                <div className="mt-6 space-y-4">
                                    {[
                                        {
                                            title: 'Imprimante CoreXY',
                                            tag: 'Haute precision',
                                        },
                                        {
                                            title: 'Filament Pro Carbon',
                                            tag: 'Resistant',
                                        },
                                        {
                                            title: 'Kit Buse 0.2/0.4',
                                            tag: 'Detail',
                                        },
                                    ].map((item) => (
                                        <div
                                            key={item.title}
                                            className="rounded-2xl border border-white/10 bg-[var(--surface-2)] px-5 py-4"
                                        >
                                            <p className="text-base font-semibold text-[var(--ink)]">
                                                {item.title}
                                            </p>
                                            <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                                                {item.tag}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="neon-border rounded-[28px] bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">
                                Guides, profils d’impression et presets RGB
                                offerts aux membres.
                            </div>
                        </div>
                    </div>
                </main>

                <section className="relative mx-auto w-full max-w-6xl px-6 pb-24">
                    <div className="grid gap-6 lg:grid-cols-3">
                        {[
                            {
                                title: 'Impression 3D',
                                description:
                                    'Machines, filaments, pieces et upgrades selectionnes.',
                                accent: 'bg-[var(--accent)]',
                            },
                            {
                                title: 'Gaming Lab',
                                description:
                                    'Claviers, souris, audio et mobilier pour setups.',
                                accent: 'bg-[var(--accent-2)]',
                            },
                            {
                                title: 'Atelier maker',
                                description:
                                    'Outils, modules, decoupe et accessoires precis.',
                                accent: 'bg-[var(--accent-3)]',
                            },
                        ].map((card) => (
                            <div
                                key={card.title}
                                className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6"
                            >
                                <div
                                    className={`h-10 w-10 rounded-2xl ${card.accent}`}
                                ></div>
                                <h3 className="mt-4 font-['Chakra_Petch'] text-2xl font-semibold text-[var(--ink)]">
                                    {card.title}
                                </h3>
                                <p className="mt-3 text-sm text-[var(--muted)]">
                                    {card.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="relative mx-auto w-full max-w-6xl px-6 pb-24">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--muted)]">
                                Derniers drops
                            </p>
                            <h2 className="mt-2 font-['Chakra_Petch'] text-3xl font-semibold">
                                Nouveautes tech & gaming
                            </h2>
                        </div>
                        <Link
                            href={route('boutique')}
                            className="rounded-full border border-white/15 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                        >
                            Voir tout
                        </Link>
                    </div>

                    {featuredProducts.length === 0 ? (
                        <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">
                            Aucun produit pour le moment. Ajoutez vos premiers
                            articles depuis l&apos;admin.
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-3">
                            {featuredProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="card-glow rounded-[26px] border border-white/10 bg-[var(--surface)] p-6"
                                >
                                    <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                                        <span>{product.badge ?? 'Drop'}</span>
                                        <span>{product.color ?? 'Tech'}</span>
                                    </div>
                                    <Link
                                        href={route('product.show', product.slug)}
                                        className="mt-6 block h-28 rounded-2xl bg-[linear-gradient(135deg,rgba(38,244,208,0.18),rgba(255,138,61,0.2))]"
                                    ></Link>
                                    <Link
                                        href={route('product.show', product.slug)}
                                        className="mt-4 block text-lg font-semibold text-[var(--ink)] hover:text-[var(--accent)]"
                                    >
                                        {product.name}
                                    </Link>
                                    <p className="mt-2 text-sm text-[var(--muted)]">
                                        {formatPrice(product)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </>
    );
}
