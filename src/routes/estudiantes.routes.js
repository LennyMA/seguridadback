import { Router } from "express";
import {
  addStudent,
  deleteStudentById,
  getStudentById,
  getStudentByName,
  getStudents,
  updateStudentById,
} from "../controllers/estudiantes.controller";
import { validateStudentData } from "../validators/validator";
import multer from "multer";

const router = Router();

// Configuración de multer para aceptar cualquier nombre de archivo
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/estudiantes", getStudents);
router.get("/estudiantes/:idEstudiante", getStudentById);
router.post("/estudiantes/byName/", getStudentByName);
router.post("/estudiantes", upload.single("archivo"), addStudent);
router.put("/estudiantes/:idEstudiante", validateStudentData, updateStudentById);
router.delete("/estudiantes/:idEstudiante", deleteStudentById);

export default router;
