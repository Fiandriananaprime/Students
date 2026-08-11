import { Router } from "express";
import { etudiantController } from "../controller/etudiant.controller";

const router = Router();

router.get("/", etudiantController.findAll);
router.get("/:id", etudiantController.findById);
router.post("/", etudiantController.create);
router.put("/:id", etudiantController.update);
router.patch("/:id", etudiantController.partialUpdate);
router.delete("/:id", etudiantController.delete);

export default router;
