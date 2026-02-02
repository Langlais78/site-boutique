import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function LegalMentions() {
    return (
        <AuthenticatedLayout
            header={
                <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--muted)]">
                        Legal
                    </p>
                    <h2 className="font-['Chakra_Petch'] text-3xl font-semibold text-[var(--ink)]">
                        Mentions legales
                    </h2>
                </div>
            }
        >
            <Head title="Mentions legales" />

            <div className="mt-8 space-y-6">
                <section className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">
                    <h3 className="text-base font-semibold text-[var(--ink)]">
                        Editeur du site
                    </h3>
                    <p className="mt-2">
                        Barbu Studio
                        <br />
                        Adresse : A completer
                        <br />
                        SIRET : A completer
                        <br />
                        RCS : A completer
                        <br />
                        TVA intracommunautaire : A completer
                        <br />
                        Email : contact@barbu-studio.fr
                    </p>
                </section>

                <section className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">
                    <h3 className="text-base font-semibold text-[var(--ink)]">
                        Directeur de la publication
                    </h3>
                    <p className="mt-2">Nom / Prenom : A completer</p>
                </section>

                <section className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">
                    <h3 className="text-base font-semibold text-[var(--ink)]">
                        Hebergeur
                    </h3>
                    <p className="mt-2">
                        Hebergeur : A completer
                        <br />
                        Adresse : A completer
                        <br />
                        Telephone : A completer
                    </p>
                </section>

                <section className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">
                    <h3 className="text-base font-semibold text-[var(--ink)]">
                        Propriete intellectuelle
                    </h3>
                    <p className="mt-2">
                        L'ensemble des contenus (textes, images, logos) est protege par le
                        droit d'auteur. Toute reproduction est interdite sans autorisation.
                    </p>
                </section>

                <section className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">
                    <h3 className="text-base font-semibold text-[var(--ink)]">
                        Donnees personnelles
                    </h3>
                    <p className="mt-2">
                        Les donnees personnelles sont traitees conformement a la
                        reglementation en vigueur. Pour toute demande, contactez
                        contact@barbu-studio.fr.
                    </p>
                </section>

                <div className="rounded-[24px] border border-amber-400/20 bg-amber-500/10 px-5 py-4 text-xs text-amber-200">
                    Cette page est un modele standard. Merci de completer les informations
                    legales obligatoires.
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
