import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
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

import { useForm  } from 'react-hook-form';

import avatar from "assets/img/faces/marc.jpg";

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

function AddUser() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { register,  watch, handleSubmit, formState: { errors }, control } = useForm(); 
  const onSubmit = async (data) =>{
    console.log(data)
  }
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
            <form onSubmit={handleSubmit(onSubmit)}>              
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Create User Profile</h4>
                    <p className={classes.cardCategoryWhite}>Complete your profile</p>
                </CardHeader>
                <CardBody>
                  
                    <GridContainer>
                        {/*<GridItem xs={12} sm={12} md={5}>
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
                        </GridItem>*/}
                             
                        <GridItem xs={12} sm={12} md={12}>
                          <div className="form-group">
                            <input type="text" className="form-control signup-input" placeholder="Username" {...register('name',  { required: "Please enter your Name", pattern: {value: /^[aA-zZ\s]+$/ , message: 'Only characters allow',} })} />
                            <div className="error-msg">{errors.name && <p>{errors.name.message}</p>}</div>
                          </div> 
                          <div className="error-msg">{errors.username && <p>{errors.username.message}</p>}</div>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <div className="form-group">
                            <input type="password" className="form-control signup-input" placeholder="Password" {...register('password',  { required: "Please enter your password", pattern: {value: /^[aA-zZ\s]+$/ , message: 'Only characters allow',} })} />
                            <div className="error-msg">{errors.password && <p>{errors.password.message}</p>}</div>
                          </div> 
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <div className="form-group">
                            <input type="text" className="form-control signup-input" placeholder="Mobile No" {...register('mobile_num',  { required: "Please enter your Mobile Num", pattern: {value: /^[0-9]+$/ , message: 'Only characters Numbers allow',} })} />
                            <div className="error-msg">{errors.mobile_num && <p>{errors.mobile_num.message}</p>}</div>
                          </div> 
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <div className="form-group">
                            <input type="text" className="form-control signup-input" placeholder="Department" {...register('department',  { required: "Please enter your Department", pattern: {value: /^[aA-zZ\s]+$/ , message: 'Only characters allow',} })} />
                            <div className="error-msg">{errors.department && <p>{errors.department.message}</p>}</div>
                          </div> 
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <div className="form-group">
                            <input type="text" className="form-control signup-input" placeholder="Position" {...register('position',  { required: "Please enter your Position", pattern: {value: /^[aA-zZ\s]+$/ , message: 'Only characters allow',} })} />
                            <div className="error-msg">{errors.position && <p>{errors.position.message}</p>}</div>
                          </div> 
                        </GridItem>
                    </GridContainer>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                          <div className="form-group">
                            <input type="text" className="form-control signup-input" placeholder="Status" {...register('status',  { required: "Please enter your Status", pattern: {value: /^[aA-zZ\s]+$/ , message: 'Only characters allow',} })} />
                            <div className="error-msg">{errors.status && <p>{errors.status.message}</p>}</div>
                          </div> 
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <div className="form-group">
                            <input type="text" className="form-control signup-input" placeholder="Role" {...register('role',  { required: "Please enter your Role", pattern: {value: /^[aA-zZ\s]+$/ , message: 'Only characters allow',} })} />
                            <div className="error-msg">{errors.role && <p>{errors.role.message}</p>}</div>
                          </div> 
                        </GridItem>
                    </GridContainer>
                    </CardBody>
                    <CardFooter>
                        <Button color="primary" type="submit">Add User</Button>
                    </CardFooter>
                </Card>
            </form>
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
  );
}

AddUser.layout = Admin;

export default AddUser;
