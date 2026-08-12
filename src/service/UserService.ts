import type { User } from "../model/User";
import { UserRepository } from "../dao/UserRepository";

export class UserService {
    constructor(
        private readonly userRepository: UserRepository
    ) {}

    async create(user: User): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(user.email);

    if (existingUser) {
        throw new Error("User already exists");
    }

    return this.userRepository.create(user);
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findByEmail(email);
    }

    async verifyEmail(id: string): Promise<void> {
        await this.userRepository.verifyEmail(id);
    }

    async saveVerificationCode(
        id: string,
        code: string,
        expiresAt: Date
    ): Promise<void> {
        await this.userRepository.saveVerificationCode(
            id,
            code,
            expiresAt
        );
    }
}