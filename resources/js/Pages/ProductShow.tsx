import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, Product } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function ProductShow({
    product,
}: PageProps<{ product: Product }>) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeImage, setActiveImage] = useState<string | null>(null);

    const title = product.name || 'Produit tech';
    const badge = product.badge || 'Tech';
    const color = product.color || 'Standard';
    const description =
        product.description ||
        product.short_description ||
        product.summary ||
        'Produit technique premium, concu pour performance et durabilite.';
    const specs = product.specs?.length
        ? product.specs
        : ['Garantie 2 ans', 'Support premium', 'Qualite pro'];
    const brand = product.brand || 'Barbu';
    const category =
        product.categories && product.categories.length > 0
            ? product.categories.map((item) => item.name).join(', ')
            : product.category || 'Impression 3D / Gaming';
    const sku = product.sku || 'SKU-0000';
    const weight = product.weight_grams ? `${product.weight_grams} g` : '-';
    const dimensions = product.dimensions?.length
        ? `${product.dimensions.length}x${product.dimensions.width ?? '-'}x${product.dimensions.height ?? '-'} ${product.dimensions.unit ?? 'cm'}`
        : '-';
    const stockLabel =
        product.stock !== undefined && product.stock !== null
            ? product.stock > 0
                ? `En stock (${product.stock})`
                : 'Rupture'
            : 'Disponible';

    const formatPrice = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: product.currency || 'EUR',
    }).format((product.price_cents || 0) / 100);
    const formatSale = product.sale_price_cents
        ? new Intl.NumberFormat('fr-FR', {
              style: 'currency',
              currency: product.currency || 'EUR',
          }).format((product.sale_price_cents || 0) / 100)
        : null;
    const mainImage = product.image || '';
    const gallery = (product.images ?? []).filter((value) => Boolean(value)) as string[];
    const allImages = [mainImage, ...gallery].filter(Boolean) as string[];
    const activeIndex = activeImage
        ? Math.max(0, allImages.indexOf(activeImage))
        : 0;
    const goPrev = () => {
        if (allImages.length === 0) return;
        const nextIndex =
            (activeIndex - 1 + allImages.length) % allImages.length;
        setActiveImage(allImages[nextIndex]);
    };
    const goNext = () => {
        if (allImages.length === 0) return;
        const nextIndex = (activeIndex + 1) % allImages.length;
        setActiveImage(allImages[nextIndex]);
    };

    return (
        <AuthenticatedLayout>
            <Head title={title} />

            <section className="pt-6">
                <div className="space-y-10">
                    <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                            <span className="rounded-full border border-white/10 px-3 py-1">
                                {badge}
                            </span>
                            <span className="rounded-full border border-white/10 px-3 py-1">
                                {color}
                            </span>
                            <span className="rounded-full border border-white/10 px-3 py-1">
                                {brand}
                            </span>
                        </div>
                        <h1 className="font-['Chakra_Petch'] text-4xl font-semibold leading-tight">
                            {title}
                        </h1>
                        <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                            <span className="text-[var(--accent)]">4.6/5</span>
                            <span>212 avis</span>
                        </div>
                        <p className="max-w-4xl text-sm text-[var(--muted)]">
                            {description}
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-[1.1fr_1.2fr_0.8fr] lg:items-start">
                        <div className="space-y-4">
                            <div className="card-glow rounded-[24px] border border-white/10 bg-[var(--surface)] p-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (mainImage) {
                                            setActiveImage(mainImage);
                                            setIsModalOpen(true);
                                        }
                                    }}
                                    className="block h-[420px] w-full overflow-hidden rounded-2xl border border-white/10 bg-[var(--surface-2)]"
                                >
                                    {mainImage ? (
                                        <img
                                            src={mainImage}
                                            alt={title}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="h-full w-full bg-[linear-gradient(135deg,rgba(38,244,208,0.2),rgba(255,138,61,0.2))]" />
                                    )}
                                </button>
                                <div className="mt-3 grid grid-cols-5 gap-2">
                                    {allImages.length > 0
                                        ? allImages.slice(0, 5).map((url) => (
                                              <button
                                                  key={url}
                                                  type="button"
                                                  onClick={() => {
                                                      setActiveImage(url);
                                                      setIsModalOpen(true);
                                                  }}
                                                  className="h-16 overflow-hidden rounded-xl border border-white/10 bg-[var(--surface-2)]"
                                              >
                                                  <img
                                                      src={url}
                                                      alt={title}
                                                      className="h-full w-full object-cover"
                                                      loading="lazy"
                                                  />
                                              </button>
                                          ))
                                        : Array.from({ length: 5 }).map(
                                              (_, index) => (
                                                  <div
                                                      key={index}
                                                      className="h-16 rounded-xl bg-[linear-gradient(135deg,rgba(38,244,208,0.12),rgba(255,138,61,0.14))]"
                                                  ></div>
                                              ),
                                          )}
                                </div>
                                <p className="mt-3 text-xs text-[var(--muted)]">
                                    Survolez ou cliquez pour zoomer
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="card-glow rounded-[24px] border border-white/10 bg-[var(--surface)] p-6">
                                <div className="flex items-baseline justify-between">
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
                                            Prix
                                        </p>
                                        <p className="mt-2 text-3xl font-semibold text-[var(--ink)]">
                                            {formatSale ?? formatPrice}
                                        </p>
                                        {formatSale && (
                                            <p className="text-sm text-[var(--muted)] line-through">
                                                {formatPrice}
                                            </p>
                                        )}
                                    </div>
                                    <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                                        {stockLabel}
                                    </span>
                                </div>
                                <div className="mt-6 grid gap-3 text-sm text-[var(--muted)]">
                                    <div className="flex items-center justify-between">
                                        <span>Expedition</span>
                                        <span className="text-[var(--ink)]">48h - 72h</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Retours</span>
                                        <span className="text-[var(--ink)]">30 jours</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Categories</span>
                                        <span className="text-[var(--ink)]">{category}</span>
                                    </div>
                                </div>
                                <div className="mt-6 flex flex-wrap gap-3">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            router.post(route('cart.add', product.id))
                                        }
                                        className="rounded-full bg-[linear-gradient(120deg,var(--accent),var(--accent-2))] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--bg-0)]"
                                    >
                                        Ajouter au panier
                                    </button>
                                    <button
                                        type="button"
                                        className="rounded-full border border-white/15 px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                                    >
                                        Acheter maintenant
                                    </button>
                                </div>
                            </div>

                            <div className="card-glow rounded-[24px] border border-white/10 bg-[var(--surface)] p-6">
                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                                    Points forts
                                </p>
                                <ul className="mt-4 grid gap-2 text-sm text-[var(--muted)]">
                                    {specs.map((spec) => (
                                        <li key={spec} className="flex gap-2">
                                            <span className="text-[var(--accent)]">•</span>
                                            <span>{spec}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <aside className="space-y-4">
                            <div className="card-glow rounded-[24px] border border-white/10 bg-[var(--surface)] p-5">
                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                                    Resume commande
                                </p>
                                <div className="mt-4 space-y-3 text-sm text-[var(--muted)]">
                                    <div className="flex items-center justify-between">
                                        <span>Prix</span>
                                        <span className="text-[var(--ink)]">
                                            {formatSale ?? formatPrice}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Livraison</span>
                                        <span className="text-[var(--ink)]">Offerte</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Disponibilite</span>
                                        <span className="text-[var(--ink)]">{stockLabel}</span>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() =>
                                        router.post(route('cart.add', product.id))
                                    }
                                    className="mt-5 w-full rounded-full bg-[linear-gradient(120deg,var(--accent),var(--accent-2))] px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--bg-0)]"
                                >
                                    Ajouter au panier
                                </button>
                                <Link
                                    href={route('boutique')}
                                    className="mt-3 block w-full rounded-full border border-white/15 px-4 py-3 text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                                >
                                    Continuer mes achats
                                </Link>
                                <div className="mt-4 rounded-2xl border border-white/10 bg-[var(--surface-2)] px-4 py-3 text-xs text-[var(--muted)]">
                                    Paiement securise, livraison suivie et retours faciles.
                                </div>
                            </div>

                            <div className="card-glow rounded-[24px] border border-white/10 bg-[var(--surface)] p-5 text-sm text-[var(--muted)]">
                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                                    Infos produit
                                </p>
                                <div className="mt-4 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span>SKU</span>
                                        <span className="text-[var(--ink)]">{sku}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Poids</span>
                                        <span className="text-[var(--ink)]">{weight}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Dimensions</span>
                                        <span className="text-[var(--ink)]">
                                            {dimensions}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>

                <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="card-glow rounded-[24px] border border-white/10 bg-[var(--surface)] p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                            Description
                        </p>
                        <p className="mt-4 text-sm text-[var(--muted)]">
                            {description}
                        </p>
                    </div>
                    <div className="card-glow rounded-[24px] border border-white/10 bg-[var(--surface)] p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                            Fiche technique
                        </p>
                        <div className="mt-4 grid gap-3 text-sm text-[var(--muted)]">
                            <div className="flex items-center justify-between">
                                <span>Marque</span>
                                <span className="text-[var(--ink)]">{brand}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Categories</span>
                                <span className="text-[var(--ink)]">{category}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>SKU</span>
                                <span className="text-[var(--ink)]">{sku}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Poids</span>
                                <span className="text-[var(--ink)]">{weight}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Dimensions</span>
                                <span className="text-[var(--ink)]">
                                    {dimensions}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
                    onClick={() => setIsModalOpen(false)}
                >
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="absolute right-6 top-6 rounded-full border border-white/20 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-white"
                    >
                        Fermer
                    </button>
                    <div
                        className="relative max-h-[85vh] w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[var(--surface)]"
                        onClick={(event) => event.stopPropagation()}
                    >
                        {activeImage ? (
                            <img
                                src={activeImage}
                                alt={title}
                                className="h-full w-full object-contain"
                            />
                        ) : (
                            <div className="flex h-[60vh] items-center justify-center text-sm text-[var(--muted)]">
                                Aucune image
                            </div>
                        )}

                        {allImages.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    onClick={goPrev}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                                >
                                    &lt;
                                </button>
                                <button
                                    type="button"
                                    onClick={goNext}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                                >
                                    &gt;
                                </button>
                            </>
                        )}
                    </div>
                    {allImages.length > 1 && (
                        <div className="absolute bottom-6 flex max-w-[90vw] gap-3 overflow-x-auto rounded-2xl bg-black/30 px-4 py-3">
                            {allImages.map((url) => (
                                <button
                                    key={url}
                                    type="button"
                                    onClick={() => setActiveImage(url)}
                                    className={`h-16 w-16 overflow-hidden rounded-xl border ${
                                        activeImage === url
                                            ? 'border-[var(--accent)]'
                                            : 'border-white/20'
                                    }`}
                                >
                                    <img
                                        src={url}
                                        alt={title}
                                        className="h-full w-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </AuthenticatedLayout>
    );
}
