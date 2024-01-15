import { pool } from "mssql";
import { getConnection, sql, userQueries } from "../database";

export const getUsers = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(userQueries.getUsers);
    if (result.recordset.length === 0) {
      res.json({ msg: "No existen datos" });
    } else {
      res.json(result.recordset);
    }
  } catch (error) {
    console.error("Error al obtener lista de usuarios:", error.message);
    res.status(500).json({ error: "Error al obtener lista de usuarios" });
  } finally {
    pool && (await pool.close());
  }
};

export const getUsersAdmin = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(userQueries.getUsersAdmin);
    if (result.recordset.length === 0) {
      res.json({ msg: "No existen datos" });
    } else {
      res.json(result.recordset);
    }
  } catch (error) {
    console.error("Error al obtener lista de administradores:", error.message);
    res
      .status(500)
      .json({ error: "Error al obtener lista de administradores" });
  } finally {
    pool && (await pool.close());
  }
};

export const getUsersSecre = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(userQueries.getUsersSecre);
    if (result.recordset.length === 0) {
      res.json({ msg: "No existen datos" });
    } else {
      res.json(result.recordset);
    }
  } catch (error) {
    console.error("Error al obtener lista de secretarias:", error.message);
    res.status(500).json({ error: "Error al obtener lista de secretarias" });
  } finally {
    pool && (await pool.close());
  }
};

export const addUser = async (req, res) => {
  const { nombreUsuario, emailUsuario, rolUsuario } = req.body;

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("nombreUsuario", sql.VarChar, nombreUsuario)
      .input("emailUsuario", sql.VarChar, emailUsuario)
      .input("rolUsuario", sql.VarChar, rolUsuario)
      .query(userQueries.addUser);
    res.json({
      nombreUsuario,
      emailUsuario,
      rolUsuario,
      message: { msg: "Usuario agregado" },
    });
  } catch (error) {
    console.error("Error al agregar usuario:", error.message);
    res.status(500).json({ error: "Error al agregar usuario" });
  } finally {
    pool && (await pool.close());
  }
};

export const userExist = async (id) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("idUsuario", id)
      .query(userQueries.getUserById);

    if (result.recordset.length === 0) {
      return null;
    }
    return result.recordset[0];
  } catch (error) {
    console.error("Error al encontrar al usuario:", error.message);
    res.status(500).json({ error: "Error al encontrar al usuario" });
  } finally {
    pool && (await pool.close());
  }
};

export const userAdminExist = async (id) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("idUsuario", id)
      .query(userQueries.getUserAdminById);

    if (result.recordset.length === 0) {
      return null;
    }
    return result.recordset[0];
  } catch (error) {
    console.error("Error al encontrar al usuario:", error.message);
    res.status(500).json({ error: "Error al encontrar al usuario" });
  } finally {
    pool && (await pool.close());
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await userExist(id);

    if (!usuario) {
      return res.status(404).json({ msg: "No existe el usuario con ese ID" });
    }
    res.json(usuario);
  } catch (error) {
    console.error("Error al obtener usuario por ID:", error.message);
    res.status(500).json({ error: "Error al obtener usuario por ID" });
  }
};

export const getUserByName = async (req, res) => {
  const { nombreUsuario } = req.body;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("nombreUsuario", nombreUsuario)
      .query(userQueries.getUserByName);
    if (result.recordset.length === 0) {
      res.status(404).json({ msg: "No existe el usuario con ese Nombre" });
    } else {
      res.json(result.recordset);
    }
  } catch (error) {
    console.error("Error al encontrar al usuario:", error.message);
    res.status(500).json({ error: "Error al encontrar al usuario" });
  } finally {
    pool && (await pool.close());
  }
};

export const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("idUsuario", id)
      .query(userQueries.deleteUser);
    if (result.rowsAffected[0] === 0) {
      res.json({ msg: "El usuario con ese id no existe" });
    } else {
      res.json({ msg: "Usuario eliminado" });
    }
  } catch (error) {
    console.error("Error al eliminar usuario:", error.message);
    res.status(500).json({ error: "Error al eliminar usuario" });
  } finally {
    pool && (await pool.close());
  }
};

export const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { nombreUsuario, emailUsuario, rolUsuario } = req.body;

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("nombreUsuario", sql.VarChar, nombreUsuario)
      .input("emailUsuario", sql.VarChar, emailUsuario)
      .input("rolUsuario", sql.VarChar, rolUsuario)
      .input("idUsuario", id)
      .query(userQueries.updateUserById);
    res.json({
      nombreUsuario,
      emailUsuario,
      rolUsuario,
      message: { msg: "Usuario actualizado correctamente" },
    });
  } catch (error) {
    console.error("Error al actualizar usuario:", error.message);
    res.status(500).json({ error: "Error al actualizar usuario" });
  } finally {
    pool && (await pool.close());
  }
};
