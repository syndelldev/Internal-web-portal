import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router'
import { useState } from "react";
import { IoMdEye , IoMdEyeOff , IoMdMail } from "react-icons/io";
import { server } from 'config';
//import Cookies from 'js-cookie';
import { useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';

export default function home()
{
    //const { register,  watch, handleSubmit, formState: { errors }, control } = useForm(); 
    const [cookies, setCookie] = useCookies(['name']);

    const [email,setemail] = useState("");
    const [password,setpassword] = useState("");

    const [passwrong,setpasswrong] = useState("");
    const router = useRouter();

    //Password Hide and Show
    const [isRevealPwd, setIsRevealPwd] = useState(false);

    const toastId = React.useRef(null);

    console.log(email);

    const login = async(e) => {
        e.preventDefault();

        if (email == "") {
            let text = "Enter your Email ID";
            document.getElementById("erremail").innerHTML = text;
        }
        if (password == "") {
            let text = "Enter your Password";
            document.getElementById("errpassword").innerHTML = text;
        }

        const res = await fetch(`${server}/api/admin/login`,{
            method: "POST",
            headers: { "Content-Type": "application/json",},
            body:JSON.stringify({email,password}),
        })

        const data=await res.json()
        console.log(data)
        //console.log(data[0].username);
        

        if(data != "")
        {
            var dbpass=data[0].password;
            console.log(dbpass)
            console.log(password)

            var role = data[0].role
            console.log(role)

            
            if(dbpass == password)
            {
                if(role=='Admin'){
                    setCookie('name', data[0].username, { path:'/' , sameSite:true, });
                    setCookie('Email', data[0].email, { path:'/' , sameSite:true, });
                    setCookie('Mobile_num', data[0].mobile_no, { path:'/' , sameSite:true, });
                    setCookie('DOB', data[0].dob, { path:'/' , sameSite:true, });
                    setCookie('Department', data[0].department, { path:'/' , sameSite:true, });
                    setCookie('Position', data[0].position, { path:'/' , sameSite:true, });
                    setCookie('Role', data[0].role, { path:'/' , sameSite:true, });
                    setCookie('Position', data[0].position, { path:'/' , sameSite:true, });
                    setCookie('Id', data[0].id, { path:'/' , sameSite:true, });
                    setCookie('Avtar', data[0].avtar, { path:'/' , sameSite:true, });
                    setCookie('Role_id', data[0].role_id, { path:'/' , sameSite:true, });

                    if(! toast.isActive(toastId.current)) {
                        toastId.current = toast.success('Login Successful! 🎉', {
                            position: "top-right",
                            autoClose:1000,
                            onClose: () => router.push("/admin/dashboard")
                            });
                        }
                    }
                else if(role=='User'){
                    setCookie('name', data[0].username, { path:'/' , sameSite:true, });
                    setCookie('Email', data[0].email, { path:'/' , sameSite:true, });
                    setCookie('Mobile_num', data[0].mobile_no, { path:'/' , sameSite:true, });
                    setCookie('DOB', data[0].dob, { path:'/' , sameSite:true, });
                    setCookie('Department', data[0].department, { path:'/' , sameSite:true, });
                    setCookie('Position', data[0].position, { path:'/' , sameSite:true, });
                    setCookie('Role', data[0].role, { path:'/' , sameSite:true, });
                    setCookie('Id', data[0].id, { path:'/' , sameSite:true, });
                    setCookie('Avtar', data[0].avtar, { path:'/' , sameSite:true, });
                    setCookie('Role_id', data[0].role_id, { path:'/' , sameSite:true, });

  
                    if(! toast.isActive(toastId.current)) {
                    toastId.current = toast.success('Login Successful! 🎉', {
                        position: "top-right",
                        autoClose:1000,
                        onClose: () => router.push("/user/dashboard")
                        });
                    }
                }
                else if(role=='Super User'){
                    setCookie('name', data[0].username, { path:'/' , sameSite:true, });
                    setCookie('Email', data[0].email, { path:'/' , sameSite:true, });
                    setCookie('Mobile_num', data[0].mobile_no, { path:'/' , sameSite:true, });
                    setCookie('DOB', data[0].dob, { path:'/' , sameSite:true, });
                    setCookie('Department', data[0].department, { path:'/' , sameSite:true, });
                    setCookie('Position', data[0].position, { path:'/' , sameSite:true, });
                    setCookie('Role', data[0].role, { path:'/' , sameSite:true, });
                    setCookie('Id', data[0].id, { path:'/' , sameSite:true, });
                    setCookie('Avtar', data[0].avtar, { path:'/' , sameSite:true, });
                    setCookie('Role_id', data[0].role_id, { path:'/' , sameSite:true, });

                    if(! toast.isActive(toastId.current)) 
                    {
                        toastId.current = toast.success('Login Successfully! 🎉', {
                            position: "top-right",
                            autoClose:1000,
                            onClose: () => router.push("/superuser/dashboard")
                            });
                        }
                }
            }
            else{
                //alert("password wrong")
                setpasswrong("Username and Password Not matched!")
            }
            
        }
        else{
            //alert("Failed")
        }
}


return(
        <>
            <style global jsx>{`html, body,div#__next{ height: 100%;background-color: #ADD8E6; }`}</style> 
            <section className='login-section'>
                <div className='container login-container'>
                    <div className='login-div'>
                        <h2 className='login-title'>Automation Tool Login</h2>
                        <form method='POST' className="login-main" onSubmit={login} >
                            <div id='personal-account'>
                                <div className="form-group"  >
                                    <label htmlFor="ba-num"  className='form-label'>Email</label>
                                    <input type="email" name="email" value={email} placeholder="Enter your email" onChange={e=>setemail(e.target.value)} className='form-control login-input' />
                                    <span className='icon-eyes'><IoMdMail /></span>
                                    <span className='error-msg' id='erremail'></span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pwd" className='form-label label'>Password</label>
                                    <input type={isRevealPwd ? 'text' : 'password'} placeholder="Enter your password" name="password" value={password} onChange={e=>setpassword(e.target.value)}  className='form-control login-input' />
                                    <span className='icon-eyes' onClick={() => setIsRevealPwd((prevState) => !prevState)} >{isRevealPwd ? <IoMdEyeOff /> : <IoMdEye/>}</span>
                                    <span className='error-msg' id='errpassword'></span>
                                </div>  
                                <div className='login-head'>
                                    <div className='login-col'>
                                        <input type="checkbox" /><label className="check" htmlFor="">Remember me</label>
                                    </div>

                                    {/* <div className='login-two'>
                                        <a href='#'><span className='login-text-login'>Forgot Password?</span></a> */}
                                        {/*<a href='/signin'><span className='login-text-login'>Create Account</span></a>*/}
                                    {/* </div> */}
                                </div> 

                                <p className='error-msg'>{passwrong}</p>
                                <div className="login-btn">
                                    <button type="submit" className="login-create-acc-btn">Login</button>  
                                </div> 
                                <div className='login-text'>
                                    {/* <p>Don&apos;t have an account? <a href='/signup'><span className='signup-text-login'>Sign Up</span></a></p> */}
                                    <div> <p>Don&apos;t have an account?</p> </div>
                                    <div> <p><a href='/signup' className='signup-text-login'>Sign Up</a></p> </div>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <ToastContainer limit={1}/>
        </>
    );


}
