import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const page = usePage();
    const user = page.props.auth.user;
    const cartCount = (page.props as { cart?: { count: number } }).cart?.count ?? 0;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-tech text-[var(--ink)]">
            <div className="absolute inset-0 bg-grid opacity-60"></div>
            <nav className="relative border-b border-white/10 bg-[rgba(11,15,20,0.7)] backdrop-blur">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <Link
                            href="/"
                            className="flex items-center gap-3 font-['Chakra_Petch'] text-sm font-semibold uppercase tracking-[0.3em]"
                        >
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent)] text-[var(--bg-0)]">
                                BS
                            </span>
                            Barbu Shop
                        </Link>

                        <div className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-[0.22em] lg:flex">
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
                                    {(cartCount ?? 0) > 0 && (
                                        <span className="absolute -right-4 -top-3 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[var(--accent)] px-1 text-[9px] font-bold text-[var(--bg-0)]">
                                            {cartCount}
                                        </span>
                                    )}
                                </span>
                            </Link>
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
                            {user?.is_admin && (
                                <Link
                                    href={route('admin.dashboard')}
                                    className="text-[var(--muted)] hover:text-[var(--accent)]"
                                >
                                    Admin
                                </Link>
                            )}
                            <span className="h-5 w-px bg-white/10"></span>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="rounded-full border border-white/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                            >
                                Deconnexion
                            </Link>
                        </div>

                        <div className="flex items-center gap-3 lg:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="rounded-full border border-white/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em]"
                            >
                                Menu
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' border-t border-white/10 bg-[rgba(11,15,20,0.85)] lg:hidden'
                    }
                >
                    <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                        <Link href="/" className="hover:text-[var(--accent)]">
                            Accueil
                        </Link>
                        <Link
                            href={route('boutique')}
                            className="hover:text-[var(--accent)]"
                        >
                            Boutique
                        </Link>
                        <Link
                            href={route('cart.index')}
                            className="hover:text-[var(--accent)]"
                        >
                            <span className="relative">
                                Panier
                                {(cartCount ?? 0) > 0 && (
                                    <span className="absolute -right-4 -top-3 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[var(--accent)] px-1 text-[9px] font-bold text-[var(--bg-0)]">
                                        {cartCount}
                                    </span>
                                )}
                            </span>
                        </Link>
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
                        {user?.is_admin && (
                            <Link
                                href={route('admin.dashboard')}
                                className="hover:text-[var(--accent)]"
                            >
                                Admin
                            </Link>
                        )}
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="mt-2 inline-flex w-fit rounded-full border border-white/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--ink)]"
                        >
                            Deconnexion
                        </Link>
                        <span className="mt-3 text-[10px] text-white/50">
                            {user.name} · {user.email}
                        </span>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="relative mx-auto w-full max-w-6xl px-6 pt-10">
                    {header}
                </header>
            )}

            <main className="relative mx-auto w-full max-w-6xl px-6 pb-16">
                {children}
            </main>
        </div>
    );
}
