import React, { useEffect, useState } from "react";
//import Cookies from 'js-cookie';
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import { GiSandsOfTime } from "react-icons/gi";
import { FiEdit } from 'react-icons/fi'
import { FaEye } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { RiAddCircleFill } from 'react-icons/ri'

// layout for this page
import User from "layouts/User.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import axios from "axios";
import { server } from 'config';

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts.js";

import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import { useCookies } from 'react-cookie';
import { Button } from "@material-ui/core";


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
  //console.log(project)
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  
  const [cookies, setCookie] = useCookies('');
  //console.log(cookies.Id);

  const [users, setusers] = useState([])

  // useEffect(async()=>{
  //   axios.get(`${server}/api/admin/${cookies.Id}` )
  //     .then((res)=>{
  //       setusers(res.data)
  //       //console.log(res)
  //     })    
  // },[])
  //console.log(users)

  const [ userRights, setuserRights] = useState([])
  useEffect(()=>{
    axios.get(`${server}/api/rights/${cookies.Id}`)
    .then((res)=>{
      setuserRights(res.data)
      //console.log(res.data)
    })
  },[1000])
  console.log(userRights)

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
            const bDate = ((project.project_deadline).substr(0,10).split("-",3));
            return(
              <GridItem xs={6} sm={6} md={4} key={project.project_id}>
                <Card >
                  <CardHeader color="primary">
                    <h4>{project.project_title}</h4>
                  </CardHeader>
                  <CardFooter>
                    <p className="projectLanguage">{project.project_language}</p>
                    <p className="projectPriority">

                   
                        {
                        userRights.map((rights)=>{
                          if(rights.user_list == 0){
                            return(
                              <Button disabled key={rights.id} className="rights_btn"><a href={`#`} className="projectPriority"><FaEye/></a></Button>
                            )
                          }
                          else{
                            return(
                              <Button key={rights.id} className="rights_btn"><a href={`#`} className="projectPriority"><FaEye/></a></Button>
                            )
                          }
                          })
                        }

                        {
                        userRights.map((rights)=>{
                          if(rights.add_user == 0){
                            return(
                              <Button disabled key={rights.id} className="rights_btn"><a href={`#`} className="projectPriority"><RiAddCircleFill/></a></Button>
                            )
                          }
                          else{
                            return(
                              <Button key={rights.id} className="rights_btn"><a href={`#`} className="projectPriority"><RiAddCircleFill/></a></Button>
                            )
                          }
                          })
                        }

                        {
                        userRights.map((rights)=>{
                          if(rights.edit_user == 0)
                          {
                            return(
                              <Button disabled key={rights.id} className="rights_btn"><a href={`#`} className="projectPriority" ><FiEdit/></a></Button>
                            )
                          }
                          else
                          {
                            return(
                              <Button key={rights.id} className="rights_btn"><a href={`#`} className="projectPriority"><FiEdit/></a></Button>
                            )
                          } 
                          })
                        }

                        {
                        userRights.map((rights)=>{
                          if(rights.delete_user == 0){
                            return(
                              <Button disabled key={rights.id} className="rights_btn"><a href={`#`} className="projectPriority" ><MdDelete/></a></Button>
                            )
                          }
                          else{
                            return(
                              <Button key={rights.id} className="rights_btn"><a href={`#`} className="projectPriority"><MdDelete/></a></Button>
                            )
                          }
                          })
                        }
                    </p>
                  </CardFooter>
                  <CardFooter>
                    <p>{project.project_person}</p>
                  </CardFooter>
                  <CardFooter>
                    <p className="projectPriority">{project.project_priority} Priority</p>
                    <p className="projectPriority"><GiSandsOfTime /> : {bDate[2]}/{bDate[1]}/{bDate[0]}</p>
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
