import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import styles from "assets/jss/nextjs-material-dashboard/components/tableStyle.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

export async function getServerSideProps(content){
    const res = await fetch(`http://localhost:3000/api/user`)
    const tasklist = await res.json()
    console.log(tasklist);
  
    return{ props: {tasklist} }
} 

export default function AllTask({ tasklist }){
    console.log(tasklist);

    const useStyles = makeStyles(styles);
    const classes = useStyles();

    return (
        <>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Simple Table</h4>
                            <p className={classes.cardCategoryWhite}>Here is a subtitle for this table</p>
                        </CardHeader>
                        <CardBody>
                            <div className={classes.tableResponsive}>
                                <Table className={classes.table}>
                                    <TableHead className={classes.TableHeader}>
                                        <TableRow className={classes.tableHeadRow}>
                                            <TableCell>ID</TableCell>
                                            <TableCell>Task Name</TableCell>
                                            <TableCell>Task Description</TableCell>
                                            <TableCell>Task Time</TableCell>
                                            <TableCell>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {tasklist.map((user)=>{
                                            return(
                                                <TableRow key={user.id} className={classes.tableHeadRow}>
                                                    <TableCell>{user.id}</TableCell>
                                                    <TableCell>{user.task_name}</TableCell>
                                                    <TableCell>{user.task_description}</TableCell>
                                                    <TableCell>{user.task_time}</TableCell>
                                                    <TableCell>
                                                        <a href={`/user/${user.id}`}>view</a>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </>
    );
}

/*import Link from "next/link";

export const getStaticProps = async () =>{
    const res = await fetch("   https://jsonplaceholder.typicode.com/posts")
    const data = await res.json()

    return{
        props:{
            data,
        },
    };
};


const user = ({data}) => {
    return (
        <>
          
            {data.map((curElem) => {
            return (
                <div key={curElem.id}>
                <h3>{curElem.id}</h3>
                <Link href={`/user/${curElem.id}`}>
                    <h2>{curElem.title}</h2>
                </Link>
                <p>{curElem.body}</p>
                </div>  
            );
            })}
            
        </>
    );
};
export default user;*/