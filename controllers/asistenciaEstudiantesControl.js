import AsistenciaEstudianteModel from "../modelos/asistenciaEstudianteModel.js";
import UsuariosModel from "../modelos/usuariosModel.js";

export default class AsistenciaEstudiantesControl {
    asistenciaEstudianteModel = new AsistenciaEstudianteModel();

    static instance; 

    constructor(){
        if(!AsistenciaEstudiantesControl.instance){
            AsistenciaEstudiantesControl.instance = this;
        }
        return AsistenciaEstudiantesControl.instance;
    }

    //Función para obtener asistencia de un estudiante
    async getAsistenciaEstudiante(req, res){
        try{
            const {id_user, fecha} = req.query;

            if(!id_user || !fecha){
                return res.status(400).json({error: "Debe completar el campo de id y fecha"});
            }

            const asistencia = await this.asistenciaEstudianteModel.getAsistenciaEstudiante(id_user, fecha);
            res.status(200).json(asistencia);

        }catch(err){
            res.status(500).json({error: err.message});
        }
    }

    //Función para registrar asistencia de un estudiante
    async registrarAsistenciaEstudiante(req, res){
        try{
            const {documento, fecha_registro, hora_registro} = req.body;

            if(!documento || !fecha_registro || !hora_registro){
                return res.status(400).json({error: "Debe completar el campo de id, documento, fecha, hora"});
            }

            //Buscar si el usuario existe
            const usuario = await this.usuariosModel.getUsuarioConDocumento(documento);

            if(usuario.length === 0 || !usuario || usuario === null){
                return res.status(400).json({error: "Usuario no encontrado"});
            }

            //Buscar si el usuario está activo
            if(usuario.estado !== "activo"){
                return res.status(400).json({error: "Usuario no activo, habla con el administrador de S. A. M. I"});
            }

            const asistencia = await this.asistenciaEstudianteModel.registrarAsistenciaEstudiante({documento, fecha_registro, hora_registro});
            res.status(200).json(asistencia);

        }catch(err){
            res.status(500).json({error: err.message});
        }
    }

    //Funcion para traer las asistencias de estudiantes del día actual
    async getAsistenciasEstudiantesDiaHoy(req, res){
        try{
            const asistencias = await this.asistenciaEstudianteModel.getAsistenciasEstudiantesDiaHoy();
            res.status(200).json(asistencias);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }

}