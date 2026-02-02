import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import AccessoryForm from './Form';

type AccessoryFormValues = {
    id: number;
    type: string;
    name: string;
    image?: string | null;
    characteristics?: string;
};

export default function Edit({
    accessory,
}: PageProps<{ accessory: AccessoryFormValues }>) {
    return (
        <AdminLayout
            header={
                <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--muted)]">
                        Admin
                    </p>
                    <h2 className="font-['Chakra_Petch'] text-3xl font-semibold text-[var(--ink)]">
                        Modifier accessoire
                    </h2>
                </div>
            }
        >
            <Head title="Modifier accessoire" />

            <div className="mt-8 card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                <AccessoryForm
                    submitLabel="Enregistrer"
                    action={route('admin.accessories.update', accessory.id)}
                    method="put"
                    initialValues={{
                        type: accessory.type ?? '',
                        name: accessory.name ?? '',
                        image: accessory.image ?? '',
                        characteristics: accessory.characteristics ?? '',
                    }}
                />
            </div>
        </AdminLayout>
    );
}
