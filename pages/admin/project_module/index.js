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
  const res = await fetch(`${server}/api/project`)
  const project_details = await res.json();
  // console.log(project_details);

  return{ props: {project_details} }
}

function AddUser({ project_details }) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
            <form>
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Projects</h4>
                    {/* <p className={classes.cardCategoryWhite}>Enter your new project details</p> */}
                </CardHeader>
                  <CardBody><br/>
                    </CardBody>
                    {project_details.map((user)=>{
                      return(<>
                        <h2>{user.project_title}</h2>{console.log(user.project_title)}
                      </>
                      )
                    })
                    }
                    <CardFooter>
                        {/* <Button color="primary" type="submit">Add Project</Button> */}
                    </CardFooter>
                </Card>
            </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}

AddUser.layout = Admin;

export default AddUser;
