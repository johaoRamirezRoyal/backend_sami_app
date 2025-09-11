import AsistenciaEstudianteModel from "../modelos/asistenciaEstudianteModel.js";

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

            const asistencia = await this.asistenciaEstudianteModel.registrarAsistenciaEstudiante({documento, fecha_registro, hora_registro});
            res.status(200).json(asistencia);

        }catch(err){
            res.status(500).json({error: err.message});
        }
    }

}