import nc from "next-connect";
import { executeQuery } from "../../../config/db";
const handler=nc();

async function signin(req,res){
    if(req.method === 'POST'){
        try{

            console.log(req.body);
            //console.log(req.body.pass);

            var signinQuery = await executeQuery("INSERT INTO `tbl_user` ( `username`, `password`, `email`, `mobile_no`, `dob`, `department`) VALUES (?,?,?,?,?,? )", 
            [req.body.username, req.body.password, req.body.email, req.body.PhoneNum, req.body.dob, req.body.department ] );

            res.status(200).json(signinQuery);

            console.log(signinQuery)
        }
        catch(err){
            console.log(err)
        }
    }
}

export default signin;