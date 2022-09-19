import { executeQuery } from "../../config/db";

const ProjectPerson = async (req,res) =>{
    console.log(req.cookies.name);
    console.log(req.cookies.Id);
    
    try{
        // let person=await executeQuery( ` SELECT * FROM tbl_project WHERE project_person LIKE ? `, [`%${req.cookies.name}%`] );
        let person=await executeQuery( " SELECT * FROM tbl_project RIGHT JOIN tbl_rights ON tbl_project.project_id=tbl_rights.project_id WHERE tbl_project.project_person LIKE ? AND tbl_rights.user_id=? " , [`%${req.cookies.name}%`, req.cookies.Id] );
        res.status(200).json(person);
        console.log(person)
    }
    catch(err){
        //res.status(500).json(err);
        console.log(err)
    }
}

const userProfile = async (req, res) => {
    console.log(req.query);
    try{
        let AdminData=await executeQuery(" SELECT * FROM `tbl_user` where `id` = ? ", req.query.userId );
        res.send(AdminData);
    }
    catch(err){
        res.status(500).json(err);
    }
}


export { ProjectPerson, userProfile }