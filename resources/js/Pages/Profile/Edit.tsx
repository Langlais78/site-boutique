import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <AuthenticatedLayout
            header={
                <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-black/50">
                        Compte
                    </p>
                    <h2 className="font-['Fraunces'] text-3xl font-semibold text-[var(--ink)]">
                        Mon compte
                    </h2>
                </div>
            }
        >
            <Head title="Mon compte" />

            <div className="mt-10 space-y-6">
                <div className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_20px_50px_rgba(23,20,16,0.08)]">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-xl"
                    />
                </div>

                <div className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_20px_50px_rgba(23,20,16,0.08)]">
                    <UpdatePasswordForm className="max-w-xl" />
                </div>

                <div className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_20px_50px_rgba(23,20,16,0.08)]">
                    <DeleteUserForm className="max-w-xl" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
