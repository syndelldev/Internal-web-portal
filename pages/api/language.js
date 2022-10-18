import nc from "next-connect";
import { executeQuery } from "../../config/db";
const handler=nc();


async function Language(req,res) {
    
    try{
        let language = await executeQuery("SELECT * FROM `tbl_language`  group by `language_name` ");
        res.status(200).json(language);
    }
    catch(err){
        res.status(500).json(err);
    }
}

export default Language;