const express = require('express');
const router=express.Router();
const User=require('./User');
const bcrypt =require('bcryptjs');
const adminAuth=require('../middleware/adminAuth')




router.get('/admin/users',(req,res)=>{
    User.findAll().then(users=>{
        res.render('admin/users/index',{users:users})

    })

})     

router.get('/admin/login',(req,res)=>{
    res.render('admin/users/login');
})

router.get('/logout',adminAuth,(res,req)=>{
    res.session.user=undefined;
    res.redirect('/admin/login')
})


router.post('/authenticate',(req,res)=>{
    var email=req.body.email;
    var password=req.body.password;
    User.findOne({
        where:{email:email}
    }).then (user=>{
        if (user !=undefined){
            var correct=bcrypt.compareSync(password,user.password);
            if (correct){
                req.session.user={
                    id:user.id,
                    eamil:user.email
                }
                res.redirect("/admin/articles")                
            }else {
                res.redirect('/admin/login')    
            }
        }else {
            res.redirect('/admin/login')
        }
    })

})

router.get("/admin/user/create",(req,res)=>{
   res.render('admin/users/create');
})

router.get("/users/login",(req,res)=>{
    res.send("ola");
});

router.post("/users/create",(req,res)=>{
      var email=req.body.email;
      var password=req.body.password;

      User.findOne({ where:{email:email}}).then (user=>{
          if (user ==undefined){
            var salt= bcrypt.genSaltSync(10);
            var hash= bcrypt.hashSync(password,salt);
      
      
            User.create({
                email:email,
                password:hash
            }).then (()=>{
                res.redirect('/admin/users');
            }).catch((err)=>{
                console.log('erro:',err)
                res.redirect('/');
            });
            
      
          }else{
              res.redirect('/admin/user/create')
          }
      })
      
            
})

module.exports=router;