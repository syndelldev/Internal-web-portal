// layout for this page
import Admin from "layouts/Admin.js";
import { Button } from "@material-ui/core"
import { server } from 'config';
import { useEffect,useState } from 'react';


function UserDetail(){
    const [ toDos, setToDos ] = useState()
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        fetch('https://jsonplaceholder.typicode.com/todos/')
            .then(response => response.json())
            .then(data => {
                setToDos(data) // Set the toDo variable
                setIsLoading(false)
            })
    }, [])
    console.log(setIsLoading)
    // const userInfo =  async() => {
    //     const res = await fetch(`${server}/api/admin/`)
    
    //     const data=await res.json()
    //     console.log(data)
    // }
    
    return(
        <>
            <Button>view</Button>
        </>
    )
}

UserDetail.layout = Admin;

export default UserDetail;