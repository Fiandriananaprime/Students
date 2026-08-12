import express from "express";
import StudentsRoute from "./routes/StudentsRoute";
import UserRoute from "./routes/UserRoute";
import { errorHandler } from "./middleware/errorHandler";
import { authMiddleware } from "./middleware/AuthMiddleWare";
import cors from "cors";

const app = express();

const PORT = Number(process.env.PORT) || 8080;

app.use(cors({
    origin: process.env.FRONTEND_URL
}));

app.use(express.json());

app.use("/auth", UserRoute);

app.use("/students", authMiddleware, StudentsRoute);

app.use(errorHandler);

console.log(process.env.FRONTEND_URL);

app.listen(PORT, "0.0.0.0", () => {
    console.log(`API démarrée sur http://localhost:${PORT}`);
});