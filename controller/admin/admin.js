import { executeQuery } from "../../config/db";

const getAllUser = async (req,res) =>{
    try{
        let userData=await executeQuery(" SELECT * FROM `tbl_user` WHERE `role_id` NOT IN (1) order by `username` ", [] );
        res.send(userData);
    }
    catch(err){
        res.status(500).json(err);
    }
}

const getUserById = async (req,res) => {
    let id = req.query.id;
    console.log(req.query);
    
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
    
    try{
        if(req.body.role == "Admin"){
            var createUser = await executeQuery("INSERT INTO `tbl_user`( `role_id`, `username`, `password`, `email`, `mobile_no`, `department`, `position`, `status`, `role`) VALUES (?,?,?,?,?,?,?,?,?)",
            ["1", req.body.username, req.body.password, req.body.email, req.body.PhoneNum, req.body.department, req.body.position, req.body.status,  req.body.role ])
            
            res.status(201).json(createUser);
            console.log(createUser)
        }else if(req.body.role == "User"){
            var createUser = await executeQuery("INSERT INTO `tbl_user`( `role_id`, `username`, `password`, `email`, `mobile_no`, `department`, `position`, `status`, `role`) VALUES (?,?,?,?,?,?,?,?,?)",
            ["2", req.body.username, req.body.password, req.body.email, req.body.PhoneNum, req.body.department, req.body.position, req.body.status,  req.body.role ])
            
            res.status(201).json(createUser);
            console.log(createUser)
        }else if(req.body.role == "Super User"){
            var createUser = await executeQuery("INSERT INTO `tbl_user`( `role_id`, `username`, `password`, `email`, `mobile_no`, `department`, `position`, `status`, `role`) VALUES (?,?,?,?,?,?,?,?,?)",
            ["3", req.body.username, req.body.password, req.body.email, req.body.PhoneNum, req.body.department, req.body.position, req.body.status,  req.body.role ])
            
            res.status(201).json(createUser);
            console.log(createUser)
        }
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
    console.log(id)
    console.log(req.body)
    try{
        //let delUser = await executeQuery(` DELETE FROM tbl_user WHERE id = ?`, [id] )
        //let delUser = await executeQuery(" UPDATE `tbl_user` SET `status`='Deactive' WHERE id=?", [id] )
        let delUser = await executeQuery("UPDATE `tbl_user` SET `status`=? WHERE id=?", [req.body.status, id] )
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