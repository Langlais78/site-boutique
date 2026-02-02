import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function AdminDashboard() {
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
                                { label: 'Chiffre d’affaires', value: '24 980€' },
                                { label: 'Commandes', value: '182' },
                                { label: 'Panier moyen', value: '137€' },
                                { label: 'Tickets support', value: '8' },
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
                        <div className="mt-6 space-y-4">
                            {[
                                {
                                    id: 'BS-4210',
                                    customer: 'Lea Martin',
                                    total: '238€',
                                    status: 'Paiement confirme',
                                },
                                {
                                    id: 'BS-4207',
                                    customer: 'Rachid Benali',
                                    total: '114€',
                                    status: 'Preparation',
                                },
                                {
                                    id: 'BS-4203',
                                    customer: 'Alice Moro',
                                    total: '312€',
                                    status: 'Expedition',
                                },
                            ].map((order) => (
                                <div
                                    key={order.id}
                                    className="rounded-2xl border border-white/10 bg-[var(--surface-2)] px-5 py-4"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-base font-semibold text-[var(--ink)]">
                                                {order.id}
                                            </p>
                                            <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                                                {order.customer}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-semibold text-[var(--accent)]">
                                                {order.total}
                                            </p>
                                            <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                                                {order.status}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                        <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                            <span>Stock critique</span>
                            <span>5 items</span>
                        </div>
                        <div className="mt-5 space-y-3 text-sm text-[var(--muted)]">
                            {[
                                'CoreXY Nova - 4',
                                'Filament Pro Carbon - 6',
                                'Souris Vortex - 3',
                                'Buses titane - 5',
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-[var(--surface-2)] px-4 py-3"
                                >
                                    <span>{item}</span>
                                    <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                                        Reassort
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                        <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                            <span>Actions rapides</span>
                            <span>Admin</span>
                        </div>
                        <div className="mt-5 flex flex-col gap-3">
                            {[
                                'Ajouter un produit',
                                'Programmer un drop',
                                'Configurer une promo',
                            ].map((action) => (
                                <button
                                    key={action}
                                    type="button"
                                    className="rounded-full border border-white/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                                >
                                    {action}
                                </button>
                            ))}
                            <Link
                                href={route('boutique')}
                                className="rounded-full bg-[linear-gradient(120deg,var(--accent),var(--accent-2))] px-4 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--bg-0)]"
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
