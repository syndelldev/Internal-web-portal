import React, { useEffect, useMemo, useRef } from "react";
import { useState } from "react";
import { useRouter } from 'next/router';
import { makeStyles } from "@material-ui/core/styles";
import Modules from "../layouts/Modules";
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
// import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import Popup from "reactjs-popup";
import DatePicker from "react-datepicker";
import Multiselect from "multiselect-react-dropdown";
import { ToastContainer, toast } from 'react-toastify';
import { FaArrowDown,FaArrowUp } from 'react-icons/fa';
import { FiEdit } from "react-icons/fi";
import { FaEye } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useCookies } from 'react-cookie';
import axios from "axios";
import dynamic from "next/dynamic";


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
    paddingRight: "15px",
    cursor: "pointer",
  },
};

export async function getServerSideProps(context){
  const res = await fetch(`${server}/api/project`);
  const project_details = await res.json();

  const response = await fetch(`${server}/api/user_dashboard`, {
    headers: {
      'Access-Control-Allow-Credentials': true,
      Cookie: context.req.headers.cookie
    },
  })
  const user_project = await response.json()
  console.log(user_project)

  const resp = await fetch(`${server}/api/admin`)
  const User_name = await resp.json();

  const department = await fetch(`${server}/api/user/user_department`);
  const user_Department = await department.json();

  const lang = await fetch(`${server}/api/language`)
  const language = await lang.json();

  const lang_department = await fetch(`${server}/api/languageDepartment`)
  const languageDepartment = await lang_department.json();

  return{ props: { project_details, user_project, User_name, language, user_Department, languageDepartment } }
}

function Dashboard( { project_details, user_project, User_name, language, user_Department, languageDepartment } ) {

  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const [cookies, setCookie] = useCookies(['name']);

  // redirect page if cookies is not set
  useEffect(() => {
    if(!cookies.name){
      router.push(`${server}/login`);
    }
  });

  //Notification Start
  const createNotification = (project_id) => {
    console.log(project_id)
    toast.info('Notification !', {
      position: "top-right",
      autoClose:false,
      theme: "colored",
      hideProgressBar: true,
    });
  }
  //Notification End

  //Fetch API According Role Start
  if(cookies.Role_id==1 || cookies.Role_id==3){
    var project_details = project_details;
  }
  else if(cookies.Role_id==2){
    var project_details = user_project;
  }

  //Fetch API According Role End
  const [addStartDate, setStart_Date] = useState();
  const [addEndDate, setEnd_Date] = useState();

  //today date
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + '/' + mm + '/' + dd;
  // console.log(today);

  //for On_track
  const On_track = [];

  //for Off_track
  const Off_track = [];

  const deleteProject = async(id) =>{
    console.log('delete');
    console.log(id);

    const res = await fetch(`${server}/api/project/${id}`);
    router.push(`${server}/projects`);
  }

  const [uoption, setUpdate] = React.useState({ 
    project_title: "",
    project_description: "",
    project_department: "",
    project_language: "",
    project_start: "",
    project_deadline: "",
    project_priority: "",
    project_status: "",
    project_person: ""
  });

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [updateSelected, setUpdateSelected] = React.useState([]);

  const [ userID , setUserId] = useState();

  const userId = async(id) =>{

    const added_By = [];
    const user = await fetch(`${server}/api/user_dashboard/${id}`)
    const User_id = await user.json()

    User_id.map((user) => {
      added_By.push({ 'label' : user.username , 'value' : user.username  })
    })
    setUserId(added_By[0]);

  }
  const add_user = [];
  add_user.push(userID);
  
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
  const [u_Language, setLanguage] = useState([]);

  const [all_Department, setAllDepartment] = useState([]);
  useEffect(() =>{
    const u_data = async() =>{
  
      const getDepartment = [];
      languageDepartment.map((department)=>{
        getDepartment.push( {'label' :department.language_department, 'value' :department.language_department} );
      });
      setAllDepartment(getDepartment);
    }
    u_data();
  },[]);
  const [u_Department, setDepartment] = useState([]);

  const projectId = async(id) =>{
    console.log('update project id');
    console.log(id);

    const response = await fetch(`${server}/api/project/update/${id}`)
    const update_data = await response.json();

    const udata = update_data[0];

    const selectedMember = (udata.project_person).split(",");

    const getAllname = [];

    selectedMember.map((user)=>{
      getAllname.push( {'label' :user, 'value' :user} );
    });

    const getLanguage = [];
    getLanguage.push( {'label' :udata.project_language, 'value' :udata.project_language} );

    const getDepartment = [];
    getDepartment.push( {'label' :udata.project_department, 'value' :udata.project_department} );

    setLanguage(getLanguage);
    setDepartment(getDepartment);
    setUpdateSelected(getAllname);
    setUpdate(udata);
    setStartDate(new Date(udata.project_start));
    setEndDate(new Date(udata.project_deadline));

  }

  const [selected, setSelected] = useState([userID]);

  const handleChange = ({ target: { name, value } }) =>{  
    setUpdate({ ...uoption, [name]: value });
  }

  var uMember = uoption.project_person;
  const allSelectedMember = [];
  const projectMember = (uMember).split(",");

  for(var i=0; i<projectMember.length; i++){
    allSelectedMember.push({'label' :projectMember[i] , 'value' : projectMember[i]});
  }

  const toastId = React.useRef(null);
  const updateProject = async() =>{
    const allMember = [];

    for(var i=0; i<updateSelected.length; i++){
          allMember.push(updateSelected[i].value);
    }
  
    if( uoption.project_title=="" || uoption.project_description=="" ||  uoption.project_department=="" || uoption.project_language=="" || allMember=="" || startDate=="" || endDate=="" || uoption.project_priority=="" || uoption.project_status=="" ){
      if(! toast.isActive(toastId.current)) {
        toastId.current = toast.error('Please fill all the required fields!', {
            position: "top-right",
            autoClose:5000,
            theme: "colored",
            closeOnClick: true,
            hideProgressBar: true,
          });
        }
  
  }else{

    const res = await fetch(`${server}/api/project/update_project`,{
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ project_id:uoption.project_id, project_person: allMember, project_status:uoption.project_status , project_department:uoption.project_department ,  project_title: uoption.project_title , project_description:uoption.project_description , project_language:uoption.project_language, project_priority:uoption.project_priority, project_start: startDate , project_deadline: endDate }),
    });
    if(!toast.isActive(toastId.current)) {
      toastId.current = toast.success('Project updated successfully !', {
          position: "top-right",
          autoClose:1000,
          theme: "colored",
          hideProgressBar: true,
          });
      }
      router.reload(`${server}/projects`);
  }
}

  const { register,  watch, handleSubmit, formState: { errors }, setValue } = useForm(); 
  const router = useRouter();

  const onSubmit = async (result) =>{
    
    console.log("result");
    console.log(result.start.toDateString());
    const p_start = result.start.toDateString();
    const p_end = result.end.toDateString();

    if(u_Language != ""){
      var Language = u_Language[0].value;
    }

    if(u_Department != ""){
      var Department = u_Department[0].value;
    }

    if(result.project_title != ""){
      const res = await fetch(`${server}/api/project/addproject`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({project_person:selected,project_department:Department,project_status:result.project_status , project_title:result.project_title, project_description:result.project_description, project_language:Language, project_priority:result.project_priority, project_start: p_start , project_deadline: p_end , projectAdded_by: cookies }),
      })
      const data=await res.json();
      
      if(res.status==200)
      {
        if(!toast.isActive(toastId.current)) {
          toastId.current = toast.success('Project added Successfully ! 🎉', {
              position: "top-right",
              autoClose:1000,
              theme: "colored",
              hideProgressBar: true,
              });
        }
        router.reload(`${server}/projects`);
      }
      else
      {
        alert("Fail");
      }
    }else{

      if(! toast.isActive(toastId.current)) {
        toastId.current = toast.error('Please fill all the required fields', {
            position: "top-right",
            autoClose:5000,
            theme: "colored",
            closeOnClick: true,
            hideProgressBar: true,
          });
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

  // project Running block open and close onclick
  const [projectRunning, setprojectRunning] = useState([]);
  const project_running = (project) => {
    setprojectRunning(project);
  }
  const closeTaskToDo = async(project) =>{
    if(projectRunning != ""){
      setprojectRunning("");
    }
    else{
      setprojectRunning(project);
    }
  }

  // project onhold block open and close onclick
  const [projectOnHold, setprojectOnHold] = useState([]);
  const project_OnHold = (project) => {
    setprojectOnHold(project);
  }
  const closeOnHold = async(project) =>{
    if(projectOnHold != ""){
      setprojectOnHold("");
    }
    else{
      setprojectOnHold(project);
    }
  }

  // project Completed block open and close onclick
  const [projectCompleted, setprojectCompleted] = useState([]);
  const project_Completed = (project) => {
    setprojectCompleted(project);
  }
  const closeCompleted = async(project) =>{
    if(projectCompleted != ""){
      setprojectCompleted("");
    }
    else{
      setprojectCompleted(project);
    }
  }

  const [onhold_title, setonhold_title] = useState(false);
  const [running_title, setrunning_title] = useState(false);
  const [completed_title, setcompleted_title] = useState(false);

  const [showTime, setshowTime] = useState(null);
    const toggle=(project_id)=>{
      // alert(project_id)
      if(showTime==project_id){
        return setshowTime(null)
      }
      setshowTime(project_id)
    }

    const [comments, setcomments] = useState([]);
    // console.log(comments);
    
    const getData = async (project_id)=>{
      var comment = await axios.post(`${server}/api/comment/getProjectComment`, { project_id: project_id });
      setcomments(comment.data)
    }
    // add comment
    const sendMessage = async (project_id) => {
      const date = new Date().toLocaleString();
      console.log("date");
      console.log(date);
  
      var addComment = await axios.post(`${server}/api/comment/addProjectComments`, {  username: cookies.name, message: value , project_id: project_id, created_D: date });

      if(!toast.isActive(toastId.current)) {
        toastId.current = toast.success('Comment added successfully!', {
            position: "top-right",
            autoClose:1000,
            theme: "colored",
            hideProgressBar: true,
          });
      }
    }

    // get and set comment values in editor
    const [ value, setValues ] = useState("");
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
  
    const [commentEdit, setEditComment] = useState();

    // comment ID API
      const editComment = async( id ) =>{
        console.log("id");
        console.log(id);
  
        var commentId = await axios.post(`${server}/api/comment/comment_id`, { comment_id: id, user: cookies.name });
        console.log(commentId.data[0]);
  
        if(commentId.data != ""){
          setEditComment(commentId.data[0].comment);
          console.log("edit");
          console.log(commentEdit);
          console.log(commentId.data[0].comment);        
        }
      }

      // update comment API
      const updateComment = async(id, comment) =>{
        console.log("update");
        console.log(comment);
        console.log(id);
        var comments = await axios.post(`${server}/api/comment/updateComment`, { comment_id: id, user: cookies.name, comment:comment });

        if(!toast.isActive(toastId.current)) {
          toastId.current = toast.success('Comment updated successfully!', {
              position: "top-right",
              autoClose:1000,
              theme: "colored",
              hideProgressBar: true
            });
        }
        router.reload(`${server}/projects`);
      }

      // date range
      const [dateRange, setDateRange] = useState([null, null]);
      // startdate and enddate get value
      const [startDates, endDates] = dateRange;
      // get selected dates projects list
      const [dateDetails, setDateDetails] = useState();
      // get selected dates projects list for user
      const [date_uData, setDate_uDetails] = useState();
      // onclick show data
      const [dateDataDisplay, setData] = useState(false);
    
      // daterange function onClick
      const date_Range = async() =>{
        if(startDates != null && endDates != null){
          console.log(dateRange);

          const res = await fetch(`${server}/api/project/dateRange_Projects`,{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify({ dateStart: startDates, dateEnd: endDates }),
          })
          const date_Data=await res.json()
          
          if(res.status==200)
          {
            setDateDetails(date_Data);
            setData(true);
          }

          const response = await fetch(`${server}/api/project/dateRange_ProjectsUser`,{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify({ dateStart: startDates, dateEnd: endDates, user: cookies.name }),
          })
          const date_uData=await response.json()
          // console.log("user data");
          // console.log(date_uData);
          
          if(response.status==200)
          {
            setDate_uDetails(date_uData);
            setData(true);
          }
              
        }else{
          // select startDate and endDate toast error
          if(! toast.isActive(toastId.current)) {
            toastId.current = toast.error('Please select dates range!', {
                position: "top-right",
                autoClose:2000,
                theme: "colored",
                closeOnClick: true,
                hideProgressBar: true,
              });
          }
        }
      }
      
      if(cookies.Role_id==1 || cookies.Role_id==3){
        var project_list = dateDetails;
        console.log(project_list);
      }
      else if(cookies.Role_id==2){
        var project_list = date_uData;
        console.log(project_list);
      }
    
      
  return (
    <span>

      <div className="buttonalign" hidden={cookies.Role_id == "2"} >
        <GridContainer>
          <GridItem>
            <Popup trigger={<div><button className="bttn-design" onClick={ ()=> userId(cookies.Id)}>Add Project</button></div>} className="popupReact" modal>
            {close => (
              <div>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <form onSubmit={handleSubmit(onSubmit)}>              
                      <Card>
                        <CardHeader color="primary">
                          <GridContainer>
                            <GridItem>
                              <h4 className="Updatedetails">Create Project</h4>
                              <p className="Updatedetails">Enter your new project details</p>
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
                                    <span>Project Title</span><span className="required">*</span>
                                    <input type="text" className="form-control signup-input" placeholder="Project Title" {...register('project_title',  { required: "Please enter project title"})} />
                                    <div className="error-msg">{errors.project_title && <span>{errors.project_title.message}</span>}</div>
                                  </div> 
                                </GridItem>
                              </GridContainer><br/>
                    
                              <GridContainer>  
                                <GridItem xs={12} sm={12} md={12}>
                                  <div className="form-group">
                                  <span>Project Description</span><span className="required">*</span>
                                    <textarea className="form-control signup-input" placeholder="Project Description" {...register('project_description', { required: 'Description is required', } )}  />
                                    <div className="error-msg">{errors.project_description && <span>{errors.project_description.message}</span>}</div>
                                  </div> 
                                </GridItem>
                              </GridContainer><br/>

                              <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                                    <div className="form-group">
                                    <span>Project Department</span><span className="required">*</span>
                                    <Multiselect
                                      displayValue="value"
                                      options={all_Department}
                                      value={u_Department}
                                      selectionLimit="1"
                                      onChange={setDepartment}
                                      onRemove={setDepartment}
                                      onSearch={function noRefCheck(){}}
                                      onSelect={setDepartment}
                                      placeholder="Project Department"
                                      showArrow={true}
                                    />
                                    </div> 
                                </GridItem>

                                <GridItem xs={12} sm={12} md={6}>
                                  <div className="form-group">
                                  <span>Project Language</span><span className="required">*</span>
                                  <Multiselect
                                    displayValue="value"
                                    options={all_Language}
                                    value={u_Language}
                                    selectionLimit="1"
                                    onChange={setLanguage}
                                    onRemove={setLanguage}
                                    onSearch={function noRefCheck(){}}
                                    onSelect={setLanguage}
                                    placeholder="Project Language"
                                    showArrow={true}
                                  />
                                  <div className="error-msg">{errors.project_language && <span>{errors.project_language.message}</span>}</div>
                                  </div> 
                                </GridItem>
                              </GridContainer><br/>

                              <GridContainer>  
                                <GridItem xs={12} sm={12} md={6}>
                                  <div className="form-group" {...register('project_start')}>
                                  <span>Project Start Date</span><span className="required">*</span>
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
                                  <div className="error-msg">{errors.project_start && <span>{errors.project_start.message}</span>}</div>
                                  </div> 
                                </GridItem>

                                <GridItem xs={12} sm={12} md={6}>
                                  <div className="form-group" {...register('project_deadline')}>
                                  <span>Project End Date</span><span className="required">*</span>
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
                                  <div className="error-msg">{errors.project_deadline && <span>{errors.project_deadline.message}</span>}</div>
                                  </div> 
                                </GridItem>
                              </GridContainer><br/>

                              <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                                  <div className="form-group">
                                  <span>Project Priority</span><span className="required">*</span>
                                    <select name="priority" id="priority" className="form-control signup-input" {...register('project_priority', {required:true ,message:'Please select atleast one option', })}>
                                      <option value=""  disabled selected>Select Project Priority</option>
                                      <option value="High" className="high">High</option>
                                      <option value="Medium" className="medium">Medium</option>
                                      <option value="Low"className="low">Low</option>
                                    </select>
                                    <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                                    <div className="error-msg">{errors.project_priority && <span>{errors.project_priority.message}</span>}</div>
                                  </div> 
                                </GridItem>
                  
                                <GridItem xs={12} sm={12} md={6}>
                                    <div className="form-group">
                                      <span>Project Status</span><span className="required">*</span>
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
                                  <span>Project Members</span><span className="required">*</span>
                                  <Multiselect
                                  displayValue="value"
                                    options={uoptions}
                                    value={selected}
                                    // selectedValues={add_user}
                                    onChange={setSelected}
                                    onRemove={setSelected}
                                    onSelect={setSelected}
                                    placeholder="Select Project Members"
                                    showArrow={true}
                                  />
                                  <div className="error-msg">{errors.project_person && <span>{errors.project_person.message}</span>}</div>
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
            <div className="department_dropdown">
            <button className="dropdown_button">Project Departments</button>
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
              <button className="dropdown_button">Project Languages</button>
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
      {/* <div className="Project-title">Projects</div> */}
  <div className="main_task_title">
    <div className="Project-title">Projects</div>
    <GridContainer>
      <GridItem>
        <button className="bttn-design" onClick={()=> 
          {  project_running("running"), closeOnHold("running"), setrunning_title(true), project_OnHold("on hold"), closeTaskToDo("on hold"), setonhold_title(true)
          project_Completed("completed"), closeCompleted("completed"), setcompleted_title(true) }}
          >Expand All</button>

        <button className="bttn-design" onClick={()=> 
          {  project_running("running"), closeOnHold("running"), setrunning_title(false), project_OnHold("on hold"), closeTaskToDo("on hold"), setonhold_title(false)
          project_Completed("completed"), closeCompleted("completed"), setcompleted_title(false) }}
          >Collapse All</button>
        </GridItem>

      <GridItem>

        <DatePicker
        monthsShown={2}
          selectsRange={true}
          startDate={startDates}
          endDate={endDates}
          onChange={(update) => {
            setDateRange(update);
          }}
          isClearable={true}
          dateFormat="dd/MM/yyyy"
        />
        <button onClick={() => date_Range()}>enter</button>

      </GridItem>
    </GridContainer>
  </div>

{/* selected daterange projects list data start */}
{dateDataDisplay ? (
  <span>
    <h3>Projects List</h3>
    <table className="project-data" >
      <tr className="project-data-title">
            <th  className="status">Project Name</th>
            <th className="Priority">Priority</th>
            <th className="assignee">Assignee</th>
          </tr>
          {dateDetails.map((project)=>{
            if(project.project_delete == "no"){
                var person = project.project_person.split(",");
                return(
                  <tr key={project.project_id} onClick={()=>{toggle(project.project_id)}} className="expand_dropdown">
                    <td className="project-title-table">{project.project_title}</td>
                    <td className="priority-data"><p className={project.project_priority}>{project.project_priority}</p></td>
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
                            <Popup trigger={<a className="icon-edit-delete"><div className='chip'><span>+</span></div></a>} className="popupReact"  position="left">
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
                  </tr>
                )
            }
          })}
        </table>

  </span>
) 
: ("")

}
{/* selected daterange projects list data end */}

    <GridContainer>
    
{/***** Running Project start *****/}
<Card className="task_title_status">
      <GridContainer >
        <GridItem xs={12} sm={12} md={12} >
          <div onClick={()=> {  project_running("running") , closeOnHold("running") , setrunning_title(!running_title) }} className="task_title" > Project In Progress {running_title ? <FaArrowUp/>:<FaArrowDown/>}  </div> 
        </GridItem>
      </GridContainer>
    </Card>
    {running_title ? (
      <>
        <table className="project-data" >
          <tr className="project-data-title">
            <th  className="status">Project Name</th>
            <th className="Priority">Priority</th>
            <th className="assignee">Assignee</th>
            <th className="view-edit">View & Edit</th>
          </tr>
          {project_details.map((project)=>{
            if(project.project_delete == "no"){
              if(project.project_status == 'running'){
                var person = project.project_person.split(",");
                return(
                  <tr key={project.project_id} onClick={()=>{toggle(project.project_id)}} className="expand_dropdown">
                    <td className="project-title-table">{project.project_title}</td>
                    <td className="priority-data"><p className={project.project_priority}>{project.project_priority}</p></td>
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
                      {/* Edit popUp Start*/}
                      <Popup trigger={<a className="icon-edit-delete"><div className='icon-width' onClick={()=> { projectId(project.project_id), getData(project.project_id) } }><FiEdit/></div></a>} className="popupReact" modal nested>
                      {close => (
                        <div className="popup-align">
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                              <form onSubmit={handleSubmit(onSubmit)}> 
                                <Card>
                                  <CardHeader color="primary">
                                    <GridContainer>
                                      <GridItem>
                                        <h4 className={classes.cardTitleWhite + ' ' + 'text-white'}>Edit Project</h4>
                                        <p className={classes.cardCategoryWhite + ' ' + 'text-white'}>Update your project details</p>
                                      </GridItem>
                                      <div className={classes.close}>
                                        <a onClick={close}>&times;</a>
                                      </div>
                                    </GridContainer>
                                  </CardHeader>
                                  <CardBody className="Project-sidebar">

                                  <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>                      
                                      <div className="form-group">
                                        <span>Project Title</span><span className="required">*</span>
                                        <input type="text" className="form-control signup-input" name="project_title" placeholder="Project Title" disabled={cookies.Role_id == "2" || cookies.Role_id == "3"} value={uoption.project_title} onChange={handleChange} />
                                      </div>
                                    </GridItem>
                                  </GridContainer><br/>

                                  <GridContainer>  
                                    <GridItem xs={12} sm={12} md={12}>
                                      <div className="form-group">
                                      <span>Project Description</span><span className="required">*</span>
                                        <textarea className="form-control signup-input" disabled={cookies.Role_id == "2"} value={uoption.project_description} name="project_description"onChange={handleChange} placeholder="Project Description" />
                                      </div> 
                                    </GridItem>
                                  </GridContainer><br/>

                                  <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <div className="form-group">
                                        <span>Project Department</span><span className="required">*</span>
                                        <Multiselect
                                          displayValue="value"
                                          options={all_Department}
                                          value={u_Department}
                                          selectedValues={u_Department}
                                          selectionLimit="1"
                                          onChange={setDepartment}
                                          onRemove={setDepartment}
                                          onSearch={function noRefCheck(){}}
                                          onSelect={setDepartment}
                                          placeholder="Project Department"
                                          showArrow={true}
                                        />
                                        </div> 
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={6}>
                                      <div className="form-group">
                                      <span>Project Language</span><span className="required">*</span>
                                      <Multiselect
                                        displayValue="value"
                                        options={all_Language}
                                        value={u_Language}
                                        selectedValues={u_Language}
                                        selectionLimit="1"
                                        onChange={setLanguage}
                                        onRemove={setLanguage}
                                        onSearch={function noRefCheck(){}}
                                        onSelect={setLanguage}
                                        placeholder="Project Language"
                                        showArrow={true}
                                      />
                                      </div> 
                                    </GridItem>
                                  </GridContainer><br/>

                                  <GridContainer>  
                                    <GridItem xs={12} sm={12} md={6}>
                                      <div className="form-group" onChange={handleChange} >
                                      <span>Project Start Date</span><span className="required">*</span>
                                        <DatePicker
                                          disabled={cookies.Role_id == "2"}
                                          placeholderText="Start Date : dd/mm/yyyy"
                                          isClearable
                                          name="datetime"
                                          className={"form-control"}
                                          value={new Date(uoption.project_start)}
                                          selected={startDate}
                                          onChange={val => {
                                            setStartDate(val);
                                            setValue("start", val);
                                          }}
                                          dateFormat="dd-MM-yyyy"
                                        />
                                      </div> 
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={6}>
                                      <div className="form-group" onChange={handleChange}>
                                      <span>Project End Date</span><span className="required">*</span>
                                        <DatePicker
                                          disabled={cookies.Role_id == "2"}
                                          placeholderText="End Date : dd/mm/yyyy"
                                          isClearable
                                          name="datetime1"
                                          value={new Date(uoption.project_deadline)}
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
                                    <GridItem xs={12} sm={12} md={6}>
                                      <div className="form-group">
                                      <span>Project Priority</span><span className="required">*</span>
                                        <select name="project_priority" id="priority" className="form-control signup-input" value={uoption.project_priority} onChange={handleChange} disabled={cookies.Role_id == "2"}>
                                          <option value=""  disabled selected>Select Project Priority</option>
                                          <option value="High" className="High">High</option>
                                          <option value="Medium" className="Medium">Medium</option>
                                          <option value="Low"className="Low">Low</option>
                                        </select>
                                        <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                                      </div> 
                                    </GridItem>
                                  
                                    <GridItem xs={12} sm={12} md={6}>
                                        <div className="form-group">
                                          <span>Project Status</span><span className="required">*</span>
                                            <select name="project_status" id="Status" className="form-control signup-input" value={uoption.project_status} onChange={handleChange} disabled={cookies.Role_id == "2"} >
                                              <option value=""  disabled selected>Select Project Status</option>
                                              <option value="on hold">On hold</option>
                                              <option value="running">Running</option>
                                              <option value="completed">Completed</option>
                                            </select>
                                          <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                                        </div> 
                                    </GridItem>
                                  </GridContainer><br/>

                                  <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <div className="form-group">     
                                        <span>Project Members</span><span className="required">*</span>
                                          <Multiselect
                                            disable={cookies.Role_id == "2"}
                                            displayValue="value"
                                            options={uoptions}
                                            value={updateSelected}
                                            selectedValues={allSelectedMember}
                                            onChange={setUpdateSelected}
                                            onRemove={setUpdateSelected}
                                            onSelect={setUpdateSelected}
                                            placeholder="Select Project Members"
                                            showArrow={true}
                                            />
                                        </div> 
                                      </GridItem>
                                    </GridContainer><br/>
                                  </CardBody>
                                <div hidden={cookies.Role_id == "2"}>
                                  <CardFooter>
                                    <Button color="primary" onClick={()=> { updateProject(project.project_id); createNotification(project.project_id) } }>Save</Button>
                                    <Button className="button" onClick={() => { close(); }}> Cancel </Button>
                                  </CardFooter>
                                </div>

                                <CardBody className="Project-sidebar-comments">
                                <GridContainer>
                                    <GridItem>
                                      <form>
                                        <h5 className="project-comments">Comments</h5>
                                          <ReactQuill
                                          forwardedRef={quillRef}
                                            modules={modules}
                                            // value={value}
                                            theme="snow" 
                                            onChange={setValues} 
                                          />
                                        <button className="btn btn-primary" onClick={()=> {sendMessage(project.project_id), close()} }>Save</button>
                                      </form>
                                    </GridItem>
                                  </GridContainer>

                                  {comments.map((m)=>{
                                    // console.log("comments");
                                    // console.log(comments);
                                      return(
                                        <span className="comment-box">
                                          <GridContainer className="comment-box">
                                            <GridItem className="comment-box"> 
                                              <span className="name">{m.username}</span>
                                            </GridItem>
                                                
                                            <GridItem className="comment-box">
                                            <span><p>{m.creation_time}</p></span>
                                            </GridItem>
                                          </GridContainer>

                                          <GridContainer>
                                            <GridItem>
                                              <div>

                                              <ReactQuill value={m.comment} theme="bubble" readOnly />
      <Popup
        trigger={ <span><button className="btn btn-primary" onClick={()=>{ editComment(m.id)} } disabled={ m.username != cookies.name }>Edit</button></span> }
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
                                      <Button color="primary" type="submit"  onClick={() => { updateComment(m.id, commentEdit) }}>Update</Button>
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
                      {/*Edit popup End*/}
                      {/*Delete popUp Start*/}
                      <Popup trigger={<div className="icon-edit-delete" hidden={cookies.Role_id == "2"}><MdDelete/></div>} modal>
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
                        {/*Delete popUp End*/}
                    </td>
                  </tr>
                )
              }
            }
          })}
        </table>
      </>
    ):("")}
    {/***** Running Project End *****/}

    {/***** On Hold Project start *****/}
    <Card className="task_title_status">
      <GridContainer >
        <GridItem xs={12} sm={12} md={12} >
          <div onClick={()=> {  project_OnHold("on hold") , closeTaskToDo("on hold") , setonhold_title(!onhold_title) }} className="task_title" > Project On Hold {onhold_title ? <FaArrowUp/>:<FaArrowDown/>}  </div> 
        </GridItem>
      </GridContainer>
    </Card>
    {onhold_title ? (
      <>
        <table className="project-data" >
          <tr className="project-data-title">
            <th className="status">Project Name</th>
            <th className="Priority">Priority</th>
            <th className="assignee">Assignee</th>
            <th className="view-edit">View & Edit</th>
          </tr>
          {project_details.map((project)=>{
            if(project.project_delete == "no"){
              if(project.project_status == 'on hold'){
                var person = project.project_person.split(",");
                return(
                  <tr key={project.project_id} onClick={()=>{toggle(project.project_id)}} className="expand_dropdown">
                    <td className="project-title-table">{project.project_title}</td>
                    <td className="priority-data"><p className={project.project_priority}>{project.project_priority}</p></td>
                    <td className="project-priority-person">
                    {person.length>2 ? (
                        <span>
                          <div className="chip">
                            <span>{person[0]}</span>
                          </div>
                          <div className="chip">
                            <span>{person[1]}</span>
                          </div>
                            {/* Edit popUp Start*/}
                            <Popup trigger={<a className="icon-edit-delete"><div className='chip'><span>Load more</span></div></a>} position="left">
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
                        </span>
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
                    <td>
                      {/* Edit popUp Start*/}
                      <Popup trigger={<a className="icon-edit-delete"><div className='icon-width' onClick={()=> { projectId(project.project_id), getData(project.project_id) } }><FiEdit/></div></a>} className="popupReact" modal nested>
                      {close => (
                        <div className="popup-align">
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                              <form onSubmit={handleSubmit(onSubmit)}> 
                                <Card>
                                  <CardHeader color="primary">
                                    <GridContainer>
                                      <GridItem>
                                        <h4 className={classes.cardTitleWhite + ' ' + 'text-white'}>Edit Project</h4>
                                        <p className={classes.cardCategoryWhite + ' ' + 'text-white'}>Update your project details</p>
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
                                        <span>Project Title</span><span className="required">*</span>
                                        <input type="text" className="form-control signup-input" name="project_title" placeholder="Project Title" disabled={cookies.Role_id == "2"} value={uoption.project_title} onChange={handleChange} />
                                      </div>
                                    </GridItem>
                                  </GridContainer><br/>

                                  <GridContainer>  
                                    <GridItem xs={12} sm={12} md={12}>
                                      <div className="form-group">
                                      <span>Project Description</span><span className="required">*</span>
                                        <textarea className="form-control signup-input" disabled={cookies.Role_id == "2"} value={uoption.project_description} name="project_description"onChange={handleChange} placeholder="Project Description" />
                                      </div> 
                                    </GridItem>
                                  </GridContainer><br/>

                                  <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <div className="form-group">
                                        <span>Project Department</span><span className="required">*</span>
                                        <Multiselect
                                          displayValue="value"
                                          options={all_Department}
                                          value={u_Department}
                                          selectedValues={u_Department}
                                          selectionLimit="1"
                                          onChange={setDepartment}
                                          onRemove={setDepartment}
                                          onSearch={function noRefCheck(){}}
                                          onSelect={setDepartment}
                                          placeholder="Project Department"
                                          showArrow={true}
                                        />
                                        </div> 
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={6}>
                                      <div className="form-group">
                                      <span>Project Language</span><span className="required">*</span>
                                      <Multiselect
                                        displayValue="value"
                                        options={all_Language}
                                        value={u_Language}
                                        selectedValues={u_Language}
                                        selectionLimit="1"
                                        onChange={setLanguage}
                                        onRemove={setLanguage}
                                        onSearch={function noRefCheck(){}}
                                        onSelect={setLanguage}
                                        placeholder="Project Language"
                                        showArrow={true}
                                      />
                                      </div> 
                                    </GridItem>
                                  </GridContainer><br/>

                                  <GridContainer>  
                                    <GridItem xs={12} sm={12} md={6}>
                                      <div className="form-group" onChange={handleChange} >
                                      <span>Project Start Date</span><span className="required">*</span>
                                        <DatePicker
                                          disabled={cookies.Role_id == "2"}
                                          placeholderText="Start Date : dd/mm/yyyy"
                                          isClearable
                                          name="datetime"
                                          className={"form-control"}
                                          value={new Date(uoption.project_start)}
                                          selected={startDate}
                                          onChange={val => {
                                            setStartDate(val);
                                            setValue("start", val);
                                          }}
                                          dateFormat="dd-MM-yyyy"
                                        />
                                      </div> 
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={6}>
                                      <div className="form-group" onChange={handleChange}>
                                      <span>Project End Date</span><span className="required">*</span>
                                        <DatePicker
                                          disabled={cookies.Role_id == "2"}
                                          placeholderText="End Date : dd/mm/yyyy"
                                          isClearable
                                          name="datetime1"
                                          value={new Date(uoption.project_deadline)}
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
                                    <GridItem xs={12} sm={12} md={6}>
                                      <div className="form-group">
                                      <span>Project Priority</span><span className="required">*</span>
                                        <select name="project_priority" id="priority" className="form-control signup-input" value={uoption.project_priority} onChange={handleChange} disabled={cookies.Role_id == "2"}>
                                          <option value=""  disabled selected>Select Project Priority</option>
                                          <option value="High" className="High">High</option>
                                          <option value="Medium" className="Medium">Medium</option>
                                          <option value="Low"className="Low">Low</option>
                                        </select>
                                        <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                                      </div> 
                                    </GridItem>
                                  
                                    <GridItem xs={12} sm={12} md={6}>
                                        <div className="form-group">
                                          <span>Project Status</span><span className="required">*</span>
                                            <select name="project_status" id="Status" className="form-control signup-input" value={uoption.project_status} onChange={handleChange} disabled={cookies.Role_id == "2"} >
                                              <option value=""  disabled selected>Select Project Status</option>
                                              <option value="on hold">On hold</option>
                                              <option value="running">Running</option>
                                              <option value="completed">Completed</option>
                                            </select>
                                          <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                                        </div> 
                                    </GridItem>
                                  </GridContainer><br/>

                                  <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <div className="form-group">     
                                        <span>Project Members</span><span className="required">*</span>
                                          <Multiselect
                                            disabled={cookies.Role_id == "2"}
                                            displayValue="value"
                                            options={uoptions}
                                            value={updateSelected}
                                            selectedValues={allSelectedMember}
                                            onChange={setUpdateSelected}
                                            onRemove={setUpdateSelected}
                                            onSelect={setUpdateSelected}
                                            placeholder="Select Project Members"
                                            showArrow={true}
                                            disable={cookies.Role_id == "2"}
                                            />
                                        </div> 
                                      </GridItem>
                                    </GridContainer><br/>

                                  </CardBody>
                                <div hidden={cookies.Role_id == "2"}>
                                  <CardFooter>
                                    <Button color="primary" onClick={()=> { updateProject(project.project_id); } }>Save</Button>
                                    <Button className="button" onClick={() => { close(); }}> Cancel </Button>
                                  </CardFooter>
                                </div>

                                <CardBody>
                                <GridContainer>
                                    <GridItem>
                                      <form>
                                        <h5 className="project-comments">Comments</h5>
                                          <ReactQuill
                                          forwardedRef={quillRef}
                                            modules={modules} 
                                            theme="snow" 
                                            onChange={setValues} 
                                          />
                                        <button className="btn btn-primary" onClick={()=> {sendMessage(project.project_id), close()} }>Save</button>
                                      </form>
                                    </GridItem>
                                  </GridContainer>

                                  {comments.map((m)=>{
                                    // console.log("comments");
                                    // console.log(comments);
                                      return(
                                        <span>
                                          <GridContainer>
                                            <GridItem>
                                              <span>{m.username}</span>
                                            </GridItem>
                                                
                                            <GridItem>
                                            <span><p>{m.creation_time}</p></span>
                                            </GridItem>
                                          </GridContainer>

                                          <GridContainer>
                                            <GridItem>
                                              <div>

                                              <ReactQuill value={m.comment} theme="bubble" readOnly />
      <Popup
        trigger={ <span><button className="btn btn-primary" onClick={()=>{ editComment(m.id)} } disabled={ m.username != cookies.name }>Edit</button></span> }
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
                                      <Button color="primary" type="submit"  onClick={() => { updateComment(m.id, commentEdit) }}>Update</Button>
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
                      {/*Edit popup End*/}
                      {/*Delete popUp Start*/}
                      <Popup trigger={<div className="icon-edit-delete" hidden={cookies.Role_id == "2"}><MdDelete/></div>} modal>
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
                        {/*Delete popUp End*/}
                    </td>
                  </tr>
                )
              }
            }
          })}
        </table>
      </>
    ):("")}
    {/***** On Hold Project End *****/}

    {/***** Completed Project start *****/}
    <Card className="task_title_status">
      <GridContainer >
        <GridItem xs={12} sm={12} md={12} >
          <div onClick={()=> {  project_Completed("completed") , closeCompleted("completed") , setcompleted_title(!completed_title) }} className="task_title"> Project Completed {completed_title ? <FaArrowUp/>:<FaArrowDown/>}  </div> 
        </GridItem>
      </GridContainer>
    </Card>
    {completed_title ? (
      <>
        <table className="project-data" >
          <tr className="project-data-title">
            <th className="status">Project Name</th>
            <th className="Priority">Priority</th>
            <th className="assignee">Assignee</th>
            <th className="view-edit">View & Edit</th>
          </tr>
          {project_details.map((project)=>{
            if(project.project_delete == "no"){
              if(project.project_status == 'completed'){
                var person = project.project_person.split(",");
                return(
                  <tr key={project.project_id} onClick={()=>{toggle(project.project_id)}} className="expand_dropdown">
                    <td className="project-title-table">{project.project_title}</td>
                    <td  className="priority-data"><p className={project.project_priority}>{project.project_priority}</p></td>
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
                            <Popup trigger={<a className="icon-edit-delete"><div className='chip'><span>Load more</span></div></a>} className="popupReact" position="left">
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
                    <td>
                      {/* Edit popUp Start*/}
                      <Popup trigger={<button className="edit_project"><div className='icon-width' onClick={()=> { projectId(project.project_id), getData(project.project_id) } }><FiEdit/></div></button>} className="popupReact" modal nested>
                      {close => (
                        <div className="popup-align">
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                              <form onSubmit={handleSubmit(onSubmit)}> 
                                <Card>
                                  <CardHeader color="primary">
                                    <GridContainer>
                                      <GridItem>
                                        <h4 className={classes.cardTitleWhite + ' ' + 'text-white'}>Edit Project</h4>
                                        <p className={classes.cardCategoryWhite + ' ' + 'text-white'}>Update your project details</p>
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
                                        <span>Project Title</span><span className="required">*</span>
                                        <input type="text" className="form-control signup-input" name="project_title" placeholder="Project Title" disabled={cookies.Role_id == "2"} value={uoption.project_title} onChange={handleChange} />
                                      </div>
                                    </GridItem>
                                  </GridContainer><br/>

                                  <GridContainer>  
                                    <GridItem xs={12} sm={12} md={12}>
                                      <div className="form-group">
                                      <span>Project Description</span><span className="required">*</span>
                                        <textarea className="form-control signup-input" disabled={cookies.Role_id == "2"} value={uoption.project_description} name="project_description"onChange={handleChange} placeholder="Project Description" />
                                      </div> 
                                    </GridItem>
                                  </GridContainer><br/>

                                  <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <div className="form-group">
                                        <span>Project Department</span><span className="required">*</span>
                                        <Multiselect
                                          displayValue="value"
                                          options={all_Department}
                                          value={u_Department}
                                          selectedValues={u_Department}
                                          selectionLimit="1"
                                          onChange={setDepartment}
                                          onRemove={setDepartment}
                                          onSearch={function noRefCheck(){}}
                                          onSelect={setDepartment}
                                          placeholder="Project Department"
                                          showArrow={true}
                                        />
                                        </div> 
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={6}>
                                      <div className="form-group">
                                      <span>Project Language</span><span className="required">*</span>
                                      <Multiselect
                                        displayValue="value"
                                        options={all_Language}
                                        value={u_Language}
                                        selectedValues={u_Language}
                                        selectionLimit="1"
                                        onChange={setLanguage}
                                        onRemove={setLanguage}
                                        onSearch={function noRefCheck(){}}
                                        onSelect={setLanguage}
                                        placeholder="Project Language"
                                        showArrow={true}
                                      />
                                      </div> 
                                    </GridItem>
                                  </GridContainer><br/>

                                  <GridContainer>  
                                    <GridItem xs={12} sm={12} md={6}>
                                      <div className="form-group" onChange={handleChange} >
                                      <span>Project Start Date</span><span className="required">*</span>
                                        <DatePicker
                                          disabled={cookies.Role_id == "2"}
                                          placeholderText="Start Date : dd/mm/yyyy"
                                          isClearable
                                          name="datetime"
                                          className={"form-control"}
                                          value={new Date(uoption.project_start)}
                                          selected={startDate}
                                          onChange={val => {
                                            setStartDate(val);
                                            setValue("start", val);
                                          }}
                                          dateFormat="dd-MM-yyyy"
                                        />
                                      </div> 
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={6}>
                                      <div className="form-group" onChange={handleChange}>
                                      <span>Project End Date</span><span className="required">*</span>
                                        <DatePicker
                                          disabled={cookies.Role_id == "2"}
                                          placeholderText="End Date : dd/mm/yyyy"
                                          isClearable
                                          name="datetime1"
                                          value={new Date(uoption.project_deadline)}
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
                                    <GridItem xs={12} sm={12} md={6}>
                                      <div className="form-group">
                                      <span>Project Priority</span><span className="required">*</span>
                                        <select name="project_priority" id="priority" className="form-control signup-input" value={uoption.project_priority} onChange={handleChange} disabled={cookies.Role_id == "2"}>
                                          <option value=""  disabled selected>Select Project Priority</option>
                                          <option value="High" className="High">High</option>
                                          <option value="Medium" className="Medium">Medium</option>
                                          <option value="Low"className="Low">Low</option>
                                        </select>
                                        <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                                      </div> 
                                    </GridItem>
                                  
                                    <GridItem xs={12} sm={12} md={6}>
                                        <div className="form-group">
                                          <span>Project Status</span><span className="required">*</span>
                                            <select name="project_status" id="Status" className="form-control signup-input" value={uoption.project_status} onChange={handleChange} disabled={cookies.Role_id == "2"} >
                                              <option value=""  disabled selected>Select Project Status</option>
                                              <option value="on hold">On hold</option>
                                              <option value="running">Running</option>
                                              <option value="completed">Completed</option>
                                            </select>
                                          <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                                        </div> 
                                    </GridItem>
                                  </GridContainer><br/>

                                  <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <div className="form-group">     
                                        <span>Project Members</span><span className="required">*</span>
                                          <Multiselect
                                            disabled={cookies.Role_id == "2"}
                                            displayValue="value"
                                            options={uoptions}
                                            value={updateSelected}
                                            selectedValues={allSelectedMember}
                                            onChange={setUpdateSelected}
                                            onRemove={setUpdateSelected}
                                            onSelect={setUpdateSelected}
                                            placeholder="Select Project Members"
                                            showArrow={true}
                                            disable={cookies.Role_id == "2"}
                                          />
                                        </div> 
                                      </GridItem>
                                    </GridContainer><br/>
                                  </CardBody>
                                <div hidden={cookies.Role_id == "2"}>
                                  <CardFooter>
                                    <Button color="primary" onClick={()=> { updateProject(project.project_id); } }>Save</Button>
                                    <Button className="button" onClick={() => { close(); }}> Cancel </Button>
                                  </CardFooter>
                                </div>

                                <CardBody>
                                <GridContainer>
                                    <GridItem>
                                      <form>
                                        <h5 className="project-comments">Comments</h5>
                                          <ReactQuill forwardedRef={quillRef} modules={modules} theme="snow" onChange={setValues} />
                                        <button className="btn btn-primary" onClick={()=> {sendMessage(project.project_id), close()} }>Save</button>
                                      </form>
                                    </GridItem>
                                  </GridContainer>

                                  {comments.map((m)=>{
                                      return(
                                        <span className="comment-box">
                                          <GridContainer>
                                            <GridItem>
                                              <span>{m.username}</span>
                                            </GridItem>
                                                
                                            <GridItem>
                                            <span><p>{m.creation_time}</p></span>
                                            </GridItem>
                                          </GridContainer>

                                          <GridContainer>
                                            <GridItem>
                                              <div>

                                              <ReactQuill value={m.comment} theme="bubble" readOnly />
      <Popup
        trigger={ <span><button className="btn btn-primary" onClick={()=>{ editComment(m.id)} } disabled={ m.username != cookies.name }>Edit</button></span> }
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
                                      <Button color="primary" type="submit"  onClick={() => { updateComment(m.id, commentEdit) }}>Update</Button>
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
                      {/*Edit popup End*/}
                      {/*Delete popUp Start*/}
                      <Popup trigger={<div className="icon-edit-delete" hidden={cookies.Role_id == "2"}><MdDelete/></div>} modal>
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
                        {/*Delete popUp End*/}
                    </td>
                  </tr>
                )
              }
            }
          })}
        </table>
      </>
    ):("")}
    {/***** Completed Project End *****/}
        {/***** Project End *****/}
        <ToastContainer limit={1}/>
      </GridContainer>
    </span>
  );
}

Dashboard.layout = Modules;
export default Dashboard;