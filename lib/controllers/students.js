const { Router } = require('express');
const Student = require('../models/Student');
const StudentService = require('../services/StudentServices')

module.exports = Router()
//Post new student
.post('/', (req, res, next) => {
    StudentService
        .create(req.body)
        .then(student => res.send(student))
        .catch(next);
})

//GET all students
.get('/', (req, res, next) => {
    Student.select()
    .then(students => res.send(students))
    .catch(next);
})

//GET student by ID
.get('/:id', (req, res, next) => {
    Student.selectId(req.params.id)
    .then(student => res.send(student))
    .catch(next);
})

//UPDATE students grade
.put('/:id', (req, res, next) => {
    Student.update(req.params.id, req.body)
    .then(student => res.send(student))
    .catch(next);
})

// //DELETE student by ID
// .delete('/', (req, res, next) => {})


