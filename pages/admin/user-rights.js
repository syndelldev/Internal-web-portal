import { makeStyles } from "@material-ui/core/styles";
import { IoMdArrowDropdown } from "react-icons/io";
import { useState,useEffect } from "react";

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

export async function getServerSideProps(context){
    const res = await fetch(`${server}/api/rights`)
    const rights = await res.json()
    
  
    return{ props: {rights} }
} 

function UserRights({rights}){
    const useStyles = makeStyles(styles);
    const classes = useStyles();

    const [query, setQuery] = useState();
    useEffect(() => {
        query && console.log("fetch", `${server}/api/rights/${query}`);

    }, [query]);

    const AdminRights = async () => {
        const req = await fetch(`http://localhost:3000/api/rights/1`);
        const admin = await req.json();
        console.log(admin)
        //return { data: data.results };
    };

    const UserRights = async () => {
        const req = await fetch(`http://localhost:3000/api/rights/2`);
        const user = await req.json();
        console.log(user)
        //return { data: data.results };
    };

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
                                <DropdownButton id="dropdown-item-button" title="API Links"  onSelect={setQuery}>
                                    <Dropdown.Item as="button" eventKey="1" onClick={AdminRights}>Admin</Dropdown.Item>
                                    <Dropdown.Item as="button" eventKey="2" onClick={UserRights}>User</Dropdown.Item>
                                </DropdownButton>
                                    {/*<select name="department" id="Department" className="form-control signup-input" onClick={AdminRights}  >
                                        <option value="Admin">Admin</option>
                                        <option value="User" >User</option>
                                    </select>
                                    <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>*/}
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
                                        rights.map((rights)=>{
                                            return(
                                                <TableRow key={rights.id}>
                                                    <TableCell>{rights.id}</TableCell>
                                                    <TableCell>
                                                        <input type="checkbox"  value={rights.user_list} defaultChecked={rights.user_list === '1'} />{rights.user_list}
                                                    </TableCell>
                                                    <TableCell>
                                                        <input type="checkbox"  value={rights.add_user} defaultChecked={rights.add_user === '1'} />{rights.add_user}
                                                    </TableCell>
                                                    <TableCell>
                                                        <input type="checkbox"  value={rights.edit_user} defaultChecked={rights.edit_user === '1'} />{rights.edit_user}
                                                    </TableCell>
                                                    <TableCell>
                                                        <input type="checkbox"  value={rights.delete_user} defaultChecked={rights.delete_user === '1'} />{rights.delete_user}
                                                    </TableCell>
                                                </TableRow>
                                                
                                            )
                                        })
                                    }
                                        {/*<TableRow className={classes.tableHeadRow}>
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
                                        </TableRow>*/}
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