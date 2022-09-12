import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from 'next/router';
import { makeStyles } from "@material-ui/core/styles";
import Admin from "layouts/Admin.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { IoMdArrowDropdown } from "react-icons/io";
import { useForm  } from 'react-hook-form';
import { bugs, website } from "variables/general.js";
import { server } from 'config';
// import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import Popup from "reactjs-popup";
import DatePicker from "react-datepicker";
import Multiselect from "multiselect-react-dropdown";
import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts.js";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from 'react-icons/md';

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
    paddingRight: "15px",
    cursor: "pointer",
  },
};

export async function getServerSideProps(){
  const res = await fetch(`${server}/api/project`);
  const project_details = await res.json();
  // console.log(project_details);
  const response = await fetch(`${server}/api/admin`)
  const User_name = await response.json();
  // console.log(User_name);
  const status = await fetch(`${server}/api/project/project_status`)
  const all_status = await status.json();
  console.log(all_status);

  return{ props: {project_details, User_name, all_status } }
}

function Dashboard( { project_details , User_name, all_status } ) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  
  const deleteProject = async(id) =>{
    console.log('delete');
    console.log(id);

    const res = await fetch(`${server}/api/project/${id}`);
    router.push(`${server}/admin/dashboard`);
  }

  const [uoption, setOption] = useState({ 
    project_title: "",
    project_description: "",
    project_department: "",
    project_language: "",
    project_start: "",
    project_deadline: "",
    project_priority: "",
    project_status: "",
    project_person: "",
    project_comment: ""
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

  const projectId = async(id) =>{
    console.log('update');
    console.log(id);

    const response = await fetch(`${server}/api/project/update/${id}`)
    const update_data = await response.json();
    console.log(update_data[0].project_id);

    // const res = await fetch(`${server}/api/project/update_project`,{
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ project_id:uoption.project_id, project_person:members, project_title: uoption.project_title , project_description:uoption.project_description, project_language:uoption.project_language, project_comment:uoption.project_comment, project_priority:uoption.project_priority, project_start: uoption.start , project_deadline: uoption.end }),
    // });
    // router.push(`${server}/admin/dashboard`);
  }

  const updateProject = async(id) =>{
    console.log('update');
    console.log(id);

    const res = await fetch(`${server}/api/project/update_project`,{
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ project_id:uoption.project_id, project_person:members, project_title: uoption.project_title , project_description:uoption.project_description, project_language:uoption.project_language, project_comment:uoption.project_comment, project_priority:uoption.project_priority, project_start: uoption.start , project_deadline: uoption.end }),
    });
    router.push(`${server}/admin/dashboard`);
  }


  const { register,  watch, handleSubmit, formState: { errors }, setValue } = useForm(); 
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const router = useRouter();

  const onSubmit = async (result) =>{
    
    console.log("result");
    console.log(selected);
    
    // const res = await fetch(`${server}/api/project/addproject`,{
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body:JSON.stringify({project_person:selected,project_department:result.project_department,project_status:result.project_status , project_title:result.project_title, project_description:result.project_description, project_language:result.project_language, project_comment:result.project_comment, project_priority:result.project_priority, project_start: result.start , project_deadline: result.end }),
    // })
    // const data=await res.json()
    
    if(res.status==200)
    {
      alert("success");
      // router.push(`${server}/admin/project_module/project_department/${result.project_department}`);
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

  return (
    <>

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
                <CardBody>
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
                    <GridItem xs={12} sm={12} md={6}>
                        <div className="form-group">
                          {/*<input type="text" className="form-control signup-input" placeholder="Department" {...register('department',  { required: "Please enter your Department", pattern: {value: /^[aA-zZ\s]+$/ , message: 'Only characters allow',} })} />
                          <div className="error-msg">{errors.department && <p>{errors.department.message}</p>}</div>*/}
                        <span>Project Department</span>
                          <select name="Department" id="Department" className="form-control signup-input" {...register('project_department', {required:true ,message:'Please select atleast one option', })}>
                            <option value=""  disabled selected>Select Your Department...</option>
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

                    <GridItem xs={12} sm={12} md={6}>
                      <div className="form-group">
                      <span>Project Language</span>
                        <select name="Project_created_by" id="Project_created_by" className="form-control signup-input" {...register('project_language', {required:true ,message:'Please select atleast one option', })}>
                          <option value="" disabled selected>Select Language</option>
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
                    <GridItem xs={12} sm={12} md={6}>
                      <div className="form-group">
                      <span>Project Priority</span>
                        <select name="priority" id="priority" className="form-control signup-input" {...register('project_priority', {required:true ,message:'Please select atleast one option', })}>
                          <option value=""  disabled selected>Select Project Priority</option>
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                        <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                        <div className="error-msg">{errors.project_priority && <span>{errors.project_priority.message}</span>}</div>
                      </div> 
                    </GridItem>
                  
                    <GridItem xs={12} sm={12} md={6}>
                        <div className="form-group">
                          {/*<input type="text" className="form-control signup-input" placeholder="Status" {...register('status',  { required: "Please enter your Status", pattern: {value: /^[aA-zZ\s]+$/ , message: 'Only characters allow',} })} />
                          <div className="error-msg">{errors.status && <p>{errors.status.message}</p>}</div>*/}
                          <span>Project Status</span>
                          <select name="Status" id="Status" className="form-control signup-input" {...register('project_status', {required:true ,message:'Please select atleast one option', })}>
                            <option value=""  disabled selected>Select Project Status</option>
                            <option value="on hold">On hold</option>
                            <option value="running">Running</option>
                            <option value="completed">Completed</option>
                          </select>
                          <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                          {/* <div className="error-msg">{errors.status && <p>{errors.status.message}</p>}</div> */}
                        </div> 
                    </GridItem>
                  </GridContainer><br/>

                  <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
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
                  </GridContainer>
                  
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
  <div className="department_dropdown">
  <button className="dropdown_button">Project Department</button>
      <div className="department-link">
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

<GridItem>
<div className="department_dropdown">
  <button className="dropdown_button">Project Language</button>
      <div className="department-link">
        <a href={`${server}/admin/project_module`}>All</a>
        <a href={`${server}/admin/project_module/project_language/Wordpress`}>Wordpress</a>
        <a href={`${server}/admin/project_module/project_language/Shopify`}>Shopify</a>
        <a href={`${server}/admin/project_module/project_language/ReactJS`}>ReactJS</a>
        <a href={`${server}/admin/project_module/project_language/Laravel`}>Laravel</a>
        <a href={`${server}/admin/project_module/project_language/Android`}>Android</a>
        <a href={`${server}/admin/project_module/project_language/Bubble`}>Bubble</a>
      </div>
</div>
  </GridItem>

</GridContainer>

    <GridContainer>

{all_status.map((status)=>{

return(
  <>
    <GridItem xs={6} sm={6} md={4}>
    <span className="heading">{status.project_status} projects</span>

    {project_details.map((project)=>{

    if(project.project_delete == "no"){

    if(status.project_status == project.project_status){

      var person = project.project_person.split(",");

    return(
    <>

    <GridItem>
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
                    <div className="edit">
                      {/* <div onClick={()=>updateProject(project.project_id)}>project</div> */}
                      {/* <a href={`${server}/admin/project_module/${project.project_id}`}><FiEdit/></a> */}
                      {/* <Button onClick={()=>updateProject(project.project_id)}>Yes</Button> */}
                      <Popup trigger={<a><div className={classes.img} onClick={()=>projectId(project.project_id)}><FiEdit/>{project.project_id}</div></a>} className="popupReact" modal>

              {close => (
              <div>
              <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
              <form onSubmit={handleSubmit(onSubmit)}>              
                <Card>
                  <CardHeader color="primary">

                  <GridContainer>
                    <GridItem>
                      <h4 className={classes.cardTitleWhite}>Edit Project</h4>
                      <p className={classes.cardCategoryWhite}>Update your project details</p>
                    </GridItem>

                    {/* <GridItem> */}
                      <div className={classes.close}>
                        <a onClick={close}>&times;</a>
                      </div>
                    {/* </GridItem> */}
                  </GridContainer>

                  </CardHeader>
                    <CardBody>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>                      
                          <div className="form-group">
                            <span>Project Title</span>
                            <input type="text" className="form-control signup-input" placeholder="Project Title" value={project.project_title} onSelect={handleChange} onChange={handleChange} />
                            <div className="error-msg">{errors.project_title && <span>{errors.project_title.message}</span>}</div>
                          </div>

                        </GridItem>
                      </GridContainer><br/>
                        
                      <GridContainer>  
                        <GridItem xs={12} sm={12} md={12}>
                          <div className="form-group">
                          <span>Project Description</span>
                            <textarea className="form-control signup-input" value={project.project_description} onSelect={handleChange} onChange={handleChange} placeholder="Project Description" {...register('project_description', { required: 'Description is required', } )}  />
                            <div className="error-msg">{errors.project_description && <span>{errors.project_description.message}</span>}</div>
                          </div> 
                        </GridItem>
                      </GridContainer><br/>

                      <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <div className="form-group">
                              {/*<input type="text" className="form-control signup-input" placeholder="Department" {...register('department',  { required: "Please enter your Department", pattern: {value: /^[aA-zZ\s]+$/ , message: 'Only characters allow',} })} />
                              <div className="error-msg">{errors.department && <p>{errors.department.message}</p>}</div>*/}
                            <span>Project Department</span>
                              <select name="Department" id="Department" className="form-control signup-input" value={project.project_department} onSelect={handleChange} onChange={handleChange} {...register('project_department', {required:true ,message:'Please select atleast one option', })}>
                                <option value=""  disabled selected>Select Your Department...</option>
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

                        <GridItem xs={12} sm={12} md={6}>
                          <div className="form-group">
                          <span>Project Language</span>
                            <select name="Project_created_by" id="Project_created_by" className="form-control signup-input"  value={project.project_language} onSelect={handleChange} onChange={handleChange} {...register('project_language', {required:true ,message:'Please select atleast one option', })}>
                              <option value="" disabled selected>Select Language</option>
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
                          <div className="form-group" onSelect={handleChange} onChange={handleChange} {...register('project_start')}>
                          <span>Project Start Date</span>
                            <DatePicker
                              placeholderText="Start_Date : dd/mm/yyyy"
                              isClearable
                              name="datetime1"
                              className={"form-control"}
                              value={project.project_start}
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
                          <div className="form-group" onChange={handleChange} {...register('project_deadline')}>
                          <span>Project End Date</span>
                            <DatePicker
                              placeholderText="End_Date : dd/mm/yyyy"
                              isClearable
                              name="datetime1"
                              onSelect={handleChange}
                              value={project.project_deadline}
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
                        <GridItem xs={12} sm={12} md={6}>
                          <div className="form-group">
                          <span>Project Priority</span>
                            <select name="priority" id="priority" className="form-control signup-input" value={project.project_priority} onSelect={handleChange} onChange={handleChange} {...register('project_priority', {required:true ,message:'Please select atleast one option', })}>
                              <option value=""  disabled selected>Select Project Priority</option>
                              <option value="High">High</option>
                              <option value="Medium">Medium</option>
                              <option value="Low">Low</option>
                            </select>
                            <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                            <div className="error-msg">{errors.project_priority && <span>{errors.project_priority.message}</span>}</div>
                          </div> 
                        </GridItem>
                      
                        <GridItem xs={12} sm={12} md={6}>
                            <div className="form-group">
                              {/*<input type="text" className="form-control signup-input" placeholder="Status" {...register('status',  { required: "Please enter your Status", pattern: {value: /^[aA-zZ\s]+$/ , message: 'Only characters allow',} })} />
                              <div className="error-msg">{errors.status && <p>{errors.status.message}</p>}</div>*/}
                              <span>Project Status</span>
                              <select name="Status" id="Status" className="form-control signup-input" value={project.project_status} onSelect={handleChange} onChange={handleChange} {...register('project_status', {required:true ,message:'Please select atleast one option', })}>
                                <option value=""  disabled selected>Select Project Status</option>
                                <option value="on hold">On hold</option>
                                <option value="running">Running</option>
                                <option value="completed">Completed</option>
                              </select>
                              <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                              {/* <div className="error-msg">{errors.status && <p>{errors.status.message}</p>}</div> */}
                            </div> 
                        </GridItem>
                      </GridContainer><br/>

                      <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
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
                            <textarea className="form-control signup-input" value={project.project_comment} onSelect={handleChange} onChange={handleChange} placeholder="Comment" {...register('project_comment')} />
                            <div className="error-msg">{errors.position && <span>{errors.position.message}</span>}</div>
                          </div> 
                        </GridItem>
                      </GridContainer>
                      
                    </CardBody>

                    <CardFooter>
                        <Button color="primary"  onClick={()=>updateProject(project.project_id)}>Save</Button>
                        <Button className="button" onClick={() => { close(); }}> Cancel </Button>
                    </CardFooter>
                    
                  </Card>
              </form>
              </GridItem>
              </GridContainer>

              </div>

              )}
              </Popup>


                      <Popup trigger={<a><MdDelete/></a>} modal>
                        {close => (
                          <div>
                          <Card>                            
                            <GridContainer>
                              <GridItem xs={12} sm={12} md={12}>
                                  <GridContainer>
                                    <GridItem>
                                      <div className="delete_popup">
                                        <CardBody>
                                          <MdDelete className="delete_popup_image"/>
                                          <h2 className="delete_popup">Delete {project.project_title}</h2>
                                          <h4 className={classes.cardTitleWhite}>Are you sure you want to delete {project.project_title}?</h4>
                                        </CardBody>
                                        <CardFooter className="delete_popup_button">
                                            <Button onClick={()=>deleteProject(project.project_id)}>Yes</Button>
                                            <Button className="button" onClick={() => { close(); }}> No </Button>
                                        </CardFooter>
                                      </div>
                                    </GridItem>

                                      <div className={classes.close}>
                                        <a onClick={close}>&times;</a>
                                      </div>
                                  </GridContainer>
                              </GridItem>
                            </GridContainer>
                          </Card>
  
                          </div>
                        )}
                      </Popup>

                    </div>
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
                </GridContainer>
                
                </CardBody>

                <CardFooter>
                </CardFooter>
            </Card>
        </form>
    </GridItem>
  </>
        )}    
                  }
    })
 }
  </GridItem>

 </>);

})
}


{/* 
    <GridItem xs={6} sm={6} md={4}>
      <span>Running Projects</span>

    {project_details.map((project)=>{

    if(project.project_delete == "no"){
    if(project.project_status == "running"){

          var person = project.project_person.split(",");
    
        return(
        <>
    
            <GridItem>
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
                            <a href={`${server}/admin/project_module/${project.project_id}`}><FiEdit/></a>
                            <div onClick={()=>deleteProject(project.project_id)}><FaEye/></div>
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
    
                  }
    })
 }

    </GridItem>

    <GridItem xs={6} sm={6} md={4}>
      <span>Completed Projects</span>

    {project_details.map((project)=>{

    if(project.project_delete == "no"){
      if(project.project_status == "completed"){

      var person = project.project_person.split(",");

    return(
    <>
    <GridItem>
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
                    <a href={`${server}/admin/project_module/${project.project_id}`}><FiEdit/></a>
                    <div onClick={()=>deleteProject(project.project_id)}><FaEye/></div>
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
                </GridContainer>
                
                </CardBody>

                <CardFooter>
                </CardFooter>
            </Card>
        </form>
    </GridItem>
  </>
        )}    
                  }
    })
 }


    </GridItem> */}



    </GridContainer>
    </>
  );
}

Dashboard.layout = Admin;

export default Dashboard;







      {/*<GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Used Space</p>
              <h3 className={classes.cardTitle}>
                49/50 <small>GB</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  Get more space
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="dark" stats icon>
              <CardIcon color="dark">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Revenue</p>
              <h3 className={classes.cardTitle}>$34,245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Fixed Issues</p>
              <h3 className={classes.cardTitle}>75</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Tracked from Github
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Followers</p>
              <h3 className={classes.cardTitle}>+245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily Sales</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Email Subscriptions</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="dark">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Tasks:"
            headerColor="dark"
            tabs={[
              {
                tabName: "Bugs",
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                  />
                ),
              },
              {
                tabName: "Website",
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasks={website}
                  />
                ),
              },
              {
                tabName: "Server",
                tabIcon: Cloud,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={server}
                  />
                ),
              },
            ]}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
              <p className={classes.cardCategoryWhite}>
                New employees on 15th September, 2016
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Name", "Salary", "Country"]}
                tableData={[
                  ["1", "Dakota Rice", "$36,738", "Niger"],
                  ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                  ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                  ["4", "Philip Chaney", "$38,735", "Korea, South"],
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>*/}
