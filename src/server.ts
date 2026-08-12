import express from "express";
import StudentsRoute from "./routes/StudentsRoute";
import { errorHandler } from "./middleware/errorHandler";
import cors from 'cors'

const app = express();
const PORT = Number(process.env.PORT) || 8080;


app.use(cors({origin:process.env.FRONTEND_URL}))

app.use(express.json());

app.use("/students", StudentsRoute);


app.use(errorHandler);

console.log("PORT =", process.env.PORT);
console.log("FRONTEND_URL =", process.env.FRONTEND_URL);
app.listen(PORT, "0.0.0.0",() => {
  console.log(`API démarrée sur http://localhost:${PORT}`);
});
