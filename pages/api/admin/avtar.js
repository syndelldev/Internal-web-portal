import nc from "next-connect";
import { executeQuery } from "../../../config/db";
const handler=nc();

async function avtar(req,res){
    if(req.method === 'POST'){
        console.log(req.body)
    }
}
export default avtar;