require("dotenv").config();

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())

const port = 3000;

//DummyData
app.get('/posts', authenticateToken, (req, res) =>{
    res.json(posts.filter(post => post.username === req.user.name))
})



app.post('/login', (req, res) =>{
    
    //authenticate user
    const username  = req.body.username
    const user= { name: username }

    //getting access token
    const accessToken = jwt.sign(user, ""+ process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken: accessToken})

})

function authenticateToken(req, res, next){

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(token == null) return res.sendStatus(401)
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

app.get("/test",  (req, res) => {
    res.send("Server is Healthy!");
  });


app.get("/password", callPassword); 


app.listen(port, ()=> {
    console.log(`App is listening at http://locahost:${port}`);
});

function callPassword(req, res) {

    var spawn = require("child_process").spawn;

    var process = spawn('python', ["src/PythonScript/password.py", req.query.password]);

    process.stdout.on('data',function(data){

        
        res.send(data.toString());
        res.end()
    })

}