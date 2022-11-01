import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router'
import { useState } from "react";
import { IoMdEye , IoMdEyeOff , IoMdMail } from "react-icons/io";
import { server } from 'config';
import { useForm, Controller } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
import bcrypt from 'bcryptjs'

export default function home(){

    const { register, watch, handleSubmit, formState: { errors }, setValue, control } = useForm({mode: "onBlur"}); 
    const [cookies, setCookie] = useCookies(['name']);

    const avtar=[];
    console.log('avtar', avtar)

    const [email,setemail] = useState("");
    const [password,setpassword] = useState("");

    const [passwrong,setpasswrong] = useState("");
    const [user,setuser] = useState("");
    const [userstatus,setuserstatus] = useState("");
    const router = useRouter();

    //Password Hide and Show
    const [isRevealPwd, setIsRevealPwd] = useState(false);

    const toastId = React.useRef(null);

    console.log(email);

    const login = async(result) => {
        console.log(result)

        // if (email == "") {
        //     let text = "Enter your Email ID";
        //     document.getElementById("erremail").innerHTML = text;
        // }
        // if (password == "") {
        //     let text = "Enter your Password";
        //     document.getElementById("errpassword").innerHTML = text;
        // }

        const res = await fetch(`${server}/api/admin/login`,{
            method: "POST",
            headers: { "Content-Type": "application/json",},
            body:JSON.stringify({email:result.email, password:result.password}),
        })

        const data=await res.json()
        console.log(data)
        //console.log(data[0].username);
        

        if(data != "")
        {
            var dbpass=data[0].password;
            console.log('dbpass', dbpass)
            console.log('Input Password', result.password)

            var role = data[0].role
            console.log(role)

            if(data[0].status == 'Active'){
                // alert("sucess")
            
                bcrypt.compare(result.password, dbpass, function(err, result){
                    if(result){
                        console.log("success");
                        setCookie('name', data[0].username, { path:'/' , sameSite:true, });
                        setCookie('Id', data[0].id, { path:'/' , sameSite:true, });
                        setCookie('Role_id', data[0].role_id, { path:'/' , sameSite:true, });

                        if(! toast.isActive(toastId.current)) 
                        {
                            toastId.current = toast.success('Login Successful! 🎉', {
                                position: "top-right",
                                autoClose:1000,
                                onClose: () => router.push(`${server}/dashboard`)
                            });
                        }      
                    }
                    else{
                        //alert("password wrong")
                        setpasswrong("Username and Password Not matched!")
                    }
                })
            }
            else{
                // alert("User Deactive")
                setuserstatus("User is Inactive")
            }
        }
        else{
            // alert("Failed")
            setuser("User Does not Exits! ")
        }
    }


    return(
        <>
            <style global jsx>{`html, body,div#__next{ height: 100%;background-color: #00155c; }`}</style> 
            <section className='login-section'>
                <div className='container login-container'>
                    <div className='login-div'>
                        <h2 className='login-title'>Automation Tool Login</h2>
                        <form method='POST' className="login-main" onSubmit={handleSubmit(login)} >
                            <div id='personal-account'>
                                <div className="form-group"  >
                                    <label htmlFor="ba-num"  className='form-label'>Email</label>
                                    <input type="email" name="email" placeholder="Enter your email" className='form-control login-input' {...register('email', { required: 'Please enter your email', pattern: {value: /^[a-zA-Z0-9+_.-]+@+syndelltech+.+[A-z]$/ , message: 'Please enter a valid email ex:email@syndelltech.in',},} )} />
                                    <span className='icon-eyes'><IoMdMail /></span>
                                    <div className="error-msg">{errors.email && <p>{errors.email.message}</p>}</div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pwd" className='form-label label'>Password</label>
                                    <input type={isRevealPwd ? 'text' : 'password'} placeholder="Enter your password" name="password" className='form-control login-input' {...register('password', { required: "Please enter your password",minLength: {value: 8, message: "Password must have at least 8 characters" }, pattern: {value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, message: 'must include lower, upper, number, and special chars',} })}  />
                                    <span className='icon-eyes' onClick={() => setIsRevealPwd((prevState) => !prevState)} >{isRevealPwd ? <IoMdEyeOff /> : <IoMdEye/>}</span>
                                    <div className="error-msg">{errors.password && <p>{errors.password.message}</p>}</div>
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
                                <p className='error-msg'>{user}</p>
                                <p className='error-msg'>{userstatus}</p>
                                <div className="login-btn">
                                    <button type="submit" className="login-create-acc-btn">Login</button>  
                                </div> 
                                <div className='login-text'>
                                    {/* <p>Don&apos;t have an account? <a href='/signup'><span className='signup-text-login'>Sign Up</span></a></p> */}
                                    {/* <div> <p>Don&apos;t have an account?</p> </div> */}
                                    {/* <div> <p><a href='/signup' className='signup-text-login'>Sign Up</a></p> </div> */}
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