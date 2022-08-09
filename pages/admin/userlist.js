import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import styles from "assets/jss/nextjs-material-dashboard/components/tableStyle.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";


export async function getServerSideProps(content){
    const res = await fetch(`http://localhost:3000/api/admin`)
    const userlist = await res.json()
    console.log(userlist);
  
    return{ props: {userlist} }
}  

export default function UserList({ userlist }) {
    console.log(userlist);

    const useStyles = makeStyles(styles);
    const classes = useStyles();
    //const { tableHead, tableData, tableHeaderColor } = props;
    return (
        <>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Simple Table</h4>
                            <p className={classes.cardCategoryWhite}>Here is a subtitle for this table</p>
                        </CardHeader>
                        <CardBody>
                            <div className={classes.tableResponsive}>
                                <Table className={classes.table}>
                                    <TableHead className={classes.TableHeader}>
                                        <TableRow className={classes.tableHeadRow}>
                                            <TableCell>ID</TableCell>
                                            <TableCell>Username</TableCell>
                                            <TableCell>Role</TableCell>
                                            <TableCell>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {userlist.map((user)=>{
                                            return(
                                                <TableRow key={user.id} className={classes.tableHeadRow}>
                                                    <TableCell>{user.id}</TableCell>
                                                    <TableCell>{user.username}</TableCell>
                                                    <TableCell>{user.role}</TableCell>
                                                    <TableCell>
                                                        <a href="#">view</a>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </>
    );
}




