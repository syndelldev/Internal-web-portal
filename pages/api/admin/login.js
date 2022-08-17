import nc from "next-connect";
import { executeQuery } from "../../../config/db";
const handler=nc();

async function login(req,res){
    if(req.method == 'POST')
    {
        try{
            const data = req.body;
            console.log(data);
            console.log(data.email);
            console.log(data.password);

           const loginQuery = await executeQuery("select * from `tbl_user` where `email` = ? ", [data.email] );

            const dbpassword = loginQuery[0].password;
            console.log(loginQuery);
            console.log(loginQuery[0].email);
            console.log(dbpassword);

            if(dbpassword == data.password)
            {
                console.log("Success")
            }
            else 
            {
                console.log("fetch password fail")
            }            
        }
        catch(err){
            console.log(err)
        }        
    }
} 
export default login;