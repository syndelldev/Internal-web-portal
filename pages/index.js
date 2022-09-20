import React from "react";
import Router from "next/router";

//import { supabase } from "../utils/supabase"

/*export async function getStaticProps(){
  const data=await supabase.from('admin').select("*");

  return{
      props:{ data:data },
  };
}*/

export default function Index({data}) {
  console.log(data);
  React.useEffect(() => {
    Router.push("/login");
  });

  return <div />;
}
