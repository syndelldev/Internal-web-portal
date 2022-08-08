//import jwt from 'jsonwebtoken'
//const KEY = 'asdfghjklzxcvbnmjtttdgsnrgjgnamffadwrqwww'

import nc from "next-connect";
//import { logindata } from '../../../controller/admin/admin'
import { executeQuery } from "../../../config/db";
const handler=nc();

//handler.get(logindata);

async function login(req,res){
    //res.status(200).json({ username: "username" })
    /*if(req.method==='GET')
    {
        res.status(200).json(username)
    }*/
    if(req.method === 'POST')
    {
        try{
            const username = req.body.username;
            const password = req.body.password;

            const data = {username,password}
            //res.status(201).json(data);

            var loginQuery = await executeQuery("select password from tbl_user where username= ? ", [req.body.username] );
            res.status(200).json(loginQuery);
            
            
            //console.log(loginQuery)

            var dbpassword = loginQuery[0].password;
            console.log(dbpassword)
            console.log(password)

            if(dbpassword == password)
            {
                console.log("Sucess")
            }
            else //if(loginQuery !== req.body.password)
            {
                console.log("Fail")
            }
            
        }
        catch(err){
            res.status(500).json(err);
        }
        
        
        
    }
}
 
export default login;






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
                admin:username==='user' && password==='User@1234'
                //admin:username===username && password===password
            },
            KEY
        )
    })
}

export default {Login,handler}*/