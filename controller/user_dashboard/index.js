import { executeQuery } from "../../config/db";

const ProjectPerson = async (req,res) =>{
    console.log(req.cookies.name);
    
    try{
        let person=await executeQuery( ` SELECT * FROM tbl_project WHERE project_person LIKE ? `, [`%${req.cookies.name}%`] );
        res.status(200).json(person);
        console.log(person)
    }
    catch(err){
        //res.status(500).json(err);
        console.log(err)
    }
}

export { ProjectPerson }