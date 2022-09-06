// layout for this page
import Admin from "layouts/Admin.js";
import { useState } from "react";

//import { useEffect,useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
//import { useSession } from 'next-auth/react'
import Primary from "components/Typography/Primary.js";
import Info from "components/Typography/Info.js";
import Success from "components/Typography/Success.js";
import Warning from "components/Typography/Warning.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import InputLabel from "@material-ui/core/InputLabel";
import { useCookies } from 'react-cookie';

import avatar from "assets/img/faces/marc.jpg";
import { server } from 'config';

const styles = {
    typo: {
      paddingLeft: "25%",
      marginBottom: "40px",
      position: "relative",
    },
    note: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      bottom: "10px",
      color: "#c0c1c2",
      display: "block",
      fontWeight: "400",
      fontSize: "13px",
      lineHeight: "13px",
      left: "0",
      marginLeft: "20px",
      position: "absolute",
      width: "260px",
    },
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

export async function getServerSideProps(context){
    const id = context.params.userid;
    const res = await fetch(`${server}/api/admin/${id}`)
    const UserDetail = await res.json()
    //console.log(id);
  
    return{ props: {UserDetail} }
} 

function ViewUser({UserDetail}){
    //console.log(UserDetail[0]);

    const useStyles = makeStyles(styles);
    const classes = useStyles();

    return(
        <>
        <GridContainer>
            <GridItem xs={12} sm={12} md={8}>      
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>User Profile</h4>
                        {/*<p className={classes.cardCategoryWhite}>Created using Roboto Font Family</p>*/}
                    </CardHeader>
                    <CardBody><br/>
                        <div className={classes.typo}>
                            <div className={classes.note}>Username</div>
                            <h5>{UserDetail[0].username}</h5>
                        </div>
                        <div className={classes.typo}>
                            <div className={classes.note}>Position</div>
                            <h5>{UserDetail[0].position}</h5>
                        </div>
                        <div className={classes.typo}>
                            <div className={classes.note}>Department</div>
                            <h5>{UserDetail[0].department}</h5>
                        </div>
                        <div className={classes.typo}>
                            <div className={classes.note}>Email</div>
                            <h5>{UserDetail[0].email}</h5>
                        </div>
                        <div className={classes.typo}>
                            <div className={classes.note}>Mobile No.</div>
                            <h5>{UserDetail[0].mobile_no}</h5>
                        </div>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>  
        </>
    )
}

ViewUser.layout = Admin;

export default ViewUser;