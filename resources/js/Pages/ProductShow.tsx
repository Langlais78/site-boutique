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
        'Produit technique premium, conçu pour performance et durabilité.';
    const specs = product.specs?.length
        ? product.specs
        : ['Garantie 2 ans', 'Support premium', 'Qualite pro'];
    const brand = product.brand || 'Barbu';
    const category = product.category || 'Impression 3D / Gaming';
    const sku = product.sku || 'SKU-0000';
    const weight = product.weight_grams
        ? `${product.weight_grams} g`
        : '—';
    const dimensions = product.dimensions?.length
        ? `${product.dimensions.length}x${product.dimensions.width ?? '-'}x${product.dimensions.height ?? '-'} ${product.dimensions.unit ?? 'cm'}`
        : '—';

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
            <main className="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-6">
                    <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
                        <div className="space-y-6">
                            <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                                <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                                    <span>{badge}</span>
                                    <span>{color}</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (mainImage) {
                                            setActiveImage(mainImage);
                                            setIsModalOpen(true);
                                        }
                                    }}
                                    className="mt-6 block h-72 w-full overflow-hidden rounded-3xl border border-white/10 bg-[var(--surface-2)]"
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
                                <div className="mt-4 grid grid-cols-3 gap-3">
                                    {gallery.length > 0
                                        ? gallery.map((url) => (
                                              <button
                                                  key={url}
                                                  type="button"
                                                  onClick={() => {
                                                      setActiveImage(url);
                                                      setIsModalOpen(true);
                                                  }}
                                                  className="h-20 overflow-hidden rounded-2xl border border-white/10 bg-[var(--surface-2)]"
                                              >
                                                  <img
                                                      src={url}
                                                      alt={title}
                                                      className="h-full w-full object-cover"
                                                      loading="lazy"
                                                  />
                                              </button>
                                          ))
                                        : Array.from({ length: 3 }).map(
                                              (_, index) => (
                                                  <div
                                                      key={index}
                                                      className="h-20 rounded-2xl bg-[linear-gradient(135deg,rgba(38,244,208,0.12),rgba(255,138,61,0.14))]"
                                                  ></div>
                                              ),
                                          )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--muted)]">
                                    Produit
                                </p>
                                <h1 className="font-['Chakra_Petch'] text-4xl font-semibold leading-tight">
                                    {title}
                                </h1>
                                <p className="text-sm text-[var(--muted)]">
                                    {description}
                                </p>
                            </div>

                            <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                                <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                                    <span>Prix</span>
                                    <span>{formatPrice}</span>
                                </div>
                                {formatSale && (
                                    <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
                                        Promo {formatSale}
                                    </p>
                                )}
                                <div className="mt-5 flex flex-wrap gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                                    {specs.map((spec) => (
                                        <span
                                            key={spec}
                                            className="rounded-full border border-white/10 px-4 py-2"
                                        >
                                            {spec}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-6 grid gap-3 text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] sm:grid-cols-2">
                                    <div className="rounded-2xl border border-white/10 bg-[var(--surface-2)] px-4 py-3">
                                        Marque: <span className="text-[var(--ink)]">{brand}</span>
                                    </div>
                                    <div className="rounded-2xl border border-white/10 bg-[var(--surface-2)] px-4 py-3">
                                        Categorie: <span className="text-[var(--ink)]">{category}</span>
                                    </div>
                                    <div className="rounded-2xl border border-white/10 bg-[var(--surface-2)] px-4 py-3">
                                        SKU: <span className="text-[var(--ink)]">{sku}</span>
                                    </div>
                                    <div className="rounded-2xl border border-white/10 bg-[var(--surface-2)] px-4 py-3">
                                        Poids: <span className="text-[var(--ink)]">{weight}</span>
                                    </div>
                                    <div className="rounded-2xl border border-white/10 bg-[var(--surface-2)] px-4 py-3">
                                        Dimensions: <span className="text-[var(--ink)]">{dimensions}</span>
                                    </div>
                                </div>
                                <div className="mt-6 flex flex-wrap gap-3">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            router.post(
                                                route('cart.add', product.id),
                                            )
                                        }
                                        className="rounded-full bg-[linear-gradient(120deg,var(--accent),var(--accent-2))] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--bg-0)]"
                                    >
                                        Ajouter au panier
                                    </button>
                                    <Link
                                        href={route('boutique')}
                                        className="rounded-full border border-white/15 px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                                    >
                                        Retour boutique
                                    </Link>
                                </div>
                            </div>

                            <div className="neon-border rounded-[28px] bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">
                                Livraison 48h, retours 30 jours et support
                                technique maker.
                            </div>
                        </div>
                    </div>
            </main>
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
                                    ‹
                                </button>
                                <button
                                    type="button"
                                    onClick={goNext}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                                >
                                    ›
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
