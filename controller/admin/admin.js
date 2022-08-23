import { executeQuery } from "../../config/db";

const getAllUser = async (req,res) =>{
    try{
        let userData=await executeQuery(" SELECT * FROM `tbl_user` ", [] );
        res.send(userData);
    }
    catch(err){
        res.status(500).json(err);
    }
}

const getUserById = async (req,res) => {
    let id = req.query.id;
    try{
        let userDataById=await executeQuery(` SELECT * FROM tbl_user where id= ${id}`, [] );
        res.status(200).json(userDataById);
    }
    catch(err){
        res.status(500).json(err);
    }
}

const AddUser = async (req,res) =>{
    console.log(req.body)
    console.log(req.body.role_id)
    console.log(req.body.username)
    console.log(req.body.password)
    console.log(req.body.email)
    console.log(req.body.mobile_num)
    console.log(req.body.DOB)
    console.log(req.body.department)
    console.log(req.body.position)
    console.log(req.body.status)
    console.log(req.body.role)
    try{
        //var createUser = await executeQuery("INSERT INTO `tbl_user` ( `username`, `password`, `email`, `mobile_no`, `dob`, `department`,`position`,`status`,`role` ) VALUES (?,?,?,?,?,?,?,?,? )", 
            //[req.body.username, req.body.password, req.body.email, req.body.PhoneNum, req.body.DOB, req.body.department, req.body.position, req.body.status,  req.body.role ] );
        var createUser = await executeQuery("INSERT INTO `tbl_user`( `role_id`, `username`, `password`, `email`, `mobile_no`, `dob`, `department`, `position`, `status`, `role`) VALUES (?,?,?,?,?,?,?,?,?,?)",
        [req.body.role_id, req.body.username, req.body.password, req.body.email, req.body.PhoneNum, req.body.DOB, req.body.department, req.body.position, req.body.status,  req.body.role ])
        
        res.status(201).json(createUser);

        console.log(createUser)
    }
    catch(err){
        res.status(500).json(err);
    }
}

const UpdateUser = async (req,res) =>{
    let id = req.query.id;
    console.log(id)

    console.log(req.body)

    try{
        let UpdataUser = await executeQuery(" UPDATE tbl_user SET ? WHERE id = ? ", [req.body, id])
        res.status(200).json(UpdataUser);
        console.log(UpdataUser)
    }
    catch(err){
        console.log(err)
    }
}


const deleteUser = async (req,res) => {
    let id = req.query.id;
    //let value = req.body.value;
    console.log(req.body.value)
    try{
        //let delUser = await executeQuery(` DELETE FROM tbl_user WHERE id = ?`, [id] )
        //let delUser = await executeQuery(" UPDATE `tbl_user` SET `status`='Deactive' WHERE id=?", [id] )
        let delUser = await executeQuery("UPDATE `tbl_user` SET `status`=? WHERE id=?", [id] )
        res.status(200).json(delUser);
    }
    catch(err){
        res.status(500).json(err);    
    }
}

const adminProfile = async (req, res) => {
    try{
        let AdminData=await executeQuery(" SELECT * FROM `tbl_user` where role='Admin' ", [] );
        res.send(AdminData);
    }
    catch(err){
        res.status(500).json(err);
    }
}

export { getAllUser,getUserById,UpdateUser,deleteUser, adminProfile,AddUser }