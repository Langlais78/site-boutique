import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

type Accessory = {
    id: number;
    type: string;
    name: string;
};

type AccessoriesByType = Record<string, Accessory[]>;

type CustomArcadeFormData = {
    name: string;
    box_accessory_id: string;
    screen_accessory_id: string;
    joystick_accessory_id: string;
    console_accessory_id: string;
    skin_accessory_id: string;
    target_accessory_id: string;
};

type Props = {
    submitLabel: string;
    action: string;
    method?: 'post' | 'put';
    accessories: AccessoriesByType;
    initialValues?: Partial<CustomArcadeFormData>;
};

const getOptions = (items?: Accessory[]) => items ?? [];

export default function CustomArcadeForm({
    submitLabel,
    action,
    method = 'post',
    accessories,
    initialValues,
}: Props) {
    const { data, setData, post, processing, errors } = useForm<CustomArcadeFormData>({
        name: initialValues?.name ?? '',
        box_accessory_id: initialValues?.box_accessory_id?.toString?.() ?? '',
        screen_accessory_id: initialValues?.screen_accessory_id?.toString?.() ?? '',
        joystick_accessory_id: initialValues?.joystick_accessory_id?.toString?.() ?? '',
        console_accessory_id: initialValues?.console_accessory_id?.toString?.() ?? '',
        skin_accessory_id: initialValues?.skin_accessory_id?.toString?.() ?? '',
        target_accessory_id: initialValues?.target_accessory_id?.toString?.() ?? '',
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();
        post(action);
    };

    const renderSelect = (
        label: string,
        field: keyof CustomArcadeFormData,
        options: Accessory[],
    ) => (
        <div>
            <InputLabel value={label} />
            <select
                value={data[field]}
                onChange={(event) => setData(field, event.target.value)}
                className="mt-2 block w-full rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-[var(--ink)]"
            >
                <option value="">Non defini</option>
                {options.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>
            <InputError message={errors[field]} className="mt-2" />
        </div>
    );

    return (
        <form onSubmit={submit} className="space-y-6">
            <div>
                <InputLabel htmlFor="name" value="Nom" />
                <TextInput
                    id="name"
                    value={data.name}
                    className="mt-2 block w-full"
                    onChange={(event) => setData('name', event.target.value)}
                    required
                />
                <InputError message={errors.name} className="mt-2" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                {renderSelect('Box', 'box_accessory_id', getOptions(accessories.box))}
                {renderSelect(
                    'Ecran',
                    'screen_accessory_id',
                    getOptions(accessories.screen),
                )}
                {renderSelect(
                    'Joystick',
                    'joystick_accessory_id',
                    getOptions(accessories.joystick),
                )}
                {renderSelect(
                    'Console',
                    'console_accessory_id',
                    getOptions(accessories.console),
                )}
                {renderSelect('Skin', 'skin_accessory_id', getOptions(accessories.skin))}
                {renderSelect(
                    'Cible',
                    'target_accessory_id',
                    getOptions(accessories.target),
                )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <PrimaryButton disabled={processing}>{submitLabel}</PrimaryButton>
                <Link
                    href={route('admin.custom-arcades.index')}
                    className="rounded-full border border-white/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                    Annuler
                </Link>
            </div>
        </form>
    );
}
