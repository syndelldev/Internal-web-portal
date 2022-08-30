import { executeQuery } from "../../config/db";

const ProjectPerson = async (req,res) =>{
    console.log(req.headers.cookie);
    
    try{
        let person=await executeQuery( ` SELECT * FROM tbl_project WHERE project_person LIKE '%Riya%' `, [] );
        res.status(200).json(person);
    }
    catch(err){
        res.status(500).json(err);
    }
}

export { ProjectPerson }