
import UsuariosModel from "../modelos/usuariosModel.js";
import bcrypt from "bcrypt";

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

    async iniciarSesion(req, res){
        try{
            const {usuario, contraseña} = req.body;
            
            if(!usuario || !contraseña){
                return res.status(400).json({error: "Debe completar el los campos de usuario y contraseña"});
            }

            const usuario_sesion = await this.usuariosModel.getUsuarioUser(usuario);

            if(!usuario_sesion){
                return res.status(400).json({error: "Usuario no encontrado"});
            }

            if(usuario_sesion.estado !== "activo"){
                return res.status(400).json({error: "Usuario no activo, habla con el administrador de S. A. M. I"});
            }

            // Hash guardado en PHP ($2y$...). Reemplazar prefijo para Node.
            const hashPHP = String(usuario_sesion.pass || "");
            const hashNode = hashPHP.startsWith("$2y$") ? hashPHP.replace("$2y$", "$2b$") : hashPHP;

            const valid = await bcrypt.compare(String(contraseña), hashNode);

            if(!valid) return res.status(400).json({error: "Contraseña incorrecta"});

            res.status(200).json(usuario_sesion);

        }catch(err){
            res.status(500).json({error: err.message});
        }
    }
}