import { Link } from "@inertiajs/react";
export default function Guest({ children }) {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-tech px-6 py-12 text-[var(--ink)]">
            <div className="absolute inset-0 opacity-70 bg-grid"></div>
            <div className="pointer-events-none absolute -left-24 top-[-140px] h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle_at_center,rgba(38,244,208,0.22),transparent_65%)]"></div>
            <div className="pointer-events-none absolute right-[-120px] top-16 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,138,61,0.2),transparent_60%)] animate-float-slow"></div>

            <Link
                href="/"
                className="relative z-10 mb-8 inline-flex items-center gap-3 font-['Chakra_Petch'] text-lg font-semibold uppercase tracking-[0.3em]"
            >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent)] text-[var(--bg-0)]">
                    BS
                </span>
                Barbu Shop
            </Link>

            <div className="relative z-10 w-full max-w-md rounded-[28px] border border-white/10 bg-[var(--surface)] px-6 py-6 text-[var(--ink)] shadow-[0_30px_70px_rgba(5,10,20,0.65)] sm:px-8 sm:py-8">
                {children}
            </div>
        </div>
    );
}
