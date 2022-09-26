const express = require('express')
const app = express()
var bodyparser = require('body-parser');
const cors = require("cors");
var myroutes = require('./Routes/Router');
const path = require('path');
const multer = require('multer');
var pool = require('./DB/Db');


var router = express.Router();



const port = 7000;

app.use(bodyparser.json());
app.use(cors());


app.use('/', myroutes);


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'C:/Users/HP/Documents/React_work/project/public/assets/img')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})


var upload = multer({ storage: storage })

app.use(express.static(__dirname + '/public'));
app.use('/img', express.static('img'));

app.post('/profile-upload-single', upload.single('profile'), function (req, res, next) {
    console.log(JSON.stringify(req.file))
})





app.listen(port, () => {
    console.log(`My server is running on  http://localhost:${port}`)
})