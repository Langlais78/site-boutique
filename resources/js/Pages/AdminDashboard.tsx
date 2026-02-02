import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Order, PageProps, Product } from '@/types';

type AdminProps = {
    stats: {
        revenue_cents: number;
        orders_count: number;
        average_cents: number;
        currency: string;
    };
    recentOrders: Order[];
    lowStock: Product[];
};

export default function AdminDashboard({
    stats,
    recentOrders = [],
    lowStock = [],
}: PageProps<AdminProps>) {
    const formatCurrency = (cents: number) =>
        new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: stats.currency || 'EUR',
        }).format((cents || 0) / 100);

    return (
        <AuthenticatedLayout
            header={
                <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--muted)]">
                        Administration
                    </p>
                    <h2 className="font-['Chakra_Petch'] text-3xl font-semibold text-[var(--ink)]">
                        Dashboard admin
                    </h2>
                </div>
            }
        >
            <Head title="Admin" />

            <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="space-y-6">
                    <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                        <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                            <span>Performance</span>
                            <span>30 jours</span>
                        </div>
                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                            {[
                                {
                                    label: 'Chiffre d’affaires',
                                    value: formatCurrency(stats.revenue_cents),
                                },
                                {
                                    label: 'Commandes',
                                    value: stats.orders_count.toString(),
                                },
                                {
                                    label: 'Panier moyen',
                                    value: formatCurrency(stats.average_cents),
                                },
                                { label: 'Tickets support', value: '0' },
                            ].map((stat) => (
                                <div
                                    key={stat.label}
                                    className="rounded-2xl border border-white/10 bg-[var(--surface-2)] px-4 py-4"
                                >
                                    <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                                        {stat.label}
                                    </p>
                                    <p className="mt-2 text-lg font-semibold text-[var(--ink)]">
                                        {stat.value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                        <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                            <span>Commandes recentes</span>
                            <span>Live</span>
                        </div>
                        {recentOrders.length === 0 ? (
                            <div className="mt-6 rounded-2xl border border-white/10 bg-[var(--surface-2)] px-5 py-4 text-sm text-[var(--muted)]">
                                Aucune commande recente.
                            </div>
                        ) : (
                            <div className="mt-6 space-y-4">
                                {recentOrders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="rounded-2xl border border-white/10 bg-[var(--surface-2)] px-5 py-4"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-base font-semibold text-[var(--ink)]">
                                                    {order.number}
                                                </p>
                                                <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                                                    {order.customer ?? 'Client'}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-semibold text-[var(--accent)]">
                                                    {formatCurrency(
                                                        order.total_cents,
                                                    )}
                                                </p>
                                                <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                                                    {order.status}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                        <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                            <span>Stock critique</span>
                            <span>{lowStock.length} items</span>
                        </div>
                        {lowStock.length === 0 ? (
                            <div className="mt-5 rounded-2xl border border-white/10 bg-[var(--surface-2)] px-4 py-3 text-sm text-[var(--muted)]">
                                Aucun stock critique.
                            </div>
                        ) : (
                            <div className="mt-5 space-y-3 text-sm text-[var(--muted)]">
                                {lowStock.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between rounded-2xl border border-white/10 bg-[var(--surface-2)] px-4 py-3"
                                    >
                                        <span>{item.name}</span>
                                        <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                                            {item.stock ?? 0}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                        <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                            <span>Actions rapides</span>
                            <span>Admin</span>
                        </div>
                        <div className="mt-5 flex flex-col gap-3">
                            <Link
                                href={route('admin.products.create')}
                                className="rounded-full border border-white/15 px-4 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                            >
                                Ajouter un produit
                            </Link>
                            <Link
                                href={route('admin.products.index')}
                                className="rounded-full border border-white/15 px-4 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                            >
                                Gérer les produits
                            </Link>
                            <button
                                type="button"
                                className="rounded-full border border-white/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                            >
                                Programmer un drop
                            </button>
                            <button
                                type="button"
                                className="rounded-full border border-white/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                            >
                                Configurer une promo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
