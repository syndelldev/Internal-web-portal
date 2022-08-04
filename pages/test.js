import { supabase } from "../utils/supabase"

export default function Test({data}){
    //console.log(data);
    return(
        <>
            <h1>Test</h1>
        </>
    )
}

export async function getStaticProps(context){
    const data=await supabase.from('admin').select("*");
    console.log(data.data);
    return{
        props:{ data:data },
    };
}