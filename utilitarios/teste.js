const Menu   = require('../menus/Menu');
const Usuario= require('../usuarios/Usuario');
const MenuUsuario=require('../usuarios/MenuUsuario');


function geraMenu1(idUsuario){
    var menuhtml;
    menuHtml=null;

    
     MenuUsuario.findAll({
     where :{
              id_usu :1,
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
       //console.log('entrada 01');
       indice =0;
      // menuHtml="";
      console.log('count:'+countMenu)
       while( indice<countMenu )
        {    
          //  console.log('entrada 02');
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
        
        } //while
        return  menuHtml 
  
    })
    
};

module.exports={ geraMenu1 };
 