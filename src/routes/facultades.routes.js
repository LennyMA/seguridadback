import { Router } from "express";
import {
  addFaculty,
  deleteFacultyById,
  getFaculties,
  getFacultyById,
  getFacultyByName,
  updateFacultyById,
} from "../controllers/facultades.controller";
import {
  validateFacultyData,
  validateUpdatedFacultyData,
} from "../validators/validator";

const router = Router();

router.get("/facultades", getFaculties);
router.get("/facultades/:idFacultad", getFacultyById);
router.post("/facultades/byName/", getFacultyByName);
router.post("/facultades", validateFacultyData, addFaculty);
router.put("/facultades/:idFacultad", validateFacultyData, updateFacultyById);
router.delete("/facultades/:idFacultad", deleteFacultyById);

export default router;
