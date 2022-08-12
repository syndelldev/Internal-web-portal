import { useRef, useState } from "react";
import { IoMdEye , IoMdEyeOff , IoMdMail } from "react-icons/io";
import { useForm } from 'react-hook-form';
import { server } from 'config';

export default function SignIn(){
    const { register,  watch, handleSubmit, formState: { errors }, control } = useForm(); 

    const [username,setusername] = useState('')
    const [pass,setpass] = useState('')
    const [email,setemail] = useState('')
    const [PhoneNum,setPhoneNum] = useState('')
    const [dob,setdob] = useState('')
    const [department,setdepartment] = useState('')


    //Password Hide & Show Toggle
    const [pwd, setPwd] = useState('');
    const [isRevealPwd, setIsRevealPwd] = useState(false);

    const [conpwd, setconPwd] = useState('');
    const [isRevealconPwd, setIsRevealconPwd] = useState(false);

    //Match Password
    const password = useRef({});
    password.current = watch("password", "");

    const onSubmit= async(e) =>{
        //e.preventDefault();

        if (username == "") {
            let text = "Enter your username";
            document.getElementById("errusername").innerHTML = text;
        }
        if (pass == "") {
            let text = "Enter your password";
            document.getElementById("errpass").innerHTML = text;
        }
        if (email == "") {
            let text = "Enter your Email ID";
            document.getElementById("erremail").innerHTML = text;
        }
        if (PhoneNum == "") {
            let text = "Enter your Phone Num";
            document.getElementById("errpnum").innerHTML = text;
        }
        if (dob == "") {
            let text = "Enter your dob";
            document.getElementById("errdob").innerHTML = text;
        }
        if (department == "") {
            let text = "Enter your department";
            document.getElementById("errdpt").innerHTML = text;
        }

        console.log(username);console.log(email);console.log(pass);console.log(PhoneNum);console.log(dob);console.log(department);

        const res = await fetch(`${server}/api/admin/signin/`,{
            method: "POST",
            headers: { "Content-Type": "application/json",},
            body:JSON.stringify({username,email,pass,PhoneNum,dob,department}),
        })
        const data=await res.json()

        if(res.status==200)
        {
            alert("sucess")
        }
        else
        {
            alert("Fail")
        }
    }
    return(
        <>
            <section className='login-section'>
                <div className='container login-container'>
                    <div className='login-div'>
                        <h2 className='login-title'>Automation Tool SignIn</h2>
                        <form method="POST" onSubmit={handleSubmit(onSubmit)} >{/*onSubmit={handleSubmit(onSubmit)}*/}

                            <div className="form-group">
                                <label htmlFor="username" className='form-label label' >Name</label>
                                <input type="text" className="form-control signup-input" name="username" value={username} onChange={e=>setusername(e.target.value)} />
                                <span className='error-msg' id='errusername'></span>
                            </div> 

                            <div className="form-group">
                                <label htmlFor="email" className='form-label label' >Email</label>
                                <input type="text" className="form-control signup-input" name="email" value={email} onChange={e=>setemail(e.target.value)}  />
                                <span className='error-msg' id='erremail'></span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="PhoneNum" className='form-label label' >Phone Number</label>
                                <input type="text" className="form-control signup-input" name="PhoneNum" value={PhoneNum} onChange={e=>setPhoneNum(e.target.value)} />
                                <span className='error-msg' id='errpnum'></span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="dob" className='form-label label' >Date of Birth</label>
                                <input type="text" className="form-control signup-input" name="dob" value={dob} onChange={e=>setdob(e.target.value)}/>
                                <span className='error-msg' id='errdob'></span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password" className='form-label label' >Password</label>
                                <input type={isRevealPwd ? 'text' : 'password'} name="password" className="form-control signup-input" value={pass} onChange={e=>setpass(e.target.value)} />
                                <span className='icon-eyes' onClick={() => setIsRevealPwd((prevState) => !prevState)} >{isRevealPwd ? <IoMdEyeOff /> : <IoMdEye/>}</span>
                                <span className='error-msg' id='errpass'></span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirm-pwd" className='form-label label'>Confirm Password</label>
                                <input type={isRevealconPwd ? 'text' : 'password'} className="form-control signup-input" />
                                <a><span className='icon-eyes' onClick={() => setIsRevealconPwd((prevState) => !prevState)}>{isRevealconPwd ? <IoMdEyeOff /> : <IoMdEye/>}</span></a>
                                <div className="">{errors.confirmPwd && <p>{errors.confirmPwd.message}</p>}</div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="Department" className='form-label label' >Department</label>
                                <input type="text" className="form-control signup-input" name="department" value={department} onChange={e=>setdepartment(e.target.value)} />
                                <span className='error-msg' id='errdpt'></span>
                            </div> 

                            <div className='login-btn'>
                                <button type="submit" className="login-create-acc-btn" >Create Account</button>
                            </div>  

                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}