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
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Popup from "reactjs-popup";
import AddUser from "../create_project";
import Multiselect from "multiselect-react-dropdown";
import '../../../../styles/globals.css';


const styles = {
  cardCategoryWhite: {
    color: "rgba(0,0,0,.62)",
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
  cardWhite: {
    color: "#000000",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    background: "#ADD8E6",
    float: "right",
  },
  img:{
    marginLeft: "auto",
    width: "40px",
  },
  popup:{
    // position: "fixed",
    width: "100%",
    height: "100%",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  link:{
    border: "1px solid #000000",
    color: "#000000",
    padding: "5px 10px",
  },
  close:{
    marginLeft: "auto",
    fontSize: "40px",
    paddingRight: "10px",
    cursor: "pointer",
  },
};

export async function getServerSideProps(context){
  const project_department = context.params.project_department;
  console.log(project_department);

  const res = await fetch(`${server}/api/project/project_department/${project_department}`);
  const project_details = await res.json();
  // console.log(project_details);
  const response = await fetch(`${server}/api/admin`)
  const User_name = await response.json();

  return{ props: {project_details, User_name} }
}

function AddProject({ project_details , User_name }) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  
  const deleteProject = async(id) =>{
    console.log('delete');
    console.log(id);

    const res = await fetch(`${server}/api/project/${id}`);
  }
  const { register,  watch, handleSubmit, formState: { errors }, setValue } = useForm(); 
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const router = useRouter();

  const onSubmit = async (result) =>{
    
    console.log("result");
    console.log(result);
    
    const res = await fetch(`${server}/api/project/addproject`,{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify({project_person:allSelectedUser, project_title:result.project_title, project_description:result.project_description, project_language:result.project_language, project_comment:result.project_comment, project_priority:result.project_priority, project_start: result.start , project_deadline: result.end }),
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

  return (
    <>
      {/* <Button type="submit" color="primary" className={classes.cardWhite}><a href='/admin/project_module/create_project' className={classes.cardWhite}>Create Project</a></Button><br/><br/> */}

      {/* <Popup trigger={<button>Trigger</button>} position="top">
        {close => (
          <div className={classes.popup}>
            Content here
            <a className="close" onClick={close}>
              &times;
            </a>
          </div>
        )}
      </Popup> */}

{/* create project form start */}

<GridContainer>
      <GridItem>

        <Popup trigger={<div className={classes.img}><button>Project</button></div>} modal>

        {close => (
    <div>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
          <form onSubmit={handleSubmit(onSubmit)}>              
          <Card>
              <CardHeader color="primary">
<GridContainer>
    <GridItem>
      <h4 className={classes.cardTitleWhite}>Create Project</h4>
      <p className={classes.cardCategoryWhite}>Enter your new project details</p>
    </GridItem>

    {/* <GridItem> */}
      <div className={classes.close}>
        <a onClick={close}>&times;</a>
      </div>
    {/* </GridItem> */}
</GridContainer>

              </CardHeader>
                <CardBody><br/>
                  <GridContainer>

                      <GridItem xs={12} sm={12} md={12}>                      
                        <div className="form-group">
                          <span>Project Title</span>
                          <input type="text" className="form-control signup-input" placeholder="Project Title" {...register('project_title',  { required: "Please enter project title"})} />
                          <div className="error-msg">{errors.project_title && <span>{errors.project_title.message}</span>}</div>
                        </div> 
                      </GridItem>
                    </GridContainer><br/>
                    
                    <GridContainer>  
                      <GridItem xs={12} sm={12} md={12}>
                        <div className="form-group">
                        <span>Project Description</span>
                          <textarea className="form-control signup-input" placeholder="Project Description" {...register('project_description', { required: 'Description is required', } )}  />
                          <div className="error-msg">{errors.project_description && <span>{errors.project_description.message}</span>}</div>
                        </div> 
                      </GridItem>
                    </GridContainer><br/>

                    <GridContainer>  
                      <GridItem xs={12} sm={12} md={12}>
                        <div className="form-group">
                        <span>Project Language</span>
                          <select name="Project_created_by" id="Project_created_by" className="form-control signup-input" {...register('project_language', {required:true ,message:'Please select atleast one option', })}>
                            <option value="">Select Language</option>
                            <option value="Wordpress">Wordpress</option>
                            <option value="Shopify">Shopify</option>
                            <option value="ReactJS">ReactJS</option>
                            <option value="Laravel">Laravel</option>
                            <option value="Android">Android</option>
                            <option value="Bubble">Bubble</option>
                          </select>
                          <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                          <div className="error-msg">{errors.project_language && <span>{errors.project_language.message}</span>}</div>
                        </div> 
                      </GridItem>
                    </GridContainer><br/>

                    <GridContainer>  
                      <GridItem xs={12} sm={12} md={6}>
                        <div className="form-group" {...register('project_start')}>
                        <span>Project Start Date</span>
                          <DatePicker
                            placeholderText="Start_Date : dd/mm/yyyy"
                            isClearable
                            name="datetime1"
                            className={"form-control"}
                            selected={startDate}
                            onChange={val => {
                              setStartDate(val);
                              setValue("start", val);
                            }}
                            dateFormat="dd-MM-yyyy"
                            minDate={new Date()}
                          />
                        <div className="error-msg">{errors.project_start && <span>{errors.project_start.message}</span>}</div>
                        </div> 
                      </GridItem>

                      <GridItem xs={12} sm={12} md={6}>
                        <div className="form-group" {...register('project_deadline')}>
                        <span>Project End Date</span>
                          <DatePicker
                            placeholderText="End_Date : dd/mm/yyyy"
                            isClearable
                            name="datetime1"
                            className={"form-control"}
                            selected={endDate}
                            onChange={val => {
                              setEndDate(val);
                              setValue("end", val);
                            }}
                            dateFormat="dd-MM-yyyy"
                            minDate={startDate}
                          />
                        <div className="error-msg">{errors.project_deadline && <span>{errors.project_deadline.message}</span>}</div>
                        </div> 
                      </GridItem>
                    </GridContainer><br/>

                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <div className="form-group">
                            {/*<input type="text" className="form-control signup-input" placeholder="Department" {...register('department',  { required: "Please enter your Department", pattern: {value: /^[aA-zZ\s]+$/ , message: 'Only characters allow',} })} />
                            <div className="error-msg">{errors.department && <p>{errors.department.message}</p>}</div>*/}
                          <span>Project Department</span>
                            <select name="Department" id="Department" className="form-control signup-input" {...register('project_department', {required:true ,message:'Please select atleast one option', })}>
                              <option value="">Select Your Department...</option>
                              <option value="HR">HR</option>
                              <option value="UI & UX">UI & UX</option>
                              <option value="Web development">Web development</option>
                              <option value="Content writer">Content writer</option>
                              <option value="Project manager">Project manager</option>
                              <option value="Mobile App developer">Mobile App developer</option>
                              <option value="SEO">SEO</option>
                            </select>
                            <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                            <div className="error-msg">{errors.project_department && <span>{errors.project_department.message}</span>}</div>
                          </div> 
                        </GridItem>
                      </GridContainer><br/>

                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <div className="form-group">
                        <span>Project Priority</span>
                          <select name="Status" id="Status" className="form-control signup-input" {...register('project_priority', {required:true ,message:'Please select atleast one option', })}>
                            <option value="Select...">Select Project Priority</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                          </select>
                          <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                          <div className="error-msg">{errors.project_priority && <span>{errors.project_priority.message}</span>}</div>
                        </div> 
                      </GridItem>
                    
                      <GridItem xs={12} sm={12} md={6}>
                        <div className="form-group" {...register('project_person')}>
                       
                        <span>Project Members</span>
                        <Multiselect
                        displayValue="value"
                          options={uoptions}
                          value={selected}
                          onChange={setSelected}
                          // onKeyPressFn={function noRefCheck(){}}
                          onRemove={setSelected}
                          // onSearch={function noRefCheck(){}}
                          onSelect={setSelected}
                          placeholder="Select Project Members"
                          showArrow={true}
                        />
                        
                          <div className="error-msg">{errors.project_person && <span>{errors.project_person.message}</span>}</div>
                        </div> 
                      </GridItem>
                    </GridContainer><br/>

                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <div className="form-group">
                        <span>Comments</span>
                          <textarea className="form-control signup-input" placeholder="Comment" {...register('project_comment')} />
                          <div className="error-msg">{errors.position && <span>{errors.position.message}</span>}</div>
                        </div> 
                      </GridItem>
                    </GridContainer><br/>
                    
                  </CardBody>

                  <CardFooter>
                      <Button color="primary" type="submit">Add Project</Button>
                      <Button className="button" onClick={() => { close(); }}> Cancel </Button>
                  </CardFooter>
              </Card>
          </form>
      </GridItem>
    </GridContainer>

  </div>
  
      )}
        </Popup>
{/* create project form end */}
</GridItem>

<GridItem>

<div class="departmet_dropdown">
  <button class="dropdown_button">Project Department</button>
      <div class="department-link">
        <a href={`${server}/admin/project_module`}>All</a>
        <a href={`${server}/admin/project_module/project_department/HR`}>HR</a>
        <a href={`${server}/admin/project_module/project_department/UI & UX`}>UI & UX</a>
        <a href={`${server}/admin/project_module/project_department/Web development`}>Web development</a>
        <a href={`${server}/admin/project_module/project_department/Content writer`}>Content writer</a>
        <a href={`${server}/admin/project_module/project_department/Project manager`}>Project manager</a>
        <a href={`${server}/admin/project_module/project_department/Mobile App developer`}>Mobile App developer</a>
        <a href={`${server}/admin/project_module/project_department/SEO`}>SEO</a>
      </div>
</div>

</GridItem>
</GridContainer>
    <GridContainer>
    {project_details.map((project)=>{

    if(project.project_status == "active"){

      var person = project.project_person.split(",");

    return(
    <>

        <GridItem xs={6} sm={6} md={4}>
            <form>
            <Card>
                <CardHeader color="primary">

                  <img src={`${server}/reactlogo.png`} className={classes.img}/>

                    <h4 className="projectTitle">{project.project_title}</h4>
                    <p className={classes.cardCategoryWhite}></p>
                </CardHeader>

                  <CardBody>
                  <GridContainer>
                      <GridItem>
                        <p className="projectLanguage">{project.project_language}</p>
                      </GridItem>

                      <GridItem>
                        <a href={`${server}/admin/project_module/${project.project_id}`}>Edit</a>
                        <button onClick={()=>deleteProject(project.project_id)}>Delete</button>
                      </GridItem>
                    </GridContainer>

                    <GridContainer>
                      <GridItem>
                        {person.map((data)=>{
                          return(
                            <>
                              <p className="projectPerson">{data}</p>
                            </>
                          )
                        })
                        }
                      </GridItem>
                    </GridContainer>

                    <GridContainer>
                      <GridItem>
                        <p className="projectPriority">Project Priority : {project.project_priority}</p>
                      </GridItem>
                      
                      <GridItem>
                        {/* <p className="projectDeadline">Project Deadline : {bDate[2]}/{bDate[1]}/{bDate[0]}</p> */}
                      </GridItem>
                    </GridContainer>
                    
                    </CardBody>

                    <CardFooter>
                    </CardFooter>
                </Card>
            </form>
        </GridItem>
      </>
            )}
        })
     }
</GridContainer>
    </>
  );
}

AddProject.layout = Admin;

export default AddProject;
