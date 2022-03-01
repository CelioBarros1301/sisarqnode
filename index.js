const express =require("express");
const app=express();
const session=require('express-session');
const connection=require("./database/database");

//const categoriesController = require("./categories/CategoriesController")
//const articlesController   = require("./articles/ArticlesController")
//const usersController      = require('./users/UsersController')

///const Category = require('./categories/Category');
//const Article  = require('./articles/Article');
//const User     = require('./users/User');

// Controllers
const usuariosController      = require('./usuarios/UsuariosController')
const menusController         = require('./menus/MenusController')



// Tabelas do Banco 
const Menu   = require('./menus/Menu');
const Usuario= require('./usuarios/Usuario');
const MenuUsuario=require('./usuarios/MenuUsuario');


app.set('view engine','ejs');


app.use(session({
  secret:"123456",
  resave :false,
    saveUninitialized: true,
  cookie:{maxAge:3000000000}
}))
app.use(express.static('public'));

app.use(express.urlencoded({extended:false}));
app.use(express.json()); 

//databse 
connection
  .authenticate()
  .then (()=>{
    console.log("conectado com banco");
  }).catch ((error)=>{
    console.log(error)
  })

app.get('/session',(req,res)=>{
     req.session.treinamento="Formação Node.js";
     req.session.ano=2022;
     req.session.email="celio@gmail.com";
     res.send("sessao gerada");
} );

app.get('/leitura',(req,res)=>{
  res.json({
    treinamento:req.session.treinamento,
    ano:req.session.ano,
    email:req.session.email
  })
});

app.get('/',function(req,res){
    res.render('index',{msg1:undefined,msg2:undefined})

})

app.get('/user',function(req,res){
   var html;
   html="";
   
   MenuUsuario.findAll({
    where :{id_usu :1,
    },
    include: [
        {
            association: "Menu",
            attributes: ["nome_menu","seq_menu",'tipo_menu','icone_menu','href_menu'],
            order:[ ['seq_menu'],['tipo_menu']]
        }
        
    ]
}).then (menu=>{
     countMenu=0;
     menu.forEach(item=>{
        countMenu=countMenu+1;
      })
      indice =0;
      menuHtml="";
  //console.log(menu[0]['Menu']['nome_menu']);
  //console.log('casa'.substring(0,2));
  
  while( indice<countMenu )
  {    
      item=menu[indice]['Menu']['seq_menu'].substring(0,2);
      // Verificar se e SubMenu
      if (menu[indice]['Menu']['tipo_menu']=='1')
      {
        if ( menu[indice]['stat_pro']=='1') 
        {  
          menuHtml+= '<li class="">';
          menuHtml+= '   <a  href="?option=programa">';
          menuHtml+= '     <i class="' +menu[indice]['Menu']['icone_menu']+'"></i> ';
          menuHtml+= '     <span>' +menu[indice]['Menu']['nome_menu'] +'</span>';
          menuHtml+= '   </a>';
          menuHtml+= '</li>';
        }
        else
        {
          menuHtml+= '<li class="">';
          menuHtml+= '   <a href="?option='+menu[indice]['Menu']['href_menu']+'">';
          menuHtml+= '     <i class="' +menu[indice]['Menu']['icone_menu']+'"></i> ';
          menuHtml+= '     <span>' +menu[indice]['Menu']['nome_menu'] +'</span>';
          menuHtml+= '   </a>';
          menuHtml+= '</li>';
        }
        indice++;
      }
      else
      {
          menuHtml+='<li class="has-sub">';

          while( indice<countMenu &&  item==menu[indice]['Menu']['seq_menu'].substring(0,2) )
          {
              
              if (menu[indice]['Menu']['tipo_menu']=='0')
              {
                  menuHtml+='<a href="#">';
                  menuHtml+='  <i class="'+menu[indice]['Menu']['icone_menu']+'"></i> '; 
                  menuHtml+='  <span>' +menu[indice]['Menu']['nome_menu'] +'</span>';
                  menuHtml+='  <span class="pull-right-container">';
                  menuHtml+='     <i class="fa fa-angle-left pull-right"></i>'; 
                  menuHtml+='  </span>';
                  menuHtml+='</a>';
                  menuHtml+='<ul class="sub-menu">';
              }
              else
              { 
                  
                if ( menu[indice]['stat_pro']=='1') 
                  {
                    menuHtml+='<li>';
                    menuHtml+= '   <a  href="?option=programa">';
                    //$menuHtml.='   <a disabled href="#">';
                    menuHtml+='     <i class="' +menu[indice]['Menu']['icone_menu']+'"></i> ';
                    menuHtml+=      menu[indice]['Menu']['nome_menu'];
                    menuHtml+='   </a>';
                    menuHtml+='</li>';
                  }
                  else
                  {            
                    menuHtml+='<li>';
                    menuHtml+='   <a href="?option='+menu[indice]['Menu']['href_menu']+'">';
                    menuHtml+='     <i class="' +menu[indice]['Menu']['icone_menu']+'"></i> ';
                    menuHtml+=      menu[indice]['Menu']['nome_menu'];
                    menuHtml+='   </a>';
                    menuHtml+='</li>';
                  }

              }
              indice++;
          }

          menuHtml+='</ul>';
          menuHtml+='</li>';
          
      }

  }




    //console.log(menuHtml);
     res.send(menuHtml);
   })
})

app.listen(8080,()=>{
  console.log("App rodando")
})