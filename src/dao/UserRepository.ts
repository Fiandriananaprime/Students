import { Pool } from "pg";
import type { User } from "../model/User";

export class UserRepository {
    constructor(private readonly db: Pool) {}

    async findByEmail(email: string): Promise<User | null> {
        const result = await this.db.query<User>(
            `
            SELECT
                id,
                username,
                password_hash,
                email,
                email_verified,
                verification_code,
                verification_code_expires_at,
                created_at
            FROM user_
            WHERE email = $1
            `,
            [email]
        );

        return result.rows[0] ?? null;
    }

    async create(user: User): Promise<User> {
    const result = await this.db.query<User>(
        `
        INSERT INTO user_ (
            id,
            username,
            password_hash,
            email,
            email_verified,
            verification_code,
            verification_code_expires_at,
            created_at
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
        `,
        [
            user.id,
            user.username,
            user.password_hash,
            user.email,
            user.email_verified,
            user.verification_code,
            user.verification_code_expires_at,
            user.created_at
        ]
    );

    return result.rows[0];
}

async verifyEmail(id: string): Promise<void> {
    await this.db.query(
        `
        UPDATE user_
        SET email_verified = true
        WHERE id = $1
        `,
        [id]
    );
}
async saveVerificationCode(
    id: string,
    code: string,
    expiresAt: Date
): Promise<void> {
    await this.db.query(
        `
        UPDATE user_
        SET
            verification_code = $1,
            verification_code_expires_at = $2
        WHERE id = $3
        `,
        [code, expiresAt, id]
    );
}
}