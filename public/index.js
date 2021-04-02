//Dom elements
const form = document.getElementById('new-student');
const ol = document.getElementById('student-list');

//Render OL function
const newStudent = (student) => {
const li = document.createElement('li');
li.textContent = `Name: ${student.studentName}, grade: ${student.grade}`
ol.appendChild(li);
} 

//On submit
form.addEventListener('submit', (e) => {
e.preventDefault();
//Form data
const formData = new FormData(form);

//Fetch the api
fetch('/api/v1/students', {
    method: 'POST',
    headers: {
        'Content-type': 'application/json',
    },
    body: JSON.stringify({
        studentName: formData.get('student'),
        grade: formData.get('grade')
    }),
    })
    .then((res) => res.json())
    .then(newStudent);
}) 
//Fetch to render OL
fetch('/api/v1/students')
.then((res) => res.json())
.then((students) => {
    students.forEach(newStudent);
});