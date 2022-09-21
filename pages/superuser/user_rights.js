import { makeStyles } from "@material-ui/core/styles";
import { IoMdArrowDropdown } from "react-icons/io";
import React,{ useState,useEffect } from "react";

import SuperUser from "layouts/SuperUser.js";
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
import { useRouter } from 'next/router'
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

    // const resp = await fetch(`${server}/api/rights/rights_list`)
    // const rights_list = await resp.json()
    
    return{ props: {UserList,ModuleList} }
}

function UserRights({UserList,ModuleList}){
    const useStyles = makeStyles(styles);
    const classes = useStyles();

    const [user, setuser] = useState(1)
    // console.log(user)

    const [module, setmodule] = useState(1)
    // console.log(module)

    const [projects, setprojects] = useState([])
    const getData = () => {
        axios.post(`${server}/api/rights/${user}`, {userid:user,moduleid:module})
        .then((res)=>{
            setprojects(res.data)
        })
    }
    console.log(projects)

    const [RightList, setRightList] = useState([])
    const getRightList = () =>{
        axios.post(`${server}/api/rights/right_lists`, {userid:user})
        .then((res)=>{
            setRightList(res.data)
        })
    }
    console.log(RightList)
    var myArr = [1,2,3,4];

    return(
        <>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className="text">User Rights</h4>
                        </CardHeader><br/><br/>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={3}>
                                    <div className="form-group">
                                        <select value={user} onChange={(e) => {setuser(e.target.value)}} className="form-control signup-input" > 
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
                                <GridItem xs={12} sm={12} md={3}>
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
                            </GridContainer><br/>
                            <Button color="primary" onClick={()=>{getData();getRightList();}}  type="submit">Submit</Button><br/><br/>

                            <div className={classes.tableResponsive}>
                                <Table className={classes.table}>
                                    <TableHead className={classes.TableHeader}>
                                        <TableRow className={classes.tableHeadRow}>
                                            <TableCell>Modules Names</TableCell>
                                            <TableCell>Monitor(View)</TableCell>
                                            <TableCell>Contributor(edit)</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        
                                        {projects.map((data)=>{
                                            return(
                                                <TableRow key={data.project_id} value={data.project_id}>
                                                    <TableCell>{data.project_title}-{data.project_id}</TableCell>  
                                                          
                                                    <TableCell>
                                                        <input type="checkbox" name="view_rights" value={data.view_rights}  defaultChecked={data.view_rights==1} />
                                                    </TableCell>

                                                    <TableCell>
                                                        <input type="checkbox" name="edit_rights" value={data.edit_rights}  defaultChecked={data.edit_rights==1} /> 
                                                    </TableCell>
                                                                            
                                                </TableRow>  
                                            )
                                        })}
                                        {/* {RightList.map((rights)=>{
                                            return(
                                                <>
                                                    <TableCell>
                                                        <input type="checkbox"/>
                                                    </TableCell> 
                                                </>
                                            )
                                        })} */}

                                        {/* {
                                            myArr.forEach(function(elem){
                                                if (elem === 4) {
                                                  return;
                                                }
                                              
                                                console.log(elem);
                                              })
                                        } */}
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

UserRights.layout = SuperUser;
export default UserRights;