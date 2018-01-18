function Course(course) {
    this.courseID = course['courseID'];
    this.courseName = course['courseName'];
    this.courseDescription = course['courseDescription'];
    this.numberOfStudentsForCourse = course['numberOfStudentsForCourse'];
    this.studentIDs = course['studentIDs'];
}

module.exports.Course = Course;