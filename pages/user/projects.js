import React, { useEffect, useState , useRef } from "react";
// layout for this page
import User from "layouts/User.js";
import { useRouter } from 'next/router';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CardBody from "components/Card/CardBody.js";

import { useForm } from 'react-hook-form';
import Popup from "reactjs-popup";
import axios from "axios";
import { server } from 'config';
import { FiEdit } from "react-icons/fi";
import { FaEye } from 'react-icons/fa';
import { makeStyles } from "@material-ui/core/styles";
// import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import { useCookies } from 'react-cookie';
import { Button } from "@material-ui/core";
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css';


const ReactQuill = dynamic(import('react-quill'), { ssr: false })

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
    paddingRight: "15px",
    cursor: "pointer",
  },
};


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

function Projects({project}) {
  // console.log(project)
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const router = useRouter();

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

  const [username, setusername] = useState('');
  const [message, setmessage] = useState('');

  const [comments, setcomments] = useState([]);
  console.log(comments);
  
  const getData = async (project_id)=>{

    // alert(project_id)
    var comment = await axios.post(`${server}/api/comment/comment`, { project_id: project_id });
    // console.log(comment.data)
    setcomments(comment.data)
    // console.log(comments)
  }
  

  const sendMessage = async (project_id) => {
    // e.preventDefault();
    // alert(project_id)
    console.log("comm");
    console.log(textComment);

    var addComment = await axios.post(`${server}/api/comment/addcomment`, {  username: cookies.name, message: message , project_id: project_id });
    console.log(addComment)
    console.log(cookies.name)
    // router.reload(`${server}/user/dashboard`);
  }

  const [textComment, setText] = useState([]);

  class RichTextEditor extends React.Component {
    constructor(props) {
      super(props);
  
      this.modules = {
        toolbar: [
            [{ 'font': [] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline'],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            [{ 'align': [] }],
            [{ 'color': [] }, { 'background': [] }],
            ['clean']
          ]
      };
  
      this.formats = [
          'font',
          'size',
          'bold', 'italic', 'underline',
          'list', 'bullet',
          'align',
          'color', 'background'
        ];
  
        this.state = {
        comments: ''
      }
  
      this.rteChange = this.rteChange.bind(this);
    }
  
    rteChange = (content, delta, source, editor) => {
      // console.log(editor.getHTML()); // rich text
      // console.log(content);
      // console.log(delta.ops[1]);
      // console.log(source);
      // console.log(editor.getText()); // plain text
      // console.log(editor.getLength()); // number of characters
    }
  
    render() {
        return (
          <div>
            <ReactQuill theme="snow"  modules={this.modules}
              formats={this.formats} onChange={this.rteChange}
              value={this.state.comments || ''}/>
              {console.log("123")}
              {setText(this.state.comments)}
          </div>
        );
    }
  
  }
  // class Editor extends React.Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = { editorHtml: "" };
  //     this.handleChange = this.handleChange.bind(this);
  //     // console.log("text");      
  //   }
  
  //   handleChange(html) {
  //     this.setState({ editorHtml: html });
  //     // console.log(html);
  //     // setText(this.state.editorHtml);
  //     console.log(this.state.editorHtml);
  //   }
  
  //   render() {
  //     return (
  //       <div className="text-editor">
  //         <ReactQuill
  //           onChange={this.handleChange}
  //           placeholder={this.props.placeholder}
  //           modules={Editor.modules}
  //           formats={Editor.formats}
  //           // value={this.state.editorHtml}
  //           theme={"snow"} // pass false to use minimal theme
  //         />
  //       </div>
  //     );
  //   }
  // }
  
  // Editor.modules = {
  //   toolbar: [
  //     [{ 'header': [1, 2, 3, 4, 5, false] }],
  //     [{ 'color': ["#fff", "#d0d1d2", "#000", "red" ,"green", "blue", "orange", "violet" ]}],
  //     ['bold', 'italic', 'underline','strike', 'blockquote'],
  //     [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
  //     ['link', 'image'],
  //     ['clean'],
  //   ],
  //   handlers: {
  //     // handlers object will be merged with default handlers object
  //     'link': function(value) {
  //       if (value) {
  //         console.log("value");
  //       }else{
  //         console.log("no data");
  //       }
  //     }
  //   }
  //   // clipboard: {
  //   //   matchVisual: false,
  //   // }
  // };
  
  
  // Editor.formats = [
  //   "header",
  //   "font",
  //   "size",
  //   "bold",
  //   "italic",
  //   "underline",
  //   "strike",
  //   "blockquote",
  //   "list",
  //   "bullet",
  //   "indent",
  //   "link",
  //   "image",
  //   "color"
  // ];
  
  return (
    <>
          <table className="project-data">
            <tr className="project-data-title">
              <th colspan="2" className="title">Task name </th>
              <th>Priority</th>
              <th colspan="2" className="status">Status</th>
              <th colspan="2" className="assignee">Assignee</th>
              <th colspan="4"className="view-edit">View & Edit</th>
            </tr>
             
            {
              project.map((project)=>{
                var person = project.project_person.split(",");
                return(
                  <>
                  <tr className="project-data-details">
                    <td colspan="2"><h4 className="projectTitle">{project.project_title}</h4></td>
                    <td className="priority-data"><p className="projectPriority">{project.project_priority}</p></td>
                    <td className="status-data"><p>{project.project_status}</p></td>
                    <td colspan="4" className="assignee-data">
                      {person.map((project_person) => {
                          return(
                            <div className="chip">
                              <span>{project_person}</span>
                            </div>
                          )
                        })
                      }
                    </td>
                    <td>
                      <div className="icon-display">
                        {/* View Pop Up For View */}
                        {/* <Popup trigger={<Button disabled={project.view_rights==0} ><FaEye/></Button>}  className="popupReact"  modal>
                          {close => (
                            <div>
                              <GridItem xs={6} sm={6} md={12} key={project.project_id}>
                                <Card >
                                  <CardHeader color="primary">
                                    <GridContainer>
                                      <GridItem>
                                        <h4>{project.project_title}</h4>
                                      </GridItem>
                                      <div className={classes.close}>
                                        <a onClick={close}>&times;</a>
                                      </div>   
                                    </GridContainer>
                                  </CardHeader><br/>
                                  <CardFooter>
                                    <p>Project Language</p>-<p>{project.project_language}</p>
                                  </CardFooter>
                                  <CardFooter>
                                    <p>{project.project_person}</p>
                                  </CardFooter>
                                  <CardFooter>
                                    <p>{project.project_description}</p>
                                  </CardFooter>
                                  <CardFooter>
                                    <p>{project.project_department}</p>
                                  </CardFooter>
                                  <CardFooter>
                                    <p>{project.project_status}</p>
                                  </CardFooter>
                                  <CardFooter>
                                    <p className="projectPriority">{project.project_priority} Priority</p>
                                  </CardFooter>
                                </Card>
                              </GridItem>
                            </div>
                          )}
                        </Popup>  */}
                        {/*View Project PopUp End*/}
                        {/*Edit Project PopUp Start*/}
                        <Popup trigger={<div> <button disabled={project.edit_rights==0} onClick={()=>getData(project.project_id)} className="user-icon"><FiEdit/></button> </div>}  className="popupReact"  modal >
                          {close => (
                            <div>
                              
                              <GridItem xs={12} sm={12} md={12} key={project.project_id}>
                                <Card>
                                  <CardHeader color="primary">
                                    <h4>{project.project_title}</h4>
                                      <div className={classes.close}>
                                        <a onClick={close}>&times;</a>
                                      </div>
                                  </CardHeader>
                                  <CardBody>
                                      <GridContainer>
                                        <GridItem>
                                          <p>Project Language - {project.project_language}</p>
                                          <p>Project Person - {project.project_person}</p>
                                          <p>Project Description - {project.project_description}</p>
                                          <p>Department - {project.project_department}</p>
                                          <p>Project Status - {project.project_status}</p>
                                        </GridItem>
                                        <GridItem>
                                          <p className="projectPriority">{project.project_priority} Priority</p>
                                        </GridItem>
                                      </GridContainer>

                                  <GridContainer>
                                    <GridItem>
                                      <h5 className="projectPriority">Comments</h5>
                                    </GridItem>
                                  </GridContainer>
                                  <GridContainer>
                                    <GridItem xs={12} sm={12} md={12} >
                                      <form>
                                        {/* <textarea
                                          className="form-control signup-input"
                                          type="text"
                                          value={message}
                                          onChange={(e) => {
                                            setmessage(e.target.value);
                                          }}
                                        ></textarea> */}
                                        <RichTextEditor placeholder={"Write your comment"}
                                          // value={message}
                                          // onChange={(e) => {
                                          //   setmessage(e.target.value);
                                          // }}
                                        />

                                        <div onClick={()=> sendMessage(project.project_id)}>Save</div>

                                        {/* <div onClick={() => sendMessage(project.project_id)}>Save</div> */}
                                      </form>
                                    </GridItem>
                                  </GridContainer>

                                  {comments.map((m)=>{
                                    const Date = ((m.creation_time).substr(0,10).split("-",3));
                                    const Time = ((m.creation_time).substr(11,16).split(":",3));
                                    var dateP = m.creation_time;
                                    var textArea = (m.comment).split(`\n`);
                                    // console.log("textArea");
                                    // console.log(textArea);
                                    // if(textArea == ""){
                                      // function Setcontent() {
                                      //  }
                                      return(
                                        <span>
                                          <GridContainer>
                                            <GridItem>
                                              <span>{m.username}</span>
                                            </GridItem>
                                                
                                            <GridItem>
                                            <span><p>{Date[2]}/{Date[1]}/{Date[0]}</p></span>
                                            </GridItem>
                                          </GridContainer>

                                          <GridContainer>
                                            <GridItem>
                                              <div>
                                                <span id="editorOne">{m.comment}</span>
                                              </div>
                                            </GridItem>
                                          </GridContainer>
                                        </span>
                                      )
                                  })}
                                  </CardBody>
                                </Card>
                              </GridItem>
                            </div>
                          )}
                        </Popup>
                        {/*Edit Project PopUp End*/}
                      </div>
                    </td>
                    </tr>
                  </>
                )
              })
            }
          </table>
          
 
    </>
  );
}

Projects.layout = User;

export default Projects;