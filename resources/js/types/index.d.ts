export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    is_admin?: boolean;
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    price_cents: number;
    currency: string;
    badge?: string | null;
    color?: string | null;
    summary?: string | null;
    description?: string | null;
    specs?: string[];
    category?: string | null;
    stock?: number;
}

export interface Order {
    id: number;
    number: string;
    status: string;
    total_cents: number;
    currency: string;
    placed_at?: string | null;
    created_at?: string | null;
    items_count?: number;
    customer?: string | null;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    cart?: {
        count: number;
    };
};
