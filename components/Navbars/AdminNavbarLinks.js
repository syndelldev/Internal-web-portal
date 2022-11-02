import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
import Search from "@material-ui/icons/Search";
// core components
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import useWindowSize from "components/Hooks/useWindowSize.js";

import axios from "axios";
import styles from "assets/jss/nextjs-material-dashboard/components/headerLinksStyle.js";
import { server } from 'config';
import { useCookies } from 'react-cookie';

import AvatarGroup from 'react-avatar-group';

export default function AdminNavbarLinks({useravtar}) {

  
  // useEffect(async() => {
  //   const res = await fetch(`${server}/api/admin/${cookies.Id}`)
  //   const useravtar=await res.json()
  //   console.log(useravtar)
  // }, []);
  // console.log(useravtar)

  // const [users, setusers] = useState([])
  // useEffect(async()=>{
  //   axios.get(`${server}/api/admin/${cookies.Id}`, {withCredentials: true})
  //     .then((res)=>{
  //       setusers(res.data)
  //       //console.log(res.data)
  //     })    
  // },[])
  // console.log(users)

  const router = useRouter();
  const [cookies, setCookie, removeCookie ] = useCookies();

  const profile_avtar=[];
  profile_avtar.push(cookies.name)
  console.log('profile_avtar', profile_avtar)

  const logoutfunc = () => {
    removeCookie('name', { path:'/' } );
    removeCookie('Email', { path:'/' } );
    removeCookie('Mobile_num', { path:'/' } );
    removeCookie('DOB', { path:'/' } );
    removeCookie('Department', { path:'/' } );
    removeCookie('Position', { path:'/' } );
    removeCookie('Role', { path:'/' } );
    removeCookie('Avtar', { path:'/' } );
    removeCookie('Id', { path:'/' } );
    removeCookie('Role_id', { path:'/' } );

    router.push("/login");
  }
 


  const size = useWindowSize();
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [openNotification, setOpenNotification] = React.useState(null);
  const [openProfile, setOpenProfile] = React.useState(null);
  const handleClickNotification = (event) => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };
  const handleCloseNotification = () => {
    setOpenNotification(null);
  };
  const handleClickProfile = (event) => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };
  return (
    <div>
      {/*<div className={classes.searchWrapper}>
        <CustomInput
          formControlProps={{
            className: classes.margin + " " + classes.search,
          }}
          inputProps={{
            placeholder: "Search",
            inputProps: {
              "aria-label": "Search",
            },
          }}
        />
        <Button color="white" aria-label="edit" justIcon round>
          <Search />
        </Button>
        </div>*/}
        
      {/* <Button
        color={size.width > 959 ? "transparent" : "white"}
        justIcon={size.width > 959}
        simple={!(size.width > 959)}
        aria-label="Dashboard"
        className={classes.buttonLink}
      >
        <Dashboard className={classes.icons} />
        <Hidden mdUp implementation="css">
          <p className={classes.linkText}>Dashboard</p>
        </Hidden>
      </Button> */}
      <div className={classes.manager}>
        {/* <Button
          color={size.width > 959 ? "transparent" : "white"}
          justIcon={size.width > 959}
          simple={!(size.width > 959)}
          aria-owns={openNotification ? "notification-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickNotification}
          className={classes.buttonLink}
        >
          <Notifications className={classes.icons} />
          <span className={classes.notifications}>5</span>
          <Hidden mdUp implementation="css">
            <p onClick={handleCloseNotification} className={classes.linkText}>
              Notification
            </p>
          </Hidden>
        </Button> */}
        {/* <Poppers
          open={Boolean(openNotification)}
          anchorEl={openNotification}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openNotification }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="notification-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseNotification}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      Mike John responded to your email
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      You have 5 new tasks
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      You{"'"}re now friend with Andrew
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      Another Notification
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      Another One
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
            </Poppers> */}
        </div>
      <div className={classes.manager}>
      
        <Button
          color={size.width > 959 ? "transparent" : "white"}
          justIcon={size.width > 959}
          simple={!(size.width > 959)}
          aria-owns={openProfile ? "profile-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={classes.buttonLink}  
        >
          <Person className={classes.icons} />
          {/* <AvatarGroup
            avatars={['Ahdf']}
            initialCharacters={1}
            max={2}
            size={40}
            displayAllOnHover
            shadow={2}
          ></AvatarGroup> */}
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openProfile }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu" className="logout">
                    {
                    <MenuItem onClick={handleCloseProfile} className={classes.dropdownItem}>
                      <a href="/profile_page">My Profile{/*cookies.name*/}</a>
                    </MenuItem>
                    /*
                    <MenuItem onClick={handleCloseProfile} className={classes.dropdownItem}>
                      <a href="#">Settings</a>
                    </MenuItem>
                    */
                    }
                    <Divider light />
                    <MenuItem /*onClick={handleCloseProfile}*/ onClick={logoutfunc} className={classes.dropdownItem}>
                      <a href="#">Logout</a>
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      
      </div>
    </div>
  );
}
