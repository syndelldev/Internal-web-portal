import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from 'next/router';
import { makeStyles } from "@material-ui/core/styles";
import Admin from "layouts/Admin.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import { server } from 'config';
import axios from "axios";
import { useCookies } from 'react-cookie';
// import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";

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

function Dashboard( { project_hold, project_completed, project_running } ) {
  // console.log(project_hold);
  // console.log(project_completed);
  console.log(project_running);

  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [cookies, setCookie] = useCookies('');
  const [trackdate,settrackdate] = useState("")
  const [users, setusers] = useState([])

  useEffect(async()=>{
    axios.get(`${server}/api/admin/${cookies.Id}` )
      .then((res)=>{
        setusers(res.data)
        //console.log(res)
      })    
  },[])

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
              <h1 className="user-welcome">Welcome {user.username}  <img src={`${server}/smiley.gif`} alt="smiley" className="gif-image" /></h1>
            </div>
          )
        })}
      </div>
    <h4 className="project_status">Projects</h4>
    {/* <GridContainer>

      {all_status.map((status) =>{
      return(<>
        <GridItem xs={12} sm={6} md={4}>

          <div className={status.project_status}>
            <h6 className={status.project_status}>{status.project_status}</h6>
            <h3 className={status.project_status}><img src={`${server}/reactlogo.png`} className={status.project_status}/>{status.project_total}</h3>
          </div> 
        </GridItem>

      </>)
      })
      }
    </GridContainer> */}

    <GridContainer>
      {project_running.map((status)=>{
        const MySQLDate  = status.project_deadline;
        let date = MySQLDate.replace(/[-]/g, '/').substr(0,10);
        console.log("date");
        // console.log(trackdate);
        // console.log(status.project_id);

        if(date>today)
        {
          console.count("On track")
          // console.log(status.project_id);

          
          On_track.push(status.project_id);
          // console.log(On_track)
          
          
        }
        else{
          console.count("off track")
          // console.log(status.project_id);

          Off_track.push(status.project_id);
          // console.log(Off_track)

        }
        
        // return(
        //   <GridItem xs={12} sm={6} md={4}>
        //     <div className={status.project_status}>
        //       <h6>{status.project_status}</h6>
        //       <h6>{date}</h6>
        //       <h6>{today}</h6>
        //     </div>
        //   </GridItem>
        // )
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
    </>);

}

Dashboard.layout = Admin;

export default Dashboard;

