import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode } from 'react';

type AdminLayoutProps = PropsWithChildren<{
    header?: ReactNode;
    subnav?: ReactNode;
}>;

export default function AdminLayout({
    header,
    subnav,
    children,
}: AdminLayoutProps) {
    const page = usePage();

    const isDashboard =
        page.url === '/admin' || page.url.startsWith('/admin/dashboard');
    const isProducts = page.url.startsWith('/admin/products');

    const navItem = (active: boolean) =>
        active
            ? 'rounded-2xl border border-[var(--accent)] px-4 py-3 text-[var(--accent)]'
            : 'rounded-2xl border border-white/15 px-4 py-3 text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]';

    return (
        <AuthenticatedLayout fullWidth>
            <div className="mt-0">
                <div className="grid gap-6 lg:min-h-[calc(100vh-4rem)] lg:grid-cols-[260px_1fr] lg:gap-0">
                    <aside className="card-glow h-full min-h-[calc(100vh-4rem)] border border-white/10 bg-[var(--surface)] px-5 pb-5 pt-8 lg:sticky lg:top-16 lg:self-start lg:rounded-none lg:border-l-0">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                            Pages
                        </p>
                        <div className="mt-4 flex flex-col gap-2 text-[10px] font-semibold uppercase tracking-[0.25em]">
                            <Link
                                href={route('admin.dashboard')}
                                className={navItem(isDashboard)}
                            >
                                Dashboard
                            </Link>
                            <Link
                                href={route('admin.products.index')}
                                className={navItem(isProducts)}
                            >
                                Produits
                            </Link>
                        </div>

                        <div className="my-5 h-px bg-white/10"></div>

                        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                            Actions rapides
                        </p>
                        <div className="mt-4 flex flex-col gap-2 text-[10px] font-semibold uppercase tracking-[0.25em]">
                            <Link
                                href={route('admin.products.create')}
                                className={navItem(false)}
                            >
                                Ajouter un produit
                            </Link>
                            <button type="button" className={navItem(false)}>
                                Programmer un drop
                            </button>
                            <button type="button" className={navItem(false)}>
                                Configurer une promo
                            </button>
                        </div>
                    </aside>

                    <div className="space-y-6 px-6 lg:px-10">
                        {header && (
                            <div className="space-y-2">
                                {header}
                                {subnav && <div className="mt-6">{subnav}</div>}
                            </div>
                        )}
                        {children}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
