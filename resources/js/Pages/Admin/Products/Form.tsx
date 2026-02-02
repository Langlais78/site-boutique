import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

type ProductFormData = {
    name: string;
    slug: string;
    sku: string;
    price: string;
    sale_price: string;
    currency: string;
    badge: string;
    color: string;
    summary: string;
    short_description: string;
    description: string;
    specs: string;
    tags: string;
    variants: string;
    category: string;
    brand: string;
    stock: string;
    weight_grams: string;
    dimensions_length: string;
    dimensions_width: string;
    dimensions_height: string;
    dimensions_unit: string;
    is_active: boolean;
    is_featured: boolean;
    image_file: File | null;
    images_files: File[];
};

type Props = {
    submitLabel: string;
    action: string;
    method?: 'post' | 'put';
    updateAction?: string;
    initialValues?: Partial<ProductFormData>;
    initialImage?: string | null;
    initialImages?: string[];
};

export default function ProductForm({
    submitLabel,
    action,
    method = 'post',
    updateAction,
    initialValues,
    initialImage,
    initialImages = [],
}: Props) {
    const { data, setData, post, put, processing, errors } = useForm<ProductFormData>({
        name: initialValues?.name ?? '',
        slug: initialValues?.slug ?? '',
        sku: initialValues?.sku ?? '',
        price: initialValues?.price ?? '',
        sale_price: initialValues?.sale_price ?? '',
        currency: initialValues?.currency ?? 'EUR',
        badge: initialValues?.badge ?? '',
        color: initialValues?.color ?? '',
        summary: initialValues?.summary ?? '',
        short_description: initialValues?.short_description ?? '',
        description: initialValues?.description ?? '',
        specs: initialValues?.specs ?? '',
        tags: initialValues?.tags ?? '',
        variants: initialValues?.variants ?? '',
        category: initialValues?.category ?? '',
        brand: initialValues?.brand ?? '',
        stock: initialValues?.stock ?? '0',
        weight_grams: initialValues?.weight_grams ?? '',
        dimensions_length: initialValues?.dimensions_length ?? '',
        dimensions_width: initialValues?.dimensions_width ?? '',
        dimensions_height: initialValues?.dimensions_height ?? '',
        dimensions_unit: initialValues?.dimensions_unit ?? 'cm',
        is_active: initialValues?.is_active ?? true,
        is_featured: initialValues?.is_featured ?? false,
        image_file: null,
        images_files: [],
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();
        if (method === 'put') {
            post(updateAction ?? action, { forceFormData: true });
            return;
        }
        post(action, { forceFormData: true });
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <InputLabel htmlFor="name" value="Nom" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-2 block w-full"
                        onChange={(event) => setData('name', event.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="slug" value="Slug (optionnel)" />
                    <TextInput
                        id="slug"
                        name="slug"
                        value={data.slug}
                        className="mt-2 block w-full"
                        onChange={(event) => setData('slug', event.target.value)}
                    />
                    <InputError message={errors.slug} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="sku" value="SKU / Reference" />
                    <TextInput
                        id="sku"
                        name="sku"
                        value={data.sku}
                        className="mt-2 block w-full"
                        onChange={(event) => setData('sku', event.target.value)}
                    />
                    <InputError message={errors.sku} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="price" value="Prix (EUR)" />
                    <TextInput
                        id="price"
                        name="price"
                        value={data.price}
                        className="mt-2 block w-full"
                        onChange={(event) => setData('price', event.target.value)}
                        required
                    />
                    <InputError message={errors.price} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="sale_price" value="Prix promo (EUR)" />
                    <TextInput
                        id="sale_price"
                        name="sale_price"
                        value={data.sale_price}
                        className="mt-2 block w-full"
                        onChange={(event) =>
                            setData('sale_price', event.target.value)
                        }
                    />
                    <InputError message={errors.sale_price} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="currency" value="Devise" />
                    <TextInput
                        id="currency"
                        name="currency"
                        value={data.currency}
                        className="mt-2 block w-full"
                        onChange={(event) =>
                            setData('currency', event.target.value)
                        }
                    />
                    <InputError message={errors.currency} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="badge" value="Badge" />
                    <TextInput
                        id="badge"
                        name="badge"
                        value={data.badge}
                        className="mt-2 block w-full"
                        onChange={(event) => setData('badge', event.target.value)}
                    />
                    <InputError message={errors.badge} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="color" value="Couleur" />
                    <TextInput
                        id="color"
                        name="color"
                        value={data.color}
                        className="mt-2 block w-full"
                        onChange={(event) => setData('color', event.target.value)}
                    />
                    <InputError message={errors.color} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="category" value="Categorie" />
                    <TextInput
                        id="category"
                        name="category"
                        value={data.category}
                        className="mt-2 block w-full"
                        onChange={(event) =>
                            setData('category', event.target.value)
                        }
                    />
                    <InputError message={errors.category} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="brand" value="Marque" />
                    <TextInput
                        id="brand"
                        name="brand"
                        value={data.brand}
                        className="mt-2 block w-full"
                        onChange={(event) => setData('brand', event.target.value)}
                    />
                    <InputError message={errors.brand} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="stock" value="Stock" />
                    <TextInput
                        id="stock"
                        name="stock"
                        value={data.stock}
                        className="mt-2 block w-full"
                        onChange={(event) => setData('stock', event.target.value)}
                    />
                    <InputError message={errors.stock} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="weight_grams" value="Poids (g)" />
                    <TextInput
                        id="weight_grams"
                        name="weight_grams"
                        value={data.weight_grams}
                        className="mt-2 block w-full"
                        onChange={(event) =>
                            setData('weight_grams', event.target.value)
                        }
                    />
                    <InputError message={errors.weight_grams} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="dimensions_length" value="Dimensions (L)" />
                    <TextInput
                        id="dimensions_length"
                        name="dimensions_length"
                        value={data.dimensions_length}
                        className="mt-2 block w-full"
                        onChange={(event) =>
                            setData('dimensions_length', event.target.value)
                        }
                    />
                </div>

                <div>
                    <InputLabel htmlFor="dimensions_width" value="Dimensions (l)" />
                    <TextInput
                        id="dimensions_width"
                        name="dimensions_width"
                        value={data.dimensions_width}
                        className="mt-2 block w-full"
                        onChange={(event) =>
                            setData('dimensions_width', event.target.value)
                        }
                    />
                </div>

                <div>
                    <InputLabel htmlFor="dimensions_height" value="Dimensions (h)" />
                    <TextInput
                        id="dimensions_height"
                        name="dimensions_height"
                        value={data.dimensions_height}
                        className="mt-2 block w-full"
                        onChange={(event) =>
                            setData('dimensions_height', event.target.value)
                        }
                    />
                </div>

                <div>
                    <InputLabel htmlFor="dimensions_unit" value="Unite" />
                    <TextInput
                        id="dimensions_unit"
                        name="dimensions_unit"
                        value={data.dimensions_unit}
                        className="mt-2 block w-full"
                        onChange={(event) =>
                            setData('dimensions_unit', event.target.value)
                        }
                    />
                </div>
            </div>

            <div>
                <InputLabel htmlFor="summary" value="Resume" />
                <TextInput
                    id="summary"
                    name="summary"
                    value={data.summary}
                    className="mt-2 block w-full"
                    onChange={(event) => setData('summary', event.target.value)}
                />
                <InputError message={errors.summary} className="mt-2" />
            </div>

            <div>
                <InputLabel
                    htmlFor="short_description"
                    value="Description courte"
                />
                <TextInput
                    id="short_description"
                    name="short_description"
                    value={data.short_description}
                    className="mt-2 block w-full"
                    onChange={(event) =>
                        setData('short_description', event.target.value)
                    }
                />
                <InputError message={errors.short_description} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="description" value="Description" />
                <textarea
                    id="description"
                    name="description"
                    value={data.description}
                    className="mt-2 block w-full rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-[var(--ink)] shadow-[0_10px_30px_rgba(5,10,20,0.35)]"
                    rows={4}
                    onChange={(event) =>
                        setData('description', event.target.value)
                    }
                ></textarea>
                <InputError message={errors.description} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="specs" value="Specs (1 par ligne)" />
                <textarea
                    id="specs"
                    name="specs"
                    value={data.specs}
                    className="mt-2 block w-full rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-[var(--ink)] shadow-[0_10px_30px_rgba(5,10,20,0.35)]"
                    rows={3}
                    onChange={(event) => setData('specs', event.target.value)}
                ></textarea>
                <InputError message={errors.specs} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="tags" value="Tags (1 par ligne)" />
                <textarea
                    id="tags"
                    name="tags"
                    value={data.tags}
                    className="mt-2 block w-full rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-[var(--ink)] shadow-[0_10px_30px_rgba(5,10,20,0.35)]"
                    rows={2}
                    onChange={(event) => setData('tags', event.target.value)}
                ></textarea>
                <InputError message={errors.tags} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="variants" value="Variants (1 par ligne)" />
                <textarea
                    id="variants"
                    name="variants"
                    value={data.variants}
                    className="mt-2 block w-full rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-[var(--ink)] shadow-[0_10px_30px_rgba(5,10,20,0.35)]"
                    rows={2}
                    onChange={(event) =>
                        setData('variants', event.target.value)
                    }
                ></textarea>
                <InputError message={errors.variants} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="image_file" value="Image principale (upload)" />
                {initialImage && !data.image_file && (
                    <div className="mt-3 h-32 w-full overflow-hidden rounded-2xl border border-white/10 bg-[var(--surface-2)]">
                        <img
                            src={initialImage}
                            alt="Image principale"
                            className="h-full w-full object-cover"
                        />
                    </div>
                )}
                <input
                    id="image_file"
                    type="file"
                    accept="image/*"
                    className="mt-2 block w-full text-sm text-[var(--muted)]"
                    onChange={(event) =>
                        setData(
                            'image_file',
                            event.target.files?.[0] ?? null,
                        )
                    }
                />
                <InputError message={errors.image_file} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="images_files" value="Galerie (upload multiple)" />
                {initialImages.length > 0 && data.images_files.length === 0 && (
                    <div className="mt-3 grid grid-cols-3 gap-3">
                        {initialImages.map((url) => (
                            <div
                                key={url}
                                className="h-20 overflow-hidden rounded-xl border border-white/10 bg-[var(--surface-2)]"
                            >
                                <img
                                    src={url}
                                    alt="Galerie"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                )}
                <input
                    id="images_files"
                    type="file"
                    accept="image/*"
                    multiple
                    className="mt-2 block w-full text-sm text-[var(--muted)]"
                    onChange={(event) =>
                        setData(
                            'images_files',
                            Array.from(event.target.files ?? []),
                        )
                    }
                />
                <InputError message={errors.images_files} className="mt-2" />
            </div>

            <div className="flex items-center gap-3">
                <input
                    id="is_active"
                    type="checkbox"
                    checked={data.is_active}
                    onChange={(event) =>
                        setData('is_active', event.target.checked)
                    }
                    className="h-4 w-4 rounded border-white/20 text-[var(--accent)] focus:ring-[var(--accent)]"
                />
                <label htmlFor="is_active" className="text-sm text-[var(--muted)]">
                    Produit actif
                </label>
            </div>

            <div className="flex items-center gap-3">
                <input
                    id="is_featured"
                    type="checkbox"
                    checked={data.is_featured}
                    onChange={(event) =>
                        setData('is_featured', event.target.checked)
                    }
                    className="h-4 w-4 rounded border-white/20 text-[var(--accent)] focus:ring-[var(--accent)]"
                />
                <label htmlFor="is_featured" className="text-sm text-[var(--muted)]">
                    Produit mis en avant
                </label>
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <PrimaryButton disabled={processing}>{submitLabel}</PrimaryButton>
                <Link
                    href={route('admin.products.index')}
                    className="rounded-full border border-white/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                    Annuler
                </Link>
            </div>
        </form>
    );
}
