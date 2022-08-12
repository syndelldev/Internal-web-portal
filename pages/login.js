import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router'
import { useState } from "react";
import { IoMdEye , IoMdEyeOff , IoMdMail } from "react-icons/io";
import { server } from 'config';

export default function home()
{
    
    
    //const { register,  watch, handleSubmit, formState: { errors }, control } = useForm(); 

    const [username,setusername] = useState("");
    const [password,setpassword] = useState("");
    const [passwrong,setpasswrong] = useState("");
    const router = useRouter();

    //Password Hide and Show
    const [isRevealPwd, setIsRevealPwd] = useState(false);

    console.log(username);
    //console.log(localStorage.setItem('data', username))

    useEffect(()=>{
        console.log(localStorage.setItem('data', username))
    })
    

    const login = async(e) => {
        e.preventDefault();

        if (username == "") {
            let text = "Enter your Email ID";
            document.getElementById("erremail").innerHTML = text;
        }
        if (password == "") {
            let text = "Enter your Password";
            document.getElementById("errpassword").innerHTML = text;
        }

        

        const res = await fetch(`${server}/api/admin/login/`,{
            method: "POST",
            headers: { "Content-Type": "application/json",},
            body:JSON.stringify({username,password}),
        })

        const data=await res.json()
        console.log(data)

        

        if(data != "")
        {
            var dbpass=data[0].password;
            console.log(dbpass)
            console.log(password)

            var role = data[0].role
            console.log(role)


            if(dbpass == password)
            {
                if(role==='admin'){
                    router.push("/admin/dashboard");
                }
                else if(role==='user'){
                    router.push("/user/dashboard");
                }
                
                //alert("Sucess")
            }
            else{
                //alert("password wrong")
                setpasswrong("Username and Password Not matched!")
            }
            
        }
        else{
            //alert("Failed")
        }
        
        /*const formdata = data[0].username;

        console.log(localStorage.setItem('data', formdata))
        //console.log(formdata)

        //console.log(localStorage.setItem('data', formdata));

        React.useEffect(()=>{
            localStorage.setItem('formdata', JSON.stringify(formdata))
        },[formdata])*/
        
        
}


return(
        <>
            <style global jsx>{`html, body,div#__next{ height: 100%; }`}</style> 
            <section className='login-section'>
                <div className='container login-container'>
                    <div className='login-div'>
                        <h2 className='login-title'>Automation Tool Login</h2>
                        <form method='POST' className="login-main" onSubmit={login} >
                            <div id='personal-account'>
                                <div className="form-group"  >
                                    <label htmlFor="ba-num"  className='form-label'>Username</label>
                                    <input type="text" name="username" value={username} onChange={e=>setusername(e.target.value)} className='form-control login-input' />
                                    <span className='icon-eyes'><IoMdMail /></span>
                                    <span className='error-msg' id='erremail'></span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pwd" className='form-label label'>Password</label>
                                    <input type={isRevealPwd ? 'text' : 'password'}  name="password" value={password} onChange={e=>setpassword(e.target.value)}  className='form-control login-input' />
                                    <span className='icon-eyes' onClick={() => setIsRevealPwd((prevState) => !prevState)} >{isRevealPwd ? <IoMdEyeOff /> : <IoMdEye/>}</span>
                                    <span className='error-msg' id='errpassword'></span>
                                </div>  
                                <div className='login-head'>
                                    <div className='login-col'>
                                        <input type="checkbox" /><label className="check" htmlFor="">Remember me</label>
                                    </div>
                                    <div className='login-two'>
                                        <a href='#'><span className='login-text-login'>Forgot Password?</span></a>
                                        <a href='/signin'><span className='login-text-login'>Create Account</span></a>
                                    </div>
                                </div> 
                                <p className='error-msg'>{passwrong}</p>
                                <div className="login-btn">
                                    <button type="submit" className="login-create-acc-btn">Login</button>  
                                </div>      
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );


}

