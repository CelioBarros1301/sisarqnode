
const Sequelize=require('sequelize');
const connection=require('../database/database'); 
const Menu =require('../menus/Menu')
const Usuario =require('./Usuario')


const MenuUsuario=connection.define("tb_menu_usuarios",{
    id_menu_usuario:{
        type: Sequelize.INTEGER(11),
        allowNull:false,
        primaryKey: true
    },id_menu:{
        type: Sequelize.INTEGER(11),
        allowNull:false
    },id_usu:{
        type: Sequelize.INTEGER(11),
        allowNull:false
    },sta_menu:{
        type: Sequelize.STRING(1),
        allowNull:false
    },sta_inc:{
        type: Sequelize.STRING(1),
        allowNull:false
    },sta_alt:{
        type: Sequelize.STRING(1),
        allowNull:false
    },sta_con:{
        type: Sequelize.STRING(1),
        allowNull:false
    },sta_exc:{
        type: Sequelize.STRING(1),
        allowNull:false,
        defaultValue:'1'
    },sta_rel:{
      type: Sequelize.STRING(1),
      allowNull:false,
      defaultValue:'1'
  }
},{
  //freezeTableName: true,
  //schema: 'mobile_blurb',// não adicione os atributos timestamp (updatedAt, createdAt)
  timestamps: false 
}
);
MenuUsuario.removeAttribute('id');
//MenuUsuario.hasMany (Menu)
MenuUsuario.belongsTo(Usuario, {
    foreignKey: "id_usu", // Column name of associated table
    as: "Usuario" // Alias for the table
});

MenuUsuario.belongsTo(Menu, {
    foreignKey: "id_menu", // Column name of associated table
    as: "Menu" // Alias for the table
});





//MenuUsuario.sync({force:true});
module.exports= MenuUsuario; 