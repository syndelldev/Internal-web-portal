import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";



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
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts.js";




import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";



export async function getServerSideProps(content){
    const res = await fetch(`http://localhost:3000/api/user`)
    const tasklist = await res.json()
    console.log(tasklist);
  
    return{ props: {tasklist} }
} 

function AllTask({ tasklist }){
    console.log(tasklist);

    const useStyles = makeStyles(styles);
    const classes = useStyles();

    return (
        <>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>User Task Details</h4>
                        </CardHeader>
                        <CardBody>
                            <div className={classes.tableResponsive}>
                                <Table className={classes.table}>
                                    <TableHead className={classes.TableHeader}>
                                        <TableRow className={classes.tableHeadRow}>
                                            <TableCell>ID</TableCell>
                                            <TableCell>Task Name</TableCell>
                                            <TableCell>Task Description</TableCell>
                                            <TableCell>Task Time</TableCell>
                                            <TableCell>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {tasklist.map((user)=>{
                                            return(
                                                <TableRow key={user.id} className={classes.tableHeadRow}>
                                                    <TableCell>{user.id}</TableCell>
                                                    <TableCell>{user.task_name}</TableCell>
                                                    <TableCell>{user.task_description}</TableCell>
                                                    <TableCell>{user.task_time}</TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
            {/*<GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Simple Table</h4>
                            <p className={classes.cardCategoryWhite}>Here is a subtitle for this table</p>
                        </CardHeader>
                        <CardBody>
                            <div className={classes.tableResponsive}>
                                <Table className={classes.table}>
                                    <TableHead className={classes.TableHeader}>
                                        <TableRow className={classes.tableHeadRow}>
                                            <TableCell>ID</TableCell>
                                            <TableCell>Task Name</TableCell>
                                            <TableCell>Task Description</TableCell>
                                            <TableCell>Task Time</TableCell>
                                            <TableCell>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {tasklist.map((user)=>{
                                            return(
                                                <TableRow key={user.id} className={classes.tableHeadRow}>
                                                    <TableCell>{user.id}</TableCell>
                                                    <TableCell>{user.task_name}</TableCell>
                                                    <TableCell>{user.task_description}</TableCell>
                                                    <TableCell>{user.task_time}</TableCell>
                                                    <TableCell>
                                                        <a href={`/user/${user.id}`}>view</a>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>*/}
        </>
    );
}

AllTask.layout = Admin;

export default AllTask;
