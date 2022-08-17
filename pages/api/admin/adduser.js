import nc from "next-connect";
import { executeQuery } from "../../../config/db";
const handler=nc();

async function addUser(req,res){
    if(req.method === 'POST')
    {
        try{
            console.log(req.body)
            console.log(req.body.position);
            console.log(req.body.status);
            console.log(req.body.role);

            var addUserQuery = await executeQuery("INSERT INTO `tbl_user` ( `username`, `password`, `email`, `mobile_no`, `dob`, `department`,`position`,`status`,`role` ) VALUES (?,?,?,?,?,?,?,?,? )", 
            [req.body.username, req.body.password, req.body.email, req.body.PhoneNum, req.body.DOB, req.body.department, req.body.position, req.body.status,  req.body.role ] );
        
            res.status(200).json(addUserQuery);
            console.log(addUserQuery)
        }
        catch(err){
            console.log(err)
        }
    }
}

export default addUser;