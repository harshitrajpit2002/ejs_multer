const express=require('express');
const dotenv=require('dotenv');
const multer=require('multer');
const cookieParser = require('cookie-parser');
const {router}=require('./src/Router/routes');
const path=require('path')
const cors = require('cors');
const { connectToDatabase } = require('./src/utils/DatabaseConnection');
dotenv.config();
const app=express();
app.use(cors({
    credentials: true
}));
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
     return cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
     return cb(null,`${Date.now()}=${file.originalname}`)
    }
  })
  const upload = multer({ storage: storage })
app.use(cookieParser());
app.use(express.json());
app.set('view engine','ejs')
app.set('views', path.resolve('./views'));
app.use('/',router);
app.use(express.urlencoded({extended:false}))
app.post('/upload',upload.single('profileImage'),(req,res)=>{
    console.log(req.body);
    console.log(req.file);
    return res.redirect('/')
})


app.get('/',(req,res)=>{
  return  res.render('profile')
})

app.listen(4000,async()=>{
    await connectToDatabase();
    console.log("server get started");
});
