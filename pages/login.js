import { useEffect } from 'react';
import { useRouter } from 'next/router'
import { useState } from "react";

//import { useForm  } from 'react-hook-form';
//import { useSession } from "next-auth/react"

/*export async function getServerSideProps(context){

    const res = await fetch(`http://localhost:3000/api/admin/`);
    const data = await res.json();
    //console.log(data)
    return{
        props:{data},
    }
}*/

export default function home()
{
    
    
    //const { register,  watch, handleSubmit, formState: { errors }, control } = useForm(); 

    const [username,setusername] = useState("");
    const [password,setpassword] = useState("");
    const [passwrong,setpasswrong] = useState("");
    const router = useRouter();
    
    

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



        const res = await fetch(`http://localhost:3000/api/admin/login/`,{
            method: "POST",
            headers: { "Content-Type": "application/json",},
            body:JSON.stringify({username,password}),
        })

        const data=await res.json()
        //console.log(data)

        if(data != "")
        {
            var dbpass=data[0].password;
            console.log(dbpass)
            console.log(password)

            if(dbpass == password)
            {
                router.push("/admin/dashboard");
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
                                    <label htmlFor="ba-num"  className='form-label'>Email</label>
                                    <input type="text" name="username" value={username} onChange={e=>setusername(e.target.value)} className='form-control login-input' />
                                    <span className='error-msg' id='erremail'></span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pwd" className='form-label label'>Password</label>
                                    <input type="password"  name="password" value={password} onChange={e=>setpassword(e.target.value)}  className='form-control login-input' />
                                    <span className='error-msg' id='errpassword'></span>
                                </div>  
                                <div className='login-head'>
                                    <div className='login-col'>
                                        <input type="checkbox" /><label className="check" htmlFor="">Remember me</label>
                                    </div>
                                    {/*<div className='login-two'>
                                        <Link href='/'><a><span className='login-text-login'>Forgot Password?</span></a></Link>
                                    </div>*/}
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

