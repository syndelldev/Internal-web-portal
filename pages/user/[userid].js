import { useRouter } from 'next/router'
import { server } from 'config';

/*export const getStaticPaths = async () => {
    const res = await fetch(`${server}/api/user`);
    const tasklist = await res.json();
    //console.log(data);
    const paths = tasklist.map((user) => {
        return {
            params : { 
                userid : user.id.toString(),
            },
        };
    });
    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps = async (context) =>{
    const id = context.params.userid;
    const res = await fetch(`${server}/api/user/${id}`);
    const data = await res.json();
    //console.log(data);
    return{
        props:{
            data,
        },
    };
};*/

const myData = (data) => {
    console.log(data.data);
    return  (
        <>
            {/*<div>
                {
                data.data.map((user)=>{
                    return (
                        <div key={user.id}>
                            <h1>{user.id}</h1>
                            <h1>{user.task_name}</h1>
                            <h1>{user.task_description}</h1>
                            <h1>{user.task_time}</h1>
                        </div>    
                    )
                }) 
                }
            </div>*/}
        </>
    );
};

export default myData