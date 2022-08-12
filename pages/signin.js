import { useRef, useState } from "react";
import { useRouter } from 'next/router'
import { IoMdEye , IoMdEyeOff , IoMdArrowDropdown } from "react-icons/io";
import { useForm } from 'react-hook-form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { server } from 'config';

const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" }
];
  
export default  function SignIn(){
    const { register,  watch, handleSubmit, formState: { errors }, control } = useForm(); 
    const router = useRouter();

    const [Startdate, setStartDate] = useState(new Date());

    // const [username,setusername] = useState('')
    // const [pass,setpass] = useState('')
    // const [email,setemail] = useState('')
    // const [PhoneNum,setPhoneNum] = useState('')
    // const [dob,setdob] = useState('')
    // const [department,setdepartment] = useState('')


    //Password Hide & Show Toggle
    const [pwd, setPwd] = useState('');
    const [isRevealPwd, setIsRevealPwd] = useState(false);

    const [conpwd, setconPwd] = useState('');
    const [isRevealconPwd, setIsRevealconPwd] = useState(false);

    //Match Password
    const password = useRef({});
    password.current = watch("password", "");

    const onSubmit= async(result) =>{
        //e.preventDefault();
        console.log(result);
        /*if (username == "") {
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
        }*/

        console.log(result.username);console.log(result.email);console.log(result.pass);console.log(result.PhoneNum);console.log(result.dob);console.log(result.department);

        const res = await fetch(`${server}/api/admin/signin/`,{
            method: "POST",
            headers: { "Content-Type": "application/json",},
            //body:JSON.stringify({username,email,pass,PhoneNum,dob,department}),
            body:JSON.stringify({username:result.username,password:result.password,email:result.email,PhoneNum:result.PhoneNum,dob:result.dob,department:result.department}),
        })
        const data=await res.json()

        if(res.status==200)
        {
            //alert("sucess")
            router.push("/login");
        }
        else
        {
            //alert("Fail")
        }
    }
    return(
        <>
            <section className='login-section'>
                <div className='container login-container'>
                    <div className='login-div'>
                        <h2 className='login-title'>Automation Tool SignIn</h2>
                        <form method="POST" onSubmit={handleSubmit(onSubmit)} >

                            <div className="form-group">
                                <label htmlFor="username" className='form-label label' >Name</label>
                                <input type="text" className="form-control signup-input" name="username"  {...register('username',  { required: "Please enter your Username", pattern: {value: /^[aA-zZ\s]+$/ , message: 'Only characters allow',} })} />
                                <div className="error-msg">{errors.username && <p>{errors.username.message}</p>}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className='form-label label' >Email</label>
                                <input type="text" className="form-control signup-input" name="email" {...register('email', { required: 'Email is required', pattern: {value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: 'Please enter a valid email',},} )} />
                                <div className="error-msg">{errors.email && <p>{errors.email.message}</p>}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="PhoneNum" className='form-label label' >Phone Number</label>
                                <input type="text" className="form-control signup-input" name="PhoneNum" {...register('PhoneNum',  { required: "Please enter your PhoneNum", pattern: {value: /^[0-9]+$/ , message: 'Only Numbers allow',} })}  />
                                <div className="error-msg">{errors.PhoneNum && <p>{errors.PhoneNum.message}</p>}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="dob" className='form-label label' >Date of Birth</label>
                                {/*<DatePicker 
                                    {...register('dob', {required:true ,message:'Please select atleast one option', })}
                                    name="dob"
                                    className="form-control signup-input"
                                    selected={Startdate} 
                                    onChange={(date) => setStartDate(date)}
    />*/}
                                <input type="text" className="form-control signup-input" name="dob" {...register('dob',  { required: "Please enter your DOB", pattern: {value: /^[0-9]+$/ , message: 'Only Numbers allow',} })}  />
                                <div className="error-msg">{errors.dob && <p>{errors.dob.message}</p>}</div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password" className='form-label label' >Password</label>
                                <input type={isRevealPwd ? 'text' : 'password'} name="password" className="form-control signup-input" {...register('password', { required: "You must specify a password",minLength: {value: 8, message: "Password must have at least 8 characters" }, pattern: {value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, message: 'must include lower, upper, number, and special chars',} })}  />
                                <span className='icon-eyes' onClick={() => setIsRevealPwd((prevState) => !prevState)} >{isRevealPwd ? <IoMdEyeOff /> : <IoMdEye/>}</span>
                                <div className="error-msg">{errors.password && <p>{errors.password.message}</p>}</div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirm-pwd" className='form-label label'>Confirm Password</label>
                                <input type={isRevealconPwd ? 'text' : 'password'} className="form-control signup-input" {...register('confirmPwd', {  validate: value =>value === password.current || "The passwords do not match" })}  />
                                <a><span className='icon-eyes' onClick={() => setIsRevealconPwd((prevState) => !prevState)}>{isRevealconPwd ? <IoMdEyeOff /> : <IoMdEye/>}</span></a>
                                <div className="">{errors.confirmPwd && <p>{errors.confirmPwd.message}</p>}</div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="Department" className='form-label label' >Department</label><br/>
                                {/*<input type="text" className="form-control signup-input" name="department" {...register('department',  { required: "Please enter your department", pattern: {value: /^[aA-zZ\s]+$/ , message: 'Only characters allow',} })}  />
                                <div className="error-msg">{errors.department && <p>{errors.department.message}</p>}</div>*/}
                                
                                <select name="Department" id="Department" className="form-control signup-input" {...register('department', {required:true ,message:'Please select atleast one option', })}>
                                    <option value="Select...">Select...</option>
                                    <option value="HR">HR</option>
                                    <option value="UI & UX">UI & UX</option>
                                    <option value="Web development">Web development</option>
                                    <option value="Content writer">Content writer</option>
                                    <option value="Project manager">Project manager</option>
                                    <option value="Mobille App developer">Mobille App developer</option>
                                    <option value="SEO">SEO</option>
                                </select>
                                <span className='icon-eyes'><IoMdArrowDropdown /></span>
                                <div className="error-msg">{errors.department && <p>{errors.department.message}</p>}</div>
                            </div>

                            <div className='login-btn'>
                                <button type="submit" className="login-create-acc-btn" >Create Account</button>
                            </div>  

                        </form>
                        {/*<form method="POST" onSubmit={handleSubmit(onSubmit)} >

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

                        </form>*/}
                    </div>
                </div>
            </section>
        </>
    )
} 