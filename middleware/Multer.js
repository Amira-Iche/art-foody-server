const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME ,
    api_key: process.env.CLOUDINARY_API_KEY ,
    api_secret: process.env.CLOUDINARY_API_SECRET ,
  });
// création de notre dictionnaire MIME_TYPE
// const MIME_TYPE = {
//     "image/jpg" : "jpg",
//     "image/jpeg" : "jpg",
//     "image/png": "png",
//     "image/gif" : "gif",
// }


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "images",
    },
  });
  
//   const upload = multer({ storage: storage });


module.exports = multer({storage}).single("image");

// const storage = multer.diskStorage ({
//     // diskStorage pour l'enregistrer sur le disk du serveur
//     //destination du stockage du fichier, donc le dossier images
//     destination : (req, file, callback)=>{
//         callback(null, "images");
//     }, 
//     filename : (req, file, callback) =>{
//         // suppression des espaces dans le nom du fichier et mettre _
//         const name = file.originalname.split(" ").join("_");       
//         // création de l'extension qui sera l'élement de notre dictionnaire (MIME_TAPES) 
//         const extension = MIME_TYPE[file.mimetype];
//         callback(null, name + Date.now() + "." + extension); 
//     }
// })