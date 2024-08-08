#!/usr/bin/env node
const students = [];
// Function to add a student
function addStudent(student) {
    students.push(student);
}
// Function to get a student by ID
function getStudentById(id) {
    return students.find(student => student.id === id);
}
// Function to get all students
function getAllStudents() {
    return students;
}
// Utility function to generate a unique ID
function generateId() {
    return Math.floor(Math.random() * 10000);
}
// Adding Multiple Students
const student1 = {
    id: generateId(),
    name: 'Ali',
    age: 17,
    courses: ['Math', 'Science']
};
const student2 = {
    id: generateId(),
    name: 'Adam',
    age: 15,
    courses: ['English', 'History']
};
const student3 = {
    id: generateId(),
    name: 'Ahmed',
    age: 16,
    courses: ['Physics', 'Chemistry', 'Computer']
};
// Adding students
addStudent(student1);
addStudent(student2);
addStudent(student3);
// Display all students
console.log(getAllStudents());
export {};
