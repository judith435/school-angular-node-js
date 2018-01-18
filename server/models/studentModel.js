function Student(student) {
    this.studentID = student['studentID'];
    this.studentName = student['studentName'];
    this.studentPhone = student['studentPhone'];
    this.studentEmail = student['studentEmail'];
    this.studentCourses = student['studentCourses'];
}

module.exports.Student = Student;