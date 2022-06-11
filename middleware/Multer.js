const multer = require("multer");

// création de notre dictionnaire MIME_TYPE
const MIME_TYPE = {
    "image/jpg" : "jpg",
    "image/jpeg" : "jpg",
    "image/png": "png",
    "image/gif" : "gif",
}


const storage = multer.diskStorage ({
    // diskStorage pour l'enregistrer sur le disk du serveur
    //destination du stockage du fichier, donc le dossier images
    destination : (req, file, callback)=>{
        callback(null, "images");
    }, 
    filename : (req, file, callback) =>{
        // suppression des espaces dans le nom du fichier et mettre _
        const name = file.originalname.split(" ").join("_");       
        // création de l'extension qui sera l'élement de notre dictionnaire (MIME_TAPES) 
        const extension = MIME_TYPE[file.mimetype];
        callback(null, name + Date.now() + "." + extension); 
    }
})

module.exports = multer({storage}).single("image");