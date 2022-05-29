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
  //1. 取得目前在第幾頁，而且利用 || 這個特性來做預設值
  let page = request.query.page||1;
  console.log('current page', page);

  // 2. 取得目前的總筆數
  let [allResults,fields] = await pool.execute(
    'SELECT * FROM stock_prices WHERE stock_id = ?' ,[request.params.stockId]
  );
  const total = allResults.length;
  console.log('total:', total);

  // 3. 計算總共有幾頁
  const perPage = 5; // 每一頁有幾筆
  const lastPage = Math.ceil(total / perPage);
  console.log('lastPage:', lastPage);

  // 4. 計算 offset 是多少（計算要跳過幾筆）
  // 在第五頁，就是要跳過 4 * perPage
  let offset = (page - 1) * perPage;
  console.log('offset:', offset);

  // 5. 取得這一頁的資料 select * from table limit ? offet ?
  let [pageResults] = await pool.execute('SELECT * FROM stock_prices WHERE stock_id = ? ORDER BY date DESC LIMIT ? OFFSET ?', [request.params.stockId, perPage, offset]);




  
  //回給前端
  response.json({
    
    pagination: {
      total,
      lastPage,
      page,
    },

    data: pageResults,
  });
    

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