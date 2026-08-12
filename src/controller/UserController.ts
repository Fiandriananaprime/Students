import { Request, Response } from "express";
import { UserService } from "../service/UserService";

export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    create = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await this.userService.create(req.body);

            res.status(201).json(user);
        } catch (error) {
            if (error instanceof Error && error.message === "User already exists") {
                res.status(409).json({
                    message: "User already exists"
                });
                return;
            }

            res.status(500).json({
                message: "Internal server error"
            });
        }
    };

    findByEmail = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await this.userService.findByEmail(req.params.email);

            if (!user) {
                res.status(404).json({
                    message: "User not found"
                });
                return;
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({
                message: "Internal server error"
            });
        }
    };

    verifyEmail = async (req: Request, res: Response): Promise<void> => {
        try {
            await this.userService.verifyEmail(req.params.id);

            res.status(200).json({
                message: "Email verified successfully"
            });
        } catch (error) {
            res.status(500).json({
                message: "Internal server error"
            });
        }
    };
}