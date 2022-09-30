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
import SuperUser from "layouts/SuperUser.js";
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
import { useCookies } from 'react-cookie';
import axios from "axios";
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css';
import "react-quill/dist/quill.bubble.css";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import AccordionSummary from "@material-ui/core/AccordionSummary";

const ReactQuill = dynamic(import('react-quill'), { ssr: false });

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

function SubTask( { project_details , User_name , allTask } ) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [cookies, setCookie] = useCookies(['name']);

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

  const [comments, setcomments] = useState([]);

  const projectId = async(id) =>{
    // console.log('update project id');
    // console.log(id);
    var comment = await axios.post(`${server}/api/comment/userComments`, { task_id: id });
    setcomments(comment.data)

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
  
      const res = await fetch(`${server}/api/project/update_subtask`,{
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
    
    const res = await fetch(`${server}/api/subtask/add_subtask`,{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify({task_person:selected, project_name:p_selected, task_status:result.task_status , task_title:result.task_title, task_description:result.task_description, task_language:result.task_language, task_comment:result.task_comment, task_priority:result.task_priority, task_start: result.start , task_deadline: result.end }),
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

const [ u_Comment, setCommentValue ] = useState("");
const modules = {
  toolbar: {
    container: [
    [{ 'font': [] }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline'],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{ 'align': [] }],
    [{ 'color': [] }, { 'background': [] }],
    ['clean'],
    ['link', 'image', 'video']
  ],
  handlers: {
      // image: imageHandler,
  }
 }
}

const sendMessage = async (task_id) => {
  const date = new Date().toLocaleString();
  console.log("date");
  console.log(date);

  var addComment = await axios.post(`${server}/api/comment/addcomment`, {  username: cookies.name, message: u_Comment, task_id: task_id, created_D: date });
  console.log(addComment)
  console.log(cookies.name)
  router.reload(`${server}/superuser/project_module`);
}

console.log("project");
console.log(u_Comment);

const [commentEdit, setEditComment] = useState();

const editComment = async( id ) =>{
  console.log("id");
  console.log(id);

  var commentId = await axios.post(`${server}/api/comment/comment_id`, { comment_id: id, user: cookies.name });
  console.log(commentId.data[0]);

  if(commentId.data != ""){
    setEditComment(commentId.data[0].comment);
    console.log(commentEdit);
  }
}

const updateComment = async(id, comment) =>{
  // console.log(comment);
  // console.log(id);
  var comment = await axios.post(`${server}/api/comment/updateComment`, { comment_id: id, user: cookies.name, comment:comment });
  router.reload(`${server}/user/usertask`);
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

    {/* <GridItem xs={6} sm={6} md={8}> */}
    {/* <span className="heading">Task to do</span> */}

    {allTask.map((task)=>{

    if(task.task_delete == "no"){

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
                <GridItem>
                  <div className="icon-edit-delete">
                    <Popup trigger={<div><a className="bttn-design1" onClick={()=> { projectId(task.task_id) }  }><FiEdit/></a></div>}  className="popupReact" modal nested>

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
                           
                          </CardBody>

                          <CardFooter>
                              <Button color="primary" type="submit" onClick={()=> { updateProject(task.task_id); } }>Save</Button>
                              <Button className="button" onClick={() => { close(); }}> Cancel </Button>
                          </CardFooter>
                          
                          <CardBody>
                      <GridContainer>
                        <GridItem>
                          <ReactQuill modules={modules} theme="snow" onChange={setCommentValue} />
                            <div onClick={()=> sendMessage(task.task_id)}>Comment</div>
                        </GridItem>
                      </GridContainer>
                    
                    {comments.map((superuserComment)=>{
                      return(
                        <span>
                          <GridContainer>
                            <GridItem>
                              <span>{superuserComment.username}</span>
                            </GridItem>
                          </GridContainer>

                          <GridContainer>
                                            <GridItem>
                                              <div>

                                              <ReactQuill value={superuserComment.comment} theme="bubble" readOnly />

      <Popup trigger={ <span><button onClick={()=>{ editComment(superuserComment.id)} } disabled={ superuserComment.username != cookies.name }>Edit</button></span> }
        className="popupReact"
        modal
      >
        {close => (
                              <Card>
                                <CardBody>
                                      <div className={classes.close}>
                                        <a onClick={close}>&times;</a>
                                      </div>

                                  <GridContainer>
                                    <GridItem xs={12} sm={12} md={12} >
                                      <form>

                                        <ReactQuill modules={modules} theme="snow" onChange={setEditComment} value={commentEdit} />

                                      </form>
                                    </GridItem>
                                  </GridContainer>

                                  <CardFooter>
                                      <Button color="primary" type="submit"  onClick={() => { updateComment(superuserComment.id, commentEdit) }}>Update</Button>
                                      <Button className="button" onClick={() => { close(); }}> Cancel </Button>
                                  </CardFooter>
                                </CardBody>
                              </Card>
        )}
        
      </Popup>

                                              </div>
                                            </GridItem>
                                          </GridContainer>

                        </span>
                      )
                    })

                    }
                    </CardBody>

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
    })
 }

    {/* </GridItem> */}

    </GridContainer>
    </div>
  );
}

SubTask.layout = SuperUser;

export default SubTask;
