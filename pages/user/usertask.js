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
import User from "layouts/User.js";
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

function Dashboard( { allTask } ) {

//   console.log(allTask)

  const useStyles = makeStyles(styles);
  const classes = useStyles();

  return (
    <>
        <GridContainer>
            {allTask.map((task)=>{
                var person = task.task_person.split(",");
                return(
                    <GridItem xs={6} sm={6} md={4} key={task.task_id}>
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
                                                <a href='#'>Detail</a>
                                            </div>
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem>
                                        {person.map((data,index)=>{
                                            return(
                                                <div key={index}>
                                                    <p className="projectPerson">{data}</p>
                                                </div>
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
                            </Card>
                        </form>
                    </GridItem>
                )
            })}
        </GridContainer>
    </>
  );
}

Dashboard.layout = User;

export default Dashboard;
