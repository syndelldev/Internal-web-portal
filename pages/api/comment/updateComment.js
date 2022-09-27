import { executeQuery } from "../../../config/db";

export default async function handler(req, res) {

    console.log(req.body)

    try{
        let person=await executeQuery( " update `tbl_comment` set `comment`=? where `id`=? and `username`=? " , [ req.body.comment, req.body.comment_id , req.body.user ] );
        res.send(person);
        // console.log(person)
    }
    catch(err){
        console.log(err)
    }
}