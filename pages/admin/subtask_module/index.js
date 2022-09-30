import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from 'next/router';
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
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
import { ToastContainer, toast } from 'react-toastify';


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

export async function getServerSideProps(){

  const res = await fetch(`${server}/api/project`);
  const project_details = await res.json();

  const response = await fetch(`${server}/api/admin`)
  const User_name = await response.json();

  const task = await fetch(`${server}/api/subtask`)
  const allTask = await task.json();

  return{ props: {project_details, User_name, allTask} }
}

function Dashboard( { project_details , User_name , allTask } ) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  
  const deleteTask = async(id) =>{
    console.log('delete');
    console.log(id);

    const res = await fetch(`${server}/api/subtask/deleteTask/${id}`);
    router.reload(`${server}/admin/subtask_module`);
  }
  const { register,  watch, handleSubmit, formState: { errors }, setValue } = useForm(); 
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const router = useRouter();

  const [uoption, setUpdate] = React.useState({
    project_name: "",
    task_title: "",
    task_description: "",
    task_language: "",
    task_start: "",
    task_deadline: "",
    task_priority: "",
    task_status: "",
    task_person: "",
    task_comment: ""
  });

  const handleChange = ({ target: { name, value } }) =>{
    console.log("name");
    console.log([name]);
  
    setUpdate({ ...uoption, [name]: value });
  }

  var uMember = uoption.task_person;

  const allSelectedMember = [];
  const projectMember = (uMember).split(",");


  for(var i=0; i<projectMember.length; i++){
    allSelectedMember.push({'label' :projectMember[i] , 'value' : projectMember[i]});
  }

  var project = uoption.project_name;

  const selectedProject = [];
  const projectName = (project).split(",");
  // console.log(projectName);

    selectedProject.push({'label' :projectName[0] , 'value' : projectName[0]});
  // console.log(selectedProject[0]);

  // const project_Name = [];
  // project_Name.push(selectedProject[0]);

  const [updateSelected, setUpdateSelected] = React.useState([]);

  const projectId = async(id) =>{
    // console.log('update project id');
    // console.log(id);

    const response = await fetch(`${server}/api/subtask/${id}`)
    const update_data = await response.json();
    console.log(update_data[0]);

    const udata = update_data[0];

    const selectedMember = (udata.task_person).split(",");

    const getAllname = [];

    selectedMember.map((user)=>{
      getAllname.push( {'label' :user, 'value' :user} );
    });

    setUpdateSelected(getAllname);
    setUpdate(udata);
    setStartDate(new Date(udata.task_start));
    setEndDate(new Date(udata.task_deadline));

    }

    const [p_selected, setProject] = useState([]);
    const [select_updateProject, setUpdateProject] = useState([]);


    const toastId = React.useRef(null);
    const updateProject = async() =>{

      const allMember = [];
      for(var i=0; i<updateSelected.length; i++){
            allMember.push(updateSelected[i].value);
      }
    
        console.log("project name");
        console.log(selectedProject);
        console.log(select_updateProject);
        if(select_updateProject == ""){
          var u_project = selectedProject;
        }else{
          var u_project = select_updateProject;
        }
        console.log("project");
        console.log(u_project);
  
      if( uoption.task_id == ""  ||  u_project  == ""  || allMember  == ""  || uoption.task_status == ""  || uoption.task_department == ""  || uoption.task_title == ""  || uoption.task_description == ""  ||  uoption.task_language == ""  || uoption.task_priority == ""  || startDate == ""  || endDate == "" ){
        if(! toast.isActive(toastId.current)) {
          toastId.current = toast.error('Please fill all the required fields', {
              position: "top-right",
              autoClose:5000,
              theme: "colored",
              closeOnClick: true,
              hideProgressBar: true,
            });
          }
    
    }else{
  
      const res = await fetch(`${server}/api/subtask/update_subtask`,{
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task_id:uoption.task_id, project_name:u_project , task_person: allMember, task_status:uoption.task_status , task_department:uoption.task_department ,  task_title: uoption.task_title , task_description:uoption.task_description , task_language:uoption.task_language, task_comment:uoption.task_comment, task_priority:uoption.task_priority, task_start: startDate , task_deadline: endDate }),
      });
      if(!toast.isActive(toastId.current)) {
        toastId.current = toast.success('Task updated Successfully ! 🎉', {
            position: "top-right",
            autoClose:1000,
            theme: "colored",
            hideProgressBar: true,
            onClose: () => router.push(`${server}/admin/subtask_module`)
          });
        }
        router.reload(`${server}/admin/subtask_module`);
  
    }
  }

  const toastID = React.useRef(null);
  const onSubmit = async (result) =>{
    
    console.log(result);
    console.log(selected);

    if(selected == "" || p_selected == "" ||  result.task_status == "" ||  result.task_title  == "" || result.task_description == "" || result.task_language == "" || result.task_priority == "" ||  result.start == "" ||  result.end == "" ){
      if(! toast.isActive(toastId.current)) {
        toastID.current = toast.error('Please fill all the required fields', {
            position: "top-right",
            autoClose:5000,
            theme: "colored",
            closeOnClick: true,
            hideProgressBar: true,
          });
        }

    }else{
    
    const p_start = result.start.toDateString();
    const p_end = result.end.toDateString();
    console.log("result");
    console.log(result.start.toDateString());

  
    const res = await fetch(`${server}/api/subtask/add_subtask`,{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify({task_person:selected, project_name:p_selected, task_status:result.task_status , task_title:result.task_title, task_description:result.task_description, task_language:result.task_language, task_comment:result.task_comment, task_priority:result.task_priority, task_start: p_start , task_deadline: p_end }),
    })
    const data=await res.json()

    if(res.status==200)
    {
      // alert("success");
      if(!toast.isActive(toastID.current)) {
        toastId.current = toast.success('Task added Successfully ! 🎉', {
            position: "top-right",
            autoClose:1000,
            theme: "colored",
            hideProgressBar: true,
            onClose: () => router.push(`${server}/admin/subtask_module`)
            });
        }

      router.reload(`${server}/admin/subtask_module`);
    }
    else
    {
      alert("Fail");
    }
  }
}

const [uoptions, setOptions] = useState([]);

useEffect(() =>{
  const u_data = async() =>{

    const getUsername = [];

    console.log("123");
    console.log(User_name);

    User_name.map((user)=>{
      getUsername.push( {'label' :user.username, 'value' :user.username} );
    });
    setOptions(getUsername);
  }
  u_data();
},[]);
const [selected, setSelected] = useState([]);

const [project_list, setLists] = useState([]);

useEffect(() =>{
  const u_data = async() =>{

    const getUsername = [];

    console.log("123");
    console.log(User_name);

    project_details.map((project)=>{
      getUsername.push( {'label' :project.project_title , 'value' :project.project_title } );
    });
    setLists(getUsername);
  }
  u_data();
},[]);

// to do task block open and close onclick
const [taskTodo, setTaskToDo] = useState([]);
    const taskToDo = (task) => {
        setTaskToDo(task);
    }
const closeTaskToDo = async(task) =>{
  if(taskTodo != ""){
    setTaskToDo("");
  }else{
    setTaskToDo(task);
  }
}

// on hold task block open and close onclick
const [TaskOnHold, setTaskOnHold] = useState([]);
    const taskOnHold = (task) => {
        setTaskOnHold(task);
    }
    console.log(TaskOnHold);
const closeTaskOnHold = async(task) =>{
  if(TaskOnHold != ""){
    setTaskOnHold("");
  }else{
    setTaskOnHold(task);
  }
}

// running task block open and close onclick
const [TaskRunning, setTaskRunning] = useState([]);
    const taskRunning = (task) => {
      setTaskRunning(task);
    }
const closeTaskRunning = async(task) =>{
  if(TaskRunning != ""){
    setTaskRunning("");
  }else{
    setTaskRunning(task);
  }
}

// completed task block open and close onclick
const [TaskCompleted, setTaskCompleted] = useState([]);
    const taskCompleted = (task) => {
        setTaskCompleted(task);
    }
const closeTaskCompleted = async(task) =>{
  if(TaskCompleted != ""){
    setTaskCompleted("");
  }else{
    setTaskCompleted(task);
  }
}

  return (
    <div>
    <div className="buttonalign">
    <GridContainer>
        <GridItem>

          <Popup trigger={<div><button className="bttn-design">Add Task</button></div>}  className="popupReact"  modal>

          {close => (
      <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <form onSubmit={handleSubmit(onSubmit)}>              
            <Card>
              <CardHeader color="primary">

              <GridContainer>
                <GridItem>
                  <h4 className={classes.cardTitleWhite}>Create Task</h4>
                  <p className={classes.cardCategoryWhite}>Enter your new task details</p>
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
                        <span>Task Title</span><span className="required">*</span>
                        <input type="text" className="form-control signup-input" placeholder="Task Title" {...register('task_title',  { required: "Please enter task title"})} />
                        {/* <div className="error-msg">{errors.task_title && <span>{errors.task_title.message}</span>}</div> */}
                      </div> 
                    </GridItem>
                  </GridContainer><br/>
                    
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                    <div className="form-group" {...register('project_name')}>
                      
                      <span>Select Project</span><span className="required">*</span>
                      <Multiselect
                        displayValue="value"
                        options={project_list}
                        value={p_selected}
                        singleSelect={true}
                        onChange={setProject}
                        // onKeyPressFn={function noRefCheck(){}}
                        onRemove={setProject}
                        onSearch={function noRefCheck(){}}
                        onSelect={setProject}
                        placeholder="Project List"
                        showArrow={true}
                      />
                      
                        {/* <div className="error-msg">{errors.project_name && <span>{errors.project_name.message}</span>}</div> */}
                      </div> 
                    </GridItem>
                  </GridContainer><br/>

                  <GridContainer>  
                    <GridItem xs={12} sm={12} md={12}>
                      <div className="form-group">
                      <span>Task Description</span><span className="required">*</span>
                        <textarea className="form-control signup-input" placeholder="Task Description" {...register('task_description', { required: 'Description is required', } )}  />
                        {/* <div className="error-msg">{errors.task_description && <span>{errors.task_description.message}</span>}</div> */}
                      </div> 
                    </GridItem>
                  </GridContainer><br/>

                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <div className="form-group">
                      <span>Task Priority</span><span className="required">*</span>
                        <select name="priority" id="priority" className="form-control signup-input" {...register('task_priority', {required:true ,message:'Please select atleast one option', })}>
                          <option value=""  disabled selected>Select Task Priority</option>
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                        <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                        {/* <div className="error-msg">{errors.task_priority && <span>{errors.task_priority.message}</span>}</div> */}
                      </div> 
                    </GridItem>

                    <GridItem xs={12} sm={12} md={6}>
                      <div className="form-group">
                      <span>Task Language</span><span className="required">*</span>
                        <select name="Task_created_by" id="Task_created_by" className="form-control signup-input" {...register('task_language', {required:true ,message:'Please select atleast one option', })}>
                          <option value="" disabled selected>Select Language</option>
                          <option value="Wordpress">Wordpress</option>
                          <option value="Shopify">Shopify</option>
                          <option value="ReactJS">ReactJS</option>
                          <option value="Laravel">Laravel</option>
                          <option value="Android">Android</option>
                          <option value="Bubble">Bubble</option>
                        </select>
                        <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                        {/* <div className="error-msg">{errors.task_language && <span>{errors.task_language.message}</span>}</div> */}
                      </div> 
                    </GridItem>
                  </GridContainer><br/>

                  <GridContainer>  
                    <GridItem xs={12} sm={12} md={6}>
                      <div className="form-group" {...register('task_start')}>
                      <span>Task Start Date</span><span className="required">*</span>
                        <DatePicker
                          placeholderText="Start Date : dd/mm/yyyy"
                          isClearable
                          name="datetime"
                          className={"form-control"}
                          selected={startDate}
                          onChange={val => {
                            setStartDate(val);
                            setValue("start", val);
                          }}
                          dateFormat="dd-MM-yyyy"
                          minDate={new Date()}
                        />
                      {/* <div className="error-msg">{errors.task_start && <span>{errors.task_start.message}</span>}</div> */}
                      </div> 
                    </GridItem>

                    <GridItem xs={12} sm={12} md={6}>
                      <div className="form-group" {...register('task_deadline')}>
                      <span>Task End Date</span><span className="required">*</span>
                        <DatePicker
                          placeholderText="End Date : dd/mm/yyyy"
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
                      {/* <div className="error-msg">{errors.task_deadline && <span>{errors.task_deadline.message}</span>}</div> */}
                      </div> 
                    </GridItem>
                  </GridContainer><br/>

                  <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                      <div className="form-group" {...register('task_person')}>
                      
                      <span>Task Members</span><span className="required">*</span>
                      <Multiselect
                      displayValue="value"
                        options={uoptions}
                        value={selected}
                        onChange={setSelected}
                        onRemove={setSelected}
                        onSelect={setSelected}
                        placeholder="Select Task Members"
                        showArrow={true}
                      />
                      
                        {/* <div className="error-msg">{errors.task_person && <span>{errors.task_person.message}</span>}</div> */}
                      </div> 
                    </GridItem>
                  </GridContainer><br/>

                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <div className="form-group">
                      <span>Comments</span>
                        <textarea className="form-control signup-input" placeholder="Comment" {...register('task_comment')} />
                        {/* <div className="error-msg">{errors.position && <span>{errors.position.message}</span>}</div> */}
                      </div> 
                    </GridItem>
                  </GridContainer>
                  
                </CardBody>

                <CardFooter>
                    <Button color="primary" type="submit">Add Task</Button>
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
        <a href={`${server}/admin/project_module/project_department/Web development`}>Web Development</a>
        <a href={`${server}/admin/project_module/project_department/Content writer`}>Content Writer</a>
        <a href={`${server}/admin/project_module/project_department/Project manager`}>Project Manager</a>
        <a href={`${server}/admin/project_module/project_department/Mobile App developer`}>Mobile App Developer</a>
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
</div>
    <GridContainer>

<Card>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <div className="taskToDo" onClick={()=> { taskToDo("task_toDo") , closeTaskToDo("task_toDo") }}><i class="arrow down"></i>Task to do </div>
          
        </GridItem>
      </GridContainer>
</Card>

{allTask.map((task)=>{

if(task.task_delete == "no"){
  if(task.task_status == taskTodo){
    var person = task.task_person.split(",");

return(

<GridItem xs={12} sm={6} md={9}>
  <form>
    <Card className= "projects">
        <CardHeader color="primary" className="project-block">

          {/* <img src={`${server}/reactlogo.png`} className={classes.img}/> */}
          <div className="project-content">
            <h4 className="projectTitle">{task.task_title}</h4>
            
            <div className="icon-display">

            <span className={task.task_priority}>{task.task_priority}</span>
            {person.map((project_person) => {
              return(
                <div className="chip">
                  <span>{project_person}</span>
                </div>
              )
              })
            }

            <GridItem>
              <div className="icon-edit-delete">
                <Popup trigger={<div><a className="bttn-design1" onClick={()=> { projectId(task.task_id) }  }><FiEdit/></a></div>}  className="popupReact"  modal>

                {close => (
                <div>
                <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                <form onSubmit={handleSubmit(onSubmit)}>              
                  <Card>
                    <CardHeader color="primary">

                    <GridContainer>
                      <GridItem>
                        <h4 className={classes.cardTitleWhite}>Edit Task</h4>
                        <p className={classes.cardCategoryWhite}>Update your task details</p>
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
                              <span>Task Title</span><span className="required">*</span>
                              <input type="text" className="form-control signup-input" placeholder="Task Title" name="task_title" value={uoption.task_title} onChange={handleChange} />
                            </div> 
                          </GridItem>
                        </GridContainer><br/>
                          
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={12}>
                          <div className="form-group" name="project_name" onChange={handleChange} >
                            
                            <span>Select Project</span><span className="required">*</span>
                            <Multiselect
                              displayValue="value"
                              options={project_list}
                              value={select_updateProject}
                              selectedValues={selectedProject}
                              singleSelect={true}
                              onChange={setUpdateProject}
                              onRemove={setUpdateProject}
                              onSelect={setUpdateProject}
                              placeholder="Project List"
                              showArrow={true}
                            />
                            
                            </div> 
                          </GridItem>
                        </GridContainer><br/>

                        <GridContainer>  
                          <GridItem xs={12} sm={12} md={12}>
                            <div className="form-group">
                            <span>Task Description</span><span className="required">*</span>
                              <textarea className="form-control signup-input" placeholder="Task Description" name="task_description" value={uoption.task_description} onChange={handleChange} />
                            </div> 
                          </GridItem>
                        </GridContainer><br/>

                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                        <div className="form-group">
                              <span>Task Status</span><span className="required">*</span>
                                <select name="task_status" id="Status" className="form-control signup-input" value={uoption.task_status} onChange={handleChange}>
                                  <option value=""  disabled selected>Select Task Status</option>
                                  <option value="task_toDo">Task to do</option>
                                  <option value="taskOn_hold">Task On hold</option>
                                  <option value="task_Running">Task Running</option>
                                  <option value="task_completed">Task Completed</option>
                                </select>
                              <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                            </div> 
                          </GridItem>
                        </GridContainer><br/>

                        <GridContainer>
                          <GridItem xs={12} sm={12} md={6}>
                            <div className="form-group">
                            <span>Task Priority</span><span className="required">*</span>
                              <select id="priority" className="form-control signup-input" name="task_priority" value={uoption.task_priority} onChange={handleChange}  >
                                <option value=""  disabled selected>Select Task Priority</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                              </select>
                              <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                            </div> 
                          </GridItem>

                          <GridItem xs={12} sm={12} md={6}>
                            <div className="form-group">
                            <span>Task Language</span><span className="required">*</span>
                              <select id="Task_created_by" className="form-control signup-input" name="task_language" value={uoption.task_language} onChange={handleChange} >
                                <option value="" disabled selected>Select Language</option>
                                <option value="Wordpress">Wordpress</option>
                                <option value="Shopify">Shopify</option>
                                <option value="ReactJS">ReactJS</option>
                                <option value="Laravel">Laravel</option>
                                <option value="Android">Android</option>
                                <option value="Bubble">Bubble</option>
                              </select>
                              <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                            </div> 
                          </GridItem>
                        </GridContainer><br/>

                        <GridContainer>  
                          <GridItem xs={12} sm={12} md={6}>
                            <div className="form-group" onChange={handleChange} >
                            <span>Task Start Date</span><span className="required">*</span>
                              <DatePicker
                                placeholderText="Start Date : dd/mm/yyyy"
                                isClearable
                                name="datetime"
                                className={"form-control"}
                                selected={startDate}
                                onChange={val => {
                                  setStartDate(val);
                                  setValue("start", val);
                                }}
                                dateFormat="dd-MM-yyyy"
                                minDate={new Date()}
                              />
                            </div> 
                          </GridItem>

                          <GridItem xs={12} sm={12} md={6}>
                            <div className="form-group" onChange={handleChange} >
                            <span>Task End Date</span><span className="required">*</span>
                              <DatePicker
                                placeholderText="End Date : dd/mm/yyyy"
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
                            </div> 
                          </GridItem>
                        </GridContainer><br/>

                        <GridContainer>
                          <GridItem xs={12} sm={12} md={12}>
                            <div className="form-group">
                            
                            <span>Task Members</span><span className="required">*</span>
                            <Multiselect
                            displayValue="value"
                              options={uoptions}
                              value={updateSelected}
                              selectedValues={allSelectedMember}
                              onChange={setUpdateSelected}
                              onRemove={setUpdateSelected}
                              onSelect={setUpdateSelected}
                              placeholder="Select Task Members"
                              showArrow={true}
                            />
                            </div> 
                          </GridItem>
                        </GridContainer><br/>

                        <GridContainer>
                          <GridItem xs={12} sm={12} md={12}>
                            <div className="form-group">
                            <span>Comments</span>
                              <textarea className="form-control signup-input" placeholder="Comment" name="task_comment" value={uoption.task_comment} onChange={handleChange} />
                            </div> 
                          </GridItem>
                        </GridContainer>
                        
                      </CardBody>

                      <CardFooter>
                          <Button color="primary" type="submit" onClick={()=> { updateProject(task.task_id); } }>Save</Button>
                          <Button className="button" onClick={() => { close(); }}> Cancel </Button>
                      </CardFooter>
                      
                    </Card>
                </form>
                </GridItem>
                </GridContainer>

                </div>

                )}
                </Popup>

                {/* <button onClick={()=>deleteTask(task.task_id)} className="project_delete_icon"><MdDelete/></button> */}


                <Popup trigger={<span><MdDelete/></span>} modal>
                    {close => (
                      <div>
                      <Card>                            
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={12}>
                              <GridContainer>
                                <GridItem>
                                  <div>
                                    <CardBody>
                                      <h4 className={classes.cardTitleWhite}>Are you sure you want to delete {task.task_title} task?</h4>
                                    </CardBody>
                                    <CardFooter>
                                        <Button onClick={()=>deleteTask(task.task_id)}>Yes</Button>
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
          
          </div></div>
        </CardHeader>

    </Card>
  </form>
  <ToastContainer limit={1}/>

</GridItem>

    )   
              }
          }
})
}

<Card>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <div className="taskOn_hold" onClick={()=> { taskOnHold("taskOn_hold") , closeTaskOnHold("taskOn_hold") }}>Task on hold</div>
        </GridItem>
      </GridContainer>
</Card>

    {allTask.map((task)=>{

    if(task.task_delete == "no"){
      if(task.task_status == TaskOnHold){
        var person = task.task_person.split(",");

    return(

    <GridItem xs={12} sm={6} md={9}>
      <form>
        <Card className= "projects">
            <CardHeader color="primary" className="project-block">

              {/* <img src={`${server}/reactlogo.png`} className={classes.img}/> */}
              <div className="project-content">
                <h4 className="projectTitle">{task.task_title}</h4>
                <p className={classes.cardCategoryWhite}></p>

                <div className="icon-display">

                <span className={task.task_priority}>{task.task_priority}</span>
                {person.map((project_person) => {
                  return(
                    <div className="chip">
                      <span>{project_person}</span>
                    </div>
                  )
                  })
                }

                <GridItem>
                  <div className="icon-edit-delete">
                    <Popup trigger={<div><a className="bttn-design1" onClick={()=> { projectId(task.task_id) }  }><FiEdit/></a></div>}  className="popupReact"  modal>

                    {close => (
                    <div>
                    <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                    <form onSubmit={handleSubmit(onSubmit)}>              
                      <Card>
                        <CardHeader color="primary">

                        <GridContainer>
                          <GridItem>
                            <h4 className={classes.cardTitleWhite}>Edit Task</h4>
                            <p className={classes.cardCategoryWhite}>Update your task details</p>
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
                                  <span>Task Title</span><span className="required">*</span>
                                  <input type="text" className="form-control signup-input" placeholder="Task Title" name="task_title" value={uoption.task_title} onChange={handleChange} />
                                </div> 
                              </GridItem>
                            </GridContainer><br/>
                              
                            <GridContainer>
                              <GridItem xs={12} sm={12} md={12}>
                              <div className="form-group" name="project_name" onChange={handleChange} >
                                
                                <span>Select Project</span><span className="required">*</span>
                                <Multiselect
                                  displayValue="value"
                                  options={project_list}
                                  value={select_updateProject}
                                  selectedValues={selectedProject}
                                  singleSelect={true}
                                  onChange={setUpdateProject}
                                  onRemove={setUpdateProject}
                                  onSelect={setUpdateProject}
                                  placeholder="Project List"
                                  showArrow={true}
                                />
                                
                                </div> 
                              </GridItem>
                            </GridContainer><br/>

                            <GridContainer>  
                              <GridItem xs={12} sm={12} md={12}>
                                <div className="form-group">
                                <span>Task Description</span><span className="required">*</span>
                                  <textarea className="form-control signup-input" placeholder="Task Description" name="task_description" value={uoption.task_description} onChange={handleChange} />
                                </div> 
                              </GridItem>
                            </GridContainer><br/>

                            <GridContainer>
                              <GridItem xs={12} sm={12} md={12}>
                              <div className="form-group">
                                    <span>Task Status</span><span className="required">*</span>
                                      <select name="task_status" id="Status" className="form-control signup-input" value={uoption.task_status} onChange={handleChange}>
                                        <option value=""  disabled selected>Select Task Status</option>
                                        <option value="task_toDo">Task to do</option>
                                        <option value="taskOn_hold">Task On hold</option>
                                        <option value="task_Running">Task Running</option>
                                        <option value="task_completed">Task Completed</option>
                                      </select>
                                    <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                                  </div> 
                                </GridItem>
                              </GridContainer><br/>


                            <GridContainer>
                              <GridItem xs={12} sm={12} md={6}>
                                <div className="form-group">
                                <span>Task Priority</span><span className="required">*</span>
                                  <select id="priority" className="form-control signup-input" name="task_priority" value={uoption.task_priority} onChange={handleChange}  >
                                    <option value=""  disabled selected>Select Task Priority</option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                  </select>
                                  <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                                </div> 
                              </GridItem>

                              <GridItem xs={12} sm={12} md={6}>
                                <div className="form-group">
                                <span>Task Language</span><span className="required">*</span>
                                  <select id="Task_created_by" className="form-control signup-input" name="task_language" value={uoption.task_language} onChange={handleChange} >
                                    <option value="" disabled selected>Select Language</option>
                                    <option value="Wordpress">Wordpress</option>
                                    <option value="Shopify">Shopify</option>
                                    <option value="ReactJS">ReactJS</option>
                                    <option value="Laravel">Laravel</option>
                                    <option value="Android">Android</option>
                                    <option value="Bubble">Bubble</option>
                                  </select>
                                  <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                                </div> 
                              </GridItem>
                            </GridContainer><br/>

                            <GridContainer>  
                              <GridItem xs={12} sm={12} md={6}>
                                <div className="form-group" onChange={handleChange} >
                                <span>Task Start Date</span><span className="required">*</span>
                                  <DatePicker
                                    placeholderText="Start Date : dd/mm/yyyy"
                                    isClearable
                                    name="datetime"
                                    className={"form-control"}
                                    selected={startDate}
                                    onChange={val => {
                                      setStartDate(val);
                                      setValue("start", val);
                                    }}
                                    dateFormat="dd-MM-yyyy"
                                    minDate={new Date()}
                                  />
                                </div> 
                              </GridItem>

                              <GridItem xs={12} sm={12} md={6}>
                                <div className="form-group" onChange={handleChange} >
                                <span>Task End Date</span><span className="required">*</span>
                                  <DatePicker
                                    placeholderText="End Date : dd/mm/yyyy"
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
                                </div> 
                              </GridItem>
                            </GridContainer><br/>

                            <GridContainer>
                              <GridItem xs={12} sm={12} md={12}>
                                <div className="form-group">
                                
                                <span>Task Members</span><span className="required">*</span>
                                <Multiselect
                                displayValue="value"
                                  options={uoptions}
                                  value={updateSelected}
                                  selectedValues={allSelectedMember}
                                  onChange={setUpdateSelected}
                                  onRemove={setUpdateSelected}
                                  onSelect={setUpdateSelected}
                                  placeholder="Select Task Members"
                                  showArrow={true}
                                />
                                </div> 
                              </GridItem>
                            </GridContainer><br/>

                            <GridContainer>
                              <GridItem xs={12} sm={12} md={12}>
                                <div className="form-group">
                                <span>Comments</span>
                                  <textarea className="form-control signup-input" placeholder="Comment" name="task_comment" value={uoption.task_comment} onChange={handleChange} />
                                </div> 
                              </GridItem>
                            </GridContainer>
                            
                          </CardBody>

                          <CardFooter>
                              <Button color="primary" type="submit" onClick={()=> { updateProject(task.task_id); } }>Save</Button>
                              <Button className="button" onClick={() => { close(); }}> Cancel </Button>
                          </CardFooter>
                          
                        </Card>
                    </form>
                    </GridItem>
                    </GridContainer>

                    </div>

                    )}
                    </Popup>

                    {/* <button onClick={()=>deleteTask(task.task_id)} className="project_delete_icon"><MdDelete/></button> */}


                    <Popup trigger={<span><MdDelete/></span>} modal>
                        {close => (
                          <div>
                          <Card>                            
                            <GridContainer>
                              <GridItem xs={12} sm={12} md={12}>
                                  <GridContainer>
                                    <GridItem>
                                      <div>
                                        <CardBody>
                                          <h4 className={classes.cardTitleWhite}>Are you sure you want to delete {task.task_title} task?</h4>
                                        </CardBody>
                                        <CardFooter>
                                            <Button onClick={()=>deleteTask(task.task_id)}>Yes</Button>
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
              
              </div></div>
            </CardHeader>

        </Card>
      </form>
      {/* <ToastContainer limit={1}/> */}

    </GridItem>

        )   
                  }
              }
    })
 }


<Card>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <div className="taskCompleted" onClick={()=> { taskRunning("task_Running") , closeTaskRunning("task_Running") }}>Task Running</div>
        </GridItem>
      </GridContainer>
</Card>

    {allTask.map((task)=>{

    if(task.task_delete == "no"){
      if(task.task_status == TaskRunning){
        var person = task.task_person.split(",");

    return(

    <GridItem xs={12} sm={6} md={9}>
      <form>
        <Card className= "projects">
            <CardHeader color="primary" className="project-block">

              {/* <img src={`${server}/reactlogo.png`} className={classes.img}/> */}
              <div className="project-content">
                <h4 className="projectTitle">{task.task_title}</h4>
                <p className={classes.cardCategoryWhite}></p>

                <div className="icon-display">

                <span className={task.task_priority}>{task.task_priority}</span>
                {person.map((project_person) => {
                  return(
                    <div className="chip">
                      <span>{project_person}</span>
                    </div>
                  )
                  })
                }

                <GridItem>
                  <div className="icon-edit-delete">
                    <Popup trigger={<div><a className="bttn-design1" onClick={()=> { projectId(task.task_id) }  }><FiEdit/></a></div>}  className="popupReact"  modal>

                    {close => (
                    <div>
                    <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                    <form onSubmit={handleSubmit(onSubmit)}>              
                      <Card>
                        <CardHeader color="primary">

                        <GridContainer>
                          <GridItem>
                            <h4 className={classes.cardTitleWhite}>Edit Task</h4>
                            <p className={classes.cardCategoryWhite}>Update your task details</p>
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
                                  <span>Task Title</span><span className="required">*</span>
                                  <input type="text" className="form-control signup-input" placeholder="Task Title" name="task_title" value={uoption.task_title} onChange={handleChange} />
                                </div> 
                              </GridItem>
                            </GridContainer><br/>
                              
                            <GridContainer>
                              <GridItem xs={12} sm={12} md={12}>
                              <div className="form-group" name="project_name" onChange={handleChange} >
                                
                                <span>Select Project</span><span className="required">*</span>
                                <Multiselect
                                  displayValue="value"
                                  options={project_list}
                                  value={select_updateProject}
                                  selectedValues={selectedProject}
                                  singleSelect={true}
                                  onChange={setUpdateProject}
                                  onRemove={setUpdateProject}
                                  onSelect={setUpdateProject}
                                  placeholder="Project List"
                                  showArrow={true}
                                />
                                
                                </div> 
                              </GridItem>
                            </GridContainer><br/>

                            <GridContainer>  
                              <GridItem xs={12} sm={12} md={12}>
                                <div className="form-group">
                                <span>Task Description</span><span className="required">*</span>
                                  <textarea className="form-control signup-input" placeholder="Task Description" name="task_description" value={uoption.task_description} onChange={handleChange} />
                                </div> 
                              </GridItem>
                            </GridContainer><br/>

                            <GridContainer>
                              <GridItem xs={12} sm={12} md={12}>
                              <div className="form-group">
                                    <span>Task Status</span><span className="required">*</span>
                                      <select name="task_status" id="Status" className="form-control signup-input" value={uoption.task_status} onChange={handleChange}>
                                        <option value=""  disabled selected>Select Task Status</option>
                                        <option value="task_toDo">Task to do</option>
                                        <option value="taskOn_hold">Task On hold</option>
                                        <option value="task_Running">Task Running</option>
                                        <option value="task_completed">Task Completed</option>
                                      </select>
                                    <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                                  </div> 
                                </GridItem>
                              </GridContainer><br/>

                            <GridContainer>
                              <GridItem xs={12} sm={12} md={6}>
                                <div className="form-group">
                                <span>Task Priority</span><span className="required">*</span>
                                  <select id="priority" className="form-control signup-input" name="task_priority" value={uoption.task_priority} onChange={handleChange}  >
                                    <option value=""  disabled selected>Select Task Priority</option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                  </select>
                                  <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                                </div> 
                              </GridItem>

                              <GridItem xs={12} sm={12} md={6}>
                                <div className="form-group">
                                <span>Task Language</span><span className="required">*</span>
                                  <select id="Task_created_by" className="form-control signup-input" name="task_language" value={uoption.task_language} onChange={handleChange} >
                                    <option value="" disabled selected>Select Language</option>
                                    <option value="Wordpress">Wordpress</option>
                                    <option value="Shopify">Shopify</option>
                                    <option value="ReactJS">ReactJS</option>
                                    <option value="Laravel">Laravel</option>
                                    <option value="Android">Android</option>
                                    <option value="Bubble">Bubble</option>
                                  </select>
                                  <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                                </div> 
                              </GridItem>
                            </GridContainer><br/>

                            <GridContainer>  
                              <GridItem xs={12} sm={12} md={6}>
                                <div className="form-group" onChange={handleChange} >
                                <span>Task Start Date</span><span className="required">*</span>
                                  <DatePicker
                                    placeholderText="Start Date : dd/mm/yyyy"
                                    isClearable
                                    name="datetime"
                                    className={"form-control"}
                                    selected={startDate}
                                    onChange={val => {
                                      setStartDate(val);
                                      setValue("start", val);
                                    }}
                                    dateFormat="dd-MM-yyyy"
                                    minDate={new Date()}
                                  />
                                </div> 
                              </GridItem>

                              <GridItem xs={12} sm={12} md={6}>
                                <div className="form-group" onChange={handleChange} >
                                <span>Task End Date</span><span className="required">*</span>
                                  <DatePicker
                                    placeholderText="End Date : dd/mm/yyyy"
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
                                </div> 
                              </GridItem>
                            </GridContainer><br/>

                            <GridContainer>
                              <GridItem xs={12} sm={12} md={12}>
                                <div className="form-group">
                                
                                <span>Task Members</span><span className="required">*</span>
                                <Multiselect
                                displayValue="value"
                                  options={uoptions}
                                  value={updateSelected}
                                  selectedValues={allSelectedMember}
                                  onChange={setUpdateSelected}
                                  onRemove={setUpdateSelected}
                                  onSelect={setUpdateSelected}
                                  placeholder="Select Task Members"
                                  showArrow={true}
                                />
                                </div> 
                              </GridItem>
                            </GridContainer><br/>

                            <GridContainer>
                              <GridItem xs={12} sm={12} md={12}>
                                <div className="form-group">
                                <span>Comments</span>
                                  <textarea className="form-control signup-input" placeholder="Comment" name="task_comment" value={uoption.task_comment} onChange={handleChange} />
                                </div> 
                              </GridItem>
                            </GridContainer>
                            
                          </CardBody>

                          <CardFooter>
                              <Button color="primary" type="submit" onClick={()=> { updateProject(task.task_id); } }>Save</Button>
                              <Button className="button" onClick={() => { close(); }}> Cancel </Button>
                          </CardFooter>
                          
                        </Card>
                    </form>
                    </GridItem>
                    </GridContainer>

                    </div>

                    )}
                    </Popup>

                    {/* <button onClick={()=>deleteTask(task.task_id)} className="project_delete_icon"><MdDelete/></button> */}


                    <Popup trigger={<span><MdDelete/></span>} modal>
                        {close => (
                          <div>
                          <Card>                            
                            <GridContainer>
                              <GridItem xs={12} sm={12} md={12}>
                                  <GridContainer>
                                    <GridItem>
                                      <div>
                                        <CardBody>
                                          <h4 className={classes.cardTitleWhite}>Are you sure you want to delete {task.task_title} task?</h4>
                                        </CardBody>
                                        <CardFooter>
                                            <Button onClick={()=>deleteTask(task.task_id)}>Yes</Button>
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
              
              </div></div>
            </CardHeader>

        </Card>
      </form>
      {/* <ToastContainer limit={1}/> */}

    </GridItem>

        )   
                  }
              }
    })
 }


<Card>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <div className="taskCompleted" onClick={()=> { taskCompleted("task_completed") , closeTaskCompleted("task_completed") }}>Task completed</div>
        </GridItem>
      </GridContainer>
</Card>

    {allTask.map((task)=>{

    if(task.task_delete == "no"){
      if(task.task_status == TaskCompleted){
        var person = task.task_person.split(",");

    return(

    <GridItem xs={12} sm={6} md={9}>
      <form>
        <Card className= "projects">
            <CardHeader color="primary" className="project-block">

              {/* <img src={`${server}/reactlogo.png`} className={classes.img}/> */}
              <div className="project-content">
                <h4 className="projectTitle">{task.task_title}</h4>
                <p className={classes.cardCategoryWhite}></p>

                <div className="icon-display">

                <span className={task.task_priority}>{task.task_priority}</span>
                {person.map((project_person) => {
                  return(
                    <div className="chip">
                      <span>{project_person}</span>
                    </div>
                  )
                  })
                }

                <GridItem>
                  <div className="icon-edit-delete">
                    <Popup trigger={<div><a className="bttn-design1" onClick={()=> { projectId(task.task_id) }  }><FiEdit/></a></div>}  className="popupReact"  modal>

                    {close => (
                    <div>
                    <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                    <form onSubmit={handleSubmit(onSubmit)}>              
                      <Card>
                        <CardHeader color="primary">

                        <GridContainer>
                          <GridItem>
                            <h4 className={classes.cardTitleWhite}>Edit Task</h4>
                            <p className={classes.cardCategoryWhite}>Update your task details</p>
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
                                  <span>Task Title</span><span className="required">*</span>
                                  <input type="text" className="form-control signup-input" placeholder="Task Title" name="task_title" value={uoption.task_title} onChange={handleChange} />
                                </div> 
                              </GridItem>
                            </GridContainer><br/>
                              
                            <GridContainer>
                              <GridItem xs={12} sm={12} md={12}>
                              <div className="form-group" name="project_name" onChange={handleChange} >
                                
                                <span>Select Project</span><span className="required">*</span>
                                <Multiselect
                                  displayValue="value"
                                  options={project_list}
                                  value={select_updateProject}
                                  selectedValues={selectedProject}
                                  singleSelect={true}
                                  onChange={setUpdateProject}
                                  onRemove={setUpdateProject}
                                  onSelect={setUpdateProject}
                                  placeholder="Project List"
                                  showArrow={true}
                                />
                                
                                </div> 
                              </GridItem>
                            </GridContainer><br/>

                            <GridContainer>  
                              <GridItem xs={12} sm={12} md={12}>
                                <div className="form-group">
                                <span>Task Description</span><span className="required">*</span>
                                  <textarea className="form-control signup-input" placeholder="Task Description" name="task_description" value={uoption.task_description} onChange={handleChange} />
                                </div> 
                              </GridItem>
                            </GridContainer><br/>

                            <GridContainer>
                              <GridItem xs={12} sm={12} md={12}>
                              <div className="form-group">
                                    <span>Task Status</span><span className="required">*</span>
                                      <select name="task_status" id="Status" className="form-control signup-input" value={uoption.task_status} onChange={handleChange}>
                                        <option value=""  disabled selected>Select Task Status</option>
                                        <option value="task_toDo">Task to do</option>
                                        <option value="taskOn_hold">Task On hold</option>
                                        <option value="task_Running">Task Running</option>
                                        <option value="task_completed">Task Completed</option>
                                      </select>
                                    <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                                  </div> 
                                </GridItem>
                              </GridContainer><br/>

                            <GridContainer>
                              <GridItem xs={12} sm={12} md={6}>
                                <div className="form-group">
                                <span>Task Priority</span><span className="required">*</span>
                                  <select id="priority" className="form-control signup-input" name="task_priority" value={uoption.task_priority} onChange={handleChange}  >
                                    <option value=""  disabled selected>Select Task Priority</option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                  </select>
                                  <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                                </div> 
                              </GridItem>

                              <GridItem xs={12} sm={12} md={6}>
                                <div className="form-group">
                                <span>Task Language</span><span className="required">*</span>
                                  <select id="Task_created_by" className="form-control signup-input" name="task_language" value={uoption.task_language} onChange={handleChange} >
                                    <option value="" disabled selected>Select Language</option>
                                    <option value="Wordpress">Wordpress</option>
                                    <option value="Shopify">Shopify</option>
                                    <option value="ReactJS">ReactJS</option>
                                    <option value="Laravel">Laravel</option>
                                    <option value="Android">Android</option>
                                    <option value="Bubble">Bubble</option>
                                  </select>
                                  <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                                </div> 
                              </GridItem>
                            </GridContainer><br/>

                            <GridContainer>  
                              <GridItem xs={12} sm={12} md={6}>
                                <div className="form-group" onChange={handleChange} >
                                <span>Task Start Date</span><span className="required">*</span>
                                  <DatePicker
                                    placeholderText="Start Date : dd/mm/yyyy"
                                    isClearable
                                    name="datetime"
                                    className={"form-control"}
                                    selected={startDate}
                                    onChange={val => {
                                      setStartDate(val);
                                      setValue("start", val);
                                    }}
                                    dateFormat="dd-MM-yyyy"
                                    minDate={new Date()}
                                  />
                                </div> 
                              </GridItem>

                              <GridItem xs={12} sm={12} md={6}>
                                <div className="form-group" onChange={handleChange} >
                                <span>Task End Date</span><span className="required">*</span>
                                  <DatePicker
                                    placeholderText="End Date : dd/mm/yyyy"
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
                                </div> 
                              </GridItem>
                            </GridContainer><br/>

                            <GridContainer>
                              <GridItem xs={12} sm={12} md={12}>
                                <div className="form-group">
                                
                                <span>Task Members</span><span className="required">*</span>
                                <Multiselect
                                displayValue="value"
                                  options={uoptions}
                                  value={updateSelected}
                                  selectedValues={allSelectedMember}
                                  onChange={setUpdateSelected}
                                  onRemove={setUpdateSelected}
                                  onSelect={setUpdateSelected}
                                  placeholder="Select Task Members"
                                  showArrow={true}
                                />
                                </div> 
                              </GridItem>
                            </GridContainer><br/>

                            <GridContainer>
                              <GridItem xs={12} sm={12} md={12}>
                                <div className="form-group">
                                <span>Comments</span>
                                  <textarea className="form-control signup-input" placeholder="Comment" name="task_comment" value={uoption.task_comment} onChange={handleChange} />
                                </div> 
                              </GridItem>
                            </GridContainer>
                            
                          </CardBody>

                          <CardFooter>
                              <Button color="primary" type="submit" onClick={()=> { updateProject(task.task_id); } }>Save</Button>
                              <Button className="button" onClick={() => { close(); }}> Cancel </Button>
                          </CardFooter>
                          
                        </Card>
                    </form>
                    </GridItem>
                    </GridContainer>

                    </div>

                    )}
                    </Popup>

                    {/* <button onClick={()=>deleteTask(task.task_id)} className="project_delete_icon"><MdDelete/></button> */}


                    <Popup trigger={<span><MdDelete/></span>} modal>
                        {close => (
                          <div>
                          <Card>                            
                            <GridContainer>
                              <GridItem xs={12} sm={12} md={12}>
                                  <GridContainer>
                                    <GridItem>
                                      <div>
                                        <CardBody>
                                          <h4 className={classes.cardTitleWhite}>Are you sure you want to delete {task.task_title} task?</h4>
                                        </CardBody>
                                        <CardFooter>
                                            <Button onClick={()=>deleteTask(task.task_id)}>Yes</Button>
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
              
              </div></div>
            </CardHeader>

        </Card>
      </form>
      {/* <ToastContainer limit={1}/> */}

    </GridItem>

        )   
                  }
              }
    })
 }

    {/* </GridItem> */}

    </GridContainer>
    </div>
  );
}

Dashboard.layout = Admin;

export default Dashboard;
