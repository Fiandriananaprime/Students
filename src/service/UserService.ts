import type { User } from "../model/User";
import { UserRepository } from "../dao/UserRepository";
import { EmailService } from "./EmailService";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly emailService: EmailService
    ) {}

    async create(user: User): Promise<User> {
        const existingUser =
            await this.userRepository.findByEmail(
                user.getEmail()
            );

        if (existingUser) {
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(
            user.getPassword(),
            10
        );

        user.setPassword(hashedPassword);

        const createdUser =
            await this.userRepository.create(user);

        const code = this.generateVerificationCode();

        const expiresAt = new Date(
            Date.now() + 10 * 60 * 1000
        );

        await this.userRepository.saveVerificationCode(
            createdUser.getId()!,
            code,
            expiresAt
        );

        await this.emailService.sendVerificationCode(
            createdUser.getEmail(),
            code
        );

        return createdUser;
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findByEmail(email);
    }

    async verifyEmail(
        email: string,
        code: string
    ): Promise<void> {
        const user =
            await this.userRepository.findByEmail(email);

        if (!user) {
            throw new Error("User not found");
        }

        if (user.isEmailVerified()) {
            throw new Error("Email already verified");
        }

        const savedCode = user.getVerificationCode();
        const expiresAt =
            user.getVerificationCodeExpiresAt();

        if (!savedCode || !expiresAt) {
            throw new Error("Verification code not found");
        }

        if (new Date() > expiresAt) {
            throw new Error("Verification code expired");
        }

        if (code !== savedCode) {
            throw new Error("Invalid verification code");
        }

        await this.userRepository.verifyEmail(
            user.getId()!
        );
    }

    async login(
        email: string,
        password: string
    ): Promise<string> {
        const user =
            await this.userRepository.findByEmail(email);

        if (!user) {
            throw new Error("Invalid email or password");
        }

        if (!user.isEmailVerified()) {
            throw new Error("Email not verified");
        }

        const validPassword =
            await bcrypt.compare(
                password,
                user.getPassword()
            );

        if (!validPassword) {
            throw new Error("Invalid email or password");
        }

        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error("JWT_SECRET is not configured");
        }

        return jwt.sign(
            {
                userId: user.getId(),
                email: user.getEmail(),
                userName: user.getUserName()
            },
            secret,
            {
                expiresIn: "1h"
            }
        );
    }

    async resendVerificationCode(
        email: string
    ): Promise<void> {
        const user =
            await this.userRepository.findByEmail(email);

        if (!user) {
            throw new Error("User not found");
        }

        if (user.isEmailVerified()) {
            throw new Error("Email already verified");
        }

        const code = this.generateVerificationCode();

        const expiresAt = new Date(
            Date.now() + 10 * 60 * 1000
        );

        await this.userRepository.saveVerificationCode(
            user.getId()!,
            code,
            expiresAt
        );

        await this.emailService.sendVerificationCode(
            user.getEmail(),
            code
        );
    }

    async checkPassword(
        password: string,
        hashedPassword: string
    ): Promise<boolean> {
        return bcrypt.compare(
            password,
            hashedPassword
        );
    }

    private generateVerificationCode(): string {
        return Math.floor(
            100000 + Math.random() * 900000
        ).toString();
    }
}