import React from "react";
import { useState } from "react";
import { useRouter } from 'next/router'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { IoMdArrowDropdown } from "react-icons/io";
import { useForm, Controller  } from 'react-hook-form';
import { server } from 'config';
import avatar from "assets/img/faces/marc.jpg";
import DatePicker from "react-datepicker";
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';


const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

function AddUser() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { register,  watch, handleSubmit, formState: { errors }, setValue, control } = useForm({mode: "onBlur"}); 
  const [startDate, setStartDate] = useState();
  const router = useRouter();

  const [phonenum, setphonenum] = useState()

  const onSubmit = async (result) =>{
    
    console.log(result);
    let addUser = axios.post(`${server}/api/admin/`, {
      role_id:result.role_id, username:result.name, password:result.password, email:result.email, PhoneNum:result.PhoneNum, /*DOB:startDate,*/ department:result.department, position:result.position, status:result.status, role:result.role 
    })
    toast.success('User Created Successfully! 🎉', {
      position: "top-right",
      autoClose:5000,
      onClose: () => router.push("/admin/userdetail")
    });
    //router.push("/admin/userdetail");

    // const res = await fetch(`${server}/api/admin/adduser/`,{
    //   method: "POST",
    //   headers: { "Content-Type": "application/json",},
    //   body:JSON.stringify({role_id:result.role_id, username:result.name, password:result.password, email:result.email, PhoneNum:result.PhoneNum, DOB:startDate, department:result.department, position:result.position, status:result.status, role:result.role }),
    // })
    // const data=await res.json()
    // console.log(data)
    // if(res.status==200)
    // {
    //   //alert("sucess")
    //   router.push("/admin/userdetail");
    // }
    // else
    // {
    //   //alert("Fail")
    // }
    
  }
  return (
    <div>
      <ToastContainer />
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
            <form onSubmit={handleSubmit(onSubmit)}>              
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite} class="usertitle">Create User Profile</h4>
                    <p className={classes.cardCategoryWhite} class="usersubtitle">Complete your profile</p>
                </CardHeader>
                  <CardBody><br/>
                    <GridContainer>  
                        <GridItem xs={12} sm={12} md={12}>
                          <div className="form-group">
                            <input type="hidden" className="form-control signup-input" placeholder="role_id" value={2} {...register('role_id', { required: 'Please enter your role_id'} )} />
                            <div className="error-msg">{errors.role_id && <p>{errors.role_id.message}</p>}</div>
                          </div> 
                        </GridItem>
                      </GridContainer><br/>
                    <GridContainer>
                        {/*<GridItem xs={12} sm={12} md={5}>
                        <CustomInput
                            labelText="Company (disabled)"
                            id="company-disabled"
                            formControlProps={{
                            fullWidth: true,
                            }}
                            inputProps={{
                            disabled: true,
                            }}
                        />
                        </GridItem>*/}
                             
                        <GridItem xs={12} sm={12} md={12}>
                          <div className="form-group">
                            <input type="text" className="form-control signup-input" placeholder="Username" {...register('name',  { required: "Please enter your Name", pattern: {value: /^[aA-zZ\s]+$/ , message: 'Only characters allow',} })} />
                            <div className="error-msg">{errors.name && <p>{errors.name.message}</p>}</div>
                          </div> 
                          <div className="error-msg">{errors.username && <p>{errors.username.message}</p>}</div>
                        </GridItem>
                      </GridContainer><br/>
                      
                      <GridContainer>  
                        <GridItem xs={12} sm={12} md={12}>
                          <div className="form-group">
                            <input type="text" className="form-control signup-input" placeholder="Email" {...register('email', { required: 'Please enter your email', pattern: {value: /^[a-zA-Z0-9]+@+syndelltech+.+[A-z]$/ , message: 'Please enter a valid email ex:email@syndelltech.in',},} )} />
                            <div className="error-msg">{errors.email && <p>{errors.email.message}</p>}</div>
                          </div> 
                        </GridItem>
                      </GridContainer><br/>

                      <GridContainer>  
                        <GridItem xs={12} sm={12} md={12}>
                          <div className="form-group">
                            <input type="password" className="form-control signup-input" placeholder="Password" {...register('password', { required: "You must specify a password",minLength: {value: 8, message: "Password must have at least 8 characters" }, pattern: {value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, message: 'must include lower, upper, number, and special chars',} })}  />
                            <div className="error-msg">{errors.password && <p>{errors.password.message}</p>}</div>
                          </div> 
                        </GridItem>
                        {/*<GridItem xs={12} sm={12} md={6}>
                          <div className="form-group">
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
                          </div> 
                        </GridItem>*/}
                      </GridContainer><br/>

                      <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                          <div className="form-group">
                            {/*<input type="text" className="form-control signup-input" placeholder="Mobile No" {...register('mobile_num',  { required: "Please enter your Mobile Num", pattern: {value: /^[0-9]+$/ , message: 'Only characters Numbers allow',} })} />
                            <div className="error-msg">{errors.mobile_num && <p>{errors.mobile_num.message}</p>}</div>*/}
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
                                placeholder="Phone Number"
                                value={phonenum}
                                onChange={setphonenum}
                              />
                              )}
                            />
                          </div> 
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <div className="form-group">
                            {/*<input type="text" className="form-control signup-input" placeholder="Department" {...register('department',  { required: "Please enter your Department", pattern: {value: /^[aA-zZ\s]+$/ , message: 'Only characters allow',} })} />
                            <div className="error-msg">{errors.department && <p>{errors.department.message}</p>}</div>*/}
                            <select name="Department" id="Department" className="form-control signup-input" {...register('department', {required:true ,message:'Please select atleast one option', })}>
                              <option value="">Select Your Department...</option>
                              <option value="HR">HR</option>
                              <option value="UI & UX">UI & UX</option>
                              <option value="Web Developer">Web Developer</option>
                              <option value="Content Writer">Content Writer</option>
                              <option value="Project Manager">Project Manager</option>
                              <option value="Mobile App Developer">Mobile App Developer</option>
                              <option value="SEO">SEO</option>
                            </select>
                            <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                            <div className="error-msg">{errors.department && <p>{errors.department.message}</p>}</div>
                          </div> 
                        </GridItem>
                      </GridContainer><br/>

                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          {/*<div className="form-group">
                            <input type="text" className="form-control signup-input" placeholder="Position" {...register('position',  { required: "Please enter your Position", pattern: {value: /^[aA-zZ\s]+$/ , message: 'Only characters allow',} })} />
                            <div className="error-msg">{errors.position && <p>{errors.position.message}</p>}</div>
                          </div>*/} 

                          <div className="form-group">
                            <select name="position" id="position" className="form-control signup-input" {...register('position', {required: "Please enter your department" ,message:'Please select atleast one option', })}>
                              <option value="">Select Your Position</option>
                              <option value="Jr. HR">Jr. HR</option>
                              <option value="Jr. UI & UX">Jr. UI & UX</option>
                              <option value="Jr. Web Development">Jr. Web Developer</option>
                              <option value="Jr. Content Writer">Jr. Content Writer</option>
                              <option value="Jr. Project Manager">Jr. Project Manager</option>
                              <option value="Jr. Mobile App Developer">Jr. Mobile App Developer</option>
                              <option value="Jr. SEO">Jr. SEO</option>
                              <option value="Sr. HR">Sr. HR</option>
                              <option value="Sr. UI & UX">Sr. UI & UX</option>
                              <option value="Sr. Web Developer">Sr. Web Developer</option>
                              <option value="Sr. Content Writer">Sr. Content Writer</option>
                              <option value="Sr. Project Manager">Sr. Project Manager</option>
                              <option value="Sr. Mobile App Developer">Sr. Mobile App Developer</option>
                              <option value="Sr. SEO">Sr. SEO</option>
                            </select>
                            <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                            <div className="error-msg">{errors.position && <p>{errors.position.message}</p>}</div>
                          </div>

                        </GridItem>
                      </GridContainer><br/>
                      
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                          <div className="form-group">
                            {/*<input type="text" className="form-control signup-input" placeholder="Status" {...register('status',  { required: "Please enter your Status", pattern: {value: /^[aA-zZ\s]+$/ , message: 'Only characters allow',} })} />
                            <div className="error-msg">{errors.status && <p>{errors.status.message}</p>}</div>*/}
                            <select name="Status" id="Status" className="form-control signup-input" {...register('status', {required:true ,message:'Please select atleast one option', })}>
                              <option value="Select...">Select Your Status...</option>
                              <option value="Active">Active</option>
                              <option value="Inactive">Inactive</option>
                            </select>
                            <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                            <div className="error-msg">{errors.status && <p>{errors.status.message}</p>}</div>
                          </div> 
                        </GridItem>
                      
                        <GridItem xs={12} sm={12} md={6}>
                          <div className="form-group">
                            {/*<input type="text" className="form-control signup-input" placeholder="Role" {...register('role',  { required: "Please enter your Role", pattern: {value: /^[aA-zZ\s]+$/ , message: 'Only characters allow',} })} />
                            <div className="error-msg">{errors.role && <p>{errors.role.message}</p>}</div>*/}
                            <select name="Role" id="Role" className="form-control signup-input" {...register('role', {required:true ,message:'Please select atleast one option', })}>
                              <option value="Select...">Select Your Role...</option>
                              <option value="User">User</option>
                              <option value="Admin">Admin</option>
                              <option value="Super User">Super User</option>
                            </select>
                            <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                            <div className="error-msg">{errors.role && <p>{errors.role.message}</p>}</div>
                          </div> 
                        </GridItem>
                      </GridContainer>
                    </CardBody>

                    <CardFooter>
                        <Button color="primary" type="submit">Add User</Button>
                    </CardFooter>
                </Card>
            </form>
        </GridItem>
        {/*<GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
              <h4 className={classes.cardTitle}>Alec Thompson</h4>
              <p className={classes.description}>
                Don{"'"}t be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p>
              <Button color="primary" round>
                Follow
              </Button>
            </CardBody>
          </Card>
        </GridItem>*/}
      </GridContainer>
    </div>
    
  );
}

AddUser.layout = Admin;

export default AddUser;
