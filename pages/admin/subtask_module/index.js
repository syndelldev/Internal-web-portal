import { makeStyles } from "@material-ui/core/styles";

import Admin from "layouts/Admin.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import styles from "assets/jss/nextjs-material-dashboard/components/tableStyle.js";

function SubTask(){
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    return(
        <>
            <h3>Tasks Management</h3>
            <div>
                <h6>In Progress</h6>
                <GridContainer>
                    <GridItem xs={6} sm={6} md={4}>
                        <Card>
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>Website Design</h4>
                            </CardHeader>
                            <CardBody>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id nec scelerisque massa.</p>
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem xs={6} sm={6} md={4}>
                        <Card>
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>Website Design</h4>
                            </CardHeader>
                            <CardBody>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id nec scelerisque massa.</p>
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem xs={6} sm={6} md={4}>
                        <Card>
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>Website Design</h4>
                            </CardHeader>
                            <CardBody>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id nec scelerisque massa.</p>
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem xs={6} sm={6} md={4}>
                        <Card>
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>Website Design</h4>
                            </CardHeader>
                            <CardBody>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id nec scelerisque massa.</p>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        </>
    )
}

SubTask.layout = Admin;

export default SubTask;
