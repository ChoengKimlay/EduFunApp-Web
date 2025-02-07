import { User } from "app/core/user/user.types";

export interface UserPayload {
    id: number;
    username: string;
    email: string;
    createdAt: Date;
    iat: number;
    exp: number;
}
