import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { CSSProperties } from 'react';

export default function Welcome({ auth }: PageProps) {
    const styleVars = {
        '--ink': '#171410',
        '--paper': '#f7f1e9',
        '--accent': '#ff6b35',
        '--accent-2': '#1b998b',
    } as CSSProperties;

    return (
        <>
            <Head title="Accueil" />
            <div
                style={styleVars}
                className="min-h-screen bg-[var(--paper)] text-[var(--ink)]"
            >
                <div className="relative overflow-hidden">
                    <div className="pointer-events-none absolute -left-24 top-[-140px] h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,107,53,0.28),transparent_65%)]"></div>
                    <div className="pointer-events-none absolute right-[-120px] top-16 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle_at_center,rgba(27,153,139,0.25),transparent_60%)] animate-float-slow"></div>

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
                                <Link
                                    href={route('login')}
                                    className="rounded-full bg-[var(--ink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--paper)]"
                                >
                                    Connexion
                                </Link>
                            )}
                        </div>
                    </header>

                    <main className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 px-6 pb-20 pt-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                        <div className="space-y-6 font-['Space_Grotesk']">
                            <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.35em] text-black/60">
                                Boutique creative
                            </p>
                            <h1 className="animate-fade-up-delay-1 font-['Fraunces'] text-4xl font-semibold leading-tight text-[var(--ink)] sm:text-5xl lg:text-6xl">
                                Un studio de pieces uniques pour habiller vos
                                idees.
                            </h1>
                            <p className="animate-fade-up-delay-2 max-w-xl text-base text-black/70">
                                Lancement d&apos;une boutique expressive :
                                collections capsule, accessoires et editions
                                limitees. Design franc, livraison rapide,
                                retours simples.
                            </p>
                            <div className="flex flex-wrap items-center gap-4">
                                <Link
                                    href={route('boutique')}
                                    className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-[0_18px_40px_rgba(255,107,53,0.3)] transition hover:translate-y-[-1px]"
                                >
                                    Explorer la boutique
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="rounded-full border border-black/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                                >
                                    Creer un compte
                                </Link>
                            </div>
                            <div className="mt-8 flex flex-wrap gap-6 text-xs font-semibold uppercase tracking-[0.2em] text-black/60">
                                <span>Livraison 48h</span>
                                <span>Atelier local</span>
                                <span>Retours 30 jours</span>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="animate-fade-up rounded-[32px] border border-black/10 bg-white p-6 shadow-[0_30px_80px_rgba(23,20,16,0.18)]">
                                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.25em] text-black/50">
                                    <span>Selection du mois</span>
                                    <span>03/2026</span>
                                </div>
                                <div className="mt-6 space-y-4">
                                    {[
                                        {
                                            name: 'Veste Oragee',
                                            price: '89€',
                                            tag: 'Edition limitee',
                                        },
                                        {
                                            name: 'Sac Horizon',
                                            price: '69€',
                                            tag: 'Cuir vegetal',
                                        },
                                        {
                                            name: 'Sneakers Halo',
                                            price: '120€',
                                            tag: 'Stock serre',
                                        },
                                    ].map((item) => (
                                        <div
                                            key={item.name}
                                            className="flex items-center justify-between rounded-2xl border border-black/10 bg-[var(--paper)] px-5 py-4"
                                        >
                                            <div>
                                                <p className="text-base font-semibold text-[var(--ink)]">
                                                    {item.name}
                                                </p>
                                                <p className="text-xs uppercase tracking-[0.18em] text-black/50">
                                                    {item.tag}
                                                </p>
                                            </div>
                                            <div className="text-sm font-semibold text-[var(--accent)]">
                                                {item.price}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-3xl border border-black/10 bg-white/70 backdrop-blur-sm"></div>
                        </div>
                    </main>
                </div>

                <section className="mx-auto w-full max-w-6xl px-6 pb-24">
                    <div className="grid gap-6 lg:grid-cols-3">
                        {[
                            {
                                title: 'Collections capsule',
                                description:
                                    'Pieces limitees inspirees par la ville, renouvelees chaque mois.',
                                accent: 'bg-[var(--accent)]',
                            },
                            {
                                title: 'Service express',
                                description:
                                    'Preparation en 24h, suivi en temps reel et packaging premium.',
                                accent: 'bg-[var(--accent-2)]',
                            },
                            {
                                title: 'Communautes creatrices',
                                description:
                                    'Partenariats locaux avec des ateliers independants.',
                                accent: 'bg-black',
                            },
                        ].map((card) => (
                            <div
                                key={card.title}
                                className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_20px_50px_rgba(23,20,16,0.08)]"
                            >
                                <div
                                    className={`h-10 w-10 rounded-2xl ${card.accent}`}
                                ></div>
                                <h3 className="mt-4 font-['Fraunces'] text-2xl font-semibold text-[var(--ink)]">
                                    {card.title}
                                </h3>
                                <p className="mt-3 text-sm text-black/70">
                                    {card.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}
