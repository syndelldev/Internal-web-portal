import React, { useEffect, useMemo, useRef } from "react";
import { useState } from "react";
import { useRouter } from 'next/router';
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons

// layout for this page
import Modules from "../layouts/Modules";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { IoMdArrowDropdown } from "react-icons/io";
import { useForm  } from 'react-hook-form';
import { server } from 'config';
import { useCookies } from 'react-cookie';
import Popup from "reactjs-popup";
import DatePicker from "react-datepicker";
import Multiselect from "multiselect-react-dropdown";
import { FaArrowDown,FaArrowUp } from 'react-icons/fa';
import { FiEdit } from "react-icons/fi";
import { MdDelete } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import dynamic from "next/dynamic";

// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import Accordion from "@material-ui/core/Accordion";
// import AccordionDetails from "@material-ui/core/AccordionDetails";
// import Typography from "@material-ui/core/Typography";
// import AccordionSummary from "@material-ui/core/AccordionSummary";

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");

    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
  },
  {
    ssr: false
  }
);

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

  const res = await fetch(`${server}/api/project`);
  const project_details = await res.json();

  const response = await fetch(`${server}/api/admin`)
  const User_name = await response.json();

  const task = await fetch(`${server}/api/subtask`)
  const allTask = await task.json();

  const u_task = await fetch(`${server}/api/user/user_task`, {
    headers: {
      'Access-Control-Allow-Credentials': true,
      Cookie: context.req.headers.cookie
    },
  })
  const userTask = await u_task.json();

  const department = await fetch(`${server}/api/user/user_department`);
  const user_Department = await department.json();

  const lang = await fetch(`${server}/api/language`)
  const language = await lang.json();

  const pri = await fetch(`${server}/api/priority`)
  const priority = await pri.json();

  const stat = await fetch(`${server}/api/taskStatus`)
  const status = await stat.json();

  return{ props: {project_details, User_name, allTask, userTask, language, user_Department, priority, status } }
}

function Dashboard( { project_details , User_name , allTask, userTask, language, user_Department, priority, status } ) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  // get role from cookies
  const [cookies, setCookie] = useCookies(['name']);

  // redirect page if cookies is not set
  useEffect(() => {
    if(!cookies.name){
      router.push(`${server}/login`);
    }
  });
    
  if(cookies.Role_id == "2"){
    var allTask = userTask;
  }else{
    var allTask = allTask;
  }

  const deleteTask = async(id) =>{
    console.log('delete');
    console.log(id);

    const res = await fetch(`${server}/api/subtask/deleteTask/${id}`);
    router.reload(`${server}/tasks`);
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
    task_person: ""
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

  const [updateSelected, setUpdateSelected] = React.useState([]);

  // language dropdown options
  const [all_Language, setAllLanguage] = useState([]);
  useEffect(() =>{
    const u_data = async() =>{
  
      const getLanguage = [];
      language.map((language)=>{
        getLanguage.push( {'label' :language.language_name, 'value' :language.language_name} );
      });
      setAllLanguage(getLanguage);
    }
    u_data();
  },[]);
  // set and get selected value of language
  const [u_Language, setLanguage] = useState([]);

  // priority dropdown options
  const [all_Priority, setAllPriority] = useState([]);
  useEffect(() =>{
    const u_data = async() =>{
  
      const getPriority = [];
      priority.map((priority)=>{
        getPriority.push( {'label' :priority.priority_name, 'value' :priority.priority_name} );
      });
      setAllPriority(getPriority);
    }
    u_data();
  },[]);
  // set and get selected value of priority
  const [u_Priority, setPriority] = useState([]);

  // status dropdown options
  const [all_Status, setAllStatus] = useState([]);
  useEffect(() =>{
    const u_data = async() =>{
  
      const getStatus = [];
      status.map((status)=>{
        getStatus.push( {'label' :status.taskStatus_name, 'value' :status.taskStatus_name} );
      });
      setAllStatus(getStatus);
    }
    u_data();
  },[]);
  // set and get selected value of status
  const [u_Status, setStatus] = useState([]);

  const projectId = async(id) =>{
    var comment = await axios.post(`${server}/api/comment/userComments`, { task_id: id });
    setcomments(comment.data);

    const response = await fetch(`${server}/api/subtask/${id}`)
    const update_data = await response.json();
    console.log(update_data[0]);

    const udata = update_data[0];
    const selectedMember = (udata.task_person).split(",");

    const getAllname = [];
    selectedMember.map((user)=>{
      getAllname.push( {'label' :user, 'value' :user} );
    });

    // set project name from database for update project name
    const getProject = [];
    getProject.push( {'label' :udata.project_name, 'value' :udata.project_name} );

    // set language name from database for update language
    const getLanguage = [];
    getLanguage.push( {'label' :udata.task_language, 'value' :udata.task_language} );

    // set department name from database for update department
    const getDepartment = [];
    getDepartment.push( {'label' :udata.task_department, 'value' :udata.task_department} );

    // set priority from database for update priority
    const getPriority = [];
    getPriority.push( {'label' :udata.task_priority, 'value' :udata.task_priority} );

    // set status from database for update status
    const getStatus = [];
    getStatus.push( {'label' :udata.task_status, 'value' :udata.task_status} );

    setProject(getProject);
    setStatus(getStatus);
    setLanguage(getLanguage);
    setPriority(getPriority);
    setUpdateSelected(getAllname);
    setUpdate(udata);
    setStartDate(new Date(udata.task_start));
    setEndDate(new Date(udata.task_deadline));

    }
    const [p_selected, setProject] = useState([]);

    const toastId = React.useRef(null);
    const updateProject = async() =>{

      const allMember = [];
      for(var i=0; i<updateSelected.length; i++){
            allMember.push(updateSelected[i].value);
      }
    
        console.log("project name");
        console.log(p_selected);
  
      if( uoption.task_id == "" || allMember  == ""  || u_Status == "" || uoption.task_title == ""  || uoption.task_description == ""  ||  u_Language == ""  || u_Priority == ""  || startDate == ""  || endDate == "" ){
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

      console.log("update task");
      console.log(startDate);
      
    // start date get year, month, day for database value
    var s_Date = startDate.getFullYear() + '-' + startDate.getMonth() + '-' + startDate.getDate();
    
    // end date get year, month, day for database value
    var e_Date = endDate.getFullYear() + '-' + endDate.getMonth() + '-' + endDate.getDate();

    // get selected language
    if(u_Language != ""){
      var Language = u_Language[0].value;
    }

    // get selected priority
    if(u_Priority != ""){
      var Priority = u_Priority[0].value;
    }

    // get selected status
    if(u_Status != ""){
      var Status = u_Status[0].value;
    }

      const res = await fetch(`${server}/api/subtask/update_subtask`,{
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({ task_id:uoption.task_id, project_name: p_selected , task_person: allMember, task_status: Status, task_title: uoption.task_title , task_description:uoption.task_description , task_language: Language, task_priority: Priority, task_start: startDate , task_deadline: endDate }),
      });
      
      if(!toast.isActive(toastId.current)) {
        toastId.current = toast.success('Task updated Successfully!🎉', {
            position: "top-right",
            autoClose:1000,
            theme: "colored",
            hideProgressBar: true,
          });
        }
        router.reload(`${server}/tasks`);
    }
  }
  
    //New project add start date & end date
    const [addStartDate, setStart_Date] = useState();
    const [addEndDate, setEnd_Date] = useState();
  
  const onSubmit = async (result) =>{
    
    console.log(result);
    console.log(selected);

    
    if(selected == "" || p_selected == "" ||  result.task_status == "" ||  result.task_title  == "" || result.task_description == "" || result.task_language == "" || result.task_priority == "" ||  result.start == "" ||  result.end == "" ){
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
    
    // start date get year, month, day for database value
    var s_Date = result.start.getFullYear() + '-' + result.start.getMonth() + '-' + result.start.getDate();
    
    // end date get year, month, day for database value
    var e_Date = result.end.getFullYear() + '-' + result.end.getMonth() + '-' + result.end.getDate();

    if(u_Language != ""){
      var Language = u_Language[0].value;
    }

    if(u_Priority != ""){
      var Priority = u_Priority[0].value;
    }

    const res = await fetch(`${server}/api/subtask/add_subtask`,{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify({task_person:selected, project_name:p_selected, task_status:result.task_status , task_title:result.task_title, task_description:result.task_description, task_language:Language, task_createdBy:cookies.name , task_priority:Priority, task_start: s_Date , task_deadline: e_Date }),
    })

    if(res.status==200)
    {
      // alert("success");
      if(!toast.isActive(toastId.current)) {
        toastId.current = toast.success('Task added Successfully!🎉', {
            position: "top-right",
            autoClose:1000,
            theme: "colored",
            hideProgressBar: true,
            });
        }
      router.reload(`${server}/tasks`);
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
    project_details.map((project)=>{
      getUsername.push( {'label' :project.project_title , 'value' :project.project_title } );
    });
    setLists(getUsername);
  }
  u_data();
},[]);


// status update function only for user
const updateStatus = async(t_status) =>{

  const res = await fetch(`${server}/api/subtask/update_taskStatus`,{
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task_id: uoption.task_id, task_status: t_status }),
  });
  if(!toast.isActive(toastId.current)) {
    toastId.current = toast.success('Status updated Successfully!', {
        position: "top-right",
        autoClose:1000,
        theme: "colored",
        hideProgressBar: true
      });
    }
  router.reload(`${server}/tasks`);
}

const [comments, setcomments] = useState([]);
// get and set comment values in editor
const [ u_Comment, setCommentValue ] = useState("");
// quill ref
const quillRef = useRef(null);

// Upload image in project public/upload_img folder and show image in editor
const imageHandler = () => {

  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();

  input.onchange = async () => {
      let data = null;
      const file = input.files ? input.files[0] : null;

      if (/^image\//.test(file.type)) {          
      const formData = new FormData();

      formData.append('image', file);
      formData.getAll('image');

      // upload image API
      const res = await fetch(`${server}/api/upload`,{ 
          method: 'POST',
          body: formData,
      });
      data = await res.json();
      console.log(data);
      console.log(data.files.image.newFilename);

      // Save current cursor 
      const range = quillRef.current.getEditor().getSelection();
      const quill = quillRef.current.getEditor();
      // show uploaded image in editor
      quill.insertEmbed( range.index, "image", `${server}/upload_img/${data.files.image.newFilename}${data.files.image.originalFilename}`);
      quillRef.current.getEditor().setSelection(range.index + 1);

  }else{

    // only upload images toast error
    if(! toast.isActive(toastId.current)) {
      toastId.current = toast.error('Please upload only image', {
          position: "top-right",
          autoClose:5000,
          theme: "colored",
          closeOnClick: true,
          hideProgressBar: true,
        });
    }

  }
}
}

// quill modules
const modules = useMemo(() => ({
  toolbar: {
      container: [
          [{ 'font': [] }],
          [{ 'size': ['small', false, 'large', 'huge'] }],
          ['bold', 'italic', 'underline'],
          [{'list': 'ordered'}, {'list': 'bullet'}],
          [{ 'align': [] }],
          [{ 'color': [] }, { 'background': [] }],
          ['clean'],
          ['link'],
          ['image'],
          ['video']
      ],
      handlers: {
        image: imageHandler
      }
  },
}), []);

// add comments
const sendMessage = async (task_id) => {
  const date = new Date().toLocaleString();
  console.log("date");
  console.log(date);

  var addComment = await axios.post(`${server}/api/comment/addcomment`, {  username: cookies.name, message: u_Comment, task_id: task_id, created_D: date });
  console.log(addComment)
  console.log(cookies.name)

  if(!toast.isActive(toastId.current)) {
    toastId.current = toast.success('Comment added successfully!', {
        position: "top-right",
        autoClose:1000,
        theme: "colored",
        hideProgressBar: true
      });
  }

}

console.log("project");
console.log(u_Comment);

const [commentEdit, setEditComment] = useState();

// comment ID API
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

// update comment API
const updateComment = async(id, comment) =>{
  var comment = await axios.post(`${server}/api/comment/updateComment`, { comment_id: id, user: cookies.name, comment:comment });

  if(!toast.isActive(toastId.current)) {
    toastId.current = toast.success('Comment updated successfully!', {
        position: "top-right",
        autoClose:1000,
        theme: "colored",
        hideProgressBar: true,
      });
  }
  router.reload(`${server}/tasks`);
}

    const [onhold_title, setonhold_title] = useState(false);
    const [todo_title, settodo_title] = useState(false);
    const [running_title, setrunning_title] = useState(false);
    const [completed_title, setcompleted_title] = useState(false);

    const [showTime, setshowTime] = useState(null);
    const toggle=(task_id)=>{
      // alert(task_id)
      if(showTime==task_id){
        return setshowTime(null)
      }
      setshowTime(task_id)
    }

  //for comments Declration  
  const getData = async (task_id)=>{
    var comment = await axios.post(`${server}/api/comment/comment`, { task_id: task_id });
    setcomments(comment.data)
  }

   //for Time Declration

   const [Time, setTime] = useState([]);
   console.log(Time)
   
   const [TimeData,setTimeData] = useState([])
   const [dropdown_Comments, setDropdownComments] = useState([]);

    const getTime = async (task_id) =>{
    var timedata = await axios.post(`${server}/api/comment/task_time`, { task_id: task_id, user_id:cookies.Id });
    setTime(timedata.data[0])
    setTimeData(timedata.data)

    const comment_Data = await axios.post(`${server}/api/comment/userComments`, { task_id: task_id });
    console.log("task id");
    setDropdownComments(comment_Data.data);
  }
  console.log(TimeData)
  const [userdata, setuserdata] = useState({
    estimate_time:"",
    spent_time: ""
  });
  
  useEffect(()=>{
    setuserdata(Time);
  },[Time])
  console.log("userdata",userdata)
  const handleChangePanel = ({ target: { name, value } }) =>{
    setuserdata({ ...userdata, [name]: value });
  }
  const [estimate, setestimate] = useState('');
  const [spent, setspent] = useState('');
  

  const insert_time = async (task_id)=>{
    var addTime = await axios.post(`${server}/api/comment/addtasktime`, { task_id:task_id, user_id:cookies.Id, username: cookies.name, estimate:estimate , spent:spent });
    console.log(addTime.data)
    // router.reload(`${server}/tasks`);
  }
  
  const update_tasktime = async (task_id)=>{
    var updateTime = await axios.put(`${server}/api/comment/update_tasktime`, { task_id:task_id, user_id:cookies.Id, estimate:userdata.estimate_time , spent:userdata.spent_time });
    console.log(updateTime)
    // router.reload(`${server}/tasks`);
  }

  // date range
  // const [dateRange, setDateRange] = useState([null, null]);

      // startdate set and get value
      const [startDates, setstartDates] = useState(null);
      // enddate set and get value
      const [endDates, setendDates] = useState(null);
      // get selected dates projects list
      const [dateDetails, setDateDetails] = useState(allTask);
    
      // daterange function onClick
      const date_Range = async() =>{
        if(startDates != null && endDates != null && endDates >= startDates){

          const res = await fetch(`${server}/api/project/dateRange_Tasks`,{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify({ dateStart: startDates, dateEnd: endDates }),
          })
          const date_Data=await res.json()
          
          if(res.status==200)
          {
            if(cookies.Role_id==1 || cookies.Role_id==3){
              setDateDetails(date_Data);
              settodo_title(true);
              setonhold_title(true);
              setrunning_title(true);
              setcompleted_title(true);
            }
          }

          const response = await fetch(`${server}/api/project/dateRange_TaskUser`,{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify({ dateStart: startDates, dateEnd: endDates, user: cookies.name }),
          })
          const date_uData=await response.json();
          
          if(response.status==200)
          {
            if(cookies.Role_id==2){
              setDateDetails(date_uData);
              settodo_title(true);
              setonhold_title(true);
              setrunning_title(true);
              setcompleted_title(true);
            }
          }
        }else if(startDates != null && endDates != null && endDates < startDates){
          // Improper startDate and endDate toast error
          if(! toast.isActive(toastId.current)) {
            toastId.current = toast.error('End date can`t be before its start!', {
              position: "top-right",
              autoClose:2000,
              theme: "colored",
              closeOnClick: true,
              hideProgressBar: true,
            });
          }
        }else{
          // select startDate and endDate toast error
          if(! toast.isActive(toastId.current)) {
            toastId.current = toast.error('Please select dates range!',{
              position: "top-right",
              autoClose:2000,
              theme: "colored",
              closeOnClick: true,
              hideProgressBar: true,
            });
          }
        }
      }


  return (
    <div>
    <div className="buttonalign" hidden={cookies.Role_id == "2"}>
    <GridContainer>
        <GridItem>

          <Popup trigger={<div hidden={cookies.Role_id == "2"}><button className="bttn-design">Add Task</button></div>}  className="popupReact"  modal>

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
                      
                    <span>Project name</span><span className="required">*</span>
                      <Multiselect
                        displayValue="value"
                        options={project_list}
                        value={p_selected}
                        selectionLimit="1"
                        onChange={setProject}
                        onRemove={setProject}
                        onSearch={function noRefCheck(){}}
                        onSelect={setProject}
                        placeholder="Project List"
                        showArrow={true}
                        customCloseIcon={<></>}
                        disable={cookies.Role_id == "2"}
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
                      <Multiselect
                          displayValue="value"
                          options={all_Priority}
                          value={u_Priority}
                          selectionLimit="1"
                          onChange={setPriority}
                          onRemove={setPriority}
                          onSearch={function noRefCheck(){}}
                          onSelect={setPriority}
                          placeholder="Task Priority"
                          showArrow={true}
                          customCloseIcon={<></>}
                          disable={cookies.Role_id == "2"}
                        />

                        {/* <select name="priority" id="priority" className="form-control signup-input" {...register('task_priority', {required:true ,message:'Please select atleast one option', })}>
                          <option value=""  disabled selected>Select Task Priority</option>
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                        <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span> */}
                        {/* <div className="error-msg">{errors.task_priority && <span>{errors.task_priority.message}</span>}</div> */}
                      </div> 
                    </GridItem>

                    <GridItem xs={12} sm={12} md={6}>
                      <div className="form-group">
                      <span>Task Language</span><span className="required">*</span>
                      <Multiselect
                        displayValue="value"
                        options={all_Language}
                        value={u_Language}
                        selectionLimit="1"
                        onChange={setLanguage}
                        onRemove={setLanguage}
                        onSearch={function noRefCheck(){}}
                        onSelect={setLanguage}
                        placeholder="Task Language"
                        showArrow={true}
                        customCloseIcon={<></>}
                        disable={cookies.Role_id == "2"}
                      />
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
                          selected={addStartDate}
                          onChange={val => {
                            setStart_Date(val);
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
                          selected={addEndDate}
                          onChange={val => {
                            setEnd_Date(val);
                            setValue("end", val);
                          }}
                          dateFormat="dd-MM-yyyy"
                          minDate={addStartDate}
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
                        customCloseIcon={<></>}
                        disable={cookies.Role_id == "2"}
                      />
                        {/* <div className="error-msg">{errors.task_person && <span>{errors.task_person.message}</span>}</div> */}
                      </div> 
                    </GridItem>
                  </GridContainer><br/>
                 
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
            <button className="dropdown_button">Departments</button>
                <div className="department-link">
                {user_Department.map((department)=>{
                    return(
                      <span>
                        <a href={`${server}/project_department/${department.department_name}`}>{department.department_name}</a>
                      </span>
                    )                      
                  }
                )}
                </div>
            </div>
          </GridItem>

          <GridItem>
            <div className="department_dropdown">
              <button className="dropdown_button">Languages</button>
                  <div className="department-link">
                  {language.map((language)=>{
                      return(
                        <span>
                          <a href={`${server}/project_language/${language.language_name}`}>{language.language_name}</a>
                        </span>
                      )
                    }
                  )}
                  </div>
            </div>
          </GridItem>

</GridContainer>
</div>



<GridContainer>

  <div className="main_task_title">
  <div className="Project-title">Tasks</div>
    <GridContainer>
      <GridItem>
        <button className="bttn-design" onClick={()=>{settodo_title(true), setonhold_title(true), setrunning_title(true), setcompleted_title(true) }}>Expand All</button>
      </GridItem>

      <GridItem>
        <button className="bttn-design" onClick={()=>{settodo_title(false), setonhold_title(false), setrunning_title(false), setcompleted_title(false) }}>Collapse All</button>
      </GridItem>

      {/* select start date & end date for Date Filter */}
      {/* Date filter select dates start */}
      <strong>Task Date Filter:</strong>
            <GridItem>
              <DatePicker
                placeholderText="Start date"
                className={"form-control"}
                selected={startDates}
                onChange={(update) => {
                  setstartDates(update);
                }}
                isClearable={true}
                dateFormat="dd/MM/yyyy"
                showYearDropdown={true}
                showMonthDropdown={true}
              />
            </GridItem>

            <GridItem>
              <DatePicker
                placeholderText="End date"
                className={"form-control"}
                selected={endDates}
                onChange={(update) => {
                  setendDates(update);
                }}
                isClearable={true}
                dateFormat="dd/MM/yyyy"
                showYearDropdown={true}
                showMonthDropdown={true}
                minDate={startDates}
              />
            </GridItem>
            <button className="bttn-design" onClick={() => date_Range()}>Enter</button>
      {/* Date filter select dates end */}
    </GridContainer>
  </div>



</GridContainer>


  <GridContainer>
    <Card>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <div className="task_title" onClick={()=> { settodo_title(!todo_title) }}>Task to do {todo_title ? <FaArrowUp/>:<FaArrowDown/>}  </div> 
        </GridItem>
      </GridContainer>
    </Card>
    {todo_title ? (
      <>
      {dateDetails.length > 0 ? (
        <table className="project-data" >
          <tr className="project-data-title">
            <th className="status">Project Name</th>
            <th className="title">Task name </th>
            <th>Priority</th>
            <th className="assignee">Assignee</th>
            <th className="view-edit">View & Edit</th>
          </tr>
          {dateDetails.map((task)=>{
            if(task.task_status == "Task to do"){
              var person = task.task_person.split(",");
              const MySQLDate  = task.task_deadline;
              let date = MySQLDate.replace(/[-]/g, '/').substr(0,10);
              return(
                <>
                  <tr key={task.task_id} onClick={()=>{toggle(task.task_id);getData(task.task_id);getTime(task.task_id);}} className="expand_dropdown">
                    <td className="project-title-table">{task.project_name}</td>
                    <td><h4 className="projectTitle">{task.task_title}</h4></td>
                    <td className="priority-data"><p className={task.task_priority}>{task.task_priority}</p></td>

                    <td className="project-priority-person">
                      {person.length>2 ? (
                        <>
                          <div className="chip">
                            <span>{person[0]}</span>
                          </div>
                          <div className="chip">
                            <span>{person[1]}</span>
                          </div>
                            {/* Edit popUp Start*/}
                            <Popup trigger={<a className="icon-edit-delete"><div className='chip'><span>Load more</span></div></a>} className="popupReact"  position="left">
                            {close => (
                              <div className="popup-align">
                                <Card>
                                  <CardBody>
                                    <CardHeader>
                                      <GridContainer>
                                        <GridItem>
                                          <strong>Assignee</strong>
                                        </GridItem>
                                        <GridItem>
                                          <div className={classes.close}>
                                            <a onClick={close}>&times;</a>
                                          </div>
                                        </GridItem>
                                      </GridContainer>
                                    </CardHeader>

                                    <GridContainer>
                                      <GridItem>
                                        {person.map((user)=>{
                                          return(
                                            <span>
                                              <span className="members" title={user}>{user}</span>
                                            </span>
                                          )
                                        })}
                                      </GridItem>
                                    </GridContainer>
                                  </CardBody>
                                </Card>
                              </div>
                            )}
                            </Popup>
                            {/*Edit popup End*/}
                        </>
                        ):(
                        <span>
                          {person.map((user)=>{
                            return(
                              <div className="chip">
                                <span className="members" title={user}>{user}</span>
                              </div>
                            )
                          })}
                        </span>
                      )}
                    </td>

                    <td className="project-edit-table">
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

                              <div className={classes.close}>
                                <a onClick={close}>&times;</a>
                              </div>
                          </GridContainer>

                          </CardHeader>
                          
                            <CardBody>

                              <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>                      
                                  <div className="form-group">
                                    <span>Task Title</span><span className="required">*</span>
                                    <input type="text" className="form-control signup-input" disabled={cookies.Role_id == "2"} placeholder="Task Title" name="task_title" value={uoption.task_title} onChange={handleChange} />
                                  </div> 
                                </GridItem>
                              </GridContainer><br/>
                                
                              <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                <div className="form-group" name="project_name" onChange={handleChange} >
                                  
                                  <span>Project Name</span><span className="required">*</span>
                                  <Multiselect
                                    displayValue="value"
                                    options={project_list}
                                    value={p_selected}
                                    selectionLimit="1"
                                    selectedValues={p_selected}
                                    onChange={setProject}
                                    onRemove={setProject}
                                    onSelect={setProject}
                                    placeholder="Project List"
                                    showArrow={true}
                                    customCloseIcon={<></>}
                                    disable={cookies.Role_id == "2"}
                                  />
                                  </div> 
                                </GridItem>
                              </GridContainer><br/>

                              <GridContainer>  
                                <GridItem xs={12} sm={12} md={12}>
                                  <div className="form-group">
                                  <span>Task Description</span><span className="required">*</span>
                                    <textarea className="form-control signup-input" disabled={cookies.Role_id == "2"} placeholder="Task Description" name="task_description" value={uoption.task_description} onChange={handleChange} />
                                  </div> 
                                </GridItem>
                              </GridContainer><br/>

                            <GridContainer>
                              <GridItem xs={12} sm={12} md={12}>
                                <div className="form-group" hidden={cookies.Role_id != "2"}>
                                    <span>Task Status</span><span className="required">*</span>
                                    <Multiselect
                                        displayValue="value"
                                        options={all_Status}
                                        value={u_Status}
                                        selectedValues={u_Status}
                                        selectionLimit="1"
                                        onChange={setStatus}
                                        onRemove={setStatus}
                                        onSearch={function noRefCheck(){}}
                                        onSelect={setStatus}
                                        placeholder="Task Priority"
                                        showArrow={true}
                                        customCloseIcon={<></>}
                                        disable={cookies.Role_id == "2"}
                                      />
                                      {/* <select name="task_status" id="Status" className="form-control signup-input" 
                                      onChange={(e)=> { updateStatus(e.target.value), close() }} 
                                      value={uoption.task_status} >
                                        <option value="" disabled selected>Select Task Status</option>
                                        <option value="task_toDo">Task to do</option>
                                        <option value="taskOn_hold">Task On hold</option>
                                        <option value="task_Running">Task Running</option>
                                        <option value="task_completed">Task Completed</option>
                                      </select>
                                    <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span> */}
                                  </div> 
                                  <div className="form-group" hidden={cookies.Role_id == "2"}>
                                    <span>Task Status</span><span className="required">*</span>
                                    <Multiselect
                                        displayValue="value"
                                        options={all_Status}
                                        value={u_Status}
                                        selectedValues={u_Status}
                                        selectionLimit="1"
                                        onChange={setStatus}
                                        onRemove={setStatus}
                                        onSearch={function noRefCheck(){}}
                                        onSelect={setStatus}
                                        placeholder="Task Priority"
                                        showArrow={true}
                                        customCloseIcon={<></>}
                                        disable={cookies.Role_id == "2"}
                                      />
                                  </div> 
                                </GridItem>
                              </GridContainer><br/>

                              <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                                  <div className="form-group">
                                  <span>Task Priority</span><span className="required">*</span>
                                  <Multiselect
                                      displayValue="value"
                                      options={all_Priority}
                                      value={u_Priority}
                                      selectedValues={u_Priority}
                                      selectionLimit="1"
                                      onChange={setPriority}
                                      onRemove={setPriority}
                                      onSearch={function noRefCheck(){}}
                                      onSelect={setPriority}
                                      placeholder="Task Priority"
                                      showArrow={true}
                                      customCloseIcon={<></>}
                                      disable={cookies.Role_id == "2"}
                                    />
                                  </div> 
                                </GridItem>

                                <GridItem xs={12} sm={12} md={6}>
                                  <div className="form-group">
                                  <span>Task Language</span><span className="required">*</span>
                                  <Multiselect
                                    displayValue="value"
                                    options={all_Language}
                                    value={u_Language}
                                    selectionLimit="1"
                                    onChange={setLanguage}
                                    onRemove={setLanguage}
                                    onSearch={function noRefCheck(){}}
                                    onSelect={setLanguage}
                                    placeholder="Task Language"
                                    showArrow={true}
                                    selectedValues={u_Language}
                                    customCloseIcon={<></>}
                                    disable={cookies.Role_id == "2"}
                                  />

                                  </div> 
                                </GridItem>
                              </GridContainer><br/>

                              <GridContainer>  
                                <GridItem xs={12} sm={12} md={6}>
                                  <div className="form-group" onChange={handleChange} disabled={cookies.Role_id == "2"} >
                                  <span>Task Start Date</span><span className="required">*</span>
                                    <DatePicker
                                      placeholderText="Start Date : dd/mm/yyyy"
                                      // isClearable
                                      name="datetime"
                                      className={"form-control"}
                                      selected={startDate}
                                      onChange={val => {
                                        setStartDate(val);
                                        setValue("start", val);
                                      }}
                                      dateFormat="dd-MM-yyyy"
                                      minDate={new Date()}
                                      disabled={cookies.Role_id == "2"}
                                    />
                                  </div> 
                                </GridItem>

                                <GridItem xs={12} sm={12} md={6}>
                                  <div className="form-group" onChange={handleChange} disabled={cookies.Role_id == "2"} >
                                  <span>Task End Date</span><span className="required">*</span>
                                    <DatePicker
                                      placeholderText="End Date : dd/mm/yyyy"
                                      // isClearable
                                      name="datetime1"
                                      className={"form-control"}
                                      selected={endDate}
                                      onChange={val => {
                                        setEndDate(val);
                                        setValue("end", val);
                                      }}
                                      dateFormat="dd-MM-yyyy"
                                      minDate={startDate}
                                      disabled={cookies.Role_id == "2"}
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
                                    // customCloseIcon={<></>}
                                    disable={cookies.Role_id == "2"}
                                  />
                                  </div> 
                                </GridItem>
                              </GridContainer><br/>
                            </CardBody>

                            <CardFooter hidden={cookies.Role_id == "2"}>
                                <Button color="primary" type="submit" onClick={()=> { updateProject(task.task_id) } }  hidden={cookies.Role_id == "2"}>Save</Button>
                                <Button className="button" onClick={() => { close(); }} hidden={cookies.Role_id == "2"}> Cancel </Button>
                            </CardFooter>

                            <CardBody>

                            <GridContainer>
                              <GridItem xs={12} sm={12} md={12} >
                                {/*Time Modulule*/}
                                {TimeData.length==0?(
                                        <>
                                          <form onSubmit={handleSubmit(insert_time)} method="POST">
                                          <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <input value={task.task_id} type="hidden"/>
                                                <label>Estimate Time</label>
                                                <input type="text" 
                                                    className="form-control signup-input"
                                                    value={estimate} 
                                                    onChange={(e)=>setestimate(e.target.value)} 
                                                    name="estimate_time"
                                                />
                                                <div className="error-msg">{errors.estimate_time && <p>{errors.estimate_time.message}</p>}</div>
                                            </GridItem>
                                          
                                            <GridItem xs={12} sm={12} md={6}>
                                                <label>Spent Time</label>
                                                <input type="text" 
                                                    className="form-control signup-input"
                                                    value={spent} 
                                                    onChange={(e)=>setspent(e.target.value)}
                                                    name="spent_time"
                                                  />
                                                  <div className="error-msg">{errors.spent_time && <p>{errors.spent_time.message}</p>}</div>
                                              </GridItem>
                                            </GridContainer>
                                            <button color="primary"  onClick={()=>{insert_time(task.task_id)}} type="submit">Save Time</button>
                                          </form>
                                          </>
                                        ):(
                                          <>
                                            <form onSubmit={update_tasktime}>
                                              <GridContainer>
                                                <GridItem xs={12} sm={12} md={6}>
                                                  <input value={task.task_id} type="hidden"/>
                                                  <label>Estimate Time</label>
                                                  <input type="text" name="estimate_time" 
                                                    className="form-control signup-input"
                                                    value={userdata.estimate_time} 
                                                    onChange={handleChangePanel}
                                                  /><br/>
                                                </GridItem>

                                                <GridItem xs={12} sm={12} md={6}>
                                                  <label>Spent Time</label>
                                                  <input type="text" name="spent_time" 
                                                    className="form-control signup-input"
                                                    value={userdata.spent_time} 
                                                    onChange={handleChangePanel}
                                                  />
                                                </GridItem>
                                              </GridContainer>
                                              <Button color="primary" onClick={()=>{update_tasktime(task.task_id)}}  type="submit">Save Time</Button>
                                            </form>
                                          </>
                                        )}
                                        {/*Time Modulule*/}
                              </GridItem>
                            </GridContainer>


                            <GridContainer>
                              <GridItem>
                                <ReactQuill forwardedRef={quillRef} modules={modules} theme="snow" onChange={setCommentValue} />
                                  <button className="btn btn-primary" onClick={()=> { sendMessage(task.task_id), close() } }>Save</button>
                              </GridItem>
                            </GridContainer>
                           
                          {comments.map((uComment)=>{
                            return(
                              <span>
                                <GridContainer>
                                  <GridItem>
                                    <span>{uComment.username}</span>
                                  </GridItem>
                                </GridContainer>

                                <GridContainer>
                                                  <GridItem>
                                                    <div>

                                                    <ReactQuill value={uComment.comment} theme="bubble" readOnly />

                      <Popup trigger={ <span><button onClick={()=>{ editComment(uComment.id)} } disabled={ uComment.username != cookies.name }>Edit</button></span> }
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
                                  <ReactQuill forwardedRef={quillRef} modules={modules} theme="snow" onChange={setEditComment} value={commentEdit} />
                                </form>
                              </GridItem>
                            </GridContainer>
                            <CardFooter>
                                <Button color="primary" type="submit"  onClick={() => { updateComment(uComment.id, commentEdit), close() }}>Update</Button>
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
                        })}
                            </CardBody>
                          </Card>
                        </form>
                        </GridItem>
                        </GridContainer>

                      </div>

                      )}
                      </Popup>

                      <Popup trigger={<div hidden={cookies.Role_id == "2"}><MdDelete/></div>} modal >
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
                    </td>
                  </tr>
                  <p className={showTime==task.task_id ? 'content show':'content'}>
                    {/*Time Modulule*/}
                    <p>
                    {TimeData.length==0?(
                      <>
                        <GridContainer>
                          <GridItem>
                            <input value={task.task_id} type="hidden"/>
                            <p>Estimate Time - {estimate}</p>
                            <p>Spent Time - {spent}</p>
                          </GridItem>
                        </GridContainer>
                      </>
                      ):(
                      <>
                        <GridContainer>
                          <GridItem>
                            <input value={task.task_id} type="hidden"/>
                            <p>Estimate Time - {userdata.estimate_time}</p>
                            <p>Spent Time - {userdata.spent_time} </p>
                          </GridItem>
                        </GridContainer>
                      </>
                      )}
                    {/*Time Modulule*/}
                      </p>
                      <p>
                      {/* display comments in dropdown */}
                        {dropdown_Comments.map((dComment)=>{
                          return(
                            <span>
                              <GridContainer>
                                <GridItem>
                                  <p>{dComment.username}</p>
                                  <p><ReactQuill value={dComment.comment} theme="bubble" readOnly /></p>
                                  <p>{dComment.creation_time}</p>
                                </GridItem>
                              </GridContainer>
                            </span>
                          )
                        })}
                      </p>
                      {/* display comments in dropdown */}
                  </p>
                </>
              )
            }
          })}
        </table>
      ) : (<div className="no_Data"><h4 className="no-data">No Data</h4></div>)}
      </>
    ):("")
    }

    <Card>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <div className="taskOn_hold task_title" onClick={()=> { setonhold_title(!onhold_title) }}>Task on hold {onhold_title ? <FaArrowUp/>:<FaArrowDown/>}</div>
        </GridItem>
      </GridContainer>
    </Card>
    {onhold_title ? (
      <>
      {dateDetails.length > 0 ? (
        <table className="project-data" >
          <tr className="project-data-title">
            <th className="status">Project Name</th>
            <th className="title">Task name </th>
            <th>Priority</th>
            <th className="assignee">Assignee</th>
            <th className="view-edit">View & Edit</th>
          </tr>
            {dateDetails.map((task)=>{
              if(task.task_delete == "no"){
                if(task.task_status == "Task on hold"){
                  var person = task.task_person.split(",");
                  return(
                    <>
                    <tr key={task.task_id} onClick={()=>{toggle(task.task_id);getData(task.task_id);getTime(task.task_id);}} className="expand_dropdown">
                      <td className="project-title-table">{task.project_name}</td>
                      <td><h4 className="projectTitle">{task.task_title}</h4></td>
                      <td className="priority-data"><p className={task.task_priority}>{task.task_priority}</p></td>

                      <td className="project-priority-person">
                      {person.length>2 ? (
                        <>
                          <div className="chip">
                            <span>{person[0]}</span>
                          </div>
                          <div className="chip">
                            <span>{person[1]}</span>
                          </div>
                            {/* Edit popUp Start*/}
                            <Popup trigger={<a className="icon-edit-delete"><div className='chip'><span>Load more</span></div></a>} className="popupReact"  position="left">
                            {close => (
                              <div className="popup-align">
                                <Card>
                                  <CardBody>
                                    <CardHeader>
                                      <GridContainer>
                                        <GridItem>
                                          <strong>Assignee</strong>
                                        </GridItem>
                                        <GridItem>
                                          <div className={classes.close}>
                                            <a onClick={close}>&times;</a>
                                          </div>
                                        </GridItem>
                                      </GridContainer>
                                    </CardHeader>

                                    <GridContainer>
                                      <GridItem>
                                        {person.map((user)=>{
                                          return(
                                            <span>
                                              <span className="members" title={user}>{user}</span>
                                            </span>
                                          )
                                        })}
                                      </GridItem>
                                    </GridContainer>
                                  </CardBody>
                                </Card>
                              </div>
                            )}
                            </Popup>
                            {/*Edit popup End*/}
                        </>
                        ):(
                        <span>
                          {person.map((user)=>{
                            return(
                              <div className="chip">
                                <span className="members" title={user}>{user}</span>
                              </div>
                            )
                          })}
                        </span>
                      )}
                    </td>

                      <td className="project-edit-table">
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

                              <div className={classes.close}>
                                <a onClick={close}>&times;</a>
                              </div>
                          </GridContainer>

                          </CardHeader>
                          
                            <CardBody>

                              <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>                      
                                  <div className="form-group">
                                    <span>Task Title</span><span className="required">*</span>
                                    <input type="text" className="form-control signup-input" disabled={cookies.Role_id == "2"} placeholder="Task Title" name="task_title" value={uoption.task_title} onChange={handleChange} />
                                  </div> 
                                </GridItem>
                              </GridContainer><br/>
                                
                              <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                <div className="form-group" name="project_name" onChange={handleChange} >
                                  
                                  <span>Project</span><span className="required">*</span>
                                  <Multiselect
                                    displayValue="value"
                                    options={project_list}
                                    value={p_selected}
                                    selectionLimit="1"
                                    selectedValues={p_selected}
                                    onChange={setProject}
                                    onRemove={setProject}
                                    onSelect={setProject}
                                    placeholder="Project List"
                                    showArrow={true}
                                    customCloseIcon={<></>}
                                    disable={cookies.Role_id == "2"}
                                  />
                                  </div> 
                                </GridItem>
                              </GridContainer><br/>

                              <GridContainer>  
                                <GridItem xs={12} sm={12} md={12}>
                                  <div className="form-group">
                                  <span>Task Description</span><span className="required">*</span>
                                    <textarea className="form-control signup-input" disabled={cookies.Role_id == "2"} placeholder="Task Description" name="task_description" value={uoption.task_description} onChange={handleChange} />
                                  </div> 
                                </GridItem>
                              </GridContainer><br/>

                            <GridContainer>
                              <GridItem xs={12} sm={12} md={12}>
                                <div className="form-group" hidden={cookies.Role_id != "2"}>
                                    <span>Task Status</span><span className="required">*</span>
                                    <Multiselect
                                        displayValue="value"
                                        options={all_Status}
                                        value={u_Status}
                                        selectedValues={u_Status}
                                        selectionLimit="1"
                                        onChange={setStatus}
                                        onRemove={setStatus}
                                        onSearch={function noRefCheck(){}}
                                        onSelect={setStatus}
                                        placeholder="Task Priority"
                                        showArrow={true}
                                        customCloseIcon={<></>}
                                        disable={cookies.Role_id == "2"}
                                    />
                                      {/* <select name="task_status" id="Status" className="form-control signup-input" 
                                      onChange={(e)=> { updateStatus(e.target.value), close() }} 
                                      value={uoption.task_status} >
                                        <option value="" disabled selected>Select Task Status</option>
                                        <option value="task_toDo">Task to do</option>
                                        <option value="taskOn_hold">Task On hold</option>
                                        <option value="task_Running">Task Running</option>
                                        <option value="task_completed">Task Completed</option>
                                      </select>
                                    <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span> */}
                                  </div> 
                                  <div className="form-group" hidden={cookies.Role_id == "2"}>
                                    <span>Task Status</span><span className="required">*</span>
                                    <Multiselect
                                        displayValue="value"
                                        options={all_Status}
                                        value={u_Status}
                                        selectedValues={u_Status}
                                        selectionLimit="1"
                                        onChange={setStatus}
                                        onRemove={setStatus}
                                        onSearch={function noRefCheck(){}}
                                        onSelect={setStatus}
                                        placeholder="Task Priority"
                                        showArrow={true}
                                        customCloseIcon={<></>}
                                        disable={cookies.Role_id == "2"}
                                    />
                                  </div> 
                                </GridItem>
                              </GridContainer><br/>

                              <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                                  <div className="form-group">
                                  <span>Task Priority</span><span className="required">*</span>
                                  <Multiselect
                                      displayValue="value"
                                      options={all_Priority}
                                      value={u_Priority}
                                      selectedValues={u_Priority}
                                      selectionLimit="1"
                                      onChange={setPriority}
                                      onRemove={setPriority}
                                      onSearch={function noRefCheck(){}}
                                      onSelect={setPriority}
                                      placeholder="Task Priority"
                                      showArrow={true}
                                      customCloseIcon={<></>}
                                      disable={cookies.Role_id == "2"}
                                  />
                                  </div> 
                                </GridItem>

                                <GridItem xs={12} sm={12} md={6}>
                                  <div className="form-group">
                                  <span>Task Language</span><span className="required">*</span>
                                  <Multiselect
                                    displayValue="value"
                                    options={all_Language}
                                    value={u_Language}
                                    selectionLimit="1"
                                    onChange={setLanguage}
                                    onRemove={setLanguage}
                                    onSearch={function noRefCheck(){}}
                                    onSelect={setLanguage}
                                    placeholder="Task Language"
                                    showArrow={true}
                                    selectedValues={u_Language}
                                    customCloseIcon={<></>}
                                    disable={cookies.Role_id == "2"}
                                  />
                                  </div> 
                                </GridItem>
                              </GridContainer><br/>

                              <GridContainer>  
                                <GridItem xs={12} sm={12} md={6}>
                                  <div className="form-group" onChange={handleChange} disabled={cookies.Role_id == "2"} >
                                  <span>Task Start Date</span><span className="required">*</span>
                                    <DatePicker
                                      placeholderText="Start Date : dd/mm/yyyy"
                                      // isClearable
                                      name="datetime"
                                      className={"form-control"}
                                      selected={startDate}
                                      onChange={val => {
                                        setStartDate(val);
                                        setValue("start", val);
                                      }}
                                      dateFormat="dd-MM-yyyy"
                                      minDate={new Date()}
                                      disabled={cookies.Role_id == "2"}
                                    />
                                  </div> 
                                </GridItem>

                                <GridItem xs={12} sm={12} md={6}>
                                  <div className="form-group" onChange={handleChange} disabled={cookies.Role_id == "2"} >
                                  <span>Task End Date</span><span className="required">*</span>
                                    <DatePicker
                                      placeholderText="End Date : dd/mm/yyyy"
                                      // isClearable
                                      name="datetime1"
                                      className={"form-control"}
                                      selected={endDate}
                                      onChange={val => {
                                        setEndDate(val);
                                        setValue("end", val);
                                      }}
                                      dateFormat="dd-MM-yyyy"
                                      minDate={startDate}
                                      disabled={cookies.Role_id == "2"}
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
                                    // customCloseIcon={<></>}
                                    disable={cookies.Role_id == "2"}
                                  />
                                  </div> 
                                </GridItem>
                              </GridContainer><br/>

                              {/* <Button color="primary" type="submit" onClick={()=> { updateStatus(task.task_id), close() } }  hidden={cookies.Role_id != "2"}>Update</Button> */}

                            </CardBody>

                            <CardFooter hidden={cookies.Role_id == "2"}>
                                <Button color="primary" type="submit" onClick={()=> { updateProject(task.task_id); } }  hidden={cookies.Role_id == "2"}>Save</Button>
                                <Button className="button" onClick={() => { close(); }} hidden={cookies.Role_id == "2"}> Cancel </Button>
                            </CardFooter>

                            <CardBody>
                            <GridContainer>
                              <GridItem xs={12} sm={12} md={12} >
                                {/*Time Modulule*/}
                                {TimeData.length==0?(
                                        <>
                                          <form onSubmit={handleSubmit(insert_time)} method="POST">
                                          <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <input value={task.task_id} type="hidden"/>
                                                <label>Estimate Time</label>
                                                <input type="text" 
                                                    className="form-control signup-input"
                                                    value={estimate} 
                                                    onChange={(e)=>setestimate(e.target.value)} 
                                                    name="estimate_time"
                                                />
                                                <div className="error-msg">{errors.estimate_time && <p>{errors.estimate_time.message}</p>}</div>
                                            </GridItem>
                                          
                                            <GridItem xs={12} sm={12} md={6}>
                                                <label>Spent Time</label>
                                                <input type="text" 
                                                    className="form-control signup-input"
                                                    value={spent} 
                                                    onChange={(e)=>setspent(e.target.value)}
                                                    name="spent_time"
                                                  />
                                                  <div className="error-msg">{errors.spent_time && <p>{errors.spent_time.message}</p>}</div>
                                              </GridItem>
                                            </GridContainer>
                                            <button color="primary"  onClick={()=>{insert_time(task.task_id)}} type="submit">Save Time</button>
                                          </form>
                                          </>
                                        ):(
                                          <>
                                            <form onSubmit={update_tasktime}>
                                              <GridContainer>
                                                <GridItem xs={12} sm={12} md={6}>
                                                  <input value={task.task_id} type="hidden"/>
                                                  <label>Estimate Time</label>
                                                  <input type="text" name="estimate_time" 
                                                    className="form-control signup-input"
                                                    value={userdata.estimate_time} 
                                                    onChange={handleChangePanel}
                                                  /><br/>
                                                </GridItem>

                                                <GridItem xs={12} sm={12} md={6}>
                                                  <label>Spent Time</label>
                                                  <input type="text" name="spent_time" 
                                                    className="form-control signup-input"
                                                    value={userdata.spent_time} 
                                                    onChange={handleChangePanel}
                                                  />
                                                </GridItem>
                                              </GridContainer>
                                              <Button color="primary" onClick={()=>{update_tasktime(task.task_id)}}  type="submit">Save Time</Button>
                                            </form>
                                          </>
                                        )}
                                        {/*Time Modulule*/}
                              </GridItem>
                            </GridContainer>

                            <GridContainer>
                              <GridItem>
                                <ReactQuill forwardedRef={quillRef} modules={modules} theme="snow" onChange={setCommentValue} />
                                  <button className="btn btn-primary" onClick={()=> { sendMessage(task.task_id), close() } }>Save</button>
                              </GridItem>
                            </GridContainer>
                          
                          {comments.map((uComment)=>{
                            return(
                              <span>
                                <GridContainer>
                                  <GridItem>
                                    <span>{uComment.username}</span>
                                  </GridItem>
                                </GridContainer>

                                <GridContainer>
                                                  <GridItem>
                                                    <div>

                                                    <ReactQuill value={uComment.comment} theme="bubble" readOnly />

                      <Popup trigger={ <span><button onClick={()=>{ editComment(uComment.id)} } disabled={ uComment.username != cookies.name }>Edit</button></span> }
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
                                  <ReactQuill forwardedRef={quillRef} modules={modules} theme="snow" onChange={setEditComment} value={commentEdit} />
                                </form>
                              </GridItem>
                            </GridContainer>
                            <CardFooter>
                                <Button color="primary" type="submit"  onClick={() => { updateComment(uComment.id, commentEdit), close() }}>Update</Button>
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
                        })}
                            </CardBody>
                          </Card>
                        </form>
                        </GridItem>
                        </GridContainer>

                      </div>

                      )}
                      </Popup>

                      <Popup trigger={<div hidden={cookies.Role_id == "2"}><MdDelete/></div>} modal >
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
                    </td>
                    </tr>
                    <p className={showTime==task.task_id ? 'content show':'content'}>
                    {/*Time Modulule*/}
                    <p>
                    {TimeData.length==0?(
                      <>
                        <GridContainer>
                          <GridItem>
                            <input value={task.task_id} type="hidden"/>
                            <p>Estimate Time - {estimate}</p>
                            <p>Spent Time - {spent}</p>
                          </GridItem>
                        </GridContainer>
                      </>
                      ):(
                      <>
                        <GridContainer>
                          <GridItem>
                            <input value={task.task_id} type="hidden"/>
                            <p>Estimate Time - {userdata.estimate_time}</p>
                            <p>Spent Time - {userdata.spent_time} </p>
                          </GridItem>
                        </GridContainer>
                      </>
                      )}
                    {/*Time Modulule*/}
                      </p>
                      <p>
                      {/* display comments in dropdown */}
                        {dropdown_Comments.map((dComment)=>{
                          return(
                            <span>
                              <GridContainer>
                                <GridItem>
                                  <p>{dComment.username}</p>
                                  <p><ReactQuill value={dComment.comment} theme="bubble" readOnly /></p>
                                  <p>{dComment.creation_time}</p>
                                </GridItem>
                              </GridContainer>
                            </span>
                          )
                        })}
                      </p>
                      {/* display comments in dropdown */}
                  </p>
                  </>
                  ) 
                }
              }
            })}
        </table>
      ) : (<div className="no_Data"><h4 className="no-data">No Data</h4></div>)}
      </>
    ):("")}
    
    <Card>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <div className="taskRunning task_title" onClick={()=> { setrunning_title(!running_title) }}>Task Running {running_title ? <FaArrowUp/>:<FaArrowDown/>} </div>
        </GridItem>
      </GridContainer>
    </Card>
    {running_title ? (
      <>
      {dateDetails.length > 0 ? (
        <table className="project-data" >
          <tr className="project-data-title">
            <th className="status">Project Name</th>
            <th className="title">Task name </th>
            <th>Priority</th>
            <th className="assignee">Assignee</th>
            <th className="view-edit">View & Edit</th>
          </tr>
          {dateDetails.map((task)=>{
            if(task.task_delete == "no"){
              if(task.task_status == "Task running"){
                var person = task.task_person.split(",");
                return(
                  <>
                  <tr key={task.task_id} onClick={()=>{toggle(task.task_id);getData(task.task_id);getTime(task.task_id);}} className="expand_dropdown">
                    <td className="project-title-table">{task.project_name}</td>
                    <td><h4 className="projectTitle">{task.task_title}</h4></td>
                    <td className="priority-data"><p className={task.task_priority}>{task.task_priority}</p></td>

                    <td className="project-priority-person">
                      {person.length>2 ? (
                        <>
                          <div className="chip">
                            <span>{person[0]}</span>
                          </div>
                          <div className="chip">
                            <span>{person[1]}</span>
                          </div>
                            {/* Edit popUp Start*/}
                            <Popup trigger={<a className="icon-edit-delete"><div className='chip'><span>Load more</span></div></a>} className="popupReact"  position="left">
                            {close => (
                              <div className="popup-align">
                                <Card>
                                  <CardBody>
                                    <CardHeader>
                                      <GridContainer>
                                        <GridItem>
                                          <strong>Assignee</strong>
                                        </GridItem>
                                        <GridItem>
                                          <div className={classes.close}>
                                            <a onClick={close}>&times;</a>
                                          </div>
                                        </GridItem>
                                      </GridContainer>
                                    </CardHeader>

                                    <GridContainer>
                                      <GridItem>
                                        {person.map((user)=>{
                                          return(
                                            <span>
                                              <span className="members" title={user}>{user}</span>
                                            </span>
                                          )
                                        })}
                                      </GridItem>
                                    </GridContainer>
                                  </CardBody>
                                </Card>
                              </div>
                            )}
                            </Popup>
                            {/*Edit popup End*/}
                        </>
                        ):(
                        <span>
                          {person.map((user)=>{
                            return(
                              <div className="chip">
                                <span className="members" title={user}>{user}</span>
                              </div>
                            )
                          })}
                        </span>
                      )}
                    </td>

                    <td className="project-edit-table">
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

                              <div className={classes.close}>
                                <a onClick={close}>&times;</a>
                              </div>
                          </GridContainer>

                          </CardHeader>
                          
                            <CardBody>

                              <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>                      
                                  <div className="form-group">
                                    <span>Task Title</span><span className="required">*</span>
                                    <input type="text" className="form-control signup-input" disabled={cookies.Role_id == "2"} placeholder="Task Title" name="task_title" value={uoption.task_title} onChange={handleChange} />
                                  </div> 
                                </GridItem>
                              </GridContainer><br/>
                                
                              <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                <div className="form-group" name="project_name" onChange={handleChange} >
                                  
                                  <span>Project Name</span><span className="required">*</span>
                                  <Multiselect
                                    displayValue="value"
                                    options={project_list}
                                    value={p_selected}
                                    selectionLimit="1"
                                    selectedValues={p_selected}
                                    onChange={setProject}
                                    onRemove={setProject}
                                    onSelect={setProject}
                                    placeholder="Project List"
                                    showArrow={true}
                                    customCloseIcon={<></>}
                                    disable={cookies.Role_id == "2"}
                                  />
                                  </div> 
                                </GridItem>
                              </GridContainer><br/>

                              <GridContainer>  
                                <GridItem xs={12} sm={12} md={12}>
                                  <div className="form-group">
                                  <span>Task Description</span><span className="required">*</span>
                                    <textarea className="form-control signup-input" disabled={cookies.Role_id == "2"} placeholder="Task Description" name="task_description" value={uoption.task_description} onChange={handleChange} />
                                  </div> 
                                </GridItem>
                              </GridContainer><br/>

                            <GridContainer>
                              <GridItem xs={12} sm={12} md={12}>
                                <div className="form-group" hidden={cookies.Role_id != "2"}>
                                    <span>Task Status</span><span className="required">*</span>
                                    <Multiselect
                                        displayValue="value"
                                        options={all_Status}
                                        value={u_Status}
                                        selectedValues={u_Status}
                                        selectionLimit="1"
                                        onChange={setStatus}
                                        onRemove={setStatus}
                                        onSearch={function noRefCheck(){}}
                                        onSelect={setStatus}
                                        placeholder="Task Priority"
                                        showArrow={true}
                                        customCloseIcon={<></>}
                                        disable={cookies.Role_id == "2"}
                                    />
                                      {/* <select name="task_status" id="Status" className="form-control signup-input" 
                                      onChange={(e)=> { updateStatus(e.target.value), close() }} 
                                      value={uoption.task_status} >
                                        <option value="" disabled selected>Select Task Status</option>
                                        <option value="task_toDo">Task to do</option>
                                        <option value="taskOn_hold">Task On hold</option>
                                        <option value="task_Running">Task Running</option>
                                        <option value="task_completed">Task Completed</option>
                                      </select>
                                    <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span> */}
                                  </div> 
                                  <div className="form-group" hidden={cookies.Role_id == "2"}>
                                    <span>Task Status</span><span className="required">*</span>
                                    <Multiselect
                                        displayValue="value"
                                        options={all_Status}
                                        value={u_Status}
                                        selectedValues={u_Status}
                                        selectionLimit="1"
                                        onChange={setStatus}
                                        onRemove={setStatus}
                                        onSearch={function noRefCheck(){}}
                                        onSelect={setStatus}
                                        placeholder="Task Priority"
                                        showArrow={true}
                                        customCloseIcon={<></>}
                                        disable={cookies.Role_id == "2"}
                                    />
                                  </div> 
                                </GridItem>
                              </GridContainer><br/>

                              <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                                  <div className="form-group">
                                  <span>Task Priority</span><span className="required">*</span>
                                  <Multiselect
                                      displayValue="value"
                                      options={all_Priority}
                                      value={u_Priority}
                                      selectedValues={u_Priority}
                                      selectionLimit="1"
                                      onChange={setPriority}
                                      onRemove={setPriority}
                                      onSearch={function noRefCheck(){}}
                                      onSelect={setPriority}
                                      placeholder="Task Priority"
                                      showArrow={true}
                                      customCloseIcon={<></>}
                                      disable={cookies.Role_id == "2"}
                                  />
                                  </div> 
                                </GridItem>

                                <GridItem xs={12} sm={12} md={6}>
                                  <div className="form-group">
                                  <span>Task Language</span><span className="required">*</span>
                                  <Multiselect
                                    displayValue="value"
                                    options={all_Language}
                                    value={u_Language}
                                    selectionLimit="1"
                                    onChange={setLanguage}
                                    onRemove={setLanguage}
                                    onSearch={function noRefCheck(){}}
                                    onSelect={setLanguage}
                                    placeholder="Task Language"
                                    showArrow={true}
                                    selectedValues={u_Language}
                                    customCloseIcon={<></>}
                                    disable={cookies.Role_id == "2"}
                                  />
                                  </div> 
                                </GridItem>
                              </GridContainer><br/>

                              <GridContainer>  
                                <GridItem xs={12} sm={12} md={6}>
                                  <div className="form-group" onChange={handleChange} disabled={cookies.Role_id == "2"} >
                                  <span>Task Start Date</span><span className="required">*</span>
                                    <DatePicker
                                      placeholderText="Start Date : dd/mm/yyyy"
                                      // isClearable
                                      name="datetime"
                                      className={"form-control"}
                                      selected={startDate}
                                      onChange={val => {
                                        setStartDate(val);
                                        setValue("start", val);
                                      }}
                                      dateFormat="dd-MM-yyyy"
                                      minDate={new Date()}
                                      disabled={cookies.Role_id == "2"}
                                    />
                                  </div> 
                                </GridItem>

                                <GridItem xs={12} sm={12} md={6}>
                                  <div className="form-group" onChange={handleChange} disabled={cookies.Role_id == "2"} >
                                  <span>Task End Date</span><span className="required">*</span>
                                    <DatePicker
                                      placeholderText="End Date : dd/mm/yyyy"
                                      // isClearable
                                      name="datetime1"
                                      className={"form-control"}
                                      selected={endDate}
                                      onChange={val => {
                                        setEndDate(val);
                                        setValue("end", val);
                                      }}
                                      dateFormat="dd-MM-yyyy"
                                      minDate={startDate}
                                      disabled={cookies.Role_id == "2"}
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
                                    // customCloseIcon={<></>}
                                    disable={cookies.Role_id == "2"}
                                  />
                                  </div> 
                                </GridItem>
                              </GridContainer><br/>

                              {/* <Button color="primary" type="submit" onClick={()=> { updateStatus(task.task_id), close() } }  hidden={cookies.Role_id != "2"}>Update</Button> */}

                            </CardBody>

                            <CardFooter hidden={cookies.Role_id == "2"}>
                                <Button color="primary" type="submit" onClick={()=> { updateProject(task.task_id); } }  hidden={cookies.Role_id == "2"}>Save</Button>
                                <Button className="button" onClick={() => { close(); }} hidden={cookies.Role_id == "2"}> Cancel </Button>
                            </CardFooter>

                            <CardBody>

                            <GridContainer>
                              <GridItem xs={12} sm={12} md={12} >
                                {/*Time Modulule*/}
                                {TimeData.length==0?(
                                        <>
                                          <form onSubmit={handleSubmit(insert_time)} method="POST">
                                          <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <input value={task.task_id} type="hidden"/>
                                                <label>Estimate Time</label>
                                                <input type="text" 
                                                    className="form-control signup-input"
                                                    value={estimate} 
                                                    onChange={(e)=>setestimate(e.target.value)} 
                                                    name="estimate_time"
                                                />
                                                <div className="error-msg">{errors.estimate_time && <p>{errors.estimate_time.message}</p>}</div>
                                            </GridItem>
                                          
                                            <GridItem xs={12} sm={12} md={6}>
                                                <label>Spent Time</label>
                                                <input type="text" 
                                                    className="form-control signup-input"
                                                    value={spent} 
                                                    onChange={(e)=>setspent(e.target.value)}
                                                    name="spent_time"
                                                  />
                                                  <div className="error-msg">{errors.spent_time && <p>{errors.spent_time.message}</p>}</div>
                                              </GridItem>
                                            </GridContainer>
                                            <button color="primary"  onClick={()=>{insert_time(task.task_id)}} type="submit">Save Time</button>
                                          </form>
                                          </>
                                        ):(
                                          <>
                                            <form onSubmit={update_tasktime}>
                                              <GridContainer>
                                                <GridItem xs={12} sm={12} md={6}>
                                                  <input value={task.task_id} type="hidden"/>
                                                  <label>Estimate Time</label>
                                                  <input type="text" name="estimate_time" 
                                                    className="form-control signup-input"
                                                    value={userdata.estimate_time} 
                                                    onChange={handleChangePanel}
                                                  /><br/>
                                                </GridItem>

                                                <GridItem xs={12} sm={12} md={6}>
                                                  <label>Spent Time</label>
                                                  <input type="text" name="spent_time" 
                                                    className="form-control signup-input"
                                                    value={userdata.spent_time} 
                                                    onChange={handleChangePanel}
                                                  />
                                                </GridItem>
                                              </GridContainer>
                                              <Button color="primary" onClick={()=>{update_tasktime(task.task_id)}}  type="submit">Save Time</Button>
                                            </form>
                                          </>
                                        )}
                                        {/*Time Modulule*/}
                              </GridItem>
                            </GridContainer>

                            <GridContainer>
                              <GridItem>
                                <ReactQuill forwardedRef={quillRef} modules={modules} theme="snow" onChange={setCommentValue} />
                                  <button className="btn btn-primary" onClick={()=> { sendMessage(task.task_id), close() } }>Save</button>
                              </GridItem>
                            </GridContainer>
                          
                          {comments.map((uComment)=>{
                            return(
                              <span>
                                <GridContainer>
                                  <GridItem>
                                    <span>{uComment.username}</span>
                                  </GridItem>
                                </GridContainer>

                                <GridContainer>
                <GridItem>
                  <div>

                  <ReactQuill value={uComment.comment} theme="bubble" readOnly />

                      <Popup trigger={ <span><button onClick={()=>{ editComment(uComment.id)} } disabled={ uComment.username != cookies.name }>Edit</button></span> }
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
                                  <ReactQuill forwardedRef={quillRef} modules={modules} theme="snow" onChange={setEditComment} value={commentEdit} />
                                </form>
                              </GridItem>
                            </GridContainer>
                            <CardFooter>
                                <Button color="primary" type="submit"  onClick={() => { updateComment(uComment.id, commentEdit), close() }}>Update</Button>
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
                        })}
                            </CardBody>
                          </Card>
                        </form>
                        </GridItem>
                        </GridContainer>

                      </div>

                      )}
                      </Popup>

                      <Popup trigger={<div hidden={cookies.Role_id == "2"}><MdDelete/></div>} modal >
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
                    </td>
                  </tr>
                  <p className={showTime==task.task_id ? 'content show':'content'}>
                    {/*Time Modulule*/}
                    <p>
                    {TimeData.length==0?(
                      <>
                        <GridContainer>
                          <GridItem>
                            <input value={task.task_id} type="hidden"/>
                            <p>Estimate Time - {estimate}</p>
                            <p>Spent Time - {spent}</p>
                          </GridItem>
                        </GridContainer>
                      </>
                      ):(
                      <>
                        <GridContainer>
                          <GridItem>
                            <input value={task.task_id} type="hidden"/>
                            <p>Estimate Time - {userdata.estimate_time}</p>
                            <p>Spent Time - {userdata.spent_time} </p>
                          </GridItem>
                        </GridContainer>
                      </>
                      )}
                    {/*Time Modulule*/}
                      </p>
                      <p>
                      {/* display comments in dropdown */}
                        {dropdown_Comments.map((dComment)=>{
                          return(
                            <span>
                              <GridContainer>
                                <GridItem>
                                  <p>{dComment.username}</p>
                                  <p><ReactQuill value={dComment.comment} theme="bubble" readOnly /></p>
                                  <p>{dComment.creation_time}</p>
                                </GridItem>
                              </GridContainer>
                            </span>
                          )
                        })}
                      </p>
                      {/* display comments in dropdown */}
                  </p>
                  </>
                )
              }
            }
          })}
        </table>
      ) : (<div className="no_Data"><h4 className="no-data">No Data</h4></div>)}
      </>
    ):("")}
    
    <Card>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <div className="taskCompleted task_title" onClick={()=> { setcompleted_title(!completed_title)}}>Task completed {completed_title ? <FaArrowUp/>:<FaArrowDown/>} </div>
        </GridItem>
      </GridContainer>
    </Card>
    {completed_title ? (
      <>
      {dateDetails.length > 0 ? (
        <table className="project-data" >
          <tr className="project-data-title">
            <th className="status">Project Name</th>
            <th className="title">Task name </th>
            <th>Priority</th>
            <th className="assignee">Assignee</th>
            <th className="view-edit">View & Edit</th>
          </tr>
          {dateDetails.map((task)=>{
            if(task.task_delete == "no"){
              if(task.task_status == "Task completed"){
                var person = task.task_person.split(",");
                return(
                  <>
                  <tr key={task.task_id} onClick={()=>{toggle(task.task_id);getData(task.task_id);getTime(task.task_id);}} className="expand_dropdown">
                    <td className="project-title-table">{task.project_name}</td>
                    <td><h4 className="projectTitle">{task.task_title}</h4></td>
                    <td className="priority-data"><p className={task.task_priority}>{task.task_priority}</p></td>

                    <td className="project-priority-person">
                      {person.length>2 ? (
                        <>
                          <div className="chip">
                            <span>{person[0]}</span>
                          </div>
                          <div className="chip">
                            <span>{person[1]}</span>
                          </div>
                            {/* Edit popUp Start*/}
                            <Popup trigger={<a className="icon-edit-delete"><div className='chip'><span>Load more</span></div></a>} className="popupReact"  position="left">
                            {close => (
                              <div className="popup-align">
                                <Card>
                                  <CardBody>
                                    <CardHeader>
                                      <GridContainer>
                                        <GridItem>
                                          <strong>Assignee</strong>
                                        </GridItem>
                                        <GridItem>
                                          <div className={classes.close}>
                                            <a onClick={close}>&times;</a>
                                          </div>
                                        </GridItem>
                                      </GridContainer>
                                    </CardHeader>

                                    <GridContainer>
                                      <GridItem>
                                        {person.map((user)=>{
                                          return(
                                            <span>
                                              <span className="members" title={user}>{user}</span>
                                            </span>
                                          )
                                        })}
                                      </GridItem>
                                    </GridContainer>
                                  </CardBody>
                                </Card>
                              </div>
                            )}
                            </Popup>
                            {/*Edit popup End*/}
                        </>
                        ):(
                        <span>
                          {person.map((user)=>{
                            return(
                              <div className="chip">
                                <span className="members" title={user}>{user}</span>
                              </div>
                            )
                          })}
                        </span>
                      )}
                    </td>

                    <td className="project-edit-table">
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

                              <div className={classes.close}>
                                <a onClick={close}>&times;</a>
                              </div>
                          </GridContainer>

                          </CardHeader>
                          
                            <CardBody>

                              <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>                      
                                  <div className="form-group">
                                    <span>Task Title</span><span className="required">*</span>
                                    <input type="text" className="form-control signup-input" disabled={cookies.Role_id == "2"} placeholder="Task Title" name="task_title" value={uoption.task_title} onChange={handleChange} />
                                  </div> 
                                </GridItem>
                              </GridContainer><br/>
                                
                              <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                <div className="form-group" name="project_name" onChange={handleChange} >
                                  
                                  <span>Project Name</span><span className="required">*</span>
                                  <Multiselect
                                    displayValue="value"
                                    options={project_list}
                                    value={p_selected}
                                    selectionLimit="1"
                                    selectedValues={p_selected}
                                    onChange={setProject}
                                    onRemove={setProject}
                                    onSelect={setProject}
                                    placeholder="Project List"
                                    showArrow={true}
                                    customCloseIcon={<></>}
                                    disable={cookies.Role_id == "2"}
                                  />
                                  </div> 
                                </GridItem>
                              </GridContainer><br/>

                              <GridContainer>  
                                <GridItem xs={12} sm={12} md={12}>
                                  <div className="form-group">
                                  <span>Task Description</span><span className="required">*</span>
                                    <textarea className="form-control signup-input" disabled={cookies.Role_id == "2"} placeholder="Task Description" name="task_description" value={uoption.task_description} onChange={handleChange} />
                                  </div> 
                                </GridItem>
                              </GridContainer><br/>

                            <GridContainer>
                              <GridItem xs={12} sm={12} md={12}>
                                <div className="form-group" hidden={cookies.Role_id != "2"}>
                                    <span>Task Status</span><span className="required">*</span>
                                    <Multiselect
                                        displayValue="value"
                                        options={all_Status}
                                        value={u_Status}
                                        selectedValues={u_Status}
                                        selectionLimit="1"
                                        onChange={setStatus}
                                        onRemove={setStatus}
                                        onSearch={function noRefCheck(){}}
                                        onSelect={setStatus}
                                        placeholder="Task Priority"
                                        showArrow={true}
                                        customCloseIcon={<></>}
                                        disable={cookies.Role_id == "2"}
                                    />
                                      {/* <select name="task_status" id="Status" className="form-control signup-input" 
                                      onChange={(e)=> { updateStatus(e.target.value), close() }} 
                                      value={uoption.task_status} >
                                        <option value="" disabled selected>Select Task Status</option>
                                        <option value="task_toDo">Task to do</option>
                                        <option value="taskOn_hold">Task On hold</option>
                                        <option value="task_Running">Task Running</option>
                                        <option value="task_completed">Task Completed</option>
                                      </select>
                                    <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span> */}
                                  </div> 
                                  <div className="form-group" hidden={cookies.Role_id == "2"}>
                                    <span>Task Status</span><span className="required">*</span>
                                    <Multiselect
                                        displayValue="value"
                                        options={all_Status}
                                        value={u_Status}
                                        selectedValues={u_Status}
                                        selectionLimit="1"
                                        onChange={setStatus}
                                        onRemove={setStatus}
                                        onSearch={function noRefCheck(){}}
                                        onSelect={setStatus}
                                        placeholder="Task Priority"
                                        showArrow={true}
                                        customCloseIcon={<></>}
                                        disable={cookies.Role_id == "2"}
                                    />
                                  </div> 
                                </GridItem>
                              </GridContainer><br/>

                              <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                                  <div className="form-group">
                                  <span>Task Priority</span><span className="required">*</span>
                                  <Multiselect
                                      displayValue="value"
                                      options={all_Priority}
                                      value={u_Priority}
                                      selectedValues={u_Priority}
                                      selectionLimit="1"
                                      onChange={setPriority}
                                      onRemove={setPriority}
                                      onSearch={function noRefCheck(){}}
                                      onSelect={setPriority}
                                      placeholder="Task Priority"
                                      showArrow={true}
                                      customCloseIcon={<></>}
                                      disable={cookies.Role_id == "2"}
                                  />

                                    {/* <select id="priority" className="form-control signup-input" disabled={cookies.Role_id == "2"} name="task_priority" value={uoption.task_priority} onChange={handleChange}  >
                                      <option value=""  disabled selected>Select Task Priority</option>
                                      <option value="High">High</option>
                                      <option value="Medium">Medium</option>
                                      <option value="Low">Low</option>
                                    </select>
                                    <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span> */}
                                  </div> 
                                </GridItem>

                                <GridItem xs={12} sm={12} md={6}>
                                  <div className="form-group">
                                  <span>Task Language</span><span className="required">*</span>
                                  <Multiselect
                                    displayValue="value"
                                    options={all_Language}
                                    value={u_Language}
                                    selectionLimit="1"
                                    onChange={setLanguage}
                                    onRemove={setLanguage}
                                    onSearch={function noRefCheck(){}}
                                    onSelect={setLanguage}
                                    placeholder="Task Language"
                                    showArrow={true}
                                    selectedValues={u_Language}
                                    customCloseIcon={<></>}
                                    disable={cookies.Role_id == "2"}
                                  />
                                  </div> 
                                </GridItem>
                              </GridContainer><br/>

                              <GridContainer>  
                                <GridItem xs={12} sm={12} md={6}>
                                  <div className="form-group" onChange={handleChange} disabled={cookies.Role_id == "2"} >
                                  <span>Task Start Date</span><span className="required">*</span>
                                    <DatePicker
                                      placeholderText="Start Date : dd/mm/yyyy"
                                      // isClearable
                                      name="datetime"
                                      className={"form-control"}
                                      selected={startDate}
                                      onChange={val => {
                                        setStartDate(val);
                                        setValue("start", val);
                                      }}
                                      dateFormat="dd-MM-yyyy"
                                      minDate={new Date()}
                                      disabled={cookies.Role_id == "2"}
                                    />
                                  </div> 
                                </GridItem>

                                <GridItem xs={12} sm={12} md={6}>
                                  <div className="form-group" onChange={handleChange} disabled={cookies.Role_id == "2"} >
                                  <span>Task End Date</span><span className="required">*</span>
                                    <DatePicker
                                      placeholderText="End Date : dd/mm/yyyy"
                                      // isClearable
                                      name="datetime1"
                                      className={"form-control"}
                                      selected={endDate}
                                      onChange={val => {
                                        setEndDate(val);
                                        setValue("end", val);
                                      }}
                                      dateFormat="dd-MM-yyyy"
                                      minDate={startDate}
                                      disabled={cookies.Role_id == "2"}
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
                                    // customCloseIcon={<></>}
                                    disable={cookies.Role_id == "2"}
                                  />
                                  </div> 
                                </GridItem>
                              </GridContainer><br/>

                              {/* <Button color="primary" type="submit" onClick={()=> { updateStatus(task.task_id), close() } }  hidden={cookies.Role_id != "2"}>Update</Button> */}

                            </CardBody>

                            <CardFooter hidden={cookies.Role_id == "2"}>
                                <Button color="primary" type="submit" onClick={()=> { updateProject(task.task_id); } }  hidden={cookies.Role_id == "2"}>Save</Button>
                                <Button className="button" onClick={() => { close(); }} hidden={cookies.Role_id == "2"}> Cancel </Button>
                            </CardFooter>

                            <CardBody>

                            <GridContainer>
                              <GridItem xs={12} sm={12} md={12} >
                                {/*Time Modulule*/}
                                {TimeData.length==0?(
                                        <>
                                          <form onSubmit={handleSubmit(insert_time)} method="POST">
                                          <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <input value={task.task_id} type="hidden"/>
                                                <label>Estimate Time</label>
                                                <input type="text" 
                                                    className="form-control signup-input"
                                                    value={estimate} 
                                                    onChange={(e)=>setestimate(e.target.value)} 
                                                    name="estimate_time"
                                                />
                                                <div className="error-msg">{errors.estimate_time && <p>{errors.estimate_time.message}</p>}</div>
                                            </GridItem>
                                          
                                            <GridItem xs={12} sm={12} md={6}>
                                                <label>Spent Time</label>
                                                <input type="text" 
                                                    className="form-control signup-input"
                                                    value={spent} 
                                                    onChange={(e)=>setspent(e.target.value)}
                                                    name="spent_time"
                                                  />
                                                  <div className="error-msg">{errors.spent_time && <p>{errors.spent_time.message}</p>}</div>
                                              </GridItem>
                                            </GridContainer>
                                            <button color="primary"  onClick={()=>{insert_time(task.task_id)}} type="submit">Save Time</button>
                                          </form>
                                          </>
                                        ):(
                                          <>
                                            <form onSubmit={update_tasktime}>
                                              <GridContainer>
                                                <GridItem xs={12} sm={12} md={6}>
                                                  <input value={task.task_id} type="hidden"/>
                                                  <label>Estimate Time</label>
                                                  <input type="text" name="estimate_time" 
                                                    className="form-control signup-input"
                                                    value={userdata.estimate_time} 
                                                    onChange={handleChangePanel}
                                                  /><br/>
                                                </GridItem>

                                                <GridItem xs={12} sm={12} md={6}>
                                                  <label>Spent Time</label>
                                                  <input type="text" name="spent_time" 
                                                    className="form-control signup-input"
                                                    value={userdata.spent_time} 
                                                    onChange={handleChangePanel}
                                                  />
                                                </GridItem>
                                              </GridContainer>
                                              <Button color="primary" onClick={()=>{update_tasktime(task.task_id)}}  type="submit">Save Time</Button>
                                            </form>
                                          </>
                                        )}
                                        {/*Time Modulule*/}
                              </GridItem>
                            </GridContainer>

                            <GridContainer>
                              <GridItem>
                                <ReactQuill forwardedRef={quillRef} modules={modules} theme="snow" onChange={setCommentValue} />
                                  <button className="btn btn-primary" onClick={()=> { sendMessage(task.task_id), close() } }>Save</button>
                              </GridItem>
                            </GridContainer>
                          
                          {comments.map((uComment)=>{
                            return(
                              <span>
                                <GridContainer>
                                  <GridItem>
                                    <span>{uComment.username}</span>
                                  </GridItem>
                                </GridContainer>

                                <GridContainer>
                                                  <GridItem>
                                                    <div>

                                                    <ReactQuill value={uComment.comment} theme="bubble" readOnly />

                      <Popup trigger={ <span><button onClick={()=>{ editComment(uComment.id)} } disabled={ uComment.username != cookies.name }>Edit</button></span> }
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
                                  <ReactQuill forwardedRef={quillRef} modules={modules} theme="snow" onChange={setEditComment} value={commentEdit} />
                                </form>
                              </GridItem>
                            </GridContainer>
                            <CardFooter>
                                <Button color="primary" type="submit"  onClick={() => { updateComment(uComment.id, commentEdit), close() }}>Update</Button>
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
                        })}
                            </CardBody>
                          </Card>
                        </form>
                        </GridItem>
                        </GridContainer>

                      </div>

                      )}
                      </Popup>

                      <Popup trigger={<div hidden={cookies.Role_id == "2"}><MdDelete/></div>} modal >
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
                    </td>
                  </tr>
                  <p className={showTime==task.task_id ? 'content show':'content'}>
                    {/*Time Modulule*/}
                    <p>
                    {TimeData.length==0?(
                      <>
                        <GridContainer>
                          <GridItem>
                            <input value={task.task_id} type="hidden"/>
                            <p>Estimate Time - {estimate}</p>
                            <p>Spent Time - {spent}</p>
                          </GridItem>
                        </GridContainer>
                      </>
                      ):(
                      <>
                        <GridContainer>
                          <GridItem>
                            <input value={task.task_id} type="hidden"/>
                            <p>Estimate Time - {userdata.estimate_time}</p>
                            <p>Spent Time - {userdata.spent_time} </p>
                          </GridItem>
                        </GridContainer>
                      </>
                      )}
                    {/*Time Modulule*/}
                      </p>
                      <p>
                      {/* display comments in dropdown */}
                        {dropdown_Comments.map((dComment)=>{
                          return(
                            <span>
                              <GridContainer>
                                <GridItem>
                                  <p>{dComment.username}</p>
                                  <p><ReactQuill value={dComment.comment} theme="bubble" readOnly /></p>
                                  <p>{dComment.creation_time}</p>
                                </GridItem>
                              </GridContainer>
                            </span>
                          )
                        })}
                      </p>
                      {/* display comments in dropdown */}
                  </p>
                  </>
                ) 
              }
            }
          })}
        </table>
      ) : (<div className="no_Data"><h4 className="no-data">No Data</h4></div>)}
      </>
    ):("")}
    
    {/* </GridItem> */}
      <ToastContainer limit={1}/>
    </GridContainer>
    </div>
  );
}

Dashboard.layout = Modules;

export default Dashboard;