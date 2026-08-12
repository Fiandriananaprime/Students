import type { MigrationBuilder } from "node-pg-migrate";

export function up(pgm: MigrationBuilder) {
    pgm.renameColumn("user_", "password", "password_hash");

    pgm.addColumns("user_", {
        email: {
            type: "varchar(255)",
            notNull: true,
            unique: true,
        },
        email_verified: {
            type: "boolean",
            notNull: true,
            default: false,
        },
        verification_code: {
            type: "varchar(10)",
        },
        verification_code_expires_at: {
            type: "timestamp",
        },
        created_at: {
            type: "timestamp",
            notNull: true,
            default: pgm.func("CURRENT_TIMESTAMP"),
        },
    });
}

export function down(pgm: MigrationBuilder) {
    pgm.dropColumns("user_", [
        "email",
        "email_verified",
        "verification_code",
        "verification_code_expires_at",
        "created_at",
    ]);

    pgm.renameColumn("user_", "password_hash", "password");
}