import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { CSSProperties } from 'react';

type Product = {
    name: string;
    price: string;
    label: string;
    color: string;
    description: string;
};

const productsBySlug: Record<string, Product> = {
    'veste-oragee': {
        name: 'Veste Oragee',
        price: '89€',
        label: 'Edition limitee',
        color: 'Ardoise',
        description:
            'Coupe structurée et doublure légère. Pièce signature de la capsule urbaine.',
    },
    'sac-horizon': {
        name: 'Sac Horizon',
        price: '69€',
        label: 'Cuir vegetal',
        color: 'Sable',
        description:
            'Format compact, bandoulière réglable, finitions mates premium.',
    },
    'sneakers-halo': {
        name: 'Sneakers Halo',
        price: '120€',
        label: 'Stock serre',
        color: 'Neige',
        description:
            'Semelle amortie, mesh respirant, silhouette contemporaine.',
    },
    'pull-nocturne': {
        name: 'Pull Nocturne',
        price: '74€',
        label: 'Laine merinos',
        color: 'Nuit',
        description:
            'Maille douce, col rond, finition bord-côte minimaliste.',
    },
    'foulard-signal': {
        name: 'Foulard Signal',
        price: '42€',
        label: 'Soie recyclee',
        color: 'Paprika',
        description:
            'Imprimé graphique, léger et facile à nouer, production locale.',
    },
    'pantalon-eclat': {
        name: 'Pantalon Eclat',
        price: '82€',
        label: 'Coupe droite',
        color: 'Argile',
        description:
            'Taille haute, tombé fluide, détail couture visible.',
    },
};

export default function ProductShow({
    auth,
    slug,
}: PageProps<{ slug: string }>) {
    const styleVars = {
        '--ink': '#171410',
        '--paper': '#f7f1e9',
        '--accent': '#ff6b35',
        '--accent-2': '#1b998b',
    } as CSSProperties;
    const product =
        productsBySlug[slug] || {
            name: 'Produit',
            price: '—',
            label: 'Collection',
            color: 'Neutre',
            description:
                'Produit indisponible pour le moment. Revenez plus tard.',
        };

    return (
        <>
            <Head title={product.name} />
            <div
                style={styleVars}
                className="min-h-screen bg-[var(--paper)] text-[var(--ink)]"
            >
                <div className="relative overflow-hidden">
                    <div className="pointer-events-none absolute -left-24 top-[-140px] h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,107,53,0.22),transparent_65%)]"></div>
                    <div className="pointer-events-none absolute right-[-120px] top-16 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle_at_center,rgba(27,153,139,0.2),transparent_60%)] animate-float-slow"></div>

                    <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
                        <div className="flex items-center gap-3 font-['Space_Grotesk'] text-lg font-semibold tracking-wide">
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--ink)] text-[var(--paper)]">
                                SB
                            </span>
                            Studio Boutique
                        </div>
                        <nav className="hidden items-center gap-6 text-sm font-medium uppercase tracking-[0.18em] lg:flex">
                            <Link
                                href="/"
                                className="hover:text-[var(--accent)]"
                            >
                                Accueil
                            </Link>
                            <Link
                                href={route('boutique')}
                                className="hover:text-[var(--accent)]"
                            >
                                Boutique
                            </Link>
                            <span className="h-5 w-px bg-black/20"></span>
                            {auth.user ? (
                                <>
                                    <Link
                                        href={route('dashboard')}
                                        className="hover:text-[var(--accent)]"
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        href={route('profile.edit')}
                                        className="hover:text-[var(--accent)]"
                                    >
                                        Mon compte
                                    </Link>
                                    {auth.user?.is_admin && (
                                        <Link
                                            href={route('admin.dashboard')}
                                            className="hover:text-[var(--accent)]"
                                        >
                                            Admin
                                        </Link>
                                    )}
                                </>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="hover:text-[var(--accent)]"
                                    >
                                        Connexion
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-full bg-[var(--ink)] px-5 py-2 text-[var(--paper)] transition hover:bg-[var(--accent)]"
                                    >
                                        Inscription
                                    </Link>
                                </>
                            )}
                        </nav>
                        <div className="flex items-center gap-3 lg:hidden">
                            <Link
                                href={route('boutique')}
                                className="rounded-full border border-black/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em]"
                            >
                                Boutique
                            </Link>
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-full bg-[var(--ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--paper)]"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="rounded-full bg-[var(--ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--paper)]"
                                    >
                                        Connexion
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-full border border-black/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em]"
                                    >
                                        Inscription
                                    </Link>
                                </>
                            )}
                        </div>
                    </header>

                    <main className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20">
                        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
                            <div className="space-y-6">
                                <div className="rounded-[32px] border border-black/10 bg-white p-6 shadow-[0_30px_80px_rgba(23,20,16,0.18)]">
                                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.25em] text-black/50">
                                        <span>{product.label}</span>
                                        <span>{product.color}</span>
                                    </div>
                                    <div className="mt-6 h-72 rounded-3xl bg-[linear-gradient(135deg,rgba(255,107,53,0.2),rgba(27,153,139,0.2))]"></div>
                                    <div className="mt-4 grid grid-cols-3 gap-3">
                                        {Array.from({ length: 3 }).map(
                                            (_, index) => (
                                                <div
                                                    key={index}
                                                    className="h-20 rounded-2xl bg-[linear-gradient(135deg,rgba(255,107,53,0.1),rgba(27,153,139,0.14))]"
                                                ></div>
                                            ),
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-3 font-['Space_Grotesk']">
                                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-black/60">
                                        Produit
                                    </p>
                                    <h1 className="font-['Fraunces'] text-4xl font-semibold leading-tight text-[var(--ink)]">
                                        {product.name}
                                    </h1>
                                    <p className="text-sm text-black/70">
                                        {product.description}
                                    </p>
                                </div>

                                <div className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_24px_60px_rgba(23,20,16,0.12)]">
                                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.25em] text-black/50">
                                        <span>Prix</span>
                                        <span>{product.price}</span>
                                    </div>
                                    <div className="mt-5 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.2em]">
                                        {['XS', 'S', 'M', 'L', 'XL'].map(
                                            (size) => (
                                                <button
                                                    key={size}
                                                    type="button"
                                                    className="rounded-full border border-black/15 px-4 py-2 text-black/60 transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                                                >
                                                    {size}
                                                </button>
                                            ),
                                        )}
                                    </div>
                                    <div className="mt-6 flex flex-wrap gap-3">
                                        <button
                                            type="button"
                                            className="rounded-full bg-[var(--accent)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                                        >
                                            Ajouter au panier
                                        </button>
                                        <Link
                                            href={route('boutique')}
                                            className="rounded-full border border-black/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                                        >
                                            Retour boutique
                                        </Link>
                                    </div>
                                </div>

                                <div className="rounded-[28px] border border-black/10 bg-white p-6 text-sm text-black/70 shadow-[0_20px_50px_rgba(23,20,16,0.08)]">
                                    Livraison 48h, retours sous 30 jours,
                                    assistance 7j/7.
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
