export default function login(){
    /*const result = await fetch ("api/login", {
        //method : "POST",
        console.log("result");
    });*/
    return(
        <>
            <div>
                <form method="POST">
                    <div>
                        <label>Name</label>
                        <input type="text" id="name" name="name" />
                        <label>Email</label>
                        <input type="text" id="email" name="email" />
                        <label>Name</label>
                        <input type="password" id="pass" name="pass" /> 
                    </div>
                </form>
            </div>
        </>
    )
}