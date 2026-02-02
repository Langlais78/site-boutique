import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Order, PageProps, Product } from '@/types';

type AdminProps = {
    stats: {
        revenue_cents: number;
        orders_count: number;
        average_cents: number;
        products_count: number;
        featured_count: number;
        out_of_stock: number;
        low_stock: number;
        currency: string;
    };
    ordersByStatus: Array<{ status: string; count: number }>;
    recentOrders: Order[];
    recentProducts: Product[];
    recentUsers: Array<{ id: number; name: string; email: string; created_at: string }>;
    lowStock: Product[];
};

export default function AdminDashboard({
    stats,
    ordersByStatus = [],
    recentOrders = [],
    recentProducts = [],
    recentUsers = [],
    lowStock = [],
}: PageProps<AdminProps>) {
    const formatCurrency = (cents: number) =>
        new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: stats.currency || 'EUR',
        }).format((cents || 0) / 100);

    return (
        <AdminLayout
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

            <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {[
                        {
                            label: "Chiffre d'affaires",
                            value: formatCurrency(stats.revenue_cents),
                            note: '30 jours',
                        },
                        {
                            label: 'Commandes',
                            value: stats.orders_count.toString(),
                            note: '30 jours',
                        },
                        {
                            label: 'Panier moyen',
                            value: formatCurrency(stats.average_cents),
                            note: '30 jours',
                        },
                        {
                            label: 'Produits actifs',
                            value: stats.products_count.toString(),
                            note: `${stats.featured_count} en vedette`,
                        },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="card-glow rounded-[24px] border border-white/10 bg-[var(--surface)] p-5"
                        >
                            <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                                {stat.label}
                            </p>
                            <p className="mt-2 text-2xl font-semibold text-[var(--ink)]">
                                {stat.value}
                            </p>
                            <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                                {stat.note}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
                    <div className="space-y-6">
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

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                                <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                                    <span>Derniers produits</span>
                                    <span>{recentProducts.length}</span>
                                </div>
                                {recentProducts.length === 0 ? (
                                    <div className="mt-5 rounded-2xl border border-white/10 bg-[var(--surface-2)] px-4 py-3 text-sm text-[var(--muted)]">
                                        Aucun produit recent.
                                    </div>
                                ) : (
                                    <div className="mt-5 space-y-3 text-sm text-[var(--muted)]">
                                        {recentProducts.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex items-center justify-between rounded-2xl border border-white/10 bg-[var(--surface-2)] px-4 py-3"
                                            >
                                                <span>{item.name}</span>
                                                <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                                                    {item.stock ?? 0} stock
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                                <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                                    <span>Nouveaux clients</span>
                                    <span>{recentUsers.length}</span>
                                </div>
                                {recentUsers.length === 0 ? (
                                    <div className="mt-5 rounded-2xl border border-white/10 bg-[var(--surface-2)] px-4 py-3 text-sm text-[var(--muted)]">
                                        Aucun client recent.
                                    </div>
                                ) : (
                                    <div className="mt-5 space-y-3 text-sm text-[var(--muted)]">
                                        {recentUsers.map((user) => (
                                            <div
                                                key={user.id}
                                                className="rounded-2xl border border-white/10 bg-[var(--surface-2)] px-4 py-3"
                                            >
                                                <p className="font-semibold text-[var(--ink)]">
                                                    {user.name}
                                                </p>
                                                <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                                                    {user.email}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                            <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                                <span>Pilotage commandes</span>
                                <span>30 jours</span>
                            </div>
                            {ordersByStatus.length === 0 ? (
                                <div className="mt-5 rounded-2xl border border-white/10 bg-[var(--surface-2)] px-4 py-3 text-sm text-[var(--muted)]">
                                    Aucun statut disponible.
                                </div>
                            ) : (
                                <div className="mt-5 space-y-3 text-sm text-[var(--muted)]">
                                    {ordersByStatus.map((item) => (
                                        <div
                                            key={item.status}
                                            className="flex items-center justify-between rounded-2xl border border-white/10 bg-[var(--surface-2)] px-4 py-3"
                                        >
                                            <span>{item.status}</span>
                                            <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                                                {item.count}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                            <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                                <span>Stock critique</span>
                                <span>{lowStock.length} items</span>
                            </div>
                            <div className="mt-4 grid gap-3 text-xs text-[var(--muted)]">
                                <div className="rounded-2xl border border-white/10 bg-[var(--surface-2)] px-4 py-3">
                                    <div className="flex items-center justify-between">
                                        <span>Rupture</span>
                                        <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                                            {stats.out_of_stock}
                                        </span>
                                    </div>
                                    <div className="mt-2 flex items-center justify-between">
                                        <span>Stock faible</span>
                                        <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                                            {stats.low_stock}
                                        </span>
                                    </div>
                                </div>
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
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
