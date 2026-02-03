import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
export default function Authenticated({
    header,
    subnav,
    fullWidth = false,
    children,
}) {
    const page = usePage();
    const user = page.props.auth.user;
    const cartCount = page.props.cart?.count ?? 0;
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    return (
        <div className="min-h-screen bg-tech text-[var(--ink)] flex flex-col">
            <div className="absolute inset-0 bg-grid opacity-60"></div>
            <nav className="relative border-b border-white/10 bg-[rgba(11,15,20,0.7)] backdrop-blur">
                <div className="px-4 sm:px-6 lg:px-10">
                    <div className="relative flex h-16 items-center justify-between">
                        <Link
                            href="/"
                            className="flex items-center gap-3 font-['Chakra_Petch'] text-sm font-semibold uppercase tracking-[0.3em]"
                        >
                            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-transparent text-[var(--bg-0)]">
                                <img
                                    src="/images/logo-barbu.png"
                                    alt="Barbu Shop"
                                    className="block h-12 w-12 object-contain"
                                />
                            </span>
                            Barbu Studio
                        </Link>

                        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 text-xs font-semibold uppercase tracking-[0.22em] lg:flex">
                            <Link
                                href="/"
                                className={
                                    page.url === "/"
                                        ? "text-[var(--accent)]"
                                        : "text-[var(--muted)] hover:text-[var(--accent)]"
                                }
                            >
                                Accueil
                            </Link>
                            <Link
                                href={route("boutique")}
                                className={
                                    page.url.startsWith("/boutique")
                                        ? "text-[var(--accent)]"
                                        : "text-[var(--muted)] hover:text-[var(--accent)]"
                                }
                            >
                                Boutique
                            </Link>
                            <Link
                                href={route("contact")}
                                className={
                                    page.url.startsWith("/contact")
                                        ? "text-[var(--accent)]"
                                        : "text-[var(--muted)] hover:text-[var(--accent)]"
                                }
                            >
                                Contact
                            </Link>
                        </div>

                        <div className="hidden items-center gap-4 text-xs font-semibold uppercase tracking-[0.22em] lg:flex">
                            <Link
                                href={route("cart.index")}
                                className={
                                    "inline-flex items-center justify-center " +
                                    (page.url.startsWith("/panier")
                                        ? "text-[var(--accent)]"
                                        : "text-[var(--muted)] hover:text-[var(--accent)]")
                                }
                                aria-label="Panier"
                                title="Panier"
                            >
                                <span className="relative">
                                    <svg
                                        aria-hidden="true"
                                        className="h-4 w-4"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M6 7h12l-1 12H7L6 7Z" />
                                        <path d="M9 7V6a3 3 0 0 1 6 0v1" />
                                    </svg>
                                    {(cartCount ?? 0) > 0 && (
                                        <span className="absolute -right-4 -top-3 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[var(--accent)] px-1 text-[9px] font-bold text-[var(--bg-0)]">
                                            {cartCount}
                                        </span>
                                    )}
                                </span>
                            </Link>
                            {user ? (
                                <>
                                    {user.is_admin && (
                                        <Link
                                            href={route("admin.dashboard")}
                                            className={
                                                "inline-flex items-center justify-center " +
                                                (page.url.startsWith("/admin")
                                                    ? "text-[var(--accent)]"
                                                    : "text-[var(--muted)] hover:text-[var(--accent)]")
                                            }
                                            aria-label="Admin"
                                            title="Admin"
                                        >
                                            <svg
                                                aria-hidden="true"
                                                className="h-4 w-4"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M7.5 10.5a4.5 4.5 0 1 1 7 3.7l-1.6 1.1v2.2H9.6v-2.2l-1.6-1.1" />
                                                <path d="M5 10.5h2.2" />
                                                <path d="M16.8 10.5H19" />
                                                <path d="M12 3v2.2" />
                                            </svg>
                                        </Link>
                                    )}
                                    <Link
                                        href={route("profile.edit")}
                                        className={
                                            "inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 " +
                                            (page.url.startsWith("/profile") ||
                                            page.url.startsWith("/dashboard")
                                                ? "text-[var(--accent)]"
                                                : "text-[var(--muted)] hover:text-[var(--accent)]")
                                        }
                                        aria-label="Connexion"
                                        title="Connexion"
                                    >
                                        <svg
                                            aria-hidden="true"
                                            className="h-4 w-4"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
                                        </svg>
                                    </Link>
                                    <Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                        className="inline-flex items-center justify-center rounded-full border border-white/15 px-3 py-2 text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                                        aria-label="Deconnexion"
                                        title="Deconnexion"
                                    >
                                        <svg
                                            aria-hidden="true"
                                            className="h-4 w-4"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M15 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" />
                                            <path d="M10 12h9" />
                                            <path d="m16 8 4 4-4 4" />
                                        </svg>
                                    </Link>
                                </>
                            ) : (
                                <Link
                                    href={route("login")}
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                                    aria-label="Connexion"
                                    title="Connexion"
                                >
                                    <svg
                                        aria-hidden="true"
                                        className="h-4 w-4"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                </Link>
                            )}
                            {!user && (
                                <Link
                                    href={route("register")}
                                    className="rounded-full bg-[linear-gradient(120deg,var(--accent),var(--accent-2))] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--bg-0)]"
                                >
                                    Inscription
                                </Link>
                            )}
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
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " border-t border-white/10 bg-[rgba(11,15,20,0.85)] lg:hidden"
                    }
                >
                    <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                        <Link
                            href="/"
                            className={
                                page.url === "/"
                                    ? "text-[var(--accent)]"
                                    : "hover:text-[var(--accent)]"
                            }
                        >
                            Accueil
                        </Link>
                        <Link
                            href={route("boutique")}
                            className={
                                page.url.startsWith("/boutique")
                                    ? "text-[var(--accent)]"
                                    : "hover:text-[var(--accent)]"
                            }
                        >
                            Boutique
                        </Link>
                        <Link
                            href={route("contact")}
                            className={
                                page.url.startsWith("/contact")
                                    ? "text-[var(--accent)]"
                                    : "hover:text-[var(--accent)]"
                            }
                        >
                            Contact
                        </Link>
                        {user ? (
                            <>
                                <Link
                                    href={route("profile.edit")}
                                    className={
                                        page.url.startsWith("/profile") ||
                                        page.url.startsWith("/dashboard")
                                            ? "text-[var(--accent)]"
                                            : "hover:text-[var(--accent)]"
                                    }
                                >
                                    Mon compte
                                </Link>
                                <Link
                                    href={route("cart.index")}
                                    className={
                                        page.url.startsWith("/panier")
                                            ? "text-[var(--accent)]"
                                            : "hover:text-[var(--accent)]"
                                    }
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
                                {user.is_admin && (
                                    <Link
                                        href={route("admin.dashboard")}
                                        className={
                                            page.url.startsWith("/admin")
                                                ? "text-[var(--accent)]"
                                                : "hover:text-[var(--accent)]"
                                        }
                                    >
                                        Admin
                                    </Link>
                                )}
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="mt-2 inline-flex w-fit rounded-full border border-white/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--ink)]"
                                >
                                    Deconnexion
                                </Link>
                                <span className="mt-3 text-[10px] text-white/50">
                                    {user.name} - {user.email}
                                </span>
                            </>
                        ) : (
                            <>
                                <Link
                                    href={route("login")}
                                    className="hover:text-[var(--accent)]"
                                >
                                    Connexion
                                </Link>
                                <Link
                                    href={route("register")}
                                    className="rounded-full bg-[linear-gradient(120deg,var(--accent),var(--accent-2))] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--bg-0)]"
                                >
                                    Inscription
                                </Link>
                                <Link
                                    href={route("cart.index")}
                                    className={
                                        page.url.startsWith("/panier")
                                            ? "text-[var(--accent)]"
                                            : "hover:text-[var(--accent)]"
                                    }
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
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {header && (
                <header
                    className={
                        (fullWidth
                            ? "max-w-none px-6"
                            : "mx-auto max-w-6xl px-6") +
                        " relative w-full pt-10"
                    }
                >
                    <div className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                        {page.url === "/"
                            ? "Accueil"
                            : page.url.replace("/", "").replace("-", " ")}
                    </div>
                    {header}
                    {subnav && <div className="mt-6">{subnav}</div>}
                </header>
            )}

            <main
                className={
                    (fullWidth ? "max-w-none px-0" : "mx-auto max-w-6xl px-6") +
                    " relative w-full pb-16 flex-1"
                }
            >
                {children}
            </main>

            <footer className="relative border-t border-white/10 bg-[rgba(11,15,20,0.7)]">
                <div className="px-6 py-12">
                    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
                                Barbu Studio
                            </p>
                            <p className="mt-3 max-w-md text-sm text-[var(--muted)]">
                                Boutique tech impression 3D & gaming. Produits
                                premium, drops limites, support expert.
                            </p>
                            <div className="mt-4 space-y-2 text-sm text-[var(--muted)]">
                                <p>contact@barbu-studio.fr</p>
                                <p>Lun - Ven : 9h00 - 18h00</p>
                                <p>Samedi : 10h00 - 14h00</p>
                            </div>
                        </div>

                        <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                            <p className="mb-4 text-xs">Boutique</p>
                            <div className="space-y-3">
                                <Link
                                    href="/"
                                    className="hover:text-[var(--accent)]"
                                >
                                    Accueil
                                </Link>
                                <Link
                                    href={route("boutique")}
                                    className="hover:text-[var(--accent)]"
                                >
                                    Boutique
                                </Link>
                                <Link
                                    href={route("contact")}
                                    className="hover:text-[var(--accent)]"
                                >
                                    Contact
                                </Link>
                            </div>
                        </div>

                        <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                            <p className="mb-4 text-xs">Compte</p>
                            <div className="space-y-3">
                                <Link
                                    href={route("cart.index")}
                                    className="hover:text-[var(--accent)]"
                                >
                                    Panier
                                </Link>
                                {user ? (
                                    <Link
                                        href={route("profile.edit")}
                                        className="hover:text-[var(--accent)]"
                                    >
                                        Mon compte
                                    </Link>
                                ) : (
                                    <Link
                                        href={route("login")}
                                        className="hover:text-[var(--accent)]"
                                    >
                                        Connexion
                                    </Link>
                                )}
                            </div>
                        </div>

                        <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                            <p className="mb-4 text-xs">Legal</p>
                            <div className="space-y-3">
                                <Link
                                    href="/cgv"
                                    className="hover:text-[var(--accent)]"
                                >
                                    Conditions de vente
                                </Link>
                                <Link
                                    href="/mentions-legales"
                                    className="hover:text-[var(--accent)]"
                                >
                                    Mentions legales
                                </Link>
                                <Link
                                    href="/confidentialite"
                                    className="hover:text-[var(--accent)]"
                                >
                                    Confidentialite
                                </Link>
                                <Link
                                    href="/retours"
                                    className="hover:text-[var(--accent)]"
                                >
                                    Retours & remboursements
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 flex flex-wrap items-center justify-between gap-4 text-[10px] uppercase tracking-[0.25em] text-[var(--muted)]">
                        <span>© 2026 Barbu Studio. Tous droits reserves.</span>
                        <span>Tech • Impression 3D • Gaming</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
