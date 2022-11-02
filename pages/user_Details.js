import React,{ useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { makeStyles } from "@material-ui/core/styles";

import { IoMdEye , IoMdEyeOff , IoMdArrowDropdown } from "react-icons/io";
import { FiEdit } from 'react-icons/fi'
import { FaEye } from 'react-icons/fa'

// layout for this page
import Modules from "../layouts/Modules";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
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
// import styles from "assets/jss/nextjs-material-dashboard/components/tableStyle.js";
import axios from "axios";
import Popup from "reactjs-popup";
import { server } from 'config';
import { ToastContainer, toast } from 'react-toastify';
import { useForm, Controller  } from 'react-hook-form';
import PhoneInput from 'react-phone-number-input'
import bcrypt from 'bcryptjs'
import Multiselect from "multiselect-react-dropdown";
import { useCookies } from "react-cookie";

export async function getServerSideProps(context){
  const res = await fetch(`${server}/api/admin`)
  const UserDetail = await res.json()
  //console.log(UserDetail);
  const response = await fetch(`${server}/api/user/user_department`);
  const user_Department = await response.json();

  return{ props: {UserDetail, user_Department} }
} 
const styles = {
  link: {
    border: "1px solid #000000",
    color: "#000000",
    padding: "5px 10px",
  },
  close: {
    marginLeft: "auto",
    fontSize: "40px",
    paddingRight: "15px",
    cursor: "pointer",
  },
}
function UserDetail({UserDetail, user_Department}) {
  // console.log(UserDetail);
  const { register,  watch, handleSubmit, formState: { errors }, setValue, control } = useForm({mode: "onBlur"});
  const [cookies, setCookie] = useCookies(['name']);

  // redirect page if cookies is not set
  useEffect(() => {
    if(!cookies.name){
      router.push(`${server}/login`);
    }else if(cookies.Role_id != "1"){
      router.push(`${server}/dashboard`);
    }
  });

  //Status Active
  // const [value, setvalue] = useState('Active');
  
  //Delete User
  const deleteUser = async(id, status) =>{
    console.log(status)

    if(status=='Active'){
      var result = 'Inactive'
    }
    else if(status=='Inactive'){
      var result = 'Active'
    }

    let delUser = await axios.put(`${server}/api/admin/${id}`,{status:result})
    router.push(`${server}/user_Details`);
  }

  // const onSubmit = async(data) =>{
  //   //console.log(data);
  // }
  const router = useRouter();
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  // user will be redirected to their dashboard
  if(cookies.Role_id==2 || cookies.Role_id==""){
    router.push(`${server}/dashboard`);
  }else if(cookies == ""){
    // redirected to login page if you are not logged in
    router.push(`${server}/login`);
  }

  //Update API Start
  const [userdata, setuserdata] = useState({
    role_id:"",
    username: "",
    password: "",
    email: "",
    mobile_no: "",
    department: "",
    position: "",
    status: "",
    role: ""
  });

  const [selected, setSelected] = useState("");

  let role_id_type = userdata.role_id;
  const role_id = ["1","2","3"]

  if(selected.role == 'Admin'){
    role_id_type = role_id[0];
  }
  else if(selected.role == 'User'){
    role_id_type = role_id[1];
  }
  else if(selected.role == 'Super User'){
    role_id_type = role_id[2];
  }
  console.log(role_id_type)
  
  const [SingleUser, setSingleUser]=useState([])
  const getSingleUserData = async (id)=>{
    const res = await fetch(`${server}/api/admin/${id}`)
    const data = await res.json()
    setSingleUser(data[0])

    const department = [];
    department.push( {'label': data[0].department, 'value': data[0].department} );
    setProject(department);

    const designation = [];
    designation.push( {'label': data[0].position, 'value': data[0].position} );
    set_uDesignation(designation);
  }

  useEffect(()=>{
    setuserdata(SingleUser);
  },[SingleUser])
  
  const handleChange = ({ target: { name, value } }) =>{
    setuserdata({ ...userdata, [name]: value });
    setSelected({ ...selected, [name]: value });
  }

  //Password Hide & Show Toggle
  const [pwd, setPwd] = useState('');
  const [isRevealPwd, setIsRevealPwd] = useState(false);

  if(userdata.length != 0){

    if(userdata.department != ""){
      const department = [];
      department.push( {'label': userdata.department, 'value': userdata.department} );
      // setProject(department);
    }
    // console.log(department);
  }

    // store department value
    const [u_Department, setDepartment] = useState([]);
    // get selected department
    const [p_selected, setProject] = useState([]);
    useEffect(() =>{
        const u_data = async() =>{
      
          const getDepartment = [];    
          user_Department.map((department)=>{
            getDepartment.push( {'label': department.department_name , 'value': department.department_name} );
          });
          setDepartment(getDepartment);
        }
        u_data();
      },[]);
  
    // get user designation options from selected department
    const [u_Designation, setDesignation] = useState([]);
    // set designation for user
    const [user_Designation, set_uDesignation] = useState([]);
  
    // set department and get designation options from selected dropdown
    const handleSelect = async(data) => {
        setProject(data);
        // fetch designation from selected department
        const designation = await axios.post(`${server}/api/user/user_designation`, { department: data });
        const d_Designation = designation.data;
        console.log(d_Designation);
  
        const getDesignation = [];    
        d_Designation.map((department)=>{
            getDesignation.push( {'label': department.designation_name , 'value': department.designation_name} );
        });
        setDesignation(getDesignation);
    }

  //Update User API
  const toastId = React.useRef(null);
  const UpdateUser = async (id) =>{

    if( userdata.username == "" || userdata.password == "" || userdata.email == "" || userdata.mobile_no == "" || p_selected == "" || user_Designation == "" || userdata.status == "" || userdata.role == "" ){
      if(! toast.isActive(toastId.current)){
        toastId.current = toast.error('Please fill all the required fields', {
            position: "top-right",
            autoClose:5000,
            theme: "colored",
            closeOnClick: true,
            hideProgressBar: true,
          });
        }
    }
    else{
      // let data = await axios.put(`${server}/api/admin/${id}`, userdata);
      let data = await axios.put(`${server}/api/admin/${id}`, {
        role_id:role_id_type , username:userdata.username, password:userdata.password, email:userdata.email, mobile_no:userdata.mobile_no, department:p_selected[0].value, position:user_Designation[0].value, status:userdata.status, role:userdata.role
      });
      console.log(data)
      console.log(userdata)

      if(!toast.isActive(toastId.current)) {
        toastId.current = toast.success('Updated Successfully ! 🎉', {
            position: "top-right",
            autoClose:1000,
            theme: "colored",
            hideProgressBar: true,
            onClose: () => router.push(`${server}/user_Details`)
            });
        }
        router.reload(`${server}/user_Details`);
    }
  }
  //Update API End

  //Add User API Start
  const [phonenum, setphonenum] = useState()
  const AddUser = async (result) =>{
    console.log(result);

    const hashedPassword = bcrypt.hashSync(result.password, 10)
    console.log(hashedPassword);
    var department = p_selected[0].value;
    var designation = user_Designation[0].value;
    console.log("result");
    console.log(department);

    let addUser = await axios.post(`${server}/api/admin/`, {
      role_id:result.role_id, username:result.name, password:hashedPassword, email:result.email, PhoneNum:result.PhoneNum, department:department, position:designation, status:result.status, role:result.role 
    })

    if(!toast.isActive(toastId.current)) {
      toastId.current = toast.success('User Created Successfully ! 🎉', {
          position: "top-right",
          autoClose:1000,
          theme: "colored",
          hideProgressBar: true,
          });
      }
      router.reload(`${server}/user_Details`);
  }
  //Add User API End
  return (
    <>
    <div>
      {/*Users Details List Start*/}
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className="text">User Details</h4>
              <Popup trigger={<Button color="primary" className="add_new_user">+ Add New User</Button>} className="popupReact" modal>
              {close => (
                <div>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <form onSubmit={handleSubmit(AddUser)}  method="POST" >
                        <Card>
                          <CardHeader color="primary">
                            <GridContainer>
                              <GridItem>
                                <h4 className="text">Create New User</h4>
                              </GridItem>
                              <div className={classes.close}>
                                <a onClick={close}>&times;</a>
                              </div>
                            </GridContainer>
                          </CardHeader>
                          <CardBody><br/>

                            <GridContainer>
                              <GridItem xs={12} sm={12} md={12}>
                                <div className="form-group">
                                  <input type="text" className="form-control signup-input" placeholder="Username" {...register('name',  { required: "Please enter your Name", pattern: {value: /^[aA-zZ\s]+$/ , message: 'Only characters allow',} })} />
                                  <div className="error-msg">{errors.name && <p>{errors.name.message}</p>}</div>
                                </div> 
                                <div className="error-msg">{errors.username && <p>{errors.username.message}</p>}</div>
                              </GridItem>
                            </GridContainer><br/>

                            <GridContainer>  
                              <GridItem xs={12} sm={12} md={12}>
                                <div className="form-group">
                                  <input type="text" className="form-control signup-input" placeholder="Email" {...register('email', { required: 'Please enter your email', pattern: {value: /^[a-zA-Z0-9+_.-]+@+syndelltech+.+[A-z]$/ , message: 'Please enter a valid email ex:email@syndelltech.in',},} )} />
                                  <div className="error-msg">{errors.email && <p>{errors.email.message}</p>}</div>
                                </div> 
                              </GridItem>
                            </GridContainer><br/>

                            <GridContainer>
                              <GridItem xs={12} sm={12} md={12}>
                                <div className="form-group">
                                  <input type="password" className="form-control signup-input" placeholder="Password" {...register('password', { required: "You must specify a password",minLength: {value: 8, message: "Password must have at least 8 characters" }, pattern: {value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, message: 'must include lower, upper, number, and special chars',} })}  />
                                  <div className="error-msg">{errors.password && <p>{errors.password.message}</p>}</div>
                                </div> 
                              </GridItem>
                            </GridContainer><br/>

                            <GridContainer>
                              <GridItem xs={12} sm={12} md={12}>
                                <div className="form-group">
                                  <Controller
                                    name="PhoneNum"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { onChange, value } }) => (
                                    <PhoneInput
                                      className="form-control signup-input"
                                      {...register('PhoneNum',  { required: "Please enter your phone number", message: 'Only Numbers allow', })} 
                                      defaultCountry={"IN"}
                                      maxLength={11}
                                      placeholder="Phone Number"
                                      value={phonenum}
                                      onChange={setphonenum}
                                    />
                                    )}
                                  />
                                </div> 
                              </GridItem>
                            </GridContainer><br/>

                            <GridContainer>
                              <GridItem xs={12} sm={12} md={12}>
                                <div className="form-group">
                                <Multiselect
                                    displayValue="value"
                                    options={u_Department}
                                    value={p_selected}
                                    selectionLimit="1"
                                    onChange={handleSelect}
                                    onRemove={handleSelect}
                                    onSearch={function noRefCheck(){}}
                                    onSelect={handleSelect}
                                    placeholder="Select User Department"
                                    showArrow={true}
                                />

                                  <div className="error-msg">{errors.department && <p>{errors.department.message}</p>}</div>
                                </div> 
                              </GridItem>
                            </GridContainer><br/>
                            
                            <GridContainer>
                              <GridItem xs={12} sm={12} md={12}>
                                <div className="form-group">
                                <Multiselect
                                    displayValue="value"
                                    options={u_Designation}
                                    value={user_Designation}
                                    selectionLimit="1"
                                    onChange={set_uDesignation}
                                    onRemove={set_uDesignation}
                                    onSearch={function noRefCheck(){}}
                                    onSelect={set_uDesignation}
                                    placeholder="User Designation"
                                    showArrow={true}
                                />

                                  <div className="error-msg">{errors.position && <p>{errors.position.message}</p>}</div>
                                </div>
                              </GridItem>
                            </GridContainer><br/>

                            <GridContainer>
                              <GridItem xs={12} sm={12} md={12}>
                                <div className="form-group">
                                  <select name="Status" id="Status" className="form-control signup-input" {...register('status', {required:true ,message:'Please select atleast one option', })}>
                                    <option value="Select..." disabled selected>Select Your Status...</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                  </select>
                                  <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                                  <div className="error-msg">{errors.status && <p>{errors.status.message}</p>}</div>
                                </div><br/> 
                              </GridItem>
                            
                              <GridItem xs={12} sm={12} md={12}>
                                <div className="form-group">
                                  <select name="Role" id="Role" className="form-control signup-input" {...register('role', {required:true ,message:'Please select atleast one option', })}>
                                    <option value="Select..." disabled selected>Select Your Role...</option>
                                    <option value="User">User</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Super User">Super User</option>
                                  </select>
                                  <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                                  <div className="error-msg">{errors.role && <p>{errors.role.message}</p>}</div>
                                </div> 
                              </GridItem>
                            </GridContainer><br/>
                          </CardBody>

                          <CardFooter>
                            <Button color="primary" type="submit" >Add User</Button>
                          </CardFooter>

                        </Card>
                      </form>
                    </GridItem>
                  </GridContainer>
                </div>
              )}
              </Popup>
            </CardHeader>
              <CardBody>
              <div className={classes.tableResponsive}>
                <Table className={classes.table}>
                  <TableHead className={classes.TableHeader}>
                    <TableRow className={classes.tableHeadRow}>
                      <TableCell>ID</TableCell>
                      <TableCell>Username</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Mobile No</TableCell>
                      <TableCell>Department</TableCell>
                      <TableCell>Position</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {UserDetail.map((user)=>{
                    return(
                      <TableRow key={user.id} className={classes.tableHeadRow}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.mobile_no}</TableCell>
                        <TableCell>{user.department}</TableCell>
                        <TableCell>{user.position}</TableCell>
                        <TableCell>
                        <div>
                          <label className="switch">
                            <a>
                              <input type="checkbox" name="status" value={user.status} defaultChecked={user.status == 'Active'}  onClick={()=>deleteUser(user.id, user.status)} />
                              <span className="slider round" ></span>
                            </a> 
                          </label>
                        </div>
                        </TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                          {/* <a href={`/admin/userdetail/${user.id}`}><FiEdit/></a>&nbsp;&nbsp;&nbsp; */}
                          {/*Edit user Detail Start*/}
                          <Popup trigger={<div><a onClick={()=>{getSingleUserData(user.id)}}><FiEdit/></a></div>} className="popupReact" modal>
                            {close => (
                              <div>
                                <GridContainer>
                                  <GridItem xs={12} sm={12} md={12}>
                                    <form onSubmit={handleSubmit(UpdateUser)} method="POST" className="update_userdata">
                                    <Card>
                                      <CardHeader color="primary">
                                      <GridContainer>
                                        <GridItem>
                                          <h4 className="Updatedetails">Update User Detail</h4>
                                        </GridItem>
                                          <div className={classes.close}>
                                            <a onClick={close}>&times;</a>
                                          </div>
                                      </GridContainer>
                                      </CardHeader>
                                      <CardBody><br/>

                                        <GridContainer>
                                          <GridItem xs={12} sm={12} md={12}>
                                            <div className="form-group">
                                              <input type="text" className="form-control signup-input" name="username" placeholder="Enter your name" value={userdata.username} onChange={handleChange} />
                                            </div> 
                                          </GridItem>
                                        </GridContainer><br/>

                                        <GridContainer>  
                                          <GridItem xs={12} sm={12} md={12}>
                                            <div className="form-group">
                                              <input type="text" className="form-control signup-input" name="email" placeholder="Enter your email" value={userdata.email} onChange={handleChange} autoComplete="off"  />
                                            </div> 
                                          </GridItem>
                                        </GridContainer><br/>

                                        {/* <GridContainer>
                                          <GridItem xs={12} sm={12} md={12}>
                                            <div className="form-group">
                                              <input type={isRevealPwd ? 'text' : 'password'} className="form-control signup-input" name="password" placeholder="Enter your password" value={userdata.password} onChange={handleChange} autoComplete="off"  />
                                              <span className='icon-eyes' onClick={() => setIsRevealPwd((prevState) => !prevState)} >{isRevealPwd ? <IoMdEyeOff /> : <IoMdEye/>}</span>
                                            </div> 
                                          </GridItem>
                                        </GridContainer><br/> */}

                                        <GridContainer>
                                          <GridItem xs={12} sm={12} md={6}>
                                            <div className="form-group">
                                              <input type="text" className="form-control signup-input" name="mobile_no" placeholder="Enter your Mobile number" value={userdata.mobile_no} onChange={handleChange} autoComplete="off"  />
                                            </div> 
                                          </GridItem>

                                          <GridItem xs={12} sm={12} md={6}>
                                          <Multiselect
                                              displayValue="value"
                                              options={u_Department}
                                              value={p_selected}
                                              selectedValues={p_selected}
                                              selectionLimit="1"
                                              onChange={handleSelect}
                                              onRemove={handleSelect}
                                              onSearch={function noRefCheck(){}}
                                              onSelect={handleSelect}
                                              placeholder="Select User Department"
                                              showArrow={true}
                                          />
                                          </GridItem>
                                        </GridContainer><br/>

                                        <GridContainer>
                                          <GridItem xs={12} sm={12} md={12}>
                                            <div className="form-group">
                                            <Multiselect
                                                displayValue="value"
                                                options={u_Designation}
                                                value={user_Designation}
                                                selectedValues={user_Designation}
                                                selectionLimit="1"
                                                onChange={set_uDesignation}
                                                onRemove={set_uDesignation}
                                                onSearch={function noRefCheck(){}}
                                                onSelect={set_uDesignation}
                                                placeholder="User Designation"
                                                showArrow={true}
                                            />
                                            </div> 
                                          </GridItem>
                                        </GridContainer><br/>

                                        <GridContainer>
                                          <GridItem xs={12} sm={12} md={6}>
                                            <div className="form-group">
                                              <select name="status" id="Status" className="form-control signup-input"  value={userdata.status} onChange={handleChange} autoComplete="off"   >
                                                <option value="" disabled selected>Enter your status</option>
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                              </select>
                                              <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                                            </div> 
                                          </GridItem>

                                          <GridItem xs={12} sm={12} md={6}>
                                            <div className="form-group">
                                              <select name="role" id="Role" className="form-control signup-input" value={userdata.role}  onChange={handleChange} autoComplete="off" >
                                                <option value="" disabled selected >Enter your role</option>
                                                <option value="User">User</option>
                                                <option value="Admin">Admin</option>
                                                <option value="Super User">Super User</option>
                                              </select>
                                              <span className='icon-eyes adduser-dropdown'><IoMdArrowDropdown /></span>
                                            </div> 
                                          </GridItem>

                                          <GridItem xs={12} sm={12} md={6}>
                                            <div className="form-group">
                                              <input type="hidden" className="form-control signup-input" name="role_id" value={role_id_type} onChange={handleChange} />
                                            </div> 
                                          </GridItem>
                                          
                                        </GridContainer><br/>

                                      </CardBody>
                                      <CardFooter>
                                        <Button color="primary" type="submit" onClick={()=>{UpdateUser(user.id, user.status)}}>Update User</Button>
                                      </CardFooter>
                                    </Card>
                                    </form>
                                  </GridItem>
                                </GridContainer>
                              </div>
                            )}
                          </Popup>
                          {/*Edit user Detail End*/}
                          {/* <a href={`/admin/viewuser/${user.id}`}><FaEye/></a> */}
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
      <ToastContainer limit={1}/>
      {/*Users Details List End*/}
    </div>
    </>
  );
}

UserDetail.layout = Modules;

export default UserDetail;
