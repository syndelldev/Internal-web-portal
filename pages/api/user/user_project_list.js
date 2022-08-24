import nc from "next-connect";
import { executeQuery } from "../../../config/db";
const handler=nc();

async function addProject(req,res){
    if(req.method == 'GET')
    {
        try{
            console.log("Hello");
            console.log("Hello");
            console.log("Hello");
            console.log(req.headers.cookie);
            // console.log(cookies.name);
            var addUserQuery = await executeQuery("select * from `tbl_project`");
        
            res.status(200).json(addUserQuery);
            console.log(addUserQuery);
        }
        catch(err){
            console.log(err)
        }
    }
}

export default addProject;