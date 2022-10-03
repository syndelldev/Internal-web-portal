// layout for this page
import Modules from "../layouts/Modules";
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import { useCookies } from 'react-cookie';

import { server } from 'config';

export async function getServerSideProps(context){
    console.log(context.req.cookies);
    
    const res = await fetch(`${server}/api/profilepage`,{
        headers: {
          'Access-Control-Allow-Credentials': true,
          Cookie: context.req.headers.cookie
        },
    })
    const profile = await res.json();

    return{ props: { profile } }
}

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

function ProfilePage({profile}){
    console.log(profile)
    const [cookies, setCookie] = useCookies(['name']);
 
    const useStyles = makeStyles(styles);
    const classes = useStyles();

    return(
        <>
        <GridContainer>
            <GridItem xs={12} sm={12} md={8}>      
                <Card>
                    <CardHeader color="primary">
                        <h4 className="text">Admin Profile</h4>
                    </CardHeader><br/><br/>
                    {profile.map((profile)=>{
                        return(
                            <CardBody>
                                <div className={classes.typo}>
                                    <div className={classes.note}>Username</div>
                                    <h5>{profile.username}</h5>
                                </div>
                                <div className={classes.typo}>
                                    <div className={classes.note}>Position</div>
                                    <h5>{profile.position}</h5>
                                </div>
                                <div className={classes.typo}>
                                    <div className={classes.note}>Department</div>
                                    <h5>{profile.department}</h5>
                                </div>
                                <div className={classes.typo}>
                                    <div className={classes.note}>Email</div>
                                    <h5>{profile.email}</h5>
                                </div>
                                <div className={classes.typo}>
                                    <div className={classes.note}>Mobile No.</div>
                                    <h5>{profile.mobile_no}</h5>
                                </div>
                            </CardBody>
                        )
                    })}
                    {/* <CardBody><br/>
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
                            <div className={classes.note}>Mobile No.</div><br/>
                            <h5>{cookies.Mobile_num}</h5>
                        </div>
                    </CardBody> */}
                </Card>
            </GridItem>
        </GridContainer>
        </>
    )
}
ProfilePage.layout = Modules;

export default ProfilePage;