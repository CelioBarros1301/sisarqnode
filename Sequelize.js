
const { Sequelize,Model, DataTypes }  = require('sequelize');
const { Op } = require("sequelize");

const sequelize= new Sequelize('guiapress','root','root',{
    host:'localhost',
    dialect:'mysql',
    timezone:"-03:00",
    logging: console.log,
    define: { freezeTableName: true}
});
///console.log('Inicio banco');
 sequelize
  .authenticate()
  .then (()=>{
    console.log("conectado com banco");
      }).catch ((error)=>{
    console.log(error)
  });
///console.log('fim banco')

  class UserTeste extends Model {}
  UserTeste.init(
    { username: DataTypes.STRING,
      birthday: DataTypes.DATE ,
      dia:DataTypes.INTEGER,
      mes:DataTypes.INTEGER


    },
    //{ freezeTableName: true  },
    { sequelize, modelName: 'userTeste' }
    );
  //  UserTeste.sync({alter:true});
 /*
  (async () => {
    //console.log('11111')
    await sequelize.sync();
    const jane = await UserTeste.create({
      username: 'celio',
      birthday: new Date(1980, 6, 20),
      idade:30,
      dia:13
    });
   // console.log('222222')
    //console.log(jane.toJSON());
  })();
  


  
(async () => {
    //console.log('11111')
    //await sequelize.sync();
    const usuario = await  UserTeste.create({ username: "roberta",dia:40 });
    // console.log('222222')
    //console.log(jane.toJSON());
    //console.log(bruno); // Don't do this
    //console.log(bruno.toJSON()); // This is good!
    //console.log(JSON.stringify(bruno, null,null,null)); // This is also good!
    //bruno.dia=30
    //await bruno.update({ username: "bruno barros1111" })
// The database now has "Ada" for name, but still has the default "green" for favorite color
    //await bruno.reload();
    console.log(usuario.username);
    console.log(usuario.toJSON());
    

  })();
*/
  (async ()=>{
    const users = await UserTeste.findAll(
        {
          attributes:[['id','codigo'],'dia','username']
        }
    );
   // console.log(users.every(user => user instanceof UserTeste)); // true
   // console.log("All users:", JSON.stringify(users,null,10));
    
  })();
 //var users;
 /*
  (async ()=>{
    users=await UserTeste.findAll(
      {
        attributes: ['id','username',
          [sequelize.fn('COUNT', sequelize.col('id')), 'registro']
        ],
        where :{id:67}
         
  }) 
  console.log(JSON.stringify(users,null,10));
})();

*/
/*
console.log("teste");
(async ()=>{
  users=await UserTeste.findAll(
    {
      attributes: ['id','username'
       // [sequelize.fn('COUNT', sequelize.col('id')), 'registro']
      ],
      where :{id:
               {[Op.gt]:1}
             },
      order:[['id','desc']]
       
}) 
const usuario=[... users];
console.log(JSON.stringify(users,null,10));
console.log(users);
console.log(usuario[0].id);
console.log(users[0].id);

})();
*/
/*
(async ()=>{
  const { count, rows}=await UserTeste.findAndCountAll(
    {
      attributes: ['id','username'
       // [sequelize.fn('COUNT', sequelize.col('id')), 'registro']
      ],
      where :{id:
               {[Op.gt]:1}
             },
      order:[['id','desc']]
       
}) 
console.log(JSON.stringify(rows,null,10));
console.log(count)

})();
*/
const { QueryTypes } = require('sequelize');
(async ()=>{

const userId=1
 let sql='select nome_menu,seq_menu,tipo_menu,icone_menu,href_menu '
 sql+='from tb_menus menu,'
 sql+='tb_menu_usuarios usu '
 sql+='where menu.id_menu=usu.id_menu'
 sql+=' and usu.id_usu=' + userId
 sql+=' order by seq_menu'

  const users =await sequelize.query(sql,{ type: QueryTypes.SELECT })
 ///
 // const [results, metadata]=await sequelize.query("update userteste set USERNAME='ROBERTA61',DIA=26 order by id desc )
 /// console.log(results)
  //console.log(metadata)
  
console.log(JSON.stringify(users,null,10));
})();

