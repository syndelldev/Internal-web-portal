// layout for this page
import Admin from "layouts/Admin.js";
import { Button } from "@material-ui/core"
import { server } from 'config';
import { useEffect,useState } from 'react';
import { useSession } from 'next-auth/react'

function UserDetail(){

    const { data: session, status } = useSession()
    const loading = status === "loading"

    // const userInfo =  async() => {
    //     const res = await fetch(`${server}/api/admin/`)
    
    //     const data=await res.json()
    //     console.log(data)
    // }
    
    return(
        <>
            {loading && <div>Loading...</div>}
            <Button>view</Button>
        </>
    )
}

UserDetail.layout = Admin;

export default UserDetail;