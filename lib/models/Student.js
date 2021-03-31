const pool = require('../utils/pool')

class Student {
    id:
    studentName;
    grade;
    
    constructor(row) {
        this.id = row.id,
        this.studentName = row.student_name,
        this.grade = row.grade,
    }
//static insert
    static async insert(student) {
        const { rows } = await pool.query(`INSERT INTO students (studentName, grade) VALUES ($1, $2) RETURNING *`, [
            student.studentName,
            student.grade,
        ]);
        return new Student(rows[0]);
    }
//static get
//static get by id
//static update
//static delete

};