import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, Product } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({
    featuredProducts = [],
}: PageProps<{ featuredProducts?: Product[] }>) {
    const formatPrice = (product: Product) =>
        new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: product.currency || 'EUR',
        }).format((product.price_cents || 0) / 100);

    const getImage = (product: Product) =>
        product.image || product.images?.[0] || '';
    const formatPriceCents = (cents?: number | null, currency?: string) =>
        new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: currency || 'EUR',
        }).format(((cents ?? 0) || 0) / 100);
    const getSummary = (product: Product) =>
        product.short_description
        || product.summary
        || product.description
        || 'Produit selectionne par Barbu Studio.';

    return (
        <AuthenticatedLayout>
            <Head title="Barbu Studio" />

            <main className="relative overflow-hidden">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(38,244,208,0.35),transparent_65%)]" />
                    <div className="absolute right-[-120px] top-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,74,122,0.28),transparent_70%)]" />
                    <div className="absolute left-0 top-[420px] h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(123,97,255,0.22),transparent_65%)]" />
                </div>

                <div className="mx-auto w-full max-w-6xl px-6 pb-24 pt-10">
                    <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
                        <div className="space-y-7">
                            <h1 className="font-['Chakra_Petch'] text-4xl font-semibold leading-tight text-[var(--ink)] sm:text-5xl lg:text-6xl">
                                Des bornes d'arcade personnalisees,
                                fabriquees a la main et pretes a jouer.
                            </h1>
                            <p className="max-w-xl text-base text-[var(--muted)]">
                                Barbu Studio cree des cabinets uniques et
                                propose une boutique d'accessoires impression 3D,
                                gaming et tech pour booster vos setups.
                            </p>
                            <div className="flex flex-wrap items-center gap-4">
                                <Link
                                    href={route('custom.arcade')}
                                    className="rounded-full bg-[linear-gradient(120deg,#23f0ff,#ff4a7a)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--bg-0)] shadow-[0_18px_60px_rgba(35,240,255,0.35)]"
                                >
                                    Configurer ma borne
                                </Link>
                                <Link
                                    href={route('boutique')}
                                    className="rounded-full border border-white/15 px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--ink)] transition hover:border-[#23f0ff] hover:text-[#23f0ff]"
                                >
                                    Voir la boutique
                                </Link>
                            </div>
                            <div className="flex flex-wrap gap-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
                                <span>Assemblage atelier</span>
                                <span>Neon & finitions premium</span>
                                <span>Support direct</span>
                            </div>
                        </div>

                        <div className="neon-border relative h-full overflow-visible rounded-[28px] bg-[var(--surface)] p-3">
                            <div className="relative h-[280px] overflow-hidden rounded-[22px] border border-white/10 bg-[linear-gradient(135deg,rgba(19,24,38,0.9),rgba(9,12,20,0.9))] sm:h-[320px] lg:h-full">
                                <img
                                    src="/images/borne.webp"
                                    alt="Borne arcade personnalisee"
                                    className="h-full w-full object-cover object-[96%_8%]"
                                />
                                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,18,0),rgba(8,10,18,0.75))]" />
                                <div className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-[rgba(8,10,18,0.75)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#23f0ff]">
                                    Borne signature
                                </div>
                            </div>
                            <img
                                src="/images/homme.png"
                                alt=""
                                className="pointer-events-none absolute bottom-[2%] right-[28%] h-[78%] w-auto translate-x-1/2 object-contain"
                            />
                        </div>
                    </div>
                </div>
            </main>

            <section className="relative mx-auto w-full max-w-6xl px-6 pb-24">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--muted)]">
                            Derniers drops
                        </p>
                        <h2 className="mt-2 font-['Chakra_Petch'] text-3xl font-semibold">
                            Nouveautes boutique
                        </h2>
                    </div>
                    <Link
                        href={route('boutique')}
                        className="rounded-full border border-white/15 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--ink)] transition hover:border-[#23f0ff] hover:text-[#23f0ff]"
                    >
                        Voir tout
                    </Link>
                </div>

                {featuredProducts.length === 0 ? (
                    <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">
                        Aucun produit pour le moment. Ajoutez vos premiers
                        articles depuis l'admin.
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-3">
                        {featuredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="card-glow rounded-[26px] border border-white/10 bg-[var(--surface)] p-6"
                            >
                                <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                                    <span>{product.badge ?? 'Drop'}</span>
                                    <span>{product.color ?? 'Tech'}</span>
                                </div>
                                <Link
                                    href={route('product.show', product.slug)}
                                    className="mt-5 block h-36 overflow-hidden rounded-2xl border border-white/10 bg-[var(--surface-2)]"
                                >
                                    {getImage(product) ? (
                                        <img
                                            src={getImage(product)}
                                            alt={product.name}
                                            className="h-full w-full object-cover"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="h-full w-full bg-[linear-gradient(135deg,rgba(35,240,255,0.2),rgba(255,74,122,0.2))]" />
                                    )}
                                </Link>
                                {product.categories?.length ? (
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {product.categories.slice(0, 2).map((category) => (
                                            <span
                                                key={category.id}
                                                className="rounded-full border border-white/10 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]"
                                            >
                                                {category.name}
                                            </span>
                                        ))}
                                    </div>
                                ) : null}
                                <Link
                                    href={route('product.show', product.slug)}
                                    className="mt-3 block text-lg font-semibold text-[var(--ink)] hover:text-[#23f0ff]"
                                >
                                    {product.name}
                                </Link>
                                <p className="mt-2 text-sm text-[var(--muted)] line-clamp-2">
                                    {getSummary(product)}
                                </p>
                                <div className="mt-4 flex items-center justify-between">
                                    <div className="text-sm font-semibold text-[var(--ink)]">
                                        {product.sale_price_cents ? (
                                            <div className="flex items-center gap-2">
                                                <span className="text-[#23f0ff]">
                                                    {formatPriceCents(
                                                        product.sale_price_cents,
                                                        product.currency,
                                                    )}
                                                </span>
                                                <span className="text-xs text-[var(--muted)] line-through">
                                                    {formatPriceCents(
                                                        product.price_cents,
                                                        product.currency,
                                                    )}
                                                </span>
                                            </div>
                                        ) : (
                                            formatPrice(product)
                                        )}
                                    </div>
                                    <Link
                                        href={route('product.show', product.slug)}
                                        className="rounded-full border border-white/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--ink)] transition hover:border-[#23f0ff] hover:text-[#23f0ff]"
                                    >
                                        Voir
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <section className="relative mx-auto w-full max-w-6xl px-6 pb-24">
                <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-8">
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#23f0ff]">
                            Borne sur mesure
                        </p>
                        <h2 className="mt-3 font-['Chakra_Petch'] text-3xl font-semibold text-[var(--ink)]">
                            Votre arcade, votre style, votre signature.
                        </h2>
                        <p className="mt-4 text-sm text-[var(--muted)]">
                            Format, commandes, skins et composants : vous gardez
                            la main. On assemble, on calibre, on livre.
                        </p>
                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                            {[
                                'Formats bartop, upright ou full size',
                                'Panels pro & systemes multi-jeux',
                                'Skin personnalise & eclairage RGB',
                                'Installation simple, service client premium',
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="rounded-2xl border border-white/10 bg-[var(--surface-2)] px-4 py-3 text-sm text-[var(--ink)]"
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link
                                href={route('custom.arcade')}
                                className="rounded-full bg-[linear-gradient(120deg,#23f0ff,#ff4a7a)] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--bg-0)]"
                            >
                                Demarrer mon projet
                            </Link>
                            <Link
                                href={route('contact')}
                                className="rounded-full border border-white/15 px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--ink)] transition hover:border-[#23f0ff] hover:text-[#23f0ff]"
                            >
                                Parler a un expert
                            </Link>
                        </div>
                    </div>

                    <div className="grid gap-4">
                        {[
                            {
                                title: 'Brief & dimensions',
                                text: 'On valide le format et l\'ambiance arcade.',
                            },
                            {
                                title: 'Choix des modules',
                                text: 'Joystick, ecran, console et panel pro.',
                            },
                            {
                                title: 'Assemblage neon',
                                text: 'Tests complets et livraison sur RDV.',
                            },
                        ].map((step, index) => (
                            <div
                                key={step.title}
                                className="card-glow rounded-[24px] border border-white/10 bg-[var(--surface)] px-6 py-5"
                            >
                                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#ff4a7a]">
                                    Etape {index + 1}
                                </p>
                                <h3 className="mt-2 text-lg font-semibold text-[var(--ink)]">
                                    {step.title}
                                </h3>
                                <p className="mt-2 text-sm text-[var(--muted)]">
                                    {step.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative mx-auto w-full max-w-6xl px-6 pb-24">
                <div className="grid gap-6 lg:grid-cols-3">
                    {[
                        {
                            title: 'Accessoires impression 3D',
                            description:
                                'Filaments premium, kits et pieces pour atelier.',
                            accent: 'bg-[#23f0ff] shadow-[0_0_20px_rgba(35,240,255,0.7)]',
                        },
                        {
                            title: 'Gaming lab',
                            description:
                                'Claviers, souris, audio et mobilier pour setups.',
                            accent: 'bg-[#ff4a7a] shadow-[0_0_20px_rgba(255,74,122,0.7)]',
                        },
                        {
                            title: 'Tech & upgrades',
                            description:
                                'Modules, outils et accessoires pour vos projets.',
                            accent: 'bg-[#7b61ff] shadow-[0_0_20px_rgba(123,97,255,0.6)]',
                        },
                    ].map((card) => (
                        <div
                            key={card.title}
                            className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6"
                        >
                            <div
                                className={`h-10 w-10 rounded-2xl ${card.accent}`}
                            ></div>
                            <h3 className="mt-4 font-['Chakra_Petch'] text-2xl font-semibold text-[var(--ink)]">
                                {card.title}
                            </h3>
                            <p className="mt-3 text-sm text-[var(--muted)]">
                                {card.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
