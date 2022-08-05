import { executeQuery } from "../../config/db";

const getData = async (req,res) =>{

    const { username, password } = req.body

    let adminData=await executeQuery("select password from `web portal`.`tbl_user` where `username`= ? ", [password] );

    /*let adminData=await executeQuery({
        query: 'SELECT * FROM users WHERE username = ?',
        values: [ username ],
    });*/
    res.send(adminData);
}
export { getData };