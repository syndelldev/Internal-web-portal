import { executeQuery } from "../../../../config/db";

async function projectId(req,res){
    let id = req.query.project_id;
    // console.log("projectId");
    // console.log(req.query);
    // console.log(id);

    try{
        // let projectById=await executeQuery(` SELECT * FROM tbl_project`);
        let projectById=await executeQuery(` SELECT * FROM tbl_project where project_id= ${id}`, [] );
        res.status(200).json(projectById);
    }
    catch(err){
        res.status(500).json(err);
    }
}

export default projectId;
