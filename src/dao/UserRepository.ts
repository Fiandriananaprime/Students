import pool from "../configuration/database";
import { User } from "../model/User";
import { randomUUID } from "crypto";

export class UserRepository {

    async create(user: User): Promise<User> {
        const id = randomUUID();

        user.setId(id);

        const result = await pool.query(
            `
            INSERT INTO user_ (
                id,
                email,
                password_hash,
                username,
                email_verified
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING
                id,
                email,
                password_hash,
                username,
                email_verified,
                verification_code,
                verification_code_expires_at
            `,
            [
                user.getId(),
                user.getEmail(),
                user.getPassword(),
                user.getUserName(),
                user.isEmailVerified()
            ]
        );

        return this.mapRowToUser(result.rows[0]);
    }

    async findByEmail(email: string): Promise<User | null> {
        const result = await pool.query(
            `
            SELECT
                id,
                email,
                password_hash,
                username,
                email_verified,
                verification_code,
                verification_code_expires_at
            FROM user_
            WHERE email = $1
            LIMIT 1
            `,
            [email]
        );

        if (result.rows.length === 0) {
            return null;
        }

        return this.mapRowToUser(result.rows[0]);
    }

    async verifyEmail(id: string): Promise<void> {
        await pool.query(
            `
            UPDATE user_
            SET
                email_verified = TRUE,
                verification_code = NULL,
                verification_code_expires_at = NULL
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
        await pool.query(
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

    private mapRowToUser(row: any): User {
        const user = new User(
            row.email,
            row.password_hash
        );

        user.setId(row.id);
        user.setUserName(row.username);
        user.setEmailVerified(row.email_verified);

        if (row.verification_code) {
            user.setVerificationCode(row.verification_code);
        }

        if (row.verification_code_expires_at) {
            user.setVerificationCodeExpiresAt(
                new Date(row.verification_code_expires_at)
            );
        }

        return user;
    }
}