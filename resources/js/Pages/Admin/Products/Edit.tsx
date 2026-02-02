import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Category, PageProps, Product } from '@/types';
import ProductForm from './Form';

type ProductFormValues = Product & {
    price: string;
    sale_price?: string;
    specs: string[];
    tags?: string[];
    variants?: string[];
    weight_grams?: number | null;
    dimensions?: {
        length?: number | null;
        width?: number | null;
        height?: number | null;
        unit?: string | null;
    };
    is_active: boolean;
    is_featured?: boolean;
};

export default function Edit({
    product,
    categories = [],
    selectedCategoryIds = [],
}: PageProps<{
    product: ProductFormValues;
    categories: Category[];
    selectedCategoryIds: number[];
}>) {
    return (
        <AdminLayout
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
                    updateAction={route('admin.products.update.post', product.id)}
                    categories={categories}
                    selectedCategoryIds={selectedCategoryIds}
                    initialImage={product.image ?? null}
                    initialImages={product.images ?? []}
                    initialValues={{
                        name: product.name ?? '',
                        slug: product.slug ?? '',
                        sku: product.sku ?? '',
                        price: product.price ?? '',
                        sale_price: product.sale_price ?? '',
                        currency: product.currency ?? 'EUR',
                        badge: product.badge ?? '',
                        color: product.color ?? '',
                        summary: product.summary ?? '',
                        short_description: product.short_description ?? '',
                        description: product.description ?? '',
                        specs: (product.specs ?? []).join('\n'),
                        tags: (product.tags ?? []).join('\n'),
                        variants: (product.variants ?? []).join('\n'),
                        brand: product.brand ?? '',
                        stock: product.stock?.toString() ?? '0',
                        weight_grams: product.weight_grams?.toString() ?? '',
                        dimensions_length:
                            product.dimensions?.length?.toString() ?? '',
                        dimensions_width:
                            product.dimensions?.width?.toString() ?? '',
                        dimensions_height:
                            product.dimensions?.height?.toString() ?? '',
                        dimensions_unit: product.dimensions?.unit ?? 'cm',
                        is_active: product.is_active ?? true,
                        is_featured: product.is_featured ?? false,
                    }}
                />
            </div>
        </AdminLayout>
    );
}
