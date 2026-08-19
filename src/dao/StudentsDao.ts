import { Students, StudentsDTO, StudentsDTOPartial } from "../model/Students";
import pool from "../configuration/database";

class StudentsRepository {

    async findAll(): Promise<Students[]> {
        const result = await pool.query(`
            SELECT
                id,
                first_name AS "firstName",
                last_name AS "lastName",
                email,
                filiere
            FROM students
            ORDER BY id
        `);

        return result.rows;
    }

    async findById(id: number): Promise<Students | undefined> {
        const result = await pool.query(`
            SELECT
                id,
                first_name AS "firstName",
                last_name AS "lastName",
                email,
                filiere
            FROM students
            WHERE id = $1
        `, [id]);
        return result.rows[0];
    }

    async save(data: StudentsDTO): Promise<Students> {
        const result = await pool.query(`
            INSERT INTO students (
                first_name,
                last_name,
                email,
                filiere
            )
            VALUES ($1, $2, $3, $4)
            RETURNING
                id,
                first_name AS "firstName",
                last_name AS "lastName",
                email,
                filiere
        `, [
            data.firstName,
            data.lastName,
            data.email,
            data.filiere
        ]);

        return result.rows[0];
    }

    async update(
        id: number,
        data: StudentsDTO
    ): Promise<Students | undefined> {

        const result = await pool.query(`
            UPDATE students
            SET
                first_name = $1,
                last_name = $2,
                email = $3,
                filiere = $4
            WHERE id = $5
            RETURNING
                id,
                first_name AS "firstName",
                last_name AS "lastName",
                email,
                filiere
        `, [
            data.firstName,
            data.lastName,
            data.email,
            data.filiere,
            id
        ]);

        return result.rows[0];
    }

    async partialUpdate(
        id: number,
        data: StudentsDTOPartial
    ): Promise<Students | undefined> {

        const fields: string[] = [];
        const values: unknown[] = [];
        let parameterIndex = 1;

        if (data.firstName !== undefined) {
            fields.push(`first_name = $${parameterIndex++}`);
            values.push(data.firstName);
        }

        if (data.lastName !== undefined) {
            fields.push(`last_name = $${parameterIndex++}`);
            values.push(data.lastName);
        }

        if (data.email !== undefined) {
            fields.push(`email = $${parameterIndex++}`);
            values.push(data.email);
        }

        if (data.filiere !== undefined) {
            fields.push(`filiere = $${parameterIndex++}`);
            values.push(data.filiere);
        }

        if (fields.length === 0) {
            return this.findById(id);
        }

        values.push(id);

        const result = await pool.query(`
            UPDATE students
            SET ${fields.join(", ")}
            WHERE id = $${parameterIndex}
            RETURNING
                id,
                first_name AS "firstName",
                last_name AS "lastName",
                email,
                filiere
        `, values);

        return result.rows[0];
    }

    async deleteById(id: number): Promise<void> {
        await pool.query(
            "DELETE FROM students WHERE id = $1",
            [id]
        );
    }

    async existsById(id: number): Promise<boolean> {
        const result = await pool.query(
            "SELECT 1 FROM students WHERE id = $1",
            [id]
        );

        return (result.rowCount ?? 0) > 0;
    }
}

export const StudentsRepo = new StudentsRepository();