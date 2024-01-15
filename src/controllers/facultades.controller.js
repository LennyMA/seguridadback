import { pool } from "mssql";
import { getConnection, sql, facultyQueries } from "../database";
import { userAdminExist } from "./usuarios.controller";

export const getFaculties = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(facultyQueries.getFaculties);
    if (result.recordset.length === 0) {
      res.status(404).json({ msg: "No existen datos" });
    } else {
      res.json(result.recordset);
    }
  } catch (error) {
    console.error("Error al obtener lista de facultades:", error.message);
    res.status(500).json({ error: "Error al obtener lista de facultades" });
  } finally {
    pool && (await pool.close());
  }
};

export const getFacultyById = async (req, res) => {
  const { idFacultad } = req.params;

  try {
    const facultad = await facultyExist(idFacultad);
    if (!facultad) {
      return res.status(404).json({ msg: "No existe la facultad con ese ID" });
    }
    res.json(facultad);
  } catch (error) {
    console.error("Error al obtener facultad por ID:", error.message);
    res.status(500).json({ error: "Error al obtener facultad por ID" });
  }
};

export const getFacultyByName = async (req, res) => {
  const { nombreFac } = req.body;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("nombreFac", nombreFac)
      .query(facultyQueries.getFacultyByName);

    if (result.recordset.length === 0) {
      res.status(404).json({ msg: "No existen datos" });
    } else {
      res.json(result.recordset);
    }
  } catch (error) {
    console.error("Error al obtener facultad por Nombre:", error.message);
    res.status(500).json({ error: "Error al obtener facultad por Nombre" });
  } finally {
    pool && (await pool.close());
  }
};

export const addFaculty = async (req, res) => {
  const { nombreFac, descripcionFac, idAdminPer } = req.body;

  try {
    if (idAdminPer) {
      const usuario = await userAdminExist(idAdminPer);
      if (usuario) {
        const pool = await getConnection();
        await pool
          .request()
          .input("nombreFac", sql.VarChar, nombreFac)
          .input("descripcionFac", sql.Text, descripcionFac)
          .input("idAdminPer", sql.Int, idAdminPer)
          .query(facultyQueries.addFaculty);
        res.json({
          nombreFac,
          descripcionFac,
          idAdminPer,
          message: {
            msg: "Facultad agregada",
          },
        });
      } else {
        res.json({ msg: "El usuario no existe" });
      }
    } else {
      const pool = await getConnection();
      await pool
        .request()
        .input("nombreFac", sql.VarChar, nombreFac)
        .input("descripcionFac", sql.Text, descripcionFac)
        .input("idAdminPer", sql.Int, null)
        .query(facultyQueries.addFaculty);
      res.json({
        nombreFac,
        descripcionFac,
        message: {
          msg: "Facultad agregada",
        },
      });
    }
  } catch (error) {
    console.error("Error al agregar la facultad:", error.message);
    res.status(500).json({ error: "Error al agregar la facultad" });
  } finally {
    pool && (await pool.close());
  }
};

export const updateFacultyById = async (req, res) => {
  const { idFacultad } = req.params;
  const { nombreFac, descripcionFac, idAdminPer } = req.body;

  try {
    const usuario = await userAdminExist(idAdminPer);
    if (usuario) {
      const pool = await getConnection();
      await pool
        .request()
        .input("nombreFac", sql.VarChar, nombreFac)
        .input("descripcionFac", sql.Text, descripcionFac)
        .input("idAdminPer", sql.Int, idAdminPer)
        .input("idFacultad", idFacultad)
        .query(facultyQueries.updateFacultyById);
      res.json({
        nombreFac,
        descripcionFac,
        idAdminPer,
        message: { msg: "Facultad actualizada correctamente" },
      });
    } else {
      res.json({ msg: "El usuario no existe" });
    }
  } catch (error) {
    console.error("Error al actualizar la facultad:", error.message);
    res.status(500).json({ error: "Error al actualizar la facultad" });
  } finally {
    pool && (await pool.close());
  }
};

export const deleteFacultyById = async (req, res) => {
  const { idFacultad } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("idFacultad", idFacultad)
      .query(facultyQueries.deleteFaculty);
    if (result.rowsAffected[0] === 0) {
      res.json({ msg: "La facultad con ese ID no existe" });
    } else {
      res.json({ msg: "Facultad eliminada" });
    }
  } catch (error) {
    console.error("Error al eliminar la facultad:", error.message);
    res.status(500).json({ error: "Error al eliminar la facultad" });
  } finally {
    pool && (await pool.close());
  }
};

export const facultyExist = async (idFacultad) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("idFacultad", idFacultad)
      .query(facultyQueries.getFacultyById);
    if (result.recordset.length === 0) {
      return null;
    }
    return result.recordset[0];
  } catch (error) {
    console.error("Error al encontrar la facultad:", error.message);
    res.status(500).json({ error: "Error al encontrar la facultad" });
  } finally {
    pool && (await pool.close());
  }
};
