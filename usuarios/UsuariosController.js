const express = require('express');
const router  = express.Router();
const {qrySelect}=require('sequelize');
const connection=require('../database/database'); 



const Usuario     = require('./Usuario');
const MenuUsuario = require('./MenuUsuario')
const Menu        = require('../menus/Menu')


//Utilitarios
const utilitarios  =require('../utilitarios/funcoes');


const bcrypt    = require('bcryptjs');
const adminAuth = require('../middleware/adminAuth');
//const { Sequelize } = require('sequelize/dist');



router.post('/usuario/login',async function (req,res){
    var email=req.body.email;
    var senha=req.body.senha;
    var msg1 =null;
    var msg2 =null;
    var menuUsuario
     
    // Verificar Email Cadastrado
    //console.log('antes');
    usuario= await Usuario.findOne({
        where:{log_usuario:email}
    });
    
    if (usuario!=undefined){
        //console.log(usuario.sen_usuario);
        if ( usuario.sen_usuario!=senha ){
            msg2="Senha Invalida!!!";
        //}else if (usuario.sta_usuario!=$logado && usuario.sta_usuario!="" ){
        //    msg2="Usuário logado em outra estação"
        }else if (usuario.lib_usuario!='1'){
            msg2='Usuário Bloqueado'
        }else if (1==0) // Verificar Usuario tem permissao
        {
            msg2='Usuário Sem Permissão'   
        }else{
            //console.log("criando session");
            req.session.user={
                id :usuario.id_usu,
                nome: usuario.nome_usuario,
                status:usuario.sta_usuario,
                permissao:usuario.per_usuario,
                liberado:usuario.lib_usuario
                }

                menuUsuario=await utilitarios.geraMenu(usuario.id_usu);
                
                req.session.user={
                    id :usuario.id_usu,
                    nome: usuario.nome_usuario,
                    status:usuario.sta_usuario,
                    permissao:usuario.per_usuario,
                    liberado:usuario.lib_usuario
                    //menu:menuUsuario
                    }
                 
                
                //console.log(menuUsuario)
                res.render('sisarq',{menu:menuUsuario,user:usuario});
        }
        if (msg2 !=undefined){
            
            res.render('index',{
                msg1:msg1,
                msg2:msg2
            } )               
        }
        
        
    }else {
        msg1='Usuário Não Encontrado';
        //res.send(msg1);
        res.render('index',{
                msg1:msg1,
                msg2:msg2
            } )               
        
    }
})

module.exports=router;