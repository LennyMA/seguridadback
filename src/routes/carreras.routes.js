import { Router } from "express";
import {
  addCareer,
  deleteCareeryById,
  getCareerByCarrerName,
  getCareerById,
  getCareers,
  updateCareerById,
} from "../controllers/carreras.controller";
import {
  validateCareerData,
  validateUpdatedCareerData,
} from "../validators/validator";

const router = Router();

router.get("/carreras", getCareers);
router.get("/carreras/:idCarrera", getCareerById);
router.post("/carreras/byCareerName/", getCareerByCarrerName);
router.post("/carreras", validateCareerData, addCareer);
router.put("/carreras/:idCarrera", validateCareerData, updateCareerById);
router.delete("/carreras/:idCarrera", deleteCareeryById);

export default router;
