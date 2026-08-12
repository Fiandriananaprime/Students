import { Router } from "express";
import { UserController } from "../controller/UserController";
import { UserService } from "../service/UserService";
import { UserRepository } from "../dao/UserRepository";
import pool from "../configuration/database";

const router = Router();

const userRepository = new UserRepository(pool);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post("/", userController.create);

router.get("/email/:email", userController.findByEmail);

router.patch("/:id/verify-email", userController.verifyEmail);

export default router;