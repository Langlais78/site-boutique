import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Order, PageProps } from '@/types';

type DashboardProps = {
    recentOrders: Order[];
    stats: {
        orders_count: number;
        total_spent_cents: number;
        currency: string;
    };
};

export default function Dashboard({
    recentOrders = [],
    stats,
}: PageProps<DashboardProps>) {
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
                        Espace client
                    </p>
                    <h2 className="font-['Chakra_Petch'] text-3xl font-semibold text-[var(--ink)]">
                        Dashboard
                    </h2>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-6">
                    <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                        <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                            <span>Commandes</span>
                            <span>{stats.orders_count} total</span>
                        </div>
                        {recentOrders.length === 0 ? (
                            <div className="mt-6 rounded-2xl border border-white/10 bg-[var(--surface-2)] px-5 py-4 text-sm text-[var(--muted)]">
                                Aucune commande pour le moment.
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
                                                    {order.status}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                                                    {formatCurrency(
                                                        order.total_cents,
                                                    )}
                                                </p>
                                                <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                                                    {order.placed_at
                                                        ? new Date(
                                                              order.placed_at,
                                                          ).toLocaleDateString(
                                                              'fr-FR',
                                                          )
                                                        : ''}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                        <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                            <span>Activite recent</span>
                            <span>7 jours</span>
                        </div>
                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                            {[
                                {
                                    label: 'Commandes',
                                    value: stats.orders_count.toString(),
                                },
                                {
                                    label: 'Total depense',
                                    value: formatCurrency(
                                        stats.total_spent_cents,
                                    ),
                                },
                                {
                                    label: 'Retours',
                                    value: '0',
                                },
                                {
                                    label: 'Tickets support',
                                    value: '0',
                                },
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
                </div>

                <div className="space-y-6">
                    <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                        <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                            <span>Profil</span>
                            <span>Complet a 80%</span>
                        </div>
                        <div className="mt-5 space-y-3 text-sm text-[var(--muted)]">
                            <p>
                                Ajoutez votre atelier, vos machines et vos
                                tailles pour des recommandations precises.
                            </p>
                            <Link
                                href={route('profile.edit')}
                                className="inline-flex rounded-full border border-white/15 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                            >
                                Mettre a jour
                            </Link>
                        </div>
                    </div>

                    <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                        <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                            <span>Focus 3D</span>
                            <span>Capsule Fev.</span>
                        </div>
                        <p className="mt-5 text-sm text-[var(--muted)]">
                            Pack complet pour lancer vos impressions carbone
                            avec -10% sur les buses titane.
                        </p>
                        <Link
                            href={route('boutique')}
                            className="mt-4 inline-flex rounded-full bg-[linear-gradient(120deg,var(--accent),var(--accent-2))] px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--bg-0)]"
                        >
                            Voir la capsule
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
