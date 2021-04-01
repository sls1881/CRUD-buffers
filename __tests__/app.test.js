const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Student = require('../lib/models/Student');

//This needs to be import before the mock
const twilio = require('../lib/utils/twilio.js'); 
jest.mock('../lib/utils/twilio.js');

describe('buffer routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  let student;
  beforeEach(async () => {
    student = await Student.insert({ studentName: 'Shelby Strouse', grade: 'A'})

    twilio.sendSms.mockClear();
  })
 
 //Post test
  it('should post a new student to the database and send a welcome text message', () => {
    return request(app)
    .post('/api/v1/students')
    .send({studentName: 'Shelby Strouse', grade: 'A'})
    .then(() => {
      expect(twilio.sendSms).toHaveBeenCalledTimes(1);
    })
  })

  //GET all students test
  it('should get all students from the database', () => {
    return request(app)
    .get('/api/v1/students')
    .then((students) => {
      expect(students.body).toEqual([student]);
    })
  })

  //GET student by ID test
  it('should get a student from the database by ID', () => {
    return request(app)
    .get(`/api/v1/students/${student.id}`)
    .then((studentId) => {
      expect(studentId.body).toEqual(student);
    })
  })

  //Update student by ID
  it('should update a students grade in the database', () => {
const newGrade = {id: '1', studentName: 'Shelby Strouse', grade: 'A-'}

    return request(app)
    .put(`/api/v1/students/${student.id}`)
    .send(newGrade)
    .then((studentGrade) => {
      expect(studentGrade.body).toEqual(newGrade);
    })
  })

  //Delete student by ID
  it('should delete a student by ID from the database', () => {
    // const deleteStudent = {id: '1', studentName: 'Shelby Strouse', grade: 'A'}
    return request(app)
    .delete(`/api/v1/students${student.id}`)
    .send(student)
    .then((oldStudent) => {
      expect(oldStudent.body).toEqual('');
    })
  })
});
