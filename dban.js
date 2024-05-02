let mysql = require('mysql');

let connnas = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    database:"mern8pm",
    password: "root",
    port :3306
});
let _deleError=connnas._protocol._deleError;
connnas._protocol._deleError=function(err,sequence){
  if(err.fatal)
  console.log(err.message);
return _deleError.call(this,err,sequence);
}

connnas.connect((err,con) =>{
  if (err) throw err;
  console.log("Connected!");
});