import express from "express";
import config from "./config";
import usuariosRoutes from "./routes/usuarios.routes";
import facultadesRoutes from "./routes/facultades.routes";
import carrerasRoutes from "./routes/carreras.routes";
import estudiantesRoutes from "./routes/estudiantes.routes";
import morgan from "morgan";

const app = express();

//settings
app.set("port", config.port);
// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", usuariosRoutes);
app.use("/api", facultadesRoutes);
app.use("/api", carrerasRoutes);
app.use("/api", estudiantesRoutes);

export default app;
