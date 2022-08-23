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
import { MultiSelect } from "react-multi-select-component";


const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};


export async function getServerSideProps(){
  const res = await fetch(`${server}/api/project`);
  const project_details = await res.json();
  // console.log(project_details);

  return{ props: {project_details} }
}

const onSubmit = async () =>{
    
  console.log(project_id);
  
  const res = await fetch(`${server}/api/project/delete_project_api`,{
    method: "GET",
    headers: { "Content-Type": "application/json",},
    // body:JSON.stringify({project_person:allSelectedUser, project_title:result.project_title, project_description:result.project_description, project_language:result.project_language, project_comment:result.project_comment, project_priority:result.project_priority }),
  })
  const data=await res.json();
  console.log(data)
  if(res.status==200)
  {
    alert("success");
    // router.push("/admin/userdetail");
  }
  else
  {
    alert("Fail");
  }
}


function AddUser({ project_details }) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  return (
    <>
      <Button type="submit" ><a href='/admin/project_module/create_project'  color="primary">Create Project</a></Button>

    {project_details.map((project)=>{
    return(<>

      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
            <form onSubmit={onSubmit}>
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Project</h4>
                    <p className={classes.cardCategoryWhite}>{project.project_title}</p>
                </CardHeader>

                  <CardBody>
                      <h5>Project Priority:</h5>
                      <p>{project.project_priority}</p>

                      <h5>Project Description:</h5>
                      <p>{project.project_description}</p>

                      <h5>Project Language:</h5>
                      <p>{project.project_language}</p>

                      <h5>Project Comment:</h5>
                      <p>{project.project_comment}</p>

                      <h5>Project Members:</h5>
                      <p>{project.project_person}</p>
                      <Button color="primary" type="submit" id={project.project_id}>Edit</Button>
                      <Button color="primary" type="submit" id={project.project_id}>Delete</Button>

                  </CardBody>

                    <CardFooter>
                        {/* <Button color="primary" type="submit">Edit</Button>
                        <Button color="primary" type="submit">Delete</Button> */}
                    </CardFooter>
                </Card>
            </form>
        </GridItem>
      </GridContainer>
      </>
                      )
                    })
                    }

    </>
  );
}

AddUser.layout = Admin;

export default AddUser;
