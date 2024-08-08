"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StudentService {
    students = [];
    addStudent(student) {
        this.students.push(student);
    }
    getStudentById(id) {
        return this.students.find(student => student.id === id);
    }
    getAllStudents() {
        return this.students;
    }
}
// Create an instance of StudentService
const studentService = new StudentService();
class StudentController {
    studentService;
    constructor(studentService) {
        this.studentService = studentService;
    }
    addStudent(student) {
        this.studentService.addStudent(student);
    }
    getAllStudents() {
        return this.studentService.getAllStudents();
    }
}
const generateId = () => {
    return Math.floor(Math.random() * 10000);
};
const studentController = new StudentController(studentService);
// Adding Multiple Students
const student1 = {
    id: generateId(),
    name: 'John Doe',
    age: 20,
    courses: ['Math', 'Science']
};
const student2 = {
    id: generateId(),
    name: 'Jane Smith',
    age: 22,
    courses: ['English', 'History']
};
const student3 = {
    id: generateId(),
    name: 'Alice Johnson',
    age: 19,
    courses: ['Physics', 'Chemistry']
};
// Adding students using the controller
studentController.addStudent(student1);
studentController.addStudent(student2);
studentController.addStudent(student3);
console.log(studentController.getAllStudents());
