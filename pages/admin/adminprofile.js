// layout for this page
import Admin from "layouts/Admin.js";
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import { useCookies } from 'react-cookie';

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

function AdminProfile(){  
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
                        <h4 className={classes.cardTitleWhite}>Admin Profile</h4>
                        {/*<p className={classes.cardCategoryWhite}>Created using Roboto Font Family</p>*/}
                    </CardHeader>
                    <CardBody><br/>
                        <div className={classes.typo}>
                            <div className={classes.note}>Username</div>
                            <h5>{cookies.name}</h5>
                        </div>
                        <div className={classes.typo}>
                            <div className={classes.note}>Position</div>
                            <h5>{cookies.Position}</h5>
                        </div>
                        <div className={classes.typo}>
                            <div className={classes.note}>Department</div>
                            <h5>{cookies.Department}</h5>
                        </div>
                        <div className={classes.typo}>
                            <div className={classes.note}>Email</div>
                            <h5>{cookies.Email}</h5>
                        </div>
                        <div className={classes.typo}>
                            <div className={classes.note}>Mobile No.</div>
                            <h5>{cookies.Mobile_num}</h5>
                        </div>
                        <div className={classes.typo}>
                            <div className={classes.note}>Date of Birth</div>
                            <h5>{cookies.DOB}</h5>
                        </div>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
        </>
    )
}

AdminProfile.layout = Admin;

export default AdminProfile;