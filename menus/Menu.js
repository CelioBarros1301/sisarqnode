
const Sequelize=require('sequelize');
const connection=require('../database/database'); 
const Menu=connection.define("tb_menus",{
    id_menu:{
        type: Sequelize.INTEGER(11),
        allowNull:false,
        primaryKey: true
    },seq_menu:{
        type: Sequelize.STRING(10),
        allowNull:false
    },nome_menu:{
        type: Sequelize.STRING(255),
        allowNull:false
    },icone_menu:{
        type: Sequelize.STRING(255),
        allowNull:false
    },href_menu:{
        type: Sequelize.STRING(255),
        allowNull:false
    },tipo_menu:{
        type: Sequelize.STRING(1),
        allowNull:false
    },lib_menu:{
        type: Sequelize.STRING(1),
        allowNull:false
    },stat_pro:{
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
Menu.removeAttribute('id');

//Menu.sync({force:true});
module.exports= Menu; 