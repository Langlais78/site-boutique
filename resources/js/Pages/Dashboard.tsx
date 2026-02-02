import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-black/50">
                        Espace client
                    </p>
                    <h2 className="font-['Fraunces'] text-3xl font-semibold text-[var(--ink)]">
                        Tableau de bord
                    </h2>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-6">
                    <div className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_20px_50px_rgba(23,20,16,0.08)]">
                        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.25em] text-black/50">
                            <span>Commandes</span>
                            <span>02 actives</span>
                        </div>
                        <div className="mt-6 space-y-4">
                            {[
                                {
                                    id: 'SB-2381',
                                    status: 'Preparation',
                                    date: '28 janv. 2026',
                                },
                                {
                                    id: 'SB-2372',
                                    status: 'En livraison',
                                    date: '22 janv. 2026',
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
                                            {order.status}
                                        </p>
                                    </div>
                                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-black/60">
                                        {order.date}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_20px_50px_rgba(23,20,16,0.08)]">
                        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.25em] text-black/50">
                            <span>Derniere activite</span>
                            <span>7 jours</span>
                        </div>
                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                            {[
                                { label: 'Articles consultes', value: '12' },
                                { label: 'Favoris', value: '5' },
                                { label: 'Coupons actifs', value: '2' },
                                { label: 'Adresse', value: '1 principale' },
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
                </div>

                <div className="space-y-6">
                    <div className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_24px_60px_rgba(23,20,16,0.12)]">
                        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.25em] text-black/50">
                            <span>Profil</span>
                            <span>Complet a 80%</span>
                        </div>
                        <div className="mt-5 space-y-3 text-sm text-black/70">
                            <p>Adresse principale, preferences et tailles.</p>
                            <Link
                                href={route('profile.edit')}
                                className="inline-flex rounded-full border border-black/15 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                            >
                                Mettre a jour
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_24px_60px_rgba(23,20,16,0.12)]">
                        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.25em] text-black/50">
                            <span>Conseil boutique</span>
                            <span>Capsule fev.</span>
                        </div>
                        <p className="mt-5 text-sm text-black/70">
                            Ajoutez deux pieces pour finaliser votre look de
                            fevrier et obtenir -10% sur les accessoires.
                        </p>
                        <Link
                            href={route('boutique')}
                            className="mt-4 inline-flex rounded-full bg-[var(--accent)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                        >
                            Voir la capsule
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
