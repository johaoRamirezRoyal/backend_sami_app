import InventarioModel from "../modelos/inventarioModel.js";

export default class InventarioControl{
    constructor(){
        this.inventarioModel = new InventarioModel();
    }

    async getInventarioIdUsuarioControl(req, res){
        const {id} = req.params;
        
        if(!id){
            res.status(400).json({error: "Falta el id del usuario"});
            return;
        }

        try{
            const result = await this.inventarioModel.getInventarioIdUsuarioModel(id);
            res.status(200).json(result);
        }catch(error){
            res.status(500).json({error: error.message});
        }
    }

    async getInventarioGeneralControl(req, res){
        const {page, limit} = req.query || {page: 1, limit: 50};

        try{
            const result = await this.inventarioModel.getInventarioGeneralModel(page, limit);
            res.status(200).json(result);
        }catch(error){
            res.status(500).json({error: error.message});
        }
    }
}