export interface ProfileUpdateRes {
    token: string;
    message: string;
}

export interface ProfileUpdateReq {
    username: string
    email: string
}

export interface PasswordReq {
    password: string;
    confirm_password: string;
}
