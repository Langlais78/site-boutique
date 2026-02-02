import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Category, PageProps } from '@/types';
import ProductForm from './Form';

export default function Create({
    categories = [],
}: PageProps<{ categories: Category[] }>) {
    return (
        <AdminLayout
            header={
                <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--muted)]">
                        Admin
                    </p>
                    <h2 className="font-['Chakra_Petch'] text-3xl font-semibold text-[var(--ink)]">
                        Nouveau produit
                    </h2>
                </div>
            }
        >
            <Head title="Nouveau produit" />

            <div className="mt-8 card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                <ProductForm
                    submitLabel="Creer"
                    action={route('admin.products.store')}
                    categories={categories}
                />
            </div>
        </AdminLayout>
    );
}
