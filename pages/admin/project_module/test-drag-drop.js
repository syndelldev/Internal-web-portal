import React from "react";
import { useState } from "react";
import { useRouter } from 'next/router';
import { makeStyles } from "@material-ui/core/styles";
import Admin from "layouts/Admin.js";
import { server } from 'config';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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

function AddProject({ User_name }) {
  // const useStyles = makeStyles(styles);
  // const classes = useStyles();
  
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


  return (<>
  <GridContainer>
    <GridItem>

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
                <GridContainer>
                  <GridItem>
                    <h2>{user.username}</h2>
                  </GridItem>
                </GridContainer>

                {/* <h2>{user.username}</h2> */}
                      </div>
                }
            </Draggable>
            );
            })}

        </div>}

        </Droppable>
    </DragDropContext>
    </GridItem>

<GridItem>
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
                <GridContainer>
                  <GridItem>
                    <h2>{user.username}</h2>
                  </GridItem>
                </GridContainer>

                {/* <h2>{user.username}</h2> */}
                      </div>
                }
            </Draggable>
            );
            })}

        </div>}

        </Droppable>
    </DragDropContext>
    </GridItem>
    </GridContainer>

    </>
  )
}

AddProject.layout = Admin;

export default AddProject;
