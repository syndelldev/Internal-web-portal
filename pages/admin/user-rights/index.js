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
    const UserList = await res.json()

    const responce = await fetch(`${server}/api/rights/module`)
    const ModuleList = await responce.json()

    return{ props: {UserList,ModuleList} }
} 

function UserRights({UserList,ModuleList}){
    console.log(UserList)
    console.log(ModuleList)
    const useStyles = makeStyles(styles);
    const classes = useStyles();

    const [user, setuser] = useState(1)
    console.log(user)

    const [module, setmodule] = useState(1)
    console.log(module)

    // const logValue =() =>{
    //     //console.log(value)
    // }
    // const [users, setusers] = useState([])

    // const [users, setusers] = useState([])
    // useEffect(async()=>{
    //     axios.get(`${server}/api/rights`,{userid:user,moduleid:module})
    //     .then((res)=>{
    //         setusers(res.data)
    //         console.log(res.data)
    //     })
    // },[])
    //console.log(users)
   
    
    return(
        <>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>User Rights</h4>
                        </CardHeader><br/><br/>
                        <CardBody>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={6}>
                                <div className="form-group">
                                    <select value={user} onChange={(e) => {setuser(e.target.value)}} className="form-control signup-input" > {/*value={value} onChange={(e) => {setValue(e.target.value)}} onClick={logValue}*/}
                                        {
                                            UserList.map((users)=>{
                                                return(
                                                    <>
                                                        <option key={users.id} value={users.id}>{users.username}</option> 
                                                    </>      
                                                )
                                            })
                                        }
                                    </select>
                                    <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                                </div> 
                            </GridItem>

                            <GridItem xs={12} sm={12} md={6}>
                                <div className="form-group">
                                    <select value={module} onChange={(e) => {setmodule(e.target.value)}} className="form-control signup-input" >
                                        {
                                            ModuleList.map((module)=>{
                                                return(
                                                    <>
                                                        <option key={module.module_id} value={module.module_id}>{module.module_name}</option> 
                                                    </>      
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                            </GridItem>
                        </GridContainer><br/><br/>

                            <div className={classes.tableResponsive}>
                                <Table className={classes.table}>
                                    <TableHead className={classes.TableHeader}>
                                        <TableRow className={classes.tableHeadRow}>
                                            <TableCell>Modules Names</TableCell>
                                            <TableCell>Show List</TableCell>
                                            <TableCell>Add Rights</TableCell>
                                            <TableCell>Edit Rights</TableCell>
                                            <TableCell>Delete Rights</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    
                                    <TableBody>
                                    
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