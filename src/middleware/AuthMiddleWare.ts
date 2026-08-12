import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    user?: {
        userId: string;
        email: string;
        userName: string;
    };
}

export function authMiddleware(
    req: AuthRequest,
    res: Response,
    next: NextFunction
): void {
    const authorization =
        req.headers.authorization;

    if (!authorization) {
        res.status(401).json({
            message: "Authentication required"
        });
        return;
    }

    const [type, token] =
        authorization.split(" ");

    if (type !== "Bearer" || !token) {
        res.status(401).json({
            message: "Invalid authorization format"
        });
        return;
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
        res.status(500).json({
            message: "JWT_SECRET is not configured"
        });
        return;
    }

    try {
        const decoded = jwt.verify(
            token,
            secret
        ) as AuthRequest["user"];

        req.user = decoded;

        next();

    } catch {
        res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}