const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Student = require('../lib/models/Student');

const twilio = require('../lib/utils/twilio.js'); 
jest.mock('../lib/utils/twilio.js');

 describe('buffer routes', () => {
    beforeEach(() => {
      return setup(pool);
    });
 
 describe('test front-end routes', () => {

     //Test front end route POST
     it('should create a new student', async () => {
         const newStudent = {
            id: '1',  
            studentName: 'Chloe Strouse',
              grade: 'B'
          }
    
          const res = await request(app)
            .post('/api/v1/students')
            .send(newStudent)
        
         expect(res.body).toEqual(newStudent)
     })

     //Test front end route GET
     it('should get all the students', async () => {
       const students = await Promise.all([
        Student.insert({studentName: 'Shelby Strouse', grade: 'A'}),
        Student.insert({studentName: 'Chloe Strouse', grade: 'B'}),
        Student.insert({studentName: 'Matt Lund', grade: 'C'})
       ]);

       const res = await request(app)
       .get('/api/v1/students')

      expect(res.body).toEqual(expect.arrayContaining(students))
     })
 })
});