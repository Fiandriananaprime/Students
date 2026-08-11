import express from "express";
import etudiantRoutes from "./routes/etudiant.routes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
const PORT = process.env.PORT ?? 8080;

app.use(express.json());

app.use("/etudiants", etudiantRoutes);


app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`API démarrée sur http://localhost:${PORT}`);
});
