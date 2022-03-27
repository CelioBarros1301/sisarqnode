const Menu   = require('../menus/Menu');
const Usuario= require('../usuarios/Usuario');
const MenuUsuario=require('../usuarios/MenuUsuario');

function fMenu(menu)
{
      return new Promise((resolve, reject) => {
      var menuhtml;
      menuHtml="";
      //console.log('entradada funcao'); 
      countMenu=0;
      console.log(menu);
      menu.forEach(item=>{
         countMenu=countMenu+1;
         
      })
       //console.log('entrada 01');
      indice =0;
      // menuHtml="";
      //console.log('count:'+countMenu)
      while( indice<countMenu )
        {    
          //console.log('indice:'+indice +' '+menu[indice]['Menu']['seq_menu'])
          //  console.log('entrada 02');
           item=menu[indice]['Menu']['seq_menu'].substring(0,2);
            // Verificar se e SubMenu
           if (menu[indice]['Menu']['tipo_menu']=='1')
           {
                if ( menu[indice]['stat_pro']=='1') 
                {  
                menuHtml+= '<li class="">';
                menuHtml+= '<a  href="?option=programa">';
                menuHtml+= '<i class="' +menu[indice]['Menu']['icone_menu']+'"></i>';
                menuHtml+= '<span>' +menu[indice]['Menu']['nome_menu'] +'</span>';
                menuHtml+= '</a>';
                menuHtml+= '</li>';
                }
                else
                {
                menuHtml+= '<li class="">';
                menuHtml+= '<a href="?option='+menu[indice]['Menu']['href_menu']+'">';
                menuHtml+= '<i class="' +menu[indice]['Menu']['icone_menu']+'"></i>';
                menuHtml+= '<span>' +menu[indice]['Menu']['nome_menu'] +'</span>';
                menuHtml+= '</a>';
                menuHtml+= '</li>';
                }
                indice++;
            }
            else
            {
                menuHtml+='<li class="has-sub">';
        
                while( indice<countMenu &&  item==menu[indice]['Menu']['seq_menu'].substring(0,2) )
                {
                    
                   // console.log('indice:'+indice +' '+menu[indice]['Menu']['seq_menu'])
         
                    if (menu[indice]['Menu']['tipo_menu']=='0')
                    {
                        menuHtml+='<a href="#">';
                        menuHtml+='<i class="'+menu[indice]['Menu']['icone_menu']+'"></i>'; 
                        menuHtml+='<span>' +menu[indice]['Menu']['nome_menu'] +'</span>';
                        menuHtml+='<span class="pull-right-container">';
                        menuHtml+='<i class="fa fa-angle-left pull-right"></i>'; 
                        menuHtml+='</span>';
                        menuHtml+='</a>';
                        menuHtml+='<ul class="sub-menu">';
                    }
                    else
                    { 
                        
                        if ( menu[indice]['stat_pro']=='1') 
                        {
                            menuHtml+='<li>';
                            menuHtml+= '<a  href="?option=programa">';
                            //$menuHtml.='   <a disabled href="#">';
                            menuHtml+='<i class="' +menu[indice]['Menu']['icone_menu']+'"></i>';
                            menuHtml+=      menu[indice]['Menu']['nome_menu'];
                            menuHtml+='</a>';
                            menuHtml+='</li>';
                        }
                        else
                        {            
                            menuHtml+='<li>';
                            menuHtml+='<a href="?option='+menu[indice]['Menu']['href_menu']+'">';
                            menuHtml+='<i class="' +menu[indice]['Menu']['icone_menu']+'"></i>';
                            menuHtml+=      menu[indice]['Menu']['nome_menu'];
                            menuHtml+='</a>';
                            menuHtml+='</li>';
                        }
        
                    }
                    indice++;
                }
        
                menuHtml+='</ul>';
                menuHtml+='</li>';
                
            }
        
        } //while
        if ( menuHtml !=undefined ) {
            resolve(menuHtml);
        } else {
            reject(menuHtml);
        }
    })
};


async function geraMenu(idUsuario){
    
    
    vMenu=await  MenuUsuario.findAll({
     where :{
              id_usu :idUsuario,
            },
     include: [
          { 
             association: "Menu",
             attributes: ["nome_menu","seq_menu",'tipo_menu','icone_menu','href_menu'],
             //order:[ ['seq_menu'],['tipo_menu']]
             order:[ ['seq_menu']]
             
          }
         
              ]
    });
   // console.log(vMenu);
   //vMenu.forEach (item =>{
   //    console.log('Menu:' + item.Menu.nome_menu);
   //})
    return await  fMenu(vMenu);
     
};


 module.exports={ geraMenu };


 