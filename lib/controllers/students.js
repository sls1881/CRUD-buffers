const { Router } = require('express')

module.exports = Router()
//Post new student
.post('/', (req, res, next) => {
    StudentService
        .create(req.body)
        .then(student => res.send(student))
        .catch(next);
})

//TODO
// //GET all students
// .get('/', (req, res, next) => {})
// //GET student by ID
// .get('/:id', (req, res, next) => {})
// //UPDATE students grade
// .put('/', (req, res, next) => {})
// //DELETE student by ID
// .delete('/', (req, res, next) => {})


