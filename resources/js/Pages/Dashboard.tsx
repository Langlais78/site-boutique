import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard() {
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
                            <span>02 actives</span>
                        </div>
                        <div className="mt-6 space-y-4">
                            {[
                                {
                                    id: 'BS-4201',
                                    status: 'Preparation',
                                    date: '28 janv. 2026',
                                },
                                {
                                    id: 'BS-4196',
                                    status: 'En livraison',
                                    date: '22 janv. 2026',
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
                                                {order.status}
                                            </p>
                                        </div>
                                        <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                                            {order.date}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                        <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                            <span>Activite recent</span>
                            <span>7 jours</span>
                        </div>
                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                            {[
                                { label: 'Projets impression', value: '3' },
                                { label: 'Presets gaming', value: '4' },
                                { label: 'Favoris', value: '11' },
                                { label: 'Alertes stock', value: '2' },
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
