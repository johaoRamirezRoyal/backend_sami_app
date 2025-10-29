import ReportesModel from "../modelos/reportesModel.js";

const hoy = new Date();
const opciones = { 
  timeZone: "America/Bogota", 
  day: "2-digit", 
  month: "2-digit", 
  year: "numeric" 
};
const fecha = hoy.toLocaleDateString("es-ES", opciones);

export default class ReportesControl {
    
    reportesModel = new ReportesModel();

    //Singleton para el controlador de reportes
    static instance;

    constructor(){
        if(!ReportesControl.instance){
            ReportesControl.instance = this;
        }
        return ReportesControl.instance;
    }

    async getReportesGeneral(req, res){
        try{
            const reportes = await this.reportesModel.getReportesGeneral();
            res.status(200).json(reportes);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }

    async getInformacionReporteArticulo(req, res){
        try{
            const {id} = req.params;
            
            if(!id){
                return res.status(400).json({error: "Debe completar el campo de id"});
            }

            const data = await this.reportesModel.getInformacionReporteArticulo(id);
            res.status(200).json(data);

        }catch(err){
            res.status(500).json({error: err.message});
        }
    }

    //Solucionar un reporte de inventario
    async solucionarReporte(req, res){
        try{
            const {id_inventario, observacion, id_log, fecha_respuesta, id_user, id_area} = req.body;

            if(!id_inventario || !id_area || !observacion || !id_log ){
                return res.status(400).json({error: "Debe completar el los campos de id_inventario, observacion, id_log, id_resp, id_area"});
            }

            const info_reporte = await this.reportesModel.getInformacionReporteArticulo(id_inventario);
            
            if(!info_reporte){
                return res.status(400).json({error: "No existe el reporte"});
            }

            const data = {
                id_inventario,
                observacion,
                estado: 2,
                id_log: id_log || info_reporte.id_log,
                id_resp: info_reporte.id_log,
                fecha_respuesta: fecha_respuesta || fecha,
                tipo_reporte: info_reporte.tipo_reporte,
                id_reporte: info_reporte.id,
                id_user,
                id_area,
            }

            //console.table(data);

            const solucion = await this.reportesModel.solucionarReporte(data);
            res.status(200).json(solucion);

        }catch(err){
            res.status(500).json({error: err.message});
        }
    }

}