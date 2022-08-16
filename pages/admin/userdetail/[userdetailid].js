import { useState } from "react";
import { useRouter } from 'next/router'
import { makeStyles } from "@material-ui/core/styles";
import { IoMdArrowDropdown } from "react-icons/io";
import { useForm  } from 'react-hook-form';
import { server } from 'config';

import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Admin from "layouts/Admin.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import avatar from "assets/img/faces/marc.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

export async function getServerSideProps(context){
    const id = context.params.userdetailid;
    const res = await fetch(`http://localhost:3000/api/admin/${id}`)
    const data = await res.json()
    console.log(data)

    return { props: {data}, }
}

function UserById(data){
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const { register,  watch, handleSubmit, formState: { errors }, setValue } = useForm(); 
    const [startDate, setStartDate] = useState();
    const router = useRouter();

    const user = data.data[0];
    //console.log(user)

    const onSubmit = async (result) =>{
        console.log(result)

        const res = await fetch(`${server}/api/admin/adduser/`,{
            method: "PUT",
            headers: { "Content-Type": "application/json",},
            body:JSON.stringify({username:result.name, password:result.password, email:result.email, PhoneNum:result.mobile_num, DOB:startDate, department:result.department, position:result.position, status:result.status, role:result.role }),
          })
          const data=await res.json()

    }
    return(
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
                            {user.name} 
                        <GridItem xs={12} sm={12} md={12}>
                          <div className="form-group">
                            <input type="text" className="form-control signup-input" placeholder={user.username}  />
                          </div> 
                        </GridItem>
                      </GridContainer><br/>
                      
                      <GridContainer>  
                        <GridItem xs={12} sm={12} md={12}>
                          <div className="form-group">
                            <input type="text" className="form-control signup-input" placeholder={user.email} />
                          </div> 
                        </GridItem>
                      </GridContainer><br/>

                      <GridContainer>  
                        <GridItem xs={12} sm={12} md={6}>
                          <div className="form-group">
                            <input type="password" className="form-control signup-input" placeholder={user.password} />
                          </div> 
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
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
                            {/*<input type="text" className="form-control signup-input" placeholder="Date Of Birth" {...register('dob',  { required: "Please enter your DOB", pattern: {value: /^[0-9]+$/ , message: 'Only Numbers allow',} })}   />
                            <div className="error-msg">{errors.dob && <p>{errors.dob.message}</p>}</div>*/}
                          </div> 
                        </GridItem>
                      </GridContainer><br/>

                      <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                          <div className="form-group">
                            <input type="text" className="form-control signup-input" placeholder={user.mobile_no} />
                            
                          </div> 
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <div className="form-group">
                            {/*<input type="text" className="form-control signup-input" placeholder="Department" {...register('department',  { required: "Please enter your Department", pattern: {value: /^[aA-zZ\s]+$/ , message: 'Only characters allow',} })} />
                            <div className="error-msg">{errors.department && <p>{errors.department.message}</p>}</div>*/}
                            <select name="Department" id="Department" className="form-control signup-input" >
                              <option value="">{user.department}</option>
                              <option value="HR">HR</option>
                              <option value="UI & UX">UI & UX</option>
                              <option value="Web development">Web development</option>
                              <option value="Content writer">Content writer</option>
                              <option value="Project manager">Project manager</option>
                              <option value="Mobile App developer">Mobile App developer</option>
                              <option value="SEO">SEO</option>
                            </select>
                            <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                          </div> 
                        </GridItem>
                      </GridContainer><br/>

                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <div className="form-group">
                            <input type="text" className="form-control signup-input" placeholder={user.position} />
                          </div> 
                        </GridItem>
                      </GridContainer><br/>
                      
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                          <div className="form-group">
                            {/*<input type="text" className="form-control signup-input" placeholder="Status" {...register('status',  { required: "Please enter your Status", pattern: {value: /^[aA-zZ\s]+$/ , message: 'Only characters allow',} })} />
                            <div className="error-msg">{errors.status && <p>{errors.status.message}</p>}</div>*/}
                            <select name="Status" id="Status" className="form-control signup-input" >
                              <option value="">{user.status}</option>
                              <option value="Active">Active</option>
                              <option value="Deactive">Deactive</option>
                            </select>
                            <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                          </div> 
                        </GridItem>
                      
                        <GridItem xs={12} sm={12} md={6}>
                          <div className="form-group">
                            {/*<input type="text" className="form-control signup-input" placeholder="Role" {...register('role',  { required: "Please enter your Role", pattern: {value: /^[aA-zZ\s]+$/ , message: 'Only characters allow',} })} />
                            <div className="error-msg">{errors.role && <p>{errors.role.message}</p>}</div>*/}
                            <select name="Role" id="Role" className="form-control signup-input" >
                              <option value="">{user.role}</option>
                              <option value="User">User</option>
                              <option value="Admin">Admin</option>
                            </select>
                            <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
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
    )
}

UserById.layout = Admin;

export default UserById;