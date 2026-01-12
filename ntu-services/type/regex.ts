const nanyangStudentEmail: RegExp = /^[a-z]{4}\.[0-9]{7}@student.ntu.edu.sg$/;
const nanyangStudentId: RegExp = /^[UP][0-9]{7}[A-Z]$/;
const nanyangCourseCode: RegExp = /^[A-Z]{2}[0-9]{4};/;

export default { nanyangStudentEmail, nanyangStudentId, nanyangCourseCode };