import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
    user?: { role: string };
}

// Middleware to authenticate user
export const authenticateUser = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as { role: string };
        req.user = decoded; // Attach user data to request object
        next(); // Proceed to the next function
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};
