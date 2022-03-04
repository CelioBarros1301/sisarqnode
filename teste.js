function  enviarEmail(corpo,para,callback) {
setTimeout(()=>{

    callback(corpo,para);
 /*- console.log(`
  --   Para: ${para}
  --   ***********
  --   ${corpo}
  --   De: Celio Barros`);*/
},8000)
};
console.log("Inicio Envio");
enviarEmail('Curso Node Js','bruno',(corpo,para)=>{
    console.log(`
    Para: ${para}
    ***********
    ${corpo}
    De: Celio Barros`);
    console.log("email enviado")  
});
