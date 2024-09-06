#! /usr/bin/env node

import inquirer from "inquirer";
import fs from "fs";
import chalk from "chalk";

interface Student {
    name: string;
    age: number;
    id: string;
    courses: string;
}

// File paths
const dataFilePath = "students.json";
const coursesFilePath = "courses.json";

// Load existing students
function loadStudents(): Student[] {
    if (fs.existsSync(dataFilePath)) {
        try {
            const data = fs.readFileSync(dataFilePath, "utf-8");
            return data.trim().length ? JSON.parse(data) : [];
        } catch (error) {
            console.error(chalk.red("Error reading or parsing students.json:"), error);
            return [];
        }
    }
    return [];
}

// Save students
function saveStudents(students: Student[]) {
    fs.writeFileSync(dataFilePath, JSON.stringify(students, null, 2));
}

// Generate unique student ID
function generateId(): string {
    let id: string;
    do {
        let r1: number = Math.floor(Math.random() * 9 + 1);
        let r2: number = Math.floor(Math.random() * 9 + 1);
        let r3: number = Math.floor(Math.random() * 9 + 1);
        let r4: number = Math.floor(Math.random() * 9 + 1);
        let r5: number = Math.floor(Math.random() * 9 + 1);
        id = `${r1}${r2}${r3}${r4}${r5}`;
    } while (studentIds.includes(id));
    studentIds.push(id);
    return id;
}

// Load existing courses
function loadCourses(): string[] {
    if (fs.existsSync(coursesFilePath)) {
        try {
            const data = fs.readFileSync(coursesFilePath, "utf-8");
            return data.trim().length ? JSON.parse(data) : [];
        } catch (error) {
            console.error(chalk.red("Error reading or parsing courses.json:"), error);
            return [];
        }
    }
    return [];
}

// Save courses
function saveCourses(courses: string[]) {
    fs.writeFileSync(coursesFilePath, JSON.stringify(courses, null, 2));
}

// Initialize
let studentIds: string[] = [];
let students: Student[] = loadStudents();
let courses: string[] = loadCourses();
let condition: boolean = true;

// Main loop
while (condition) {
    const menu = await inquirer.prompt([
        {
            type: "list",
            name: "Menu",
            message: chalk.yellow("-- Please choose an option --"),
            choices: [
                "Add Student",
                "Edit Student",
                "Delete Student",
                "Get Student By ID",
                "Get All Students",
                "Manage Courses",
                chalk.red("Exit"),
            ],
        },
    ]);

    // Add Student
    if (menu.Menu === "Add Student") {
        const questions = await inquirer.prompt([
            {
                type: "input",
                message: chalk.blue("Student Name?"),
                name: "Name",
                validate: (input) => (input ? true : chalk.red("Student Name is required...")),
            },
            {
                type: "input",
                message: chalk.blue("Student Age?"),
                name: "Age",
                validate: (input) => (input ? true : chalk.red("Student Age is required...")),
            },
            {
                type: "list",
                message: chalk.blue("Course Enrollment"),
                name: "Course",
                choices: courses,
                validate: (input) => (input ? true : chalk.red("Student Course is required...")),
            },
        ]);

        const newStudentId = generateId();
        const newStudent: Student = {
            name: questions.Name,
            age: questions.Age,
            id: newStudentId,
            courses: questions.Course,
        };
        students.push(newStudent);
        saveStudents(students);

        console.log(chalk.greenBright("New student added successfully!"));
        console.log(chalk.cyan(JSON.stringify(newStudent, null, 2)));
    }

    // Edit Student
    else if (menu.Menu === "Edit Student") {
        const editStd = await inquirer.prompt({
            type: "input",
            message: chalk.blue("Enter the ID of the student to edit..."),
            name: "EditStd",
            validate: (input) => (input ? true : chalk.red("Student ID is required...")),
        });

        const studentIndex = students.findIndex((student) => student.id === editStd.EditStd);
        if (studentIndex !== -1) {
            const updatedDetails = await inquirer.prompt([
                {
                    type: "input",
                    message: chalk.blue("Updated Name (leave blank to keep current name)..."),
                    name: "Name",
                    filter: (input) => input ? input.replace(/\b\w/g, (char: string) => char.toUpperCase()) : undefined,
                },
                {
                    type: "input",
                    message: chalk.blue("Updated Age (leave blank to keep current age)..."),
                    name: "Age",
                },
                {
                    type: "list",
                    message: chalk.blue("Updated Course Enrollment (leave blank to keep current course)..."),
                    name: "Course",
                    choices: courses,
                },
            ]);

            if (updatedDetails.Name) students[studentIndex].name = updatedDetails.Name;
            if (updatedDetails.Age) students[studentIndex].age = updatedDetails.Age;
            if (updatedDetails.Course) students[studentIndex].courses = updatedDetails.Course;
            saveStudents(students);

            console.log(chalk.greenBright("Student details updated successfully!"));
        } else {
            console.log(chalk.red("Student not found with the given ID."));
        }
    }

    // Delete Student
    else if (menu.Menu === "Delete Student") {
        const deleteStd = await inquirer.prompt({
            type: "input",
            message: chalk.blue("Enter the ID of the student to delete..."),
            name: "DeleteStd",
            validate: (input) => (input ? true : chalk.red("Student ID is required...")),
        });

        const studentIndex = students.findIndex(student => student.id === deleteStd.DeleteStd);
        if (studentIndex !== -1) {
            const removedStudent = students.splice(studentIndex, 1)[0];
            saveStudents(students);
            console.log(chalk.greenBright("Student deleted successfully!"));
            console.log(chalk.cyan(JSON.stringify(removedStudent, null, 2)));
        } else {
            console.log(chalk.red("Student not found with the given ID."));
        }
    }

    // Get Student By ID
    else if (menu.Menu === "Get Student By ID") {
        const getStd = await inquirer.prompt({
            type: "input",
            message: chalk.blue("Enter the ID of the student..."),
            name: "GetStd",
            validate: (input) => (input ? true : chalk.red("Student ID is required...")),
        });

        const student = students.find(student => student.id === getStd.GetStd);
        student ? console.log(chalk.cyan(JSON.stringify(student, null, 2)))
            : console.log(chalk.red("No student found with the given ID."));
    }

    // Get All Students
    else if (menu.Menu === "Get All Students") {
        students.length ? students.forEach(student => console.log(chalk.cyan(JSON.stringify(student, null, 2))))
            : console.log(chalk.yellow("No students found."));
    }

    // Manage Courses
    else if (menu.Menu === "Manage Courses") {
        const action = await inquirer.prompt({
            type: "list",
            name: "Action",
            message: chalk.yellow("What would you like to do?"),
            choices: [
                "Add Course",
                "Edit Course",
                "Remove Course",
                "View all Courses",
                chalk.red("Back to Main Menu"),
            ],
        });

        if (action.Action === "Add Course") {
            const newCourse = await inquirer.prompt({
                type: "input",
                name: "NewCourse",
                message: chalk.blue("Enter the name of the new course:"),
                validate: (input) => (input ? true : chalk.red("Course name is required...")),
            });

            courses.push(newCourse.NewCourse);
            saveCourses(courses);
            console.log(chalk.greenBright(`Course '${newCourse.NewCourse}' added successfully!`));

        } else if (action.Action === "Edit Course") {
            const selectCourse = await inquirer.prompt({
                type: "list",
                name: "courseToEdit",
                message: chalk.blue("Select the course you want to edit:"),
                choices: courses,
            });

            const updatedCourse = await inquirer.prompt({
                type: "input",
                name: "updatedCourse",
                message: chalk.blue("Enter the new name for the course:"),
                validate: (input) => (input ? true : chalk.red("New course name is required...")),
            });

            const courseIndex = courses.indexOf(selectCourse.courseToEdit);
            if (courseIndex !== -1) {
                courses[courseIndex] = updatedCourse.updatedCourse;
                saveCourses(courses);
                console.log(chalk.greenBright(`Course updated to '${updatedCourse.updatedCourse}' successfully!`));
            }

        } else if (action.Action === "Remove Course") {
            const courseToRemove = await inquirer.prompt({
                type: "list",
                name: "courseToRemove",
                message: chalk.blue("Select the course to remove:"),
                choices: courses,
            });

            courses = courses.filter(course => course !== courseToRemove.courseToRemove);
            saveCourses(courses);
            console.log(chalk.greenBright(`Course '${courseToRemove.courseToRemove}' removed successfully!`));

        } else if (action.Action === "View all Courses") {
            courses.length ? courses.forEach(course => console.log(chalk.cyan(course)))
                : console.log(chalk.yellow("No courses available."));
        }
    }

    // Exit
    else if (menu.Menu === chalk.red("Exit")) {
        console.log(chalk.magentaBright("Goodbye!"));
        condition = false;
    }
}




