import { Router } from "express";
import { UserController } from "../controller/UserController";
import { UserService } from "../service/UserService";
import { UserRepository } from "../dao/UserRepository";
import { EmailService } from "../service/EmailService";

const router = Router();

const userRepository =
    new UserRepository();

const emailService =
    new EmailService();

const userService =
    new UserService(
        userRepository,
        emailService
    );

const userController =
    new UserController(
        userService
    );

router.post(
    "/signup",
    userController.signup.bind(userController)
);

router.post(
    "/verify-email",
    userController.verifyEmail.bind(userController)
);

router.post(
    "/resend-verification",
    userController.resendVerificationCode.bind(
        userController
    )
);

router.post(
    "/login",
    userController.login.bind(userController)
);

export default router;