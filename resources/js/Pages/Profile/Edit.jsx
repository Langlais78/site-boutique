import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--muted)]">
                        Compte
                    </p>
                    <h2 className="font-['Chakra_Petch'] text-3xl font-semibold text-[var(--ink)]">
                        Mon compte
                    </h2>
                </div>
            }
        >
            <Head title="Mon compte" />

            <div className="mt-10 space-y-6">
                <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-xl"
                    />
                </div>

                <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                    <UpdatePasswordForm className="max-w-xl" />
                </div>

                <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                    <DeleteUserForm className="max-w-xl" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
