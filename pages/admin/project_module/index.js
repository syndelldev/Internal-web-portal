import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from 'next/router'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { IoMdArrowDropdown } from "react-icons/io";
import { useForm  } from 'react-hook-form';
import { server } from 'config';
import avatar from "assets/img/faces/marc.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LibraryBooks from "@material-ui/icons/LibraryBooks";


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
    marginRight: "auto",
    width: "40px",
  }
};


export async function getServerSideProps(){
  const res = await fetch(`${server}/api/project`);
  const project_details = await res.json();
  // console.log(project_details);

  return{ props: {project_details} }
}

function AddProject({ project_details }) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  
  const deleteProject = async(id) =>{
    console.log('delete');
    console.log(id);

    const res = await fetch(`${server}/api/project/${id}`);
  }
  return (
    <>
      <Button type="submit" color="primary" className={classes.cardWhite}><a href='/admin/project_module/create_project' className={classes.cardWhite}>Create Project</a></Button><br/><br/>

    <GridContainer>
    {project_details.map((project)=>{

    if(project.project_status == "active"){

      const bDate = ((project.project_deadline).substr(0,10).split("-",3));
      var person = project.project_person.split(",");
      console.log(person);

      // console.log(bDate);
    return(
    <>
        <GridItem xs={6} sm={6} md={4}>
            <form>
            <Card>
                <CardHeader color="primary">

                  <img src={`${server}/reactlogo.png`} className={classes.img}/>

                    <h4 className="projectTitle">{project.project_title}</h4>
                    <p className={classes.cardCategoryWhite}></p>
                </CardHeader>

                  <CardBody>
                  <GridContainer>
                      <GridItem>
                        <p className="projectLanguage">{project.project_language}</p>
                      </GridItem>

                      <GridItem>
                        <a href={`${server}/admin/project_module/${project.project_id}`}>Edit</a>
                        <button onClick={()=>deleteProject(project.project_id)}>Delete</button>
                      </GridItem>
                    </GridContainer>

                    <GridContainer>
                      <GridItem>
                        {person.map((data)=>{
                          return(
                            <>
                              <p className="projectPerson">{data}</p>
                            </>
                          )
                        })
                        }
                      </GridItem>
                    </GridContainer>

                    <GridContainer>
                      <GridItem>
                        <p className="projectPriority">Project Priority : {project.project_priority}</p>
                      </GridItem>
                      
                      <GridItem>
                        <p className="projectDeadline">Project Deadline : {bDate[2]}/{bDate[1]}/{bDate[0]}</p>
                      </GridItem>
                    </GridContainer>

                      {/* <Button color="primary" type="submit" id={project.project_id}>Edit</Button> */}
                      
                    </CardBody>

                    <CardFooter>
                        {/* <Button color="primary" type="submit">Edit</Button>
                        <Button color="primary" type="submit">Delete</Button> */}
                    </CardFooter>
                </Card>
            </form>
        </GridItem>
      </>
            )}
        })
     }
</GridContainer>
    </>
  );
}

AddProject.layout = Admin;

export default AddProject;
