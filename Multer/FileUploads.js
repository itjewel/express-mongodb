var express = require('express')
var cookieParser = require('cookie-parser')
const fs = require('fs');
const app = express();
app.set('view engine','ejs')

app.use(cookieParser())
app.use(express.json());
const multer  = require('multer')
const path = require('path');
const UploadFolder = 'Multer/uploads/';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UploadFolder)
  },
  filename: function (req, file, cb) {
   const fileExt =  path.extname(file.originalname);
   const fileName = file.originalname.replace(fileExt,"").toLocaleLowerCase().split(" ").join("-")+"-"+Date.now()
  //  console.log(fileName)
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
     cb(null, fileName + fileExt)
  }
})

const upload = multer({ storage: storage,limits: {
  fileSize: 300000,
},fileFilter: (req, file, cb) => {
  // console.log(file)
  if(file.fieldname === "avatar"){
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(new Error('only jpg, png, jpeg'))
      // cb(null, false);
    }
  } else if(file.fieldname === 'doc'){
    if (
      file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error('only pdf, doc'))
      // cb(null, false);
    }
  }else{
    cb(new Error('There is an unknon error'))
  }
  
  // console.log(file)

  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted

  // To reject this file pass `false`, like so:
 // cb(null, false)

  // To accept the file pass `true`, like so:
  //cb(null, true)

  // You can always pass an error if something goes wrong:
 // cb(new Error('I don\'t have a clue!'))

} })
const cpUpload = upload.fields([{ name: 'avatar', maxCount: 3 }, { name: 'doc', maxCount: 1 }])
app.post('/fileUpload', cpUpload, function (req, res, next) {
    // multiple file uploads
    // console.log(req.files)

     // Single  file uploads
    // console.log(req.file)
  // console.log(req.file, req.body)
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(500).send(err.message);
    // A Multer error occurred when uploading.
  } else if (err) {
    res.status(500).send(err.message);
    // An unknown error occurred when uploading.
  }
  

  })





app.listen(3001, ()=>{
    console.log("listening on port 3001")
})