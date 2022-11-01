import React, { useRef, useState,useEffect } from "react";
import { useRouter } from 'next/router'
import { IoMdEye , IoMdEyeOff , IoMdArrowDropdown } from "react-icons/io";
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
import { server } from 'config';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import { ToastContainer, toast } from 'react-toastify';
import bcrypt from 'bcryptjs';
import axios from "axios";
import Multiselect from "multiselect-react-dropdown";

export async function getServerSideProps(context){

    const res = await fetch(`${server}/api/user/user_department`);
    const user_Department = await res.json();
    
    return{ props: {user_Department} }
}

function SignIn({ user_Department }){
    const { register, watch, handleSubmit, formState: { errors }, setValue, control } = useForm({mode: "onBlur"}); 
    const router = useRouter();
    
    const [u_Department, setDepartment] = useState([]);
    const [p_selected, setProject] = useState([]);
    useEffect(() =>{
        const u_data = async() =>{
      
          const getDepartment = [];    
          user_Department.map((department)=>{
            getDepartment.push( {'label': department.department_name , 'value': department.department_name} );
          });
          setDepartment(getDepartment);
        }
        u_data();
      },[]);

    const [u_Designation, setDesignation] = useState([]);
    const [user_Designation, set_uDesignation] = useState([]);

    const handleSelect = async(data) => {

        setProject(data);
        // fetch designation from selected department
        const designation = await axios.post(`${server}/api/user/user_designation`, { department: data });
        const d_Designation = designation.data;
        console.log(d_Designation);

        const getDesignation = [];    
        d_Designation.map((department)=>{
            getDesignation.push( {'label': department.designation_name , 'value': department.designation_name} );
        });
        setDesignation(getDesignation);
    }

    const [startDate, setStartDate] = useState();
    const [phonenum, setphonenum] = useState()

    //Password Hide & Show Toggle
    const [pwd, setPwd] = useState('');
    const [isRevealPwd, setIsRevealPwd] = useState(false);

    const [conpwd, setconPwd] = useState('');
    const [isRevealconPwd, setIsRevealconPwd] = useState(false);

    //Match Password
    const password = useRef({});
    password.current = watch("password", "");

    //API call
    const onSubmit= async(result) =>{

        const hashedPassword = bcrypt.hashSync(result.password, 10);
        console.log("department");
        console.log(p_selected);

        const res = await fetch(`${server}/api/admin/signin/`,{
            method: "POST",
            headers: { "Content-Type": "application/json",},
            body:JSON.stringify({role_id:result.role_id, username:result.username, password:hashedPassword, email:result.email, PhoneNum:result.PhoneNum, /*dob:startDate,*/ department:result.department, position:result.position, role:"User", status:"Active"}),
        })
        const data=await res.json()

        if(res.status==200)
        {
            toast.success('SignUp Successfully !', {
                position: "top-right",
                autoClose:1000,
                theme: "colored",
                hideProgressBar: true,
                onClose: () => router.push(`${server}/login`)
            });
            router.push("/login");
        }
        else
        {
            alert("Fail")
        }
    }
    return(
        <>
            <style global jsx>{`html, body,div#__next{background-color: #00155c; }`}</style>
            <section className='login-section'>
                <div className='container login-container'>
                    <div className='login-div'>
                        <h2 className='login-title'>Automation Tool Sign Up</h2>


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
                                <input type="text" className="form-control signup-input" name="username" placeholder="Enter your name" {...register('username',  { required: "Please enter your name", pattern: {value: /^[aA-zZ\s]+$/ , message: 'Only characters allow',} })} />
                                <div className="error-msg">{errors.username && <p>{errors.username.message}</p>}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className='form-label label' >Email</label>
                                <input type="text" className="form-control signup-input" name="email" placeholder="Email@syndelltech.in" {...register('email', { required: 'Please enter your email', pattern: {value: /^[a-zA-Z0-9+_.-]+@+syndelltech+.+[A-z]$/ , message: 'Please enter a valid email ex:email@syndelltech.in',},} )} />
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
                                            placeholder="Enter phone number"
                                            value={phonenum}
                                            onChange={setphonenum}
                                        />
                                    )}
                                />
                                <div className="error-msg">{errors.PhoneNum && <p>{errors.PhoneNum.message}</p>}</div>
                            </div>
                            {/*<div className="form-group">
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
                                <input type="text" className="form-control signup-input" name="dob" {...register('dob',  { required: "Please enter your DOB", pattern: {value: /^[0-9]+$/ , message: 'Only Numbers allow',} })}  />
                                <div className="error-msg">{errors.dob && <p>{errors.dob.message}</p>}</div>
                            </div>*/}

                            <div className="form-group">
                                <label htmlFor="password" className='form-label label' >Password</label>
                                <input type={isRevealPwd ? 'text' : 'password'} name="password" placeholder="Enter your password" className="form-control signup-input" {...register('password', { required: "Please enter your password",minLength: {value: 8, message: "Password must have at least 8 characters" }, pattern: {value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, message: 'must include lower, upper, number, and special chars',} })}  />
                                <span className='icon-eyes' onClick={() => setIsRevealPwd((prevState) => !prevState)} >{isRevealPwd ? <IoMdEyeOff /> : <IoMdEye/>}</span>
                                <div className="error-msg">{errors.password && <p>{errors.password.message}</p>}</div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirm-pwd" className='form-label label'>Confirm Password</label>
                                <input type={isRevealconPwd ? 'text' : 'password'} className="form-control signup-input" placeholder="Confirm your password" {...register('confirmPwd', {  validate: value =>value === password.current || "The passwords do not match" })}  />
                                <span className='icon-eyes' onClick={() => setIsRevealconPwd((prevState) => !prevState)}>{isRevealconPwd ? <IoMdEyeOff /> : <IoMdEye/>}</span>
                                <div className="error-msg">{errors.confirmPwd && <p>{errors.confirmPwd.message}</p>}</div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="Department" className='form-label label' >Department</label><br/>

                                <Multiselect
                                    displayValue="value"
                                    options={u_Department}
                                    value={p_selected}
                                    selectionLimit="1"
                                    onChange={handleSelect}
                                    onRemove={handleSelect}
                                    onSearch={function noRefCheck(){}}
                                    onSelect={handleSelect}
                                    placeholder="Select User Department"
                                    showArrow={true}
                                /><br />
                                
                                {/* <span className='icon-eyes'><IoMdArrowDropdown /></span> */}
                                <div className="error-msg">{errors.department && <p>{errors.department.message}</p>}</div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="position" className='form-label label' >Position</label><br/>
                                
                                <Multiselect
                                    displayValue="value"
                                    options={u_Designation}
                                    value={user_Designation}
                                    selectionLimit="1"
                                    onChange={set_uDesignation}
                                    onRemove={set_uDesignation}
                                    onSearch={function noRefCheck(){}}
                                    onSelect={set_uDesignation}
                                    placeholder="User Designation"
                                    showArrow={true}
                                /><br />

                                {/* <span className='icon-eyes'><IoMdArrowDropdown /></span> */}
                                <div className="error-msg">{errors.position && <p>{errors.position.message}</p>}</div>
                            </div>


                            <div className='login-btn'>
                                <button type="submit" className="login-create-acc-btn" >Create Account</button>
                            </div>  
                            <div className='login-text'>
                                <div><p>Already have an Account? </p></div>
                                <div><p><a href='/login'><span className='signup-text-login'>Login</span></a></p></div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <ToastContainer limit={1}/>

        </>
    )
} 

export default SignIn