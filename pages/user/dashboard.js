import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from 'next/router';
import { makeStyles } from "@material-ui/core/styles";
import User from "layouts/User.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import { server } from 'config';
// import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";

import { useCookies } from 'react-cookie';
import axios from "axios";

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
  // console.log(context.req.cookies);

  const completed = await fetch(`${server}/api/user/project_status/project_completed`,{
    headers: {
      'Access-Control-Allow-Credentials': true,
      Cookie: context.req.headers.cookie
    },
  })
  const project_completed = await completed.json();

  const hold = await fetch(`${server}/api/user/project_status/project_hold`,{
    headers: {
      'Access-Control-Allow-Credentials': true,
      Cookie: context.req.headers.cookie
    },
  })
  const project_hold = await hold.json();

  const running = await fetch(`${server}/api/user/project_status/project_running`,{
    headers: {
      'Access-Control-Allow-Credentials': true,
      Cookie: context.req.headers.cookie
    },
  })
  const project_running = await running.json();

  const high = await fetch(`${server}/api/user/project_priority/high_priority`,{
    headers: {
      'Access-Control-Allow-Credentials': true,
      Cookie: context.req.headers.cookie
    },
  })
  const high_priority = await high.json();

  const low = await fetch(`${server}/api/user/project_priority/low_priority`,{
    headers: {
      'Access-Control-Allow-Credentials': true,
      Cookie: context.req.headers.cookie
    },
  })
  const low_priority = await low.json();

  const medium = await fetch(`${server}/api/user/project_priority/medium_priority`,{
    headers: {
      'Access-Control-Allow-Credentials': true,
      Cookie: context.req.headers.cookie
    },
  })
  const medium_priority = await medium.json();

  const alltask = await fetch(`${server}/api/user_dashboard/subtask_person`,{
    headers: {
      'Access-Control-Allow-Credentials': true,
      Cookie: context.req.headers.cookie
    },
  })
  const all_task = await alltask.json();

  // console.log(all_status);

  return{ props: { project_hold, project_completed, project_running, high_priority, medium_priority, low_priority,  all_task } }
}

function Dashboard( { project_hold, project_completed, project_running, high_priority, medium_priority, low_priority, all_task } ) {
  // console.log(project_hold);
  // console.log(project_completed);
  // console.log(project_running);
  // console.log("all_task",all_task)

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

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + '/' + mm + '/' + dd;
  // console.log(today);

  const On_track = [];
  console.log("On_track",On_track)

  const Off_track = [];
  console.log("Off_track",Off_track)

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

    <GridContainer>
      {project_running.map((status)=>{
        const MySQLDate  = status.project_deadline;
        let date = MySQLDate.replace(/[-]/g, '/').substr(0,10);

        if(date>today)
        {
          console.count("On track")
          On_track.push(status.project_id); 
          console.log(status.project_id)
        }
        else{
          console.count("off track")
          Off_track.push(status.project_id);
          console.log(status.project_id)
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

      <div className="my-task">
        <GridContainer>
          <GridItem xs={12} sm={6} md={6}>
            <h3 className="my-task-priorities"><h2 className="title-my-task">My Task Priorities</h2>
            {high_priority.map((task)=>{
              return(
                <>
                <div>
                  {/* <p>project_name - {task.project_name}</p> */}
                  <p className="task-high">{task.task_title}<span className={task.task_priority}>{task.task_priority}</span></p>
                </div>
                </>
              )
            })}
            {medium_priority.map((task)=>{
              return(
                <>
                <div>
                  {/* <p>project_name - {task.project_name}</p> */}
                  <p className="task-medium">{task.task_title}<span className={task.task_priority}>{task.task_priority}</span></p>
                </div>
                </>
              )
            })}
            {low_priority.map((task)=>{
              return(
                <>
                <div>
                  {/* <p>project_name - {task.project_name}</p> */}
                  <p className="task-low">{task.task_title}<span className={task.task_priority}>{task.task_priority}</span></p>
                </div>
                </>
              )
            })}
            </h3>
          </GridItem>
        </GridContainer>
      </div>

    </>
  );

}

Dashboard.layout = User;

export default Dashboard;







      {/*<GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Used Space</p>
              <h3 className={classes.cardTitle}>
                49/50 <small>GB</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  Get more space
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="dark" stats icon>
              <CardIcon color="dark">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Revenue</p>
              <h3 className={classes.cardTitle}>$34,245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Fixed Issues</p>
              <h3 className={classes.cardTitle}>75</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Tracked from Github
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Followers</p>
              <h3 className={classes.cardTitle}>+245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily Sales</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Email Subscriptions</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="dark">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Tasks:"
            headerColor="dark"
            tabs={[
              {
                tabName: "Bugs",
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                  />
                ),
              },
              {
                tabName: "Website",
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasks={website}
                  />
                ),
              },
              {
                tabName: "Server",
                tabIcon: Cloud,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={server}
                  />
                ),
              },
            ]}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
              <p className={classes.cardCategoryWhite}>
                New employees on 15th September, 2016
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Name", "Salary", "Country"]}
                tableData={[
                  ["1", "Dakota Rice", "$36,738", "Niger"],
                  ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                  ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                  ["4", "Philip Chaney", "$38,735", "Korea, South"],
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>*/}
