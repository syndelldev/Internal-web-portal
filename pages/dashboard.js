import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from 'next/router';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Modules from "../layouts/Modules";
import { server } from 'config';
import axios from "axios";
import { useCookies } from 'react-cookie';
import Popup from "reactjs-popup";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { IoMdArrowDropdown } from "react-icons/io";
import { useForm  } from 'react-hook-form';
import DatePicker from "react-datepicker";
import Multiselect from "multiselect-react-dropdown";
import { ToastContainer, toast } from 'react-toastify';
import { FiEdit } from "react-icons/fi";
import { BiArchiveIn } from 'react-icons/bi';
import Button from "components/CustomButtons/Button.js";

import AvatarGroup from 'react-avatar-group';

// import { alertService } from 'services';
// import {Alert} from "components/Alert.jsx";


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

  const response = await fetch(`${server}/api/admin`)
  const User_name = await response.json();

  const hold = await fetch(`${server}/api/project/project_status/project_hold`)
  const project_hold = await hold.json();

  const completed = await fetch(`${server}/api/project/project_status/project_completed`)
  const project_completed = await completed.json();

  const running = await fetch(`${server}/api/project/project_status/project_running`)
  const project_running = await running.json();

  const run = await fetch(`${server}/api/user/project_status/project_running`, {
    headers: {
      'Access-Control-Allow-Credentials': true,
      Cookie: context.req.headers.cookie
    },
  })
  const project_runn = await run.json();

  const u_hold = await fetch(`${server}/api/user/project_status/project_hold`, {
    headers: {
      'Access-Control-Allow-Credentials': true,
      Cookie: context.req.headers.cookie
    },
  })
  const project_h = await u_hold.json();

  const u_completed = await fetch(`${server}/api/user/project_status/project_completed`, {
    headers: {
      'Access-Control-Allow-Credentials': true,
      Cookie: context.req.headers.cookie
    },
  })
  const project_comp = await u_completed.json();

  const lang = await fetch(`${server}/api/language`)
  const language = await lang.json();

  const lang_department = await fetch(`${server}/api/languageDepartment`)
  const languageDepartment = await lang_department.json();

  const pri = await fetch(`${server}/api/priority`)
  const priority = await pri.json();

  const stat = await fetch(`${server}/api/projectStatus`)
  const status = await stat.json();

  return{ props: { project_details, project_hold, project_completed, project_running, User_name, project_runn, project_h, project_comp, language, languageDepartment, priority, status } }
}

function Dashboard( { project_details, project_hold, project_completed, project_running, User_name, project_runn, project_h, project_comp, language, languageDepartment, priority, status } ) {

  const { register,  watch, handleSubmit, formState: { errors }, setValue } = useForm(); 
  const router = useRouter();

  // redirect page if cookies is not set
  useEffect(() => {
    if(!cookies.name){
      router.push(`${server}/login`);
    }
  });

  const [cookies, setCookie] = useCookies('');
  const [trackdate,settrackdate] = useState("")
  const [users, setusers] = useState([]);

  const deleteProject = async(id) =>{
    console.log('delete');
    console.log(id);

    const res = await fetch(`${server}/api/project/${id}`);
    router.push(`${server}/dashboard`);
  }

  if(cookies.Role_id == "2"){
    var project_running = project_runn;
  }else{
    var project_running = project_running;
  }

  if(cookies.Role_id == "2"){
    var project_hold = project_h;
  }else{
    var project_hold = project_hold;
  }

  if(cookies.Role_id == "2"){
    var project_completed = project_comp;
  }else{
    var project_completed = project_completed;
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

  // department dropdown options
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
  // set and get selected value of department
  const [u_Department, setDepartment] = useState([]);

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
        getStatus.push( {'label' :status.projectstatus_name, 'value' :status.projectstatus_name} );
      });
      setAllStatus(getStatus);
    }
    u_data();
  },[]);
  // set and get selected value of status
  const [u_Status, setStatus] = useState([]);

  const projectId = async(id) =>{

    const response = await fetch(`${server}/api/project/update/${id}`)
    const update_data = await response.json();
    const udata = update_data[0];
    const selectedMember = (udata.project_person).split(",");
    const getAllname = [];

    selectedMember.map((user)=>{
      getAllname.push( {'label' :user, 'value' :user} );
    });

    // set language name from database for update language
    const getLanguage = [];
    getLanguage.push( {'label' :udata.project_language, 'value' :udata.project_language} );

    // set department name from database for update department
    const getDepartment = [];
    getDepartment.push( {'label' :udata.project_department, 'value' :udata.project_department} );

    // set priority from database for update priority
    const getPriority = [];
    getPriority.push( {'label' :udata.project_priority, 'value' :udata.project_priority} );

    // set status from database for update status
    const getStatus = [];
    getStatus.push( {'label' :udata.project_status, 'value' :udata.project_status} );

    setStatus(getStatus);
    setLanguage(getLanguage);
    setDepartment(getDepartment);
    setPriority(getPriority);
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

    // get selected language
    if(u_Language != ""){
      var Language = u_Language[0].value;
    }

    // get selected department
    if(u_Department != ""){
      var Department = u_Department[0].value;
    }

    // get selected priority
    if(u_Priority != ""){
      var Priority = u_Priority[0].value;
    }

    // get selected status
    if(u_Status != ""){
      var Status = u_Status[0].value;
    }

    const res = await fetch(`${server}/api/project/update_project`,{
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ project_id:uoption.project_id, project_person: allMember, project_status: Status , project_department: Department ,  project_title: uoption.project_title , project_description:uoption.project_description , project_language: Language, project_priority: Priority, project_start: startDate , project_deadline: endDate }),
    });
    if(!toast.isActive(toastId.current)) {
      toastId.current = toast.success('Project Updated Successfully!🎉', {
          position: "top-right",
          autoClose:1000,
          theme: "colored",
          hideProgressBar: true
          });
      }
      router.reload(`${server}/dashboard`);
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

  useEffect(async()=>{
    axios.get(`${server}/api/admin/${cookies.Id}` )
      .then((res)=>{
        setusers(res.data)
      })    
  },[])

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + '/' + mm + '/' + dd;

  const On_track = [];
  // console.log(On_track)
  const Off_track = [];
  const pro_Completed = [];
  for(var i=0; i<project_completed.length; i++){
    pro_Completed.push(project_completed[i].project_id);
  }

  const pro_OnHold = [];
  for(var i=0; i<project_hold.length; i++){
    pro_OnHold.push(project_hold[i].project_id);
  }

  const [running_title, setrunning_title] = useState(false);
  const [ project_Status, setProjectStatus ] = useState("On Track");
  const [ project_List, setProjects ] = useState([]);
  const project_Completed = (project) => {
    setProjects(project);
    setrunning_title(true);
  }

  return(
    <>
      <div>
        {users.map((user)=>{
          return(
            <div key={user.id}>
              <h1 className="user-welcome">Welcome {user.username}  <img src={`${server}/smiley.gif`} alt="smiley" className="gif-image" /></h1>
            </div>
          )
        })}
      </div>
    <h4 className="project_status">Projects</h4>
    
    <GridContainer>
      {project_running.map((status)=>{
        const MySQLDate  = status.project_deadline;
        let date = MySQLDate.replace(/[-]/g, '/').substr(0,10);
        if(date>today)
        {
          On_track.push(status.project_id);
          // console.log("On_track",On_track)
        }
        else{
          Off_track.push(status.project_id);
          // console.log("Off_track",Off_track)
        }
      })}
    </GridContainer>


{/* admin project lists start */}


      <div className="project-status">
        <GridContainer>
          <GridItem xs={12} sm={6} md={4} >
            <div onClick={()=> { project_Completed(On_track), setProjectStatus("On Track") }}><h3 className="on-track">On Track Project - {On_track.length}</h3></div>
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={6} md={4} >
            <div onClick={()=> { project_Completed(Off_track), setProjectStatus("Off Track") }}><h3 className="off-track">Off Track Project - {Off_track.length}</h3></div>
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={6} md={4} >
            <div onClick={()=> { project_Completed(pro_Completed), setProjectStatus("Completed") }}><h3 className="completed-project">Completed Project - {project_completed.length}</h3></div>
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={6} md={4}>
            <div>
              <div onClick={()=> { project_Completed(pro_OnHold), setProjectStatus("On Hold") }}><h3 className="on-hold">On Hold Project - {project_hold.length}</h3></div>
            </div>
          </GridItem>
        </GridContainer>
      </div>
      <br/>
    {/* admin project lists end */}
    {running_title ? (
      <>
      <div className="Projects-title"> {project_Status} Projects</div><br/>
        <div className="responsive-table">
        <table className="project-data" >
          {project_List.length > 0 ? (
          <>
          <tr className="project-data-title">
            <th  className="status">Project Name</th>
            <th className="Priority">Priority</th>
            <th className="assignee">Assignee</th>
            <th className="view-edit" hidden={cookies.Role_id == "2"}>View & Edit</th>
            <th className="view-edit" hidden={cookies.Role_id != "2"}>View</th>
          </tr>

          {project_details.map((project)=>{
            if(project.project_delete == "no"){

              var person = project.project_person.split(",");
              console.log('person',person)
              return(
              <>
              {project_List.map((pro_list)=>{
                  if(project.project_id == pro_list){

                    return(
                      <tr key={project.project_id} className="expand_dropdown">
                        <td className="project-title-table">{project.project_title}</td>
                        <td className="priority-data"><p className={project.project_priority}>{project.project_priority}</p></td>
                        <td className="project-priority-person">
                          <AvatarGroup
                            // avatars={["James", "Amy", "Will", "Smith"]}
                            avatars={person}
                            initialCharacters={2}
                            max={2}
                            size={42}
                            displayAllOnHover={true}
                            shadow={2}
                            // backgroundColor="#00155c"
                            fontSize={0.4}
                            borderColor= "#0000ff"
                            bold={true}
                          >
                          </AvatarGroup>
                          {/* {person.map((project_person) => {
                            return(
                              <div className="chip">
                                <span title={project_person}>{project_person}</span>
                              </div>
                              )
                            })
                          } */}
                        </td>
                        <td className="project-edit-table">

                  {/* Edit popUp Start*/}
                  <Popup trigger={<a className="icon-edit-delete"><div className='icon-width' onClick={()=> { projectId(project.project_id) } }><FiEdit/></div></a>} className="popupReact" modal>
                      {close => (
                        <div className="popup-align">
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                              <form onSubmit={handleSubmit()}> 
                                <Card>
                                  <CardHeader color="primary">
                                    <GridContainer>
                                      <GridItem>
                                        <h4 className="Updatedetails">Edit Project</h4>
                                        <p className="Updatedetails">Update your project details</p>
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
                                          disable={cookies.Role_id == "2"}
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
                                        disable={cookies.Role_id == "2"}
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
                                      <div className="error-msg">{errors.project_language && <span>{errors.project_language.message}</span>}</div>
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
                                      <Multiselect
                                        disable={cookies.Role_id == "2"}
                                        displayValue="value"
                                        options={all_Priority}
                                        value={u_Priority}
                                        selectedValues={u_Priority}
                                        selectionLimit="1"
                                        onChange={setPriority}
                                        onRemove={setPriority}
                                        onSearch={function noRefCheck(){}}
                                        onSelect={setPriority}
                                        placeholder="Project Priority"
                                        showArrow={true}
                                    />
                                      </div> 
                                    </GridItem>
                                  
                                    <GridItem xs={12} sm={12} md={6}>
                                        <div className="form-group">
                                          <span>Project Status</span><span className="required">*</span>
                                          <Multiselect
                                              disable={cookies.Role_id == "2"}
                                              displayValue="value"
                                              options={all_Status}
                                              value={u_Status}
                                              selectedValues={u_Status}
                                              selectionLimit="1"
                                              onChange={setStatus}
                                              onRemove={setStatus}
                                              onSearch={function noRefCheck(){}}
                                              onSelect={setStatus}
                                              placeholder="Project Status"
                                              showArrow={true}
                                          />
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
                                    <Button color="primary" onClick={()=> { updateProject(project.project_id); } } className="save-btn">Save</Button>
                                    <Button className="save-btn" onClick={() => { close(); }}> Cancel </Button>
                                  </CardFooter>
                                </div>

                                </Card>
                              </form>
                            </GridItem>
                          </GridContainer>
                        </div>
                      )}
                      </Popup>
                      {/*Edit popup End*/}
                      {/*Delete popUp Start*/}
                      <Popup trigger={<div className="icon-edit-delete archieve-icon" hidden={cookies.Role_id == "2"}><BiArchiveIn/></div>} modal>
                            {close => (
                              <div>
                              <Card>                            
                                  <GridContainer>
                                  <GridItem xs={12} sm={12} md={12}>
                                      <GridContainer>
                                        <GridItem>
                                          <div className="delete_popup">
                                            <CardBody>
                                              <h2 className="delete_popup">Archive {project.project_title}</h2>
                                              <h4 className={classes.cardTitleWhite}>Are you sure you want to archive {project.project_title}?</h4>
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

              })}

              </>)
                
            }
          })}
          </>
         ) : (<div className="no_Data"><h3 className="not-data">No Data</h3></div>)}
        </table>
        </div>
      </>
    ):("")}

    <ToastContainer limit={1}/>
    </>
  );
}

Dashboard.layout = Modules;

export default Dashboard;