export class User {
    private id?: string;
    private email: string;
    private password: string;
    private userName: string | null;
    private emailVerified: boolean;
    private verificationCode?: string;
    private verificationCodeExpiresAt?: Date;

    constructor(
        email: string,
        password: string
    ) {
        this.email = email;
        this.password = password;
        this.emailVerified = false;
        this.userName = null;
    }

    getId(): string | undefined {
        return this.id;
    }
    setId(id: string): void {
        this.id = id;
    }
    
    getEmail(): string {
        return this.email;
    }

    setEmail(email: string): void {
        this.email = email;
    }
    
    getUserName() : string | null {
        return this.userName
    }
    setUserName(username: string | null): void {
        this.userName= username
    }
    getPassword(): string {
        return this.password;
    }

    setPassword(password: string): void {
        this.password = password;
    }

    isEmailVerified(): boolean {
        return this.emailVerified;
    }

    setEmailVerified(value: boolean): void {
        this.emailVerified = value;
    }

    getVerificationCode(): string | undefined {
        return this.verificationCode;
    }

    setVerificationCode(code: string): void {
        this.verificationCode = code;
    }

    getVerificationCodeExpiresAt(): Date | undefined {
        return this.verificationCodeExpiresAt;
    }

    setVerificationCodeExpiresAt(date: Date): void {
        this.verificationCodeExpiresAt = date;
    }
}