const express = require('express');
const router  = express.Router();
const {qrySelect}=require('sequelize');
const connection=require('../database/database'); 



const Usuario     = require('./Usuario');
const MenuUsuario = require('./MenuUsuario')
const Menu        = require('../menus/Menu')

const bcrypt    = require('bcryptjs');
const adminAuth = require('../middleware/adminAuth');
//const { Sequelize } = require('sequelize/dist');



router.post('/usuario/login',(req,res)=>{
    var email=req.body.email;
    var senha=req.body.senha;
    var msg1 =null;
    var msg2 =null;
     
    // Verificar Email Cadastrado
    Usuario.findOne({
        where:{log_usuario:email}
    }).then (usuario=>{
        if (usuario!=undefined){
            
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

                //const { QueryTypes } = require('sequelize');
                 //const users = await sequelize.query("SELECT * FROM `users`", { type: QueryTypes.SELECT });
                 // We didn't need to destructure the result here - the results were returned directly
                console.log('Selecionando Menu');
                MenuUsuario.findAll({
                    where :{id_usu   :usuario.id_usu,
                    },
                    include: [
                        {
                            association: "Menu",
                            attributes: ["nome_menu","seq_menu",'tipo_menu','icone_menu','href_menu'],
                            order:[ ['seq_menu'],['tipo_menu']]
                        }
                        
                    ]
                }).then (MenuUSuario=>{
                    res.render('sisarq');
                    
                    /*  Gerar Variavel com comando Html ou mandar o Array
                    > e fazer o formatacao no html menu
                    --> criar principal com head ,menu, body, footer
                    -->qdo chamar as telas (bodY) enviar 
                    $sql = "SELECT    menu.* ,usuario.*";
        $sql.= "FROM tb_menus menu ";
        $sql.= "  INNER JOIN tb_menu_usuarios usuario ";
        $sql.= "        ON menu.id_menu=usuario.id_menu ";
        $sql.= "  WHERE id_usu=?"; 
        $sql.=" ORDER BY seq_menu,tipo_menu ";
        https://sequelize.org/master/manual/raw-queries.html
      
  */

                    
                    //console.log({nome:'celio',idade:10});
                    res.send("<h1>teste</h1>");
                }).catch(error=>{
                    console.log('error');
                    
                })
                console.log('teste')
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
    }).catch(error=>{
        msg2:error
        res.render('index',{
            msg1:msg1,
            msg2:msg2
        })
            
    })

})

module.exports=router;