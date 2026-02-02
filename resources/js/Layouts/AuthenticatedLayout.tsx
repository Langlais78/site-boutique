import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
            <nav className="border-b border-black/10 bg-[var(--paper)]">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <Link
                            href="/"
                            className="flex items-center gap-3 font-['Space_Grotesk'] text-lg font-semibold tracking-wide"
                        >
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--ink)] text-[var(--paper)]">
                                SB
                            </span>
                            Studio Boutique
                        </Link>

                        <div className="hidden items-center gap-6 text-sm font-medium uppercase tracking-[0.18em] lg:flex">
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
                            <span className="h-5 w-px bg-black/20"></span>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="rounded-full border border-black/15 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
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
                                className="rounded-full border border-black/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em]"
                            >
                                Menu
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' border-t border-black/10 bg-[var(--paper)] lg:hidden'
                    }
                >
                    <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-xs font-semibold uppercase tracking-[0.2em]">
                        <Link href="/">Accueil</Link>
                        <Link href={route('boutique')}>Boutique</Link>
                        <Link href={route('dashboard')}>Dashboard</Link>
                        <Link href={route('profile.edit')}>Mon compte</Link>
                        {user?.is_admin && (
                            <Link href={route('admin.dashboard')}>Admin</Link>
                        )}
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="mt-2 inline-flex w-fit rounded-full border border-black/15 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em]"
                        >
                            Deconnexion
                        </Link>
                        <span className="mt-3 text-[11px] text-black/50">
                            {user.name} · {user.email}
                        </span>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="mx-auto w-full max-w-6xl px-6 pt-10">
                    {header}
                </header>
            )}

            <main className="mx-auto w-full max-w-6xl px-6 pb-16">
                {children}
            </main>
        </div>
    );
}
