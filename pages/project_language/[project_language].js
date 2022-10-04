import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from 'next/router'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// layout for this page
import Modules from "layouts/Modules.js";
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
import { IoMdArrowDropdown } from "react-icons/io";
import { useForm  } from 'react-hook-form';
import { server } from 'config';
import avatar from "assets/img/faces/marc.jpg";
import DatePicker from "react-datepicker";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Popup from "reactjs-popup";
import Multiselect from "multiselect-react-dropdown";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from 'react-icons/md';

const styles = {
    cardCategoryWhite: {
      color: "rgba(0,0,0,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    cardTitleWhite: {
      color: "#000000",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none",
    },
    cardWhite: {
      color: "#000000",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none",
      background: "#ADD8E6",
      float: "right",
    },
    img:{
      marginLeft: "auto",
      width: "40px",
    },
    popup:{
      // position: "fixed",
      width: "100%",
      height: "100%",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    link:{
      border: "1px solid #000000",
      color: "#000000",
      padding: "5px 10px",
    },
    close:{
      marginLeft: "auto",
      fontSize: "40px",
      paddingRight: "10px",
      cursor: "pointer",
    },
};


function ProjectFilter({ project_details , User_name }){

    const useStyles = makeStyles(styles);
    const classes = useStyles();

   
    return(
        <>
            
        </>
    )
}

ProjectFilter.layout = Modules;
export default ProjectFilter;