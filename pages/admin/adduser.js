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
                            <CustomInput
                                labelText="Username"
                                id="username"
                                name="username"
                                formControlProps={{
                                fullWidth: true,
                                }} 
                            />
                            <div className="error-msg">{errors.name && <p>{errors.name.message}</p>}</div>
                            {/*<div className="form-group">
                                <label htmlFor="name" className='form-label label' >Name</label>
                                <input type="text" className="form-control signup-input" {...register('name',  { required: "Please enter your Name", pattern: {value: /^[aA-zZ\s]+$/ , message: 'Only characters allow',} })} />
                                <div className="error-msg">{errors.name && <p>{errors.name.message}</p>}</div>
                              </div> */} 
                        </GridItem>
                        <div className="error-msg">{errors.username && <p>{errors.username.message}</p>}</div>
                        <GridItem xs={12} sm={12} md={12}>
                            <CustomInput
                                labelText="Password"
                                id="password"
                                formControlProps={{
                                fullWidth: true,
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                labelText="Email"
                                id="email"
                                formControlProps={{
                                fullWidth: true,
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                labelText="Mobile No"
                                id="mobile_num"
                                formControlProps={{
                                fullWidth: true,
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                            <CustomInput
                                labelText="Department"
                                id="department"
                                formControlProps={{
                                fullWidth: true,
                                }}
                            />
                        </GridItem>
                    </GridContainer>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                labelText="Position"
                                id="position"
                                formControlProps={{
                                fullWidth: true,
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                labelText="Role"
                                id="role"
                                formControlProps={{
                                fullWidth: true,
                                }}
                            />
                        </GridItem>
                    </GridContainer>
                    {/*<GridContainer>
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
                    </GridContainer>*/}
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
