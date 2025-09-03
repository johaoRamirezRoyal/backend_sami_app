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
            const usuarios = await this.usuariosModel.getUsuarios(30);
            res.status(200).json(usuarios);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }

    async getUsuario(req, res){
        try{
            const {usuario} = req.body;
            
            if(!usuario){
                return res.status(400).json({error: "Debe completar el campo de user"});
            }

            const data_usuario = await this.usuariosModel.getUsuarioUser(usuario);
            res.status(200).json(data_usuario);

        }catch(err){
            res.status(500).json({error: err.message});
        }
    }

    // Validar la contraseña de un usuario mediante su ID
    async validarContraseña(req, res){
        try{
            const {id_user, contraseña} = req.body;
            
            if(!id_user || !contraseña){
                return res.status(400).json({error: "Debe completar el los campos de id_user y contraseña"});
            }

            const usuario = await this.usuariosModel.validarContraseña(id_user, contraseña);
            res.status(200).json(usuario);

        }catch(err){
            res.status(500).json({error: err.message});
        }
    }
}