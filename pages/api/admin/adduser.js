import nc from "next-connect";
import { executeQuery } from "../../../config/db";
const handler=nc();

async function addUser(req,res){
    if(req.method === 'POST')
    {
        try{
            console.log(req.body);
            var addUserQuery = await executeQuery("INSERT INTO `tbl_user` ( `username`, `password`, `email`, `mobile_no`, `dob`, `department`,`position`,`status`,`role` ) VALUES (?,?,?,?,?,? )", 
            [req.body.username, req.body.password, req.body.email, req.body.PhoneNum, req.body.dob, req.body.department, req.body.status, req.body.position, req.body.role ] );
        
            res.status(200).json(addUserQuery);
            console.log(addUserQuery)
        }
        catch(err){
            console.log(err)
        }
    }
}

export default addUser;