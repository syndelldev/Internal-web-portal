import React, { useEffect, useState } from "react";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

// layout for this page
import SuperUser from "layouts/SuperUser.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";


import Popup from "reactjs-popup";
import axios from "axios";
import { server } from 'config';

import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import { useCookies } from 'react-cookie';
import { Button } from "@material-ui/core";


export async function getServerSideProps(context){
  //console.log(context.req.cookies);
  const res = await fetch(`${server}/api/project`);
  const project_details = await res.json();
  // console.log(project_details);

  const response = await fetch(`${server}/api/admin`)
  const User_name = await response.json();
  // console.log(User_name);

  const hold = await fetch(`${server}/api/project/project_status/project_hold`)
  const project_hold = await hold.json();

  const completed = await fetch(`${server}/api/project/project_status/project_completed`)
  const project_completed = await completed.json();

  const running = await fetch(`${server}/api/project/project_status/project_running`)
  const project_running = await running.json();

  // console.log(all_status);

  return{ props: { project_hold, project_completed, project_running } }
}

function Dashboard({ project_hold, project_completed, project_running }) {
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

  console.log(project_running);
  

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + '/' + mm + '/' + dd;
  // console.log(today);

  const On_track = [];
  console.log(On_track)

  const Off_track = [];
  console.log(Off_track)

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
      <h4 className="project_status">Projects</h4>
      <GridContainer>
      {project_running.map((status)=>{
        const MySQLDate  = status.project_deadline;
        let date = MySQLDate.replace(/[-]/g, '/').substr(0,10);
        console.log("date");
        // console.log(trackdate);
        // console.log(status.project_id);

        if(date>today)
        {
          On_track.push(status.project_id);
          // console.log(On_track) 
        }
        else{
          Off_track.push(status.project_id);
          // console.log(Off_track)
        }
      })}
    </GridContainer>
    <div className="project-status">
    <GridContainer>
          <GridItem xs={12} sm={6} md={4} >
              <h3 className="on-track">On Track Project - {On_track.length}</h3>
          </GridItem>
    </GridContainer>

    <GridContainer>
          <GridItem xs={12} sm={6} md={4} >
              <h3 className="off-track">Off Track Project - {Off_track.length}</h3>
          </GridItem>
    </GridContainer>

    <GridContainer>
          <GridItem xs={12} sm={6} md={4} >
              <h3 className="completed-project">Completed Project - {project_completed.length}</h3>
          </GridItem>
    </GridContainer>

    <GridContainer>
          <GridItem xs={12} sm={6} md={4}>
            <div>
              <h3 className="on-hold">On Hold Project - {project_hold.length}</h3>
            </div>
          </GridItem>
    </GridContainer>
    </div>
    </>
  );
}

Dashboard.layout = SuperUser;

export default Dashboard;
