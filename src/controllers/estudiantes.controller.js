import { pool } from "mssql";
import { getConnection, sql, studentQueries } from "../database";
import { cargarDesdeExcel } from "../services/estudiante.service";

export const getStudents = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(studentQueries.getStudents);
    if (result.recordset.length === 0) {
      res.json({ msg: "No existen datos" });
    } else {
      res.json(result.recordset);
    }
  } catch (error) {
    console.error("Error al obtener lista de estudiantes:", error.message);
    res.status(500).json({ error: "Error al obtener lista de estudiantes" });
  } finally {
    pool && (await pool.close());
  }
};

export const getStudentById = async (req, res) => {
  const { idEstudiante } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("idEstudiante", idEstudiante)
      .query(studentQueries.getStudentById);
    if (result.recordset.length === 0) {
      return res
        .status(404)
        .json({ msg: "No existe el estudiante con ese ID" });
    }
    res.json(result.recordset[0]);
  } catch (error) {
    console.error("Error al encontrar al estudiante:", error.message);
    res.status(500).json({ error: "Error al encontrar al estudiante" });
  } finally {
    pool && (await pool.close());
  }
};

export const getStudentByName = async (req, res) => {
  const { nombreEst } = req.body;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("nombreEst", nombreEst)
      .query(studentQueries.getStudentByName);
    if (result.recordset.length === 0) {
      return res
        .status(404)
        .json({ msg: "No existe el estudiante con ese Nombre/Apellido" });
    }
    res.json(result.recordset[0]);
  } catch (error) {
    console.error("Error al encontrar al estudiante:", error.message);
    res.status(500).json({ error: "Error al encontrar al estudiante" });
  } finally {
    pool && (await pool.close());
  }
};

export const addStudent = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ error: "No se ha proporcionado un archivo Excel" });
    }

    const estudiantes = await cargarDesdeExcel(req.file.buffer);

    const pool = await getConnection();

    const transaction = await pool.transaction();
    await transaction.begin();

    try {
      for (const estudiante of estudiantes) {
        const { cedulaEst, nombreEst, emailEst, idCarreraPer } = estudiante;

        if (idCarreraPer !== null && !isNaN(idCarreraPer)) {
          await transaction
            .request()
            .input("cedulaEst", sql.VarChar, cedulaEst)
            .input("nombreEst", sql.VarChar, nombreEst)
            .input("emailEst", sql.VarChar, emailEst)
            .input("idCarreraPer", sql.Int, idCarreraPer)
            .query(studentQueries.addStudent);
        } else {
          console.error(
            `Valor problemático para 'idCarreraPer': ${idCarreraPer}`
          );
          // Puedes decidir cómo manejar los casos donde idCarreraPer es NULL o no es un número
        }
      }

      await transaction.commit();
      res.status(200).json({ message: "Carga masiva exitosa" });
    } catch (error) {
      await transaction.rollback();
      console.error(
        "Error al cargar estudiantes desde el archivo Excel:",
        error.message
      );
      res.status(500).json({ error: "Error en la carga masiva desde Excel" });
    }
    // La transacción se cerrará automáticamente al salir del bloque try-catch
  } catch (error) {
    console.error(
      "Error general al cargar estudiantes desde el archivo Excel:",
      error.message
    );
    res
      .status(500)
      .json({ error: "Error general en la carga masiva desde Excel" });
  }
};

export const updateStudentById = async (req, res) => {
  const { idEstudiante } = req.params;
  const { cedulaEst, nombreEst, emailEst, idCarreraPer } = req.body;

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("cedulaEst", sql.VarChar, cedulaEst)
      .input("nombreEst", sql.VarChar, nombreEst)
      .input("emailEst", sql.VarChar, emailEst)
      .input("idCarreraPer", sql.Int, idCarreraPer)
      .input("idEstudiante", idEstudiante)
      .query(studentQueries.updateStudentById);
    res.json({
      cedulaEst,
      nombreEst,
      emailEst,
      idCarreraPer,
      message: { msg: "Estudiante actualizado correctamente" },
    });
  } catch (error) {
    console.error("Error al actualizar estudiante:", error.message);
    res.status(500).json({ error: "Error al actualizar estudiante" });
  } finally {
    pool && (await pool.close());
  }
};

export const deleteStudentById = async (req, res) => {
  const { idEstudiante } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("idEstudiante", idEstudiante)
      .query(studentQueries.deleteStudent);
    if (result.rowsAffected[0] === 0) {
      res.json({ msg: "El estudiante con ese ID no existe" });
    } else {
      res.json({ msg: "Estudiante eliminado" });
    }
  } catch (error) {
    console.error("Error al eliminar estudiante:", error.message);
    res.status(500).json({ error: "Error al eliminar estudiante" });
  } finally {
    pool && (await pool.close());
  }
};
