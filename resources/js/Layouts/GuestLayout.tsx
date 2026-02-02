import { Link } from '@inertiajs/react';
import { CSSProperties, PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    const styleVars = {
        '--ink': '#171410',
        '--paper': '#f7f1e9',
        '--accent': '#ff6b35',
        '--accent-2': '#1b998b',
    } as CSSProperties;

    return (
        <div
            style={styleVars}
            className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[var(--paper)] px-6 py-12 text-[var(--ink)]"
        >
            <div className="pointer-events-none absolute -left-24 top-[-140px] h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,107,53,0.24),transparent_65%)]"></div>
            <div className="pointer-events-none absolute right-[-120px] top-16 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle_at_center,rgba(27,153,139,0.2),transparent_60%)] animate-float-slow"></div>

            <Link
                href="/"
                className="relative z-10 mb-8 inline-flex items-center gap-3 font-['Space_Grotesk'] text-lg font-semibold tracking-wide"
            >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--ink)] text-[var(--paper)]">
                    SB
                </span>
                Studio Boutique
            </Link>

            <div className="relative z-10 w-full max-w-md rounded-[28px] border border-black/10 bg-white px-6 py-6 shadow-[0_30px_70px_rgba(23,20,16,0.18)] sm:px-8 sm:py-8">
                {children}
            </div>
        </div>
    );
}
