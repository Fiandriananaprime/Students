import { MigrationBuilder } from "node-pg-migrate";

export const up = (pgm: MigrationBuilder) => {
  pgm.addColumn("user_", {
    role: {
      type: "varchar(20)",
      notNull: true,
      default: "student",
    },
  });

  pgm.addConstraint("user_", "user_role_check", {
    check: "role IN ('admin', 'student')",
  });
};

export const down = (pgm: MigrationBuilder) => {
  pgm.dropConstraint("user_", "user_role_check");
  pgm.dropColumn("user_", "role");
};