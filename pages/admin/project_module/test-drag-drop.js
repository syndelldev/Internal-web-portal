import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from 'next/router';
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
import { IoMdArrowDropdown } from "react-icons/io";
import { useForm  } from 'react-hook-form';
import { server } from 'config';
import avatar from "assets/img/faces/marc.jpg";
import DatePicker from "react-datepicker";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Popup from "reactjs-popup";
import Multiselect from "multiselect-react-dropdown";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


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


export async function getServerSideProps(){
  const res = await fetch(`${server}/api/project`);
  const project_details = await res.json();
  // console.log(project_details);
  const response = await fetch(`${server}/api/admin`)
  const User_name = await response.json();

  return{ props: {project_details, User_name} }
}

const reorderPosition = (tasks, startIndex, endIndex) =>{
  const newList =  Array.from(tasks);
  const [removed] = newList.splice(startIndex , 1);

  newList.splice(endIndex , 0 , removed);
  return newList;
}

function AddProject({ project_details , User_name }) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  
  const router = useRouter();

  const onSubmit = async (result) =>{
    console.log("result");
  }

const [state, setState] = useState([]);

const onDragStart = (result) => {
    const { source , destination } = result;
}

const onDragUpdate = (result) => {
    const { source , destination } = result;
}

const onDragEnd = (result) => {
    const { source , destination } = result;

    if(!destination) return;
    if(destination.droppableId === source.droppableId && destination.index ===source.index){
      return;
    }

    const { tasks } = state;
    const newPosition = reorderPosition(tasks , source.index, destination.index );

    const newState = {
      ...state,
      tasks: newPosition
    };
    setState(newState);
}


  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart} onDragUpdate={onDragUpdate}>
        <Droppable droppableId="col">

    {(droppableProvided) => <div {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>

        {User_name.map((user , index)=>{
            return(
            <Draggable key={user.id}  draggableId={user.id.toString()} index={index}>
                {(draggableProvided , draggableSnapshot) =>
                        <div 
                        {...draggableProvided.dragHandleProps} 
                        {...draggableProvided.draggableProps}
                        ref= {draggableProvided.innerRef}
                        >
                            <h2>{user.username}</h2>
                        </div>
                }
            </Draggable>
            );
            })}

        </div>}

        </Droppable>
    </DragDropContext>
  )
}

AddProject.layout = Admin;

export default AddProject;
