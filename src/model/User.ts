export interface User {
    id: string;
    username: string;
    password_hash: string;
    email: string;
    email_verified: boolean;
    verification_code: string | null;
    verification_code_expires_at: Date | null;
    created_at: Date;
}