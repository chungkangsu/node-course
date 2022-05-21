const mysql = require("mysql2/promise");

(async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "admin",
    password: "",
    database: "nodejs",
  });
  let [data, fields] = await connection.execute("SELECT * FROM stocks");
  console.log(data);

  connection.end();
})();
