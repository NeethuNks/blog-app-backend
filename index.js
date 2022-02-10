const express =require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoute = require('./src/routes/Auth');
const articleRoute = require('./src/routes/Articles');
const multer  = require('multer')




const app = express();

app.use(cors());
app.use(express.json());

const path = require('path');

app.use(express.static('./build/'));

app.get('/*', function(req,res){
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer( { storage: storage});
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File uploaded");
});

app.use('/api/auth', authRoute);
app.use('/api/articles', articleRoute);

app.listen(process.env.PORT || 5000,()=> {
    console.log("Listening on port 5000");
})