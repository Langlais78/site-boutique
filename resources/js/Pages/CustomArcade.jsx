import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useMemo, useState } from "react";
const formatOptions = (items) => items ?? [];
export default function CustomArcade({ accessories = {} }) {
    const [boxId, setBoxId] = useState("");
    const [screenId, setScreenId] = useState("");
    const [joystickId, setJoystickId] = useState("");
    const [consoleId, setConsoleId] = useState("");
    const [skinId, setSkinId] = useState("");
    const [targetId, setTargetId] = useState("");
    const selectedBox = formatOptions(accessories.box).find(
        (item) => item.id.toString() === boxId,
    );
    const selectedScreen = formatOptions(accessories.screen).find(
        (item) => item.id.toString() === screenId,
    );
    const selectedJoystick = formatOptions(accessories.joystick).find(
        (item) => item.id.toString() === joystickId,
    );
    const selectedConsole = formatOptions(accessories.console).find(
        (item) => item.id.toString() === consoleId,
    );
    const selectedSkin = formatOptions(accessories.skin).find(
        (item) => item.id.toString() === skinId,
    );
    const selectedTarget = formatOptions(accessories.target).find(
        (item) => item.id.toString() === targetId,
    );
    const stepImage = useMemo(() => {
        if (targetId) return "/config-borne/img-6.png";
        if (skinId) return "/config-borne/img-5.png";
        if (consoleId) return "/config-borne/img-4.png";
        if (joystickId) return "/config-borne/img-3.png";
        if (screenId) return "/config-borne/img-2.png";
        if (boxId) return "/config-borne/img-1.png";
        return "/config-borne/img-0.png";
    }, [boxId, screenId, joystickId, consoleId, skinId, targetId]);
    const contactParams = useMemo(() => {
        const lines = [
            `Demande borne sur mesure:`,
            selectedBox ? `Box: ${selectedBox.name}` : null,
            selectedScreen ? `Ecran: ${selectedScreen.name}` : null,
            selectedJoystick ? `Joystick: ${selectedJoystick.name}` : null,
            selectedConsole ? `Console: ${selectedConsole.name}` : null,
            selectedSkin ? `Skin: ${selectedSkin.name}` : null,
            selectedTarget ? `Cible: ${selectedTarget.name}` : null,
        ].filter(Boolean);
        return {
            subject: "Devis borne sur mesure",
            message: lines.join("\n"),
        };
    }, [
        selectedBox,
        selectedScreen,
        selectedJoystick,
        selectedConsole,
        selectedSkin,
        selectedTarget,
    ]);
    const lockBox = Boolean(
        screenId || joystickId || consoleId || skinId || targetId,
    );
    const lockScreen = Boolean(joystickId || consoleId || skinId || targetId);
    const lockJoystick = Boolean(consoleId || skinId || targetId);
    const lockConsole = Boolean(skinId || targetId);
    const lockSkin = Boolean(targetId);
    return (
        <AuthenticatedLayout
            header={
                <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--muted)]">
                        Sur mesure
                    </p>
                    <h2 className="font-['Chakra_Petch'] text-3xl font-semibold text-[var(--ink)]">
                        Borne d'arcade sur mesure
                    </h2>
                </div>
            }
        >
            <Head title="Borne sur mesure" />

            <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
                <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[var(--surface-2)]">
                        <img
                            src={stepImage}
                            alt="Borne sur mesure"
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <p className="mt-4 text-sm text-[var(--muted)]">
                        Visualisez votre borne ideale : finitions premium, panel
                        pro et ecran haute definition.
                    </p>
                </div>

                <div className="card-glow rounded-[28px] border border-white/10 bg-[var(--surface)] p-6">
                    <h3 className="text-lg font-semibold text-[var(--ink)]">
                        Configure ta borne
                    </h3>
                    <p className="mt-2 text-sm text-[var(--muted)]">
                        Selectionne tes options, on revient vers toi avec un
                        devis detaille.
                    </p>

                    <div className="mt-6 grid gap-4">
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                                Box
                            </label>
                            <select
                                value={boxId}
                                onChange={(event) => {
                                    setBoxId(event.target.value);
                                    setScreenId("");
                                    setJoystickId("");
                                    setConsoleId("");
                                    setSkinId("");
                                    setTargetId("");
                                }}
                                className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-[var(--surface-2)] px-4 text-sm text-[var(--ink)]"
                            >
                                <option value="" disabled={lockBox}>
                                    Choisir
                                </option>
                                {formatOptions(accessories.box).map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {boxId && (
                            <div>
                                <label className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                                    Ecran
                                </label>
                                <select
                                    value={screenId}
                                    onChange={(event) => {
                                        setScreenId(event.target.value);
                                        setJoystickId("");
                                        setConsoleId("");
                                        setSkinId("");
                                        setTargetId("");
                                    }}
                                    className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-[var(--surface-2)] px-4 text-sm text-[var(--ink)]"
                                >
                                    <option value="" disabled={lockScreen}>
                                        Choisir
                                    </option>
                                    {formatOptions(accessories.screen).map(
                                        (item) => (
                                            <option
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.name}
                                            </option>
                                        ),
                                    )}
                                </select>
                            </div>
                        )}

                        {screenId && (
                            <div>
                                <label className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                                    Joystick
                                </label>
                                <select
                                    value={joystickId}
                                    onChange={(event) => {
                                        setJoystickId(event.target.value);
                                        setConsoleId("");
                                        setSkinId("");
                                        setTargetId("");
                                    }}
                                    className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-[var(--surface-2)] px-4 text-sm text-[var(--ink)]"
                                >
                                    <option value="" disabled={lockJoystick}>
                                        Choisir
                                    </option>
                                    {formatOptions(accessories.joystick).map(
                                        (item) => (
                                            <option
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.name}
                                            </option>
                                        ),
                                    )}
                                </select>
                            </div>
                        )}

                        {joystickId && (
                            <div>
                                <label className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                                    Console
                                </label>
                                <select
                                    value={consoleId}
                                    onChange={(event) => {
                                        setConsoleId(event.target.value);
                                        setSkinId("");
                                        setTargetId("");
                                    }}
                                    className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-[var(--surface-2)] px-4 text-sm text-[var(--ink)]"
                                >
                                    <option value="" disabled={lockConsole}>
                                        Choisir
                                    </option>
                                    {formatOptions(accessories.console).map(
                                        (item) => (
                                            <option
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.name}
                                            </option>
                                        ),
                                    )}
                                </select>
                            </div>
                        )}

                        {consoleId && (
                            <div>
                                <label className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                                    Skin
                                </label>
                                <select
                                    value={skinId}
                                    onChange={(event) => {
                                        setSkinId(event.target.value);
                                        setTargetId("");
                                    }}
                                    className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-[var(--surface-2)] px-4 text-sm text-[var(--ink)]"
                                >
                                    <option value="" disabled={lockSkin}>
                                        Choisir
                                    </option>
                                    {formatOptions(accessories.skin).map(
                                        (item) => (
                                            <option
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.name}
                                            </option>
                                        ),
                                    )}
                                </select>
                            </div>
                        )}

                        {skinId && (
                            <div>
                                <label className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                                    Cible
                                </label>
                                <select
                                    value={targetId}
                                    onChange={(event) =>
                                        setTargetId(event.target.value)
                                    }
                                    className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-[var(--surface-2)] px-4 text-sm text-[var(--ink)]"
                                >
                                    <option value="">Choisir</option>
                                    {formatOptions(accessories.target).map(
                                        (item) => (
                                            <option
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.name}
                                            </option>
                                        ),
                                    )}
                                </select>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                            href={route("contact", contactParams)}
                            className="rounded-full bg-[linear-gradient(120deg,var(--accent),var(--accent-2))] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--bg-0)]"
                        >
                            Demander un devis
                        </Link>
                        <Link
                            href={route("boutique")}
                            className="rounded-full border border-white/15 px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                        >
                            Voir la boutique
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
