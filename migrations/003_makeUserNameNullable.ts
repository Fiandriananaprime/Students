import { MigrationBuilder } from "node-pg-migrate";

export const up = (pgm: MigrationBuilder): void => {
    pgm.alterColumn("user_", "username", {
        notNull: false
    });
};

export const down = (pgm: MigrationBuilder): void => {
    pgm.alterColumn("user_", "username", {
        notNull: true
    });
};