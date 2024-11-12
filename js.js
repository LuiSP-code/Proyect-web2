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

// const hostname= '192.168.62.250';
const port = 3009;
app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})

//Consulta a la base de datos
app.get('/',(req,res)=>{
    const consulta='select * from user';
    db.query(consulta,(err,results)=>{
        if (err){
            console.error(`Error en la base de datos en ${err}`);
            res.send(`Error en la conexión en la base de datos`);
        }else{
            res.render('index',{users:results});//Agregar el modulo user dentro de la base de datos en local
        };
    })});
//Add users
app.post('/add',(req,res)=>{
    const {name,email}=req.body;
    const consulta='insert into users (name,email) value(?,?)'
    db.query(consulta,[name,email],(err)=>{
        if(err){
            console.error(`Agregar usuario`);
            res.send(`Error al agregar un usuario`)
        }else{
            res.redirect('/');
        };
    })});

//user edit
app.get('/edit:id',(req,res)=>{
    const {id}=req.params;
    const consulta='select * from users where id=?'
    db.query(consulta,[id],(err,results)=>{
        if(err){res.send(`Error en la base de dato`)}
        else{
            res.render('edit',{user:results[0]});
        };
    })});

//user delete

app.get('/delete:id',(req,res)=>{
    const {id}=req.params;
    const consulta='delete from users where id=?';
    db.query(consulta,[id],(err)=>{
        if(err){
            res.send(`Error al eliminar`);
        }else{
            res.redirect('/');
        };
    })});