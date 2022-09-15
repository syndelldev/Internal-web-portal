// layout for this page
import User from "layouts/User.js";
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
import { BlockRounded } from "@material-ui/icons";

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
      fontWeight:"bold",    
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

function UserProfile(){  
    const [cookies, setCookie] = useCookies(['name']);
    console.log(cookies)
    
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
                            <div className={classes.note}>Username</div><br/>
                            <h5>{cookies.name}</h5>
                        </div>
                        <div className={classes.typo}>
                            <div className={classes.note}>Position</div><br/>
                            <h5>{cookies.Position}</h5>
                        </div>
                        <div className={classes.typo}>
                            <div className={classes.note}>Department</div><br/>
                            <h5>{cookies.Department}</h5>
                        </div>
                        <div className={classes.typo}>
                            <div className={classes.note}>Email</div><br/>
                            <h5>{cookies.Email}</h5>
                        </div>
                        <div className={classes.typo}>
                            <div className={classes.note}>Phone Number</div><br/>
                            <h5>{cookies.Mobile_num}</h5>
                        </div>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
        </>
    )
}

UserProfile.layout = User;

export default UserProfile;