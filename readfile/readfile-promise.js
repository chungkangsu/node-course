const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');

let p = new Promise((resolve,reject)=>{
    fs.readFile('test.txt', 'utf-8',(err,data)=>{
        if(err){
            reject(err); //把值傳出去，外面才可以用
        }
        else{
            resolve(data); 
        }

    });

      
});
p.then((result)=>{
    console.log('讀取成功');
    console.log(result);
    
}).catch((error)=>{
    console.log('喔喔喔，發生錯誤了');
    console.log(error);
    
})