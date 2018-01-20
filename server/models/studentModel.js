function Student(student) {
    this.id = student['id'];
    this.studentName = student['studentName'];
    this.studentPhone = student['studentPhone'];
    this.studentEmail = student['studentEmail'];
    this.studentCourses = student['studentCourses'];
}

module.exports.Student = Student;