import PermisoModel from "../modelos/permisosModelo.js";

export default class PermisosControl {
    permisoModel = new PermisoModel();

    static instance; 

    constructor(){
        if(!PermisosControl.instance){
            PermisosControl.instance = this;
        }
        return PermisosControl.instance;
    }

    async permisosUsuarioControl(req, res){
        try{
            const {id_opcion, perfil} = req.query;

            if(!id_opcion || !perfil){
                return res.status(400).json({error: "Debe completar el campo de id_opcion, perfil"});
            }
            const permiso = await this.permisoModel.permisosUsuarioModel(id_opcion, perfil);
            res.status(200).json(permiso);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }

}