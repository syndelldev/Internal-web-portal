import nc from "next-connect";
import { executeQuery } from "../../../config/db";
const handler=nc();

async function UpdateUser(req,res)
{
    if(req.method === 'PUT')
    {
        console.log(req.body);
    }
}
export default UpdateUser;