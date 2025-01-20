export interface User {
    id: number;
    name: string;
    phone: string;
    email: string;
    avatar: string;
    created_at: Date
    roles: Role[];
}


export interface Role {
    id: number;
    name: string;
    is_default: boolean;
}
