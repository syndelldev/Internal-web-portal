import { useRef, useState } from "react";
import { useRouter } from 'next/router'
import { IoMdEye , IoMdEyeOff , IoMdArrowDropdown } from "react-icons/io";
import { useForm } from 'react-hook-form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { server } from 'config';

  
export default  function SignIn(){
    const { register, watch, handleSubmit, formState: { errors }, setValue } = useForm({mode: "onBlur"}); 
    const router = useRouter();

    const [startDate, setStartDate] = useState();
    //console.log(startDate)


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

        //console.log(result.username);console.log(result.email);console.log(result.password);console.log(result.PhoneNum);console.log(result.start);console.log(result.department);
        console.log(startDate)
        const res = await fetch(`${server}/api/admin/signin/`,{
            method: "POST",
            headers: { "Content-Type": "application/json",},
            body:JSON.stringify({username:result.username, password:result.password, email:result.email, PhoneNum:result.PhoneNum, dob:startDate, department:result.department, role:"User"}),
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
                                <input type="hidden" className="form-control signup-input" name="role" value="User" {...register('role',  { required: "Please enter your name", pattern: {value: /^[aA-zZ\s]+$/ , message: 'Only characters allow',} })} />
                                <div className="error-msg">{errors.role && <p>{errors.role.message}</p>}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="username" className='form-label label' >Name</label>
                                <input type="text" className="form-control signup-input" name="username" placeholder="Enter Your Name" {...register('username',  { required: "Please enter your name", pattern: {value: /^[aA-zZ\s]+$/ , message: 'Only characters allow',} })} />
                                <div className="error-msg">{errors.username && <p>{errors.username.message}</p>}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className='form-label label' >Email</label>
                                <input type="text" className="form-control signup-input" name="email" placeholder="Enter Your Email" {...register('email', { required: 'Please enter your email', pattern: {value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: 'Please enter a valid email',},} )} />
                                <div className="error-msg">{errors.email && <p>{errors.email.message}</p>}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="PhoneNum" className='form-label label' >Phone Number</label>
                                <input type="text" className="form-control signup-input" name="PhoneNum" placeholder="Enter Your Phone Number" {...register('PhoneNum',  { required: "Please enter your phone number", minLength: {value: 10, message: "enter least 10 digits" }, maxLength: {value: 12, message: "phone number is too large" }, pattern: {value: /^[0-9]+$/ , message: 'Only Numbers allow', } })}  />
                                <div className="error-msg">{errors.PhoneNum && <p>{errors.PhoneNum.message}</p>}</div>
                                
                            </div>
                            <div className="form-group">
                                <label htmlFor="dob" className='form-label label' >Date of Birth</label>
                                <DatePicker
                                    placeholderText="mm/dd/yyyy"
                                    isClearable
                                    name="datetime1"
                                    className={"form-control"}
                                    selected={startDate}
                                    onChange={val => {
                                        setStartDate(val);
                                        setValue("start", val);
                                    }}
                                    dateFormat="MM-dd-yyyy"
                                />
                                <div className="error-msg">{errors.dob && <p>{errors.dob.message}</p>}</div>
                                {/*<input type="text" className="form-control signup-input" name="dob" {...register('dob',  { required: "Please enter your DOB", pattern: {value: /^[0-9]+$/ , message: 'Only Numbers allow',} })}  />
                                <div className="error-msg">{errors.dob && <p>{errors.dob.message}</p>}</div>*/}
                            </div>

                            <div className="form-group">
                                <label htmlFor="password" className='form-label label' >Password</label>
                                <input type={isRevealPwd ? 'text' : 'password'} name="password" placeholder="Enter Your Password" className="form-control signup-input" {...register('password', { required: "Please enter your password",minLength: {value: 8, message: "Password must have at least 8 characters" }, pattern: {value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, message: 'must include lower, upper, number, and special chars',} })}  />
                                <span className='icon-eyes' onClick={() => setIsRevealPwd((prevState) => !prevState)} >{isRevealPwd ? <IoMdEyeOff /> : <IoMdEye/>}</span>
                                <div className="error-msg">{errors.password && <p>{errors.password.message}</p>}</div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirm-pwd" className='form-label label'>Confirm Password</label>
                                <input type={isRevealconPwd ? 'text' : 'password'} className="form-control signup-input" placeholder="Please confirm your password" {...register('confirmPwd', {  validate: value =>value === password.current || "The passwords do not match" })}  />
                                <a><span className='icon-eyes' onClick={() => setIsRevealconPwd((prevState) => !prevState)}>{isRevealconPwd ? <IoMdEyeOff /> : <IoMdEye/>}</span></a>
                                <div className="">{errors.confirmPwd && <p>{errors.confirmPwd.message}</p>}</div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="Department" className='form-label label' >Department</label><br/>
                                {/*<input type="text" className="form-control signup-input" name="department" {...register('department',  { required: "Please enter your department", pattern: {value: /^[aA-zZ\s]+$/ , message: 'Only characters allow',} })}  />
                                <div className="error-msg">{errors.department && <p>{errors.department.message}</p>}</div>*/}
                                
                                <select name="Department" id="Department" className="form-control signup-input" {...register('department', {required: "Please enter your department" ,message:'Please select atleast one option', })}>
                                    <option value="">Select Your Department</option>
                                    <option value="HR">HR</option>
                                    <option value="UI & UX">UI & UX</option>
                                    <option value="Web development">Web development</option>
                                    <option value="Content writer">Content writer</option>
                                    <option value="Project manager">Project manager</option>
                                    <option value="Mobile App developer">Mobile App developer</option>
                                    <option value="SEO">SEO</option>
                                </select>
                                <span className='icon-eyes'><IoMdArrowDropdown /></span>
                                <div className="error-msg">{errors.department && <p>{errors.department.message}</p>}</div>
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