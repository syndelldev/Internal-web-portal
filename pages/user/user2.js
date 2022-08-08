import { useState } from "react";

export default function User(){

    const [TaskName,setTaskName] = useState("");
    const [TaskDesc,setTaskDesc] = useState("");
    const [TaskTime,setTaskTime] = useState("");

    const onsubmit = async(e) =>{
        e.preventDefault();
        /*const res = await fetch("http://localhost:3000/api/user",{
            method:'POST',
            headers: { "Content-Type": "application/json",},
            body:JSON.stringify({TaskName,TaskDesc,TaskTime})
        })*/
        const res = await fetch("http://localhost:3000/api/user/createtask")
        const data = await res.json();

        console.log(data);
    }
    
    return(
        <>
            <form method="POST" onSubmit={onsubmit}>
                <input type="text" name="TaskName" value={TaskName} onChange={(e)=>setTaskName(e.target.value)} placeholder="name" />
                <input type="text" name="TaskDesc" value={TaskDesc} onChange={(e)=>setTaskDesc(e.target.value)} placeholder="description" />
                <input type="text" name="TaskTime" value={TaskTime} onChange={(e)=>setTaskTime(e.target.value)} placeholder="time" />
                <input type="submit" value="submit" />
            </form>
        </>
    )
}