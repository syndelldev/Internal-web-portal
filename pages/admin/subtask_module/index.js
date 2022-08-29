import { makeStyles } from "@material-ui/core/styles";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Admin from "layouts/Admin.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import styles from "assets/jss/nextjs-material-dashboard/components/tableStyle.js";

import { server } from 'config';

export async function getServerSideProps(context){
  const res = await fetch(`${server}/api/subtask`)
  const subtasklist = await res.json()
  //console.log(subtasklist);

  return{ props: {subtasklist} }
} 

function SubTask({subtasklist}){
    console.log(subtasklist);
    const useStyles = makeStyles(styles);
    const classes = useStyles();

    // onDragEnd = (result) =>{
    //     if(!result.destination){
    //         return;
    //     }
    //     //const reorderItems = 
    // }
    return(
        <>
            <h3>Tasks Management</h3>
            <div>
                <h6>In Progress</h6>
                    {/*<DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="characters">
                    {(provided,snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                    {subtasklist.map(({task,id},index)=>{
                        return(
                            <Draggable key={id} draggableId={id} index={index}>
                                {(provided) => (
                                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        <div key={task.subtask_id}>
                                            <GridContainer>
                                                <GridItem xs={6} sm={6} md={4}>
                                                    <Card>
                                                        <CardHeader color="primary">
                                                            <h4 className={classes.cardTitleWhite}>{task.subtask_id}</h4>
                                                            <p>{task.subtask_priority}</p>
                                                        </CardHeader>
                                                        <CardBody>
                                                            <p>{task.subtask_description}</p>
                                                        </CardBody>
                                                        <CardFooter>
                                                            <p>iiiiii</p>
                                                        </CardFooter>
                                                    </Card>
                                                </GridItem>
                                            </GridContainer>
                                        </div>
                                    </li>
                                )})
                            </Draggable>
                            )
                        }) 
                    }
                    </div>
                    )}
                    </Droppable>
                </DragDropContext>*/}
                    
            </div>
        </>
    )
}

SubTask.layout = Admin;

export default SubTask;
