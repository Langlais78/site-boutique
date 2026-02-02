import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

type ProductFormData = {
    name: string;
    slug: string;
    price: string;
    currency: string;
    badge: string;
    color: string;
    summary: string;
    description: string;
    specs: string;
    category: string;
    image: string;
    stock: string;
    is_active: boolean;
};

type Props = {
    submitLabel: string;
    action: string;
    method?: 'post' | 'put';
    initialValues?: Partial<ProductFormData>;
};

export default function ProductForm({
    submitLabel,
    action,
    method = 'post',
    initialValues,
}: Props) {
    const { data, setData, post, put, processing, errors } = useForm<ProductFormData>({
        name: initialValues?.name ?? '',
        slug: initialValues?.slug ?? '',
        price: initialValues?.price ?? '',
        currency: initialValues?.currency ?? 'EUR',
        badge: initialValues?.badge ?? '',
        color: initialValues?.color ?? '',
        summary: initialValues?.summary ?? '',
        description: initialValues?.description ?? '',
        specs: initialValues?.specs ?? '',
        category: initialValues?.category ?? '',
        image: initialValues?.image ?? '',
        stock: initialValues?.stock ?? '0',
        is_active: initialValues?.is_active ?? true,
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();
        if (method === 'put') {
            put(action);
            return;
        }
        post(action);
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
                    <InputLabel htmlFor="price" value="Prix (€)" />
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
                    <InputLabel htmlFor="currency" value="Devise" />
                    <TextInput
                        id="currency"
                        name="currency"
                        value={data.currency}
                        className="mt-2 block w-full"
                        onChange={(event) => setData('currency', event.target.value)}
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
                        onChange={(event) => setData('category', event.target.value)}
                    />
                    <InputError message={errors.category} className="mt-2" />
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
                <InputLabel htmlFor="description" value="Description" />
                <textarea
                    id="description"
                    name="description"
                    value={data.description}
                    className="mt-2 block w-full rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-[var(--ink)] shadow-[0_10px_30px_rgba(5,10,20,0.35)]"
                    rows={4}
                    onChange={(event) => setData('description', event.target.value)}
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
                <InputLabel htmlFor="image" value="Image (URL)" />
                <TextInput
                    id="image"
                    name="image"
                    value={data.image}
                    className="mt-2 block w-full"
                    onChange={(event) => setData('image', event.target.value)}
                />
                <InputError message={errors.image} className="mt-2" />
            </div>

            <div className="flex items-center gap-3">
                <input
                    id="is_active"
                    type="checkbox"
                    checked={data.is_active}
                    onChange={(event) => setData('is_active', event.target.checked)}
                    className="h-4 w-4 rounded border-white/20 text-[var(--accent)] focus:ring-[var(--accent)]"
                />
                <label htmlFor="is_active" className="text-sm text-[var(--muted)]">
                    Produit actif
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
