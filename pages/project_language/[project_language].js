import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from 'next/router'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// layout for this page
import Modules from "layouts/Modules.js";
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
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Popup from "reactjs-popup";
import Multiselect from "multiselect-react-dropdown";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from 'react-icons/md';
import { useCookies } from 'react-cookie';
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

export async function getServerSideProps(context){
  const project_language = context.params.project_language;

  const res = await fetch(`${server}/api/project/project_language/${project_language}`);
  const project_details = await res.json();
  // console.log(project_details);
  const response = await fetch(`${server}/api/admin`)
  const User_name = await response.json();

  return{ props: {project_details, User_name} }
}

function ProjectFilter({ project_details , User_name }){
  console.log(project_details)

    const useStyles = makeStyles(styles);
    const classes = useStyles();

    const [addStartDate, setStart_Date] = useState();
    const [addEndDate, setEnd_Date] = useState();

    const [cookies, setCookie] = useCookies(['name']);
    const { register,  watch, handleSubmit, formState: { errors }, setValue } = useForm(); 
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const router = useRouter();

    //Delete Project
    const deleteProject = async(id) =>{
        console.log('delete');
        console.log(id);
        const res = await fetch(`${server}/api/project/${id}`);
    }
    //Add Project
    const onSubmit = async (result) =>{
    
        console.log("result");
        console.log(result);
        
        const res = await fetch(`${server}/api/project/addproject`,{
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body:JSON.stringify({project_person:selected,project_department:result.project_department,project_status:result.project_status , project_title:result.project_title, project_description:result.project_description, project_language:result.project_language, project_comment:result.project_comment, project_priority:result.project_priority, project_start: result.start , project_deadline: result.end }),
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
    //Update Project
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
    const [updateSelected, setUpdateSelected] = React.useState([]);

    const projectId = async(id) =>{
        console.log(id);

        const response = await fetch(`${server}/api/project/update/${id}`)
        const update_data = await response.json();

        const udata = update_data[0];
        const getAllname = [];
        const selectedMember = (udata.project_person).split(",");
        selectedMember.map((user)=>{
        getAllname.push( {'label' :user, 'value' :user} );
        });

        setUpdateSelected(getAllname);
        setUpdate(udata);
        setStartDate(new Date(udata.project_start));
        setEndDate(new Date(udata.project_deadline));
        
    }
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
            if(! toast.isActive(toastId.current)){
                toastId.current = toast.error('Please fill all the required fields', {
                    position: "top-right",
                    autoClose:5000,
                    theme: "colored",
                    closeOnClick: true,
                    hideProgressBar: true,
                });
            }
            else{
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

  return(
    <>
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
                                        <h4 className={classes.cardTitleWhite}>Create Project</h4>
                                        <p className={classes.cardCategoryWhite}>Enter your new project details</p>
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

            <table className="project-data" >
                <tr className="project-data-title">
                    <th  className="status">Project Name</th>
                    <th>Project Language</th>
                    <th>Priority</th>
                    <th className="assignee">Assignee</th>
                    <th className="view-edit">View & Edit</th>
                </tr>
                {project_details.map((project)=>{
                    var person = project.project_person.split(",");
                    return(
                        <tr>
                            <td>{project.project_title}</td>
                            <td>{project.project_language}</td>
                            <td>{project.project_priority}</td>
                            <td>
                            {person.map((project_person) => {
                                return(
                                <div className="chip">
                                    <span>{project_person}</span>
                                </div>
                                )
                                })
                            }
                            </td>
                            <td>
                            {/* Edit popUp Start*/}
                            <Popup trigger={<a className="icon-edit-delete"><div className='icon-width' onClick={()=>{ projectId(project.project_id) } } ><FiEdit/></div></a>} className="popupReact" modal>
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
                                                <select id="Department" name="project_department" className="form-control signup-input" value={uoption.project_department} onChange={handleChange} disabled={cookies.Role_id == "2"} >
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
                                                <select name="project_language" id="Project_created_by" className="form-control signup-input"  value={uoption.project_language} onChange={handleChange} disabled={cookies.Role_id == "2"} >
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
                            {/*Edit popup End*/}
                            {/*Delete popUp Start*/}
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
                                {/*Delete popUp End*/}
                            </td>
                        </tr>
                    )
                })}
          </table> 
    </>
  )
}

ProjectFilter.layout = Modules;
export default ProjectFilter;