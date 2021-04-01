const pool = require('../utils/pool')

module.exports = class Student {
    id;
    studentName;
    grade;
    
    constructor(row) {
        this.id = row.id,
        this.studentName = row.student_name,
        this.grade = row.grade
    }


//static insert
    static async insert(student) {
        const { rows } = await pool.query(`
        INSERT INTO students (student_name, grade) 
        VALUES ($1, $2) RETURNING *`, [
            student.studentName,
            student.grade,
        ]);
        return new Student(rows[0]);
    }
//static get
    static async select() {
        const { rows } = await pool.query(`
        SELECT * 
        FROM students`)

        return rows.map((row) => new Student(row));
    }
//static get by id
    static async selectId(id) {
        const { rows } = await pool.query(`
        SELECT *
        FROM students
        WHERE id = $1`, 
        [id]);

        return new Student(rows[0]);
    }
//static update
    static async update(id, { grade }) {
        const { rows } = await pool.query(`
        UPDATE students
        SET grade = $1
        WHERE id = $2
        RETURNING *`, 
        [grade, id]);

        return new Student(rows[0]);
    }
//static delete

};