import React, { useEffect, useState } from "react";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import { GiSandsOfTime } from "react-icons/gi";
import { FiEdit } from 'react-icons/fi'
import { FaEye } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { RiAddCircleFill } from 'react-icons/ri'

// layout for this page
import SuperUser from "layouts/SuperUser.js";



import Popup from "reactjs-popup";
import axios from "axios";
import { server } from 'config';

import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import { useCookies } from 'react-cookie';
import { Button } from "@material-ui/core";


export async function getServerSideProps(context){
  //console.log(context.req.cookies);
  const res = await fetch(`${server}/api/user_dashboard`, {
    headers: {
      'Access-Control-Allow-Credentials': true,
      Cookie: context.req.headers.cookie
    },
  })
  const project = await res.json()
  //console.log(project)

  return { props: {project}, }
}

function Dashboard({project}) {
  console.log(project)
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  
  const [cookies, setCookie] = useCookies('');
  //console.log(cookies.Id);

  const [users, setusers] = useState([])

  useEffect(async()=>{
    axios.get(`${server}/api/admin/${cookies.Id}` )
      .then((res)=>{
        setusers(res.data)
        //console.log(res)
      })    
  },[])
  // console.log(users)

  // const [rights, setrights] = useState([])
  // useEffect(async()=>{
  //   axios.get(`${server}/api/rights/` )
  //     .then((res)=>{
  //       setrights(res.data)
  //       console.log(res.data)
  //     })    
  // },[])
  // console.log(rights)

  return (
    <>
      <div>
        {users.map((user)=>{
          return(
            <div key={user.id}>
              <h1>Welcome {user.username} </h1>
            </div>
          )
        })}
      </div>
    </>
  );
}

Dashboard.layout = SuperUser;

export default Dashboard;
