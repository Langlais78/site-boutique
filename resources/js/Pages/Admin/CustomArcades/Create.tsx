import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import CustomArcadeForm from './Form';
import { PageProps } from '@/types';

type Accessory = {
    id: number;
    type: string;
    name: string;
};

type AccessoriesByType = Record<string, Accessory[]>;

export default function Create({
    accessories,
}: PageProps<{ accessories: AccessoriesByType }>) {
    return (
        <AdminLayout
            header={
                <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--muted)]">
                        Admin
                    </p>
                    <h2 className="font-['Chakra_Petch'] text-3xl font-semibold text-[var(--ink)]">
                        Nouvelle borne
                    </h2>
                </div>
            }
        >
            <Head title="Nouvelle borne" />

            <div className="mt-8 card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                <CustomArcadeForm
                    submitLabel="Creer"
                    action={route('admin.custom-arcades.store')}
                    accessories={accessories}
                />
            </div>
        </AdminLayout>
    );
}
