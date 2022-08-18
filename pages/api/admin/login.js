import nc from "next-connect";
import { executeQuery } from "../../../config/db";
const handler=nc();

async function login(req,res){
    if(req.method === 'POST')
    {
        try{
            const username = req.body.username;
            const password = req.body.password;

            console.log(username)
            var loginQuery = await executeQuery("select * from tbl_user where username= ? ", [req.body.username] );
            res.status(200).json(loginQuery);
            
            
            //console.log(loginQuery)

            var dbpassword = loginQuery[0].password;
            //console.log(dbpassword)
            //console.log(password)

            if(dbpassword == req.body.password)
            {
                console.log("Sucess")
            }
            else 
            {
                console.log("Fail")
            }
            
        }
        catch(err){
            console.log(err)
        }
        
        
        
    }
}
 
export default login;