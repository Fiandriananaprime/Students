import type { MigrationBuilder } from "node-pg-migrate";

export function up(pgm: MigrationBuilder) {
    pgm.createTable("user_", {
        id: {
            type: "varchar(50)",
            primaryKey: true,
        },
        username: {
            type: "varchar(50)",
            notNull: true,
            unique: true,
        },
        password: {
            type: "varchar(255)",
            notNull: true,
        },
    });
}

export function down(pgm: MigrationBuilder) {
    pgm.dropTable("user_");
}