const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Student = require('../lib/models/Student');

jest.mock('../lib/utils/twilio.js');
const twilio = require('../lib/utils/twilio.js'); 

describe('buffer routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  let student;
  beforeEach(async () => {
    student = await Student.insert({ studentName: 'Shelby Strouse', grade: 'A'})

    twilio.sendSms.mockClear();
  })

  it('should post a new student to the database and send a welcome text message', () => {
    return request(app)
    .post('/api/v1/students')
    .send({studentName: 'Shelby Strouse', grade: 'A'})
    .then(() => {
      expect(twilio.sendSms).toHaveBeenCalledTimes(1);
    })
  })
});
