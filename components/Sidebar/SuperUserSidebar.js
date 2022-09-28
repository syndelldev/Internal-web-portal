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
import { server } from 'config';
// core components
import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks.js";
import RTLNavbarLinks from "components/Navbars/RTLNavbarLinks.js";

import styles from "assets/jss/nextjs-material-dashboard/components/sidebarStyle.js";

export default function Sidebar(props) {
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
  var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        var activePro = " ";
        var listItemClasses;
        // if (prop.path === "/upgrade-to-pro") {
        //   activePro = classes.activePro + " ";
        //   listItemClasses = classNames({
        //     [" " + classes[color]]: true,
        //   });
        // } else {
        //   listItemClasses = classNames({
        //     [" " + classes[color]]: activeRoute(prop.layout + prop.path),
        //   });
        // }
        const whiteFontClasses = classNames({
          [" " + classes.whiteFont]:
            activeRoute(prop.layout + prop.path) ||
            prop.path === "/upgrade-to-pro",
        });
        return (
          <Link href={prop.layout + prop.path} key={key}>
            <a className={activePro + classes.item}>
              <ListItem button className={classes.itemLink + listItemClasses}>
                {typeof prop.icon === "string" ? (
                  <Icon
                    className={classNames(classes.itemIcon, whiteFontClasses, {
                      [classes.itemIconRTL]: props.rtlActive,
                    })}
                  >
                    {prop.icon}
                  </Icon>
                ) : (
                  <prop.icon
                    className={classNames(classes.itemIcon, whiteFontClasses, {
                      [classes.itemIconRTL]: props.rtlActive,
                    })}
                  />
                )}
                <ListItemText
                  primary={props.rtlActive ? prop.rtlName : prop.name}
                  className={classNames(classes.itemText, whiteFontClasses, {
                    [classes.itemTextRTL]: props.rtlActive,
                  })}
                  disableTypography={true}
                />
              </ListItem>
            </a>
          </Link>
        );
      })}
    </List>
  );
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
          <img src={`${server}/syndellll.png`} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </a>
    </div>
    );
  return (
    <div>
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
          {/*<div className={classes.sidebarWrapper}>{links}</div>*/}
          <div className={classes.sidebarWrapper}>
            <div className="makeStyles-sidebarWrapper-36">
                <ul className="MuiList-root makeStyles-list-22 MuiList-padding"><br/>
                <a className=" makeStyles-item-15" href="/superuser/dashboard">
                  <div className="MuiButtonBase-root MuiListItem-root makeStyles-itemLink-16undefined MuiListItem-gutters MuiListItem-button" tabIndex="0" role="button" aria-disabled="false">
                    <svg className="MuiSvgIcon-root makeStyles-itemIcon-17" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"></path>
                    </svg>
                    <div className="MuiListItemText-root makeStyles-itemText-19">Dashboard</div>
                    <span className="MuiTouchRipple-root"></span>
                  </div>
                </a>
                <a className=" makeStyles-item-15" href="/superuser/project_module">
                  <div className="MuiButtonBase-root MuiListItem-root makeStyles-itemLink-16undefined MuiListItem-gutters MuiListItem-button" tabIndex="0" role="button" aria-disabled="false">
                    {/* <span className="material-icons MuiIcon-root makeStyles-itemIcon-17  makeStyles-whiteFont-21" aria-hidden="true">content_paste</span> */}
                    <svg className="MuiSvgIcon-root makeStyles-itemIcon-17" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"></path>
                    </svg>
                    <div className="MuiListItemText-root makeStyles-itemText-19">Projects</div>
                    <span className="MuiTouchRipple-root"></span>
                  </div>
                </a>
                <a className=" makeStyles-item-15" href="/superuser/subtask_module">
                  <div className="MuiButtonBase-root MuiListItem-root makeStyles-itemLink-16undefined MuiListItem-gutters MuiListItem-button" tabIndex="0" role="button" aria-disabled="false">
                    <span className="material-icons MuiIcon-root makeStyles-itemIcon-17  makeStyles-whiteFont-21" aria-hidden="true">content_paste</span>
                    <div className="MuiListItemText-root makeStyles-itemText-19">Tasks</div>
                    <span className="MuiTouchRipple-root"></span>
                  </div>
                </a>
                <a className=" makeStyles-item-15" href="/superuser/profile_page">
                  <div className="MuiButtonBase-root MuiListItem-root makeStyles-itemLink-16undefined MuiListItem-gutters MuiListItem-button" tabIndex="0" role="button" aria-disabled="false">
                    {/* <span className="material-icons MuiIcon-root makeStyles-itemIcon-17  makeStyles-whiteFont-21" aria-hidden="true">content_paste</span> */}
                    <svg className="MuiSvgIcon-root makeStyles-itemIcon-17" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                    </svg>
                    <div className="MuiListItemText-root makeStyles-itemText-19">Profile</div>
                    <span className="MuiTouchRipple-root"></span>
                  </div>
                </a>
                <a className=" makeStyles-item-15" href="/superuser/user_rights">
                  <div className="MuiButtonBase-root MuiListItem-root makeStyles-itemLink-16undefined MuiListItem-gutters MuiListItem-button" tabIndex="0" role="button" aria-disabled="false">
                    <span className="material-icons MuiIcon-root makeStyles-itemIcon-17  makeStyles-whiteFont-21" aria-hidden="true">content_paste</span>
                    <div className="MuiListItemText-root makeStyles-itemText-19">User Rights</div>
                    <span className="MuiTouchRipple-root"></span>
                  </div>
                </a>
                </ul>
            </div>
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
