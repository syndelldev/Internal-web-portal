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


import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2
} from "react-html-parser";

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
  const res = await fetch(`${server}/api/user_dashboard`, {
    headers: {
      'Access-Control-Allow-Credentials': true,
      Cookie: context.req.headers.cookie
    },
  })
  const project = await res.json()
  //console.log(project)

  return { props: {project}, }
}

function Dashboard({project}) {
  // console.log(project)
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const router = useRouter();

  const [cookies, setCookie] = useCookies('');
  //console.log(cookies.Id);

  const [users, setusers] = useState([])

  useEffect(async()=>{
    axios.get(`${server}/api/admin/${cookies.Id}` )
      .then((res)=>{
        setusers(res.data)
        //console.log(res)
      })    
  },[])
  // console.log(users)

  const [comments, setcomments] = useState([]);
  
  const getData = async (project_id)=>{

    // alert(project_id)
    var comment = await axios.post(`${server}/api/comment/comment`, { project_id: project_id });
    // console.log(comment.data)
    setcomments(comment.data)
    // console.log(comments)
  }
  

  const sendMessage = async (project_id) => {
    // e.preventDefault();
    // alert(project_id)
    // console.log("comm");
    // console.log(value);

    var addComment = await axios.post(`${server}/api/comment/addcomment`, {  username: cookies.name, message: value , project_id: project_id });
    // console.log(addComment)
    // console.log(cookies.name)
    router.reload(`${server}/user/usertask`);
  }

    const [ value, setValue ] = useState("");
    const modules = {
      toolbar: [
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline'],
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{ 'align': [] }],
        [{ 'color': [] }, { 'background': [] }],
        ['clean'],
        ['link', 'image', 'video']
      ]
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
        // var comment = await axios.post(`${server}/api/comment/comment`, { project_id: project_id });
    }
      //   var comment = await axios.post(`${server}/api/comment/comment`, { project_id: project_id });
      //   setModules(modules);
      //   setTheme("snow");
      //   setRead(false);
      //   console.log(username);
      //   console.log(cookies.name);
    }
    
    const updateComment = async(id, comment) =>{
      console.log(comment);
      console.log(id);
      var comment = await axios.post(`${server}/api/comment/updateComment`, { comment_id: id, user: cookies.name, comment:comment });
      router.reload(`${server}/user/usertask`);
    }

      
  return (
    <>
      <div>
        {users.map((user)=>{
          return(
            <div key={user.id}>
              <h1>Welcome {user.username} </h1>
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
            <tr className="project-data-details">
              <td colspan="2">
                {
                  project.map((project)=>{
                    return(
                      <h4 className="projectTitle">{project.project_title}</h4>
                    )
                  })
                }
              </td>
              <td className="priority-data">
                {
                  project.map((project)=>{
                    return(
                      <p className="projectPriority">{project.project_priority}</p>
                    )
                  })
                }
              </td>
              <td className="status-data">
                {
                  project.map((project)=>{
                    return(
                      <p>{project.project_status}</p>
                    )
                  })
                }
              </td>
              <td colspan="4" className="assignee-data">
                {
                  project.map((project)=>{
                    return(
                      <p>{project.project_person}</p>
                    )
                  })
                }
              </td> 
              <td>
                {
                  project.map((project)=>{
                    return(
                      <div className="icon-display">
                        <Popup trigger={<div> <button disabled={project.edit_rights==0} onClick={()=>getData(project.project_id)} className="user-icon"><FiEdit/></button> </div>}  className="popupReact"  modal nested >
                          {close => (
                            <div>
                              
                              <GridItem xs={12} sm={12} md={12} key={project.project_id}>
                                <Card>
                                  <CardHeader color="primary">
                                    <h4>{project.project_title}</h4>
                                      <div className={classes.close}>
                                        <a onClick={close}>&times;</a>
                                      </div>
                                  </CardHeader>
                                  <CardBody>
                                      <GridContainer>
                                        <GridItem>
                                          <p>Project Language - {project.project_language}</p>
                                          <p>Project Person - {project.project_person}</p>
                                          <p>Project Description - {project.project_description}</p>
                                          <p>Department - {project.project_department}</p>
                                          <p>Project Status - {project.project_status}</p>
                                        </GridItem>
                                        <GridItem>
                                          <p className="projectPriority">{project.project_priority} Priority</p>
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
                                      <form>

                                        <ReactQuill modules={modules} theme="snow" onChange={setValue} />
                                        <div onClick={()=> sendMessage(project.project_id)}>Save</div>

                                      </form>
                                    </GridItem>
                                  </GridContainer>

                                  {comments.map((m)=>{
                                    const Date = ((m.creation_time).substr(0,10).split("-",3));
                                    const Time = ((m.creation_time).substr(11,16).split(":",3));
                                    var dateP = m.creation_time;
                                  
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
                                                {/* <span id="editorOne" className="class_Comment">{m.comment}</span> */}
                                                {/* <ReactQuill modules={commentModules} theme="snow" />
                                                <div className="showComments">
                                                  {ReactHtmlParser(m.comment)}
                                                </div> */}

                                                <ReactQuill value={m.comment} theme="bubble" readOnly />
      <Popup
        trigger={ <span><button onClick={()=>{ editComment(m.id)} } disabled={ m.username != cookies.name }>Edit</button></span> }
        // position="top left"
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
                                        {/* {setEditComment(m.id)} */}
                                        {/* <div onClick={()=> sendEditComment(project.project_id)}>Save</div> */}

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
                                                
                                                {/* <div onClick={()=>{ editComment( m.id, m.project_id, m.username, m.comment )} }>Edit</div> */}
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
                    )
                  })
                }
              </td>  
            </tr>
          </table>
          
 
    </>
  );
}

Dashboard.layout = User;

export default Dashboard;
