import React, { useEffect, useState , useRef } from "react";
// layout for this page
import User from "layouts/User.js";
import { useRouter } from 'next/router';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CardBody from "components/Card/CardBody.js";

import { useForm } from 'react-hook-form';
import Popup from "reactjs-popup";
import axios from "axios";
import { server } from 'config';
import { FiEdit } from "react-icons/fi";
import { FaEye } from 'react-icons/fa';
import { makeStyles } from "@material-ui/core/styles";
// import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import { useCookies } from 'react-cookie';
import { Button } from "@material-ui/core";
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
    paddingRight: "15px",
    cursor: "pointer",
  },
};


export async function getServerSideProps(context){
  //console.log(context.req.cookies);
  const res = await fetch(`${server}/api/user_dashboard/subtask_person`, {
    headers: {
      'Access-Control-Allow-Credentials': true,
      Cookie: context.req.headers.cookie
    },
  })
  const task = await res.json()
  //console.log(task)

  return { props: {task}, }
}

function Dashboard({task}) {
  // console.log(task)
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const router = useRouter();

  const [cookies, setCookie] = useCookies('');
  //console.log(cookies.Id);

  //For Accordin
  const [expanded, setExpanded] = useState(false);
  const handleChangePanel = panel => (event, isExpanded) => {
    console.log(panel)
    console.log(isExpanded)
    setExpanded(isExpanded ? panel : false);
  };
  //Date Declration
  const On_track = [];
  console.log("On_track",On_track)

  const Off_track = [];
  console.log("Off_track",Off_track)

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + '/' + mm + '/' + dd;
  console.log(today);

  //API fetch
  const [users, setusers] = useState([])

  useEffect(async()=>{
    axios.get(`${server}/api/admin/${cookies.Id}` )
      .then((res)=>{
        setusers(res.data)
        //console.log(res)
      })    
  },[])
  // console.log(users)

  const [username, setusername] = useState('');
  const [message, setmessage] = useState('');

  //for comments Declration
  const [comments, setcomments] = useState([]);
  
  const getData = async (task_id)=>{
    var comment = await axios.post(`${server}/api/comment/comment`, { task_id: task_id });
    setcomments(comment.data)
  }
  
  const sendMessage = async (task_id) => {
    // console.log(task_id);
    const date = new Date().toLocaleString();
    console.log("date");
    console.log(date);

    // var addComment = await axios.post(`${server}/api/comment/addcomment`, {  username: cookies.name, message: value , task_id: task_id, estimate:estimate , spent:spent, created_D: date });
    var addComment = await axios.post(`${server}/api/comment/addcomment`, {  username: cookies.name, message: value , task_id: task_id, created_D: date });
    console.log(addComment)
    console.log(cookies.name)
    router.reload(`${server}/user/usertask`);
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
  const handleChange = ({ target: { name, value } }) =>{
    setuserdata({ ...userdata, [name]: value });
  }
  const [estimate, setestimate] = useState('');
  const [spent, setspent] = useState('');
  

  const insert_time = async (task_id)=>{
    var addTime = await axios.post(`${server}/api/comment/addtasktime`, { task_id:task_id, user_id:cookies.Id, username: cookies.name, estimate:estimate , spent:spent });
    console.log(addTime.data)
  }
  
  const update_tasktime = async (task_id)=>{
    var updateTime = await axios.put(`${server}/api/comment/update_tasktime`, { task_id:task_id, user_id:cookies.Id, estimate:userdata.estimate_time , spent:userdata.spent_time });
    console.log(updateTime)
  }

  const [ value, setValue ] = useState("");
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
    const [commentTimeM, setTimeM] = useState();
    console.log("display date");
    // console.log(new Date().toLocaleString());
  

  return (
    <>
      <div>
        {users.map((user)=>{
          return(
            <div key={user.id}>
              <h1>My Tasks</h1>
            </div>
          )
        })}
      </div>
          <table className="project-data">
            <tr className="project-data-title">
              <th colspan="2" className="title">Task name </th>
              <th>Priority</th>
              <th colspan="2" className="status">Status</th>
              <th colspan="2" className="assignee">Assignee</th>
              <th colspan="4"className="view-edit">View & Edit</th>
            </tr>

            {task.map((task)=>{
              var person = task.task_person.split(",");
              const MySQLDate  = task.task_deadline;
              let date = MySQLDate.replace(/[-]/g, '/').substr(0,10);
              // console.log(date)
              if(date>today)
              {
                // console.count("On track")
                On_track.push(task.task_id); 
                // console.log(task.task_id)
              }
              else{
                // console.count("off track")
                Off_track.push(task.task_id);
                // console.log(task.task_id)
              }
              return(
                <tr className="project-data-details">
                  <td colspan="2"><h4 className="projectTitle">{task.task_title}</h4></td>
                  <td className="priority-data"><p className={task.task_priority}>{task.task_priority}</p></td>
                  <td className="status-data">
                    <span>
                      {(task.task_status=="taskOn_hold") ? "On Hold" : "" }
                      {(task.task_status=="task_completed") ? "Completed" : "" }
                      {(task.task_status=="task_toDo") ? "To Do Task" : "" }
                      {(task.task_status=="task_Running") ? (date>today) ? "On track": "Off track" : "" }
                    </span>
                  </td>
                  <td colspan="4" className="assignee-data">
                    {person.map((task_person) => {
                      return(
                        <div className="chip">
                          <span>{task_person}</span>
                        </div>
                        )
                      })
                    }
                  </td>
                  <td>
                    <div className="icon-display">
                        <Popup trigger={<div> <button disabled={task.edit_rights==0} onClick={()=>{getData(task.task_id);getTime(task.task_id)}} className="user-icon"><FiEdit/></button> </div>}  className="popupReact"  modal nested >
                          {close => (
                            <div>
                              
                              <GridItem xs={12} sm={12} md={12} key={task.task_id}>
                                <Card>
                                  <CardHeader color="primary">
                                    <h4>{task.task_title}</h4>
                                      <div className={classes.close}>
                                        <a onClick={close}>&times;</a>
                                      </div>
                                  </CardHeader>
                                  <CardBody>
                                      <GridContainer>
                                        <GridItem>
                                          <p>Task Language - {task.task_language}</p>
                                          <p>Task Person - {task.task_person}</p>
                                          <p>Task Description - {task.task_description}</p>
                                          <p>Department - {task.task_department}</p>
                                          <p>Task Status - {task.task_status}</p>
                                        </GridItem>
                                        <GridItem>
                                          <p className="projectPriority">{task.task_priority} Priority</p>
                                        </GridItem>
                                      </GridContainer>

                                  <GridContainer>
                                    <GridItem>
                                      <h5 className="projectPriority">Comments</h5>
                                    </GridItem>
                                  </GridContainer>
                                  <GridContainer>
                                    <GridItem xs={12} sm={12} md={12} >
                                      {/*Time Modulule*/}
                                      {TimeData.length==0?(
                                          <>
                                            <form>
                                              <GridContainer>
                                                <GridItem>
                                                  <input value={task.task_id} type="hidden"/>
                                                  <label>Estimate Time</label>
                                                  <input type="text" 
                                                    value={estimate} 
                                                    onChange={(e)=>setestimate(e.target.value)}
                                                    onKeyPress={(event)=>{
                                                      if (event.key === "Enter"){
                                                        insert_time(task.task_id);
                                                      }
                                                    }}
                                                  /><br/>
                                                  <label>Spent Time</label>
                                                  <input type="text" 
                                                    value={spent} 
                                                    onChange={(e)=>setspent(e.target.value)} 
                                                    onKeyPress={(event)=>{
                                                      if (event.key === "Enter"){
                                                        insert_time(task.task_id);
                                                      }
                                                    }}
                                                  />
                                                </GridItem>
                                              </GridContainer>
                                            </form>
                                          </>
                                        ):(
                                          <>
                                            <form onSubmit={update_tasktime}>
                                              <GridContainer>
                                                <GridItem>
                                                  <input value={task.task_id} type="hidden"/>
                                                  <label>Estimate Time</label>
                                                  <input type="text" name="estimate_time" 
                                                    value={userdata.estimate_time} 
                                                    onChange={handleChange}
                                                    onKeyPress={(event)=>{
                                                      if (event.key === "Enter"){
                                                        update_tasktime(task.task_id);
                                                      }
                                                    }}
                                                  /><br/>
                                                  <label>Spent Time</label>
                                                  <input type="text" name="spent_time" 
                                                    value={userdata.spent_time} 
                                                    onChange={handleChange}
                                                    onKeyPress={(event)=>{
                                                      if (event.key === "Enter"){
                                                        update_tasktime(task.task_id);
                                                      }
                                                    }}
                                                  />
                                                </GridItem>
                                              </GridContainer>

                                            </form>
                                          </>
                                        )}
                                        {/*Time Modulule*/}
                                      <form>

                                      <ReactQuill modules={modules} theme="snow" onChange={setValue} />
                                        <div onClick={()=> sendMessage(task.task_id)}>Save</div>

                                      </form>
                                    </GridItem>
                                  </GridContainer>

                                  {comments.map((m)=>{
                                    const Date = ((m.creation_time).substr(0,10).split("-",3));
                                    const Time = ((m.creation_time).substr(11,16).split(":",2));

                                      return(
                                        <span>
                                          <GridContainer>
                                            <GridItem>
                                              <span>{m.username}</span>
                                            </GridItem>
                                                
                                            <GridItem>
                                            <span><p>{m.creation_time} </p></span>
                                            </GridItem>
                                          </GridContainer>

                                          <GridContainer>
                                            <GridItem>
                                              <div>

                                              <ReactQuill value={m.comment} theme="bubble" readOnly />
      <Popup
        trigger={ <span><button onClick={()=>{ editComment(m.id)} } disabled={ m.username != cookies.name }>Edit</button></span> }
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
                              </GridItem>

                            </div>
                          )}
                        </Popup>
                    </div>
                  </td>
                  
                  <td>
                  <Accordion 
                    // style={{ width: 250 }} 
                    onClick={()=>{getTime(task.task_id)}} 
                    expanded={expanded === task.task_id}
                    onChange={handleChangePanel(task.task_id)}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" >
                      <Typography style={{ fontWeight: 10,}}>
                        Details
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        {/*Time Modulule*/}
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
                                {/* <p>Username - {userdata.username}</p> */}
                              </GridItem>
                            </GridContainer>
                          </>
                        )}
                        {/*Time Modulule*/}
                        {/* display comments in dropdown */}
                          <GridItem>
                            {dropdown_Comments.map((dComment)=>{
                              return(
                                <span>
                                  <GridContainer>
                                    <GridItem>
                                      <span>{dComment.username}</span>
                                    </GridItem>
                                    <GridItem>
                                      <ReactQuill value={dComment.comment} theme="bubble" readOnly />
                                    </GridItem>
                                    <GridItem>
                                      <span>{dComment.creation_time}</span>
                                    </GridItem>
                                  </GridContainer>
                                </span>
                              )
                            })}
                          </GridItem>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>


                  </td>
                </tr>
              )
            })}
            
          </table>
          
 
    </>
  );
}

Dashboard.layout = User;

export default Dashboard;