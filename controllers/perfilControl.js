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

    async patchPerfil(req, res){
        try{
            const {id_user, nombre, apellido, correo, telefono, documento, perfil, id_nivel} = req.body;

            if(!id_user || !nombre || !apellido || !correo || !telefono || !documento || !perfil || !id_nivel){
                return res.status(400).json({error: "Debe completar el campo de id_perfil, nombre, apellido, correo, telefono, documento, pass, perfil, id_nivel"});
            }

            const perfilPatch = await this.perfilModel.patchPerfilUsuario({id_user, nombre, apellido, correo, telefono, documento, perfil, id_nivel});

            (perfilPatch) ? res.status(200).json({success: true, message: "Perfil actualizado"}) : res.status(400).json({error: "No se pudo actualizar el perfil"});

        }catch(err){
            res.status(500).json({error: err.message});
        }
    }

    async getTipoDeDocumentos(req, res){
        try{
            const tipoDocumentos = await this.perfilModel.getTipoDeDocumentos();
            res.status(200).json(tipoDocumentos);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }

}