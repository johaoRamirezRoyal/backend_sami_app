import UsuariosModel from "../modelos/usuariosModel.js";


export default class UsuariosControl {
    usuariosModel = new UsuariosModel();
    
    //Singleton para el controlador de usuarios
    static instance;

    constructor(){
        if(!UsuariosControl.instance){
            UsuariosControl.instance = this;
        }
        return UsuariosControl.instance;
    }

    //Función para obtener todos los usuarios
    async getUsuarios(req, res){
        try{
            const usuarios = await this.usuariosModel.getUsuarios();
            res.status(200).json(usuarios);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }
}