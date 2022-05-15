const fs = require('fs/promises');

(async () => {
    try{
        let p = await fs.readFile('test.txt', 'utf-8');
        console.log(p);
    }
    catch (e){
        console.log(e);
    }
})();  //立即執行函式