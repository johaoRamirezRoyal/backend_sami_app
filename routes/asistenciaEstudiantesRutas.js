import { Router } from "express";
import AsistenciaEstudiantesControl from "../controllers/asistenciaEstudiantesControl.js";

const asistenciaEstudiantesControl = new AsistenciaEstudiantesControl(); // 👈 crea la instancia (singleton ya se encarga de no duplicar)
const RouterAsistenciaEstudiantes = Router();

/**
 * Para acceder a las rutas de las asistencias de estudiantes es la siguiente dirección url: http://localhost:3000/api/asistencias_estudiantes
*/

// Ruta para obtener asistencia de un estudiante
RouterAsistenciaEstudiantes.get("/asistencias", async (req, res) => {
    //Ejemplo de ruta con query Params: http://localhost:3000/api/asistencias_estudiantes/asistencias?id_user=1&fecha=2023-01-01
    await asistenciaEstudiantesControl.getAsistenciaEstudiante(req, res);
});

//Ruta para registrar asistencia de un estudiante
RouterAsistenciaEstudiantes.post("/registrarAsistencia", async (req, res) => {
    await asistenciaEstudiantesControl.registrarAsistenciaEstudiante(req, res);
});

//Ruta para obtener asistencias de estudiantes del día actual
RouterAsistenciaEstudiantes.get("/asistenciasDiaHoy", async (req, res) => {
    await asistenciaEstudiantesControl.getAsistenciasEstudiantesDiaHoy(req, res);
});

export default RouterAsistenciaEstudiantes;