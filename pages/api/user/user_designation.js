import nc from "next-connect";
import { executeQuery } from "../../../config/db";
const handler=nc();


async function userDesignation(req,res) {
    
    console.log("userDesignation");
    console.log(req.body.department);
    console.log("userDesignation");

    try{
        let userDesignation = await executeQuery("SELECT * FROM `tbl_designation` where `designation_department`= ? order by `designation_department` ", [ req.body.department.value ]);
        res.status(200).json(userDesignation);
        console.log("user task");
        console.log(userDesignation)
    }
    catch(err){
        res.status(500).json(err);
    }
}

export default userDesignation;