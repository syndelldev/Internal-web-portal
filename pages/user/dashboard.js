import React, { useEffect, useState } from "react";
// layout for this page

import User from "layouts/User.js";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import Popup from "reactjs-popup";
import axios from "axios";
import { server } from 'config';

import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import { useCookies } from 'react-cookie';
import { Button } from "@material-ui/core";
import Pusher from "pusher-js";

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

  const [username, setusername] = useState('')
  const [message, setMessage] = useState('');

  const [messages, setmessages] = useState([])

  let allMessages = [];

    useEffect(() => {
        Pusher.logToConsole = true;

        const pusher = new Pusher('', {
            cluster: ''
        });

        const channel = pusher.subscribe('chat');
        channel.bind('message', function (data) {
            allMessages.push(data);
            setMessages(allMessages);
        });
    });


  const onSubmit = (e) => {
    e.preventDefault();
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
                  <img class="image" src={`${server}/reactlogo.png`} className={classes.img}/>
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
                                    <p>{project.project_language}</p>
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
                        <Popup trigger={<Button disabled={project.edit_rights==0} >Edit</Button>}  className="popupReact"  modal>
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
                                    <p>{project.project_language}</p>
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
                                  <CardFooter style={{ minHeight: '300px' }}>
                                    {messages.map((msg,index)=>{
                                      return(
                                        <div key={index}>
                                          {msg}
                                        </div>
                                      )
                                    })}
                                    <form onSubmit={onSubmit}>
                                      <GridItem xs={12} sm={12} md={12}>
                                        <div className="form-group">
                                          <textarea value={message} onChange={(e)=>{setMessage(e.target.value)}} className="form-control signup-input" placeholder="Ask a question or post an update…"  />
                                        </div> 
                                      </GridItem>
                                      <GridItem xs={12} sm={12} md={12}>
                                        <Button type="submit" color="primary">Comment</Button>
                                      </GridItem>
                                    </form>
                                  </CardFooter >
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
