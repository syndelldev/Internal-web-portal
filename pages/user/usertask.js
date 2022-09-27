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


const ReactQuill = dynamic(import('react-quill'), { ssr: false })

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

  //Date Declration
  const On_track = [];
  console.log("On_track",On_track)

  const Off_track = [];
  console.log("Off_track",Off_track)

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
    console.log(task_id);
    console.log(textComment);

    var addComment = await axios.post(`${server}/api/comment/addcomment`, {  username: cookies.name, message: message , task_id: task_id, estimate:estimate , spent:spent });
    console.log(addComment)
    console.log(cookies.name)
    // router.reload(`${server}/user/dashboard`);
  }

  //for Time Declration

  const [Time, setTime] = useState([]);
  console.log(Time)
  
  const [TimeData,setTimeData] = useState([])
  
  const getTime = async (task_id) =>{
    var timedata = await axios.post(`${server}/api/comment/task_time`, { task_id: task_id });
    setTime(timedata.data[0])
    setTimeData(timedata.data)
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
    // e.preventDefault();
    var addTime = await axios.post(`${server}/api/comment/addtasktime`, { task_id:task_id, username: cookies.name, estimate:estimate , spent:spent });
    console.log(addTime.data)
  }
  
  const update_tasktime = async (task_id)=>{
    // e.preventDefault();
    var updateTime = await axios.put(`${server}/api/comment/update_tasktime`, { task_id:task_id, username: cookies.name, estimate:userdata.estimate_time , spent:userdata.spent_time });
    console.log(updateTime)
  }

  const [textComment, setText] = useState([]);

  class RichTextEditor extends React.Component {
    constructor(props) {
      super(props);
  
      this.modules = {
        toolbar: [
            [{ 'font': [] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline'],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            [{ 'align': [] }],
            [{ 'color': [] }, { 'background': [] }],
            ['clean']
          ]
      };
  
      this.formats = [
          'font',
          'size',
          'bold', 'italic', 'underline',
          'list', 'bullet',
          'align',
          'color', 'background'
        ];
  
        this.state = {
        comments: ''
      }
  
      this.rteChange = this.rteChange.bind(this);
    }
  
    rteChange = (content, delta, source, editor) => {
      // console.log(editor.getHTML()); // rich text
      // console.log(content);
      // console.log(delta.ops[1]);
      // console.log(source);
      // console.log(editor.getText()); // plain text
      // console.log(editor.getLength()); // number of characters
    }
  
    render() {
        return (
          <div>
            <ReactQuill theme="snow"  modules={this.modules}
              formats={this.formats} onChange={this.rteChange}
              value={this.state.comments || ''}/>
              {console.log("123")}
              {setText(this.state.comments)}
          </div>
        );
    }
  
  }

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + '/' + mm + '/' + dd;
  console.log(today);
  
  return (
    <>
      <div>
        {/*users.map((user)=>{
          return(
            <div key={user.id}>
              <h1>Welcome {user.username} </h1>
            </div>
          )
        })*/}
      </div>
          <h2>My Task</h2>
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
              //For Date
              const MySQLDate  = task.task_deadline;
              let date = MySQLDate.replace(/[-]/g, '/').substr(0,10);
              console.log(date)
              if(date>today)
              {
                console.count("On track")
                On_track.push(task.task_id); 
                console.log(task.task_id)
              }
              else{
                console.count("off track")
                Off_track.push(task.task_id);
                console.log(task.task_id)
              }
              return(
                <tr className="project-data-details">
                  <td colspan="2"><h4 className="projectTitle">{task.task_title}</h4></td>
                  <td className="priority-data"><p className={task.task_priority}>{task.task_priority}</p></td>
                  <td className="status-data">
                    {/* <p className={task.task_status}>{task.task_status}</p> */}
                    {/* <p>{date}</p> */}
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
                      {/*view Popup start*/}
                      {/* <Popup trigger={<Button disabled={project.view_rights==0} ><FaEye/></Button>}  className="popupReact"  modal>
                          {close => (
                            <div>
                              <GridItem xs={6} sm={6} md={12} key={project.project_id}>
                                <Card >
                                  <CardHeader color="primary">
                                    <GridContainer>
                                      <GridItem>
                                        <h4>{project.project_title}</h4>
                                      </GridItem>
                                      <div className={classes.close}>
                                        <a onClick={close}>&times;</a>
                                      </div>   
                                    </GridContainer>
                                  </CardHeader><br/>
                                  <CardFooter>
                                    <p>Project Language</p>-<p>{project.project_language}</p>
                                  </CardFooter>
                                  <CardFooter>
                                    <p>{project.project_person}</p>
                                  </CardFooter>
                                  <CardFooter>
                                    <p>{project.project_description}</p>
                                  </CardFooter>
                                  <CardFooter>
                                    <p>{project.project_department}</p>
                                  </CardFooter>
                                  <CardFooter>
                                    <p>{project.project_status}</p>
                                  </CardFooter>
                                  <CardFooter>
                                    <p className="projectPriority">{project.project_priority} Priority</p>
                                  </CardFooter>
                                </Card>
                              </GridItem>
                            </div>
                          )}
                        </Popup> */}
                        {/*view popup end*/}
                        {/*Edit popup Start*/}
                        <Popup trigger={<div> <button disabled={task.edit_rights==0} onClick={()=>{getData(task.task_id);getTime(task.task_id)}} className="user-icon"><FiEdit/></button> </div>}  className="popupReact"  modal >
                          {close => (
                            <div>
                              
                              <GridItem xs={12} sm={12} md={12} key={task.task_id}>
                                <Card>
                                  <CardHeader color="primary" className="user">
                                    <h4>{task.task_title}</h4>
                                      <div className={classes.close}>
                                        <a onClick={close}>&times;</a>
                                      </div>
                                  </CardHeader>
                                  <CardBody>
                                      <GridContainer>
                                        <GridItem>
                                          <p><span class="user-editbtn">Task Language</span> - {task.task_language}</p>
                                          <p><span class="user-editbtn">Task Person</span> - {task.task_person}</p>
                                          <p><span class="user-editbtn">Task Description</span> - {task.task_description}</p>
                                          <p><span class="user-editbtn">Department</span> - {task.task_department}</p>
                                          <p><span class="user-editbtn">Task Status</span> - <span className={task.task_status}>{task.task_status}</span></p>
                                        </GridItem>
                                        <GridItem>
                                          <p className={task.task_priority}>{task.task_priority} Priority</p>
                                        </GridItem>
                                      </GridContainer>
                                  {/* </CardBody> */}

                                  <GridContainer>
                                    <GridItem>
                                      <h5 className="projectPriority">Comments</h5>
                                    </GridItem>
                                  </GridContainer>
                                  <GridContainer>
                                    <GridItem xs={12} sm={12} md={12} >
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
                                                {/* <button type="submit" onClick={()=>insert_time(task.task_id)}>submit</button> */}
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
                                                {/* <button type="submit" onClick={()=>update_tasktime(task.task_id)}>submit</button> */}
                                              </GridContainer>
                                            </form>
                                          </>
                                        )}
                                      <form>
                                        {/* <textarea
                                          className="form-control signup-input"
                                          type="text"
                                          value={message}
                                          onChange={(e) => {
                                            setmessage(e.target.value);
                                          }}
                                        ></textarea> */}
                                        <RichTextEditor placeholder={"Write your comment"}
                                          // value={message}
                                          // onChange={(e) => {
                                          //   setmessage(e.target.value);
                                          // }}
                                         />

                                        <div onClick={()=> sendMessage(task.task_id)}>Save</div>

                                        {/* <div onClick={() => sendMessage(task.task_id)}>Save</div> */}
                                      </form>
                                    </GridItem>
                                  </GridContainer>

                                  {comments.map((m)=>{
                                    const Date = ((m.creation_time).substr(0,10).split("-",3));
                                    const Time = ((m.creation_time).substr(11,16).split(":",3));
                                    var dateP = m.creation_time;
                                    var textArea = (m.comment).split(`\n`);
                                    // console.log("textArea");
                                    // console.log(textArea);
                                    // if(textArea == ""){
                                      // function Setcontent() {
                                      //  }
                                      return(
                                        <span>
                                          <GridContainer>
                                            <GridItem>
                                              <span>{m.username}</span>
                                            </GridItem>
                                                
                                            <GridItem>
                                            <span><p>{Date[2]}/{Date[1]}/{Date[0]}</p></span>
                                            </GridItem>
                                          </GridContainer>

                                          <GridContainer>
                                            <GridItem>
                                              <div>
                                                <span id="editorOne">{m.comment}</span>
                                              </div>
                                            </GridItem>
                                          </GridContainer>
                                        </span>
                                      )
                                    // }else{
                                    //   return(
                                    //     <span>
                                    //       <GridContainer>
                                    //         <GridItem>
                                    //           <span>{m.username}</span>
                                    //         </GridItem>
                                                
                                    //         <GridItem>
                                    //         <span><p>{Date[2]}/{Date[1]}/{Date[0]}</p></span>
                                    //         </GridItem>
                                    //       </GridContainer>

                                    //       <GridContainer>
                                    //         <GridItem>
                                    //           <div>
                                    //             <a href={m.comment} target="_blank" id="userComment">{m.comment}</a>
                                    //             {/* <p>{Time[0]}:{Time[1]}:{Time[2]}</p> */}
                                    //           </div>
                                    //         </GridItem>
                                    //       </GridContainer>
                                    //     </span>
                                    //   )
                                    // }
                                  })}
                                  </CardBody>

                                </Card>
                              </GridItem>

                            </div>
                          )}
                        </Popup>
                        {/*Edit popup end*/}
                    </div>
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