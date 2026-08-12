import express from "express";
import StudentsRoute from "./routes/StudentsRoute";
import { errorHandler } from "./middleware/errorHandler";
import cors from 'cors'

const app = express();
const PORT = Number(process.env.PORT) ?? 8080;


app.use(cors)

app.use(express.json());

app.use("/Students", StudentsRoute);


app.use(errorHandler);

app.listen(PORT, "0.0.0.0",() => {
  console.log(`API démarrée sur http://localhost:${PORT}`);
});
