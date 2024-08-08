#!/usr/bin/env node

interface Student {
    name: string;
    age: number;
    id: number;
    courses: string[];
}

class StudentService {
    private students: Student[] = [];

    addStudent(student: Student) {
        this.students.push(student);
    }
    
    getStudentById(id: number): Student | undefined {
        return this.students.find(student => student.id === id);
    }

    getAllStudents(): Student[] {
        return this.students;
    }
}

// Create an instance of StudentService
const studentService = new StudentService();

class StudentController {
    private studentService: StudentService;

    constructor(studentService: StudentService) {
        this.studentService = studentService;
    }

    addStudent(student: Student) {
        this.studentService.addStudent(student);
    }
  
    getAllStudents(): Student[] {
        return this.studentService.getAllStudents();
    }
}

const generateId = (): number => {
    return Math.floor(Math.random() * 10000);
}

const studentController = new StudentController(studentService);

// Adding Multiple Students
const student1: Student = {
    id: generateId(),
    name: 'Ali',
    age: 20,
    courses: ['Math', 'Science']
};

const student2: Student = {
    id: generateId(),
    name: 'Adam',
    age: 22,
    courses: ['English', 'History']
};

const student3: Student = {
    id: generateId(),
    name: 'Ahmed',
    age: 16,
    courses: ['Physics', 'Chemistry', 'Computer']
};

// Adding students using the controller
studentController.addStudent(student1);
studentController.addStudent(student2);
studentController.addStudent(student3);

console.log(studentController.getAllStudents());