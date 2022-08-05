import jwt from 'jsonwebtoken'
const KEY = 'asdfghjklzxcvbnmjtttdgsnrgjgnamffadwrqwww'


async function Login(req,res){
    console.log(req.body);

    if(!req.body){
        res.statusCode=404
        res.end('Error')
        return
    }
    const { username, password } = req.body

    res.json({
        token: jwt.sign(
            {
                username,
                admin:username==='admin' && password==='admin'
            },
            KEY
        )
    })
}

export default Login