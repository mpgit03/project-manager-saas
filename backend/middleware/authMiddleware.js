import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { asynchandler } from "./asynchandler.js";

const protect = asynchandler(async (req, res, next) => {
    if (
        !req.headers.authorization ||
        !req.headers.authorization.startsWith("Bearer ")
    ) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }

    try {
        const token = req.headers.authorization.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY
        );

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            res.status(401);
            throw new Error("User no longer exists");
        }

        req.user = user;

        next();
    } catch (error) {
        res.status(401);
        throw new Error("Not authorized, invalid token");
    }
});

export { protect };