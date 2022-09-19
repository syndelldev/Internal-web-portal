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

  const onSubmit = async (result) =>{
    
    console.log(result);
    console.log(selected);
    console.log(p_selected);
    
    const res = await fetch(`${server}/api/subtask/add_subtask`,{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify({task_person:selected, project_name:p_selected, task_status:result.task_status , task_title:result.task_title, task_description:result.task_description, task_language:result.task_language, task_comment:result.task_comment, task_priority:result.task_priority, task_start: result.start , task_deadline: result.end }),
    })
    const data=await res.json()

    if(res.status==200)
    {
      // alert("success");
      router.push(`${server}/admin/subtask_module`);
    }
    else
    {
      alert("Fail");
    }
  }
  const [passwords , setpasswrong] = useState("");

  useEffect(() =>{
  // setpasswrong("Username and Password Not matched!");
  });

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
const [p_selected, setProject] = useState([]);




  return (
    <>
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
                        <span>Task Title</span>
                        <input type="text" className="form-control signup-input" placeholder="Task Title" {...register('task_title',  { required: "Please enter task title"})} />
                        <div className="error-msg">{errors.task_title && <span>{errors.task_title.message}</span>}</div>
                      </div> 
                    </GridItem>
                  </GridContainer><br/>
                    
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                    <div className="form-group" {...register('project_name')}>
                      
                      <span>Select Project</span>
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
                      
                        <div className="error-msg">{errors.project_name && <span>{errors.project_name.message}</span>}</div>
                      </div> 
                    </GridItem>
                  </GridContainer><br/>

                  <GridContainer>  
                    <GridItem xs={12} sm={12} md={12}>
                      <div className="form-group">
                      <span>Task Description</span>
                        <textarea className="form-control signup-input" placeholder="Task Description" {...register('task_description', { required: 'Description is required', } )}  />
                        <div className="error-msg">{errors.task_description && <span>{errors.task_description.message}</span>}</div>
                      </div> 
                    </GridItem>
                  </GridContainer><br/>

                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <div className="form-group">
                      <span>Task Priority</span>
                        <select name="priority" id="priority" className="form-control signup-input" {...register('task_priority', {required:true ,message:'Please select atleast one option', })}>
                          <option value=""  disabled selected>Select Task Priority</option>
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                        <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                        <div className="error-msg">{errors.task_priority && <span>{errors.task_priority.message}</span>}</div>
                      </div> 
                    </GridItem>

                    <GridItem xs={12} sm={12} md={6}>
                      <div className="form-group">
                      <span>Task Language</span>
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
                        <div className="error-msg">{errors.task_language && <span>{errors.task_language.message}</span>}</div>
                      </div> 
                    </GridItem>
                  </GridContainer><br/>

                  <GridContainer>  
                    <GridItem xs={12} sm={12} md={6}>
                      <div className="form-group" {...register('task_start')}>
                      <span>Task Start Date</span>
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
                      <div className="error-msg">{errors.task_start && <span>{errors.task_start.message}</span>}</div>
                      </div> 
                    </GridItem>

                    <GridItem xs={12} sm={12} md={6}>
                      <div className="form-group" {...register('task_deadline')}>
                      <span>Task End Date</span>
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
                      <div className="error-msg">{errors.task_deadline && <span>{errors.task_deadline.message}</span>}</div>
                      </div> 
                    </GridItem>
                  </GridContainer><br/>

                  <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                      <div className="form-group" {...register('task_person')}>
                      
                      <span>Task Members</span>
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
                      
                        <div className="error-msg">{errors.task_person && <span>{errors.task_person.message}</span>}</div>
                      </div> 
                    </GridItem>
                  </GridContainer><br/>

                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <div className="form-group">
                      <span>Comments</span>
                        <textarea className="form-control signup-input" placeholder="Comment" {...register('task_comment')} />
                        <div className="error-msg">{errors.position && <span>{errors.position.message}</span>}</div>
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

      var person = task.task_person.split(",");

    return(
    <>

    <GridItem xs={6} sm={6} md={4}>
        <form>
        <Card>
            <CardHeader color="primary">

              <img src={`${server}/reactlogo.png`} className={classes.img}/>

                <h4 className="projectTitle">{task.task_title}</h4>
                <p className={classes.cardCategoryWhite}></p>
            </CardHeader>

              <CardBody>
              <GridContainer>
                
                  <GridItem>
                    <p className="projectLanguage">{task.task_language}</p>
                  </GridItem>
                  
                  <GridItem>
                  <div className="icon-edit-delete">
                    <a href={`${server}/admin/subtask_module/${task.task_id}`}><FiEdit/></a>
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
                    <p className="projectPriority">Task Priority : {task.task_priority}</p>
                  </GridItem>
                </GridContainer>
                
                </CardBody>

                <CardFooter>
                </CardFooter>
            </Card>
        </form>
    </GridItem>
  </>
        )   
                  }
    })
 }

    {/* </GridItem> */}

    </GridContainer>
    </>
  );
}

Dashboard.layout = Admin;

export default Dashboard;

