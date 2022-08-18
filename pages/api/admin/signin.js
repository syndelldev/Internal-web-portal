import nc from "next-connect";
import { executeQuery } from "../../../config/db";
const handler=nc();

async function signin(req,res){

    if(req.method == 'POST'){

        // const Sparkpost = require('sparkpost');
        // const client = new Sparkpost("AIzaSyBiyd6ffWdkMbLeT1pSwkeG94pR0xj0MaQ");
    
        // client.transmissions.send({
        //     content: {
        //     from: "ktechnosoftdev04@gmail.com",
        //     subject: "Web portal",
        //     html: `<p>Hello world</p>`
        //     },
        //     recipients: [{ address: 'ktechnosoftdev04@gmail.com' }]
        // })
        // .then(() => {
        //     console.log('Woohoo! You just sent your first mailing!');
        // })
        // .catch((err) => {
        //     console.log('Something went wrong!');
        //     console.log(err);
        //     console.log(client);
        // });
    
          
        try{

            console.log(req.body);
            console.log(req.body.dob);

            // var signinQuery = await executeQuery("INSERT INTO `tbl_user` ( `username`, `password`, `email`, `mobile_no`, `dob`, `department`) VALUES (?,?,?,?,?,? ) WHERE NOT EXISTS (SELECT 1 FROM tbl_user WHERE email = ?)" , 
            // [req.body.username, req.body.password, req.body.email, req.body.PhoneNum, req.body.dob, req.body.department ] );

            var signinQuery = await executeQuery("INSERT INTO `tbl_user` ( `username`, `password`, `email`, `mobile_no`, `dob`, `department`) VALUES (?,?,?,?,?,? )", 
            [req.body.username, req.body.password, req.body.email, req.body.PhoneNum, req.body.dob, req.body.department ] );

            res.status(200).json(signinQuery);

            console.log(signinQuery)
        }
        catch(err){
            console.log(err)
        }
    }
}

export default signin;