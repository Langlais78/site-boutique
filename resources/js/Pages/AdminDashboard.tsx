import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function AdminDashboard() {
    return (
        <AuthenticatedLayout
            header={
                <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-black/50">
                        Administration
                    </p>
                    <h2 className="font-['Fraunces'] text-3xl font-semibold text-[var(--ink)]">
                        Dashboard admin
                    </h2>
                </div>
            }
        >
            <Head title="Admin" />

            <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="space-y-6">
                    <div className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_20px_50px_rgba(23,20,16,0.08)]">
                        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.25em] text-black/50">
                            <span>Ventes</span>
                            <span>30 jours</span>
                        </div>
                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                            {[
                                { label: 'Chiffre d’affaires', value: '18 420€' },
                                { label: 'Commandes', value: '146' },
                                { label: 'Panier moyen', value: '126€' },
                                { label: 'Taux retour', value: '3.2%' },
                            ].map((stat) => (
                                <div
                                    key={stat.label}
                                    className="rounded-2xl border border-black/10 bg-[var(--paper)] px-4 py-4"
                                >
                                    <p className="text-xs uppercase tracking-[0.18em] text-black/50">
                                        {stat.label}
                                    </p>
                                    <p className="mt-2 text-lg font-semibold text-[var(--ink)]">
                                        {stat.value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_20px_50px_rgba(23,20,16,0.08)]">
                        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.25em] text-black/50">
                            <span>Commandes recentes</span>
                            <span>Voir tout</span>
                        </div>
                        <div className="mt-6 space-y-4">
                            {[
                                {
                                    id: 'SB-2387',
                                    customer: 'Lea Martin',
                                    total: '138€',
                                    status: 'Paiement confirme',
                                },
                                {
                                    id: 'SB-2385',
                                    customer: 'Rachid Benali',
                                    total: '94€',
                                    status: 'Preparation',
                                },
                                {
                                    id: 'SB-2382',
                                    customer: 'Alice Moro',
                                    total: '212€',
                                    status: 'Expedition',
                                },
                            ].map((order) => (
                                <div
                                    key={order.id}
                                    className="flex items-center justify-between rounded-2xl border border-black/10 bg-[var(--paper)] px-5 py-4"
                                >
                                    <div>
                                        <p className="text-base font-semibold text-[var(--ink)]">
                                            {order.id}
                                        </p>
                                        <p className="text-xs uppercase tracking-[0.18em] text-black/50">
                                            {order.customer}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-semibold text-[var(--accent)]">
                                            {order.total}
                                        </p>
                                        <p className="text-xs uppercase tracking-[0.18em] text-black/50">
                                            {order.status}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_24px_60px_rgba(23,20,16,0.12)]">
                        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.25em] text-black/50">
                            <span>Stock critique</span>
                            <span>5 articles</span>
                        </div>
                        <div className="mt-5 space-y-3 text-sm text-black/70">
                            {[
                                'Veste Oragee - 6',
                                'Sac Horizon - 4',
                                'Sneakers Halo - 2',
                                'Foulard Signal - 3',
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center justify-between rounded-2xl border border-black/10 bg-[var(--paper)] px-4 py-3"
                                >
                                    <span>{item}</span>
                                    <span className="text-xs uppercase tracking-[0.18em] text-black/50">
                                        Reassort
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_24px_60px_rgba(23,20,16,0.12)]">
                        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.25em] text-black/50">
                            <span>Actions rapides</span>
                            <span>Admin</span>
                        </div>
                        <div className="mt-5 flex flex-col gap-3">
                            {[
                                'Ajouter un produit',
                                'Creer une capsule',
                                'Lancer une promo',
                            ].map((action) => (
                                <button
                                    key={action}
                                    type="button"
                                    className="rounded-full border border-black/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                                >
                                    {action}
                                </button>
                            ))}
                            <Link
                                href={route('boutique')}
                                className="rounded-full bg-[var(--accent)] px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white"
                            >
                                Voir la boutique
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
