import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import ProductForm from "./ProductForm";
export default function Editor({
    product,
    categories = [],
    accessories = [],
    accessoryTypes = [],
    selectedCategoryIds = [],
    selectedAccessoryIds = [],
}) {
    const isEdit = Boolean(product?.id);
    const title = isEdit ? "Modifier produit" : "Nouveau produit";
    const submitLabel = isEdit ? "Enregistrer" : "Creer";
    const action = isEdit
        ? route("admin.products.update", product?.id)
        : route("admin.products.store");
    const updateAction = isEdit
        ? route("admin.products.update.post", product?.id)
        : undefined;
    return (
        <AdminLayout
            header={
                <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--muted)]">
                        Admin
                    </p>
                    <h2 className="font-['Chakra_Petch'] text-3xl font-semibold text-[var(--ink)]">
                        {title}
                    </h2>
                </div>
            }
        >
            <Head title={title} />

            <div className="mt-8 card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                <ProductForm
                    submitLabel={submitLabel}
                    action={action}
                    method={isEdit ? "put" : "post"}
                    updateAction={updateAction}
                    categories={categories}
                    accessories={accessories}
                    accessoryTypes={accessoryTypes}
                    selectedCategoryIds={selectedCategoryIds}
                    selectedAccessoryIds={selectedAccessoryIds}
                    initialImage={product?.image ?? null}
                    initialImages={product?.images ?? []}
                    initialValues={
                        product
                            ? {
                                  name: product.name ?? "",
                                  slug: product.slug ?? "",
                                  sku: product.sku ?? "",
                                  price: product.price ?? "",
                                  sale_price: product.sale_price ?? "",
                                  currency: product.currency ?? "EUR",
                                  badge: product.badge ?? "",
                                  color: product.color ?? "",
                                  summary: product.summary ?? "",
                                  short_description:
                                      product.short_description ?? "",
                                  description: product.description ?? "",
                                  specs: (product.specs ?? []).join("\n"),
                                  tags: (product.tags ?? []).join("\n"),
                                  variants: (product.variants ?? []).join("\n"),
                                  brand: product.brand ?? "",
                                  stock: product.stock?.toString() ?? "0",
                                  weight_grams:
                                      product.weight_grams?.toString() ?? "",
                                  dimensions_length:
                                      product.dimensions?.length?.toString() ??
                                      "",
                                  dimensions_width:
                                      product.dimensions?.width?.toString() ??
                                      "",
                                  dimensions_height:
                                      product.dimensions?.height?.toString() ??
                                      "",
                                  dimensions_unit:
                                      product.dimensions?.unit ?? "cm",
                                  is_active: product.is_active ?? true,
                                  is_featured: product.is_featured ?? false,
                                  is_personalizable:
                                      product.is_personalizable ?? false,
                              }
                            : undefined
                    }
                />
            </div>
        </AdminLayout>
    );
}
