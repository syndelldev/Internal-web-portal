//import jwt from 'jsonwebtoken'
//const KEY = 'asdfghjklzxcvbnmjtttdgsnrgjgnamffadwrqwww'

import nc from "next-connect";
import { getData } from '../../../controller/admin/login'

const handler2=nc();
handler2.get(getData);
export default handler2;






/*async function Login(req,res){
        

    console.log(req.body);

    if(!req.body){
        res.statusCode=404
        res.end('Error')
        return
    }
    
    const { username, password } = req.body
    
    console.log(username)
    console.log(password)


    res.json({
        token: jwt.sign(
            {
                username,
                password,
                //admin:username==='user' && password==='User@1234'
                admin:username===username && password===password
            },
            KEY
        )
    })
}

export default {Login,handler2}*/