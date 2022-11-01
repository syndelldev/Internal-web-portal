import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { makeStyles } from "@material-ui/core/styles";
import { IoMdArrowDropdown } from "react-icons/io";
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

export async function getServerSideProps(context){
    const id = context.params.userdetailid;
    const res = await fetch(`${server}/api/admin/${id}`)
    const data = await res.json()
    //console.log(data)

    return { props: {data}, }
}

function UserById(data){
    const useStyles = makeStyles(styles);
    const classes = useStyles();

    const [startDate, setStartDate] = useState();
    const router = useRouter();

    const user = data.data[0];
    //console.log(user)

    const [userdata, setuserdata] = useState({
      role_id:"",
      username: "",
      password: "",
      email: "",
      mobile_no: "",
      //dob: "",
      department: "",
      position: "",
      status: "",
      role: ""
    });
    //console.log(userdata); 

    useEffect(()=>{
      setuserdata(user);
    },[data])
    
    const handleChange = ({ target: { name, value } }) =>{
      setuserdata({ ...userdata, [name]: value });
    }
    // const handleChange = (e) =>{
    //   const value = e.target.value;
    //   console.log('value', value)
    //   setuserdata({...userdata, [e.target.name]:value })
    // }

    console.log(userdata);
    const onSubmit = async (e) =>{
        e.preventDefault();

        let data = await axios.put(`${server}/api/admin/${user.id}`, userdata);
        console.log(data)
        console.log(userdata)
        if(data) 
        toast.success('User Updated Successfully! 🎉', {
          position: "top-right",
          autoClose:5000,
          onClose: () => router.push("/admin/userdetail")
        });
        //router.push("/admin/userdetail")

        // setuserdata({
        //   role_id:"",
        //   username:"",
        //   password:"",
        //   email:"",
        //   mobile_no:"",
        //   department:"",
        //   position:"",
        //   status:"",
        //   role:""
        // })
    }
    return(
        <div>
          <ToastContainer />
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
            <form onSubmit={onSubmit}>              
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Create User Profile</h4>
                    <p className={classes.cardCategoryWhite}>Complete your profile</p>
                </CardHeader>
                  <CardBody><br/>

                    <GridContainer>  
                        <GridItem xs={12} sm={12} md={12}>
                          <div className="form-group">
                            <input type="hidden" className="form-control signup-input" name="role_id" placeholder="enter your email" value={userdata.role_id} onChange={handleChange}  />
                          </div> 
                        </GridItem>
                      </GridContainer><br/>

                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <div className="form-group">
                            <input type="text" className="form-control signup-input" name="username" placeholder="enter your name" value={userdata.username} onChange={handleChange} />
                          </div> 
                        </GridItem>
                      </GridContainer><br/>
                      
                      <GridContainer>  
                        <GridItem xs={12} sm={12} md={12}>
                          <div className="form-group">
                            <input type="text" className="form-control signup-input" name="email" placeholder="enter your email" value={userdata.email} onChange={handleChange} autoComplete="off"  />
                          </div> 
                        </GridItem>
                      </GridContainer><br/>

                      <GridContainer>  
                        <GridItem xs={12} sm={12} md={12}>
                          <div className="form-group">
                            <input type="password" className="form-control signup-input" name="password" placeholder="enter your password" value={userdata.password} onChange={handleChange} autoComplete="off"  />
                          </div> 
                        </GridItem>
                        {/*<GridItem xs={12} sm={12} md={6}>
                          <div className="form-group">
                            <DatePicker
                              isClearable
                              name="dob"
                              
                              value={userdata.dob}
                              autoComplete="off"
                              className={"form-control"}
                              selected={startDate}
                              onChange={val => {
                                setStartDate(val);
                                //setValue("start", val);
                              }}
                              dateFormat="MM-dd-yyyy"
                            />
                            </div>
                          </GridItem>*/}
                      </GridContainer><br/>

                      <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                          <div className="form-group">
                            <input type="text" className="form-control signup-input" name="mobile_no" placeholder="enter your Mobile number" value={userdata.mobile_no} onChange={handleChange} autoComplete="off"  />
                            
                          </div> 
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <div className="form-group">
                            <select name="department" id="Department" value={userdata.department} onChange={handleChange} autoComplete="off" className="form-control signup-input" >
                              <option value="" >enter your department</option>
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
                            {/*<input type="text" className="form-control signup-input" name="position" placeholder="enter your position" value={userdata.position} onChange={handleChange} autoComplete="off"  />*/}
                            <select name="position" id="position" className="form-control signup-input" value={userdata.position} onChange={handleChange}  >
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
                            <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                          </div> 
                        </GridItem>
                      </GridContainer><br/>
                      
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                          <div className="form-group">
                            <select name="status" id="Status" className="form-control signup-input"  value={userdata.status} onChange={handleChange} autoComplete="off"   >
                              <option value="">enter your status</option>
                              <option value="Active">Active</option>
                              <option value="Deactive">Deactive</option>
                            </select>
                            <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                          </div> 
                        </GridItem>
                      
                        <GridItem xs={12} sm={12} md={6}>
                          <div className="form-group">
                            <select name="role" id="Role" className="form-control signup-input" value={userdata.role} onChange={handleChange} autoComplete="off" >
                              <option value="">enter your role</option>
                              <option value="User">User</option>
                              <option value="Admin">Admin</option>
                            </select>
                            <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                          </div> 
                        </GridItem>
                      </GridContainer>
                    </CardBody>

                    <CardFooter>
                        <Button color="primary" type="submit">Update User</Button>
                    </CardFooter>
                </Card>
            </form>
        </GridItem>
      </GridContainer>
    </div>
    )
}

UserById.layout = Admin;

export default UserById;