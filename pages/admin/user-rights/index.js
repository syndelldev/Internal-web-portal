import { makeStyles } from "@material-ui/core/styles";
import { IoMdArrowDropdown } from "react-icons/io";
import React,{ useState,useEffect } from "react";

import Admin from "layouts/Admin.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import axios from "axios";
import { server } from 'config';

import { DropdownButton, Dropdown } from "react-bootstrap";

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

function UserRights({rights}){
    const useStyles = makeStyles(styles);
    const classes = useStyles();

    const [query, setQuery] = useState(1);
    const [admin,setadmin] =  useState([])

    useEffect(()=>{
        console.log(query);
        axios.get(`${server}/api/rights/${query}`)
        .then((res) =>{
            setadmin(res.data);
            //console.log(res.data);
        })
    },[query])
    console.log(admin) 
    
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
                                <DropdownButton id="dropdown-item-button" title="API Links" onSelect={setQuery} >
                                    <Dropdown.Item as="button" eventKey="1" >Admin</Dropdown.Item>
                                    <Dropdown.Item as="button" eventKey="2" >User</Dropdown.Item>
                                </DropdownButton>
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
                                    {
                                        admin.map((rights)=>{
                                            return(
                                                <TableRow key={rights.id}>
                                                    <TableCell>{rights.role}</TableCell>
                                                    <TableCell>
                                                        <input type="checkbox"  value={rights.user_list} defaultChecked={rights.user_list === '1'} />
                                                    </TableCell>
                                                    <TableCell>
                                                        <input type="checkbox"  value={rights.add_user} defaultChecked={rights.add_user === '1'} />
                                                    </TableCell>
                                                    <TableCell>
                                                        <input type="checkbox"  value={rights.edit_user} defaultChecked={rights.edit_user === '1'} />
                                                    </TableCell>
                                                    <TableCell>
                                                        <input type="checkbox"  value={rights.delete_user} defaultChecked={rights.delete_user === '1'} />
                                                    </TableCell>
                                                </TableRow>    
                                            )
                                        })
                                    }
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