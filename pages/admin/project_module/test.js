import React, { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';
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



function AddProject() {
  
  const [User_name, setAPIData] = useState([]);

  useEffect(() => {
    axios.get(`${server}/api/admin`)
        .then((response) => {
            setAPIData(response.data);
        })
}, []);

const [selected, setSelected] = useState([]);

const [columns, setColumns] = useState([]);

const onDragStart = (result) => {
    const { source , destination } = result;
}

const onDragUpdate = (result) => {
    const { source , destination } = result;
}

const onDragEnd = (result) => {
    const { source , destination } = result;
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
