import Modules from "../layouts/Modules";
import { makeStyles } from "@material-ui/core/styles";
import React,{ useState,useEffect } from "react";
import { useRouter } from 'next/router';
import { IoMdArrowDropdown } from "react-icons/io";

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

import axios from "axios";
import { server } from 'config';
import { useCookies } from "react-cookie";

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

export async function getServerSideProps(){
    const res = await fetch(`${server}/api/rights`)
    const UserList = await res.json()

    const responce = await fetch(`${server}/api/rights/module`)
    const ModuleList = await responce.json()

    // const rights = await fetch(`${server}/api/rights/${user}`, {userid:user,moduleid:module} )
    // const RightsList = await rights.json()
    
    return{ props: {UserList,ModuleList} }
}

function UserRights({UserList,ModuleList}){
    // console.log(UserList)
    // console.log(ModuleList)

    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const router = useRouter();
    const [cookies, setCookie] = useCookies(['name']);

  // redirect page if cookies is not set
  useEffect(() => {
        if(!cookies.name){
          router.push(`${server}/login`);
        }else if(cookies.Role_id == "2"){
          router.push(`${server}/dashboard`);
        }
    });
    
    const [user, setuser] = useState(1)
    const [module, setmodule] = useState(1)
    const changeUser = (e) => {
        setuser(e.target.value)
    }
    const changeModule = (e) => {
        setmodule(e.target.value)
    }

    const [RightsList, setRightsList] = React.useState([]);
    // console.log("RightsList",RightsList)
    useEffect(() => {
        RightsListFun()
    }, [RightsList]);


    const RightsListFun = async () =>{
        try{
            const res = await axios.post(`${server}/api/rights/${user}`, {userid:user,moduleid:module})
            setRightsList(res.data)
        }
        catch(e){
            console.log("error response", e.response);
        }
    }


    const view_rights = (project_id, view_rights) =>{
        if(view_rights==0){
            var result = 1
        }
        else if(view_rights==1){
            var result = 0
        }
        console.log("result", result)
        let data = axios.put(`${server}/api/rights/project/${project_id}`, {userid:user, moduleid:module, projectid:project_id, view:result})
        // console.log(data)
        router.reload(`${server}/user_Rights`);
    }
    const edit_rights = (project_id,edit_rights) =>{
        if(edit_rights==0){
            var result = 1
        }
        else if(edit_rights==1){
            var result = 0
        }
        console.log("result", result)
        let data = axios.put(`${server}/api/rights/project/${project_id}`, {userid:user, moduleid:module, projectid:project_id, edit:result}) 
        // console.log(data)
        router.reload(`${server}/user_Rights`);
    }
    

    return(
        <>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className="text">User Rights</h4>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={3}>
                                    <div className="form-group">
                                        <select value={user} onChange={changeUser} className="form-control signup-input">
                                            {UserList.map((UserList)=>{
                                                return(
                                                    <option key={UserList.id} value={UserList.id} >{UserList.username}</option> 
                                                )
                                            })}
                                        </select>
                                        <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                                    </div>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <div className="form-group">
                                        <select value={module} onChange={changeModule} className="form-control signup-input">
                                            {ModuleList.map((ModuleList)=>{
                                                return(
                                                    <option key={ModuleList.module_id} value={ModuleList.module_id} >{ModuleList.module_name}</option> 
                                                )
                                            })}
                                        </select>
                                        <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                                    </div>
                                </GridItem>
                            </GridContainer><br/>
                            {/* <button color="primary" onClick={RightsListFun} type="submit">Submit</button><br/><br/> */}
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
                                    {/* <form> */}
                                        {RightsList.map((rights)=>{
                                            return(
                                                <TableRow key={rights.rights_id} value={rights.rights_id}>
                                                    <TableCell>{rights.project_title}</TableCell>
                                                    <TableCell>
                                                        <input 
                                                            type="checkbox"
                                                            name="view_rights"
                                                            disabled={rights.edit_rights==1} 
                                                            value={rights.view_rights}
                                                            defaultChecked={rights.view_rights==1} 
                                                            onClick={()=>{view_rights(rights.project_id, rights.view_rights)}}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <input 
                                                            type="checkbox"
                                                            name="edit_rights" 
                                                            value={rights.edit_rights}
                                                            defaultChecked={rights.edit_rights==1} 
                                                            onClick={()=>{edit_rights(rights.project_id, rights.edit_rights)}}
                                                            // onChange={editCheckbox} 
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                     {/* </form> */}
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

UserRights.layout = Modules;
export default UserRights;