import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import AccessoryForm from './Form';

export default function Create() {
    return (
        <AdminLayout
            header={
                <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--muted)]">
                        Admin
                    </p>
                    <h2 className="font-['Chakra_Petch'] text-3xl font-semibold text-[var(--ink)]">
                        Nouvel accessoire
                    </h2>
                </div>
            }
        >
            <Head title="Nouvel accessoire" />

            <div className="mt-8 card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                <AccessoryForm
                    submitLabel="Creer"
                    action={route('admin.accessories.store')}
                />
            </div>
        </AdminLayout>
    );
}
