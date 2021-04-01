const Student = require('../models/Student');
const { sendSms } = require('..utils/twilio');

module.exports = class StudentService {
    static async create({ studentName }) {
        await sendSms(
        process.env.ORDER_HANDLER_NUMBER,
        'Welcome to the program, ${studentName}!')
        
        const student = await Student.insert({ studentName });
            
        return student;
}
};

