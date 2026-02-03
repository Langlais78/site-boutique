import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
function getQueryParam(url, key) {
    const queryIndex = url.indexOf("?");
    if (queryIndex === -1) return "";
    const params = new URLSearchParams(url.slice(queryIndex));
    return params.get(key) ?? "";
}
export default function Contact() {
    const page = usePage();
    const prefillSubject = getQueryParam(page.url, "subject");
    const prefillMessage = getQueryParam(page.url, "message");
    const { flash } = page.props;
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        subject: prefillSubject,
        message: prefillMessage,
    });
    const submit = (event) => {
        event.preventDefault();
        post(route("contact.store"));
    };
    return (
        <AuthenticatedLayout
            header={
                <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--muted)]">
                        Support
                    </p>
                    <h2 className="font-['Chakra_Petch'] text-3xl font-semibold text-[var(--ink)]">
                        Contact
                    </h2>
                </div>
            }
        >
            <Head title="Contact" />

            <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                    <h3 className="text-lg font-semibold text-[var(--ink)]">
                        Parle-nous de ton projet
                    </h3>
                    <p className="mt-2 text-sm text-[var(--muted)]">
                        Support, devis ou partenariat : reponse rapide par notre
                        equipe.
                    </p>
                    {flash?.success && (
                        <div className="mt-4 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                            {flash.success}
                        </div>
                    )}
                    <form className="mt-6 grid gap-4" onSubmit={submit}>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <input
                                    type="text"
                                    placeholder="Nom"
                                    value={data.name}
                                    onChange={(event) =>
                                        setData("name", event.target.value)
                                    }
                                    className="h-12 w-full rounded-2xl border border-white/10 bg-[var(--surface-2)] px-4 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)]"
                                />
                                {errors.name && (
                                    <p className="text-xs text-red-300">
                                        {errors.name}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={data.email}
                                    onChange={(event) =>
                                        setData("email", event.target.value)
                                    }
                                    className="h-12 w-full rounded-2xl border border-white/10 bg-[var(--surface-2)] px-4 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)]"
                                />
                                {errors.email && (
                                    <p className="text-xs text-red-300">
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <input
                                type="text"
                                placeholder="Sujet"
                                value={data.subject}
                                onChange={(event) =>
                                    setData("subject", event.target.value)
                                }
                                className="h-12 w-full rounded-2xl border border-white/10 bg-[var(--surface-2)] px-4 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)]"
                            />
                            {errors.subject && (
                                <p className="text-xs text-red-300">
                                    {errors.subject}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <textarea
                                rows={6}
                                placeholder="Message"
                                value={data.message}
                                onChange={(event) =>
                                    setData("message", event.target.value)
                                }
                                className="w-full rounded-2xl border border-white/10 bg-[var(--surface-2)] px-4 py-3 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)]"
                            />
                            {errors.message && (
                                <p className="text-xs text-red-300">
                                    {errors.message}
                                </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="mt-2 inline-flex w-fit rounded-full bg-[linear-gradient(120deg,var(--accent),var(--accent-2))] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--bg-0)] disabled:opacity-60"
                        >
                            {processing ? "Envoi..." : "Envoyer"}
                        </button>
                    </form>
                </div>

                <div className="space-y-6">
                    <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                            Contact direct
                        </p>
                        <div className="mt-4 space-y-3 text-sm text-[var(--muted)]">
                            <p>contact@barbu-studio.fr</p>
                            <p>Paris, France</p>
                        </div>
                    </div>
                    <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                            Horaires
                        </p>
                        <div className="mt-4 space-y-2 text-sm text-[var(--muted)]">
                            <p>Lun - Ven : 9h00 - 18h00</p>
                            <p>Samedi : 10h00 - 14h00</p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
