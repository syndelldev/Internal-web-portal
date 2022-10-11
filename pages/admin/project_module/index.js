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
import { ToastContainer, toast } from 'react-toastify';
import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts.js";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from 'react-icons/md';
import { useCookies } from 'react-cookie';
import axios from "axios";


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

  return{ props: {project_details, User_name} }
}

function Dashboard( { project_details , User_name } ) {

  const [cookies, setCookie] = useCookies(['name']);

  const useStyles = makeStyles(styles);
  const classes = useStyles();

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
  // console.log(On_track)

  //for Off_track
  const Off_track = [];
  // console.log(Off_track)

  const deleteProject = async(id) =>{
    console.log('delete');
    console.log(id);

    const res = await fetch(`${server}/api/project/${id}`);
    router.push(`${server}/admin/project_module`);
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
    project_person: "",
    project_comment: ""
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
  console.log(userID)

  const projectId = async(id) =>{
    console.log('update project id');
    console.log(id);

    const response = await fetch(`${server}/api/project/update/${id}`)
    const update_data = await response.json();
    // console.log(update_data[0]);

    const udata = update_data[0];

    const selectedMember = (udata.project_person).split(",");

    const getAllname = [];

    selectedMember.map((user)=>{
      getAllname.push( {'label' :user, 'value' :user} );
    });

    setUpdateSelected(getAllname);
    setUpdate(udata);
    setStartDate(new Date(udata.project_start));
    setEndDate(new Date(udata.project_deadline));

    }

  const [selected, setSelected] = useState([userID]);

  const handleChange = ({ target: { name, value } }) =>{
    console.log("name");
    console.log([name]);
  
    setUpdate({ ...uoption, [name]: value });
  }

  var uMember = uoption.project_person;

  const allSelectedMember = [];
  const projectMember = (uMember).split(",");


  for(var i=0; i<projectMember.length; i++){
    allSelectedMember.push({'label' :projectMember[i] , 'value' : projectMember[i]});
  }
  console.log("projectMember", projectMember)

  const toastId = React.useRef(null);
  const updateProject = async() =>{

    const allMember = [];
    for(var i=0; i<updateSelected.length; i++){
          allMember.push(updateSelected[i].value);
    }
  
    console.log("all users");
    console.log( allMember );

    if( uoption.project_title=="" || uoption.project_description=="" ||  uoption.project_department=="" || uoption.project_language=="" || allMember=="" || startDate=="" || endDate=="" || uoption.project_priority=="" || uoption.project_status=="" ){
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

    const res = await fetch(`${server}/api/project/update_project`,{
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ project_id:uoption.project_id, project_person: allMember, project_status:uoption.project_status , project_department:uoption.project_department ,  project_title: uoption.project_title , project_description:uoption.project_description , project_language:uoption.project_language, project_comment:uoption.project_comment, project_priority:uoption.project_priority, project_start: startDate , project_deadline: endDate }),
    });
    if(!toast.isActive(toastId.current)) {
      toastId.current = toast.success('Updated Successfully ! 🎉', {
          position: "top-right",
          autoClose:1000,
          theme: "colored",
          hideProgressBar: true,
          onClose: () => router.push(`${server}/admin/project_module`)
          });
      }
      router.reload(`${server}/admin/project_module`);
  }
}

  const { register,  watch, handleSubmit, formState: { errors }, setValue } = useForm(); 
  const router = useRouter();

  const onSubmit = async (result) =>{
    
    console.log("result");
    console.log(result.start.toDateString());
    const p_start = result.start.toDateString();
    const p_end = result.end.toDateString();
    
    if(result.project_title != ""){
      const res = await fetch(`${server}/api/project/addproject`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({project_person:selected,project_department:result.project_department,project_status:result.project_status , project_title:result.project_title, project_description:result.project_description, project_language:result.project_language, project_comment:result.project_comment, project_priority:result.project_priority, project_start: p_start , project_deadline: p_end , projectAdded_by: cookies }),
      })
      const data=await res.json()
      
      if(res.status==200)
      {
        // alert("success");
        if(!toast.isActive(toastId.current)) {
          toastId.current = toast.success('Project added Successfully ! 🎉', {
              position: "top-right",
              autoClose:1000,
              theme: "colored",
              hideProgressBar: true,
              onClose: () => router.push(`${server}/admin/project_module`)
              });
          }
  
        router.reload(`${server}/admin/project_module`);
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


  return (
    <>
  <div className="buttonalign">
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
                          {/*<input type="text" className="form-control signup-input" placeholder="Department" {...register('department',  { required: "Please enter your Department", pattern: {value: /^[aA-zZ\s]+$/ , message: 'Only characters allow',} })} />
                          <div className="error-msg">{errors.department && <p>{errors.department.message}</p>}</div>*/}
                        <span>Project Department</span><span className="required">*</span>
                          <select name="Department" id="Department" className="form-control signup-input" {...register('project_department', {required:true ,message:'Please select atleast one option', })}>
                            <option value=""  disabled selected>Select Your Department...</option>
                            <option value="HR">HR</option>
                            <option value="UI & UX">UI & UX</option>
                            <option value="Web Developer">Web Developer</option>
                            <option value="Content Writer">Content Writer</option>
                            <option value="Project Manager">Project Manager</option>
                            <option value="Mobile App Developer">Mobile App Developer</option>
                            <option value="SEO">SEO</option>
                          </select>
                          <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                          <div className="error-msg">{errors.project_department && <span>{errors.project_department.message}</span>}</div>
                        </div> 
                    </GridItem>

                    <GridItem xs={12} sm={12} md={6}>
                      <div className="form-group">
                      <span>Project Language</span><span className="required">*</span>
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
  <button className="dropdown_button">Project Departments</button>
      <div className="department-link">
        <a href={`${server}/admin/project_module`}>All</a>
        <a href={`${server}/admin/project_module/project_department/HR`}>HR</a>
        <a href={`${server}/admin/project_module/project_department/UI & UX`}>UI & UX</a>
        <a href={`${server}/admin/project_module/project_department/Web development`}>Web Developer</a>
        <a href={`${server}/admin/project_module/project_department/Content writer`}>Content Writer</a>
        <a href={`${server}/admin/project_module/project_department/Project manager`}>Project Manager</a>
        <a href={`${server}/admin/project_module/project_department/Mobile App developer`}>Mobile App Developer</a>
        <a href={`${server}/admin/project_module/project_department/SEO`}>SEO</a>
      </div>
</div>
</GridItem>

<GridItem>
<div className="department_dropdown">
  <button className="dropdown_button">Project Languages</button>
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

    {project_details.map((project)=>{

if(project.project_delete == "no"){

// if(status.project_status == project.project_status){

  var person = project.project_person.split(",");
  // const name =[];
  // for(i=0 ; i<person.length; i++){
  //   console.log(person[i]);
  //   var member = person[i].slice(0,2);
  //   console.log(member);
  // }

  // console.log(project.project_status)
  const MySQLDate  = project.project_deadline;
  let date = MySQLDate.replace(/[-]/g, '/').substr(0,10);
  // console.log(date)

  if(project.project_status=="running")
  {
    
    if(date>today)
    {
      // console.log("On track", project.project_id);
      On_track.push(project.project_id);
      // console.log(On_track)
    }
    else
    {
      // console.log("off track", project.project_id);

      Off_track.push(project.project_id);
      // console.log(Off_track)
    }
  }
return(
  <>
    <GridItem xs={12} sm={6} md={9}>

  <form>
    <Card className="projects">
      <CardHeader color="primary" className="project-block">

        {/* <img src={`${server}/reactlogo.png`} className={classes.img}/> */}
        <div className="project-content">
        <h4 className="projectTitle">{project.project_title}</h4>
        
        <div className="icon-display">
        <span className={project.project_priority}>{project.project_priority}</span>
        <span className={project.project_status}>
          {(project.project_status=="on hold") ? "On Hold" : "" }
          {(project.project_status=="completed") ? "Completed" : "" }
          {(project.project_status=="running") ? (date>today) ? "On track": "Off track" : "" }
        </span>
        {person.map((project_person) => {
          return(
            <div className="chip">
              <span>{project_person}</span>
            </div>
          )
        })

        }
        {/* <span className="project_person">{project.project_person}</span> */}
          <Popup trigger={<a className="icon-edit-delete"><div className='icon-width' onClick={()=> { projectId(project.project_id) } }><FiEdit/></div></a>} className="popupReact" modal>

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
                            <span>Project Title</span><span className="required">*</span>
                            <input type="text" className="form-control signup-input" name="project_title" placeholder="Project Title" value={uoption.project_title} onChange={handleChange} />
                          </div>

                        </GridItem>
                      </GridContainer><br/>
                        
                      <GridContainer>  
                        <GridItem xs={12} sm={12} md={12}>
                          <div className="form-group">
                          <span>Project Description</span><span className="required">*</span>
                            <textarea className="form-control signup-input" value={uoption.project_description} name="project_description"onChange={handleChange} placeholder="Project Description" />
                          </div> 
                        </GridItem>
                      </GridContainer><br/>

                      <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <div className="form-group">
                            <span>Project Department</span><span className="required">*</span>
                              <select id="Department" name="project_department" className="form-control signup-input" value={uoption.project_department} onChange={handleChange} >
                                <option value=""  disabled selected>Select Your Department...</option>
                                <option value="HR">HR</option>
                                <option value="UI & UX">UI & UX</option>
                                <option value="Testing">Testing</option>
                                <option value="Web development">Web Development</option>
                                <option value="Content writer">Content Writer</option>
                                <option value="Project manager">Project Manager</option>
                                <option value="Mobile App developer">Mobile App Developer</option>
                                <option value="SEO">SEO</option>
                              </select>
                              <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                            </div> 
                        </GridItem>

                        <GridItem xs={12} sm={12} md={6}>
                          <div className="form-group">
                          <span>Project Language</span><span className="required">*</span>
                            <select name="project_language" id="Project_created_by" className="form-control signup-input"  value={uoption.project_language} onChange={handleChange} >
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
                          <span>Project Start Date</span><span className="required">*</span>
                            <DatePicker
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
                            <select name="project_priority" id="priority" className="form-control signup-input" value={uoption.project_priority} onChange={handleChange}>
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
                                <select name="project_status" id="Status" className="form-control signup-input" value={uoption.project_status} onChange={handleChange}>
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
                              
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <div className="form-group">
                          <span>Comments</span>
                            <textarea className="form-control signup-input" name="project_comment" value={uoption.project_comment} onChange={handleChange} placeholder="Comment" />
                          </div> 
                        </GridItem>
                      </GridContainer>
                      
                    </CardBody>

                    <CardFooter>
                        <Button color="primary" onClick={()=> { updateProject(project.project_id); } }>Save</Button>
                        <Button className="button" onClick={() => { close(); }}> Cancel </Button>
                    </CardFooter>
                    
                  </Card>
              </form>
              </GridItem>
              </GridContainer>

              </div>


              )}
              </Popup>

                      <Popup trigger={<a className="icon-edit-delete"><MdDelete/></a>} modal>
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
                    </div>
                    </CardHeader>
      
            </Card>
        </form>
        <ToastContainer limit={1}/>

  </GridItem>


</>);
}
})
}
    </GridContainer>
    </>
  );
}

Dashboard.layout = Admin;
export default Dashboard;