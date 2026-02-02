import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import CustomArcadeForm from './Form';

type Accessory = {
    id: number;
    type: string;
    name: string;
};

type AccessoriesByType = Record<string, Accessory[]>;

type ArcadeFormValues = {
    id: number;
    name: string;
    box_accessory_id?: number | null;
    screen_accessory_id?: number | null;
    joystick_accessory_id?: number | null;
    console_accessory_id?: number | null;
    skin_accessory_id?: number | null;
    target_accessory_id?: number | null;
};

export default function Edit({
    arcade,
    accessories,
}: PageProps<{ arcade: ArcadeFormValues; accessories: AccessoriesByType }>) {
    return (
        <AdminLayout
            header={
                <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--muted)]">
                        Admin
                    </p>
                    <h2 className="font-['Chakra_Petch'] text-3xl font-semibold text-[var(--ink)]">
                        Modifier borne
                    </h2>
                </div>
            }
        >
            <Head title="Modifier borne" />

            <div className="mt-8 card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                <CustomArcadeForm
                    submitLabel="Enregistrer"
                    action={route('admin.custom-arcades.update', arcade.id)}
                    method="put"
                    accessories={accessories}
                    initialValues={arcade}
                />
            </div>
        </AdminLayout>
    );
}
