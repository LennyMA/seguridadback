import { check } from "express-validator";
import { validateResult } from "../helpers/validate.helper";

export const validateUserData = [
  check("nombreUsuario").exists().not().isEmpty().isLength({ min: 3 }),
  check("emailUsuario").exists().not().isEmpty().isEmail(),
  check("rolUsuario").exists().not().isEmpty().isLength({ min: 1 }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const validateFacultyData = [
  check("nombreFac").exists().not().isEmpty().isLength({ min: 3 }),
  check("descripcionFac").exists().not().isEmpty().isLength({ min: 8 }),
  check("idAdminPer").optional().isLength({ min: 1 }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const validateCareerData = [
  check("nombreCarrera").exists().not().isEmpty().isLength({ min: 2 }),
  check("idFacPer").exists().not().isEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const validateStudentData = [
  check("cedulaEst").exists().not().isEmpty().isLength({ max: 10 }),
  check("nombreEst").exists().not().isEmpty().isLength({ min: 10 }),
  check("emailEst").exists().not().isEmpty().isEmail(),
  check("idCarreraPer").exists().not().isEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
