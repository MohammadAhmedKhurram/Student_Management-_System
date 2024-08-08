#!/usr/bin/env node

interface Student {
    name: string;
    age: number;
    id: number;
    courses: string[];
}

const students: Student[] = [];

// Function to add a student
function addStudent(student: Student): void {
    students.push(student);
}

// Function to get a student by ID
function getStudentById(id: number): Student | undefined {
    return students.find(student => student.id === id);
}

// Function to get all students
function getAllStudents(): Student[] {
    return students;
}

// Utility function to generate a unique ID
function generateId(): number {
    return Math.floor(Math.random() * 10000);
}

// Adding Multiple Students
const student1: Student = {
    id: generateId(),
    name: 'Ali',
    age: 17,
    courses: ['Math', 'Science']
};

const student2: Student = {
    id: generateId(),
    name: 'Adam',
    age: 15,
    courses: ['English', 'History']
};

const student3: Student = {
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
