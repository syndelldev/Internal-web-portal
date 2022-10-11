import React, { useState } from "react";
import { useRouter } from 'next/router'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import { FiEdit } from 'react-icons/fi'
import { FaEye } from 'react-icons/fa'

import InputLabel from "@material-ui/core/InputLabel";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import styles from "assets/jss/nextjs-material-dashboard/components/tableStyle.js";

import Search from "@material-ui/icons/Search";

import avatar from "assets/img/faces/marc.jpg";
import axios from "axios";

import { server } from 'config';

export async function getServerSideProps(context){
  const res = await fetch(`${server}/api/admin`)
  const UserDetail = await res.json()
  //console.log(UserDetail);

  return{ props: {UserDetail} }
} 

function UserDetail({UserDetail}) {
  console.log(UserDetail);

  //Search Filter
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
        const filteredData = UserDetail.filter((item) => {
            return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
        })
        setFilteredResults(filteredData)
    }
    else{
        setFilteredResults(UserDetail)
    }
  }
  console.log(filteredResults)
  //Status Active
  const [value, setvalue] = useState('Active');

  const toggleChange = () => {
    // if(value==='Active'){
    //   setvalue('Deactive')
    // }
    // else if(value==='Deactive'){
    //   setvalue('Active')
    // }
  }
  //Delete User
  const deleteUser = async(id) =>{

    let delUser = await axios.put(`${server}/api/admin/${id}`,{status:value})
    router.push("/admin/userdetail");
  
    //console.log(delUser);
    console.log(value)

    if(value==='Active'){
      setvalue('Deactive')
    }
    else if(value==='Deactive'){
      setvalue('Active')
    }
   

  }

  const onSubmit = async(data) =>{
    //console.log(data);
  }
  const router = useRouter();
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  
  return (
    <>
        {/* <Button color="primary"  className="add_new_user"><a href='/admin/adduser'  className="add_new_user"> + Add New User</a></Button> */}
    <div>
      
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <div className="userdetail_searchbar">
             
              <div>
              {/*<div className="MuiInputBase-root MuiInput-root makeStyles-marginTop-212 MuiInput-underline makeStyles-underline-205 MuiInputBase-formControl MuiInput-formControl">
                <input type="text" placeholder="Search User Detail" className="MuiInputBase-input MuiInput-input"  onChange={(e) => searchItems(e.target.value)} />
              </div>
              <Button color="white" aria-label="edit" justIcon round>
                <Search />
              </Button>*/}
              </div>
          </div>
       
          <Card>
            <CardHeader color="primary">
              <h4 className="text">User Details<Button color="primary"  className="add_new_user"><a href='/admin/adduser'  className="add_new_user"> + Add New User</a></Button>
              </h4>
            </CardHeader>
            <CardBody>
            <div className={classes.tableResponsive}>
              <Table className={classes.table}>
                <TableHead className={classes.TableHeader}>
                  <TableRow className={classes.tableHeadRow}>
                    <TableCell>ID</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Password</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Mobile No</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell>Position</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
              {/*}  {searchInput.length > 1 ? (
                <TableBody>
                {filteredResults.map((user)=>{
                  return(
                    <TableRow key={user.id} className={classes.tableHeadRow}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.password}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.mobile_no}</TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>{user.position}</TableCell>
                      <TableCell>
                      <div>
                        <label className="switch">
                          <a>
                            <input type="checkbox" name="status" value={user.status} defaultChecked={user.status === 'Active'}  onClick={()=>deleteUser(user.id)} />
                            <span className="slider round" ></span>
                          </a> 
                        </label>
                      </div>
                        
                      
                      </TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.dob}</TableCell>
                      <TableCell>
                        <a href={`/admin/userdetail/${user.id}`}><FiEdit/></a>&nbsp;&nbsp;&nbsp;
                        
                        <a href={`/admin/viewuser/${user.id}`}><FaEye/></a>
                      </TableCell>
                    </TableRow>
                  )
                })}
                </TableBody>
                ) : ( */}
                <TableBody>
                {UserDetail.map((user)=>{
                  return(
                    <TableRow key={user.id} className={classes.tableHeadRow}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.password}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.mobile_no}</TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>{user.position}</TableCell>
                      <TableCell>
                      <div>
                        <label className="switch">
                          <a>
                            <input type="checkbox" name="status" value={user.status} defaultChecked={user.status === 'Active'}  onClick={()=>deleteUser(user.id)} />
                            <span className="slider round" ></span>
                          </a> 
                        </label>
                      </div>
                        {/*<label className="switch">
                          <a href={`/admin/userdetail/`} onClick={()=>deleteUser(user.id)} >
                            <input type="checkbox" value={user.status} defaultChecked={user.status === 'Active'  } onChange={toggleChange} />
                            <span className="slider round" > 
                          </span>
                          </a>
                        </label>*/}
                      
                      </TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <a href={`/admin/userdetail/${user.id}`}><FiEdit/></a>&nbsp;&nbsp;&nbsp;
                        {/*<a href={`/admin/userdetail/`} onClick={()=>deleteUser(user.id)}>Delete</a>&nbsp;&nbsp;&nbsp;*/}
                        <a href={`/admin/viewuser/${user.id}`}><FaEye/></a>
                      </TableCell>
                    </TableRow>
                  )
                })}
                </TableBody>
              {/*}  )}*/}
              </Table>
            </div>
          </CardBody>
        </Card>
      </GridItem>
      

        {/*<GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Company (disabled)"
                    id="company-disabled"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Username"
                    id="username"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Email address"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="First Name"
                    id="first-name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Last Name"
                    id="last-name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="City"
                    id="city"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Country"
                    id="country"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Postal Code"
                    id="postal-code"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel style={{ color: "#AAAAAA" }}>About me</InputLabel>
                  <CustomInput
                    labelText="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                    id="about-me"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5,
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary">Update Profile</Button>
            </CardFooter>
          </Card>
        </GridItem>
        {/*<GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
              <h4 className={classes.cardTitle}>Alec Thompson</h4>
              <p className={classes.description}>
                Don{"'"}t be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p>
              <Button color="primary" round>
                Follow
              </Button>
            </CardBody>
          </Card>
        </GridItem>*/}
      </GridContainer>
    </div>
    </>
  );
}

UserDetail.layout = Admin;

export default UserDetail;
