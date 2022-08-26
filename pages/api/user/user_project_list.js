import nc from "next-connect";
import { getCookieParser } from "next/dist/next-server/server/api-utils";
import { executeQuery } from "../../../config/db";
const handler=nc();

async function addProject(req,res){
    if(req.method == 'GET')
    {
        try{
            console.log("Hello");
            console.log("Hello");
            console.log("Hello");
            // console.log(req.headers.cookie);
            // console.log(cookies.name);
            // const [cookies, setCookie] = useCookies(['name']);
            console.log(req.headers);
            //console.log(req.headers.cookie);
            

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