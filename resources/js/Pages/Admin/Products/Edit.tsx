import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps, Product } from '@/types';
import ProductForm from './Form';

type ProductFormValues = Product & {
    price: string;
    specs: string[];
    is_active: boolean;
};

export default function Edit({
    product,
}: PageProps<{ product: ProductFormValues }>) {
    return (
        <AuthenticatedLayout
            header={
                <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--muted)]">
                        Admin
                    </p>
                    <h2 className="font-['Chakra_Petch'] text-3xl font-semibold text-[var(--ink)]">
                        Modifier produit
                    </h2>
                </div>
            }
        >
            <Head title="Modifier produit" />

            <div className="mt-8 card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                <ProductForm
                    submitLabel="Enregistrer"
                    action={route('admin.products.update', product.id)}
                    method="put"
                    initialValues={{
                        name: product.name ?? '',
                        slug: product.slug ?? '',
                        price: product.price ?? '',
                        currency: product.currency ?? 'EUR',
                        badge: product.badge ?? '',
                        color: product.color ?? '',
                        summary: product.summary ?? '',
                        description: product.description ?? '',
                        specs: (product.specs ?? []).join('\n'),
                        category: product.category ?? '',
                        image: product.image ?? '',
                        stock: product.stock?.toString() ?? '0',
                        is_active: product.is_active ?? true,
                    }}
                />
            </div>
        </AuthenticatedLayout>
    );
}
