export const userQueries = {
  getUsers: "SELECT * FROM USUARIOS",
  getUserById: "SELECT * FROM USUARIOS WHERE idUsuario = @idUsuario",
  getUsersAdmin:
    "SELECT * FROM USUARIOS WHERE UPPER(rolUsuario) = 'ADMINISTRADOR'",
  getUsersSecre:
    "SELECT * FROM USUARIOS WHERE UPPER(rolUsuario) = 'SECRETARIA'",
  getUserByName:
    "SELECT * FROM USUARIOS WHERE nombreUsuario LIKE '%' + @nombreUsuario + '%'",
  addUser:
    "INSERT INTO USUARIOS ( nombreUsuario, emailUsuario, rolUsuario) VALUES ( @nombreUsuario, @emailUsuario, @rolUsuario)",
  getUserAdminById:
    "SELECT * FROM USUARIOS WHERE idUsuario = @idUsuario AND UPPER(rolUsuario) = 'ADMINISTRADOR'",
  updateUserById:
    "UPDATE USUARIOS SET nombreUsuario = COALESCE(@nombreUsuario, nombreUsuario), emailUsuario = COALESCE(@emailUsuario, emailUsuario), rolUsuario = COALESCE(@rolUsuario, rolUsuario) WHERE idUsuario = @idUsuario",
  deleteUser: "DELETE FROM USUARIOS WHERE idUsuario = @idUsuario",
};

export const facultyQueries = {
  getFaculties: "SELECT * FROM FACULTADES",
  getFacultyById: "SELECT * FROM FACULTADES WHERE idFacultad = @idFacultad",
  getFacultyByName:
    "SELECT * FROM FACULTADES WHERE nombreFac LIKE '%' + @nombreFac + '%'",
  addFaculty:
    "INSERT INTO FACULTADES (nombreFac, descripcionFac, idAdminPer) VALUES (@nombreFac, @descripcionFac, @idAdminPer)",
  updateFacultyById:
    "UPDATE FACULTADES SET nombreFac = COALESCE(@nombreFac, nombreFac), descripcionFac = COALESCE(@descripcionFac, descripcionFac), idAdminPer = COALESCE(@idAdminPer, idAdminPer) WHERE idFacultad = @idFacultad",
  deleteFaculty: "DELETE FROM FACULTADES WHERE idFacultad = @idFacultad",
};

export const careerQueries = {
  getCareers: "SELECT * FROM CARRERAS",
  getCareerById: "SELECT * FROM CARRERAS WHERE idCarrera = @idCarrera",
  getCareerByCareerName:
    "SELECT * FROM CARRERAS WHERE nombreCarrera LIKE '%' + @nombreCarrera + '%'",
  addCareer:
    "INSERT INTO CARRERAS (nombreCarrera, idFacPer) VALUES (@nombreCarrera, @idFacPer)",
  updateCareerById:
    "UPDATE CARRERAS SET nombreCarrera = COALESCE(@nombreCarrera, nombreCarrera), idFacPer = COALESCE(@idFacPer, idFacPer) WHERE idCarrera = @idCarrera",
  deleteCareerById: "DELETE FROM CARRERAS WHERE idCarrera = @idCarrera",
};

export const studentQueries = {
  getStudents: "SELECT * FROM ESTUDIANTES",
  getStudentById:
    "SELECT * FROM ESTUDIANTES WHERE idEstudiante = @idEstudiante",
  getStudentByName:
    "SELECT * FROM ESTUDIANTES WHERE nombreEst LIKE '%' + @nombreEst + '%'",
  addStudent:
    "INSERT INTO ESTUDIANTES (cedulaEst, nombreEst, emailEst, idCarreraPer) VALUES (@cedulaEst, @nombreEst, @emailEst, @idCarreraPer)",
  updateStudentById:
    "UPDATE ESTUDIANTES SET cedulaEst = COALESCE(@cedulaEst, cedulaEst), nombreEst = COALESCE(@nombreEst, nombreEst), emailEst = COALESCE(@emailEst, emailEst), idCarreraPer = COALESCE(@idCarreraPer, idCarreraPer) WHERE idEstudiante = @idEstudiante",
  deleteStudent: "DELETE FROM ESTUDIANTES WHERE idEstudiante = @idEstudiante",
};
