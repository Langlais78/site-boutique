import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps } from '@/types';

type Accessory = {
    id: number;
    type: string;
    name: string;
};

type CustomArcade = {
    id: number;
    name: string;
    box?: Accessory | null;
    screen?: Accessory | null;
    joystick?: Accessory | null;
    console?: Accessory | null;
    skin?: Accessory | null;
    target?: Accessory | null;
};

export default function Index({
    arcades = [],
}: PageProps<{ arcades: CustomArcade[] }>) {
    const handleDelete = (id: number) => {
        if (!confirm('Supprimer cette borne ?')) {
            return;
        }
        router.delete(route('admin.custom-arcades.destroy', id));
    };

    return (
        <AdminLayout
            header={
                <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--muted)]">
                        Admin
                    </p>
                    <h2 className="font-['Chakra_Petch'] text-3xl font-semibold text-[var(--ink)]">
                        Bornes sur mesure
                    </h2>
                </div>
            }
        >
            <Head title="Bornes sur mesure" />

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm text-[var(--muted)]">
                    {arcades.length} bornes
                </p>
                <Link
                    href={route('admin.custom-arcades.create')}
                    className="rounded-full bg-[linear-gradient(120deg,var(--accent),var(--accent-2))] px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--bg-0)]"
                >
                    Ajouter une borne
                </Link>
            </div>

            <div className="mt-6 space-y-3">
                {arcades.length === 0 ? (
                    <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">
                        Aucune configuration pour le moment.
                    </div>
                ) : (
                    arcades.map((item) => (
                        <div
                            key={item.id}
                            className="card-glow flex flex-wrap items-center justify-between gap-4 rounded-[24px] border border-white/10 bg-[var(--surface)] px-6 py-4"
                        >
                            <div>
                                <p className="text-lg font-semibold text-[var(--ink)]">
                                    {item.name}
                                </p>
                                <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                                    {item.box?.name ?? '—'} · {item.screen?.name ?? '—'}
                                </p>
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                                <Link
                                    href={route('admin.custom-arcades.edit', item.id)}
                                    className="rounded-full border border-white/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                                >
                                    Editer
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => handleDelete(item.id)}
                                    className="rounded-full border border-red-500/40 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-red-300 transition hover:border-red-400 hover:text-red-200"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </AdminLayout>
    );
}
