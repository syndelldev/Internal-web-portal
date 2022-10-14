import nc from "next-connect";
import { executeQuery } from "../../../config/db";
const handler=nc();

async function login(req,res){
    if(req.method === 'POST')
    {
        try{

            console.log(req.body)
            var loginQuery = await executeQuery("select * from tbl_user where email= ? ", [req.body.email] );
            res.status(200).json(loginQuery);
            
            
            console.log(loginQuery)

            // var dbpassword = loginQuery[0].password;
            //console.log(dbpassword)
            //console.log(password)

            // if(dbpassword == req.body.password)
            // {
            //     console.log("Sucess")
            // }
            // else 
            // {
            //     console.log("Fail")
            // }
            
        }
        catch(err){
            console.log(err)
        }
        
        
        
    }
}
 
export default login;