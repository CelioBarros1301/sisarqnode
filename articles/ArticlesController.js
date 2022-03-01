const express=require('express');
const Category=require("../categories/Category");
const Article=require("./Article");
const slugify=require("slugify");
const adminAuth=require('../middleware/adminAuth')

const router=express.Router();

router.get('/admin/articles/new',adminAuth,(req,res)=>{
    Category.findAll().then(categories=>{
        res.render('admin/articles/new',{
            categories:categories
        })

    })

})

router.post("/articles/save",(req,res)=>{
    var title=req.body.title;
    var body=req.body.body;
    var categoryId=req.body.categoryId
    if (title != undefined && title!=""){
        console.log('title',title);
        Article.create({
            title:title,
            body:body,
            categoryId:categoryId,
            slug:slugify(title)
        }).then(()=>{
            res.redirect("/admin/articles")
        });
    }else{
        res.redirect('/admin/articles/new')
    }

})

router.get('/admin/articles',adminAuth,(req,res)=>{
    Article.findAll({
        include:[{model:Category}]
    }).then(articles=>{
        res.render('admin/articles/index',{articles:articles})

    })

})

router.post('/articles/delete',(req,res)=>{
    var id=req.body.id;
    if(id !=undefined && id!="") {
        if(!isNaN(id)){
            Article.destroy({
                where:{
                    id:id
                }
            }).then(()=>{
                res.redirect("/admin/articles");
            })


        }else{
            res.redirect("/admin/articles");
        }

    }else {
        res.redirect("/admin/articles");
    }
})

router.get('/admin/articles/edit/:id',adminAuth,(req,res)=>{
    var id=req.params.id 
    if (isNaN(id)){
       res.redirect('/admin/articles');
       
    }
    
    Article.findByPk(id).then(artigo=>{
       if (artigo !=undefined){
            Category.findAll().then(categories=>{
               res.render("admin/articles/edit",{artigo:artigo, categories:categories}) 
            })
          
       }else {
           res.redirect('/admin/articles');
       }
   }).catch(error=>{
       res.redirect("/admin/articles");
   })
})

router.post('/articles/update',(req,res)=>{
    var id=req.body.id;
    var title=req.body.title;
    var categoryId=req.body.categoryId
    Article.update({
        title:title,
        slug:slugify(title),
        categoryId:categoryId 
        },{
        where:{
            id:id
        }    
    }).then(()=>{
        res.redirect("/admin/articles");
    })
})



module.exports=router;