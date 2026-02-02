import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { CSSProperties } from 'react';

const products = [
    {
        name: 'Veste Oragee',
        price: '89€',
        label: 'Edition limitee',
        color: 'Ardoise',
    },
    {
        name: 'Sac Horizon',
        price: '69€',
        label: 'Cuir vegetal',
        color: 'Sable',
    },
    {
        name: 'Sneakers Halo',
        price: '120€',
        label: 'Stock serre',
        color: 'Neige',
    },
    {
        name: 'Pull Nocturne',
        price: '74€',
        label: 'Laine merinos',
        color: 'Nuit',
    },
    {
        name: 'Foulard Signal',
        price: '42€',
        label: 'Soie recyclee',
        color: 'Paprika',
    },
    {
        name: 'Pantalon Eclat',
        price: '82€',
        label: 'Coupe droite',
        color: 'Argile',
    },
];

export default function Boutique({ auth }: PageProps) {
    const styleVars = {
        '--ink': '#171410',
        '--paper': '#f7f1e9',
        '--accent': '#ff6b35',
        '--accent-2': '#1b998b',
    } as CSSProperties;

    return (
        <>
            <Head title="Boutique" />
            <div
                style={styleVars}
                className="min-h-screen bg-[var(--paper)] text-[var(--ink)]"
            >
                <div className="relative overflow-hidden">
                    <div className="pointer-events-none absolute left-10 top-0 h-48 w-48 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,107,53,0.2),transparent_60%)]"></div>
                    <div className="pointer-events-none absolute right-0 top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(27,153,139,0.2),transparent_60%)] animate-float-slow"></div>

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
                                className="text-[var(--accent)]"
                            >
                                Boutique
                            </Link>
                            <span className="h-5 w-px bg-black/20"></span>
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="hover:text-[var(--accent)]"
                                >
                                    Mon espace
                                </Link>
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
                                href="/"
                                className="rounded-full border border-black/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em]"
                            >
                                Accueil
                            </Link>
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-full bg-[var(--ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--paper)]"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href={route('login')}
                                    className="rounded-full bg-[var(--ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--paper)]"
                                >
                                    Connexion
                                </Link>
                            )}
                        </div>
                    </header>

                    <main className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20">
                        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                            <div className="space-y-4 font-['Space_Grotesk']">
                                <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.35em] text-black/60">
                                    Boutique
                                </p>
                                <h1 className="animate-fade-up-delay-1 font-['Fraunces'] text-4xl font-semibold leading-tight sm:text-5xl">
                                    Selection soignee pour un vestiaire
                                    contemporain.
                                </h1>
                                <p className="animate-fade-up-delay-2 max-w-xl text-base text-black/70">
                                    Explorez nos capsules, filtres intelligents
                                    et recommandations personnalisees pour un
                                    shopping fluide.
                                </p>
                            </div>
                            <div className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_24px_60px_rgba(23,20,16,0.12)]">
                                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.25em] text-black/50">
                                    <span>Filtres rapides</span>
                                    <span>6 articles</span>
                                </div>
                                <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.2em]">
                                    {[
                                        'Capsule',
                                        'Accessoires',
                                        'Nouveautes',
                                        'Best-sellers',
                                    ].map((chip) => (
                                        <span
                                            key={chip}
                                            className="rounded-full border border-black/15 px-4 py-2 text-black/60"
                                        >
                                            {chip}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-6 rounded-2xl bg-[var(--paper)] p-4 text-sm text-black/70">
                                    Livraison gratuite des 120€ d&apos;achat
                                    et retours sous 30 jours.
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {products.map((product) => (
                                <div
                                    key={product.name}
                                    className="rounded-[26px] border border-black/10 bg-white p-6 shadow-[0_20px_50px_rgba(23,20,16,0.08)] transition hover:-translate-y-1"
                                >
                                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
                                        <span>{product.label}</span>
                                        <span>{product.color}</span>
                                    </div>
                                    <div className="mt-6 h-36 rounded-2xl bg-[linear-gradient(135deg,rgba(255,107,53,0.16),rgba(27,153,139,0.18))]"></div>
                                    <h3 className="mt-5 text-lg font-semibold text-[var(--ink)]">
                                        {product.name}
                                    </h3>
                                    <div className="mt-2 flex items-center justify-between text-sm text-black/70">
                                        <span>{product.price}</span>
                                        <button
                                            type="button"
                                            className="rounded-full border border-black/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                                        >
                                            Ajouter
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
