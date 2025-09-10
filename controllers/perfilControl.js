import PerfilModel from "../modelos/perfilModel.js";

export default class PerfilControl {
    perfilModel = new PerfilModel();

    static instance; 

    constructor(){
        if(!PerfilControl.instance){
            PerfilControl.instance = this;
        }
        return PerfilControl.instance;
    }

    //Función para obtener todos los usuarios
    async getDatosPerfil(req, res) {
        try{
            const {id} = req.params;

            if(!id){
                return res.status(400).json({error: "Debe completar el campo de id"});
            }

            const perfil = await this.perfilModel.getDatosPerfil(id);
            res.status(200).json(perfil);

        }catch(err){
            res.status(500).json({error: err.message});
        }
    }

    async getPerfiles(req, res){
        try{
            const perfiles = await this.perfilModel.getPerfiles();
            res.status(200).json(perfiles);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }

}