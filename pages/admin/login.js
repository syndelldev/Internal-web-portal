import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router'

import React, { useState } from 'react';
import { IoMdEye , IoMdEyeOff } from "react-icons/io";

import jwt from 'jsonwebtoken'

export default function Login(){
    const { register,  watch, handleSubmit, formState: { errors }, control } = useForm(); 

    const[username,setusername] = useState('');
    const[password,setpassword] = useState('');

    let namechange = (e) => {
        e.preventDefault();
        let inputvalue = e.target.value;
        setusername(inputvalue);
    }
    let passchange = (e) => {
        e.preventDefault();
        let inputvalue = e.target.value;
        setpassword(inputvalue);
    }

    const[message,setmessage]=useState('You are not Login');

    //const router = useRouter();

    //Password Hide & Show Toggle
    const [pwd, setPwd] = useState('');
    const [isRevealPwd, setIsRevealPwd] = useState(false);

    async function submitForm(){
        //console.log(data)
        

        const res = await fetch('http://localhost:3000/api/admin/login',{
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({ username,password }),
        }).then((t)=>t.json())

        const token = res.token
        if(token){
            const json = jwt.decode(token) //as { [key:string]:string }
            console.log(json)
            setmessage(`Welcome! ${json.username} and you are ${json.admin? 'an admin!' : 'not an admin!'}` )
            //router.push('/dashboard');
        }
        else
        {
            setmessage("Something Went Wrong !")
        }

        /*if(response.status==200)
        {
            alert("Login successful");
        }
        else
        {
            alert("Login Failed");
        }*/
    }
    

    return(
        <>
            <style global jsx>{`html, body,div#__next{ height: 100%; }`}</style> 
            <section className='login-section'>
                <div className='container login-container'>
                    <div className='login-div'>
                        <div className='login-head'>
                            {/*<div className='login-logo'>
                                <a href="/"> <Image src="/Images/logo.png" alt="login logo" width={220} height={50} /></a>
                            </div>*/}
                        </div>

                        <h2 className='login-title'>Log In</h2>

                        <h3>Welcome back! Please enter your details.</h3>
                        <h1>{message}</h1>
                        <form method='POST' className="login-main" onSubmit={submitForm}>{/*onSubmit={handleSubmit(onSubmit)} action='http://localhost:3000/api/admin/login' */}
                            <div id='personal-account'>
                                <div className="form-group"  >
                                    <label htmlFor="ba-num"  className='form-label'>Email</label>
                                    <input type="text" name="username" className='form-control login-input' value={username} onChange={namechange}  />{/*{...register('username',  { required: "Please enter your Name", pattern: {value: /^[aA-zZ\s]+$/ , message: 'Only characters allow',} })}*/}
                                    {/*<div className="error-msg">{errors.username && <p>{errors.username.message}</p>}</div>*/}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pwd" className='form-label label'>Password</label>
                                    <input type={isRevealPwd ? 'text' : 'password'} name="password" value={password} onChange={passchange}  className='form-control login-input' />{/*{...register('password', { required: "You must specify a password",minLength: {value: 8, message: "Password must have at least 8 characters" }, pattern: {value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, message: 'must include lower, upper, number, and special chars',} })} */}
                                    <span className='icon-eyes' onClick={() => setIsRevealPwd((prevState) => !prevState)} >{isRevealPwd ? <IoMdEyeOff /> : <IoMdEye/>}</span>
                                    {/*<div className="error-msg">{errors.password && <p>{errors.password.message}</p>}</div>*/}
                                </div>  
                                <div className='login-head'>
                                    <div className='login-col'>
                                        <input type="checkbox" /><label className="check" htmlFor="">Remember me</label>
                                    </div>  
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