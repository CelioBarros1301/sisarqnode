const Sequelize=require('sequelize');
const connection=require('../database/database'); 

const Usuario=connection.define("tb_usuarios",{
    id_usu:{
        type: Sequelize.INTEGER(11),
        allowNull:false,
        primaryKey: true
    }, log_usuario:{
        type: Sequelize.STRING(35),
        allowNull:false
    },sen_usuario:{
        type: Sequelize.STRING(255),
        allowNull:false
    },sta_usuario:{
        type: Sequelize.STRING(30),
        allowNull:false,
        defaultValue:''
    },per_usuario:{
        type: Sequelize.STRING(1),
        allowNull:false,
        defaultValue:'0'
    },nome_usuario:{
        type: Sequelize.STRING(50),
        allowNull:false
    },lib_usuario:{
        type: Sequelize.STRING(1),
        allowNull:false
    }
},{
  //freezeTableName: true,
  //schema: 'mobile_blurb',// não adicione os atributos timestamp (updatedAt, createdAt)
  timestamps: false 
}
);
Usuario.removeAttribute('id');



//Usuario.sync({force:true});
module.exports= Usuario; 