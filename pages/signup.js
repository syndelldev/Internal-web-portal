import React, { useRef, useState,useEffect } from "react";
import { useRouter } from 'next/router'
import { IoMdEye , IoMdEyeOff , IoMdArrowDropdown } from "react-icons/io";
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
import { server } from 'config';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import { ToastContainer, toast } from 'react-toastify';

function SignIn(){
    const { register, watch, handleSubmit, formState: { errors }, setValue, control } = useForm({mode: "onBlur"}); 
    const router = useRouter();
    
    //const notify = () => toast("Wow so easy!");


    const [startDate, setStartDate] = useState();
    console.log(startDate)
    const [phonenum, setphonenum] = useState()

    //Password Hide & Show Toggle
    const [pwd, setPwd] = useState('');
    const [isRevealPwd, setIsRevealPwd] = useState(false);

    const [conpwd, setconPwd] = useState('');
    const [isRevealconPwd, setIsRevealconPwd] = useState(false);

    //Match Password
    const password = useRef({});
    password.current = watch("password", "");

    //For Avtar
    const [img, setimg] = useState('avtar.png')
    //console.log(img)
    // const handler = (e) =>{
    //     let avtarimg = e.target.files;
    //     setimg(avtarimg);
    //     //console.log(avtarimg)
    // }
    
    //API call
    const onSubmit= async(result) =>{
        //e.preventDefault();
        //console.log(result);
        //console.log(result.avtar[0].name)

        const res = await fetch(`${server}/api/admin/signin/`,{
            method: "POST",
            headers: { "Content-Type": "application/json",},
            body:JSON.stringify({role_id:result.role_id, username:result.username, password:result.password, email:result.email, PhoneNum:result.PhoneNum, dob:startDate, department:result.department, position:result.position, role:"User", status:"Active"}),
        })
        const data=await res.json()

        if(res.status==200)
        {
            toast.success('SignUp Successfully !', {
                position: "top-right",
                autoClose:5000,
                onClose: () => router.push("/login")
            });
            //router.push("/login");
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


                        <form method="POST" onSubmit={handleSubmit(onSubmit)} >
                            
                            {/*<div className="form-group">
                                <input type="file" name="avtar" onChange={(e)=>setimg(e.target.files)} {...register('avtar',  { required: "Please enter avtar" })} />
                                <div className="error-msg">{errors.avtar && <p>{errors.avtar.message}</p>}</div> 
                            </div>*/}

                            <div className="form-group">
                                <input type="hidden" className="form-control signup-input" name="role_id" value="2" {...register('role_id',  { required: "Please enter your name" })} />
                                <div className="error-msg">{errors.role_id && <p>{errors.role_id.message}</p>}</div>
                            </div>
                            <div className="form-group">
                                <input type="hidden" className="form-control signup-input" name="role" value="User" {...register('role',  { required: "Please enter your name", pattern: {value: /^[aA-zZ\s]+$/ , message: 'Only characters allow',} })} />
                                <div className="error-msg">{errors.role && <p>{errors.role.message}</p>}</div>
                            </div>
                            <div className="form-group">
                                <input type="hidden" className="form-control signup-input" name="status" value="Active" {...register('status',  { required: "Please enter your name", pattern: {value: /^[aA-zZ\s]+$/ , message: 'Only characters allow',} })} />
                                <div className="error-msg">{errors.status && <p>{errors.status.message}</p>}</div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="username" className='form-label label' >Name</label>
                                <input type="text" className="form-control signup-input" name="username" placeholder="enter your name" {...register('username',  { required: "Please enter your name", pattern: {value: /^[aA-zZ\s]+$/ , message: 'Only characters allow',} })} />
                                <div className="error-msg">{errors.username && <p>{errors.username.message}</p>}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className='form-label label' >Email</label>
                                <input type="text" className="form-control signup-input" name="email" placeholder="email@syndelltech.in" {...register('email', { required: 'Please enter your email', pattern: {value: /^[a-zA-Z0-9]+@+syndelltech+.+[A-z]$/ , message: 'Please enter a valid email ex:email@syndelltech.in',},} )} />
                                <div className="error-msg">{errors.email && <p>{errors.email.message}</p>}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="PhoneNum" className='form-label label' >Phone Number</label>
                                {/*<input type="text" className="form-control signup-input" name="PhoneNum" placeholder="Enter Your Phone Number" {...register('PhoneNum',  { required: "Please enter your phone number", minLength: {value: 10, message: "enter least 10 digits" }, maxLength: {value: 12, message: "phone number is too large" }, pattern: {value: /^[0-9]+$/ , message: 'Only Numbers allow', } })}  />
                                <div className="error-msg">{errors.PhoneNum && <p>{errors.PhoneNum.message}</p>}</div>*/}
                                <Controller
                                    name="PhoneNum"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { onChange, value } }) => (
                                        <PhoneInput
                                            className="form-control signup-input"
                                            {...register('PhoneNum',  { required: "Please enter your phone number", message: 'Only Numbers allow', })} 
                                            defaultCountry={"IN"}
                                            maxLength={11}
                                            placeholder="enter phone number"
                                            value={phonenum}
                                            onChange={setphonenum}
                                        />
                                    )}
                                />
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

                                {/*<div className="error-msg">{errors.dob && <p>{errors.dob.message}</p>}</div>
                                {/*<input type="text" className="form-control signup-input" name="dob" {...register('dob',  { required: "Please enter your DOB", pattern: {value: /^[0-9]+$/ , message: 'Only Numbers allow',} })}  />
                                <div className="error-msg">{errors.dob && <p>{errors.dob.message}</p>}</div>*/}
                            </div>

                            <div className="form-group">
                                <label htmlFor="password" className='form-label label' >Password</label>
                                <input type={isRevealPwd ? 'text' : 'password'} name="password" placeholder="enter your password" className="form-control signup-input" {...register('password', { required: "Please enter your password",minLength: {value: 8, message: "Password must have at least 8 characters" }, pattern: {value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, message: 'must include lower, upper, number, and special chars',} })}  />
                                <span className='icon-eyes' onClick={() => setIsRevealPwd((prevState) => !prevState)} >{isRevealPwd ? <IoMdEyeOff /> : <IoMdEye/>}</span>
                                <div className="error-msg">{errors.password && <p>{errors.password.message}</p>}</div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirm-pwd" className='form-label label'>Confirm Password</label>
                                <input type={isRevealconPwd ? 'text' : 'password'} className="form-control signup-input" placeholder="confirm your password" {...register('confirmPwd', {  validate: value =>value === password.current || "The passwords do not match" })}  />
                                <a><span className='icon-eyes' onClick={() => setIsRevealconPwd((prevState) => !prevState)}>{isRevealconPwd ? <IoMdEyeOff /> : <IoMdEye/>}</span></a>
                                <div className="error-msg">{errors.confirmPwd && <p>{errors.confirmPwd.message}</p>}</div>
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

                            <div className="form-group">
                                <label htmlFor="position" className='form-label label' >Position</label><br/>
                                <select name="position" id="position" className="form-control signup-input" {...register('position', {required: "Please enter your department" ,message:'Please select atleast one option', })}>
                                    <option value="">Select Your Position</option>
                                    {/*<option value="Senior">Senior</option>
                                    <option value="Junior">Junior</option>
                                    <option value="Team Lead">Team Lead</option>*/}
                                    <option value="Junior HR">Junior HR</option>
                                    <option value="Junior UI & UX">Junior UI & UX</option>
                                    <option value="Junior Web development">Junior Web development</option>
                                    <option value="Junior Content writer">Junior Content writer</option>
                                    <option value="Junior Project manager">Junior Project manager</option>
                                    <option value="Junior Mobile App developer">Junior Mobile App developer</option>
                                    <option value="Junior SEO">Junior SEO</option>
                                    <option value="Senior HR">Senior HR</option>
                                    <option value="Senior UI & UX">Senior UI & UX</option>
                                    <option value="Senior Web development">Senior Web development</option>
                                    <option value="Senior Content writer">Senior Content writer</option>
                                    <option value="Senior Project manager">Senior Project manager</option>
                                    <option value="Senior Mobile App developer">Senior Mobile App developer</option>
                                    <option value="Senior SEO">Senior SEO</option>
                                </select>
                                <span className='icon-eyes'><IoMdArrowDropdown /></span>
                                <div className="error-msg">{errors.position && <p>{errors.position.message}</p>}</div>
                            </div>


                            <div className='login-btn'>
                                <button type="submit" className="login-create-acc-btn" >Create Account</button>
                            </div>  
                            <div className='login-text'>
                                <p>Already have an Account ? <a href='/login'><span className='signup-text-login'>Login</span></a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <ToastContainer />

        </>
    )
} 

export default SignIn