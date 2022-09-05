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

export async function getServerSideProps(context){
    //const id = context.params.userdetailid;
    const res = await fetch(`${server}/api/rights/`)
    const data = await res.json()
    console.log(data)

    return { props: {data}, }
}
function UserRights({data}){
    //console.log(data)
    const useStyles = makeStyles(styles);
    const classes = useStyles();

    const [value, setValue] = useState(1)
    const [users, setusers] = useState([])
    const logValue =() =>{
        //console.log(value)
    }
    useEffect(async()=>{
        axios.get(`${server}/api/rights/${value}`)
        .then((res)=>{
            setusers(res.data)
            //console.log(res.data)
        })
    },[value])
    console.log(value)
    console.log(users)

    const [checklist, setchecklist] = useState('1')
    const rightlist = async() =>{
        /*if(checklist=='1'){
            setchecklist('0')
        }
        else if(checklist=='0'){
            setchecklist('1')
        }*/
        let checkbox = await axios.put(`${server}/api/rights/${value}`,{checkvalue:checklist}) 
        console.log(checkbox)
    }

    const [checkaddlist, setcheckaddlist] = useState('1')
    const addlist = async() => {
        /*if(checkaddlist=='1'){
            setcheckaddlist('0')
        }
        else if(checkaddlist=='0'){
            setcheckaddlist('1')
        }*/
        let checkbox2 = await axios.put(`${server}/api/rights/${value}`,{addlist_checkvalue:checkaddlist}) 
        console.log(checkbox2)
    }

    const [editchecklist, seteditchecklist] = useState('1')
    const editlist = async() => {
        /*if(editchecklist=='1'){
            seteditchecklist('0')
        }
        else if(editchecklist=='0'){
            seteditchecklist('1')
        }*/
        let checkbox3 = await axios.put(`${server}/api/rights/${value}`,{edit_checkvalue:editchecklist}) 
        console.log(checkbox3)
    }

    const [delcheck, setdelcheck] = useState('1')
    const deletelist = async() => {
        /*if(delcheck=='1'){
            setdelcheck('0')
        }
        else if(delcheck=='0'){
            setdelcheck('1')
        }*/
        let checkbox4 = await axios.put(`${server}/api/rights/${value}`,{delete_checkvalue:delcheck}) 
        console.log(checkbox4)
    }
   
    
    return(
        <>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>User Rights</h4>
                        </CardHeader><br/><br/>
                        <CardBody>
                            <GridItem xs={12} sm={12} md={6}>
                                <div className="form-group">
                                {/*<DropdownButton id="dropdown-item-button" title="API Links" onSelect={setQuery} >
                                    <Dropdown.Item as="button" eventKey="1" >Admin</Dropdown.Item>
                                    <Dropdown.Item as="button" eventKey="2" >User</Dropdown.Item>
                                </DropdownButton>*/}
                                <select value={value} onChange={(e) => {setValue(e.target.value)}} onClick={logValue} className="form-control signup-input" >
                                    {
                                        data.map((users)=>{
                                            return(
                                                <>
                                                    <option key={users.role_id} value={users.role_id}>{users.role}</option> 
                                                </>      
                                            )
                                        })
                                    }
                                </select>
                                <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                                </div> 
                            </GridItem><br/><br/>
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
                                    {
                                        users.map((rights)=>{
                                            return(
                                                <TableRow key={rights.id}>
                                                    <TableCell>{rights.page_id}-{rights.role}</TableCell>
                                                    <TableCell>
                                                        <input type="checkbox"  onChange={()=>setchecklist(!checklist)} onClick={rightlist} />{/*{rights.user_list}*/}
                                                        {/*<p> {checklist ? '1' : '0'} </p> */}
                                                    </TableCell>
                                                    <TableCell>
                                                        <input type="checkbox" onChange={()=>setcheckaddlist(!checkaddlist)} onClick={()=>addlist()} />{/*{rights.add_user}*/}
                                                    </TableCell>
                                                    <TableCell>
                                                        <input type="checkbox" onChange={()=>seteditchecklist(!editchecklist)} onClick={()=>editlist()} />{/*{rights.edit_user}*/}
                                                    </TableCell>
                                                    <TableCell>
                                                        <input type="checkbox" onChange={()=>setdelcheck(!delcheck)} onClick={()=>deletelist()} />{/*{rights.delete_user}*/}
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