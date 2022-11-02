import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from 'next/router';
import { makeStyles } from "@material-ui/core/styles";
import Admin from "layouts/Admin.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import { server } from 'config';

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

  const [trackdate,settrackdate] = useState("")
  

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
