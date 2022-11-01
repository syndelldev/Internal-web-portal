import nc from "next-connect";
import { executeQuery } from "../../../config/db";
const handler=nc();


async function userDesignation(req,res) {
    
    console.log(req.body.department);

    try{
        if(req.body.department != ""){
            let userDesignation = await executeQuery("SELECT * FROM `tbl_designation` where `designation_department`= ? order by `designation_department` ", [ req.body.department[0].value ]);
            res.status(200).json(userDesignation);
        }else{
            let userDesignation = await executeQuery("SELECT * FROM `tbl_designation` where `designation_department`= ? order by `designation_department` ", [ "" ]);
            res.status(200).json(userDesignation);
        }
    }
    catch(err){
        res.status(500).json(err);
    }
}

export default userDesignation;