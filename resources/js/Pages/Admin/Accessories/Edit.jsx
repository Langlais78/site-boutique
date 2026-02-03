import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import AccessoryForm from "./Form";
export default function Edit({ accessory, types = [] }) {
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
                    action={route("admin.accessories.update", accessory.id)}
                    method="put"
                    types={types}
                    initialValues={{
                        type_id: accessory.type_id?.toString() ?? "",
                        name: accessory.name ?? "",
                        price: accessory.price ?? "",
                        image: accessory.image ?? "",
                        characteristics: accessory.characteristics ?? "",
                    }}
                />
            </div>
        </AdminLayout>
    );
}
