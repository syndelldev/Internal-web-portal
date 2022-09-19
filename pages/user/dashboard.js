import React, { useEffect, useState , useRef } from "react";
// layout for this page

import User from "layouts/User.js";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";

import { useForm } from 'react-hook-form';
import Popup from "reactjs-popup";
import axios from "axios";
import { server } from 'config';

import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import { useCookies } from 'react-cookie';
import { Button } from "@material-ui/core";
import { getAllJSDocTags } from "typescript";


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

  const [username, setusername] = useState('');
  const [message, setmessage] = useState('');

  const [comments, setcomments] = useState([]);
  console.log(comments)
  
  const getData = async (project_id)=>{

    alert(project_id)
    let comment = await axios.post(`${server}/api/comment/comment`, { project_id: project_id });
    // console.log(comment.data)
    setcomments(comment.data)
    console.log(comments)
  }
  

  const sendMessage = async (project_id) => {
    // e.preventDefault();
    alert(project_id)
    let addComment = await axios.post(`${server}/api/comment/addcomment`, {  username: cookies.name, message: message , project_id: project_id });
    console.log(addComment)
    console.log(cookies.name)
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
      <GridContainer>
       {
          project.map((project)=>{
            // const bDate = ((project.project_deadline).substr(0,10).split("-",3));
            return(
              <GridItem xs={6} sm={6} md={4} key={project.project_id}>
                <Card >
                  <CardHeader color="primary">
                  <img className="image" src={`${server}/reactlogo.png`} />
                    <h4 className="projectTitle">{project.project_title}</h4>
                  </CardHeader>
                  <CardFooter>
                    <p className="projectLanguage">{project.project_language}</p>
                    <p className="projectPriority">
                      {/* {project.project_id} */}
                      
                      {/*View Project PopUp*/}
                      {/* <Button disabled={project.view_rights==0} >View</Button>
                      <Button disabled={project.edit_rights==0} >Edit</Button> */}
                        <Popup trigger={<Button disabled={project.view_rights==0} >View</Button>}  className="popupReact"  modal>
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
                        </Popup>

                        {/*Edit Project PopUp*/}
                        <Popup trigger={<div> <button disabled={project.edit_rights==0} onClick={()=>getData(project.project_id)} >Edit</button> </div>}  className="popupReact"  modal >
                          {close => (
                            <div>
                              
                              <GridItem xs={6} sm={6} md={12} key={project.project_id}>
                                <Card>
                                  <CardHeader color="primary">
                                    <h4>{project.project_title}</h4>
                                      <div className={classes.close}>
                                        <a onClick={close}>&times;</a>
                                      </div>
                                  </CardHeader>
                                  <CardFooter>
                                    <p>Project Language - {project.project_language}</p>
                                  </CardFooter>
                                  <CardFooter>
                                    <p>Project Person - {project.project_person}</p>
                                  </CardFooter>
                                  <CardFooter>
                                    <p>Project Description - {project.project_description}</p>
                                  </CardFooter>
                                  <CardFooter>
                                    <p>Department - {project.project_department}</p>
                                  </CardFooter>
                                  <CardFooter>
                                    <p>Project Status - {project.project_status}</p>
                                  </CardFooter>
                                  <CardFooter>
                                    <p className="projectPriority">{project.project_priority} Priority</p>
                                  </CardFooter>
                                  {/* <CardFooter> */}
                                  {comments.map((m)=>{
                                    const Date = ((m.creation_time).substr(0,10).split("-",3));
                                    const Time = ((m.creation_time).substr(11,16).split(":",3));
                                    return(
                                      <>
                                        <GridContainer>
                                          <GridItem xs={12} sm={12} md={12}>
                                            <p>{m.username}</p>
                                            <p>{m.comment}</p>
                                            <p>{Date[2]}/{Date[1]}/{Date[0]}</p>
                                            <p>{Time[0]}:{Time[1]}:{Time[2]}</p>
                                          </GridItem>
                                        </GridContainer><br/>
                                      </>
                                    )
                                  })}
                                  
                                  <form>
                                  <br/>
                                      {/* <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => {
                                          setusername(e.target.value);
                                        }}
                                      />  */}
                                      <textarea
                                        className="form-control signup-input"
                                        type="text"
                                        value={message}
                                        onChange={(e) => {
                                          setmessage(e.target.value);
                                        }}
                                      ></textarea>
                                      <Button type="submit" onClick={()=>sendMessage(project.project_id)}>comment</Button>
                                    </form>
                                  {/* </CardFooter > */}
                                </Card>
                              </GridItem>

                            </div>
                          )}
                        </Popup>
                    </p>
                  </CardFooter>
                  <CardFooter>
                    <p>{project.project_person}</p>
                  </CardFooter>
                  <CardFooter>
                    <p className="projectPriority">{project.project_priority} Priority</p>
                    {/* <p className="projectPriority"><GiSandsOfTime /> : {bDate[2]}/{bDate[1]}/{bDate[0]}</p> */}
                  </CardFooter>
                </Card>
              </GridItem>
            )
          })
        }
          
        </GridContainer>
    </>
  );
}

Dashboard.layout = User;

export default Dashboard;
