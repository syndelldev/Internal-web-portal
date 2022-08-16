import React from "react";
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
import { IoMdEye , IoMdEyeOff , IoMdArrowDropdown } from "react-icons/io";
import { useForm  } from 'react-hook-form';
import { server } from 'config';
import avatar from "assets/img/faces/marc.jpg";

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
  const { register,  watch, handleSubmit, formState: { errors }, control } = useForm(); 

  const onSubmit = async (result) =>{
    console.log(result.name);console.log(result.email);console.log(result.password);
    console.log(result.position);console.log(result.mobile_num);console.log(result.department);
    console.log(result.role);console.log(result.status);console.log(result.dob);

    const res = await fetch(`${server}/api/admin/adduser/`,{
      method: "POST",
      headers: { "Content-Type": "application/json",},
      body:JSON.stringify({username:result.name, password:result.password, email:result.email, PhoneNum:result.mobile_num, DOB:result.dob, department:result.department, status:result.status, position:result.position, role:result.role }),
    })
    const data=await res.json()
    console.log(data)
  }
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
            <form onSubmit={handleSubmit(onSubmit)}>              
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Create User Profile</h4>
                    <p className={classes.cardCategoryWhite}>Complete your profile</p>
                </CardHeader>
                  <CardBody><br/>
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
                            <input type="text" className="form-control signup-input" placeholder="Email" {...register('email', { required: 'Email is required', pattern: {value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: 'Please enter a valid email',},} )}  />
                            <div className="error-msg">{errors.email && <p>{errors.email.message}</p>}</div>
                          </div> 
                        </GridItem>
                      </GridContainer><br/>

                      <GridContainer>  
                        <GridItem xs={12} sm={12} md={6}>
                          <div className="form-group">
                            <input type="password" className="form-control signup-input" placeholder="Password" {...register('password', { required: "You must specify a password",minLength: {value: 8, message: "Password must have at least 8 characters" }, pattern: {value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, message: 'must include lower, upper, number, and special chars',} })}  />
                            <div className="error-msg">{errors.password && <p>{errors.password.message}</p>}</div>
                          </div> 
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <div className="form-group">
                            <input type="text" className="form-control signup-input" placeholder="Date Of Birth" {...register('dob',  { required: "Please enter your DOB", pattern: {value: /^[0-9]+$/ , message: 'Only Numbers allow',} })}   />
                            <div className="error-msg">{errors.dob && <p>{errors.dob.message}</p>}</div>
                          </div> 
                        </GridItem>
                      </GridContainer><br/>

                      <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                          <div className="form-group">
                            <input type="text" className="form-control signup-input" placeholder="Mobile No" {...register('mobile_num',  { required: "Please enter your Mobile Num", pattern: {value: /^[0-9]+$/ , message: 'Only characters Numbers allow',} })} />
                            <div className="error-msg">{errors.mobile_num && <p>{errors.mobile_num.message}</p>}</div>
                            
                          </div> 
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <div className="form-group">
                            {/*<input type="text" className="form-control signup-input" placeholder="Department" {...register('department',  { required: "Please enter your Department", pattern: {value: /^[aA-zZ\s]+$/ , message: 'Only characters allow',} })} />
                            <div className="error-msg">{errors.department && <p>{errors.department.message}</p>}</div>*/}
                            <select name="Department" id="Department" className="form-control signup-input" {...register('department', {required:true ,message:'Please select atleast one option', })}>
                              <option value="Select...">Select Your Department...</option>
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
                        </GridItem>
                      </GridContainer><br/>

                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <div className="form-group">
                            <input type="text" className="form-control signup-input" placeholder="Position" {...register('position',  { required: "Please enter your Position", pattern: {value: /^[aA-zZ\s]+$/ , message: 'Only characters allow',} })} />
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
                              <option value="Deactive">Deactive</option>
                            </select>
                            <span className='icon-eyes'><IoMdArrowDropdown /></span>
                            <div className="error-msg">{errors.status && <p>{errors.status.message}</p>}</div>
                          </div> 
                        </GridItem>
                      
                        <GridItem xs={12} sm={12} md={6}>
                          <div className="form-group">
                            {/*<input type="text" className="form-control signup-input" placeholder="Role" {...register('role',  { required: "Please enter your Role", pattern: {value: /^[aA-zZ\s]+$/ , message: 'Only characters allow',} })} />
                            <div className="error-msg">{errors.role && <p>{errors.role.message}</p>}</div>*/}
                            <select name="Role" id="Role" className="form-control signup-input" {...register('role', {required:true ,message:'Please select atleast one option', })}>
                              <option value="Select...">Select Your Role...</option>
                              <option value="user">user</option>
                              <option value="admin">admin</option>
                            </select>
                            <span className='icon-eyes'><IoMdArrowDropdown /></span>
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
