import { executeQuery } from "../../config/db";

const TaskPerson = async (req,res) =>{
    // console.log("req");
    // console.log(req.cookies);
    
    try{
        let person=await executeQuery( ` SELECT * FROM tbl_subtask WHERE task_person LIKE ? `, [`%${req.cookies.name}%`] );
        res.status(200).json(person);
        // console.log(person)
    }
    catch(err){
        //res.status(500).json(err);
        console.log(err)
    }
}

export { TaskPerson }