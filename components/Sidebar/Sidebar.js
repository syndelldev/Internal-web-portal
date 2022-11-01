/*eslint-disable*/
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import Link from "next/link";
import { useRouter } from "next/router";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
// core components
import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks.js";
import RTLNavbarLinks from "components/Navbars/RTLNavbarLinks.js";
import { useCookies } from 'react-cookie';
import styles from "assets/jss/nextjs-material-dashboard/components/sidebarStyle.js";
import { server } from 'config';

export default function Sidebar(props) {
  console.log(props.routes)
  const [cookies, setCookie] = useCookies(['name']);
  // used for checking current route
  const router = useRouter();
  // creates styles for this component
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return router.route.indexOf(routeName) > -1 ? true : false;
  }
  const { color, logo, image, logoText, routes } = props;
  // var links = (
  //   <List className={classes.list}>
  //     {routes.map((prop, key) => {
  //       var activePro = " ";
  //       var listItemClasses;
  //       // if (prop.path === "/upgrade-to-pro") {
  //       //   activePro = classes.activePro + " ";
  //       //   listItemClasses = classNames({
  //       //     [" " + classes[color]]: true,
  //       //   });
  //       // } else {
  //       //   listItemClasses = classNames({
  //       //     [" " + classes[color]]: activeRoute(prop.layout + prop.path),
  //       //   });
  //       // }
       
  //       const whiteFontClasses = classNames({
  //         [" " + classes.whiteFont]:
  //           activeRoute(prop.layout + prop.path) ||
  //           prop.path === "/upgrade-to-pro",
  //       });
  //       return (
  //         <Link href={prop.layout + prop.path} key={key}>
  //           <a className={activePro + classes.item}>
  //             <ListItem button className={classes.itemLink + listItemClasses}>lll
  //               {typeof prop.icon === "string" ? (
  //                 <Icon
  //                   className={classNames(classes.itemIcon, whiteFontClasses, {
  //                     [classes.itemIconRTL]: props.rtlActive,
  //                   })}
  //                 >
  //                   {prop.icon}
  //                 </Icon>
  //               ) : (
  //                 <prop.icon
  //                   className={classNames(classes.itemIcon, whiteFontClasses, {
  //                     [classes.itemIconRTL]: props.rtlActive,
  //                   })}
  //                 />
  //               )} 
  //                <ListItemText
  //                 primary={props.rtlActive ? prop.rtlName : prop.name}
  //                 className={classNames(classes.itemText, whiteFontClasses, {
  //                   [classes.itemTextRTL]: props.rtlActive,
  //                 })}
  //                 disableTypography={true}
  //               />
  //            </ListItem>
  //           </a> 
  //         </Link> 
  //       );
  //     })}
  //   </List>
  // );
  var brand = (
    <div className={classes.logo}>
      <a
        href="/"
        className={classNames(classes.logoLink, {
          [classes.logoLinkRTL]: props.rtlActive,
        })}
        target="_blank"
      >
        <div className={classes.logoImage}>
          {/* <img src={logo} alt="logo" className={classes.img} /> */}
          <img src={`${server}/Syndellll.png`} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </a>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={props.rtlActive ? "left" : "right"}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive,
            }),
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            {props.rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks />}
            {/* {links} */}
            <ul className="MuiList-root makeStyles-list-22 MuiList-padding"><br/>

              <Link href="/dashboard">
                <a className=" makeStyles-item-15" >
                  <div className="MuiButtonBase-root MuiListItem-root makeStyles-itemLink-16undefined MuiListItem-gutters MuiListItem-button" tabIndex="0" role="button" aria-disabled="false">
                    <img src={`${server}/dash.png`} alt="smiley" className="dashboard-image" />
                    <div className="MuiListItemText-root makeStyles-itemText-19">Dashboard</div>
                    <span className="MuiTouchRipple-root"></span>
                  </div>
                </a>
              </Link>

              <Link href="/projects">
                <a className=" makeStyles-item-15">
                  <div className="MuiButtonBase-root MuiListItem-root makeStyles-itemLink-16undefined MuiListItem-gutters MuiListItem-button" tabIndex="0" role="button" aria-disabled="false">
                    <img src={`${server}/Project.png`} alt="smiley" className="dashboard-image" />
                    <div className="MuiListItemText-root makeStyles-itemText-19">Projects</div>
                    <span className="MuiTouchRipple-root"></span>
                  </div>
                </a>
              </Link>
            
              <Link href="/tasks">
                <a className=" makeStyles-item-15">
                  <div className="MuiButtonBase-root MuiListItem-root makeStyles-itemLink-16undefined MuiListItem-gutters MuiListItem-button" tabIndex="0" role="button" aria-disabled="false">
                    <img src={`${server}/Task.png`} alt="smiley" className="dashboard-image" />
                    <div className="MuiListItemText-root makeStyles-itemText-19">Tasks</div>
                    <span className="MuiTouchRipple-root"></span>
                  </div>
                </a>
              </Link>

              <Link href="/user_Rights">
                <a className=" makeStyles-item-15" hidden={cookies.Role_id == "2"}>
                  <div className="MuiButtonBase-root MuiListItem-root makeStyles-itemLink-16undefined MuiListItem-gutters MuiListItem-button" tabIndex="0" role="button" aria-disabled="false">
                    <img src={`${server}/user rights.png`} alt="smiley" className="dashboard-image" />
                    <div className="MuiListItemText-root makeStyles-itemText-19">User Rights</div>
                    <span className="MuiTouchRipple-root"></span>
                  </div>
                </a>
              </Link>

              <Link href="/user_Details">
                <a className=" makeStyles-item-15"  hidden={cookies.Role_id != "1"}>
                  <div className="MuiButtonBase-root MuiListItem-root makeStyles-itemLink-16undefined MuiListItem-gutters MuiListItem-button" tabIndex="0" role="button" aria-disabled="false">
                    <img src={`${server}/User Details.png`} alt="smiley" className="dashboard-image" />
                    <div className="MuiListItemText-root makeStyles-itemText-19">User Details</div>
                    <span className="MuiTouchRipple-root"></span>
                  </div>
                </a>
              </Link>

            </ul>
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url('/sidebar_bg.jpg')" }}
            />
          ) : null}
        </Drawer>
          </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={props.rtlActive ? "right" : "left"}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive,
            }),
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            {/* {links} */}
            <ul className="MuiList-root makeStyles-list-22 MuiList-padding"><br/>

              <Link href="/dashboard">
                <a className=" makeStyles-item-15" >
                  <div className="MuiButtonBase-root MuiListItem-root makeStyles-itemLink-16undefined MuiListItem-gutters MuiListItem-button">
                    <img src={`${server}/dash.png`} alt="smiley" className="dashboard-image" />
                    <div className="MuiListItemText-root makeStyles-itemText-19">Dashboard</div>
                    <span className="MuiTouchRipple-root"></span>
                  </div>
                </a>
              </Link>

              <Link href="/projects">
                <a className=" makeStyles-item-15">
                  <div className="MuiButtonBase-root MuiListItem-root makeStyles-itemLink-16undefined MuiListItem-gutters MuiListItem-button">
                    <img src={`${server}/Project.png`} alt="smiley" className="dashboard-image" />
                    <div className="MuiListItemText-root makeStyles-itemText-19">Projects</div>
                    <span className="MuiTouchRipple-root"></span>
                  </div>
                </a>
              </Link>
            
              <Link href="/tasks">
                <a className=" makeStyles-item-15">
                  <div className="MuiButtonBase-root MuiListItem-root makeStyles-itemLink-16undefined MuiListItem-gutters MuiListItem-button">
                    <img src={`${server}/Task.png`} alt="smiley" className="dashboard-image" />
                    <div className="MuiListItemText-root makeStyles-itemText-19">Tasks</div>
                    <span className="MuiTouchRipple-root"></span>
                  </div>
                </a>
              </Link>

              <Link href="/user_Rights">
                <a className=" makeStyles-item-15" hidden={cookies.Role_id == "2"}>
                  <div className="MuiButtonBase-root MuiListItem-root makeStyles-itemLink-16undefined MuiListItem-gutters MuiListItem-button">
                    <img src={`${server}/user rights.png`} alt="smiley" className="dashboard-image" />
                    <div className="MuiListItemText-root makeStyles-itemText-19">User Rights</div>
                    <span className="MuiTouchRipple-root"></span>
                  </div>
                </a>
              </Link>

              <Link href="/user_Details">
                <a className=" makeStyles-item-15"  hidden={cookies.Role_id != "1"}>
                  <div className="MuiButtonBase-root MuiListItem-root makeStyles-itemLink-16undefined MuiListItem-gutters MuiListItem-button">
                    <img src={`${server}/User Details.png`} alt="smiley" className="dashboard-image" />
                    <div className="MuiListItemText-root makeStyles-itemText-19">User Details</div>
                    <span className="MuiTouchRipple-root"></span>
                  </div>
                </a>
              </Link>

            </ul>
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf([
    "white",
    "purple",
    "blue",
    "green",
    "orange",
    "red",
  ]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool,
};
