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
import Multiselect from "multiselect-react-dropdown";


const styles = {
  cardCategoryWhite: {
    color: "#000000",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#000000",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};


 export async function getServerSideProps(context){
    const id = context.params.update_project;
    console.log("id");
    console.log(id);

  const res = await fetch(`${server}/api/admin`)
  const User_name = await res.json();
  // console.log(User_name);

  const response = await fetch(`${server}/api/project/update/${id}`)
  const project_details = await response.json();
  // console.log(project_details);

  return{ props: { User_name , project_details } }
}

function AddUser({ User_name,project_details }) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { register,  watch, handleSubmit, formState: { errors }, setValue } = useForm();
  const [endDate, setEndDate] = useState();
  const router = useRouter();

  const onSubmit = async (result) =>{
    
    const allMember = [];
    for(var i=0; i<selected.length; i++){
          allMember.push(selected[i].value);
    }
    alert(allMember);
    alert(projectMember);

    if(allMember == ""){
      var members = projectMember;
    }else{
      var members = allMember;
    }

    const res = await fetch(`${server}/api/project/update_project`,{
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ project_id:uoption.project_id, project_person:members, project_title: uoption.project_title , project_description:uoption.project_description, project_language:uoption.project_language, project_comment:uoption.project_comment, project_priority:uoption.project_priority, project_start: uoption.start , project_deadline: uoption.end }),
    })

    const data=await res.json()
    console.log("data");
    console.log(data);

    if(res.status==200)
    {
      // alert("success");
      router.push(`${server}/admin/project_module`);
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


const [uoption, setOption] = useState({ 
  project_title: "",
  project_description: "",
  project_language: "",
  project_start: "",
  project_deadline: "",
  project_comment: "",
  project_priority: "",
  project_person: ""
});

useEffect(() =>{
  const u_data = async() =>{

    project_details.map((project)=>{
      setOption(project);
    });
  }
  u_data();
},[]);

const handleChange = ({ target: { name, value } }) =>{
  console.log("name");
  console.log([name]);

  setOption({ ...uoption, [name]: value });
}


const allSelectedMember = [];
const projectMember = (uoption.project_person).split(",");

for(var i=0; i<projectMember.length; i++){
  allSelectedMember.push({'label' :projectMember[i] , 'value' : projectMember[i]});
  allSelectedUser.push({'label' :projectMember[i] , 'value' : projectMember[i]});
}
// var date = (uoption.project_start).substring(0,10);
// console.log(date);

const [startDate, setStartDate] = useState();

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
            <form onSubmit={onSubmit}>              
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Edit Project</h4>
                    <p className={classes.cardCategoryWhite}>Update your project details</p>
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
                            <input type="text" className="form-control signup-input" name="project_title" value={uoption.project_title} onChange={handleChange} placeholder="Project Title" />
                          <div className="error-msg">{errors.name && <p>{errors.name.message}</p>}</div>
                          </div>
                          <div className="error-msg">{errors.username && <p>{errors.username.message}</p>}</div>
                        </GridItem>
                      </GridContainer><br/>
                      
                      <GridContainer>  
                        <GridItem xs={12} sm={12} md={12}>
                          <div className="form-group">
                            <textarea className="form-control signup-input" name="project_description" value={uoption.project_description} onChange={handleChange} placeholder="Project Description"   />
                            <div className="error-msg">{errors.email && <p>{errors.email.message}</p>}</div>
                          </div> 
                        </GridItem>
                      </GridContainer><br/>

                      <GridContainer>  
                        {/* <GridItem xs={12} sm={12} md={6}>
                          <div className="form-group">
                            <input type="text" className="form-control signup-input" placeholder="Language" {...register('project_language', { required: "You must specify language", })}  />
                            <div className="error-msg">{errors.password && <p>{errors.password.message}</p>}</div>
                          </div> 
                        </GridItem> */}
                        <GridItem xs={12} sm={12} md={12}>
                          <div className="form-group">
                            {/*<input type="text" className="form-control signup-input" placeholder="Department" {...register('department',  { required: "Please enter your Department", pattern: {value: /^[aA-zZ\s]+$/ , message: 'Only characters allow',} })} />
                            <div className="error-msg">{errors.department && <p>{errors.department.message}</p>}</div>*/}
                            <select name="project_language" id="Project_created_by" value={uoption.project_language} onChange={handleChange} className="form-control signup-input">
                              <option value="">Select Language</option>
                              <option value="Wordpress">Wordpress</option>
                              <option value="Shopify">Shopify</option>
                              <option value="ReactJS">ReactJS</option>
                              <option value="Laravel">Laravel</option>
                              <option value="Android">Android</option>
                              <option value="Bubble">Bubble</option>
                            </select>
                            <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                            <div className="error-msg">{errors.department && <p>{errors.department.message}</p>}</div>
                          </div> 
                        </GridItem>
                      </GridContainer><br/>

                      <GridContainer>  
                        {/* <GridItem xs={12} sm={12} md={6}>
                          <div className="form-group">
                            <input type="text" className="form-control signup-input" placeholder="Language" {...register('project_language', { required: "You must specify language", })}  />
                            <div className="error-msg">{errors.password && <p>{errors.password.message}</p>}</div>
                          </div> 
                        </GridItem> */}
                        <GridItem xs={12} sm={12} md={6}>
                          <div className="form-group">
                            <DatePicker
                              placeholderText="Start_Date : dd/mm/yyyy"
                              isClearable
                              name="project_start"
                              className={"form-control"}
                              selected={startDate}
                              onChange={val => {
                                setStartDate(val);
                                setValue("start", val);
                              }}
                              dateFormat="dd-MM-yyyy"
                              // minDate={new Date()}
                              value={uoption.project_start}
                            />
                          <div className="error-msg">{errors.dob && <p>{errors.dob.message}</p>}</div>
                          </div> 
                        </GridItem>

                        <GridItem xs={12} sm={12} md={6}>
                          <div className="form-group">
                            <DatePicker
                              placeholderText="End_Date : dd/mm/yyyy"
                              isClearable
                              name="project_deadline"
                              className={"form-control"}
                              selected={endDate}
                              onChange={val => {
                                setEndDate(val);
                                setValue("end", val);
                              }}
                              dateFormat="dd-MM-yyyy"
                              minDate={startDate}
                              value={uoption.project_deadline}
                            />
                          <div className="error-msg">{errors.dob && <p>{errors.dob.message}</p>}</div>
                          </div> 
                        </GridItem>
                      </GridContainer><br/>


                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <div className="form-group">
                            <textarea className="form-control signup-input" name="project_comment" value={uoption.project_comment} onChange={handleChange} placeholder="Comment" />
                            <div className="error-msg">{errors.position && <p>{errors.position.message}</p>}</div>
                          </div> 
                        </GridItem>
                      </GridContainer><br/>
                      
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                          <div className="form-group">
                            {/*<input type="text" className="form-control signup-input" placeholder="Status" {...register('status',  { required: "Please enter your Status", pattern: {value: /^[aA-zZ\s]+$/ , message: 'Only characters allow',} })} />
                            <div className="error-msg">{errors.status && <p>{errors.status.message}</p>}</div>*/}
                            <select name="project_priority" id="Status" value={uoption.project_priority} onChange={handleChange} className="form-control signup-input">
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
                          <div className="form-group">
                         
                          <Multiselect
                          displayValue="value"
                            options={uoptions}
                            selectedValues={allSelectedMember}
                            value={selected}
                            // onChange={setSelected}
                            onSelect={setSelected}
                            onRemove={setSelected}
                          />
                          
                            <div className="error-msg">{errors.role && <p>{errors.role.message}</p>}</div>
                          </div> 
                        </GridItem>
                      </GridContainer><br/>

                      {/* <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                          <div className="form-group">
                            <input type="file" className="form-control signup-input" placeholder="project_file" {...register('project_file')} />
                            {/* <div className="error-msg">{errors.status && <p>{errors.status.message}</p>}</div> */}
                            
                            {/* <div className="error-msg">{errors.status && <p>{errors.status.message}</p>}</div> */}
                          {/* </div> 
                        </GridItem>
                      
                        <GridItem xs={12} sm={12} md={6}>
                          <div className="form-group">
                            <div className="error-msg">{errors.role && <p>{errors.role.message}</p>}</div>
                          </div>
                        </GridItem>
                      </GridContainer> */}

                    </CardBody>

                    <CardFooter>
                        <Button color="primary" type="submit">Save</Button>
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
