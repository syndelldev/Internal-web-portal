import { makeStyles } from "@material-ui/core/styles";
import { IoMdArrowDropdown } from "react-icons/io";

import Admin from "layouts/Admin.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

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

function UserRights(){
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    return(
        <>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>User Details</h4>
                        </CardHeader><br/><br/>
                        <CardBody>
                            <GridItem xs={12} sm={12} md={6}>
                                <div className="form-group">
                                    <select name="department" id="Department" className="form-control signup-input" >
                                        <option value="" ></option>
                                        <option value="Admin">Admin</option>
                                        <option value="User">User</option>
                                    </select>
                                    <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                                </div> 
                            </GridItem><br/><br/>
                            <div className={classes.tableResponsive}>
                                <Table className={classes.table}>
                                    <TableHead className={classes.TableHeader}>
                                        <TableRow className={classes.tableHeadRow}>
                                            <TableCell>Role</TableCell>
                                            <TableCell>User List</TableCell>
                                            <TableCell>Add User</TableCell>
                                            <TableCell>Edit User</TableCell>
                                            <TableCell>Delete User</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow className={classes.tableHeadRow}>
                                            <TableCell>Admin</TableCell>
                                            <TableCell>
                                                <input type="checkbox" id="" name="" value=""/>
                                            </TableCell>
                                            <TableCell>
                                                <input type="checkbox" id="" name="" value=""/>
                                            </TableCell>
                                            <TableCell>
                                                <input type="checkbox" id="" name="" value=""/>
                                            </TableCell>
                                            <TableCell>
                                                <input type="checkbox" id="" name="" value=""/>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow className={classes.tableHeadRow}>
                                            <TableCell>User</TableCell>
                                            <TableCell>
                                                <input type="checkbox" id="" name="" value=""/>
                                            </TableCell>
                                            <TableCell>
                                                <input type="checkbox" id="" name="" value=""/>
                                            </TableCell>
                                            <TableCell>
                                                <input type="checkbox" id="" name="" value=""/>
                                            </TableCell>
                                            <TableCell>
                                                <input type="checkbox" id="" name="" value=""/>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </>
    )
}

UserRights.layout = Admin;

export default UserRights;