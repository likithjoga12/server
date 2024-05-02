let mysql = require('mysql');

let connnecttion = mysql.createConnection({
  host: "localhost",
  user: "root",
  database:"mern8pm",
  password: "root",
  port :3306
});

connnecttion.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Result: " + result);
  });
});
 