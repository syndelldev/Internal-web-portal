import { useEffect } from 'react';
import { useRouter } from 'next/router'
import { useState } from "react";

export default function Login()
{
    //console.log(JSON.stringify(data));
    const [username,setusername] = useState("");
    const [password,setpassword] = useState("");
    const [message,setmessage] = useState("You are not LogIn!");

    let usernamechange = (e) => {
        let inputvalue = e.target.value;
        setusername(inputvalue);
    }
    
    let passwordchange = (e) => {
        let inputvalue = e.target.value;
        setpassword(inputvalue);
    }
    
    const login = async(e) => {
        e.preventDefault();
        
        const result = await fetch(`http://localhost:3000/api/admin/login/`,{
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            credentials : "include",
            body:JSON.stringify({ username:username, password:password }),
        })
        //const data = await res.json()

        console.log(username)
        console.log(password)
        

        /*if(result.status === 200)
        {
            window.alert("Sucess")
        }
        else //if(result.status==500)
        {
            window.alert("Login Failed")
        }*/
        try{
            console.log(result)
        }
        catch(error){
            window.alert(error);
            console.log(error);
        }
    }

    return(
        <>
            <section className='login-section'>
                <div className='container login-container'>
                    <div className='login-div'>
                       <h2 className='login-title'>Automation Tool Login</h2>
                            <form method="POST" onSubmit={login} className="login-main"  >
                            <div id='personal-account'>
                                <div className="form-group"  >
                                    <label htmlFor="ba-num"  className='form-label'>Email</label>
                                    <input type="text" id="username" name="username" value={username} onChange={usernamechange} className='form-control login-input' />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pwd" className='form-label label'>Password</label>
                                    <input type="password" id="password" name="password" value={password} onChange={passwordchange}  className='form-control login-input' />
                                </div>  
                                <div className='login-head'>
                                    <div className='login-col'>
                                        <input type="checkbox" /><label className="check" htmlFor="">Remember me</label>
                                    </div>
                                    {/*<div className='login-two'>
                                        <Link href='/'><a><span className='login-text-login'>Forgot Password?</span></a></Link>
                                    </div>*/}
                                </div> 
                                
                                <div className="login-btn">
                                    <button type="submit" className="login-create-acc-btn">Login</button>  
                                </div>         
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
        
}