const express= require('express');
const mysql=require('mysql2');
const bodyParser=require('body-parser');
const app=express();

app.use(bodyParser.urlencoded({extended:false}));

app.set('view engine','ejs');

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'272829',
    database:'mysql',
    port:'3308'
});

db.connect((err)=>{
    if(err){
        console.log(`Error en la conexión a la base de datos. BB_${err}`);
    }
    else{
        console.log('La base de datos esta funciona y esta conectada.');
    }
});