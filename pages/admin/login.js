import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import jwt from 'jsonwebtoken'

export default function Login(){
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const [message, setmessage] = useState("You are not  LogIn!")

    const onsubmit = async(e) =>{
        e.preventDefault();
        console.log(JSON.stringify({username,password}))
        /*const res = await fetch('http://localhost:3000/api/admin/login',{
            method:'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({username,password})
        }).then((t)=>t.json())

        const token = res.token
        if(token)
        {
            //const json = jwt.decode(token)
            console.log(password)
            setmessage(`welcome ${username} and ${password}! } `)
        }
        else
        {
            setmessage('Something Went Wrong!')
        }*/

    }
    return(
        <>
            <style global jsx>{`html, body,div#__next{ height: 100%; }`}</style> 
            <section className='login-section'>
                <div className='container login-container'>
                    <div className='login-div'>
                       <h2 className='login-title'>Automation Tool Login</h2>
                        <p>{message}</p>
                            <form method='POST' className="login-main" onSubmit={onsubmit} >
                            <div id='personal-account'>
                                <div className="form-group"  >
                                    <label htmlFor="ba-num"  className='form-label'>Email</label>
                                    <input type="text" name="username" value={username} onChange={e=>setusername(e.target.value)} className='form-control login-input' />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pwd" className='form-label label'>Password</label>
                                    <input type="password"  name="password" value={password} onChange={e=>setpassword(e.target.value)}  className='form-control login-input' />
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