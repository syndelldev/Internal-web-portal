import React, { useEffect } from "react";
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
import { useForm  } from 'react-hook-form';
import { server } from 'config';
import avatar from "assets/img/faces/marc.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MultiSelect } from "react-multi-select-component";


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


 export async function getServerSideProps(){
  const res = await fetch(`${server}/api/admin`)
  const User_name = await res.json();
  // console.log(User_name);

  return{ props: {User_name} }
}

function AddUser({ User_name }) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { register,  watch, handleSubmit, formState: { errors }, setValue } = useForm(); 
  const [startDate, setStartDate] = useState();
  const router = useRouter();

  const onSubmit = async (result) =>{
    
    console.log(result);
    
    const res = await fetch(`${server}/api/project/addproject`,{
      method: "POST",
      headers: { "Content-Type": "application/json",},
      body:JSON.stringify({project_person:allSelectedUser, project_title:result.project_title, project_description:result.project_description, project_language:result.project_language, project_created_by:result.project_created_by, project_comment:result.project_comment, project_priority:result.project_priority }),
    })
    const data=await res.json()
    console.log(data)
    if(res.status==200)
    {
      alert("success");
      // router.push("/admin/userdetail");
    }
    else
    {
      alert("Fail");
    }
  }

const [uoptions, setOptions] = useState([]);

useEffect(() =>{
  const u_data = async() =>{

    const getUsername = [];

    User_name.map((user)=>{
      getUsername.push( {'label' :user.username, 'value' :user.username} );
    });
    setOptions(getUsername);
  }
  u_data();
},[]);

const [selected, setSelected] = useState([]);
const allSelectedUser = [];
for(var i=0; i<selected.length; i++){
  allSelectedUser.push(selected[i].value);
}


  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
            <form onSubmit={handleSubmit(onSubmit)}>              
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Create Project</h4>
                    <p className={classes.cardCategoryWhite}>Enter your new project details</p>
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
                            <input type="text" className="form-control signup-input" placeholder="Project Title" {...register('project_title',  { required: "Please enter project title", pattern: {value: /^[aA-zZ\s]+$/ , message: 'Only characters allow',} })} />
                            <div className="error-msg">{errors.name && <p>{errors.name.message}</p>}</div>
                          </div> 
                          <div className="error-msg">{errors.username && <p>{errors.username.message}</p>}</div>
                        </GridItem>
                      </GridContainer><br/>
                      
                      <GridContainer>  
                        <GridItem xs={12} sm={12} md={12}>
                          <div className="form-group">
                            <textarea className="form-control signup-input" placeholder="Project Description" {...register('project_description', { required: 'Description is required', } )}  />
                            <div className="error-msg">{errors.email && <p>{errors.email.message}</p>}</div>
                          </div> 
                        </GridItem>
                      </GridContainer><br/>

                      <GridContainer>  
                        <GridItem xs={12} sm={12} md={6}>
                          <div className="form-group">
                            <input type="text" className="form-control signup-input" placeholder="Language" {...register('project_language', { required: "You must specify language", })}  />
                            <div className="error-msg">{errors.password && <p>{errors.password.message}</p>}</div>
                          </div> 
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <div className="form-group">
                            {/*<input type="text" className="form-control signup-input" placeholder="Department" {...register('department',  { required: "Please enter your Department", pattern: {value: /^[aA-zZ\s]+$/ , message: 'Only characters allow',} })} />
                            <div className="error-msg">{errors.department && <p>{errors.department.message}</p>}</div>*/}
                            <select name="Project_created_by" id="Project_created_by" className="form-control signup-input" {...register('project_created_by', {required:true ,message:'Please select atleast one option', })}>
                              <option value="">Created by</option>
                              <option value="HR">HR</option>
                              <option value="UI & UX">UI & UX</option>
                              <option value="Web development">Web development</option>
                              <option value="Content writer">Content writer</option>
                              <option value="Project manager">Project manager</option>
                              <option value="Mobile App developer">Mobile App developer</option>
                              <option value="SEO">SEO</option>
                            </select>
                            <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                            <div className="error-msg">{errors.department && <p>{errors.department.message}</p>}</div>
                          </div> 
                        </GridItem>
                      </GridContainer><br/>


                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <div className="form-group">
                            <textarea className="form-control signup-input" placeholder="Comment" {...register('project_comment')} />
                            <div className="error-msg">{errors.position && <p>{errors.position.message}</p>}</div>
                          </div> 
                        </GridItem>
                      </GridContainer><br/>
                      
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                          <div className="form-group">
                            {/*<input type="text" className="form-control signup-input" placeholder="Status" {...register('status',  { required: "Please enter your Status", pattern: {value: /^[aA-zZ\s]+$/ , message: 'Only characters allow',} })} />
                            <div className="error-msg">{errors.status && <p>{errors.status.message}</p>}</div>*/}
                            <select name="Status" id="Status" className="form-control signup-input" {...register('project_priority', {required:true ,message:'Please select atleast one option', })}>
                              <option value="Select...">Select Project Priority</option>
                              <option value="High">High</option>
                              <option value="Medium">Medium</option>
                              <option value="Low">Low</option>
                            </select>
                            <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                            <div className="error-msg">{errors.status && <p>{errors.status.message}</p>}</div>
                          </div> 
                        </GridItem>
                      
                        <GridItem xs={12} sm={12} md={6}>
                          <div className="form-group" {...register('project_person')}>
                         
                          <MultiSelect
                            options={uoptions}
                            value={selected}
                            onChange={setSelected}
                            labelledBy="Select"
                          />
                          
                            <div className="error-msg">{errors.role && <p>{errors.role.message}</p>}</div>
                          </div> 
                        </GridItem>
                      </GridContainer>
                    </CardBody>

                    <CardFooter>
                        <Button color="primary" type="submit">Add Project</Button>
                    </CardFooter>
                </Card>
            </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}

AddUser.layout = Admin;

export default AddUser;
