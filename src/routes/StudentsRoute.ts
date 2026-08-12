import { Router } from "express";
import { Controller } from "../controller/StudentController";

const router = Router();

router.get("/", Controller.findAll);
router.get("/:id", Controller.findById);
router.post("/", Controller.create);
router.put("/:id", Controller.update);
router.patch("/:id", Controller.partialUpdate);
router.delete("/:id", Controller.delete);

export default router;
