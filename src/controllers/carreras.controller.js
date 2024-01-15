import { pool } from "mssql";
import { getConnection, sql, careerQueries } from "../database";
import { facultyExist } from "./facultades.controller";

export const getCareers = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(careerQueries.getCareers);
    if (result.recordset.length === 0) {
      res.status(404).json({ msg: "No existen datos" });
    } else {
      res.json(result.recordset);
    }
  } catch (error) {
    console.error("Error al obtener lista de carreras:", error.message);
    res.status(500).json({ error: "Error al obtener lista de carreras" });
  } finally {
    pool && (await pool.close());
  }
};

export const getCareerById = async (req, res) => {
  const { idCarrera } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("idCarrera", idCarrera)
      .query(careerQueries.getCareerById);
    if (result.recordset.length === 0) {
      res.status(404).json({ msg: "No existen datos" });
    } else {
      res.json(result.recordset);
    }
  } catch (error) {
    console.error("Error al obtener la carrera por ID:", error.message);
    res.status(500).json({ error: "Error al obtener la carrera por ID" });
  } finally {
    pool && (await pool.close());
  }
};

export const getCareerByCarrerName = async (req, res) => {
  const { nombreCarrera } = req.body;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("nombreCarrera", nombreCarrera)
      .query(careerQueries.getCareerByCareerName);
    if (result.recordset.length === 0) {
      res.status(404).json({ msg: "No existen datos" });
    } else {
      res.json(result.recordset);
    }
  } catch (error) {
    console.error("Error al obtener la carrera por Nombre:", error.message);
    res.status(500).json({ error: "Error al obtener la carrera por Nombre" });
  } finally {
    pool && (await pool.close());
  }
};

export const addCareer = async (req, res) => {
  const { nombreCarrera, idFacPer } = req.body;
  try {
    const facultad = await facultyExist(idFacPer);
    if (facultad) {
      console.log(facultad);
      const pool = await getConnection();
      await pool
        .request()
        .input("nombreCarrera", sql.VarChar, nombreCarrera)
        .input("idFacPer", sql.Int, idFacPer)
        .query(careerQueries.addCareer);
      res.json({
        nombreCarrera,
        idFacPer,
        message: {
          msg: "Carrera agregada",
        },
      });
    } else {
      res.json({ msg: "No existe la facultad" });
    }
  } catch (error) {
    console.error("Error al agregar la carrera:", error.message);
    res.status(500).json({ error: "Error al agregar la carrera" });
  } finally {
    pool && (await pool.close());
  }
};

export const deleteCareeryById = async (req, res) => {
  const { idCarrera } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("idCarrera", idCarrera)
      .query(careerQueries.deleteCareerById);
    if (result.rowsAffected[0] === 0) {
      res.json({ msg: "La carrera con ese ID no existe" });
    } else {
      res.json({ msg: "Carrera eliminada" });
    }
  } catch (error) {
    console.error("Error al eliminar la carrera:", error.message);
    res.status(500).json({ error: "Error al eliminar la carrera" });
  } finally {
    pool && (await pool.close());
  }
};

export const updateCareerById = async (req, res) => {
  const { idCarrera } = req.params;
  const { nombreCarrera, idFacPer } = req.body;

  try {
    const facultad = await facultyExist(idFacPer);
    if (facultad) {
      const pool = await getConnection();
      await pool
        .request()
        .input("nombreCarrera", sql.VarChar, nombreCarrera)
        .input("idFacPer", sql.Int, idFacPer)
        .input("idCarrera", idCarrera)
        .query(careerQueries.updateCareerById);
      res.json({
        nombreCarrera,
        idFacPer,
        message: { msg: "Carrera actualizada correctamente" },
      });
    } else {
      res.json({ msg: "La facultad no existe" });
    }
  } catch (error) {
    console.error("Error al actualizar la carrera:", error.message);
    res.status(500).json({ error: "Error al actualizar la carrera" });
  } finally {
    pool && (await pool.close());
  }
};
