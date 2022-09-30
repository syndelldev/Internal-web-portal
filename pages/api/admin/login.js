import nc from "next-connect";
import { executeQuery } from "../../../config/db";
const handler=nc();

import bcrypt from 'bcryptjs'

async function login(req,res){
    

    if(req.method === 'POST')
    {
        try{

            // console.log(req.body)
            var loginQuery = await executeQuery("select * from tbl_user where email= ? ", [req.body.email] );
            res.status(200).json(loginQuery);
            
            // console.log(loginQuery)

            var dbpassword = loginQuery[0].password;
            
        }
        catch(err){
            console.log(err)
        }
        
        
        
    }
}
 
export default login;