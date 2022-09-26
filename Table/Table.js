var db = require('../DB/Db');

db.query(`create table if not exists vis(name varchar(100),mobile varchar(10),email varchar(100), password varchar(100)`).then((resp)=>{
    console.log('Table Created Successfully');

}).catch((err)=>{
    console.log(err);
})