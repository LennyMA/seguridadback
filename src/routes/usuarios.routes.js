import { Router } from "express";
import {
  getUsers,
  addUser,
  deleteUserById,
  updateUserById,
  getUserByName,
  getUsersAdmin,
  getUsersSecre,
  getUserById,
} from "../controllers/usuarios.controller";
import {
  validateUserData,
} from "../validators/validator";

const router = Router();

router.get("/usuarios", getUsers);
router.get("/usuarios/:id", getUserById);
router.get("/usuarios/admin", getUsersAdmin);
router.get("/usuarios/secre", getUsersSecre);
router.post("/usuarios/byName/", getUserByName);
router.post("/usuarios", validateUserData, addUser);
router.put("/usuarios/:id", validateUserData, updateUserById);
router.delete("/usuarios/:id", deleteUserById);

export default router;
