const express = require('express');

const app = express();
const cors = require('cors');
app.use(cors());
const mysql = require('mysql2/promise');
require ('dotenv').config();

let pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
   
    connectionLimit: 10,
  })
  

app.get("/", (request, response, next) => {
  console.log("2")
  
  
  response.send("首頁")
});



app.get("/about", (request, response, next) => {
  response.send("About Me");
});

app.get('/stocks', async (request, response, next) => {
  
  let [data, fields] = await pool.execute('SELECT * FROM stocks');
 
  response.json(data);
  
});

app.get('/stocks/:stockId', async (request, response, next) => {
  // console.log('query stock by id:', data);
  let [data, fields] = await pool.execute(
    'SELECT * FROM stocks WHERE id =' + request.params.stockId
  );
  console.log('query stock by id:', data);
  response.json(data);
});

app.use((request, response, next)=>{
  console.log("404",request.path)
  response.status(404).send('not found')
});

app.use((err,request, response, next)=>{
  console.log("四參數",request.path,err)
  response.status(500).send('server err')
});

app.listen(3001, () => {
  console.log("Sever start at 3001");
});