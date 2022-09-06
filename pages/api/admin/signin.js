import nc from "next-connect";
import { executeQuery } from "../../../config/db";
const handler=nc();

async function signin(req,res){
    if(req.method === 'POST'){
        try{

            console.log(req.body);
            

            // var signinQuery = await executeQuery("INSERT INTO `tbl_user` ( `username`, `password`, `email`, `mobile_no`, `dob`, `department`) VALUES (?,?,?,?,?,? ) WHERE NOT EXISTS (SELECT 1 FROM tbl_user WHERE email = ?)" , 
            // [req.body.username, req.body.password, req.body.email, req.body.PhoneNum, req.body.dob, req.body.department ] );

            var signinQuery = await executeQuery("INSERT INTO `tbl_user` ( `role_id`,`username`, `password`, `email`, `mobile_no`, `department`, `position` ,`role`,`status` ) VALUES (?,?,?,?,?,?,?,?,? )", 
            [req.body.role_id, req.body.username, req.body.password, req.body.email, req.body.PhoneNum, req.body.department, req.body.position, req.body.role, req.body.status ] );

            res.status(200).json(signinQuery);

            console.log(signinQuery)
        }
        catch(err){
            console.log(err)
        }
    }
}

export default signin;