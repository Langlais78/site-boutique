import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Order, PageProps } from '@/types';
import UpdateProfileInformationForm from './Profile/Partials/UpdateProfileInformationForm';
import UpdatePasswordForm from './Profile/Partials/UpdatePasswordForm';
import DeleteUserForm from './Profile/Partials/DeleteUserForm';
import { useState } from 'react';

type DashboardProps = {
    recentOrders: Order[];
    orderHistory: Order[];
    stats: {
        orders_count: number;
        total_spent_cents: number;
        currency: string;
    };
    mustVerifyEmail: boolean;
    status?: string;
};

export default function Dashboard({
    auth,
    recentOrders = [],
    orderHistory = [],
    stats,
    mustVerifyEmail,
    status,
}: PageProps<DashboardProps>) {
    const tabs = [
        { key: 'overview', label: 'Vue d\'ensemble' },
        { key: 'profil', label: 'Profil' },
        { key: 'commandes', label: 'Commandes' },
        { key: 'modifier', label: 'Modifier' },
    ] as const;
    const [activeTab, setActiveTab] =
        useState<(typeof tabs)[number]['key']>('overview');

    const formatCurrency = (cents: number) =>
        new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: stats.currency || 'EUR',
        }).format((cents || 0) / 100);
    const formatDate = (value?: string | null) =>
        value ? new Date(value).toLocaleDateString('fr-FR') : '-';
    const lastOrder = recentOrders[0];

    return (
        <AuthenticatedLayout
            header={
                <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--muted)]">
                        Espace client
                    </p>
                    <h2 className="font-['Chakra_Petch'] text-3xl font-semibold text-[var(--ink)]">
                        Tableau de bord
                    </h2>
                </div>
            }
            subnav={
                <div className="flex flex-wrap gap-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                    {tabs.map((item) => {
                        const isActive = activeTab === item.key;
                        return (
                            <button
                                key={item.key}
                                type="button"
                                onClick={() => setActiveTab(item.key)}
                                className={
                                    'rounded-full border px-4 py-2 transition ' +
                                    (isActive
                                        ? 'border-[var(--accent)] text-[var(--accent)]'
                                        : 'border-white/15 hover:border-[var(--accent)] hover:text-[var(--accent)]')
                                }
                            >
                                {item.label}
                            </button>
                        );
                    })}
                </div>
            }
        >
            <Head title="Dashboard" />

            <div id="tabs" className="mt-10 space-y-6">
                <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--muted)]">
                        Mon compte
                    </p>
                    <h3 className="font-['Chakra_Petch'] text-2xl font-semibold text-[var(--ink)]">
                        Profil et commandes
                    </h3>
                </div>

                {activeTab === 'overview' && (
                    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                        <div className="space-y-6">
                            <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                                <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                                    <span>Resume client</span>
                                    <span>Cette annee</span>
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
                                            label: 'Derniere commande',
                                            value: formatDate(
                                                lastOrder?.placed_at,
                                            ),
                                        },
                                        {
                                            label: 'Statut',
                                            value: lastOrder?.status ?? '-',
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

                            <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                                <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                                    <span>Dernieres commandes</span>
                                    <span>{recentOrders.length}</span>
                                </div>
                                {recentOrders.length === 0 ? (
                                    <div className="mt-6 rounded-2xl border border-white/10 bg-[var(--surface-2)] px-5 py-4 text-sm text-[var(--muted)]">
                                        Aucune commande pour le moment.
                                    </div>
                                ) : (
                                    <div className="mt-6 divide-y divide-white/5 rounded-2xl border border-white/10 bg-[var(--surface-2)]">
                                        {recentOrders.map((order) => (
                                            <div
                                                key={order.id}
                                                className="flex flex-wrap items-center justify-between gap-4 px-5 py-4"
                                            >
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
                                                        {formatDate(
                                                            order.placed_at,
                                                        )}
                                                    </p>
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
                                    <span>Compte client</span>
                                    <span>
                                        {mustVerifyEmail ? 'A verifier' : 'Verifie'}
                                    </span>
                                </div>
                                <div className="mt-5 space-y-3 text-sm text-[var(--muted)]">
                                    <p className="text-base font-semibold text-[var(--ink)]">
                                        {auth.user?.name}
                                    </p>
                                    <p>{auth.user?.email}</p>
                                    <div className="mt-3 flex flex-wrap gap-3">
                                        <Link
                                            href={route('boutique')}
                                            className="inline-flex rounded-full bg-[linear-gradient(120deg,var(--accent),var(--accent-2))] px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--bg-0)]"
                                        >
                                            Continuer mes achats
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                                <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                                    <span>Service client</span>
                                    <span>Assistance</span>
                                </div>
                                <p className="mt-4 text-sm text-[var(--muted)]">
                                    Besoin d'aide ? Accedez aux retours,
                                    garanties et support technique.
                                </p>
                                <div className="mt-4 flex flex-wrap gap-3">
                                    <button
                                        type="button"
                                        className="rounded-full border border-white/15 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                                    >
                                        Ouvrir un ticket
                                    </button>
                                    <button
                                        type="button"
                                        className="rounded-full border border-white/15 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                                    >
                                        Suivi livraison
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'profil' && (
                    <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                        <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                            <span>Informations</span>
                            <span>Compte</span>
                        </div>
                        <div className="mt-6 space-y-4 text-sm text-[var(--muted)]">
                            <div className="rounded-2xl border border-white/10 bg-[var(--surface-2)] px-5 py-4">
                                <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                                    Nom
                                </p>
                                <p className="mt-2 text-base font-semibold text-[var(--ink)]">
                                    {auth.user?.name}
                                </p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-[var(--surface-2)] px-5 py-4">
                                <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                                    Email
                                </p>
                                <p className="mt-2 text-base font-semibold text-[var(--ink)]">
                                    {auth.user?.email}
                                </p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-[var(--surface-2)] px-5 py-4">
                                <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                                    Verification
                                </p>
                                <p className="mt-2 text-base font-semibold text-[var(--ink)]">
                                    {mustVerifyEmail ? 'A verifier' : 'Verifie'}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'commandes' && (
                    <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                        <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                            <span>Historique</span>
                            <span>{orderHistory.length} commandes</span>
                        </div>
                        {orderHistory.length === 0 ? (
                            <div className="mt-6 rounded-2xl border border-white/10 bg-[var(--surface-2)] px-5 py-4 text-sm text-[var(--muted)]">
                                Aucune commande pour le moment.
                            </div>
                        ) : (
                            <div className="mt-6 space-y-4">
                                {orderHistory.map((order) => (
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
                                                    {order.status} -{' '}
                                                    {order.items_count ?? 0}{' '}
                                                    articles
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-semibold text-[var(--accent)]">
                                                    {formatCurrency(
                                                        order.total_cents,
                                                    )}
                                                </p>
                                                <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                                                    {formatDate(order.placed_at)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'modifier' && (
                    <div className="space-y-6">
                        <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </div>
                        <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>
                        <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                            <DeleteUserForm className="max-w-xl" />
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
