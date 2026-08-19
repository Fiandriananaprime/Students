import { Request, Response } from "express";
import { User } from "../model/User";
import { UserService } from "../service/UserService";

export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    async signup(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const {
                email,
                password,
                userName
            } = req.body;

            if (!email || !password) {
                res.status(400).json({
                    message:
                        "Email and password are required"
                });
                return;
            }

            const user = new User(
                email,
                password
            );


            await this.userService.create(user);

            res.status(201).json({
                message:
                    "User created. Verification code sent to email."
            });

        } catch (error) {
            if (
                error instanceof Error &&
                error.message ===
                    "User already exists"
            ) {
                res.status(409).json({
                    message:
                        "User already exists. Please login."
                });
                return;
            }

            console.error(error);

            res.status(500).json({
                message:
                    "Internal server error"
            });
        }
    }

    async verifyEmail(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const {
                email,
                code
            } = req.body;

            if (!email || !code) {
                res.status(400).json({
                    message:
                        "Email and code are required"
                });
                return;
            }

            await this.userService.verifyEmail(
                email,
                code
            );

            res.status(200).json({
                message:
                    "Email verified successfully"
            });

        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({
                    message: error.message
                });
                return;
            }

            res.status(500).json({
                message:
                    "Internal server error"
            });
        }
    }

    async login(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const {
                email,
                password
            } = req.body;

            if (!email || !password) {
                res.status(400).json({
                    message:
                        "Email and password are required"
                });
                return;
            }

            const token =
                await this.userService.login(
                    email,
                    password
                );

            res.status(200).json({
                message: "Login successful",
                token
            });

        } catch (error) {
            if (error instanceof Error) {
                res.status(401).json({
                    message: error.message
                });
                return;
            }

            res.status(500).json({
                message:
                    "Internal server error"
            });
        }
    }

    async resendVerificationCode(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const { email } = req.body;

            if (!email) {
                res.status(400).json({
                    message: "Email is required"
                });
                return;
            }

            await this.userService
                .resendVerificationCode(email);

            res.status(200).json({
                message:
                    "Verification code sent"
            });

        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({
                    message: error.message
                });
                return;
            }

            res.status(500).json({
                message:
                    "Internal server error"
            });
        }
    }
}