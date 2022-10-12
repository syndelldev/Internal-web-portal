import { IncomingForm } from 'formidable'
import { promises as fs } from 'fs'

var mv = require('mv');


export const config = {
    api: {
       bodyParser: false,
    }
};
 
export default async (req, res) => {
    
    const data = await new Promise((resolve, reject) => {
       const form = new IncomingForm()
       
        form.parse(req, (err, fields, files) => {
            // if (err) return reject(err)
            // console.log(fields)
            console.log(files.image.originalFilename)
            var oldPath = files.image.filepath;
            var newPath = `./public/upload_img/${files.image.newFilename}${files.image.originalFilename}`;
            mv(oldPath, newPath, function(err) {
            });
            res.status(200).json({ files })
        })
    })
    
}