import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function LegalCgv() {
    return (
        <AuthenticatedLayout
            header={
                <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--muted)]">
                        Legal
                    </p>
                    <h2 className="font-['Chakra_Petch'] text-3xl font-semibold text-[var(--ink)]">
                        Conditions generales de vente
                    </h2>
                </div>
            }
        >
            <Head title="Conditions de vente" />

            <div className="mt-8 space-y-6">
                <section className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">
                    <h3 className="text-base font-semibold text-[var(--ink)]">
                        1. Objet
                    </h3>
                    <p className="mt-2">
                        Les presentes conditions generales de vente (CGV) definissent les
                        droits et obligations des parties dans le cadre de la vente en
                        ligne des produits proposes par Barbu Studio.
                    </p>
                </section>

                <section className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">
                    <h3 className="text-base font-semibold text-[var(--ink)]">
                        2. Produits
                    </h3>
                    <p className="mt-2">
                        Les caracteristiques essentielles des produits sont presentees sur
                        les fiches articles. Les photographies et visuels n'ont pas de
                        valeur contractuelle.
                    </p>
                </section>

                <section className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">
                    <h3 className="text-base font-semibold text-[var(--ink)]">
                        3. Prix
                    </h3>
                    <p className="mt-2">
                        Les prix sont indiques en euros, toutes taxes comprises (TTC). Barbu
                        Studio se reserve le droit de modifier ses prix a tout moment, le
                        prix applique etant celui en vigueur au moment de la commande.
                    </p>
                </section>

                <section className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">
                    <h3 className="text-base font-semibold text-[var(--ink)]">
                        4. Commande
                    </h3>
                    <p className="mt-2">
                        Toute commande implique l'acceptation sans reserve des presentes
                        CGV. La commande est consideree comme definitive apres validation
                        du paiement.
                    </p>
                </section>

                <section className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">
                    <h3 className="text-base font-semibold text-[var(--ink)]">
                        5. Paiement
                    </h3>
                    <p className="mt-2">
                        Le paiement est exige a la commande par les moyens proposes sur le
                        site. Les transactions sont securisees par un prestataire de
                        paiement.
                    </p>
                </section>

                <section className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">
                    <h3 className="text-base font-semibold text-[var(--ink)]">
                        6. Livraison
                    </h3>
                    <p className="mt-2">
                        Les delais de livraison sont indiques lors de la commande. Barbu
                        Studio ne saurait etre tenue responsable des retards imputables au
                        transporteur.
                    </p>
                </section>

                <section className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">
                    <h3 className="text-base font-semibold text-[var(--ink)]">
                        7. Droit de retractation
                    </h3>
                    <p className="mt-2">
                        Conformement a la legislation en vigueur, le client dispose d'un
                        delai de 14 jours pour exercer son droit de retractation a compter
                        de la reception de la commande, sauf exceptions legales.
                    </p>
                </section>

                <section className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">
                    <h3 className="text-base font-semibold text-[var(--ink)]">
                        8. Retours et remboursements
                    </h3>
                    <p className="mt-2">
                        Les produits doivent etre retournes dans leur etat d'origine. Les
                        frais de retour sont a la charge du client sauf mention contraire.
                        Le remboursement intervient apres verification des articles.
                    </p>
                </section>

                <section className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">
                    <h3 className="text-base font-semibold text-[var(--ink)]">
                        9. Garantie
                    </h3>
                    <p className="mt-2">
                        Les produits beneficient des garanties legales de conformite et
                        des vices caches. Toute reclamation doit etre adressee a
                        contact@barbu-studio.fr.
                    </p>
                </section>

                <section className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">
                    <h3 className="text-base font-semibold text-[var(--ink)]">
                        10. Donnees personnelles
                    </h3>
                    <p className="mt-2">
                        Les donnees collectees sont traitees conformement a la
                        reglementation en vigueur et a la politique de confidentialite.
                    </p>
                </section>

                <section className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">
                    <h3 className="text-base font-semibold text-[var(--ink)]">
                        11. Droit applicable
                    </h3>
                    <p className="mt-2">
                        Les presentes CGV sont soumises au droit francais. En cas de litige,
                        une solution amiable sera privilegiee avant toute action judiciaire.
                    </p>
                </section>

                <div className="rounded-[24px] border border-amber-400/20 bg-amber-500/10 px-5 py-4 text-xs text-amber-200">
                    Ces CGV sont un modele standard a personnaliser avec vos informations
                    legales (raison sociale, adresse, SIRET, TVA, etc.).
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
